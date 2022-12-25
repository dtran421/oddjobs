import { FastifyInstance } from "fastify";
import { ShiftRequestParams, SignupRequestBody } from "../lib/types";

import { supabase } from "../server";

const shift = (server: FastifyInstance, _: any, done: () => void) => {
    server.get("/:shiftId", async (request, reply) => {
        const { shiftId } = request.params as ShiftRequestParams;

        if (!shiftId) {
            console.error(
                `[${new Date().toISOString()}] error: no shift id provided`
            );
            reply.code(400).send("no shift id provided");
        }

        const { data: shifts, error } = await supabase
            .from("shifts")
            .select()
            .eq("id", shiftId);

        if (error) {
            console.error(
                `[${new Date().toISOString()}] error: ${error.message}`
            );
            reply.code(500).send("error: fetching shift");
        }

        return shifts;
    });

    server.post("/:shiftId", async (request, reply) => {
        const { shiftId } = request.params as ShiftRequestParams;

        if (!shiftId) {
            console.error(
                `[${new Date().toISOString()}] error: no shift id provided`
            );
            reply.code(400).send("no shift id provided");
        }

        const { userId } = request.body as SignupRequestBody;

        if (!userId) {
            console.error(
                `[${new Date().toISOString()}] error: missing user id param`
            );
            reply.code(400).send("error: missing user id param");
        }

        const updates = { active: false, employee_id: userId };

        const { error } = await supabase
            .from("shifts")
            .update(updates)
            .eq("id", shiftId);

        if (error) {
            console.error(
                `[${new Date().toISOString()}] error: ${error.message}`
            );
            reply.code(500).send("error: signing up for shift");
        }

        reply.code(200);
    });

    done();
};

export default shift;
