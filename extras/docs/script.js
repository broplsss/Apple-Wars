var bs2 = bulletStats;

for (let i = 0; i < bs2; i++) {
  
}

var bd = document.getElementById('bulletDocs');

function toTitle(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    } // more stolen code hehe
  );
};

//////////

for (let i = 0; i < Object.keys(bs2).length; i++) {
  let cur = Object.values(bs2)[i];
  let sh = {};
  let keys = Object.keys(bs2);
  let css = '';
  if (i == 0) {
    css = 'style="margin-top: 50px;"';
  };
  
  bd.innerHTML += 
    `<h2 ${css}>
      ${toTitle(cur.name)}</h2>
    <p>${cur.info}</p>
    <table>
      <tr class="dim">
        <td>Internal</td>
        <td>Speed</td>
        <td>Scaler</td>
        <td>Damage</td>
        <td>Poison</td>
        <td>Explosive</td>
        <td>Splits</td>
      </tr>
      <tr>
        <td>${keys[i]}</td>
        <td>${cur.speed}</td>
        <td>${cur.scaler}</td>
        <td>${cur.damage}</td>
        <td>${cur.poison}</td>
        <td>-------</td>
        <td>-------</td>
      </tr>
    </table>
    <table>
      <tr class="dim">
        <td>Spread</td>
        <td>Cooldown</td>
        <td>Amount</td>
        <td>Requirement</td>
        <td>Price</td>
      </tr>
      <tr>
        <td>${cur.spread}</td>
        <td>${cur.cooldown}</td>
        <td>${cur.amount}</td>
        <td>${sh.requires}</td>
        <td>${sh.price}</td>
      </tr>
    </table>`;
};