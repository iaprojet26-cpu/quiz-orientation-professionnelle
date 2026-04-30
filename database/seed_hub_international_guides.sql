BEGIN;

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
    updated_at = NOW();

INSERT INTO career_guide_translations (career_guide_id, language, title, summary, body_markdown, seo_title, seo_description)
SELECT g.id, 'en'::lang_code, v.title, v.summary, v.body_markdown, v.seo_title, v.seo_description
FROM career_guides g
JOIN (
  VALUES
    ('how-to-get-remote-job-without-experience','How to get a remote job without experience','Step by step plan to land your first remote role with practical proof of skills.','# Step 1\nChoose one clear role.\n\n# Step 2\nBuild two portfolio projects.\n\n# Step 3\nApply weekly with tailored messages.\n\n# Step 4\nTrack metrics and improve.','How to get a remote job without experience','Practical guide to start remote work even as a beginner.'),
    ('top-countries-for-tech-jobs-2026','Top countries for tech jobs in 2026','Market overview for salaries visa paths and hiring trends.','# Compare markets\nCompensation demand and immigration options.\n\n# Build strategy\nTarget two countries and adapt applications.','Top countries for tech jobs in 2026','Where to apply internationally for tech careers in 2026.'),
    ('international-cv-format-guide','International CV format guide','How to structure a CV for global recruiters and ATS systems.','# Essentials\nHeadline impact bullets quantified achievements.\n\n# Localization\nAdapt English tone and keyword density.','International CV format guide','Build an ATS friendly CV for international roles.'),
    ('linkedin-strategy-for-global-opportunities','LinkedIn strategy for global opportunities','Profile optimization and outreach framework for cross border jobs.','# Profile\nOptimize headline about and featured section.\n\n# Outreach\nTen targeted messages per week.','LinkedIn strategy for global opportunities','Use LinkedIn effectively to access international jobs.'),
    ('how-to-prepare-for-online-interviews','How to prepare for online interviews','Checklist for technical setup communication and interview confidence.','# Setup\nSound camera internet backup.\n\n# Practice\nMock interviews with STAR examples.','How to prepare for online interviews','Practical online interview preparation checklist.'),
    ('how-to-build-project-portfolio-fast','How to build a project portfolio fast','A thirty day plan to create projects that prove employable skills.','# Plan\nShip two projects in thirty days.\n\n# Quality\nFocus on documentation and outcomes.','How to build project portfolio fast','Create a strong portfolio quickly for job applications.'),
    ('career-switch-to-data-in-6-months','Career switch to data in 6 months','Learning roadmap for transitioning into data roles from non tech backgrounds.','# Months 1 2\nSQL and analytics foundations.\n\n# Months 3 4\nDashboards and case studies.\n\n# Months 5 6\nPortfolio and applications.','Career switch to data in 6 months','Roadmap to move into data roles within six months.'),
    ('scholarships-for-international-students-guide','Scholarships for international students complete guide','How to find evaluate and apply to scholarship programs effectively.','# Search\nUse trusted scholarship databases.\n\n# Selection\nPrioritize fit and eligibility.\n\n# Application\nPrepare documents early.','Scholarships for international students guide','Complete scholarship application strategy for international students.'),
    ('networking-strategies-for-young-graduates','Networking strategies for young graduates','Build a professional network that opens hidden opportunities.','# Weekly routine\nReach out to five professionals.\n\n# Follow up\nShare progress updates and value.','Networking strategies for young graduates','Practical networking playbook for new graduates.'),
    ('job-search-system-that-gets-results','Job search system that gets results','Build a repeatable application process with measurable outcomes.','# Pipeline\nTrack applications by stage.\n\n# Improvement\nOptimize CV cover letter outreach based on metrics.','Job search system that gets results','A structured system to improve job search performance.')
) AS v(slug, title, summary, body_markdown, seo_title, seo_description)
ON v.slug = g.slug
ON CONFLICT (career_guide_id, language) DO UPDATE
SET title = EXCLUDED.title,
    summary = EXCLUDED.summary,
    body_markdown = EXCLUDED.body_markdown,
    seo_title = EXCLUDED.seo_title,
    seo_description = EXCLUDED.seo_description;

INSERT INTO career_guide_translations (career_guide_id, language, title, summary, body_markdown, seo_title, seo_description)
SELECT g.id, 'fr'::lang_code, v.title, v.summary, v.body_markdown, v.seo_title, v.seo_description
FROM career_guides g
JOIN (
  VALUES
    ('how-to-get-remote-job-without-experience','Trouver un job remote sans experience','Plan progressif pour obtenir un premier poste remote.', '# Etape 1\nChoisir un role clair.\n\n# Etape 2\nCreer deux projets portfolio.\n\n# Etape 3\nPostuler chaque semaine.', 'Trouver un job remote sans experience', 'Guide pratique pour debuter en remote.'),
    ('top-countries-for-tech-jobs-2026','Top pays pour les jobs tech 2026','Vue marche sur salaires visa et tendances.', '# Comparer les marches\nSalaire demande immigration.\n\n# Strategie\nCibler deux pays.', 'Top pays pour les jobs tech 2026', 'Ou candidater a international en tech.'),
    ('international-cv-format-guide','Guide format CV international','Structurer un CV pour recruteurs internationaux.', '# Essentiels\nTitre bullet impact resultats chiffres.\n\n# Localisation\nAdapter ton et mots cles.', 'Guide format CV international', 'Construire un CV ATS friendly.'),
    ('linkedin-strategy-for-global-opportunities','Strategie LinkedIn globale','Optimisation profil et outreach international.', '# Profil\nOptimiser headline about featured.\n\n# Outreach\nDix messages cibles par semaine.', 'Strategie LinkedIn globale', 'Utiliser LinkedIn pour opportunites internationales.'),
    ('how-to-prepare-for-online-interviews','Preparation entretiens en ligne','Checklist technique et communication.', '# Setup\nSon camera connexion backup.\n\n# Practice\nMock interviews STAR.', 'Preparation entretiens en ligne', 'Checklist pratique entretiens online.'),
    ('how-to-build-project-portfolio-fast','Construire un portfolio rapidement','Plan 30 jours pour projets preuves de competence.', '# Plan\nLivrer deux projets en trente jours.\n\n# Qualite\nDocumenter objectifs et resultats.', 'Construire un portfolio rapidement', 'Portfolio convaincant pour candidatures.'),
    ('career-switch-to-data-in-6-months','Reconversion data en 6 mois','Roadmap pour integrer des roles data.', '# Mois 1 2\nFondamentaux SQL analytics.\n\n# Mois 3 4\nDashboards cas.\n\n# Mois 5 6\nPortfolio candidatures.', 'Reconversion data en 6 mois', 'Plan concret transition data.'),
    ('scholarships-for-international-students-guide','Bourses internationales guide complet','Identifier et candidater efficacement aux bourses.', '# Recherche\nPlateformes fiables.\n\n# Selection\nEligibilite et adequation.\n\n# Dossier\nPreparer documents.', 'Bourses internationales guide complet', 'Strategie candidature bourses internationales.'),
    ('networking-strategies-for-young-graduates','Strategies networking jeunes diplomes','Construire un reseau professionnel utile.', '# Routine hebdo\nContacter cinq professionnels.\n\n# Suivi\nPartager progression.', 'Strategies networking jeunes diplomes', 'Plan pratique networking debut carriere.'),
    ('job-search-system-that-gets-results','Systeme recherche emploi efficace','Processus candidature mesurable et optimisable.', '# Pipeline\nSuivre candidatures par etape.\n\n# Optimisation\nAjuster CV lettre outreach.', 'Systeme recherche emploi efficace', 'Systeme structure pour ameliorer resultats.')
) AS v(slug, title, summary, body_markdown, seo_title, seo_description)
ON v.slug = g.slug
ON CONFLICT (career_guide_id, language) DO UPDATE
SET title = EXCLUDED.title,
    summary = EXCLUDED.summary,
    body_markdown = EXCLUDED.body_markdown,
    seo_title = EXCLUDED.seo_title,
    seo_description = EXCLUDED.seo_description;

INSERT INTO career_guide_translations (career_guide_id, language, title, summary, body_markdown, seo_title, seo_description)
SELECT g.id, 'ar'::lang_code, v.title, v.summary, v.body_markdown, v.seo_title, v.seo_description
FROM career_guides g
JOIN (
  VALUES
    ('how-to-get-remote-job-without-experience','كيف تحصل على عمل عن بعد بدون خبرة','خطة عملية للحصول على اول وظيفة عن بعد.', '# الخطوة 1\nاختر دورا واضحا.\n\n# الخطوة 2\nانجز مشروعين.\n\n# الخطوة 3\nترشح اسبوعيا.', 'كيف تحصل على عمل عن بعد بدون خبرة', 'دليل عملي للبدء في العمل عن بعد.'),
    ('top-countries-for-tech-jobs-2026','افضل الدول لوظائف التكنولوجيا 2026','نظرة على الرواتب ومسارات التاشيرة.', '# قارن الاسواق\nالراتب الطلب الهجرة.\n\n# خطة\nاستهدف دولتين.', 'افضل الدول لوظائف التكنولوجيا 2026', 'اين تترشح دوليا في مجال التقنية.'),
    ('international-cv-format-guide','دليل تنسيق السيرة الذاتية الدولية','كيفية اعداد سيرة مناسبة للمجندين الدوليين.', '# الاساسيات\nعنوان قوي ونتائج رقمية.\n\n# التكييف\nاضبط اللغة والكلمات المفتاحية.', 'دليل تنسيق السيرة الذاتية الدولية', 'سيرة متوافقة مع ATS للوظائف الدولية.'),
    ('linkedin-strategy-for-global-opportunities','استراتيجية LinkedIn للفرص الدولية','تحسين الحساب وخطة تواصل للوصول لفرص عالمية.', '# الحساب\nحسن العنوان والنبذة.\n\n# التواصل\nعشر رسائل مستهدفة اسبوعيا.', 'استراتيجية LinkedIn للفرص الدولية', 'استخدام LinkedIn للوصول لفرص دولية.'),
    ('how-to-prepare-for-online-interviews','التحضير للمقابلات عبر الانترنت','قائمة عملية للتجهيز التقني والتواصل بثقة.', '# التجهيز\nصوت كاميرا اتصال احتياطي.\n\n# التدريب\nمحاكاة مقابلات STAR.', 'التحضير للمقابلات عبر الانترنت', 'دليل عملي للنجاح في المقابلات عن بعد.'),
    ('how-to-build-project-portfolio-fast','بناء Portfolio بسرعة','خطة 30 يوما لانجاز مشاريع تثبت المهارات.', '# الخطة\nانجز مشروعين خلال 30 يوما.\n\n# الجودة\nوثق الاهداف والنتائج.', 'بناء Portfolio بسرعة', 'انشاء Portfolio قوي بسرعة.'),
    ('career-switch-to-data-in-6-months','الانتقال الى مجال البيانات في 6 اشهر','خارطة تعلم للانتقال الى وظائف البيانات.', '# الشهر 1 2\nاساسيات SQL والتحليل.\n\n# الشهر 3 4\nلوحات قيادة وحالات.\n\n# الشهر 5 6\nPortfolio وترشح.', 'الانتقال الى مجال البيانات في 6 اشهر', 'خطة واضحة للانتقال الى وظائف البيانات.'),
    ('scholarships-for-international-students-guide','منح الطلاب الدوليين دليل شامل','كيفية البحث عن المنح والتقديم بفعالية.', '# البحث\nاستعمل منصات موثوقة.\n\n# الانتقاء\nالتوافق والشروط.\n\n# الملف\nحضر الوثائق مبكرا.', 'منح الطلاب الدوليين دليل شامل', 'استراتيجية كاملة للتقديم على المنح الدولية.'),
    ('networking-strategies-for-young-graduates','استراتيجيات Networking للخريجين الجدد','بناء شبكة مهنية تفتح فرصا جديدة.', '# روتين اسبوعي\nتواصل مع خمسة مهنيين.\n\n# المتابعة\nشارك تقدمك وقيمتك.', 'استراتيجيات Networking للخريجين الجدد', 'خطة عملية لبناء شبكة مهنية.'),
    ('job-search-system-that-gets-results','نظام بحث عن عمل يعطي نتائج','بناء عملية ترشيح قابلة للقياس والتحسين.', '# Pipeline\nتتبع الطلبات حسب المراحل.\n\n# التحسين\nطور السيرة والرسائل باستمرار.', 'نظام بحث عن عمل يعطي نتائج', 'نظام عملي لرفع فعالية البحث عن وظيفة.')
) AS v(slug, title, summary, body_markdown, seo_title, seo_description)
ON v.slug = g.slug
ON CONFLICT (career_guide_id, language) DO UPDATE
SET title = EXCLUDED.title,
    summary = EXCLUDED.summary,
    body_markdown = EXCLUDED.body_markdown,
    seo_title = EXCLUDED.seo_title,
    seo_description = EXCLUDED.seo_description;

COMMIT;
