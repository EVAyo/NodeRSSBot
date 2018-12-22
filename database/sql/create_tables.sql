CREATE TABLE IF NOT EXISTS "rss_feed"(
	feed_id INTEGER
		constraint rss_feed_pk
			primary key autoincrement,
	url TEXT not null,
	feed_title TEXT not null,
	recent_hash_list TEXT default '[]'
);
create TABLE IF NOT EXISTS subscribes
(
	subscribe_id INTEGER
		constraint subscribes_pk
			primary key,
	feed_id INTEGER not null
		constraint subscribes_rss_feed_feed_id_fk
			references rss_feed,
	user_id INTEGER not null
);

