BEGIN;

INSERT INTO "paintings"
("id", "url_img", "description")
VALUES
(1,'https://img.freepik.com/photos-gratuite/abstrait-colore-splash-3d-fond-generatif-fond-ai_60438-2509.jpg?size=626&ext=jpg', 'Jolie peinture' ),
(2, 'https://img.freepik.com/photos-premium/peinture-deux-femmes-dans-champ-fleurs-parapluie-ai-generatif_958192-1727.jpg?size=626&ext=jpg', 'Incroyable'),
(3, 'https://img.freepik.com/photos-gratuite/texture-acrylique-abstraite_23-2148132139.jpg?size=626&ext=jpg', 'Superbe'),
(4, 'https://img.freepik.com/photos-premium/peinture-abstraite-aux-couleurs-jaune-noir-blanc_893012-93228.jpg?size=626&ext=jpg', 'Amazing !'),
(5, 'https://img.freepik.com/photos-premium/peinture-femme-aux-cheveux-colores_893012-85987.jpg?size=626&ext=jpg&ga=GA1.1.657728215.1700411191&semt=sph', 'Jolie peinture !!');


SELECT setval('paintings_id_seq', (SELECT MAX(id) FROM "paintings"));

COMMIT;