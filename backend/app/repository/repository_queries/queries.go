package repository_queries

import (
	"bytes"
	"github.com/andifg/artemis_backend/app/domain/dto"
	"text/template"
)

func ExecuteTemplate(tmpl *template.Template, data any) (string, error) {

	var tpl bytes.Buffer
	err := tmpl.Execute(&tpl, data)
	if err != nil {
		return "", err
	}

	return tpl.String(), nil

}

func GenerateAggregatedServingsQuery(timeframe dto.Timeframe, userId string) (string, error) {

	var intervalStep string = "1"
	var intervalEntity string

	switch timeframe {
	case dto.Week:
		intervalEntity = "week"
	case dto.Month:
		intervalEntity = "month"
	case dto.Quarter:
		intervalEntity = "month"
		intervalStep = "3"
	}

	const queryTemplate = `
WITH time_series AS (
  SELECT
    gs AS timeframe_start,
    gs + INTERVAL '{{.intervalStep}} {{.intervalEntity}}' AS timeframe_end,
    EXTRACT(DAY FROM ((gs + INTERVAL '{{.intervalStep}} {{.intervalEntity}}') - gs)) / 7.0 AS weeks,
    '{{.UserID}}'::uuid AS user_id
  FROM generate_series(
    date_trunc('{{.intervalEntity}}', NOW()) - INTERVAL '{{.intervalStep}} {{.intervalEntity}}',
    date_trunc('{{.intervalEntity}}', NOW()),
    INTERVAL '1 {{.intervalEntity}}'
  ) AS gs
),
aggregated AS (
  SELECT
    ts.timeframe_start,
    '{{.Timeframe}}' AS timeframe,
    COUNT(CASE WHEN s.category = 'meat' THEN 1 END) / ts.weeks AS meat_portions,
    COUNT(CASE WHEN s.category = 'vegetarian' THEN 1 END) / ts.weeks AS vegetarian_portions,
    COUNT(CASE WHEN s.category = 'alcohol' THEN 1 END) / ts.weeks AS alcohol_portions,
    COUNT(CASE WHEN s.category = 'candy' THEN 1 END) / ts.weeks AS candy_portions
  FROM time_series ts
  LEFT JOIN servings s ON ts.timeframe_start = DATE_TRUNC('{{.intervalEntity}}', s.date)
  GROUP BY ts.timeframe_start, ts.timeframe_end, ts.weeks
)
SELECT *,
  LAG(meat_portions) OVER (ORDER BY timeframe_start) AS prev_meat_portions,
  LAG(vegetarian_portions) OVER (ORDER BY timeframe_start) AS prev_vegetarian_portions,
  LAG(alcohol_portions) OVER (ORDER BY timeframe_start) AS prev_alcohol_portions,
  LAG(candy_portions) OVER (ORDER BY timeframe_start) AS prev_candy_portions
FROM aggregated
ORDER BY timeframe_start DESC
LIMIT 1;
`

	tmpl, err := template.New("query").Parse(queryTemplate)
	if err != nil {
		return "", err
	}

	data := map[string]string{
		"Timeframe":      timeframe,
		"UserID":         userId,
		"intervalStep":   intervalStep,
		"intervalEntity": intervalEntity,
	}

	return ExecuteTemplate(tmpl, data)

}
