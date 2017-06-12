goog.provide('PSD.LayerAndMaskInformation');

goog.require('PSD.StreamReader');
goog.require('PSD.LayerInfo');
goog.require('PSD.GlobalLayerMaskInfo');

goog.scope(function() {

/**
 * @constructor
 */
PSD.LayerAndMaskInformation = function() {
  /** @type {number} */
  this.offset;
  /** @type {number} */
  this.length;
  /** @type {PSD.LayerInfo} */
  this.layerInfo;
  /** @type {PSD.GlobalLayerMaskInfo} */
  this.globalLayerMaskInfo;
  /** @type {PSD.AdditionalLayerInfo} */
  this.additionalLayerInfo;
};

/**
 * @param {PSD.StreamReader} stream
 * @param {PSD.Header} header
 */
PSD.LayerAndMaskInformation.prototype.parse = function(stream, header) {
  /** @type {number} */
  var length;

  this.offset = stream.tell();
  length = stream.readUint32();
  this.length = length + 4;

  if (length === 0) {
    console.log("skip: layer and mask information (empty body)");
  }

  var pos = stream.tell() + length;

  // initialize
  this.layerInfo = new PSD.LayerInfo();
  this.globalLayerMaskInfo = new PSD.GlobalLayerMaskInfo();
  this.additionalLayerInfo = new PSD.AdditionalLayerInfo();

  // parse
  this.layerInfo.parse(stream, header);
  this.globalLayerMaskInfo.parse(stream, header);
  this.additionalLayerInfo.parse(stream, header);

  // TODO: remove
  stream.seek(pos, 0);
};

  // end of scope
});
