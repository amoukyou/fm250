import type { Locale } from '../i18n/locales'

type EPItem = { label: Record<Locale, string>; value: Record<Locale, string> }
type EP = {
  id: string
  title: Record<Locale, string>
  items: EPItem[]
  note?: Record<Locale, string>
}

function L(tw: string, cn: string, en: string): Record<Locale, string> {
  return { 'zh-TW': tw, 'zh-CN': cn, en }
}

export const emergencyProcedures: EP[] = [
  {
    id: 'ep-1',
    title: L('4.2.1 起飛階段發動機故障', '4.2.1 起飞阶段发动机故障', '4.2.1 Engine Failure During Takeoff Roll'),
    items: [
      { label: L('油門', '油门', 'Throttle'), value: L('急速', '急速', 'Idle') },
      { label: L('點火開關', '点火开关', 'Ignition'), value: L('關閉', '关闭', 'OFF') },
      { label: L('方向', '方向', 'Direction'), value: L('保持（避免接觸障礙物）', '保持（避免接触障碍物）', 'Maintain (avoid obstacles)') },
      { label: L('制動', '制动', 'Brakes'), value: L('三輪全部著地後施加', '三轮全部着地后施加', 'Apply after all 3 wheels on ground') },
    ],
  },
  {
    id: 'ep-2',
    title: L('4.2.2 起飛後發動機故障', '4.2.2 起飞后发动机故障', '4.2.2 Engine Failure After Takeoff'),
    items: [
      { label: L('空速', '空速', 'Airspeed'), value: L('110-120 km/h', '110-120 km/h', '110-120 km/h') },
      { label: L('著陸地點', '着陆地点', 'Landing'), value: L('直線著陸（<100m禁止轉彎）', '直线着陆（<100m禁止转弯）', 'Straight ahead (<100m no turns)') },
      { label: L('點火開關', '点火开关', 'Ignition'), value: L('關閉', '关闭', 'OFF') },
      { label: L('燃油閥', '燃油阀', 'Fuel valve'), value: L('關閉', '关闭', 'OFF') },
    ],
    note: L('地面低於100米高度時，執行直線緊急迫降。低速低空轉彎可能存在危險。', '地面低于100米高度时，执行直线紧急迫降。低速低空转弯可能存在危险。', 'Below 100m AGL, land straight ahead. Low-speed low-altitude turns are dangerous.'),
  },
  {
    id: 'ep-3',
    title: L('4.2.3 飛行中發動機故障', '4.2.3 飞行中发动机故障', '4.2.3 Engine Failure In Flight'),
    items: [
      { label: L('空速', '空速', 'Airspeed'), value: L('120-130 km/h', '120-130 km/h', '120-130 km/h') },
      { label: L('著陸地點', '着陆地点', 'Landing site'), value: L('選擇', '选择', 'Select') },
      { label: L('點火開關', '点火开关', 'Ignition'), value: L('關閉', '关闭', 'OFF') },
      { label: L('主電源', '主电源', 'Master'), value: L('關閉', '关闭', 'OFF') },
      { label: L('燃油閥', '燃油阀', 'Fuel valve'), value: L('關閉', '关闭', 'OFF') },
      { label: L('襟翼', '襟翼', 'Flaps'), value: L('根據需要', '根据需要', 'As needed') },
      { label: L('安全帶', '安全带', 'Seatbelt'), value: L('繫緊', '系紧', 'Tighten') },
    ],
    note: L('如時間允許，檢查故障原因，嘗試重啟並發緊急無線電呼叫。如可能迎風著陸。', '如时间允许，检查故障原因，尝试重启并发紧急无线电呼叫。如可能迎风着陆。', 'If time permits, check failure cause, attempt restart, make emergency radio call. Land into wind if possible.'),
  },
  {
    id: 'ep-4',
    title: L('4.2.4 空中重啟發動機', '4.2.4 空中重启发动机', '4.2.4 In-Flight Engine Restart'),
    items: [
      { label: L('速度', '速度', 'Speed'), value: L('140-160 km/h', '140-160 km/h', '140-160 km/h') },
      { label: L('著陸地點', '着陆地点', 'Landing site'), value: L('選擇', '选择', 'Select') },
      { label: L('燃油閥', '燃油阀', 'Fuel valve'), value: L('打開', '打开', 'ON') },
      { label: L('油門', '油门', 'Throttle'), value: L('開啟1/3', '开启1/3', '1/3 open') },
      { label: L('主電源', '主电源', 'Master'), value: L('開啟', '开启', 'ON') },
      { label: L('航電', '航电', 'Avionics'), value: L('開啟', '开启', 'ON') },
      { label: L('點火', '点火', 'Ignition'), value: L('開啟', '开启', 'ON') },
    ],
    note: L('僅當高度>300米AGL時方可嘗試。低於此高度按4.2.3節執行緊急著陸。', '仅当高度>300米AGL时方可尝试。低于此高度按4.2.3节执行紧急着陆。', 'Only attempt above 300m AGL. Below that, follow 4.2.3 emergency landing.'),
  },
  {
    id: 'ep-5',
    title: L('4.3.1 地面發動機火災', '4.3.1 地面发动机火灾', '4.3.1 Ground Engine Fire'),
    items: [
      { label: L('燃油閥', '燃油阀', 'Fuel valve'), value: L('關閉', '关闭', 'OFF') },
      { label: L('制動', '制动', 'Brakes'), value: L('全部', '全部', 'Full') },
      { label: L('電源', '电源', 'Power'), value: L('關閉', '关闭', 'OFF') },
      { label: L('點火', '点火', 'Ignition'), value: L('待燃油耗盡後關閉', '待燃油耗尽后关闭', 'OFF after fuel exhausted') },
      { label: L('撤離飛機', '撤离飞机', 'Evacuate'), value: L('', '', '') },
    ],
  },
  {
    id: 'ep-6',
    title: L('4.3.2 起飛時發動機火災', '4.3.2 起飞时发动机火灾', '4.3.2 Engine Fire During Takeoff'),
    items: [
      { label: L('油門', '油门', 'Throttle'), value: L('急速', '急速', 'Idle') },
      { label: L('燃油閥', '燃油阀', 'Fuel valve'), value: L('關閉', '关闭', 'OFF') },
      { label: L('著陸', '着陆', 'Land'), value: L('', '', '') },
      { label: L('制動', '制动', 'Brakes'), value: L('施力', '施力', 'Apply') },
      { label: L('點火', '点火', 'Ignition'), value: L('待燃油耗盡後關閉', '待燃油耗尽后关闭', 'OFF after fuel exhausted') },
      { label: L('撤離飛機', '撤离飞机', 'Evacuate'), value: L('', '', '') },
    ],
  },
  {
    id: 'ep-7',
    title: L('4.3.3 飛行中發動機火災', '4.3.3 飞行中发动机火灾', '4.3.3 In-Flight Engine Fire'),
    items: [
      { label: L('燃油閥', '燃油阀', 'Fuel valve'), value: L('關閉', '关闭', 'OFF') },
      { label: L('油門', '油门', 'Throttle'), value: L('全功率', '全功率', 'Full power') },
      { label: L('著陸地點', '着陆地点', 'Landing site'), value: L('選擇', '选择', 'Select') },
      { label: L('點火', '点火', 'Ignition'), value: L('待燃油耗盡後關閉', '待燃油耗尽后关闭', 'OFF after fuel exhausted') },
      { label: L('主電源', '主电源', 'Master'), value: L('關閉', '关闭', 'OFF') },
      { label: L('緊急著陸', '紧急着陆', 'Emergency landing'), value: L('', '', '') },
      { label: L('撤離', '撤离', 'Evacuate'), value: L('', '', '') },
    ],
  },
  {
    id: 'ep-8',
    title: L('4.3.4 駕艙火災', '4.3.4 驾舱火灾', '4.3.4 Cockpit Fire'),
    items: [
      { label: L('火災', '火灾', 'Fire'), value: L('控制火勢', '控制火势', 'Control fire') },
      { label: L('主電源', '主电源', 'Master'), value: L('關閉（電氣火災）', '关闭（电气火灾）', 'OFF (electrical fire)') },
      { label: L('通風', '通风', 'Ventilation'), value: L('關閉', '关闭', 'OFF') },
      { label: L('撲滅', '扑灭', 'Extinguish'), value: L('', '', '') },
      { label: L('著陸', '着陆', 'Land'), value: L('盡快', '尽快', 'ASAP') },
    ],
  },
  {
    id: 'ep-9',
    title: L('4.4 震動', '4.4 震动', '4.4 Vibration'),
    items: [],
    note: L(
      '震動可能由惡劣天氣、飛行狀態不當或技術故障引起。確認速度未接近失速速度。\n\n• 調整轉速至最低震動\n• 在最近機場著陸\n• 若震動加劇，立即緊急著陸',
      '震动可能由恶劣天气、飞行状态不当或技术故障引起。确认速度未接近失速速度。\n\n• 调整转速至最低震动\n• 在最近机场着陆\n• 若震动加剧，立即紧急着陆',
      'Vibration may be caused by bad weather, improper flight attitude, or technical failure. Confirm speed is not near stall.\n\n• Reduce RPM to minimize vibration\n• Land at nearest airport\n• If vibration worsens, emergency land immediately'
    ),
  },
  {
    id: 'ep-10',
    title: L('4.5 預防性著陸', '4.5 预防性着陆', '4.5 Precautionary Landing'),
    items: [
      { label: L('選擇場地', '选择场地', 'Select site'), value: L('足夠長且合適', '足够长且合适', 'Long enough & suitable') },
      { label: L('低空偵察', '低空侦察', 'Low pass'), value: L('120km/h, 50m高度飛過', '120km/h, 50m高度飞过', '120km/h at 50m, check obstacles') },
      { label: L('繞場', '绕场', 'Circuit'), value: L('飛行', '飞行', 'Fly pattern') },
      { label: L('著陸', '着陆', 'Land'), value: L('著陸區1/3處', '着陆区1/3处', 'At 1/3 of landing zone') },
      { label: L('著陸前', '着陆前', 'Before'), value: L('關閉點火和主電源', '关闭点火和主电源', 'Ignition & master OFF') },
    ],
  },
  {
    id: 'ep-11',
    title: L('4.6 起落架及輪胎故障', '4.6 起落架及轮胎故障', '4.6 Landing Gear & Tire Failure'),
    items: [],
    note: L(
      '主起落架故障：操縱副翼單輪著陸，盡量用完好的腿觸地。\n\n前起落架故障：保持機頭抬起，避免使用剎車，迎風著陸。\n\n輪胎故障：程序同起落架故障。',
      '主起落架故障：操纵副翼单轮着陆，尽量用完好的腿触地。\n\n前起落架故障：保持机头抬起，避免使用刹车，迎风着陆。\n\n轮胎故障：程序同起落架故障。',
      'Main gear failure: Use ailerons for single-wheel landing on good leg.\n\nNose gear failure: Keep nose up as long as possible, avoid brakes, land into wind.\n\nTire failure: Same as gear failure procedure.'
    ),
  },
  {
    id: 'ep-12',
    title: L('4.7 飛機回收系統（降落傘）', '4.7 飞机回收系统（降落伞）', '4.7 Aircraft Recovery System (Parachute)'),
    items: [
      { label: L('點火開關', '点火开关', 'Ignition'), value: L('關閉', '关闭', 'OFF') },
      { label: L('安全帶', '安全带', 'Seatbelt'), value: L('繫好', '系好', 'Secure') },
      { label: L('救援系統', '救援系统', 'RS'), value: L('激活', '激活', 'Activate') },
      { label: L('求救信號', '求救信号', 'Distress'), value: L('發出', '发出', 'Transmit') },
    ],
    note: L(
      '建議在飛機明確失控時使用（如結構損毀）。RS最大速度300 km/h，務必迅速行動。',
      '建议在飞机明确失控时使用（如结构损毁）。RS最大速度300 km/h，务必迅速行动。',
      'Use when aircraft is clearly uncontrollable (e.g. structural damage). RS max speed 300 km/h, act quickly.'
    ),
  },
]
