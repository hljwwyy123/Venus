enum GeometryType {
  Point = "Point",
  LineString = "LineString",
  Polygon = "Polygon",
  MultiPoint = "MultiPoint",
  MultiLineString = "MultiLineString",
  MultiPolygon = "MultiPolygon",
  GeometryCollection = "GeometryCollection"
}

enum PaintProperty {
  LineColor = "line-color",
  LineWidth = "line-width",
  LineOpacity = "line-opacity",
  LineDashArray = 'line-dasharray',
  FillColor = "fill-color",
  FillOpacity = "fill-opacity",
  CircleColor = "circle-color",
  CircleRadius = "circle-radius",
  CircleOpacity = "circle-opacity"
}

export const dataMap = {
  "1": "ropeWay",
  "2": "trail",
  "3": "station"
}

export const StyleMap = {
  ropeWay: {  // 索道
    geometry: GeometryType.LineString,
    paint: {
      [PaintProperty.LineColor]: "red",
      [PaintProperty.LineWidth]: 2,
      [PaintProperty.LineOpacity]: 0.8,
      // [PaintProperty.LineDashArray]: [0, 4, 3]
    }
  },
  trail: {
    geometry: GeometryType.LineString,
    paint: {
      [PaintProperty.LineColor]: "blue",
      [PaintProperty.LineWidth]: 4,
      [PaintProperty.LineOpacity]: 0.25
    }
  },
  station: {
    geometry: GeometryType.Point,
    paint: {
      // [PaintProperty.CircleColor]: "#333",
    }
  }
}

enum DataSetStyle {
  STREETS = 'mapbox://styles/mapbox/streets-v12',
  OUTDOORS = 'mapbox://styles/mapbox/outdoors-v12',
  LIGHT = 'mapbox://styles/mapbox/light-v11',
  DARK = 'mapbox://styles/mapbox/dark-v11',
  SATELITE = 'mapbox://styles/mapbox/satellite-v9',
  SATELITE_STREET = 'mapbox://styles/mapbox/satellite-streets-v12',
  NAVIGATION_DAY = 'mapbox://styles/mapbox/navigation-day-v1',
  NAVIGATION_NIGHT = 'mapbox://styles/mapbox/navigation-night-v1',
  V3 = 'mapbox://styles/mapbox/standard-beta',
  TERRAIN ='mapbox://styles/mapbox/mapbox-terrain-v2'
}

export {
  GeometryType,
  PaintProperty,
  DataSetStyle
}
