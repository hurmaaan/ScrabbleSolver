chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "extractData") {
        sendResponse({ data: extractData() });
    }
});

function extractData() {
    const tileData = [];
    const rackData = [];
    const size = 17;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let cellId = `grid_${i}_${j}`; // row_col 0 indexed
            let cell = document.getElementById(cellId);
            let bonus = cell.children[0]?.textContent || null;
            let tile = cell.children[1] || null;
            let letter = tile?.getElementsByClassName('tile_letter')[0]?.textContent || null;
            let points = tile?.getElementsByClassName('tile_value')[0]?.textContent || null;
            // console.log({ row: i, col: j, letter: letter, points: points, bonus: bonus });
            tileData.push({ row: i, col: j, letter: letter, points: points, bonus: bonus });
        }
    }

    //rack
    Array.from(document.getElementsByClassName('rack_wrapper')[0].children).forEach((curTile) => {
        let letter = curTile?.getElementsByClassName('tile_letter')[0]?.textContent || null;
        let points = curTile?.getElementsByClassName('tile_value')[0]?.textContent || null;
        rackData.push({ letter: letter, points: points });

    });
    // console.log("Rack Data:", rackData);
    return { tileData: tileData, rackData: rackData };
};