import moment from "moment";

export const formatDate = (dateTimestamp: string): string => {
    const startDate = moment(dateTimestamp, "YYYY-MM-DDTHH:mm:ss.SSSZ");

    return startDate.format("dddd, MMMM Do, YYYY");
};

export const formatStartTime = (startTime: string): string => {
    const date = moment(startTime, "HH:mm:ssZZ");
    return date.format("h:mm A");
};

export const formatShiftLength = (shiftLengthTimestamp: string): string => {
    const [hours, minutes, seconds] = shiftLengthTimestamp.split(":");

    const shiftLength = moment.duration({
        hours: parseInt(hours),
        minutes: parseInt(minutes),
        seconds: parseInt(seconds)
    });

    const hrs = shiftLength.hours(),
        mins = shiftLength.minutes();

    let formattedShiftLength = `${hrs} hour${hrs > 1 ? "s" : ""}`;
    if (mins) formattedShiftLength += ` ${mins} mins`;

    return formattedShiftLength;
};
