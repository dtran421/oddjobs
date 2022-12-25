import { FastifyInstance } from "fastify";

import { ShiftsRequestQuery } from "../lib/types";
import { supabase } from "../server";

const shifts = (server: FastifyInstance, _: any, done: () => void) => {
    server.get("/", async (request, reply) => {
        const { all } = request.query as ShiftsRequestQuery;

        let query = supabase.from("shifts").select();
        if (!all) query = query.eq("active", true);

        const { data: shifts, error } = await query.limit(100);

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

export default shifts;
