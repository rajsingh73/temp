var progress = document.querySelector(".progress");
    var percent = document.querySelector(".percent");
    var textBox = document.querySelector(".textBox");
    var button = document.querySelector(".button");
    var textBtn = document.querySelector(".textBtn");
    var heartBox = document.querySelector(".heartBox");
    var cursor = document.querySelector(".buttonCLick img"); 
    var heartItem1 = document.querySelector(".heartItem.item1")
    var heartItem2 = document.querySelector(".heartItem.item2")
    var heartItem3 = document.querySelector(".heartItem.item3")
    var count = 0;
    var percentWidth = 0;
    var heartLeft = -3.2;

    // Show the loading textBox at the start
    textBox.style.opacity = "1";
    textBox.style.transform = "scale(1)";

    var progressLoad = setInterval(progressInterva, 100);

    button.addEventListener("click", function () {
        button.style.transform = "scale(0.8)";
        setTimeout(() => {
            button.style.transform = "scale(1)";
            window.location.href = "love.html"
        }, 200)
    });

    function progressInterva() {
        if (count == 100 && percentWidth == 100) {
            clearInterval(progressLoad)
            percent.textContent = "It's ready 😊:)";
            percent.style.letterSpacing = "1px";

            // Final heart animation
            heartItem3.style.animation = "1s heartScale forwards"

            // Hide textBox
            setTimeout(() => {
                textBox.style.transform = "scale(0)";
            }, 600);
            setTimeout(() => {
                textBox.style.opacity = "0";
            }, 1000);

            // Reveal button step-by-step
            setTimeout(() => {
                button.style.transform = "scale(1)";
            }, 1200);
            setTimeout(() => {
                button.style.background = "rgb(244,118,121)";
                button.style.width = "130px";
                button.style.borderRadius = "20px";
            }, 1500);
            setTimeout(() => {
                button.style.height = "40px";
            }, 1800);
            setTimeout(() => {
                textBtn.textContent = "Click me!";
                textBtn.style.color = "#fff";
            }, 2100);
            setTimeout(() => {
                cursor.style.opacity = "1";
            }, 2400);
        } else {
            if (count == 10) {
                heartItem1.style.animation = "1s heartScale forwards";
            }
            if (count == 46) {
                percent.style.color = "#fff";
            }
            if (count == 60) {
                heartItem2.style.animation = "1s heartScale forwards";
            }
            count += 1;
            percentWidth += 1;
            heartLeft += 0.968;
            progress.style.width = percentWidth + '%';
            percent.innerText = count + '%';
            heartBox.style.left = heartLeft + '%';
        }
    }
