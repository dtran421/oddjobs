import { FastifyInstance } from "fastify";

import { AccountsShiftsRequestParams } from "../lib/types";
import { supabase } from "../server";

const accounts = (server: FastifyInstance, _: any, done: () => void) => {
    server.get("/:userId/shifts", async (request, reply) => {
        const { userId } = request.params as AccountsShiftsRequestParams;

        if (!userId) {
            console.error(
                `[${new Date().toISOString()}] error: missing user id param`
            );
            reply.code(400).send("error: missing user id param");
        }

        const { data: shifts, error } = await supabase
            .from("shifts")
            .select()
            .eq("employee_id", userId);

        if (error) {
            console.error(
                `[${new Date().toISOString()}] error: ${error.message}`
            );
            reply.code(500).send("error: fetching shifts");
        }

        return shifts;
    });

    done();
};

export default accounts;
