document.addEventListener('DOMContentLoaded', function () {
    const extractButton = document.getElementById('extractData');

    extractButton.addEventListener('click', async function () {

        console.log("Extracting data...");
        try {
            const [tab] = await chrome.tabs.query({
                active: true,
                currentWindow: true
            });

            const response = await chrome.tabs.sendMessage(tab.id, {
                action: "extractData"
            });

            if (response && response.data) {

                console.log("DOM Data:", response.data);
            }
        } catch (error) {
            console.error("Error:", error);

        }
    });
});