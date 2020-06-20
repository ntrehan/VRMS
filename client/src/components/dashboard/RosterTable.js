import React from "react";
import styles from "../../sass/ProjectLeaderDashboard.module.scss";
import RosterTableRow from "./RosterTableRow";
import ls from "local-storage";

const RosterTable = ({ attendees, activeMeeting }) => {
  console.log('ATTENDEES', attendees);
  const gDriveClickHandler = (email) => {
    const bodyObject = {
      // temporary placeholder email
      email: "mbirdyw@gmail.com",
      file: "10_KYe3pbZqiq6reeLA8zDDeIlz-4PxWM",
    };
    fetch("api/grantpermission/googleDrive", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObject),
    })
      .then((res) => {
        if (res.status !== 200) {
          return res.json().then((res) => {
            throw new Error(res.message);
          });
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const gitHubClickHandler = (
    githubHandle,
    projectName,
    accessLevel = "manager"
  ) => {
    // ******************** pbtag -- allow PL to add githubHandle if not
    // already there
    // if (!githubHandle) {
    // }

    const bodyObject = {
      // temporary placeholder handle + repoName
      handle: "testingphoebe",
      teamName: "vrms", //projectName, no where to pull that from currently, event object doesn't provide project name
      accessLevel,
    };
    fetch("api/grantpermission/gitHub", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObject),
    })
      .then((res) => {
        if (res.status !== 200) {
          return res.json().then((res) => {
            throw new Error(res.message);
          });
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.attendeeTable}>
      <div className={styles.attendeeTableBoxLeft}>
        <span className={styles.attendeeTableTitle}>name</span>
      </div>
      <div className={styles.attendeeTableBoxCenter}>
        <span className={styles.attendeeTableTitle}>role</span>
      </div>
      <div className={styles.attendeeTableBoxCenter}>
        <span className={styles.attendeeTableTitle}>services</span>
      </div>
      {attendees &&
        attendees
          .filter((attendee) => {
            return attendee.userId.newMember;
          })
          .map((attendee) => {
            return (
              <RosterTableRow
                key={Math.random()}
                name={
                  attendee.userId.name.firstName +
                  " " +
                  attendee.userId.name.lastName
                }
                role={attendee.userId.currentRole}
                isNewMember={true}
                gDriveClicked={() => gDriveClickHandler(attendee.userId.email)}
                gitHubClicked={() =>
                  gitHubClickHandler(attendee.userId.githubHandle)
                }
                services={{
                  gitHub: attendee.onProjectGithub, 
                  googleDrive: attendee.onProjectGoogleDrive
                }}
              ></RosterTableRow>
            );
          })}
      {attendees &&
        attendees
          .filter((attendee) => {
            return (
              !attendee.userId.newMember &&
              attendee.userId.name.firstName !== "test"
            );
          })
          .map((attendee) => {
            const {onProjectGithub, onProjectGoogleDrive} = attendee;
            
            return (
              <RosterTableRow
                key={Math.random()}
                name={
                  attendee.userId.name.firstName +
                  " " +
                  attendee.userId.name.lastName
                }
                role={attendee.userId.currentRole}
                services={{
                  gitHub: attendee.onProjectGithub, 
                  googleDrive: attendee.onProjectGoogleDrive
                }}
              ></RosterTableRow>
            );
          })}
      {attendees &&
        attendees
          .filter((attendee) => {
            return (
              !attendee.userId.newMember &&
              attendee.userId.name.firstName === "test"
            );
          })
          .map((attendee) => {
            return (
              <RosterTableRow
                key={Math.random()}
                name={
                  attendee.userId.name.firstName +
                  " " +
                  attendee.userId.name.lastName
                }
                role={attendee.userId.currentRole}
                services={{
                  gitHub: attendee.onProjectGithub, 
                  googleDrive: attendee.onProjectGoogleDrive
                }}
              ></RosterTableRow>
            );
          })}
    </div>
  );
};

export default RosterTable;
