import { FastifyInstance } from "fastify";
import { supabase } from "../server";

const posts = (server: FastifyInstance, _: any, done: () => void) => {
    server.get("/", async (_request, _response) => {
        const { data: posts, error } = await supabase.from("posts").select();

        if (error) console.error("error: fetching posts");

        return posts;
    });

    done();
};

export default posts;
