// OCR de una captura con Vision: imprime JSON [[x, y, w, h, "palabra"], ...] en píxeles de la imagen (origen arriba a la izquierda).
import Foundation
import Vision
import AppKit
let url = URL(fileURLWithPath: CommandLine.arguments[1])
guard let img = NSImage(contentsOf: url), let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else { exit(1) }
let W = Double(cg.width), H = Double(cg.height)
let req = VNRecognizeTextRequest()
req.recognitionLevel = .accurate
req.usesLanguageCorrection = false
req.recognitionLanguages = ["es-ES", "en-US"]
try VNImageRequestHandler(cgImage: cg, options: [:]).perform([req])
var out: [[Any]] = []
for obs in req.results ?? [] {
  guard let cand = obs.topCandidates(1).first else { continue }
  let s = cand.string
  s.enumerateSubstrings(in: s.startIndex..., options: .byWords) { _, r, _, _ in
    // las palabras incluyen signos pegados ($0.012, 0.6%/1…): se toma el trozo entre espacios
    _ = r
  }
  var i = s.startIndex
  while i < s.endIndex {
    while i < s.endIndex && s[i] == " " { i = s.index(after: i) }
    var j = i
    while j < s.endIndex && s[j] != " " { j = s.index(after: j) }
    if i < j, let b = try? cand.boundingBox(for: i..<j) {
      let bb = b.boundingBox
      out.append([Int(bb.minX * W), Int((1 - bb.maxY) * H), Int(bb.width * W), Int(bb.height * H), String(s[i..<j])])
    }
    i = j
  }
}
let data = try JSONSerialization.data(withJSONObject: out)
print(String(data: data, encoding: .utf8)!)
