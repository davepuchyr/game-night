{/* <div id="dice-container" class="svg" style="margin: 0">
<div id="info_div" style="display: none">
  <div class="center_field">
    <span id="label"></span>
  </div>
  <div class="center_field">
    <div class="bottom_field">
      <span id="labelhelp">click to continue or tap and drag again</span>
    </div>
  </div>
</div>
<div id="selector_div" style="display: none">
  <div class="center_field">
    <div id="sethelp"></div>
  </div>
  <div class="center_field">
    <input type="text" id="set" value="1d6"/><br/>
    <button id="clear">clear</button>
    <button style="margin-left: 0.6em" id="throw">throw</button>
  </div>
</div>
<div id="canvas" style="width: 200px; height: 200px;"></div>
</div> */}

function resetHTML(){
  let dice_container = document.createElement('div')
  dice_container.id = 'dice-container'
  dice_container.className = 'svg'
  dice_container.style.margin = '0'

  let info_div = document.createElement('div')
  info_div.id = 'info_div'
  info_div.style.display = 'none'
  dice_container.appendChild(info_div)

  let center_field1 = document.createElement('div')
  center_field1.className = 'center_field'
  info_div.appendChild(center_field1)

  let label = document.createElement('span')
  label.id = 'label'
  center_field1.appendChild(label)

  let center_field2 = document.createElement('div')
  center_field2.className = 'center_field'
  info_div.appendChild(center_field2)

  let bottom_field = document.createElement('div')
  bottom_field.className = 'bottom_field'
  center_field2.appendChild(bottom_field)

  let labelhelp = document.createElement('span')
  labelhelp.id = 'labelhelp'
  bottom_field.appendChild(labelhelp)

  let selector_div = document.createElement('div')
  selector_div.id = 'selector_div'
  selector_div.style.display = 'none'
  dice_container.appendChild(selector_div)

  let center_field3 = document.createElement('div')
  center_field3.className = 'center_field'
  selector_div.appendChild(center_field3)

  let sethelp = document.createElement('div')
  sethelp.id = 'sethelp'
  center_field3.appendChild(sethelp)

  let center_field4 = document.createElement('div')
  center_field4.className = 'center_field'
  selector_div.appendChild(center_field4)

  let input = document.createElement('input')
  input.type = 'text'
  input.id = 'set'
  input.value = '1d6'
  center_field4.appendChild(input)

  let br = document.createElement('br')
  center_field4.appendChild(br)

  let clear_btn = document.createElement('button')
  clear_btn.id = 'clear'
  clear_btn.value = 'clear'
  center_field4.appendChild(clear_btn)

  let throw_btn = document.createElement('button')
  throw_btn.id = 'throw'
  throw_btn.value = 'throw'
  center_field4.appendChild(throw_btn)

  let canvas = document.createElement('div')
  canvas.id = 'canvas'
  canvas.style.width = '200px'
  canvas.style.height = '200px'
  dice_container.appendChild(canvas)


  return dice_container
}

module.exports = resetHTML