(this.webpackJsonpdatetime=this.webpackJsonpdatetime||[]).push([[0],{26:function(e,t,n){},28:function(e,t,n){},48:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),c=n(19),s=n.n(c),o=(n(26),n(5)),i=n.n(o),u=n(10),l=n(2),j=(n(28),n(20)),d=n.n(j),b=n(21),h=function(e){for(var t=0,n=-1,a=-1,r=0;r<e.length;r++)for(var c=r;c<e.length;c++){var s=e[c]-e[r];s>t&&(t=s,n=r,a=c)}return[n,a]},p=function(e){return[e.map((function(e){return e[0]})),e.map((function(e){return e[1]}))]},f=n(0),O=function(e){var t=e.text,n=e.handlerFunc;return Object(f.jsx)("button",{className:"infoButton",onClick:function(){n()},children:t})};var m=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(""),s=Object(l.a)(c,2),o=s[0],j=s[1],m=Object(a.useState)(""),v=Object(l.a)(m,2),x=v[0],g=v[1],S=Object(a.useState)([]),y=Object(l.a)(S,2),w=y[0],F=y[1],k=Object(a.useState)(0),D=Object(l.a)(k,2),N=D[0],I=D[1],P=Object(a.useState)(""),T=Object(l.a)(P,2),B=T[0],L=T[1],C=Object(a.useState)(""),E=Object(l.a)(C,2),M=E[0],_=E[1],q=Object(a.useState)(""),A=Object(l.a)(q,2),J=A[0],W=A[1],z=Object(a.useState)(""),H=Object(l.a)(z,2),R=H[0],U=H[1],G=Object(a.useState)(!0),K=Object(l.a)(G,2),Q=K[0],V=K[1],X=Object(a.useState)(!1),Y=Object(l.a)(X,2),Z=Y[0],$=Y[1],ee=Object(a.useState)(!1),te=Object(l.a)(ee,2),ne=te[0],ae=te[1],re=Object(a.useState)(!1),ce=Object(l.a)(re,2),se=ce[0],oe=ce[1],ie=Object(a.useState)(!1),ue=Object(l.a)(ie,2),le=ue[0],je=ue[1],de=Object(a.useState)(""),be=Object(l.a)(de,2),he=be[0],pe=be[1],fe=Object(a.useState)(""),Oe=Object(l.a)(fe,2),me=Oe[0],ve=Oe[1],xe=function(){var e=Object(u.a)(i.a.mark((function e(t){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=function(){return(a=Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.a.get("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=".concat(o+3600,"&to=").concat(x));case 3:t=e.sent,pe(""),ve(""),r(ge(t.data.prices)),F(ge(t.data.total_volumes)),je(!0),ve("The data has NOT loaded, try to enter some dates"),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(0),console.error(e.t0),pe("Data not loaded, try entering some dates");case 16:case"end":return e.stop()}}),e,null,[[0,12]])})))).apply(this,arguments)},n=function(){return a.apply(this,arguments)},t.preventDefault(),n();case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ge=function(e){var t=[],n=[];return e.forEach((function(e,a){var r=new Date(e[0]).toDateString();t.indexOf(r)<0&&(t.push(r),n.push(e))})),n},Se=function(e){return parseInt((new Date(e).getTime()/1e3).toFixed(0))},ye=function(e){return new Date(e).toLocaleDateString("ru-RU")},we=function(){for(var e=n.map((function(e){return e[1]})),t=0,a=0;a<e.length;a++)e[a]<e[a+1]&&(t++,a++);return 0===t||!(t>0)&&void 0},Fe=function(){I(0),oe(!1),ae(!1),L("");var e=function(e){var t=p(e)[0],n=p(e)[1];return t[h(n)[0]]}(n);W(e);var t=function(e){var t=p(e)[0],n=p(e)[1];return t[h(n)[1]]}(n);_(t)};return Object(f.jsxs)("div",{className:"App",children:[Object(f.jsxs)("div",{className:"appParagraph",children:[Object(f.jsx)("h2",{style:{color:"darkgreen"},children:"Bitcoin Data Analyzer"}),Object(f.jsx)("p",{className:"appTitle",children:"Set the date range"}),Object(f.jsxs)("form",{onSubmit:function(e){return function(e){pe(""),I(0),$(!1),L(""),xe(e)}(e)},children:[Object(f.jsx)("input",{className:"formItem inputElement",type:"date",placeholder:"From",onInput:function(e){return function(e){j(""),j(Se(e.target.value))}(e)},required:!0}),Object(f.jsx)("input",{className:"formItem inputElement",type:"date",placeholder:"To",onInput:function(e){return function(e){g("");var t=Se(e.target.value);g(t)}(e)},required:!0}),Object(f.jsx)("button",{className:"formItem submitButton",type:"submit",children:"Submit"})]})]}),Object(f.jsxs)("div",{className:"appParagraph",children:[le&&n.length>0?Object(f.jsx)("p",{style:{color:"green",fontWeight:"700"},children:"The data has loaded, choose what you want to know"}):Object(f.jsxs)("p",{style:{color:"red",fontWeight:"700"},children:[" ",me]}),Object(f.jsx)(O,{text:"Longest downward",handlerFunc:function(){if(oe(!0),ae(!1),$(!1),pe(""),I(0),le){var e=function(e){for(var t=e.map((function(e){return e[1]})),n=0,a=0,r=0;r<t.length;r++){for(;t[r]>t[r+1];)++a,r++;a>n&&(n=a),a=0}return n}(n);L(e)}else pe("Please enter some dates first for showing the trend")}}),Object(f.jsx)(O,{text:"Highest trading volume",handlerFunc:function(){if(pe(""),oe(!1),$(!1),ae(!0),le){L("");var e=function(e){var t=e.map((function(e){return e[0]})),n=e.map((function(e){return e[1]})),a=Math.max.apply(Math,Object(b.a)(n));return[a,t[n.indexOf(a)]]}(w),t=e[0],n=e[1];I(t),U(n)}else pe("Please enter some dates first for showing volume")}}),Object(f.jsx)(O,{text:"Sell and Buy",handlerFunc:function(){pe(""),$(!0),oe(!1),ae(!1);var e=we();le?e?V(!1):(V(!0),Fe()):pe("Please enter some dates first for showing buying and selling dates")}})]}),Object(f.jsxs)("div",{className:"appParagraph",children:[ne&&(N>0?Object(f.jsx)("div",{children:Object(f.jsxs)("p",{children:["Max volume: ",N.toFixed(2)," euros on"," ",ye(R)]})}):Object(f.jsx)("p",{children:he})),Z&&(Q?M?Object(f.jsxs)("div",{children:[J&&Object(f.jsxs)("p",{children:["Should buy: on ",ye(J)]}),M&&Object(f.jsxs)("p",{children:["Should sell: on ",ye(M)]})]}):Object(f.jsx)("p",{children:he}):Object(f.jsx)("p",{children:"Deals are not profitable: the price only decreases"})),se&&(B?Object(f.jsx)("div",{children:Object(f.jsxs)("p",{children:["Longest downward span: ",B," days in a row"]})}):Object(f.jsx)("p",{children:he}))]})]})},v=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,49)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),c(e),s(e)}))};s.a.render(Object(f.jsx)(r.a.StrictMode,{children:Object(f.jsx)(m,{})}),document.getElementById("root")),v()}},[[48,1,2]]]);
//# sourceMappingURL=main.1009f3a7.chunk.js.map