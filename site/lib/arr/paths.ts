export const ARR_ROOT = "D:/Wabbajack/modlists/ARR";
export const DEFAULT_PROFILE = "ARSE";

export const arrPaths = {
  root: ARR_ROOT,
  modOrganizerIni: `${ARR_ROOT}/ModOrganizer.ini`,
  profileDir: (profile = DEFAULT_PROFILE) => `${ARR_ROOT}/profiles/${profile}`,
  profileModlist: (profile = DEFAULT_PROFILE) =>
    `${ARR_ROOT}/profiles/${profile}/modlist.txt`,
  profilePlugins: (profile = DEFAULT_PROFILE) =>
    `${ARR_ROOT}/profiles/${profile}/plugins.txt`,
  profileLoadOrder: (profile = DEFAULT_PROFILE) =>
    `${ARR_ROOT}/profiles/${profile}/loadorder.txt`,
  profileReport: (profile = DEFAULT_PROFILE) =>
    `${ARR_ROOT}/profiles/${profile}/modlist_report_gold.csv`,
  authoriaMcmIniSettings: `${ARR_ROOT}/mods/Authoria - MCM and INI Settings`,
  mcmSettingsDir: `${ARR_ROOT}/mods/Authoria - MCM and INI Settings/MCM/Settings`,
  mcmRecorderDir: `${ARR_ROOT}/mods/Authoria - MCM and INI Settings/McmRecorder`,
  sksePluginsDir: `${ARR_ROOT}/mods/Authoria - MCM and INI Settings/SKSE/Plugins`,
  sunhelmConfigDir: `${ARR_ROOT}/mods/Authoria - MCM and INI Settings/SunHelm/Config`,
  authoriaUiPositioning: `${ARR_ROOT}/mods/Authoria - UI Positioning`,
  authoriaControllerConfigs: `${ARR_ROOT}/mods/Authoria - Controller Configs`,
  authoriaMapMarkers: `${ARR_ROOT}/mods/Authoria - FMWF Map Marker Settings`,
  mapMarkersConfig: `${ARR_ROOT}/mods/Authoria - MCM and INI Settings/mapmarkers/Atlas Map Markers.json`,
  authoriaCustomMovesets: `${ARR_ROOT}/mods/Authoria - Custom Movesets`,
  authoriaXEditOutput: `${ARR_ROOT}/mods/Authoria - xEdit Output`,
  authoriaSynthesisOutput: `${ARR_ROOT}/mods/Authoria - Synthesis Output`,
  authoriaRftiOutput: `${ARR_ROOT}/mods/Authoria - RFTI Output`,
  authoriaNpcMerge: `${ARR_ROOT}/mods/Authoria - NPC Merge`,
  authoriaCkOutput: `${ARR_ROOT}/mods/Authoria - CK Output`,
  mcmSetting: (filename: string) =>
    `${ARR_ROOT}/mods/Authoria - MCM and INI Settings/MCM/Settings/${filename}`,
  sksePlugin: (filename: string) =>
    `${ARR_ROOT}/mods/Authoria - MCM and INI Settings/SKSE/Plugins/${filename}`,
  mcmRecorderProfile: (name: string) =>
    `${ARR_ROOT}/mods/Authoria - MCM and INI Settings/McmRecorder/${name}`,
} as const;
