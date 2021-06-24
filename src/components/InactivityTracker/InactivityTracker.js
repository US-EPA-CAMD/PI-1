import React, { useEffect, useState, useCallback } from "react";
import { config } from "../../config";
import { useInterval } from "../../additional-functions/use-interval";

import { Button } from "@trussworks/react-uswds";
import { Modal } from "../Modal/Modal";
import { CountdownTimer } from "../CountdownTimer/CountdownTimer";

export const InactivityTracker = ({ apiCall }) => {
  const [timeInactive, setTimeInactive] = useState(0);
  const [showInactiveModal, setShowInactiveModal] = useState(false);
  const [trackInactivity, setTrackInactivity] = useState(false);

  const [activityOccurred, setActivityOccurred] = useState(false);


  const resetUserInactivityTimer = () => {
    setTimeInactive(0);
    setShowInactiveModal(false);
    window.countdownInitiated = false;
  };

  const extendUserInactivityTimer = useCallback(() => {
    // *** if activity occurred and a countdown is not yet active
    if (window.countdownInitiated !== true) {
      setActivityOccurred(true);
      resetUserInactivityTimer();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTrackInactivity(true);
  }, []);

  // *** set up a recurring API call to update
  useInterval(() => {
    // *** only fire the actual API call if activity has taken place
    if (activityOccurred === true) {
      // *** make an api call
      apiCall();
    }
    setActivityOccurred(false);
  }, config.app.activityRefreshApiCallInterval);

  useInterval(() => {
    if (trackInactivity === false) {
      return;
    }

    // *** open modal
    if (
      config.app.inactivityDuration - timeInactive <=
      config.app.countdownDuration
    ) {
      // *** make sure countdown has started
      if (window.countdownInitiated === false) {
        window.countdownInitiated = true;
        setShowInactiveModal(true);
      }
    }

    setTimeInactive(timeInactive + config.app.activityPollingFrequency);
  }, config.app.activityPollingFrequency);

  // *** assign / un-assign activity event listeners
  useEffect(() => {
    window.countdownInitiated = false;
    config.app.activityEvents.forEach((activityEvent) => {
      window.addEventListener(activityEvent, extendUserInactivityTimer);
    });

    // * clean up
    return () => {
      config.app.activityEvents.forEach((activityEvent) => {
        window.removeEventListener(activityEvent, extendUserInactivityTimer);
      });
    };
  }, [extendUserInactivityTimer]);

  const toggleInactivityTracking = () => {
    setTrackInactivity(!trackInactivity);
    resetUserInactivityTimer();
  };

  return (
    <div>
      <div className={`usa-overlay ${showInactiveModal ? "is-visible" : ""}`} />

      <div>
        <Button type="button" onClick={toggleInactivityTracking}>
          {trackInactivity === false
            ? "Start Tracking Inactivity"
            : "Stop Tracking Inactivity"}
        </Button>
        <span className="margin-left-3">
          time inactive: {timeInactive / 1000} seconds
        </span>
      </div>
      {showInactiveModal ? (
        <Modal
          show={showInactiveModal}
          close={resetUserInactivityTimer}
          showCancel={true}
          cancelButtonText="OK"
          children={
            <CountdownTimer duration={config.app.countdownDuration / 1000} />
          }
        />
      ) : null}
    </div>
  );
};

export default InactivityTracker;
