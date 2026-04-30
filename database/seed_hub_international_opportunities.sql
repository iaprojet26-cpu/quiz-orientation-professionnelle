BEGIN;

INSERT INTO opportunities (type, company_name, city, country, source_url, application_deadline, is_remote, is_active)
VALUES
  ('job','Global Product Labs','Remote','Global','https://example.com/international/frontend-engineer', CURRENT_DATE + INTERVAL '35 days', true, true),
  ('job','Nordic Data Group','Stockholm','Sweden','https://example.com/international/data-analyst', CURRENT_DATE + INTERVAL '28 days', false, true),
  ('internship','Berlin Startup Studio','Berlin','Germany','https://example.com/international/ux-internship', CURRENT_DATE + INTERVAL '40 days', false, true),
  ('job','MENA Cloud Systems','Dubai','UAE','https://example.com/international/cloud-engineer', CURRENT_DATE + INTERVAL '25 days', false, true),
  ('job','EduTech Worldwide','Remote','Global','https://example.com/international/content-strategist', CURRENT_DATE + INTERVAL '30 days', true, true),
  ('internship','Toronto AI Hub','Toronto','Canada','https://example.com/international/ai-intern', CURRENT_DATE + INTERVAL '45 days', false, true),
  ('scholarship','Global Women in Tech','Remote','Global','https://example.com/international/women-tech-scholarship', CURRENT_DATE + INTERVAL '60 days', true, true),
  ('call','Youth Mobility Exchange','Brussels','Belgium','https://example.com/international/youth-mobility', CURRENT_DATE + INTERVAL '20 days', false, true),
  ('job','FinTech Horizon','London','UK','https://example.com/international/product-analyst', CURRENT_DATE + INTERVAL '22 days', false, true),
  ('job','Remote Dev Collective','Remote','Global','https://example.com/international/fullstack-remote', CURRENT_DATE + INTERVAL '32 days', true, true)
ON CONFLICT DO NOTHING;

INSERT INTO opportunity_translations (opportunity_id, language, title, description, requirements, application_steps)
SELECT o.id, 'en'::lang_code, v.title, v.description, v.requirements, v.application_steps
FROM opportunities o
JOIN (
  VALUES
    ('Global Product Labs','Frontend Engineer Remote','Build scalable React interfaces for global SaaS products.', ARRAY['React','TypeScript','API integration']::text[], ARRAY['Apply online','Technical challenge','Team interview']::text[]),
    ('Nordic Data Group','Data Analyst Business Intelligence','Analyze KPI trends and support strategic decision making.', ARRAY['SQL','Power BI','Data storytelling']::text[], ARRAY['Submit CV','Case study','Final interview']::text[]),
    ('Berlin Startup Studio','UX UI Design Internship','Support user research and prototype web and mobile interfaces.', ARRAY['Figma','User research basics','Portfolio']::text[], ARRAY['Portfolio submission','Design task','Interview']::text[]),
    ('MENA Cloud Systems','Cloud Engineer','Deploy and monitor cloud infrastructure for regional clients.', ARRAY['AWS or Azure basics','Linux','CI CD']::text[], ARRAY['Online application','Technical screening','Manager interview']::text[]),
    ('EduTech Worldwide','Content Strategy Specialist Remote','Create multilingual educational content strategies for global growth.', ARRAY['SEO content','Research','Editorial planning']::text[], ARRAY['Apply','Portfolio review','Interview']::text[]),
    ('Toronto AI Hub','AI Research Internship','Assist applied AI projects and model evaluation pipelines.', ARRAY['Python','ML fundamentals','Curiosity']::text[], ARRAY['Application','Coding task','Interview']::text[]),
    ('Global Women in Tech','Women in Tech Scholarship 2026','Scholarship for training in software, data and cybersecurity.', ARRAY['Motivation letter','Learning commitment','Basic English']::text[], ARRAY['Online form','Motivation letter','Selection panel']::text[]),
    ('Youth Mobility Exchange','Youth Mobility Program Call','International mobility opportunities for students and graduates.', ARRAY['Age criteria','Academic status','Motivation']::text[], ARRAY['Submit dossier','Interview','Final ranking']::text[]),
    ('FinTech Horizon','Product Analyst','Bridge product business and data insights in a fintech environment.', ARRAY['Analytics','Product thinking','SQL']::text[], ARRAY['Apply','Case interview','Stakeholder interview']::text[]),
    ('Remote Dev Collective','Fullstack Developer Remote','Work on distributed web products with international teams.', ARRAY['JavaScript or TypeScript','React','Node.js']::text[], ARRAY['Online apply','Technical interview','Final discussion']::text[])
) AS v(company_name, title, description, requirements, application_steps)
ON v.company_name = o.company_name
ON CONFLICT (opportunity_id, language) DO UPDATE
SET title = EXCLUDED.title,
    description = EXCLUDED.description,
    requirements = EXCLUDED.requirements,
    application_steps = EXCLUDED.application_steps;

INSERT INTO opportunity_translations (opportunity_id, language, title, description, requirements, application_steps)
SELECT o.id, 'fr'::lang_code, v.title, v.description, v.requirements, v.application_steps
FROM opportunities o
JOIN (
  VALUES
    ('Global Product Labs','Ingenieur Frontend Remote','Developpement interfaces React pour produits SaaS internationaux.', ARRAY['React','TypeScript','Integration API']::text[], ARRAY['Candidature en ligne','Test technique','Entretien equipe']::text[]),
    ('Nordic Data Group','Data Analyst Business Intelligence','Analyse KPI et aide a la decision strategique.', ARRAY['SQL','Power BI','Data storytelling']::text[], ARRAY['Envoyer CV','Etude de cas','Entretien final']::text[]),
    ('Berlin Startup Studio','Stage UX UI Design','Recherche utilisateur et prototypage interfaces web mobile.', ARRAY['Figma','Bases recherche utilisateur','Portfolio']::text[], ARRAY['Depot portfolio','Exercice design','Entretien']::text[]),
    ('MENA Cloud Systems','Ingenieur Cloud','Deploiement et supervision infrastructures cloud.', ARRAY['AWS ou Azure','Linux','CI CD']::text[], ARRAY['Candidature online','Screening technique','Entretien manager']::text[]),
    ('EduTech Worldwide','Specialiste Strategie Contenu Remote','Creation de strategie contenu educatif multilingue.', ARRAY['SEO content','Recherche','Plan editorial']::text[], ARRAY['Postuler','Revue portfolio','Entretien']::text[]),
    ('Toronto AI Hub','Stage Recherche IA','Participation projets IA appliques et evaluation modeles.', ARRAY['Python','Fondamentaux ML','Curiosite']::text[], ARRAY['Candidature','Test code','Entretien']::text[]),
    ('Global Women in Tech','Bourse Women in Tech 2026','Bourse de formation software data cybersecurite.', ARRAY['Lettre motivation','Engagement apprentissage','Anglais de base']::text[], ARRAY['Formulaire','Lettre motivation','Jury selection']::text[]),
    ('Youth Mobility Exchange','Appel Programme Mobilite Jeunes','Opportunites de mobilite internationale etudiants diplomes.', ARRAY['Critere age','Statut academique','Motivation']::text[], ARRAY['Depot dossier','Entretien','Classement final']::text[]),
    ('FinTech Horizon','Product Analyst','Interface produit business data contexte fintech.', ARRAY['Analytics','Vision produit','SQL']::text[], ARRAY['Postuler','Entretien cas','Entretien metier']::text[]),
    ('Remote Dev Collective','Developpeur Fullstack Remote','Developpement produits web distribues avec equipes internationales.', ARRAY['JavaScript ou TypeScript','React','Node.js']::text[], ARRAY['Candidature en ligne','Entretien technique','Discussion finale']::text[])
) AS v(company_name, title, description, requirements, application_steps)
ON v.company_name = o.company_name
ON CONFLICT (opportunity_id, language) DO UPDATE
SET title = EXCLUDED.title,
    description = EXCLUDED.description,
    requirements = EXCLUDED.requirements,
    application_steps = EXCLUDED.application_steps;

INSERT INTO opportunity_translations (opportunity_id, language, title, description, requirements, application_steps)
SELECT o.id, 'ar'::lang_code, v.title, v.description, v.requirements, v.application_steps
FROM opportunities o
JOIN (
  VALUES
    ('Global Product Labs','مهندس Frontend عن بعد','تطوير واجهات React قابلة للتوسع لمنتجات SaaS عالمية.', ARRAY['React','TypeScript','تكامل API']::text[], ARRAY['ترشح عبر الانترنت','تحدي تقني','مقابلة الفريق']::text[]),
    ('Nordic Data Group','محلل بيانات ذكاء الاعمال','تحليل مؤشرات الاداء ودعم القرار الاستراتيجي.', ARRAY['SQL','Power BI','سرد البيانات']::text[], ARRAY['ارسال السيرة الذاتية','دراسة حالة','مقابلة نهائية']::text[]),
    ('Berlin Startup Studio','تدريب UX UI Design','المساهمة في بحث المستخدمين ونمذجة الواجهات.', ARRAY['Figma','اساسيات بحث المستخدم','Portfolio']::text[], ARRAY['ارسال Portfolio','مهمة تصميم','مقابلة']::text[]),
    ('MENA Cloud Systems','مهندس سحابي','نشر ومراقبة بنى تحتية سحابية لعملاء اقليميين.', ARRAY['AWS او Azure','Linux','CI CD']::text[], ARRAY['ترشح الكتروني','اختبار تقني','مقابلة المدير']::text[]),
    ('EduTech Worldwide','اخصائي استراتيجية المحتوى عن بعد','اعداد استراتيجيات محتوى تعليمي متعدد اللغات للنمو الدولي.', ARRAY['SEO content','بحث','تخطيط تحريري']::text[], ARRAY['ترشح','مراجعة الاعمال','مقابلة']::text[]),
    ('Toronto AI Hub','تدريب بحث في الذكاء الاصطناعي','المساهمة في مشاريع ذكاء اصطناعي تطبيقي وتقييم النماذج.', ARRAY['Python','اساسيات ML','فضول']::text[], ARRAY['ترشح','اختبار برمجة','مقابلة']::text[]),
    ('Global Women in Tech','منحة Women in Tech 2026','منحة للتكوين في البرمجيات والبيانات والامن السيبراني.', ARRAY['رسالة تحفيزية','التزام بالتعلم','انجليزية اساسية']::text[], ARRAY['استمارة','رسالة تحفيزية','لجنة انتقاء']::text[]),
    ('Youth Mobility Exchange','نداء برنامج تنقل الشباب','فرص تنقل دولية للطلبة والخريجين.', ARRAY['معيار السن','الوضع الاكاديمي','التحفيز']::text[], ARRAY['ارسال الملف','مقابلة','ترتيب نهائي']::text[]),
    ('FinTech Horizon','محلل منتج','الربط بين المنتج والاعمال والبيانات في بيئة fintech.', ARRAY['Analytics','تفكير منتج','SQL']::text[], ARRAY['ترشح','مقابلة حالة','مقابلة مهنية']::text[]),
    ('Remote Dev Collective','مطور Fullstack عن بعد','العمل على منتجات ويب موزعة مع فرق دولية.', ARRAY['JavaScript او TypeScript','React','Node.js']::text[], ARRAY['ترشح الكتروني','مقابلة تقنية','مناقشة نهائية']::text[])
) AS v(company_name, title, description, requirements, application_steps)
ON v.company_name = o.company_name
ON CONFLICT (opportunity_id, language) DO UPDATE
SET title = EXCLUDED.title,
    description = EXCLUDED.description,
    requirements = EXCLUDED.requirements,
    application_steps = EXCLUDED.application_steps;

COMMIT;
