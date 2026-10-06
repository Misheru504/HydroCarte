export function changeLanguage(map, lang)
{
  [
    'label_country_1',
    'label_country_2',
    'label_country_3',
    'label_city_capital',
    'label_city',
    'label_state',
    'label_town',
    'label_village',
    'label_other',
    'airport',
    'highway-name-major',
    'highway-name-minor',
    'highway-name-path',
    'water_name_line_label',
    'water_name_point_label',
    'waterway_line_label'
  ].forEach(layerId => {
    map.setLayoutProperty(layerId, 'text-field', [
      'coalesce',
      ['get', `name:${lang}`],
      ['get', 'name']
    ]);
  });
}