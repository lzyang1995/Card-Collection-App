import axios from 'axios';

export function formatDate(date) {
    let result = "";
    result += [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("/");
    result += " ";

    let hour = ("0" + date.getHours()).slice(-2);
    let minute = ("0" + date.getMinutes()).slice(-2);
    let second = ("0" + date.getSeconds()).slice(-2);

    result += [hour, minute, second].join(":");

    return result;
}

export async function finishedCollecting(username, promotionTitle) {
    let cardsResult = await axios.get("/api/cards/search/findByPromotionTitle?promotionTitle=" + encodeURIComponent(promotionTitle));
    let cards = cardsResult.data._embedded.cards;

    let cardIds = cards.map(item => {
        let href = item._links.self.href;
        return +href.slice(href.lastIndexOf("/") + 1);
    });

    let cardDrawTimes = await Promise.all(cardIds.map(async item => {
        let itemDrawTime = await axios.get("/api/userCards/search/countByUsernameAndCardIdIsIn?username=" + encodeURIComponent(username) + "&cardIdList=" + item);
        return itemDrawTime.data;
    }));

    let count = 0;
    for (let drawTime of cardDrawTimes) {
        if (drawTime > 0) {
            count++;
        }
    }

    return count >= 5;
}

export function getVerificationImgCoord(inputClass) {
    let result = document.querySelector("." + inputClass).getBoundingClientRect();
    return ({
        left: result.right + window.pageXOffset + 40,
        top: result.top + window.pageYOffset
    });
}

export function formLayouts() {
    return {
        layout: {
            labelCol: {
                span: 10,
            },
            wrapperCol: {
                span: 6,
            },
        },
        verfificationLayout: {
            labelCol: {
                span: 10,
            },
            wrapperCol: {
                span: 2,
            },
        },
        tailLayout: {
            wrapperCol: {
                offset: 10,
                span: 12,
            },
        }
    };
}