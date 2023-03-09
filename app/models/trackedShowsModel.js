
module.exports = {
    insert: (data, conn, myFunction) => {
        conn.query(`INSERT INTO vicionados (name, description, date_added, episode_current, episodes_quantity, seasons_quantity, api_provider, api_id, video_provider_1, video_provider_2, video_provider_3, users_id) VALUES
        ('${data.name}', '${data.description}', '${data.date_added}', ${data.episode_current}, ${data.episodes_quantity}, ${data.seasons_quantity}, '${data.api_provider}', '${data.api_id}', '${data.video_provider_1}', '${data.video_provider_2}', '${data.video_provider_3}', ${data.users_id})`, myFunction);
    },
    getAllTrackedShowsByUser: (userId, conn, myFunction) => {
        conn.query(`SELECT * FROM vicionados WHERE users_id = ${userId}`, myFunction);
    }
}