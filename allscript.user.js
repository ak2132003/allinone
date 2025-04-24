// ==UserScript==
// @name         Dr Ahmed Khaled 👑 | سكربت موحد عصري
// @namespace    https://facebook.com/profile.php?id=100018163182596
// @version      2.0
// @description  واجهة متطورة لفتح الكروت، محطة التفكيك، فتح الروابط 💼 بتصميم ملكي وأنيميشن 👑
// @author       Dr Ahmed Khaled 👑
// @match        *.centurygames.com/*
// @grant        unsafeWindow
// @updateURL    
// @downloadURL  
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    const drName = 'Dr Ahmed Khaled 👑';

    // تحميل الخط
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // ستايل عام
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes fadeOut { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.9); } }

        .dr-panel {
            font-family: 'Cairo', sans-serif;
            position: fixed;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(253, 224, 71, 0.6));
            backdrop-filter: blur(12px);
            box-shadow: 0 8px 32px rgba(0,0,0,0.2);
            border-radius: 16px;
            padding: 25px;
            width: 320px;
            display: none;
            flex-direction: column;
            align-items: center;
            z-index: 99999;
        }
        .dr-panel h3 {
            margin-bottom: 15px;
            font-size: 22px;
            color: #fff;
            text-shadow: 0 0 3px #000;
        }
        .dr-panel input, .dr-panel select, .dr-panel textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: none;
            border-radius: 8px;
            font-size: 15px;
        }
        .dr-panel button {
            background: linear-gradient(135deg, #4CAF50, #388E3C);
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            transition: transform 0.2s ease;
        }
        .dr-panel button:hover { transform: scale(1.05); }

        .dr-main-btn {
            position: fixed; bottom: 25px; left: 25px;
            width: 100px; height: 100px;
            border-radius: 50%;
            background: linear-gradient(135deg, #43cea2, #185a9d);
            color: white;
            display: flex; align-items: center; justify-content: center;
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            font-family: 'Cairo', sans-serif;
            cursor: pointer;
            z-index: 9999;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            transition: transform 0.3s ease;
        }
        .dr-main-btn:hover {
            transform: scale(1.1);
        }

        .dr-menu {
            position: fixed;
            bottom: 140px; left: 25px;
            display: none;
            flex-direction: column;
            background-color: rgba(144, 238, 144, 0.6);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            overflow: hidden;
            z-index: 9999;
        }
        .dr-menu button {
            background: none;
            border: none;
            padding: 12px 18px;
            font-size: 16px;
            color: white;
            text-shadow: 0 0 2px #000;
            cursor: pointer;
            transition: background 0.2s ease;
        }
        .dr-menu button:hover {
            background: rgba(255,255,255,0.1);
        }

        .dr-submenu {
            display: none;
            flex-direction: column;
            background: rgba(255, 255, 255, 0.05);
            border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
        .dr-submenu button {
            padding-left: 30px;
        }

        .close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 24px;
            color: white;
            cursor: pointer;
            z-index: 100;
        }
    `;
    document.head.appendChild(style);

    const mainBtn = document.createElement('div');
    mainBtn.className = 'dr-main-btn';
    mainBtn.innerHTML = `<span>${drName}<br>💼</span>`;
    document.body.appendChild(mainBtn);

    const menu = document.createElement('div');
    menu.className = 'dr-menu';

    const albumBtn = document.createElement('button');
    albumBtn.textContent = '📂 أدوات الألبوم';
    const subMenu = document.createElement('div');
    subMenu.className = 'dr-submenu';
    ['cards', 'station', 'links'].forEach(id => {
        const btn = document.createElement('button');
        btn.textContent = {
            cards: '🎴 فتح الكروت',
            station: '🏗️ محطة التفكيك',
            links: '🔗 فتح الروابط'
        }[id];
        btn.onclick = () => showPanel(id);
        subMenu.appendChild(btn);
    });
    albumBtn.onclick = () => {
        subMenu.style.display = subMenu.style.display === 'flex' ? 'none' : 'flex';
    };
    menu.appendChild(albumBtn);
    menu.appendChild(subMenu);

    const tokenBtn = document.createElement('button');
    tokenBtn.textContent = '🎯 مشاركة الروابط (المهمات)';
    tokenBtn.onclick = () => showPanel('token');
    menu.appendChild(tokenBtn);

    document.body.appendChild(menu);

    mainBtn.onclick = () => {
        menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    };

    const panels = {
        cards: createCardPanel(),
        station: createStationPanel(),
        links: createLinkPanel(),
        token: createTokenPanel()
    };

    function showPanel(id) {
        Object.values(panels).forEach(p => p.style.display = 'none');
        panels[id].style.display = 'flex';
        menu.style.display = 'none';
    }

    function createCardPanel() {
        const types = { 'أخضر': 0x3ACFE, 'أصفر': 0x3ACFF, 'فاخر': 0x3AD00, 'حصري': 0x3AD01, 'مؤقت': 0x3AD02 };
        const div = document.createElement('div');
        div.className = 'dr-panel';
        div.innerHTML = `
            <h3>فتح الكروت</h3>
            <select id="cardType">${Object.entries(types).map(([k, v]) => `<option value="${v}">${k}</option>`)}</select>
            <input type="number" id="cardQty" placeholder="عدد الكروت">
            <button id="runCard">🚀 تنفيذ</button>
            <div id="cardMsg" style="color:white;margin-top:10px;"></div>
<div class="close-btn" onclick="this.parentElement.style.display='none'">✖️</div>
        `;
        div.querySelector('#runCard').onclick = async () => {
            const id = +div.querySelector('#cardType').value;
            const qty = +div.querySelector('#cardQty').value;
            if (!id || !qty) return alert("❌ تحقق من المدخلات");
            div.querySelector('#cardMsg').textContent = '⏳ جاري التنفيذ...';
            await unsafeWindow.NetUtils.request('Activity/AlbumEvent', {
                action: 'useItem', itemId: id, qty: qty.toString(), needResponse: 'Activity/AlbumEvent1'
            });
            div.querySelector('#cardMsg').textContent = '✅ تم التنفيذ!';
        };
        document.body.appendChild(div);
        return div;
    }

    function createStationPanel() {
        const div = document.createElement('div');
        div.className = 'dr-panel';
        div.innerHTML = `
            <h3>محطة التفكيك</h3>
            <div style="color:white;margin-bottom:10px;">📌 شروط التشغيل:</div>
            <ul style="color:white; font-size: 16px">
                <li>١. 🙌 لا تنسوا الدعاء لي بالتوفيق والسداد، وهذا أهم شرط لتشغيل السكربت 😄</li>
                <li>٢. 🧹 تفريغ ٤ تربة من المنطقة 0,0</li>
                <li>٣. 🏗️ لا يوجد لديك محطة تفكيك بالأساس</li>
                <li>٤. 🎁 توافر المواد (حبل التفكيك في الهدايا) – لكل محطة واحدة تحتاج إلى (٥) حبل تفكيك</li>
            </ul>
            <input type="number" id="coins" placeholder="💰 عدد العملات">
<span>أو</span>
            <input type="number" id="repeats" placeholder="🔁 التكرار">
            <button id="runStation">🚀 تنفيذ</button>
            <div id="stationMsg" style="color:white;margin-top:10px;"></div>
            <div class="close-btn" onclick="this.parentElement.style.display='none'">✖️</div>
<div style="text-align:center;color:white;font-size:14px;margin-top:10px;">By Ahmed Khaled 👑</div>
        `;
        div.querySelector('#runStation').onclick = async () => {
            const coins = +div.querySelector('#coins').value;
            const repeats = +div.querySelector('#repeats').value;
            const times = repeats || Math.ceil(coins / 8);
            if (!coins && !repeats) return alert("⚠️ يجب تحديد عدد العملات أو التكرار!");
            let unique_id = 1000;
            div.querySelector('#stationMsg').textContent = '⏳ جاري التنفيذ...';
            for (let i = 1; i <= times; i++) {
                await unsafeWindow.NetUtils.request('add_object.save_data', { unique_id, id: 0x33b50, x: 0, y: 0, flip: 0, is_storage: false, is_gift: false, is_circle: false, daily_limit: false });
                for (let j = 1; j <= 5; j++) {
                    await unsafeWindow.NetUtils.request('use_gift.save_data', { id: 0x33b51, target_id: 0x33b50, target_x: 0, target_y: 0 });
                }
                await unsafeWindow.NetUtils.request('remove_object.save_data', { id: 0x33b50, x: 0, y: 0, flip: 0 });
                unique_id++;
            }
            div.querySelector('#stationMsg').textContent = '✅ تم التنفيذ!';
        };
        document.body.appendChild(div);
        return div;
    }

    function createLinkPanel() {
        const div = document.createElement('div');
        div.className = 'dr-panel';
        div.innerHTML = `
            <h3>فتح الروابط</h3>
            <textarea id="linksArea" rows="5" placeholder="ألصق الروابط هنا..." style="resize: none;"></textarea>
            <button id="launchLinks">🚀 فتح</button>
            <<div class="close-btn" onclick="this.parentElement.style.display='none'">✖️</div>
<div style="text-align:center;color:white;font-size:14px;margin-top:10px;">By Ahmed Khaled 👑</div>
        `;
        div.querySelector('#launchLinks').onclick = () => {
            const text = div.querySelector('#linksArea').value;
            const links = [...text.matchAll(/https?:\/\/[^\s<>"]+/g)].map(m => m[0]);
            if (!links.length) return alert("⚠️ لا توجد روابط!");
            links.forEach((l, i) => setTimeout(() => window.open(l, "_blank"), i * 300));
        };
        document.body.appendChild(div);
        return div;
    }

    function createTokenPanel() {
    const div = document.createElement('div');
    div.className = 'dr-panel';
    div.innerHTML = `
        <h3>🎯 مشاركة الروابط (المهمات)</h3>
        <select id="missionSelect" style="margin-bottom:10px;">
            <option value="MagicAcademyOpenDay">يوم افتتاح أكادمية السحر</option>
            <option value="MysteryShopKeeper">مهمة التاجر</option>
        </select>
        <input id="ssidInput" placeholder="SSID مفصولة بفواصل" />
        <div style="display: flex; gap: 8px; margin-top: 10px;">
            <button id="sendBtn">📤 إرسال</button>
            <button id="receiveBtn">📥 استقبال</button>
            <button id="toggleListBtn">📋 قائمة</button>
        </div>
        <div id="loadingSpinner" style="display:none;margin-top:10px;color:white;">🔄 جاري المعالجة...</div>
        <div id="ssidList" style="margin-top: 10px; display: none; color: white; font-size: 13px;"></div>
        <div style="text-align:center;color:white;font-size:14px;margin-top:10px;">By Ahmed Khaled 👑</div>
        <div class="close-btn" onclick="this.parentElement.style.display='none'">✖️</div>
    `;
    document.body.appendChild(div);

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    function saveSSID(activity, ssid) {
        let stored = JSON.parse(localStorage.getItem('savedSSIDs') || '{}');
        stored[activity] = stored[activity] || [];
        ssid.split(',').map(s => s.trim()).forEach(s => {
            if (s && !stored[activity].includes(s)) stored[activity].push(s);
        });
        localStorage.setItem('savedSSIDs', JSON.stringify(stored));
    }

    function updateSSIDList() {
        const activity = div.querySelector('#missionSelect').value;
        const list = div.querySelector('#ssidList');
        const stored = JSON.parse(localStorage.getItem('savedSSIDs') || '{}');
        list.innerHTML = '';
        if (stored[activity]?.length) {
            const line = document.createElement('div');
            line.textContent = stored[activity].join(', ');
            line.style.cursor = 'pointer';
            line.onclick = () => {
                div.querySelector('#ssidInput').value = stored[activity].join(',');
            };
            list.appendChild(line);
        }
    }

    div.querySelector('#toggleListBtn').onclick = () => {
        const list = div.querySelector('#ssidList');
        if (list.style.display === 'none') {
            updateSSIDList();
            list.style.display = 'block';
        } else {
            list.style.display = 'none';
        }
    };

    async function handleAction(actionType) {
        const input = div.querySelector('#ssidInput').value.trim();
        const activity = div.querySelector('#missionSelect').value;
        const spinner = div.querySelector('#loadingSpinner');
        if (!input || !activity) return alert("من فضلك أدخل SSID واختر اسم المهمة");

        const ssids = input.split(',').map(id => id.trim()).filter(Boolean);
        saveSSID(activity, input);
        spinner.style.display = 'block';

        for (const ssid of ssids) {
            try {
                await unsafeWindow.NetUtils.request('Activity/SharingToken', {
                    action: actionType,
                    activity,
                    [`${actionType === 'send' ? 'to' : 'from'}Snsids`]: [ssid],
                    needResponse: actionType === 'send' ? 'Activity/SharingToken' : 'Activity/SharingToken3',
                    ...(actionType === 'accept' ? { opTime: 1011.327 } : { cur_sceneid: 2 })
                });
                await sleep(0);
            } catch (e) {
                console.error(`${actionType === 'send' ? 'فشل الإرسال' : 'فشل الاستقبال'} لـ ${ssid}:`, e);
            }
        }

        spinner.style.display = 'none';
        alert(`✅ تم ${actionType === 'send' ? 'إرسال' : 'استقبال'} التوكينات لمهمة (${activity}) بنجاح!\nمع تحياتي\nAhmed Khaled`);
    }

    div.querySelector('#sendBtn').onclick = () => handleAction('send');
    div.querySelector('#receiveBtn').onclick = () => handleAction('accept');

    return div;
}

})();
