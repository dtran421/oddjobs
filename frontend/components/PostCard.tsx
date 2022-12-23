import React from "react";
import { View } from "react-native";
import { Card, Text } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";

import { Post } from "../lib/schema";
import { useThemeColor } from "./Themed";

const formatDate = (dateTimestamp: string): string => {
    const startDate = moment(dateTimestamp, "YYYY-MM-DDTHH:mm:ss.SSSZ");

    return startDate.format("dddd, MMMM Do, YYYY");
};

const formatStartTime = (startTime: string): string => {
    const date = moment(startTime, "HH:mm:ssZZ");
    return date.format("h:mm A");
};

const formatShiftLength = (shiftLengthTimestamp: string): string => {
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

const PostCard = ({
    company,
    position,
    date,
    start_time: startTime,
    shift_length: shiftLength
}: Post) => (
    <Card
        containerStyle={{
            borderColor: useThemeColor({}, "background"),
            borderRadius: 8,
            padding: 0
        }}
    >
        <LinearGradient
            start={[0, 1]}
            end={[1, 0]}
            colors={["#2cf933", "#16d53c", "#1ab00e"]}
            style={{
                borderRadius: 8,
                padding: 20
            }}
        >
            <View>
                <View style={{ marginBottom: 14 }}>
                    <Text style={{ fontWeight: "700" }} h3>
                        {position}
                    </Text>
                    <Text style={{ fontWeight: "500" }} h4>
                        {company}
                    </Text>
                </View>
                <Text style={{ marginBottom: 4 }}>{formatDate(date)}</Text>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <Text>{formatStartTime(startTime)}</Text>
                    <Text>{formatShiftLength(shiftLength)}</Text>
                </View>
            </View>
        </LinearGradient>
    </Card>
);

export default PostCard;
