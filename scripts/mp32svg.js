const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const { AudioContext } = require('web-audio-api');

const SOUND_PATH = path.resolve(__dirname, '../public/sounds');
const SVG_PATH = path.resolve(__dirname, '../public/svgs/sounds');

/**
 * @param {ArrayBuffer} data
 * @returns {Promise<{ max: number, peaks: number[] }}
 */
async function calculate(data) {
  const audioCtx = new AudioContext();

  // 音声をデコードする
  /** @type {AudioBuffer} */
  const buffer = await new Promise((resolve, reject) => {
    audioCtx.decodeAudioData(data.slice(0), resolve, reject);
  });
  // 左の音声データの絶対値を取る
  const leftData = buffer.getChannelData(0).map(Math.abs);
  // 右の音声データの絶対値を取る
  const rightData = buffer.getChannelData(1).map(Math.abs);

  // 左右の音声データの平均を取る
  const normalized = _.zip(leftData, rightData).map(_.mean);
  // 100 個の chunk に分ける
  const chunks = _.chunk(normalized, Math.ceil(normalized.length / 100));
  // chunk ごとに平均を取る
  const peaks = chunks.map(_.mean);
  // chunk の平均の中から最大値を取る
  const max = _.max(peaks);

  return { max, peaks };
}

async function createSVG(file) {
  const buffer = fs.readFileSync(file);
  const { max, peaks } = await calculate(buffer);

  let result = peaks.reduce(function (acc, peak, index) {
    const ratio = peak / max;
    return acc + `<rect fill="#2563EB" height="${ratio}" width="1" x="${index}" y="${1 - ratio}" />`;
  }, '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 100 1">');
  result += '</svg>';
  return result;
}

async function main() {
  const sounds = fs.readdirSync(SOUND_PATH).filter((name) => name.indexOf('.mp3') > -1);

  for (const sound of sounds) {
    const input = path.resolve(SOUND_PATH, sound);
    const output = path.resolve(SVG_PATH, sound).replace('mp3', 'svg');
    const svg = await createSVG(input);
    fs.writeFileSync(output, svg);
    console.log(`converted: ${output}`);
  }
}

main();
