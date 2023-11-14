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
      [PaintProperty.LineOpacity]: 0.8
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
      [PaintProperty.CircleColor]: "#333",
    }
  }
}


export {
  GeometryType,
  PaintProperty
}
