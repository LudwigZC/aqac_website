"""
paths.py — External resource path map for the AQAC website.

Every key is a logical resource name; every value is the local path
(relative to the project root) where that asset or content file must
be placed before the site references it correctly.

Convention
----------
- Public static assets live under  public/
  Next.js serves public/ at the root URL, so
  public/images/hero/background.jpg  →  URL /images/hero/background.jpg
- Editable content lives under  content/
- Python scripts / tooling can import this module to resolve paths
  without hard-coding strings in multiple places.
"""

from pathlib import Path

# ---------------------------------------------------------------------------
# Project root (one level up from this file)
# ---------------------------------------------------------------------------
ROOT = Path(__file__).parent

# ===========================================================================
# 1. LOCALE / TRANSLATION FILES
#    Consumed by  lib/i18n.ts  at build time.
#    Add or update text, event copy, and news copy here first.
# ===========================================================================

LOCALES_DIR = ROOT / "content" / "locales"

LOCALE_FILES = {
    "en":    LOCALES_DIR / "en.json",
    "zh_CN": LOCALES_DIR / "zh-CN.json",
    "zh_TW": LOCALES_DIR / "zh-TW.json",
}

# ---------------------------------------------------------------------------
# 1a. News items  (currently embedded inside each locale JSON under news.items)
#     Each entry maps the article slug to the locale file that carries its copy.
# ---------------------------------------------------------------------------
NEWS_CONTENT = {
    # slug                                       → locale file (all three locales must match)
    "quieter-caring-model-for-community-support": LOCALE_FILES,   # tag: Programs
    "listening-sessions-bilingual-student-leaders": LOCALE_FILES, # tag: Youth
    "new-collaborations-education-wellbeing": LOCALE_FILES,       # tag: Partnerships
    "refining-community-access-bilingual-design": LOCALE_FILES,   # tag: Programs
    "mentorship-pilots-semester-planning": LOCALE_FILES,          # tag: Youth
    "shared-initiatives-cultural-institutions": LOCALE_FILES,     # tag: Partnerships
}

# ---------------------------------------------------------------------------
# 1b. Event items  (currently embedded inside each locale JSON under events.items)
# ---------------------------------------------------------------------------
EVENT_CONTENT = {
    # slug                               → locale file
    "mid-autumn-community-evening":  LOCALE_FILES,   # APR 12
    "youth-mentorship-circle":        LOCALE_FILES,  # MAY 03
    "volunteer-welcome-atelier":      LOCALE_FILES,  # JUN 18
}

# ===========================================================================
# 2. HERO SECTION
#    HeroSection.tsx  uses  public/pattern.svg  as a repeating texture over
#    a CSS gradient.  Replace or supplement with a full-bleed photo if needed.
# ===========================================================================

HERO_DIR = ROOT / "public" / "images" / "hero"

HERO_ASSETS = {
    "pattern_svg":        ROOT / "public" / "pattern.svg",          # ✓ already exists
    "background_photo":   HERO_DIR / "background.jpg",              # optional full-bleed photo
}

# ===========================================================================
# 3. ABOUT PAGE — FEATURE IMAGE
#    The split-layout block (about/page.tsx, line 38) currently shows a CSS
#    gradient placeholder.  Drop a real photograph here and add an <Image>
#    tag to replace the gradient div.
# ===========================================================================

ABOUT_DIR = ROOT / "public" / "images" / "about"

ABOUT_ASSETS = {
    "feature_photo": ABOUT_DIR / "feature.jpg",
}

# ===========================================================================
# 4. GALLERY PHOTOS  (About page → MasonryGrid)
#    MasonryGrid currently renders CSS gradients.  When real photos are
#    supplied, add a  "src"  field to each gallery item in the locale JSONs
#    and update the MasonryGrid component to accept and render it.
#
#    Filenames must match the slugified gallery item titles.
# ===========================================================================

GALLERY_DIR = ROOT / "public" / "images" / "gallery"

GALLERY_PHOTOS = {
    "community_gathering": GALLERY_DIR / "community-gathering.jpg",
    "volunteer_care":      GALLERY_DIR / "volunteer-care.jpg",
    "youth_mentorship":    GALLERY_DIR / "youth-mentorship.jpg",
    "art_and_heritage":    GALLERY_DIR / "art-and-heritage.jpg",
    "wellbeing_outreach":  GALLERY_DIR / "wellbeing-outreach.jpg",
}

# ===========================================================================
# 5. TEAM HEADSHOTS  (About page → team section)
#    Currently rendered as initials inside a gradient circle (lib/data.ts).
#    Add an  "avatar"  field to each teamMembers entry and update the card
#    to render a next/image when the file is present.
#
#    Filename convention:  <first>-<last>.jpg  (lowercase, hyphenated)
# ===========================================================================

TEAM_DIR = ROOT / "public" / "images" / "team"

TEAM_HEADSHOTS = {
    "lian_chen":  TEAM_DIR / "lian-chen.jpg",
    "ava_lin":    TEAM_DIR / "ava-lin.jpg",
    "ming_zhao":  TEAM_DIR / "ming-zhao.jpg",
    "noah_wu":    TEAM_DIR / "noah-wu.jpg",
}

# ===========================================================================
# 6. EVENT BANNERS / THUMBNAILS  (Events page → EventCard)
#    EventCard currently shows no image.  Add a banner image per event and
#    update EventCard to render it.
# ===========================================================================

EVENTS_DIR = ROOT / "public" / "images" / "events"

EVENT_BANNERS = {
    "mid_autumn_community_evening": EVENTS_DIR / "mid-autumn-community-evening.jpg",
    "youth_mentorship_circle":      EVENTS_DIR / "youth-mentorship-circle.jpg",
    "volunteer_welcome_atelier":    EVENTS_DIR / "volunteer-welcome-atelier.jpg",
}

# ===========================================================================
# 7. NEWS COVER IMAGES  (News page → NewsCard)
#    NewsCard currently shows no image.  Add a cover image per article and
#    update NewsCard to render it.
# ===========================================================================

NEWS_DIR = ROOT / "public" / "images" / "news"

NEWS_COVERS = {
    "quieter_caring_model":          NEWS_DIR / "quieter-caring-model.jpg",
    "listening_sessions":            NEWS_DIR / "listening-sessions.jpg",
    "new_collaborations":            NEWS_DIR / "new-collaborations.jpg",
    "refining_community_access":     NEWS_DIR / "refining-community-access.jpg",
    "mentorship_pilots":             NEWS_DIR / "mentorship-pilots.jpg",
    "shared_initiatives":            NEWS_DIR / "shared-initiatives.jpg",
}

# ===========================================================================
# 8. PARTNER / APPRECIATION-WALL LOGOS  (Membership page → appreciation wall)
#    Currently rendered as a "✦" icon.  Add SVG or PNG logos and update
#    the membership page to render them via next/image.
# ===========================================================================

PARTNERS_DIR = ROOT / "public" / "images" / "partners"

PARTNER_LOGOS = {
    # 1
    "apa":                        PARTNERS_DIR / "apa.svg",
    # 2
    "renew_life_fellowship":      PARTNERS_DIR / "renew-life-fellowship.svg",
    # 3
    "qld_writers":                PARTNERS_DIR / "qld-writers.svg",
    # 4
    "global_education":           PARTNERS_DIR / "global-education.svg",
    # 5
    "qld_chinese_cultural":       PARTNERS_DIR / "qld-chinese-cultural.svg",
    # 6
    "mystep":                     PARTNERS_DIR / "mystep.svg",
    # 7
    "yayun_fanghua_drama":        PARTNERS_DIR / "yayun-fanghua-drama.svg",
    # 8
    "sunshine_coast_chinese":     PARTNERS_DIR / "sunshine-coast-chinese.svg",
    # 9
    "qld_jiangsu":                PARTNERS_DIR / "qld-jiangsu.svg",
    # 10
    "qld_guangxi":                PARTNERS_DIR / "qld-guangxi.svg",
    # 11
    "kunlun_art_troupe":          PARTNERS_DIR / "kunlun-art-troupe.svg",
    # 12
    "qld_shandong":               PARTNERS_DIR / "qld-shandong.svg",
    # 13
    "qld_henan":                  PARTNERS_DIR / "qld-henan.svg",
    # 14
    "brisbane_north":             PARTNERS_DIR / "brisbane-north.svg",
    # 15
    "qld_catering":               PARTNERS_DIR / "qld-catering.svg",
    # 16
    "sunnybank_chamber":          PARTNERS_DIR / "sunnybank-chamber.svg",
    # 17
    "multicultural_english":      PARTNERS_DIR / "multicultural-english.svg",
    # 18
    "hkaba_qld":                  PARTNERS_DIR / "hkaba-qld.svg",
    # 19
    "beijing_club":               PARTNERS_DIR / "beijing-club.svg",
    # 20
    "chinese_business_united":    PARTNERS_DIR / "chinese-business-united.svg",
    # 21
    "1st_care_community":         PARTNERS_DIR / "1st-care-community.svg",
    # 22
    "diversity_connections":      PARTNERS_DIR / "diversity-connections.svg",
    # 23
    "qld_sports":                 PARTNERS_DIR / "qld-sports.svg",
    # 24
    "qld_chaoshan":               PARTNERS_DIR / "qld-chaoshan.svg",
    # 25
    "mainland_chinese_society":   PARTNERS_DIR / "mainland-chinese-society.svg",
    # 26
    "northwestern_chinese":       PARTNERS_DIR / "northwestern-chinese.svg",
    # 27
    "qld_building_construction":  PARTNERS_DIR / "qld-building-construction.svg",
    # 28
    "bee_media":                  PARTNERS_DIR / "bee-media.svg",
    # 29
    "chinese_fraternity":         PARTNERS_DIR / "chinese-fraternity.svg",
    # 30
    "miaomiao_school":            PARTNERS_DIR / "miaomiao-school.svg",
    # 31
    "australian_asian_women":     PARTNERS_DIR / "australian-asian-women.svg",
    # 32
    "qld_chinese_photographic":   PARTNERS_DIR / "qld-chinese-photographic.svg",
    # 33
    "qld_fujian":                 PARTNERS_DIR / "qld-fujian.svg",
    # 34
    "qld_chinese_united":         PARTNERS_DIR / "qld-chinese-united.svg",
    # 35
    "aus_china_sustainability":   PARTNERS_DIR / "aus-china-sustainability.svg",
    # 36
    "tianjin_friendship":         PARTNERS_DIR / "tianjin-friendship.svg",
    # 37
    "brisbaner_of_commerce":      PARTNERS_DIR / "brisbaner-of-commerce.svg",
}

# ===========================================================================
# 9. CONVENIENCE: flat list of all directories that must exist
#    Run  `python paths.py`  to create them all at once.
# ===========================================================================

ALL_DIRS = [
    LOCALES_DIR,
    HERO_DIR,
    ABOUT_DIR,
    GALLERY_DIR,
    TEAM_DIR,
    EVENTS_DIR,
    NEWS_DIR,
    PARTNERS_DIR,
]

if __name__ == "__main__":
    for d in ALL_DIRS:
        d.mkdir(parents=True, exist_ok=True)
        print(f"  ✓  {d.relative_to(ROOT)}")
    print("\nAll resource directories are ready.")
