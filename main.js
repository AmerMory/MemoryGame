let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-container");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];
let controlButtons = document.querySelector('.control-buttons')

// Select The Start Game Button
document.querySelector(".control-buttons span").onclick = () => {

    // Prompt Window To Ask For Name
    let yourName = prompt("What's Your Name?");

    // If Name Is Empty
    if (yourName == null || yourName == "") {
        // ask for name again
        prompt("Please Enter Your Name");

        // Name Is Not Empty
    } else {

        // Set Name To Your Name
        document.querySelector(".info-container .name span").innerHTML = yourName;

        // Remove Splash Screen
        controlButtons.classList.add('hide');

        // show card for 1 sec
        controlButtons.addEventListener('click', () => {

            blocks.forEach(block => {
                block.classList.add('is-flipped')

                setTimeout(() => {

                    block.classList.remove('is-flipped')

                }, 2000);
            });


        })

    }

};

shuffle(orderRange);

blocks.forEach((block, index) => {

    block.style.order = orderRange[index];

    block.addEventListener('click', () => {
        flipBlock(block);
    })

});


function flipBlock(selectedblock) {

    selectedblock.classList.add('is-flipped');

    let allFlippedBlocks = blocks.filter(flipBlock => flipBlock.classList.contains('is-flipped'));

    if (allFlippedBlocks.length === 2) {

        stopClicking();

        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

    }

}

function stopClicking() {

    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {

        blocksContainer.classList.remove('no-clicking');

    }, duration)

}

function checkMatchedBlocks(firstBlock, secondBlock) {

    let triesElement = document.querySelector('.tries span');

    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('matched');
        secondBlock.classList.add('matched');

        firstBlock.classList.add('no-clicking');
        secondBlock.classList.add('no-clicking');

        document.getElementById('success').play();

    } else {

        triesElement.textContent = parseInt(triesElement.textContent) + 1;

        setTimeout(() => {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

        }, duration);

        document.getElementById('fail').play();

    }
}

function shuffle(array) {

    let current = array.length,
        temp,
        random;

    while (current > 0) {

        random = Math.floor(Math.random() * current);

        current--;

        temp = array[current];

        array[current] = array[random];

        array[random] = temp

    }

    return array;

}


let mybtn = document.querySelector('.start-again button')
let startAgain = document.querySelector('.start-again')

let interval = setInterval(() => {

    let allMatchedBlocks = blocks.filter(flipBlock => flipBlock.classList.contains('matched'));

    if (allMatchedBlocks.length == orderRange.length) {

        startAgain.style.visibility = "visible";
        document.getElementById('end').play();
        clearInterval(interval);

    } else if (mybtn.textContent === "Start Again?") {

        mybtn.addEventListener('click', () => {
            location.reload()
        })

    }

}, 100);
