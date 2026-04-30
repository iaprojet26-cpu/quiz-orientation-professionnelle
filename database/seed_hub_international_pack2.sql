-- ============================================
-- PACK #2 INTERNATIONAL SEO
-- 10 EN-focused opportunities + 10 EN-focused career guides
-- with FR/AR fallback translations for multilingual consistency
-- ============================================

BEGIN;

-- --------------------------------------------
-- A) OPPORTUNITIES (10 international/remote)
-- --------------------------------------------
WITH inserted AS (
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
  RETURNING id, company_name
)
INSERT INTO opportunity_translations (
  opportunity_id, language, title, description, requirements, application_steps
)
SELECT i.id, t.language::lang_code, t.title, t.description, t.requirements, t.application_steps
FROM inserted i
JOIN (
  VALUES
  ('Global Product Labs','en','Frontend Engineer (Remote)','Build scalable React interfaces for global SaaS products.', ARRAY['React','TypeScript','API integration']::text[], ARRAY['Apply online','Technical challenge','Team interview']::text[]),
  ('Global Product Labs','fr','Ingenieur Frontend (Remote)','Developpement d interfaces React scalables pour produits SaaS internationaux.', ARRAY['React','TypeScript','Integration API']::text[], ARRAY['Candidature en ligne','Test technique','Entretien equipe']::text[]),
  ('Global Product Labs','ar','مهندس Frontend عن بعد','تطوير واجهات React قابلة للتوسع لمنتجات SaaS عالمية.', ARRAY['React','TypeScript','تكامل API']::text[], ARRAY['ترشح عبر الإنترنت','تحدي تقني','مقابلة الفريق']::text[]),

  ('Nordic Data Group','en','Data Analyst (Business Intelligence)','Analyze KPI trends and support strategic decision-making.', ARRAY['SQL','Power BI','Storytelling with data']::text[], ARRAY['Submit CV','Case study','Final interview']::text[]),
  ('Nordic Data Group','fr','Data Analyst (Business Intelligence)','Analyse des KPI et support a la decision strategique.', ARRAY['SQL','Power BI','Data storytelling']::text[], ARRAY['Envoyer CV','Etude de cas','Entretien final']::text[]),
  ('Nordic Data Group','ar','محلل بيانات (ذكاء الأعمال)','تحليل مؤشرات الأداء ودعم القرار الاستراتيجي.', ARRAY['SQL','Power BI','سرد البيانات']::text[], ARRAY['إرسال السيرة الذاتية','دراسة حالة','مقابلة نهائية']::text[]),

  ('Berlin Startup Studio','en','UX/UI Design Internship','Support user research and mobile/web interface prototyping.', ARRAY['Figma','User research basics','Portfolio']::text[], ARRAY['Portfolio submission','Design task','Interview']::text[]),
  ('Berlin Startup Studio','fr','Stage UX/UI Design','Appui recherche utilisateur et prototypage interfaces web/mobile.', ARRAY['Figma','Bases recherche utilisateur','Portfolio']::text[], ARRAY['Depot portfolio','Exercice design','Entretien']::text[]),
  ('Berlin Startup Studio','ar','تدريب UX/UI Design','المساهمة في بحث المستخدمين ونمذجة واجهات الويب والموبايل.', ARRAY['Figma','أساسيات بحث المستخدم','Portfolio']::text[], ARRAY['إرسال Portfolio','مهمة تصميم','مقابلة']::text[]),

  ('MENA Cloud Systems','en','Cloud Engineer','Deploy and monitor cloud infrastructure for regional clients.', ARRAY['AWS/Azure basics','Linux','CI/CD']::text[], ARRAY['Online application','Technical screening','Manager interview']::text[]),
  ('MENA Cloud Systems','fr','Ingenieur Cloud','Deploiement et supervision d infrastructures cloud pour clients regionaux.', ARRAY['AWS/Azure','Linux','CI/CD']::text[], ARRAY['Candidature online','Screening technique','Entretien manager']::text[]),
  ('MENA Cloud Systems','ar','مهندس سحابي','نشر ومراقبة بنى تحتية سحابية لعملاء إقليميين.', ARRAY['AWS/Azure','Linux','CI/CD']::text[], ARRAY['ترشح إلكتروني','اختبار تقني','مقابلة المدير']::text[]),

  ('EduTech Worldwide','en','Content Strategy Specialist (Remote)','Create multilingual educational content strategies for global growth.', ARRAY['SEO content','Research','Editorial planning']::text[], ARRAY['Apply','Portfolio review','Interview']::text[]),
  ('EduTech Worldwide','fr','Specialiste Strategie Contenu (Remote)','Creation de strategies de contenu educatif multilingue.', ARRAY['SEO content','Recherche','Plan editorial']::text[], ARRAY['Postuler','Revue portfolio','Entretien']::text[]),
  ('EduTech Worldwide','ar','أخصائي استراتيجية المحتوى (عن بعد)','إعداد استراتيجيات محتوى تعليمي متعدد اللغات للنمو الدولي.', ARRAY['SEO content','بحث','تخطيط تحريري']::text[], ARRAY['ترشح','مراجعة الأعمال','مقابلة']::text[]),

  ('Toronto AI Hub','en','AI Research Internship','Assist applied AI projects and model evaluation pipelines.', ARRAY['Python','ML fundamentals','Curiosity']::text[], ARRAY['Application','Coding task','Interview']::text[]),
  ('Toronto AI Hub','fr','Stage Recherche IA','Participation a des projets IA appliques et evaluation de modeles.', ARRAY['Python','Fondamentaux ML','Curiosite']::text[], ARRAY['Candidature','Test code','Entretien']::text[]),
  ('Toronto AI Hub','ar','تدريب بحث في الذكاء الاصطناعي','المساهمة في مشاريع ذكاء اصطناعي تطبيقي وتقييم النماذج.', ARRAY['Python','أساسيات ML','فضول']::text[], ARRAY['ترشح','اختبار برمجة','مقابلة']::text[]),

  ('Global Women in Tech','en','Women in Tech Scholarship 2026','Scholarship for training in software, data and cybersecurity.', ARRAY['Motivation letter','Learning commitment','Basic English']::text[], ARRAY['Online form','Motivation letter','Selection panel']::text[]),
  ('Global Women in Tech','fr','Bourse Women in Tech 2026','Bourse de formation en software, data et cybersecurite.', ARRAY['Lettre motivation','Engagement apprentissage','Anglais de base']::text[], ARRAY['Formulaire','Lettre motivation','Jury selection']::text[]),
  ('Global Women in Tech','ar','منحة Women in Tech 2026','منحة للتكوين في البرمجيات والبيانات والأمن السيبراني.', ARRAY['رسالة تحفيزية','التزام بالتعلم','إنجليزية أساسية']::text[], ARRAY['استمارة','رسالة تحفيزية','لجنة انتقاء']::text[]),

  ('Youth Mobility Exchange','en','Youth Mobility Program Call','International mobility opportunities for students and graduates.', ARRAY['Age criteria','Academic status','Motivation']::text[], ARRAY['Submit dossier','Interview','Final ranking']::text[]),
  ('Youth Mobility Exchange','fr','Appel Programme Mobilite Jeunes','Opportunites de mobilite internationale pour etudiants et diplomes.', ARRAY['Critere age','Statut academique','Motivation']::text[], ARRAY['Depot dossier','Entretien','Classement final']::text[]),
  ('Youth Mobility Exchange','ar','نداء برنامج تنقل الشباب','فرص تنقل دولية للطلبة والخريجين.', ARRAY['معيار السن','الوضع الأكاديمي','التحفيز']::text[], ARRAY['إرسال الملف','مقابلة','ترتيب نهائي']::text[]),

  ('FinTech Horizon','en','Product Analyst','Bridge product, business and data insights in a fintech environment.', ARRAY['Analytics','Product thinking','SQL']::text[], ARRAY['Apply','Case interview','Stakeholder interview']::text[]),
  ('FinTech Horizon','fr','Product Analyst','Interface produit/business/data dans un contexte fintech.', ARRAY['Analytics','Vision produit','SQL']::text[], ARRAY['Postuler','Entretien cas','Entretien metier']::text[]),
  ('FinTech Horizon','ar','محلل منتج','الربط بين المنتج والأعمال والبيانات في بيئة fintech.', ARRAY['Analytics','تفكير منتج','SQL']::text[], ARRAY['ترشح','مقابلة حالة','مقابلة مهنية']::text[]),

  ('Remote Dev Collective','en','Fullstack Developer (Remote)','Work on distributed web products with international teams.', ARRAY['JavaScript/TypeScript','React','Node.js']::text[], ARRAY['Online apply','Technical interview','Final discussion']::text[]),
  ('Remote Dev Collective','fr','Developpeur Fullstack (Remote)','Developpement de produits web distribues avec equipes internationales.', ARRAY['JavaScript/TypeScript','React','Node.js']::text[], ARRAY['Candidature en ligne','Entretien technique','Discussion finale']::text[]),
  ('Remote Dev Collective','ar','مطور Fullstack (عن بعد)','العمل على منتجات ويب موزعة مع فرق دولية.', ARRAY['JavaScript/TypeScript','React','Node.js']::text[], ARRAY['ترشح إلكتروني','مقابلة تقنية','مناقشة نهائية']::text[])
) AS t(company_name, language, title, description, requirements, application_steps)
ON t.company_name = i.company_name
ON CONFLICT (opportunity_id, language) DO UPDATE
SET title = EXCLUDED.title,
    description = EXCLUDED.description,
    requirements = EXCLUDED.requirements,
    application_steps = EXCLUDED.application_steps;

-- --------------------------------------------
-- B) CAREER GUIDES (10 EN-focused)
-- --------------------------------------------
WITH inserted AS (
  INSERT INTO career_guides (slug, category, reading_minutes, is_published, published_at)
  VALUES
    ('how-to-get-remote-job-without-experience', 'international', 9, true, NOW()),
    ('top-countries-for-tech-jobs-2026', 'international', 10, true, NOW()),
    ('international-cv-format-guide', 'cv', 8, true, NOW()),
    ('linkedin-strategy-for-global-opportunities', 'skills', 7, true, NOW()),
    ('how-to-prepare-for-online-interviews', 'interview', 7, true, NOW()),
    ('how-to-build-project-portfolio-fast', 'skills', 8, true, NOW()),
    ('career-switch-to-data-in-6-months', 'career-choice', 9, true, NOW()),
    ('scholarships-for-international-students-guide', 'international', 10, true, NOW()),
    ('networking-strategies-for-young-graduates', 'skills', 7, true, NOW()),
    ('job-search-system-that-gets-results', 'career-choice', 9, true, NOW())
  ON CONFLICT (slug) DO UPDATE
    SET is_published = EXCLUDED.is_published,
        published_at = COALESCE(career_guides.published_at, EXCLUDED.published_at),
        updated_at = NOW()
  RETURNING id, slug
)
INSERT INTO career_guide_translations (
  career_guide_id, language, title, summary, body_markdown, seo_title, seo_description
)
SELECT i.id, t.language::lang_code, t.title, t.summary, t.body_markdown, t.seo_title, t.seo_description
FROM inserted i
JOIN (
  VALUES
  ('how-to-get-remote-job-without-experience','en','How to get a remote job without experience','Step-by-step plan to land your first remote role with practical proof of skills.','# Step 1\nChoose one clear role.\n\n# Step 2\nBuild 2 portfolio projects.\n\n# Step 3\nApply weekly with tailored messages.\n\n# Step 4\nTrack metrics and improve.', 'How to get a remote job without experience', 'Practical guide to start remote work even as a beginner.'),
  ('how-to-get-remote-job-without-experience','fr','Trouver un job remote sans experience','Plan progressif pour obtenir un premier poste remote avec preuves de competence.','# Etape 1\nChoisissez un role clair.\n\n# Etape 2\nCreez 2 projets portfolio.\n\n# Etape 3\nPostulez chaque semaine de facon ciblee.\n\n# Etape 4\nSuivez vos resultats et ajustez.', 'Trouver un job remote sans experience', 'Guide pratique pour debuter en remote.'),
  ('how-to-get-remote-job-without-experience','ar','كيف تحصل على عمل عن بعد بدون خبرة','خطة عملية للحصول على أول وظيفة عن بعد عبر إثبات المهارات بالمشاريع.','# الخطوة 1\nاختر دورا واضحا.\n\n# الخطوة 2\nأنجز مشروعين Portfolio.\n\n# الخطوة 3\nترشح أسبوعيا برسائل مخصصة.\n\n# الخطوة 4\nتتبع النتائج وحسّن الاستراتيجية.', 'كيف تحصل على عمل عن بعد بدون خبرة', 'دليل عملي للبدء في العمل عن بعد للمبتدئين.'),

  ('top-countries-for-tech-jobs-2026','en','Top countries for tech jobs in 2026','Market overview for salaries, visa paths and hiring trends.','# Compare markets\nCompensation, demand, and immigration options.\n\n# Build strategy\nTarget 2 countries and adapt your applications.', 'Top countries for tech jobs in 2026', 'Where to apply internationally for tech careers in 2026.'),
  ('top-countries-for-tech-jobs-2026','fr','Top pays pour les jobs tech en 2026','Vue marche sur salaires, visa et tendances recrutement.','# Comparer les marches\nSalaire, demande, options immigration.\n\n# Strategie\nCiblez 2 pays et adaptez vos candidatures.', 'Top pays pour les jobs tech en 2026', 'Ou candidater a l international en tech en 2026.'),
  ('top-countries-for-tech-jobs-2026','ar','أفضل الدول لوظائف التكنولوجيا 2026','نظرة على الرواتب ومسارات التأشيرة واتجاهات التوظيف.','# قارن الأسواق\nالراتب والطلب وخيارات الهجرة.\n\n# خطة\nاستهدف دولتين وعدّل ترشيحاتك.', 'أفضل الدول لوظائف التكنولوجيا 2026', 'أين تترشح دوليا في مجال التقنية سنة 2026.'),

  ('international-cv-format-guide','en','International CV format guide','How to structure a CV for global recruiters and ATS systems.','# Essentials\nHeadline, impact bullets, quantified achievements.\n\n# Localization\nAdapt English tone and keyword density.', 'International CV format guide', 'Build an ATS-friendly CV for international roles.'),
  ('international-cv-format-guide','fr','Guide format CV international','Comment structurer un CV pour recruteurs internationaux et ATS.','# Essentiels\nTitre, bullet impact, resultats chiffres.\n\n# Localisation\nAdapter le ton anglais et mots cles.', 'Guide format CV international', 'Construire un CV ATS-friendly pour postes internationaux.'),
  ('international-cv-format-guide','ar','دليل تنسيق السيرة الذاتية الدولية','كيفية إعداد سيرة مناسبة للمجندين الدوليين وأنظمة ATS.','# الأساسيات\nعنوان قوي ونتائج رقمية.\n\n# التكييف\nتكييف اللغة الإنجليزية والكلمات المفتاحية.', 'دليل تنسيق السيرة الذاتية الدولية', 'إنشاء سيرة ذاتية متوافقة مع ATS للوظائف الدولية.'),

  ('linkedin-strategy-for-global-opportunities','en','LinkedIn strategy for global opportunities','Profile optimization and outreach framework for cross-border jobs.','# Profile\nOptimize headline, about and featured section.\n\n# Outreach\n10 targeted messages per week.', 'LinkedIn strategy for global opportunities', 'Use LinkedIn effectively to access international jobs.'),
  ('linkedin-strategy-for-global-opportunities','fr','Strategie LinkedIn pour opportunites globales','Optimisation profil et demarchage pour opportunites internationales.','# Profil\nOptimisez headline, about, featured.\n\n# Outreach\n10 messages cibles par semaine.', 'Strategie LinkedIn pour opportunites globales', 'Utiliser LinkedIn pour acceder aux jobs internationaux.'),
  ('linkedin-strategy-for-global-opportunities','ar','استراتيجية LinkedIn للفرص الدولية','تحسين الحساب وخطة تواصل للوصول إلى فرص عالمية.','# الحساب\nحسّن العنوان والنبذة وقسم الأعمال.\n\n# التواصل\n10 رسائل مستهدفة أسبوعيا.', 'استراتيجية LinkedIn للفرص الدولية', 'استعمال LinkedIn بفعالية للوصول لفرص دولية.'),

  ('how-to-prepare-for-online-interviews','en','How to prepare for online interviews','Checklist for technical setup, communication and interview confidence.','# Setup\nSound, camera, internet backup.\n\n# Practice\nMock interviews with STAR examples.', 'How to prepare for online interviews', 'Practical online interview preparation checklist.'),
  ('how-to-prepare-for-online-interviews','fr','Preparation aux entretiens en ligne','Checklist technique et communication pour entretiens distants.','# Setup\nSon, camera, connexion backup.\n\n# Practice\nMock interviews avec methode STAR.', 'Preparation aux entretiens en ligne', 'Checklist pratique pour reussir ses entretiens online.'),
  ('how-to-prepare-for-online-interviews','ar','التحضير للمقابلات عبر الإنترنت','قائمة عملية للتجهيز التقني والتواصل بثقة في المقابلات عن بعد.','# التجهيز\nصوت وكاميرا واتصال احتياطي.\n\n# التدريب\nمحاكاة مقابلات مع أمثلة STAR.', 'التحضير للمقابلات عبر الإنترنت', 'دليل عملي للنجاح في المقابلات عن بعد.'),

  ('how-to-build-project-portfolio-fast','en','How to build a project portfolio fast','A 30-day plan to create portfolio projects that prove employable skills.','# Plan\nShip 2 projects in 30 days.\n\n# Quality\nFocus on documentation and outcomes.', 'How to build project portfolio fast', 'Create a strong portfolio quickly for job applications.'),
  ('how-to-build-project-portfolio-fast','fr','Construire un portfolio rapidement','Plan 30 jours pour realiser des projets preuves de competence.','# Plan\nLivrer 2 projets en 30 jours.\n\n# Qualite\nDocumenter objectifs et resultats.', 'Construire un portfolio rapidement', 'Creer rapidement un portfolio convaincant pour candidatures.'),
  ('how-to-build-project-portfolio-fast','ar','بناء Portfolio بسرعة','خطة 30 يوما لإنجاز مشاريع تثبت الجاهزية المهنية.','# الخطة\nأنجز مشروعين خلال 30 يوما.\n\n# الجودة\nوثّق الأهداف والنتائج.', 'بناء Portfolio بسرعة', 'إنشاء Portfolio قوي بسرعة لدعم الترشيحات.'),

  ('career-switch-to-data-in-6-months','en','Career switch to data in 6 months','Learning roadmap for transitioning into data roles from non-tech backgrounds.','# Months 1-2\nSQL and analytics foundations.\n\n# Months 3-4\nDashboards + case studies.\n\n# Months 5-6\nPortfolio + job applications.', 'Career switch to data in 6 months', 'Roadmap to move into data roles within six months.'),
  ('career-switch-to-data-in-6-months','fr','Reconversion vers la data en 6 mois','Roadmap apprentissage pour integrer des roles data depuis un parcours non-tech.','# Mois 1-2\nFondamentaux SQL/analytics.\n\n# Mois 3-4\nDashboards et cas pratiques.\n\n# Mois 5-6\nPortfolio et candidatures.', 'Reconversion vers la data en 6 mois', 'Plan concret pour transitionner vers la data en 6 mois.'),
  ('career-switch-to-data-in-6-months','ar','الانتقال إلى مجال البيانات في 6 أشهر','خارطة تعلم للانتقال إلى وظائف البيانات من مسار غير تقني.','# الشهر 1-2\nأساسيات SQL والتحليل.\n\n# الشهر 3-4\nلوحات قيادة ودراسات حالة.\n\n# الشهر 5-6\nPortfolio والترشيح.', 'الانتقال إلى مجال البيانات في 6 أشهر', 'خطة واضحة للانتقال إلى وظائف البيانات خلال 6 أشهر.'),

  ('scholarships-for-international-students-guide','en','Scholarships for international students: complete guide','How to find, evaluate and apply to scholarship programs effectively.','# Search\nUse trusted scholarship databases.\n\n# Selection\nPrioritize fit and eligibility.\n\n# Application\nPrepare documents early.', 'Scholarships for international students guide', 'Complete scholarship application strategy for international students.'),
  ('scholarships-for-international-students-guide','fr','Bourses etudiantes internationales: guide complet','Comment identifier et candidater efficacement aux programmes de bourse.','# Recherche\nPlateformes fiables.\n\n# Selection\nPrioriser eligibilite et adequation.\n\n# Dossier\nPreparer documents en avance.', 'Bourses etudiantes internationales guide', 'Strategie complete de candidature aux bourses internationales.'),
  ('scholarships-for-international-students-guide','ar','منح الطلاب الدوليين: دليل شامل','كيفية البحث عن المنح وتقييمها والتقديم عليها بفعالية.','# البحث\nاستعمل منصات موثوقة.\n\n# الانتقاء\nأولوية للتوافق والشروط.\n\n# الملف\nحضّر الوثائق مبكرا.', 'منح الطلاب الدوليين دليل شامل', 'استراتيجية كاملة للتقديم على المنح الدولية.'),

  ('networking-strategies-for-young-graduates','en','Networking strategies for young graduates','Build a professional network that opens hidden opportunities.','# Weekly routine\nReach out to 5 professionals.\n\n# Follow-up\nShare progress updates and value.', 'Networking strategies for young graduates', 'Practical networking playbook for new graduates.'),
  ('networking-strategies-for-young-graduates','fr','Strategies de networking pour jeunes diplomes','Construire un reseau professionnel qui ouvre des opportunites cachees.','# Routine hebdo\nContacter 5 professionnels.\n\n# Suivi\nPartager progression et valeur.', 'Strategies de networking pour jeunes diplomes', 'Plan pratique de networking pour debut de carriere.'),
  ('networking-strategies-for-young-graduates','ar','استراتيجيات Networking للخريجين الجدد','بناء شبكة مهنية تفتح فرصا غير معلنة.','# روتين أسبوعي\nتواصل مع 5 مهنيين.\n\n# المتابعة\nشارك تقدمك وقيمتك.', 'استراتيجيات Networking للخريجين الجدد', 'خطة عملية لبناء شبكة مهنية في بداية المسار.'),

  ('job-search-system-that-gets-results','en','Job search system that gets results','Build a repeatable application process with measurable outcomes.','# Pipeline\nTrack applications by stage.\n\n# Improvement\nOptimize CV, cover letter, outreach based on data.', 'Job search system that gets results', 'A structured system to improve job search performance.'),
  ('job-search-system-that-gets-results','fr','Systeme de recherche emploi efficace','Mettre en place un processus de candidature mesurable et optimisable.','# Pipeline\nSuivre les candidatures par etape.\n\n# Optimisation\nAjuster CV/lettre/outreach selon donnees.', 'Systeme de recherche emploi efficace', 'Systeme structure pour ameliorer vos resultats de recherche emploi.'),
  ('job-search-system-that-gets-results','ar','نظام بحث عن عمل يعطي نتائج','بناء عملية ترشيح قابلة للقياس والتحسين المستمر.','# Pipeline\nتتبع الطلبات حسب المراحل.\n\n# التحسين\nطوّر السيرة والرسائل بناء على النتائج.', 'نظام بحث عن عمل يعطي نتائج', 'نظام عملي لرفع فعالية البحث عن وظيفة.')
) AS t(slug, language, title, summary, body_markdown, seo_title, seo_description)
ON t.slug = i.slug
ON CONFLICT (career_guide_id, language) DO UPDATE
SET title = EXCLUDED.title,
    summary = EXCLUDED.summary,
    body_markdown = EXCLUDED.body_markdown,
    seo_title = EXCLUDED.seo_title,
    seo_description = EXCLUDED.seo_description;

COMMIT;

-- Next recommended action:
-- Re-run database/seed_profile_content_matches.sql
-- Then regenerate sitemap from admin.
