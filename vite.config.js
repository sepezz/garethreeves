import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api/substack-feed": {
                target: "https://garethareeves.substack.com",
                changeOrigin: true,
                secure: true,
                rewrite: function () { return "/feed"; },
            },
            "/api/substack-archive": {
                target: "https://garethareeves.substack.com",
                changeOrigin: true,
                secure: true,
                rewrite: function () { return "/archive"; },
            },
        },
    },
});
