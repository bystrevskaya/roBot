const speech = new SpeechSynthesisUtterance();
    let voices = [];
    const voiceSelect = document.querySelector('[name="voice"]');
    const options = document.querySelectorAll('[type="range"], [name="rate"]');
    const speakButton = document.querySelector('#speak-btn');
    const stopButton = document.querySelector('#stop-btn');
    const robot = document.querySelector('.robot');
    const text = document.querySelector('[name="text"]');
    
    voices = window.speechSynthesis.getVoices();
    for (var index = 0; index < voices.length; index++)
    {
      var newOption = document.createElement("option");
      newOption.innerHTML = voices[index].name;
      newOption.value = index;
      voiceSelect.appendChild(newOption);
    };

    options.forEach(option => speech[option.name] = option.value);
    speech.text = text.value;

    options.forEach(option => option.addEventListener('change', setOptions));
    voiceSelect.addEventListener('change', setVoice);
    text.addEventListener('input', setText);

    function setOptions()
    {
      speech[this.name] = this.value;
    }

    function setVoice()
    {
      speech.voice = voices[voiceSelect.value];
      speech.lang = voices[voiceSelect.value].lang;
    }

    function setText()
    {
      speech.text = text.value;
    }

    function restart()
    {
      speechSynthesis.cancel(speech);
      speechSynthesis.speak(speech);
    }

    speakButton.addEventListener('click', () => { speechSynthesis.speak(speech); robot.classList.add('robot_speaking') });
    stopButton.addEventListener('click', () => { speechSynthesis.cancel(speech); robot.classList.remove('robot_speaking')});