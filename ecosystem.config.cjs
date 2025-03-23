module.exports = {
    apps: [
        {
            name: "FootballSchedule - production",
            script: "./standalone/server.js",
            instances: 1,
            max_memory_restart: "500M",

            // Logging
            out_file: "./log/out.log",
            error_file: "./log/error.log",
            merge_logs: true,
            log_date_format: "DD-MM HH:mm:ss Z",
            log_type: "json",

            // Env Specific Config
            env_production: {
                NODE_ENV: "production",
                PORT: 3600,
                exec_mode: "cluster_mode",
            },
        },
    ],
};
