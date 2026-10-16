import{$ as Ov,$t as h,A as Id$1,An as sw,At as Yl$1,B as Le,Bn as wm,Bt as bv,C as Ed$1,Cn as pC,Ct as U3,D as G,Dn as ra$1,Dt as Xl$1,E as Fi$1,En as r2,Et as XC,F as Jm,Fn as ue,Ft as b,G as NC,Gn as ym,Gt as ee$1,H as Lp,Hn as xo,Ht as dG,I as Jn,In as v,It as bC,J as Od$1,Jn as zt$1,Jt as fm,K as Nm,Kn as yo$1,Kt as et,L as Js$1,Ln as ve,Lt as bD,M as Iv,Mn as t2,Mt as Zs$1,N as J,Nn as tc$1,Nt as _m,O as G$,On as s2,Ot as Xs$1,P as Jl$1,Pn as tt,Pt as aT,Q as Or,Qt as gv,R as K,Rn as vm,Rt as bM,S as E,Sn as oc$1,St as Tr,T as FD,Tn as qT,Tt as We,U as Mm,Un as y,Ut as e2,V as Li,Vn as xC,Vt as dC,W as Mn$1,Wn as yC,Wt as ed$1,X as On$1,Xt as gC,Y as Oe,Yn as zz,Yt as g3,Z as Op,Zt as go$1,_ as De,_n as mo,_t as Ss$1,a as $t$1,an as ht,at as R,b as Dp,bn as nt,bt as Te,c as Ao$1,cn as jm,ct as Rm,d as B3,dn as ks$1,dt as S,en as h3,et as PD,f as BI,fn as lc$1,ft as SC,g as DM,gn as me$1,gt as Sr,h as DE,hn as mD,ht as Sm,i as $m,in as hm$1,it as Qs$1,j as Im,jn as sy,jt as Zl$1,k as H,kn as sT,kt as Xv,l as Av,ln as k,lt as Rn$1,m as Cm,mn as mC,mt as Se,n as $e$1,nn as hM,nt as Ql$1,o as AC,on as i2,ot as RC,p as CD,pn as m,pt as SD,q as Nn$1,qn as yt$1,qt as ey,r as $i$1,rn as he$1,rt as Qo,s as Aa$1,sn as jD,st as RM,t as $I,tn as hC,tt as Po$1,u as B,un as kD,ut as Rt,v as Dm,vn as n2,vt as Sw,w as Eo$1,wn as pe,wt as Vm,x as Dr,xn as oa$1,xt as Tm,y as Do$1,yn as nc$1,yt as TD,z as Kl,zn as vp,zt as be}from"./main-PNC22KX4.js";function yt(i){return i.buttons===0||i.detail===0}function xt(i){let n=i.touches&&i.touches[0]||i.changedTouches&&i.changedTouches[0];return!!n&&n.identifier===-1&&(n.radiusX==null||n.radiusX===1)&&(n.radiusY==null||n.radiusY===1)}var fo;function ea(){if(fo==null){let i=typeof document<`u`?document.head:null;fo=!!(i&&(i.createShadowRoot||i.attachShadow))}return fo}function kt(i){if(ea()){let n=i.getRootNode?i.getRootNode():null;if(typeof ShadowRoot<`u`&&ShadowRoot&&n instanceof ShadowRoot)return n}return null}function de(i){if(i.composedPath)try{return i.composedPath()[0]}catch{}return i.target}var bo;try{bo=typeof Intl<`u`&&Intl.v8BreakIterator}catch{bo=!1}var ee=(()=>{class i{_platformId=h(mo);isBrowser=this._platformId?G$(this._platformId):typeof document==`object`&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||bo)&&typeof CSS<`u`&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!(`MSStream`in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;static ɵfac=function(t){return new(t||i)};static ɵprov=he$1({token:i,factory:i.ɵfac})}return i})();var tn;function ta(){if(tn==null&&typeof window<`u`)try{window.addEventListener(`test`,null,Object.defineProperty({},"passive",{get:()=>tn=!0}))}finally{tn=tn||!1}return tn}function Pt(i){return ta()?i:!!i.capture}function ot(i,n=0){return na(i)?Number(i):arguments.length===2?n:0}function na(i){return!isNaN(parseFloat(i))&&!isNaN(Number(i))}function me(i){return i instanceof et?i.nativeElement:i}var ia=new m(`cdk-input-modality-detector-options`);var oa={ignoreKeys:[18,17,224,91,16]};var ra=650;var go={passive:!0,capture:!0};var aa=(()=>{class i{_platform=h(ee);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new Oe(null);_options;_lastTouchMs=0;_onKeydown=e=>{this._options?.ignoreKeys?.some(t=>t===e.keyCode)||(this._modality.next(`keyboard`),this._mostRecentTarget=de(e))};_onMousedown=e=>{Date.now()-this._lastTouchMs<ra||(this._modality.next(yt(e)?`keyboard`:`mouse`),this._mostRecentTarget=de(e))};_onTouchstart=e=>{if(xt(e)){this._modality.next(`keyboard`);return}this._lastTouchMs=Date.now(),this._modality.next(`touch`),this._mostRecentTarget=de(e)};constructor(){let e=h(ee$1),t=h(H),o=h(ia,{optional:!0});if(this._options=y(y({},oa),o),this.modalityDetected=this._modality.pipe(kD(1)),this.modalityChanged=this.modalityDetected.pipe(oc$1()),this._platform.isBrowser){let r=h(Mn$1).createRenderer(null,null);this._listenerCleanups=e.runOutsideAngular(()=>[r.listen(t,`keydown`,this._onKeydown,go),r.listen(t,`mousedown`,this._onMousedown,go),r.listen(t,`touchstart`,this._onTouchstart,go)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(e=>e())}static ɵfac=function(t){return new(t||i)};static ɵprov=he$1({token:i,factory:i.ɵfac})}return i})();var nn=(function(i){return i[i.IMMEDIATE=0]=`IMMEDIATE`,i[i.EVENTUAL=1]=`EVENTUAL`,i})(nn||{});var sa=new m(`cdk-focus-monitor-default-options`);var ii=Pt({passive:!0,capture:!0});var on=(()=>{class i{_ngZone=h(ee$1);_platform=h(ee);_inputModalityDetector=h(aa);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=h(H);_stopInputModalityDetector=new B;constructor(){let e=h(sa,{optional:!0});this._detectionMode=e?.detectionMode||nn.IMMEDIATE}_rootNodeFocusAndBlurListener=e=>{let t=de(e);for(let o=t;o;o=o.parentElement)e.type===`focus`?this._onFocus(e,o):this._onBlur(e,o)};monitor(e,t=!1){let o=me(e);if(!this._platform.isBrowser||o.nodeType!==1)return pe();let r=kt(o)||this._document,a=this._elementInfo.get(o);if(a)return t&&(a.checkChildren=!0),a.subject;let s={checkChildren:t,subject:new B,rootNode:r};return this._elementInfo.set(o,s),this._registerGlobalListeners(s),s.subject}stopMonitoring(e){let t=me(e),o=this._elementInfo.get(t);o&&(o.subject.complete(),this._setClasses(t),this._elementInfo.delete(t),this._removeGlobalListeners(o))}focusVia(e,t,o){let r=me(e);r===this._document.activeElement?this._getClosestElementsInfo(r).forEach(([s,c])=>this._originChanged(s,t,c)):(this._setOrigin(t),typeof r.focus==`function`&&r.focus(o))}ngOnDestroy(){this._elementInfo.forEach((e,t)=>this.stopMonitoring(t))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(e){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(e)?`touch`:`program`:this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:e&&this._isLastInteractionFromInputLabel(e)?`mouse`:`program`}_shouldBeAttributedToTouch(e){return this._detectionMode===nn.EVENTUAL||!!e?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(e,t){e.classList.toggle(`cdk-focused`,!!t),e.classList.toggle(`cdk-touch-focused`,t===`touch`),e.classList.toggle(`cdk-keyboard-focused`,t===`keyboard`),e.classList.toggle(`cdk-mouse-focused`,t===`mouse`),e.classList.toggle(`cdk-program-focused`,t===`program`)}_setOrigin(e,t=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=e,this._originFromTouchInteraction=e===`touch`&&t,this._detectionMode===nn.IMMEDIATE){clearTimeout(this._originTimeoutId);let o=this._originFromTouchInteraction?ra:1;this._originTimeoutId=setTimeout(()=>this._origin=null,o)}})}_onFocus(e,t){let o=this._elementInfo.get(t),r=de(e);!o||!o.checkChildren&&t!==r||this._originChanged(t,this._getFocusOrigin(r),o)}_onBlur(e,t){let o=this._elementInfo.get(t);!o||o.checkChildren&&e.relatedTarget instanceof Node&&t.contains(e.relatedTarget)||(this._setClasses(t),this._emitOrigin(o,null))}_emitOrigin(e,t){e.subject.observers.length&&this._ngZone.run(()=>e.subject.next(t))}_registerGlobalListeners(e){if(!this._platform.isBrowser)return;let t=e.rootNode,o=this._rootNodeFocusListenerCount.get(t)||0;o||this._ngZone.runOutsideAngular(()=>{t.addEventListener(`focus`,this._rootNodeFocusAndBlurListener,ii),t.addEventListener(`blur`,this._rootNodeFocusAndBlurListener,ii)}),this._rootNodeFocusListenerCount.set(t,o+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener(`focus`,this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(lc$1(this._stopInputModalityDetector)).subscribe(r=>{this._setOrigin(r,!0)}))}_removeGlobalListeners(e){let t=e.rootNode;if(this._rootNodeFocusListenerCount.has(t)){let o=this._rootNodeFocusListenerCount.get(t);o>1?this._rootNodeFocusListenerCount.set(t,o-1):(t.removeEventListener(`focus`,this._rootNodeFocusAndBlurListener,ii),t.removeEventListener(`blur`,this._rootNodeFocusAndBlurListener,ii),this._rootNodeFocusListenerCount.delete(t))}--this._monitoredElementCount||(this._getWindow().removeEventListener(`focus`,this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(e,t,o){this._setClasses(e,t),this._emitOrigin(o,t),this._lastFocusOrigin=t}_getClosestElementsInfo(e){let t=[];return this._elementInfo.forEach((o,r)=>{(r===e||o.checkChildren&&r.contains(e))&&t.push([r,o])}),t}_isLastInteractionFromInputLabel(e){let{_mostRecentTarget:t,mostRecentModality:o}=this._inputModalityDetector;if(o!==`mouse`||!t||t===e||e.nodeName!==`INPUT`&&e.nodeName!==`TEXTAREA`||e.disabled)return!1;let r=e.labels;if(r){for(let a=0;a<r.length;a++)if(r[a].contains(t))return!0}return!1}static ɵfac=function(t){return new(t||i)};static ɵprov=he$1({token:i,factory:i.ɵfac})}return i})();function ft(i){return Array.isArray(i)?i:[i]}var la=new Set;var Ct;var Ft=(()=>{class i{_platform=h(ee);_nonce=h(yo$1,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):Gl}matchMedia(e){return(this._platform.WEBKIT||this._platform.BLINK)&&Hl(e,this._nonce),this._matchMedia(e)}static ɵfac=function(t){return new(t||i)};static ɵprov=he$1({token:i,factory:i.ɵfac})}return i})();function Hl(i,n){if(!la.has(i))try{Ct||(Ct=document.createElement(`style`),n&&Ct.setAttribute(`nonce`,n),Ct.setAttribute(`type`,`text/css`),document.head.appendChild(Ct)),Ct.sheet&&(Ct.sheet.insertRule(`@media ${i.replace(/[{}]/g,``)} {body{ }}`,0),la.add(i))}catch(e){console.error(e)}}function Gl(i){return{matches:i===`all`||i===``,media:i,addListener:()=>{},removeListener:()=>{}}}var _o=(()=>{class i{_mediaMatcher=h(Ft);_zone=h(ee$1);_queries=new Map;_destroySubject=new B;ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(e){return ca(ft(e)).some(o=>this._registerQuery(o).mql.matches)}observe(e){let o=ca(ft(e)).map(a=>this._registerQuery(a).observable),r=tc$1(o);return r=Li(r.pipe(me$1(1)),r.pipe(kD(1),SD(0))),r.pipe(k(a=>{let s={matches:!1,breakpoints:{}};return a.forEach(({matches:c,query:h})=>{s.matches=s.matches||c,s.breakpoints[h]=c}),s}))}_registerQuery(e){if(this._queries.has(e))return this._queries.get(e);let t=this._mediaMatcher.matchMedia(e),r={observable:new S(a=>{let s=c=>this._zone.run(()=>a.next(c));return t.addListener(s),()=>{t.removeListener(s)}}).pipe(PD(t),k(({matches:a})=>({query:e,matches:a})),lc$1(this._destroySubject)),mql:t};return this._queries.set(e,r),r}static ɵfac=function(t){return new(t||i)};static ɵprov=he$1({token:i,factory:i.ɵfac})}return i})();function ca(i){return i.map(n=>n.split(`,`)).reduce((n,e)=>n.concat(e)).map(n=>n.trim())}var Ul=(()=>{class i{create(e){return typeof MutationObserver>`u`?null:new MutationObserver(e)}static ɵfac=function(t){return new(t||i)};static ɵprov=he$1({token:i,factory:i.ɵfac})}return i})();var oi=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵmod=$e$1({type:i});static ɵinj=Se({providers:[Ul]})}return i})();var ua=new m(`liveAnnouncerElement`,{providedIn:`root`,factory:()=>null});var pa=new m(`LIVE_ANNOUNCER_DEFAULT_OPTIONS`);var Wl=0;var rn=(()=>{class i{_ngZone=h(ee$1);_defaultOptions=h(pa,{optional:!0});_liveElement;_document=h(H);_sanitizer=h(Ed$1);_previousTimeout;_currentPromise;_currentResolve;constructor(){let e=h(ua,{optional:!0});this._liveElement=e||this._createLiveElement()}announce(e,...t){let o=this._defaultOptions,r,a;return t.length===1&&typeof t[0]==`number`?a=t[0]:[r,a]=t,this.clear(),clearTimeout(this._previousTimeout),r||(r=o&&o.politeness?o.politeness:`polite`),a==null&&o&&(a=o.duration),this._liveElement.setAttribute(`aria-live`,r),this._liveElement.id&&this._exposeAnnouncerToModals(this._liveElement.id),this._ngZone.runOutsideAngular(()=>(this._currentPromise||(this._currentPromise=new Promise(s=>this._currentResolve=s)),clearTimeout(this._previousTimeout),this._previousTimeout=setTimeout(()=>{!e||typeof e==`string`?this._liveElement.textContent=e:g3(this._liveElement,e,this._sanitizer),typeof a==`number`&&(this._previousTimeout=setTimeout(()=>this.clear(),a)),this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0},100),this._currentPromise))}clear(){this._liveElement&&(this._liveElement.textContent=``)}ngOnDestroy(){clearTimeout(this._previousTimeout),this._liveElement?.remove(),this._liveElement=null,this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0}_createLiveElement(){let e=`cdk-live-announcer-element`,t=this._document.getElementsByClassName(e),o=this._document.createElement(`div`);for(let r=0;r<t.length;r++)t[r].remove();return o.classList.add(e),o.classList.add(`cdk-visually-hidden`),o.setAttribute(`aria-atomic`,`true`),o.setAttribute(`aria-live`,`polite`),o.id=`cdk-live-announcer-${Wl++}`,this._document.body.appendChild(o),o}_exposeAnnouncerToModals(e){let t=this._document.querySelectorAll(`body > .cdk-overlay-container [aria-modal="true"]`);for(let o=0;o<t.length;o++){let r=t[o],a=r.getAttribute(`aria-owns`);a?a.indexOf(e)===-1&&r.setAttribute(`aria-owns`,a+` `+e):r.setAttribute(`aria-owns`,e)}}static ɵfac=function(t){return new(t||i)};static ɵprov=he$1({token:i,factory:i.ɵfac})}return i})();var bt=(function(i){return i[i.NONE=0]=`NONE`,i[i.BLACK_ON_WHITE=1]=`BLACK_ON_WHITE`,i[i.WHITE_ON_BLACK=2]=`WHITE_ON_BLACK`,i})(bt||{});var da=`cdk-high-contrast-black-on-white`;var ma=`cdk-high-contrast-white-on-black`;var vo=`cdk-high-contrast-active`;var ha=(()=>{class i{_platform=h(ee);_hasCheckedHighContrastMode=!1;_document=h(H);_breakpointSubscription;constructor(){this._breakpointSubscription=h(_o).observe(`(forced-colors: active)`).subscribe(()=>{this._hasCheckedHighContrastMode&&(this._hasCheckedHighContrastMode=!1,this._applyBodyHighContrastModeCssClasses())})}getHighContrastMode(){if(!this._platform.isBrowser)return bt.NONE;let e=this._document.createElement(`div`);e.style.backgroundColor=`rgb(1,2,3)`,e.style.position=`absolute`,this._document.body.appendChild(e);let t=this._document.defaultView||window,o=t&&t.getComputedStyle?t.getComputedStyle(e):null,r=(o&&o.backgroundColor||``).replace(/ /g,``);switch(e.remove(),r){case`rgb(0,0,0)`:case`rgb(45,50,54)`:case`rgb(32,32,32)`:return bt.WHITE_ON_BLACK;case`rgb(255,255,255)`:case`rgb(255,250,239)`:return bt.BLACK_ON_WHITE}return bt.NONE}ngOnDestroy(){this._breakpointSubscription.unsubscribe()}_applyBodyHighContrastModeCssClasses(){if(!this._hasCheckedHighContrastMode&&this._platform.isBrowser&&this._document.body){let e=this._document.body.classList;e.remove(vo,da,ma),this._hasCheckedHighContrastMode=!0;let t=this.getHighContrastMode();t===bt.BLACK_ON_WHITE?e.add(vo,da):t===bt.WHITE_ON_BLACK&&e.add(vo,ma)}}static ɵfac=function(t){return new(t||i)};static ɵprov=he$1({token:i,factory:i.ɵfac})}return i})();var yo=(()=>{class i{constructor(){h(ha)._applyBodyHighContrastModeCssClasses()}static ɵfac=function(t){return new(t||i)};static ɵmod=$e$1({type:i});static ɵinj=Se({imports:[oi]})}return i})();var $l=200;var ri=class{_letterKeyStream=new B;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new B;selectedItem=this._selectedItem;constructor(n,e){let t=typeof e?.debounceInterval==`number`?e.debounceInterval:$l;e?.skipPredicate&&(this._skipPredicateFn=e.skipPredicate),this.setItems(n),this._setupKeyHandler(t)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(n){this._selectedItemIndex=n}setItems(n){this._items=n}handleKey(n){let e=n.keyCode;n.key&&n.key.length===1?this._letterKeyStream.next(n.key.toLocaleUpperCase()):(e>=65&&e<=90||e>=48&&e<=57)&&this._letterKeyStream.next(String.fromCharCode(e))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(n){this._letterKeyStream.pipe(Rt(e=>this._pressedLetters.push(e)),SD(n),We(()=>this._pressedLetters.length>0),k(()=>this._pressedLetters.join(``).toLocaleUpperCase())).subscribe(e=>{for(let t=1;t<this._items.length+1;t++){let o=(this._selectedItemIndex+t)%this._items.length,r=this._items[o];if(!this._skipPredicateFn?.(r)&&r.getLabel?.().toLocaleUpperCase().trim().indexOf(e)===0){this._selectedItem.next(r);break}}this._pressedLetters=[]})}};function $e(i,...n){return n.length?n.some(e=>i[e]):i.altKey||i.shiftKey||i.ctrlKey||i.metaKey}var ai=class{_items;_activeItemIndex=be(-1);_activeItem=be(null);_wrap=!1;_typeaheadSubscription=K.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=n=>n.disabled;constructor(n,e){this._items=n,n instanceof Ss$1?this._itemChangesSubscription=n.changes.subscribe(t=>this._itemsChanged(t.toArray())):Eo$1(n)&&(this._effectRef=Do$1(()=>this._itemsChanged(n()),{injector:e}))}tabOut=new B;change=new B;skipPredicate(n){return this._skipPredicateFn=n,this}withWrap(n=!0){return this._wrap=n,this}withVerticalOrientation(n=!0){return this._vertical=n,this}withHorizontalOrientation(n){return this._horizontal=n,this}withAllowedModifierKeys(n){return this._allowedModifierKeys=n,this}withTypeAhead(n=200){this._typeaheadSubscription.unsubscribe();let e=this._getItemsArray();return this._typeahead=new ri(e,{debounceInterval:typeof n==`number`?n:void 0,skipPredicate:t=>this._skipPredicateFn(t)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(t=>{this.setActiveItem(t)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(n=!0){return this._homeAndEnd=n,this}withPageUpDown(n=!0,e=10){return this._pageUpAndDown={enabled:n,delta:e},this}setActiveItem(n){let e=this._activeItem();this.updateActiveItem(n),this._activeItem()!==e&&this.change.next(this._activeItemIndex())}onKeydown(n){let e=n.keyCode,o=[`altKey`,`ctrlKey`,`metaKey`,`shiftKey`].every(r=>!n[r]||this._allowedModifierKeys.indexOf(r)>-1);switch(e){case 9:this.tabOut.next();return;case 40:if(this._vertical&&o){this.setNextItemActive();break}else return;case 38:if(this._vertical&&o){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&o){this._horizontal===`rtl`?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&o){this._horizontal===`rtl`?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&o){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&o){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&o){let r=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(r>0?r:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&o){let r=this._activeItemIndex()+this._pageUpAndDown.delta,a=this._getItemsArray().length;this._setActiveItemByIndex(r<a?r:a-1,-1);break}else return;default:(o||$e(n,`shiftKey`))&&this._typeahead?.handleKey(n);return}this._typeahead?.reset(),n.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(n){let e=this._getItemsArray(),t=typeof n==`number`?n:e.indexOf(n),o=e[t];this._activeItem.set(o??null),this._activeItemIndex.set(t),this._typeahead?.setCurrentSelectedItemIndex(t)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(n){this._wrap?this._setActiveInWrapMode(n):this._setActiveInDefaultMode(n)}_setActiveInWrapMode(n){let e=this._getItemsArray();for(let t=1;t<=e.length;t++){let o=(this._activeItemIndex()+n*t+e.length)%e.length,r=e[o];if(!this._skipPredicateFn(r)){this.setActiveItem(o);return}}}_setActiveInDefaultMode(n){this._setActiveItemByIndex(this._activeItemIndex()+n,n)}_setActiveItemByIndex(n,e){let t=this._getItemsArray();if(t[n]){for(;this._skipPredicateFn(t[n]);)if(n+=e,!t[n])return;this.setActiveItem(n)}}_getItemsArray(){return Eo$1(this._items)?this._items():this._items instanceof Ss$1?this._items.toArray():this._items}_itemsChanged(n){this._typeahead?.setItems(n);let e=this._activeItem();if(e){let t=n.indexOf(e);t>-1&&t!==this._activeItemIndex()&&(this._activeItemIndex.set(t),this._typeahead?.setCurrentSelectedItemIndex(t))}}};var an=class extends ai{setActiveItem(n){this.activeItem&&this.activeItem.setInactiveStyles(),super.setActiveItem(n),this.activeItem&&this.activeItem.setActiveStyles()}};var _a=new Map;var ye=class i{_appId=h(go$1);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(n,e=!1){this._appId!==`ng`&&(n+=this._appId);let t=_a.get(n);return t===void 0?t=0:t++,_a.set(n,t),`${n}${e?i._infix+`-`:``}${t}`}static ɵfac=function(e){return new(e||i)};static ɵprov=he$1({token:i,factory:i.ɵfac})};var ya=` `;function ql(i,n,e){let t=li(i,n);e=e.trim(),!t.some(o=>o.trim()===e)&&(t.push(e),i.setAttribute(n,t.join(ya)))}function Xl(i,n,e){let t=li(i,n);e=e.trim();let o=t.filter(r=>r!==e);o.length?i.setAttribute(n,o.join(ya)):i.removeAttribute(n)}function li(i,n){return i.getAttribute(n)?.match(/\S+/g)??[]}var xa=`cdk-describedby-message`;var si=`cdk-describedby-host`;var So=0;var ka=(()=>{class i{_platform=h(ee);_document=h(H);_messageRegistry=new Map;_messagesContainer=null;_id=`${So++}`;constructor(){h(DM).load(h3),this._id=h(go$1)+`-`+So++}describe(e,t,o){if(!this._canBeDescribed(e,t))return;let r=Co(t,o);typeof t!=`string`?(va(t,this._id),this._messageRegistry.set(r,{messageElement:t,referenceCount:0})):this._messageRegistry.has(r)||this._createMessageElement(t,o),this._isElementDescribedByMessage(e,r)||this._addMessageReference(e,r)}removeDescription(e,t,o){if(!t||!this._isElementNode(e))return;let r=Co(t,o);if(this._isElementDescribedByMessage(e,r)&&this._removeMessageReference(e,r),typeof t==`string`){let a=this._messageRegistry.get(r);a&&a.referenceCount===0&&this._deleteMessageElement(r)}this._messagesContainer?.childNodes.length===0&&(this._messagesContainer.remove(),this._messagesContainer=null)}ngOnDestroy(){let e=this._document.querySelectorAll(`[${si}="${this._id}"]`);for(let t=0;t<e.length;t++)this._removeCdkDescribedByReferenceIds(e[t]),e[t].removeAttribute(si);this._messagesContainer?.remove(),this._messagesContainer=null,this._messageRegistry.clear()}_createMessageElement(e,t){let o=this._document.createElement(`div`);va(o,this._id),o.textContent=e,t&&o.setAttribute(`role`,t),this._createMessagesContainer(),this._messagesContainer.appendChild(o),this._messageRegistry.set(Co(e,t),{messageElement:o,referenceCount:0})}_deleteMessageElement(e){this._messageRegistry.get(e)?.messageElement?.remove(),this._messageRegistry.delete(e)}_createMessagesContainer(){if(this._messagesContainer)return;let e=`cdk-describedby-message-container`,t=this._document.querySelectorAll(`.${e}[platform="server"]`);for(let r=0;r<t.length;r++)t[r].remove();let o=this._document.createElement(`div`);o.style.visibility=`hidden`,o.classList.add(e),o.classList.add(`cdk-visually-hidden`),this._platform.isBrowser||o.setAttribute(`platform`,`server`),this._document.body.appendChild(o),this._messagesContainer=o}_removeCdkDescribedByReferenceIds(e){let t=li(e,`aria-describedby`).filter(o=>o.indexOf(xa)!=0);e.setAttribute(`aria-describedby`,t.join(` `))}_addMessageReference(e,t){let o=this._messageRegistry.get(t);ql(e,`aria-describedby`,o.messageElement.id),e.setAttribute(si,this._id),o.referenceCount++}_removeMessageReference(e,t){let o=this._messageRegistry.get(t);o.referenceCount--,Xl(e,`aria-describedby`,o.messageElement.id),e.removeAttribute(si)}_isElementDescribedByMessage(e,t){let o=li(e,`aria-describedby`),r=this._messageRegistry.get(t),a=r&&r.messageElement.id;return!!a&&o.indexOf(a)!=-1}_canBeDescribed(e,t){if(!this._isElementNode(e))return!1;if(t&&typeof t==`object`)return!0;let o=t==null?``:`${t}`.trim(),r=e.getAttribute(`aria-label`);return o?!r||r.trim()!==o:!1}_isElementNode(e){return e.nodeType===this._document.ELEMENT_NODE}static ɵfac=function(t){return new(t||i)};static ɵprov=he$1({token:i,factory:i.ɵfac})}return i})();function Co(i,n){return typeof i==`string`?`${n||``}/${i}`:i}function va(i,n){i.id||(i.id=`${xa}-${n}-${So++}`)}var Na=(()=>{class i{_renderer;_elementRef;onChange=e=>{};onTouched=()=>{};constructor(e,t){this._renderer=e,this._elementRef=t}setProperty(e,t){this._renderer.setProperty(this._elementRef.nativeElement,e,t)}registerOnTouched(e){this.onTouched=e}registerOnChange(e){this.onChange=e}setDisabledState(e){this.setProperty(`disabled`,e)}static ɵfac=function(t){return new(t||i)(Rn$1(Dr),Rn$1(et))};static ɵdir=Tr({type:i})}return i})();var Yl=(()=>{class i extends Na{static ɵfac=(()=>{let e;return function(o){return(e||(e=xo(i)))(o||i)}})();static ɵdir=Tr({type:i,features:[fm]})}return i})();var Do=new m(``);var Zl={provide:Do,useExisting:$i$1(()=>Ia),multi:!0};function Ql(){let i=yt$1()?yt$1().getUserAgent():``;return/android (\d+)/.test(i.toLowerCase())}var Jl=new m(``);var Ia=(()=>{class i extends Na{_compositionMode;_composing=!1;constructor(e,t,o){super(e,t),this._compositionMode=o,this._compositionMode??=!Ql()}writeValue(e){let t=e??``;this.setProperty(`value`,t)}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e)}_compositionStart(){this._composing=!0}_compositionEnd(e){this._composing=!1,this._compositionMode&&this.onChange(e)}static ɵfac=function(t){return new(t||i)(Rn$1(Dr),Rn$1(et),Rn$1(Jl,8))};static ɵdir=Tr({type:i,selectors:[[`input`,`formControlName`,``,3,`type`,`checkbox`,3,`ngNoCva`,``],[`textarea`,`formControlName`,``,3,`ngNoCva`,``],[`input`,`formControl`,``,3,`type`,`checkbox`,3,`ngNoCva`,``],[`textarea`,`formControl`,``,3,`ngNoCva`,``],[`input`,`ngModel`,``,3,`type`,`checkbox`,3,`ngNoCva`,``],[`textarea`,`ngModel`,``,3,`ngNoCva`,``],[``,`ngDefaultControl`,``]],hostBindings:function(t,o){t&1&&Cm(`input`,function(a){return o._handleInput(a.target.value)})(`blur`,function(){return o.onTouched()})(`compositionstart`,function(){return o._compositionStart()})(`compositionend`,function(a){return o._compositionEnd(a.target.value)})},standalone:!1,features:[$m([Zl]),fm]})}return i})();function Mo(i){return i==null||No(i)===0}function No(i){return i==null?null:Array.isArray(i)||typeof i==`string`?i.length:i instanceof Set?i.size:null}var un=new m(``);var Oa=new m(``);var ec=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;var St=class{static min(n){return tc(n)}static max(n){return nc(n)}static required(n){return Ra(n)}static requiredTrue(n){return ic(n)}static email(n){return oc(n)}static minLength(n){return rc(n)}static maxLength(n){return ac(n)}static pattern(n){return sc(n)}static nullValidator(n){return di()}static compose(n){return La(n)}static composeAsync(n){return za(n)}};function tc(i){return n=>{if(n.value==null||i==null)return null;let e=parseFloat(n.value);return!isNaN(e)&&e<i?{min:{min:i,actual:n.value}}:null}}function nc(i){return n=>{if(n.value==null||i==null)return null;let e=parseFloat(n.value);return!isNaN(e)&&e>i?{max:{max:i,actual:n.value}}:null}}function Ra(i){return Mo(i.value)?{required:!0}:null}function ic(i){return i.value===!0?null:{required:!0}}function oc(i){return Mo(i.value)||ec.test(i.value)?null:{email:!0}}function rc(i){return n=>{let e=n.value?.length??No(n.value);return e===null||e===0?null:e<i?{minlength:{requiredLength:i,actualLength:e}}:null}}function ac(i){return n=>{let e=n.value?.length??No(n.value);return e!==null&&e>i?{maxlength:{requiredLength:i,actualLength:e}}:null}}function sc(i){if(!i)return di;let n,e;return typeof i==`string`?(e=``,i.charAt(0)!==`^`&&(e+=`^`),e+=i,i.charAt(i.length-1)!==`$`&&(e+=`$`),n=new RegExp(e)):(e=i.toString(),n=i),t=>{if(Mo(t.value))return null;let o=t.value;return n.test(o)?null:{pattern:{requiredPattern:e,actualValue:o}}}}function di(i){return null}function Aa(i){return i!=null}function Ta(i){return Zs$1(i)?ve(i):i}function Pa(i){let n={};return i.forEach(e=>{n=e!=null?y(y({},n),e):n}),Object.keys(n).length===0?null:n}function Fa(i,n){return n.map(e=>e(i))}function lc(i){return!i.validate}function Va(i){return i.map(n=>lc(n)?n:e=>n.validate(e))}function La(i){if(!i)return null;let n=i.filter(Aa);return n.length==0?null:function(e){return Pa(Fa(e,n))}}function Io(i){return i!=null?La(Va(i)):null}function za(i){if(!i)return null;let n=i.filter(Aa);return n.length==0?null:function(e){let t=Fa(e,n).map(Ta);return Jn(t).pipe(k(Pa))}}function Oo(i){return i!=null?za(Va(i)):null}function Ca(i,n){return i===null?[n]:Array.isArray(i)?[...i,n]:[i,n]}function Ba(i){return i._rawValidators}function ja(i){return i._rawAsyncValidators}function wo(i){return i?Array.isArray(i)?i:[i]:[]}function mi(i,n){return Array.isArray(i)?i.includes(n):i===n}function Sa(i,n){let e=wo(n);return wo(i).forEach(o=>{mi(e,o)||e.push(o)}),e}function wa(i,n){return wo(n).filter(e=>!mi(i,e))}var ui=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(n){this._rawValidators=n||[],this._composedValidatorFn=Io(this._rawValidators)}_setAsyncValidators(n){this._rawAsyncValidators=n||[],this._composedAsyncValidatorFn=Oo(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(n){this._onDestroyCallbacks.push(n)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(n=>n()),this._onDestroyCallbacks=[]}reset(n=void 0){this.control?.reset(n)}hasError(n,e){return this.control?this.control.hasError(n,e):!1}getError(n,e){return this.control?this.control.getError(n,e):null}};var zt=class extends ui{name;get formDirective(){return null}get path(){return null}};var sn=`VALID`;var ci=`INVALID`;var Vt=`PENDING`;var ln=`DISABLED`;var gt=class{};var pi=class extends gt{value;source;constructor(n,e){super(),this.value=n,this.source=e}};var dn=class extends gt{pristine;source;constructor(n,e){super(),this.pristine=n,this.source=e}};var mn=class extends gt{touched;source;constructor(n,e){super(),this.touched=n,this.source=e}};var Lt=class extends gt{status;source;constructor(n,e){super(),this.status=n,this.source=e}};var hi=class extends gt{source;constructor(n){super(),this.source=n}};var Bt=class extends gt{source;constructor(n){super(),this.source=n}};function Ha(i){return(vi(i)?i.validators:i)||null}function cc(i){return Array.isArray(i)?Io(i):i||null}function Ga(i,n){return(vi(n)?n.asyncValidators:i)||null}function dc(i){return Array.isArray(i)?Oo(i):i||null}function vi(i){return i!=null&&!Array.isArray(i)&&typeof i==`object`}function mc(i,n,e){let t=i.controls;if(!(n?Object.keys(t):t).length)throw new E(1e3,``);if(!Ua(t,e))throw new E(1001,``)}function uc(i,n,e){i._forEachChild((t,o)=>{if(e[o]===void 0)throw new E(-1002,``)})}var fi=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_hasRequired=be(!1);_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(n,e){this._assignValidators(n),this._assignAsyncValidators(e)}get validator(){return this._composedValidatorFn}set validator(n){this._rawValidators=this._composedValidatorFn=n,this._updateHasRequiredValidator()}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(n){this._rawAsyncValidators=this._composedAsyncValidatorFn=n}get parent(){return this._parent}get status(){return zt$1(this.statusReactive)}set status(n){zt$1(()=>this.statusReactive.set(n))}_status=Sr(()=>this.statusReactive());statusReactive=be(void 0);get valid(){return this.status===sn}get invalid(){return this.status===ci}get pending(){return this.status===Vt}get disabled(){return this.status===ln}get enabled(){return this.status!==ln}errors;get pristine(){return zt$1(this.pristineReactive)}set pristine(n){zt$1(()=>this.pristineReactive.set(n))}_pristine=Sr(()=>this.pristineReactive());pristineReactive=be(!0);get dirty(){return!this.pristine}get touched(){return zt$1(this.touchedReactive)}set touched(n){zt$1(()=>this.touchedReactive.set(n))}_touched=Sr(()=>this.touchedReactive());touchedReactive=be(!1);get untouched(){return!this.touched}_events=new B;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:`change`}setValidators(n){this._assignValidators(n)}setAsyncValidators(n){this._assignAsyncValidators(n)}addValidators(n){this.setValidators(Sa(n,this._rawValidators))}addAsyncValidators(n){this.setAsyncValidators(Sa(n,this._rawAsyncValidators))}removeValidators(n){this.setValidators(wa(n,this._rawValidators))}removeAsyncValidators(n){this.setAsyncValidators(wa(n,this._rawAsyncValidators))}hasValidator(n){return mi(this._rawValidators,n)}hasAsyncValidator(n){return mi(this._rawAsyncValidators,n)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(n={}){let e=this.touched===!1;this.touched=!0;let t=n.sourceControl??this;n.onlySelf||this._parent?.markAsTouched(R(y({},n),{sourceControl:t})),e&&n.emitEvent!==!1&&this._events.next(new mn(!0,t))}markAllAsDirty(n={}){this.markAsDirty({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsDirty(n))}markAllAsTouched(n={}){this.markAsTouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsTouched(n))}markAsUntouched(n={}){let e=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let t=n.sourceControl??this;this._forEachChild(o=>{o.markAsUntouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:t})}),n.onlySelf||this._parent?._updateTouched(n,t),e&&n.emitEvent!==!1&&this._events.next(new mn(!1,t))}markAsDirty(n={}){let e=this.pristine===!0;this.pristine=!1;let t=n.sourceControl??this;n.onlySelf||this._parent?.markAsDirty(R(y({},n),{sourceControl:t})),e&&n.emitEvent!==!1&&this._events.next(new dn(!1,t))}markAsPristine(n={}){let e=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let t=n.sourceControl??this;this._forEachChild(o=>{o.markAsPristine({onlySelf:!0,emitEvent:n.emitEvent})}),n.onlySelf||this._parent?._updatePristine(n,t),e&&n.emitEvent!==!1&&this._events.next(new dn(!0,t))}markAsPending(n={}){this.status=Vt;let e=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new Lt(this.status,e)),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.markAsPending(R(y({},n),{sourceControl:e}))}disable(n={}){let e=this._parentMarkedDirty(n.onlySelf);this.status=ln,this.errors=null,this._forEachChild(o=>{o.disable(R(y({},n),{onlySelf:!0}))}),this._updateValue();let t=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new pi(this.value,t)),this._events.next(new Lt(this.status,t)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(R(y({},n),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(o=>o(!0))}enable(n={}){let e=this._parentMarkedDirty(n.onlySelf);this.status=sn,this._forEachChild(t=>{t.enable(R(y({},n),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent}),this._updateAncestors(R(y({},n),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(t=>t(!1))}_updateAncestors(n,e){n.onlySelf||(this._parent?.updateValueAndValidity(n),n.skipPristineCheck||this._parent?._updatePristine({},e),this._parent?._updateTouched({},e))}setParent(n){this._parent=n}getRawValue(){return this.value}updateValueAndValidity(n={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let t=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===sn||this.status===Vt)&&this._runAsyncValidator(t,n.emitEvent)}let e=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new pi(this.value,e)),this._events.next(new Lt(this.status,e)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.updateValueAndValidity(R(y({},n),{sourceControl:e}))}_updateTreeValidity(n={emitEvent:!0}){this._forEachChild(e=>e._updateTreeValidity(n)),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?ln:sn}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(n,e){if(this.asyncValidator){this.status=Vt,this._hasOwnPendingAsyncValidator={emitEvent:e!==!1,shouldHaveEmitted:n!==!1};let t=Ta(this.asyncValidator(this));this._asyncValidationSubscription=t.subscribe(o=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(o,{emitEvent:e,shouldHaveEmitted:n})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let n=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,n}return!1}setErrors(n,e={}){this.errors=n,this._updateControlsErrors(e.emitEvent!==!1,this,e.shouldHaveEmitted)}get(n){let e=n;return e==null||(Array.isArray(e)||(e=e.split(`.`)),e.length===0)?null:e.reduce((t,o)=>t&&t._find(o),this)}getError(n,e){let t=e?this.get(e):this;return t?.errors?t.errors[n]:null}hasError(n,e){return!!this.getError(n,e)}get root(){let n=this;for(;n._parent;)n=n._parent;return n}_updateControlsErrors(n,e,t){this.status=this._calculateStatus(),n&&this.statusChanges.emit(this.status),(n||t)&&this._events.next(new Lt(this.status,e)),this._parent&&this._parent._updateControlsErrors(n,e,t)}_initObservables(){this.valueChanges=new Le,this.statusChanges=new Le}_calculateStatus(){return this._allControlsDisabled()?ln:this.errors?ci:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(Vt)?Vt:this._anyControlsHaveStatus(ci)?ci:sn}_anyControlsHaveStatus(n){return this._anyControls(e=>e.status===n)}_anyControlsDirty(){return this._anyControls(n=>n.dirty)}_anyControlsTouched(){return this._anyControls(n=>n.touched)}_updatePristine(n,e){let t=!this._anyControlsDirty(),o=this.pristine!==t;this.pristine=t,n.onlySelf||this._parent?._updatePristine(n,e),o&&this._events.next(new dn(this.pristine,e))}_updateTouched(n={},e){this.touched=this._anyControlsTouched(),this._events.next(new mn(this.touched,e)),n.onlySelf||this._parent?._updateTouched(n,e)}_onDisabledChange=[];_registerOnCollectionChange(n){this._onCollectionChange=n}_setUpdateStrategy(n){vi(n)&&n.updateOn!=null&&(this._updateOn=n.updateOn)}_parentMarkedDirty(n){return!n&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(n){return null}_assignValidators(n){this._rawValidators=Array.isArray(n)?n.slice():n,this._composedValidatorFn=cc(this._rawValidators),this._updateHasRequiredValidator()}_assignAsyncValidators(n){this._rawAsyncValidators=Array.isArray(n)?n.slice():n,this._composedAsyncValidatorFn=dc(this._rawAsyncValidators)}_updateHasRequiredValidator(){zt$1(()=>this._hasRequired.set(this.hasValidator(St.required)))}};function Ua(i,n){return Object.hasOwn(i,n)}function pc(i){return i.tagName===`INPUT`||i.tagName===`SELECT`||i.tagName===`TEXTAREA`}function hc(i,n,e,t){switch(e){case`name`:i.setAttribute(n,e,t);break;case`disabled`:case`readonly`:case`required`:t?i.setAttribute(n,e,``):i.removeAttribute(n,e);break;case`max`:case`min`:case`minLength`:case`maxLength`:t!==void 0?i.setAttribute(n,e,t.toString()):i.removeAttribute(n,e)}}var Eo=class{kind;context;control;message;constructor({kind:n,context:e,control:t}){this.kind=n,this.context=e,this.control=t}};var fc=(()=>{class i{_validator=di;_onChange;_enabled;ngOnChanges(e){if(this.inputName in e){let t=this.normalizeInput(e[this.inputName].currentValue);this._enabled=this.enabled(t),this._validator=this._enabled?this.createValidator(t):di,this._onChange?.()}}validate(e){return this._validator(e)}registerOnValidatorChange(e){this._onChange=e}enabled(e){return e!=null}static ɵfac=function(t){return new(t||i)};static ɵdir=Tr({type:i,features:[Ao$1]})}return i})();var bc={provide:un,useExisting:$i$1(()=>Wa),multi:!0};var Wa=(()=>{class i extends fc{required;inputName=`required`;normalizeInput=Jm;createValidator=e=>Ra;enabled(e){return e}static ɵfac=(()=>{let e;return function(o){return(e||(e=xo(i)))(o||i)}})();static ɵdir=Tr({type:i,selectors:[[``,`required`,``,`formControlName`,``,3,`type`,`checkbox`],[``,`required`,``,`formControl`,``,3,`type`,`checkbox`],[``,`required`,``,`ngModel`,``,3,`type`,`checkbox`]],hostVars:1,hostBindings:function(t,o){t&2&&Po$1(`required`,o._enabled?``:null)},inputs:{required:`required`},standalone:!1,features:[$m([bc]),fm]})}return i})();var $a=new m(``,{factory:()=>gc});var gc=`always`;function Ea(i,n,e=!0){let t=()=>{};n?.valueAccessor?.registerOnChange(t),n?.valueAccessor?.registerOnTouched(t),gi(i,n),i&&(n._invokeOnDestroyCallbacks(),i._registerOnCollectionChange(()=>{}))}function bi(i,n){i.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(n)})}function qa(i,n){let e=Ba(i);n.validator!==null?i.setValidators(Ca(e,n.validator)):typeof e==`function`&&i.setValidators([e]);let t=ja(i);n.asyncValidator!==null?i.setAsyncValidators(Ca(t,n.asyncValidator)):typeof t==`function`&&i.setAsyncValidators([t]);let o=()=>i.updateValueAndValidity();bi(n._rawValidators,o),bi(n._rawAsyncValidators,o)}function gi(i,n){let e=!1;if(i!==null){if(n.validator!==null){let o=Ba(i);if(Array.isArray(o)&&o.length>0){let r=o.filter(a=>a!==n.validator);r.length!==o.length&&(e=!0,i.setValidators(r))}}if(n.asyncValidator!==null){let o=ja(i);if(Array.isArray(o)&&o.length>0){let r=o.filter(a=>a!==n.asyncValidator);r.length!==o.length&&(e=!0,i.setAsyncValidators(r))}}}let t=()=>{};return bi(n._rawValidators,t),bi(n._rawAsyncValidators,t),e}function Xa(i,n){qa(i,n)}function _c(i,n){return gi(i,n)}function vc(i){return Object.getPrototypeOf(i.constructor)===Yl}function Ka(i,n){i._syncPendingControls(),n.forEach(e=>{let t=e.control;t.updateOn===`submit`&&t._pendingChange&&(e.viewToModelUpdate(t._pendingValue),t._pendingChange=!1)})}function yc(i,n){if(!n)return null;let e,t,o;return n.forEach(r=>{r.constructor===Ia?e=r:vc(r)?t=r:o=r}),o||t||e||null}function xc(i,n){let e=i.indexOf(n);e>-1&&i.splice(e,1)}var jt=class extends ui{_parent=null;name=null;valueAccessor=null;isCustomControlBased=!1;userOnReset;resetSubscription;set onReset(n){this.userOnReset=n,this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.control&&(this.resetSubscription=this.control.events.subscribe(e=>{e instanceof Bt&&this.control&&this.userOnReset?.(this.control.value)}),this.subscription?.add(this.resetSubscription))}isNativeFormElement=!1;rawValueAccessors;_selectedValueAccessor=null;get selectedValueAccessor(){return this._selectedValueAccessor??=yc(this,this.rawValueAccessors)}parseErrorsValidator=null;renderer;injector;requiredValidatorViaDi;subscription;customControlBindings=null;constructor(n,e,t){super(),this.injector=n,this.renderer=e,this.rawValueAccessors=t,this.injector?.get(J)?.onDestroy(()=>{this.removeParseErrorsValidator(this.control),this.subscription?.unsubscribe()})}setupCustomControl(){this.subscription?.unsubscribe();let n=this.injector?.get(oa$1);if(!this.control||!n)return;let e=n.markForCheck.bind(n);this.subscription=new K,this.subscription.add(this.control.valueChanges.subscribe(e)),this.subscription.add(this.control.statusChanges.subscribe(e)),this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.userOnReset&&(this.resetSubscription=this.control.events.subscribe(t=>{t instanceof Bt&&this.control&&this.userOnReset?.(this.control.value)}),this.subscription.add(this.resetSubscription)),this.parseErrorsValidator&&this.control.addValidators(this.parseErrorsValidator)}ngControlCreate(n){!n.nativeElement.hasAttribute?.(`ngNoCva`)&&(this.rawValueAccessors&&this.rawValueAccessors.length>0||this.valueAccessor!==null)||!n.customControl||(this.isCustomControlBased=!0,n.listenToCustomControlModel(o=>{this.control?.markAsDirty(),this.control?.setValue(o,{emitModelToViewChange:!1}),this.viewToModelUpdate(o)}),n.listenToCustomControlOutput(`touch`,()=>{this.control?.markAsTouched()}),this.customControlBindings={},this.isNativeFormElement=pc(n.nativeElement),this.requiredValidatorViaDi=this._rawValidators.find(o=>o instanceof Wa))}ngControlUpdate(n,e){if(!this.isCustomControlBased)return;let t=this.control,o=this.customControlBindings;Object.is(o.value,t.value)||(o.value=t.value,n.setCustomControlModelInput(t.value)),this.bindControlProperty(n,o,`touched`,t.touched),this.bindControlProperty(n,o,`dirty`,t.dirty),this.bindControlProperty(n,o,`valid`,t.valid),this.bindControlProperty(n,o,`invalid`,t.invalid),this.bindControlProperty(n,o,`pending`,t.pending),this.bindControlProperty(n,o,`disabled`,t.disabled),this.shouldBindRequired&&this.bindControlProperty(n,o,`required`,this.isRequired);let r=t.errors;if(o.errors!==r){o.errors=r;let a=this._convertErrors(r);n.setInputOnDirectives(`errors`,a)}}get isRequired(){return(this.requiredValidatorViaDi?._enabled||this.control?._hasRequired())??!1}get shouldBindRequired(){return!0}bindControlProperty(n,e,t,o){if(e[t]===o)return;e[t]=o;let r=n.setInputOnDirectives(t,o);this.isNativeFormElement&&!r&&(t===`disabled`||t===`required`)&&this.renderer&&hc(this.renderer,n.nativeElement,t,o)}_convertErrors(n){if(n===null)return[];let e=this.control;return Object.entries(n).map(([t,o])=>new Eo({context:o,kind:t,control:e}))}setParseErrorSource(n){if(n===void 0)return;let e=null,t=Sr(()=>{let o=n();return o.length===0?null:o.reduce((r,a)=>(r[a.kind]=a,r),{})});this.parseErrorsValidator=(()=>e).bind(this),Do$1(()=>{e=t(),this.control?.updateValueAndValidity({emitEvent:!1})},{injector:this.injector})}removeParseErrorsValidator(n){this.parseErrorsValidator&&(n?.removeValidators(this.parseErrorsValidator),n?.updateValueAndValidity({emitEvent:!1}))}};var _i=class extends fi{constructor(n,e,t){super(Ha(e),Ga(t,e)),this.controls=n,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(n,e){return this._find(n)||(this.controls[n]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(n,e,t={}){this.registerControl(n,e),this.updateValueAndValidity({emitEvent:t.emitEvent}),this._onCollectionChange()}removeControl(n,e={}){let t=this._find(n);t&&t._registerOnCollectionChange(()=>{}),delete this.controls[n],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}setControl(n,e,t={}){let o=this._find(n);o&&o._registerOnCollectionChange(()=>{}),delete this.controls[n],e&&this.registerControl(n,e),this.updateValueAndValidity({emitEvent:t.emitEvent}),this._onCollectionChange()}contains(n){return this._find(n)?.enabled===!0}setValue(n,e={}){zt$1(()=>{uc(this,!0,n),Object.keys(n).forEach(t=>{mc(this,!0,t),this.controls[t].setValue(n[t],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)})}patchValue(n,e={}){n!=null&&(Object.keys(n).forEach(t=>{let o=this._find(t);o&&o.patchValue(n[t],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(n={},e={}){this._forEachChild((t,o)=>{t.reset(n?n[o]:null,R(y({},e),{onlySelf:!0}))}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==!1&&this._events.next(new Bt(this))}getRawValue(){return this._reduceChildren({},(n,e,t)=>(n[t]=e.getRawValue(),n))}_syncPendingControls(){let n=this._reduceChildren(!1,(e,t)=>t._syncPendingControls()?!0:e);return n&&this.updateValueAndValidity({onlySelf:!0}),n}_forEachChild(n){Object.keys(this.controls).forEach(e=>{let t=this.controls[e];t&&n(t,e)})}_setUpControls(){this._forEachChild(n=>{n.setParent(this),n._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(n){for(let[e,t]of Object.entries(this.controls))if(this.contains(e)&&n(t))return!0;return!1}_reduceValue(){return this._reduceChildren({},(e,t,o)=>((t.enabled||this.disabled)&&(e[o]=t.value),e))}_reduceChildren(n,e){let t=n;return this._forEachChild((o,r)=>{t=e(t,o,r)}),t}_allControlsDisabled(){for(let n of Object.keys(this.controls))if(this.controls[n].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(n){return Ua(this.controls,n)?this.controls[n]:null}};var kc={provide:zt,useExisting:$i$1(()=>pn)};var cn=Promise.resolve();var pn=(()=>{class i extends zt{callSetDisabledState;get submitted(){return zt$1(this.submittedReactive)}_submitted=Sr(()=>this.submittedReactive());submittedReactive=be(!1);_directives=new Set;form;ngSubmit=new Le;options;constructor(e,t,o){super(),this.callSetDisabledState=o,this.form=new _i({},Io(e),Oo(t))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(e){cn.then(()=>{e.control=this._findContainer(e.path).registerControl(e.name,e.control),e._setupWithForm(this.callSetDisabledState),e.control.updateValueAndValidity({emitEvent:!1}),this._directives.add(e)})}getControl(e){return this.form.get(e.path)}removeControl(e){cn.then(()=>{this._findContainer(e.path)?.removeControl(e.name),this._directives.delete(e)})}addFormGroup(e){cn.then(()=>{let t=this._findContainer(e.path),o=new _i({});Xa(o,e),t.registerControl(e.name,o),o.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(e){cn.then(()=>{this._findContainer(e.path)?.removeControl?.(e.name)})}getFormGroup(e){return this.form.get(e.path)}updateModel(e,t){cn.then(()=>{this.form.get(e.path).setValue(t)})}setValue(e){this.control.setValue(e)}onSubmit(e){return this.submittedReactive.set(!0),Ka(this.form,this._directives),this.ngSubmit.emit(e),this.form._events.next(new hi(this.control)),e?.target?.method===`dialog`}onReset(){this.resetForm()}resetForm(e=void 0){this.form.reset(e),this.submittedReactive.set(!1)}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn)}_findContainer(e){return e.pop(),e.length?this.form.get(e):this.form}static ɵfac=function(t){return new(t||i)(Rn$1(un,10),Rn$1(Oa,10),Rn$1($a,8))};static ɵdir=Tr({type:i,selectors:[[`form`,3,`ngNoForm`,``,3,`formGroup`,``,3,`formArray`,``],[`ng-form`],[``,`ngForm`,``]],hostBindings:function(t,o){t&1&&Cm(`submit`,function(a){return o.onSubmit(a)})(`reset`,function(){return o.onReset()})},inputs:{options:[0,`ngFormOptions`,`options`]},outputs:{ngSubmit:`ngSubmit`},exportAs:[`ngForm`],standalone:!1,features:[$m([kc]),fm]})}return i})();function Da(i,n){let e=i.indexOf(n);e>-1&&i.splice(e,1)}function Ma(i){return typeof i==`object`&&i!==null&&Object.keys(i).length===2&&`value`in i&&`disabled`in i}var Cc=class extends fi{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(n=null,e,t){super(Ha(e),Ga(t,e)),this._applyFormState(n),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),vi(e)&&(e.nonNullable||e.initialValueIsDefault)&&(Ma(n)?this.defaultValue=n.value:this.defaultValue=n)}setValue(n,e={}){zt$1(()=>{this.value=this._pendingValue=n,this._onChange.length&&e.emitModelToViewChange!==!1&&this._onChange.forEach(t=>t(this.value,e.emitViewToModelChange!==!1)),this.updateValueAndValidity(e)})}patchValue(n,e={}){this.setValue(n,e)}reset(n=this.defaultValue,e={}){this._applyFormState(n),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),e.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,e?.emitEvent!==!1&&this._events.next(new Bt(this))}_updateValue(){}_anyControls(n){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(n){this._onChange.push(n)}_unregisterOnChange(n){Da(this._onChange,n)}registerOnDisabledChange(n){this._onDisabledChange.push(n)}_unregisterOnDisabledChange(n){Da(this._onDisabledChange,n)}_forEachChild(n){}_syncPendingControls(){return this.updateOn===`submit`&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(n){Ma(n)?(this.value=this._pendingValue=n.value,n.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=n}};var Sc=i=>i instanceof Cc;var wc=(()=>{class i extends zt{callSetDisabledState;get submitted(){return zt$1(this._submittedReactive)}set submitted(e){this._submittedReactive.set(e)}_submitted=Sr(()=>this._submittedReactive());_submittedReactive=be(!1);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(e,t,o){super(),this.callSetDisabledState=o,this._setValidators(e),this._setAsyncValidators(t)}ngOnChanges(e){this.onChanges(e)}ngOnDestroy(){this.onDestroy()}onChanges(e){if(!this.form)throw new E(1052,!1);Object.hasOwn(e,`form`)&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}onDestroy(){this.form&&(gi(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get path(){return[]}addControl(e){let t=this.form.get(e.path);return e._setupWithForm(t,this.callSetDisabledState),t.updateValueAndValidity({emitEvent:!1}),this.directives.push(e),t}getControl(e){return this.form.get(e.path)}removeControl(e){Ea(e.control||null,e,!1),xc(this.directives,e)}addFormGroup(e){this._setUpFormContainer(e)}removeFormGroup(e){this._cleanUpFormContainer(e)}getFormGroup(e){return this.form.get(e.path)}getFormArray(e){return this.form.get(e.path)}addFormArray(e){this._setUpFormContainer(e)}removeFormArray(e){this._cleanUpFormContainer(e)}updateModel(e,t){this.form.get(e.path).setValue(t)}onReset(){this.resetForm()}resetForm(e=void 0,t={}){this.form.reset(e,t),this._submittedReactive.set(!1)}onSubmit(e){return this.submitted=!0,Ka(this.form,this.directives),this.ngSubmit.emit(e),this.form._events.next(new hi(this.control)),e?.target?.method===`dialog`}_updateDomValue(){this.directives.forEach(e=>{let t=e.control,o=this.form.get(e.path);t!==o&&(Ea(t||null,e),Sc(o)&&e._setupWithForm(o,this.callSetDisabledState))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(e){let t=this.form.get(e.path);Xa(t,e),t.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(e){let t=this.form?.get(e.path);t&&_c(t,e)&&t.updateValueAndValidity({emitEvent:!1})}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{})}_updateValidators(){qa(this.form,this),this._oldForm&&gi(this._oldForm,this)}static ɵfac=function(t){return new(t||i)(Rn$1(un,10),Rn$1(Oa,10),Rn$1($a,8))};static ɵdir=Tr({type:i,features:[fm,Ao$1]})}return i})();var Ec={provide:zt,useExisting:$i$1(()=>hn)};var hn=(()=>{class i extends wc{form=null;ngSubmit=new Le;get control(){return this.form}static ɵfac=(()=>{let e;return function(o){return(e||(e=xo(i)))(o||i)}})();static ɵdir=Tr({type:i,selectors:[[``,`formGroup`,``]],hostBindings:function(t,o){t&1&&Cm(`submit`,function(a){return o.onSubmit(a)})(`reset`,function(){return o.onReset()})},inputs:{form:[0,`formGroup`,`form`]},outputs:{ngSubmit:`ngSubmit`},exportAs:[`ngForm`],standalone:!1,features:[$m([Ec]),fm]})}return i})();var Ya=(()=>{class i{labelPosition=`after`;static ɵfac=function(t){return new(t||i)};static ɵcmp=(function(){return On$1({type:i,selectors:[[``,`mat-internal-form-field`,``]],hostAttrs:[1,`mdc-form-field`,`mat-internal-form-field`],hostVars:2,hostBindings:function(o,r){o&2&&Xs$1(`mdc-form-field--align-end`,r.labelPosition===`before`)},inputs:{labelPosition:`labelPosition`},ngContentSelectors:[`*`],decls:1,vars:0,template:function(o,r){o&1&&(Ql$1(),Jl$1(0))},styles:[`.mat-internal-form-field {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}
.mat-internal-form-field > label, .mat-internal-form-field > .mat-internal-form-field-label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
  order: 0;
}
[dir=rtl] .mat-internal-form-field > label, [dir=rtl] .mat-internal-form-field > .mat-internal-form-field-label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
}

.mdc-form-field--align-end > label, .mdc-form-field--align-end > .mat-internal-form-field-label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
  order: -1;
}
[dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end label, [dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end .mat-internal-form-field-label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
}
`],encapsulation:2})})()}return i})();var Dc=new m(`MATERIAL_ANIMATIONS`);var Za=null;function Ro(){return h(Dc,{optional:!0})?.animationsDisabled||h(DE,{optional:!0})===`NoopAnimations`?`di-disabled`:(Za??=h(Ft).matchMedia(`(prefers-reduced-motion)`).matches,Za?`reduced-motion`:`enabled`)}function Ce(){return Ro()!==`enabled`}var Ht=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵcmp=On$1({type:i,selectors:[[`structural-styles`]],decls:0,vars:0,template:function(t,o){},styles:[`.mat-focus-indicator {
  position: relative;
}
.mat-focus-indicator::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  box-sizing: border-box;
  pointer-events: none;
  display: var(--%NS%mat-focus-indicator-display, none);
  border-width: var(--%NS%mat-focus-indicator-border-width, 3px);
  border-style: var(--%NS%mat-focus-indicator-border-style, solid);
  border-color: var(--%NS%mat-focus-indicator-border-color, transparent);
  border-radius: var(--%NS%mat-focus-indicator-border-radius, 4px);
}
.mat-focus-indicator:focus-visible::before {
  content: "";
}

@media (forced-colors: active) {
  html {
    --%NS%mat-focus-indicator-display: block;
    --%NS%mat-focus-indicator-fallback-border-style: none;
  }
}
`],encapsulation:2})}return i})();var wt;function Qa(){if(wt==null){if(typeof document!=`object`||!document||typeof Element!=`function`||!Element)return wt=!1,wt;if(document.documentElement?.style&&`scrollBehavior`in document.documentElement.style)wt=!0;else{let i=Element.prototype.scrollTo;i?wt=!/\{\s*\[native code\]\s*\}/.test(i.toString()):wt=!1}}return wt}function Ao(){return typeof __karma__<`u`&&!!__karma__||typeof jasmine<`u`&&!!jasmine||typeof jest<`u`&&!!jest||typeof Mocha<`u`&&!!Mocha}var Gt;var Ja=[`color`,`button`,`checkbox`,`date`,`datetime-local`,`email`,`file`,`hidden`,`image`,`month`,`number`,`password`,`radio`,`range`,`reset`,`search`,`submit`,`tel`,`text`,`time`,`url`,`week`];function To(){if(Gt)return Gt;if(typeof document!=`object`||!document)return Gt=new Set(Ja),Gt;let i=document.createElement(`input`);return Gt=new Set(Ja.filter(n=>(i.setAttribute(`type`,n),i.type===n))),Gt}function he(i){return i==null?``:typeof i==`string`?i:`${i}px`}function rt(i){return i!=null&&`${i}`!=`false`}var qe=(function(i){return i[i.FADING_IN=0]=`FADING_IN`,i[i.VISIBLE=1]=`VISIBLE`,i[i.FADING_OUT=2]=`FADING_OUT`,i[i.HIDDEN=3]=`HIDDEN`,i})(qe||{});var Po=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=qe.HIDDEN;constructor(n,e,t,o=!1){this._renderer=n,this.element=e,this.config=t,this._animationForciblyDisabledThroughCss=o}fadeOut(){this._renderer.fadeOutRipple(this)}};var es=Pt({passive:!0,capture:!0});var Fo=class{_events=new Map;addHandler(n,e,t,o){let r=this._events.get(e);if(r){let a=r.get(t);a?a.add(o):r.set(t,new Set([o]))}else this._events.set(e,new Map([[t,new Set([o])]])),n.runOutsideAngular(()=>{document.addEventListener(e,this._delegateEventHandler,es)})}removeHandler(n,e,t){let o=this._events.get(n);if(!o)return;let r=o.get(e);r&&(r.delete(t),r.size===0&&o.delete(e),o.size===0&&(this._events.delete(n),document.removeEventListener(n,this._delegateEventHandler,es)))}_delegateEventHandler=n=>{let e=de(n);e&&this._events.get(n.type)?.forEach((t,o)=>{(o===e||o.contains(e))&&t.forEach(r=>r.handleEvent(n))})}};var fn={enterDuration:225,exitDuration:150};var Mc=800;var ts=Pt({passive:!0,capture:!0});var ns=[`mousedown`,`touchstart`];var is=[`mouseup`,`mouseleave`,`touchend`,`touchcancel`];var Nc=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵcmp=On$1({type:i,selectors:[[`ng-component`]],hostAttrs:[`mat-ripple-style-loader`,``],decls:0,vars:0,template:function(t,o){},styles:[`.mat-ripple {
  overflow: hidden;
  position: relative;
}
.mat-ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-ripple.mat-ripple-unbounded {
  overflow: visible;
}

.mat-ripple-element {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: scale3d(0, 0, 0);
  background-color: var(--%NS%mat-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 10%, transparent));
}
@media (forced-colors: active) {
  .mat-ripple-element {
    display: none;
  }
}
.cdk-drag-preview .mat-ripple-element, .cdk-drag-placeholder .mat-ripple-element {
  display: none;
}
`],encapsulation:2})}return i})();var bn=class i{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new Fo;constructor(n,e,t,o,r){this._target=n,this._ngZone=e,this._platform=o,o.isBrowser&&(this._containerElement=me(t)),r&&r.get(DM).load(Nc)}fadeInRipple(n,e,t={}){let o=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),r=y(y({},fn),t.animation);t.centered&&(n=o.left+o.width/2,e=o.top+o.height/2);let a=t.radius||Ic(n,e,o),s=n-o.left,c=e-o.top,h=r.enterDuration,p=document.createElement(`div`);p.classList.add(`mat-ripple-element`),p.style.left=`${s-a}px`,p.style.top=`${c-a}px`,p.style.height=`${a*2}px`,p.style.width=`${a*2}px`,t.color!=null&&(p.style.backgroundColor=t.color),p.style.transitionDuration=`${h}ms`,this._containerElement.appendChild(p);let _=window.getComputedStyle(p),E=_.transitionProperty,g=_.transitionDuration,T=E===`none`||g===`0s`||g===`0s, 0s`||o.width===0&&o.height===0,j=new Po(this,p,t,T);p.style.transform=`scale3d(1, 1, 1)`,j.state=qe.FADING_IN,t.persistent||(this._mostRecentTransientRipple=j);let se=null;return!T&&(h||r.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let Mt=()=>{se&&(se.fallbackTimer=null),clearTimeout(lt),this._finishRippleTransition(j)},st=()=>this._destroyRipple(j),lt=setTimeout(st,h+100);p.addEventListener(`transitionend`,Mt),p.addEventListener(`transitioncancel`,st),se={onTransitionEnd:Mt,onTransitionCancel:st,fallbackTimer:lt}}),this._activeRipples.set(j,se),(T||!h)&&this._finishRippleTransition(j),j}fadeOutRipple(n){if(n.state===qe.FADING_OUT||n.state===qe.HIDDEN)return;let e=n.element,t=y(y({},fn),n.config.animation);e.style.transitionDuration=`${t.exitDuration}ms`,e.style.opacity=`0`,n.state=qe.FADING_OUT,(n._animationForciblyDisabledThroughCss||!t.exitDuration)&&this._finishRippleTransition(n)}fadeOutAll(){this._getActiveRipples().forEach(n=>n.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(n=>{n.config.persistent||n.fadeOut()})}setupTriggerEvents(n){let e=me(n);!this._platform.isBrowser||!e||e===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=e,ns.forEach(t=>{i._eventManager.addHandler(this._ngZone,t,e,this)}))}handleEvent(n){n.type===`mousedown`?this._onMousedown(n):n.type===`touchstart`?this._onTouchStart(n):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{is.forEach(e=>{this._triggerElement.addEventListener(e,this,ts)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(n){n.state===qe.FADING_IN?this._startFadeOutTransition(n):n.state===qe.FADING_OUT&&this._destroyRipple(n)}_startFadeOutTransition(n){let e=n===this._mostRecentTransientRipple,{persistent:t}=n.config;n.state=qe.VISIBLE,!t&&(!e||!this._isPointerDown)&&n.fadeOut()}_destroyRipple(n){let e=this._activeRipples.get(n)??null;this._activeRipples.delete(n),this._activeRipples.size||(this._containerRect=null),n===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),n.state=qe.HIDDEN,e!==null&&(n.element.removeEventListener(`transitionend`,e.onTransitionEnd),n.element.removeEventListener(`transitioncancel`,e.onTransitionCancel),e.fallbackTimer!==null&&clearTimeout(e.fallbackTimer)),n.element.remove()}_onMousedown(n){let e=yt(n),t=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+Mc;!this._target.rippleDisabled&&!e&&!t&&(this._isPointerDown=!0,this.fadeInRipple(n.clientX,n.clientY,this._target.rippleConfig))}_onTouchStart(n){if(!this._target.rippleDisabled&&!xt(n)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let e=n.changedTouches;if(e)for(let t=0;t<e.length;t++)this.fadeInRipple(e[t].clientX,e[t].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(n=>{let e=n.state===qe.VISIBLE||n.config.terminateOnPointerUp&&n.state===qe.FADING_IN;!n.config.persistent&&e&&n.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let n=this._triggerElement;n&&(ns.forEach(e=>i._eventManager.removeHandler(e,n,this)),this._pointerUpEventsRegistered&&(is.forEach(e=>n.removeEventListener(e,this,ts)),this._pointerUpEventsRegistered=!1))}};function Ic(i,n,e){let t=Math.max(Math.abs(i-e.left),Math.abs(i-e.right)),o=Math.max(Math.abs(n-e.top),Math.abs(n-e.bottom));return Math.sqrt(t*t+o*o)}var Vo=new m(`mat-ripple-global-options`);var yi=(()=>{class i{_elementRef=h(et);_animationsDisabled=Ce();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(e){e&&this.fadeOutAllNonPersistent(),this._disabled=e,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(e){this._trigger=e,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let e=h(ee$1),t=h(ee),o=h(Vo,{optional:!0}),r=h(G);this._globalOptions=o||{},this._rippleRenderer=new bn(this,e,this._elementRef,t,r)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:y(y(y({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(e,t=0,o){return typeof e==`number`?this._rippleRenderer.fadeInRipple(e,t,y(y({},this.rippleConfig),o)):this._rippleRenderer.fadeInRipple(0,0,y(y({},this.rippleConfig),e))}static ɵfac=function(t){return new(t||i)};static ɵdir=Tr({type:i,selectors:[[``,`mat-ripple`,``],[``,`matRipple`,``]],hostAttrs:[1,`mat-ripple`],hostVars:2,hostBindings:function(t,o){t&2&&Xs$1(`mat-ripple-unbounded`,o.unbounded)},inputs:{color:[0,`matRippleColor`,`color`],unbounded:[0,`matRippleUnbounded`,`unbounded`],centered:[0,`matRippleCentered`,`centered`],radius:[0,`matRippleRadius`,`radius`],animation:[0,`matRippleAnimation`,`animation`],disabled:[0,`matRippleDisabled`,`disabled`],trigger:[0,`matRippleTrigger`,`trigger`]},exportAs:[`matRipple`]})}return i})();var Lo={color:`accent`,clickAction:`check-indeterminate`,disabledInteractive:!1};var Oc=new m(`mat-checkbox-default-options`,{providedIn:`root`,factory:()=>Lo});var Ee=(function(i){return i[i.Init=0]=`Init`,i[i.Checked=1]=`Checked`,i[i.Unchecked=2]=`Unchecked`,i[i.Indeterminate=3]=`Indeterminate`,i})(Ee||{});var zo=class{source;checked};var Bo=(()=>{class i{_elementRef=h(et);_changeDetectorRef=h(oa$1);_ngZone=h(ee$1);_animationsDisabled=Ce();_options=h(Oc,{optional:!0});focus(){this._inputElement.nativeElement.focus()}_createChangeEvent(e){let t=new zo;return t.source=this,t.checked=e,t}_getAnimationTargetElement(){return this._inputElement?.nativeElement}_animationClasses={uncheckedToChecked:`mdc-checkbox--anim-unchecked-checked`,uncheckedToIndeterminate:`mdc-checkbox--anim-unchecked-indeterminate`,checkedToUnchecked:`mdc-checkbox--anim-checked-unchecked`,checkedToIndeterminate:`mdc-checkbox--anim-checked-indeterminate`,indeterminateToChecked:`mdc-checkbox--anim-indeterminate-checked`,indeterminateToUnchecked:`mdc-checkbox--anim-indeterminate-unchecked`};ariaLabel=``;ariaLabelledby=null;ariaDescribedby;ariaExpanded;ariaControls;ariaOwns;_uniqueId;id;get inputId(){return`${this.id||this._uniqueId}-input`}required=!1;labelPosition=`after`;name=null;change=new Le;indeterminateChange=new Le;value;disableRipple=!1;_inputElement;tabIndex;color;disabledInteractive;_onTouched=()=>{};_currentAnimationClass=``;_currentCheckState=Ee.Init;_controlValueAccessorChangeFn=()=>{};_validatorChangeFn=()=>{};constructor(){h(DM).load(Ht);let e=h(new ra$1(`tabindex`),{optional:!0});this._options=this._options||Lo,this.color=this._options.color||Lo.color,this.tabIndex=e==null?0:parseInt(e)||0,this.id=this._uniqueId=h(ye).getId(`mat-mdc-checkbox-`),this.disabledInteractive=this._options?.disabledInteractive??!1}ngOnChanges(e){e.required&&this._validatorChangeFn()}ngAfterViewInit(){this._syncIndeterminate(this.indeterminate)}get checked(){return this._checked}set checked(e){e!=this.checked&&(this._checked=e,this._changeDetectorRef.markForCheck())}_checked=!1;get disabled(){return this._disabled}set disabled(e){e!==this.disabled&&(this._disabled=e,this._changeDetectorRef.markForCheck())}_disabled=!1;get indeterminate(){return this._indeterminate()}set indeterminate(e){let t=e!=this._indeterminate();this._indeterminate.set(e),t&&(e?this._transitionCheckState(Ee.Indeterminate):this._transitionCheckState(this.checked?Ee.Checked:Ee.Unchecked),this.indeterminateChange.emit(e)),this._syncIndeterminate(e)}_indeterminate=be(!1);_isRippleDisabled(){return this.disableRipple||this.disabled}_onLabelTextChange(){this._changeDetectorRef.detectChanges()}writeValue(e){this.checked=!!e}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}validate(e){return this.required&&e.value!==!0?{required:!0}:null}registerOnValidatorChange(e){this._validatorChangeFn=e}_transitionCheckState(e){let t=this._currentCheckState,o=this._getAnimationTargetElement();if(!(t===e||!o)&&(this._currentAnimationClass&&o.classList.remove(this._currentAnimationClass),this._currentAnimationClass=this._getAnimationClassForCheckStateTransition(t,e),this._currentCheckState=e,this._currentAnimationClass.length>0)){o.classList.add(this._currentAnimationClass);let r=this._currentAnimationClass;this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{o.classList.remove(r)},1e3)})}}_emitChangeEvent(){this._controlValueAccessorChangeFn(this.checked),this.change.emit(this._createChangeEvent(this.checked)),this._inputElement&&(this._inputElement.nativeElement.checked=this.checked)}toggle(){this.checked=!this.checked,this._controlValueAccessorChangeFn(this.checked)}_handleInputClick(){let e=this._options?.clickAction;!this.disabled&&e!==`noop`?(this.indeterminate&&e!==`check`&&Promise.resolve().then(()=>{this._indeterminate.set(!1),this.indeterminateChange.emit(!1)}),this._checked=!this._checked,this._transitionCheckState(this._checked?Ee.Checked:Ee.Unchecked),this._emitChangeEvent()):(this.disabled&&this.disabledInteractive||!this.disabled&&e===`noop`)&&(this._inputElement.nativeElement.checked=this.checked,this._inputElement.nativeElement.indeterminate=this.indeterminate)}_onInteractionEvent(e){e.stopPropagation()}_onBlur(){Promise.resolve().then(()=>{this._onTouched(),this._changeDetectorRef.markForCheck()})}_getAnimationClassForCheckStateTransition(e,t){if(this._animationsDisabled)return``;switch(e){case Ee.Init:if(t===Ee.Checked)return this._animationClasses.uncheckedToChecked;if(t==Ee.Indeterminate)return this._checked?this._animationClasses.checkedToIndeterminate:this._animationClasses.uncheckedToIndeterminate;break;case Ee.Unchecked:return t===Ee.Checked?this._animationClasses.uncheckedToChecked:this._animationClasses.uncheckedToIndeterminate;case Ee.Checked:return t===Ee.Unchecked?this._animationClasses.checkedToUnchecked:this._animationClasses.checkedToIndeterminate;case Ee.Indeterminate:return t===Ee.Checked?this._animationClasses.indeterminateToChecked:this._animationClasses.indeterminateToUnchecked}return``}_syncIndeterminate(e){let t=this._inputElement;t&&(t.nativeElement.indeterminate=e)}_onInputClick(){this._handleInputClick()}_preventBubblingFromLabel(e){e.target&&this._inputElement&&e.target!==this._inputElement.nativeElement&&e.stopPropagation()}static ɵfac=function(t){return new(t||i)};static ɵcmp=(function(){let e=[`input`];return On$1({type:i,selectors:[[`mat-checkbox`]],viewQuery:function(r,a){if(r&1&&_m(e,5),r&2){let s;NC(s=AC())&&(a._inputElement=s.first)}},hostAttrs:[1,`mat-mdc-checkbox`],hostVars:16,hostBindings:function(r,a){r&2&&(Js$1(`id`,a.id),Po$1(`tabindex`,null)(`aria-label`,null)(`aria-labelledby`,null),Xl$1(a.color?`mat-`+a.color:`mat-accent`),Xs$1(`_mat-animation-noopable`,a._animationsDisabled)(`mdc-checkbox--disabled`,a.disabled)(`mat-mdc-checkbox-disabled`,a.disabled)(`mat-mdc-checkbox-checked`,a.checked)(`mat-mdc-checkbox-disabled-interactive`,a.disabledInteractive))},inputs:{ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],ariaDescribedby:[0,`aria-describedby`,`ariaDescribedby`],ariaExpanded:[2,`aria-expanded`,`ariaExpanded`,Jm],ariaControls:[0,`aria-controls`,`ariaControls`],ariaOwns:[0,`aria-owns`,`ariaOwns`],id:`id`,required:[2,`required`,`required`,Jm],labelPosition:`labelPosition`,name:`name`,value:`value`,disableRipple:[2,`disableRipple`,`disableRipple`,Jm],tabIndex:[2,`tabIndex`,`tabIndex`,o=>o==null?void 0:i2(o)],color:`color`,disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,Jm],checked:[2,`checked`,`checked`,Jm],disabled:[2,`disabled`,`disabled`,Jm],indeterminate:[2,`indeterminate`,`indeterminate`,Jm]},outputs:{change:`change`,indeterminateChange:`indeterminateChange`},exportAs:[`matCheckbox`],features:[$m([{provide:Do,useExisting:$i$1(()=>i),multi:!0},{provide:un,useExisting:i,multi:!0}]),Ao$1],ngContentSelectors:[`*`],decls:15,vars:23,consts:[[`checkbox`,``],[`input`,``],[`label`,``],[`mat-internal-form-field`,``,3,`click`,`labelPosition`,`for`],[1,`mdc-checkbox`],[`aria-hidden`,`true`,1,`mat-mdc-checkbox-touch-target`],[`type`,`checkbox`,1,`mdc-checkbox__native-control`,3,`blur`,`click`,`change`,`checked`,`indeterminate`,`disabled`,`id`,`required`,`tabIndex`],[`aria-hidden`,`true`,1,`mdc-checkbox__ripple`],[`aria-hidden`,`true`,1,`mdc-checkbox__background`],[`focusable`,`false`,`viewBox`,`0 0 24 24`,1,`mdc-checkbox__checkmark`],[`fill`,`none`,`d`,`M1.73,12.91 8.1,19.28 22.79,4.59`,1,`mdc-checkbox__checkmark-path`],[1,`mdc-checkbox__mixedmark`],[`mat-ripple`,``,`aria-hidden`,`true`,1,`mat-mdc-checkbox-ripple`,`mat-focus-indicator`,3,`matRippleTrigger`,`matRippleDisabled`,`matRippleCentered`],[1,`mat-internal-form-field-label`,`mdc-label`]],template:function(r,a){if(r&1&&(Ql$1(),ks$1(0,`label`,3),Cm(`click`,function(c){return a._preventBubblingFromLabel(c)}),ks$1(1,`span`,4,0),Dm(3,`span`,5),ks$1(4,`input`,6,1),Cm(`blur`,function(){return a._onBlur()})(`click`,function(){return a._onInputClick()})(`change`,function(c){return a._onInteractionEvent(c)}),Yl$1(),Dm(6,`span`,7),ks$1(7,`span`,8),Op(),ks$1(8,`svg`,9),Dm(9,`path`,10),Yl$1(),Lp(),Dm(10,`span`,11),Yl$1(),Dm(11,`span`,12),Yl$1(),ks$1(12,`span`,13,2),Jl$1(14),Yl$1()()),r&2){let s=RC(2);vm(`labelPosition`,a.labelPosition)(`for`,a.inputId),Sw(4),Xs$1(`mdc-checkbox--selected`,a.checked),vm(`checked`,a.checked)(`indeterminate`,a.indeterminate)(`disabled`,a.disabled&&!a.disabledInteractive)(`id`,a.inputId)(`required`,a.required)(`tabIndex`,a.disabled&&!a.disabledInteractive?-1:a.tabIndex),Po$1(`aria-label`,a.ariaLabel||null)(`aria-labelledby`,a.ariaLabelledby)(`aria-describedby`,a.ariaDescribedby)(`aria-checked`,a.indeterminate?`mixed`:null)(`aria-controls`,a.ariaControls)(`aria-disabled`,a.disabled&&a.disabledInteractive?!0:null)(`aria-expanded`,a.ariaExpanded)(`aria-owns`,a.ariaOwns)(`name`,a.name)(`value`,a.value),Sw(7),vm(`matRippleTrigger`,s)(`matRippleDisabled`,a.disableRipple||a.disabled)(`matRippleCentered`,!0)}},dependencies:[yi,Ya],styles:[`.mdc-checkbox {
  display: inline-block;
  position: relative;
  flex: 0 0 18px;
  box-sizing: content-box;
  width: 18px;
  height: 18px;
  line-height: 0;
  white-space: nowrap;
  cursor: pointer;
  vertical-align: bottom;
  padding: calc((var(--%NS%mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  margin: calc((var(--%NS%mat-checkbox-state-layer-size, 40px) - var(--%NS%mat-checkbox-state-layer-size, 40px)) / 2);
}
.mdc-checkbox:hover > .mdc-checkbox__ripple {
  opacity: var(--%NS%mat-checkbox-unselected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
  background-color: var(--%NS%mat-checkbox-unselected-hover-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mdc-checkbox:hover > .mat-mdc-checkbox-ripple > .mat-ripple-element {
  background-color: var(--%NS%mat-checkbox-unselected-hover-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control:focus + .mdc-checkbox__ripple {
  opacity: var(--%NS%mat-checkbox-unselected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
  background-color: var(--%NS%mat-checkbox-unselected-focus-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control:focus ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--%NS%mat-checkbox-unselected-focus-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mdc-checkbox:active > .mdc-checkbox__native-control + .mdc-checkbox__ripple {
  opacity: var(--%NS%mat-checkbox-unselected-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
  background-color: var(--%NS%mat-checkbox-unselected-pressed-state-layer-color, var(--%NS%mat-sys-primary));
}
.mdc-checkbox:active > .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--%NS%mat-checkbox-unselected-pressed-state-layer-color, var(--%NS%mat-sys-primary));
}
.mdc-checkbox:hover > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {
  opacity: var(--%NS%mat-checkbox-selected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
  background-color: var(--%NS%mat-checkbox-selected-hover-state-layer-color, var(--%NS%mat-sys-primary));
}
.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--%NS%mat-checkbox-selected-hover-state-layer-color, var(--%NS%mat-sys-primary));
}
.mdc-checkbox .mdc-checkbox__native-control:focus:checked + .mdc-checkbox__ripple {
  opacity: var(--%NS%mat-checkbox-selected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
  background-color: var(--%NS%mat-checkbox-selected-focus-state-layer-color, var(--%NS%mat-sys-primary));
}
.mdc-checkbox .mdc-checkbox__native-control:focus:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--%NS%mat-checkbox-selected-focus-state-layer-color, var(--%NS%mat-sys-primary));
}
.mdc-checkbox:active > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {
  opacity: var(--%NS%mat-checkbox-selected-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
  background-color: var(--%NS%mat-checkbox-selected-pressed-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mdc-checkbox:active > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--%NS%mat-checkbox-selected-pressed-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control + .mdc-checkbox__ripple {
  background-color: var(--%NS%mat-checkbox-unselected-hover-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control {
  position: absolute;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
  z-index: 1;
  width: var(--%NS%mat-checkbox-state-layer-size, 40px);
  height: var(--%NS%mat-checkbox-state-layer-size, 40px);
  top: calc((var(--%NS%mat-checkbox-state-layer-size, 40px) - var(--%NS%mat-checkbox-state-layer-size, 40px)) / 2);
  right: calc((var(--%NS%mat-checkbox-state-layer-size, 40px) - var(--%NS%mat-checkbox-state-layer-size, 40px)) / 2);
  left: calc((var(--%NS%mat-checkbox-state-layer-size, 40px) - var(--%NS%mat-checkbox-state-layer-size, 40px)) / 2);
}

.mdc-checkbox--disabled {
  cursor: default;
  pointer-events: none;
}

.mdc-checkbox__background {
  display: inline-flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  border: 2px solid currentColor;
  border-radius: 2px;
  background-color: transparent;
  pointer-events: none;
  will-change: background-color, border-color;
  transition: background-color 90ms cubic-bezier(0.4, 0, 0.6, 1), border-color 90ms cubic-bezier(0.4, 0, 0.6, 1);
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  border-color: var(--%NS%mat-checkbox-unselected-icon-color, var(--%NS%mat-sys-on-surface-variant));
  top: calc((var(--%NS%mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  left: calc((var(--%NS%mat-checkbox-state-layer-size, 40px) - 18px) / 2);
}

.mdc-checkbox__native-control:enabled:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:enabled:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--%NS%mat-checkbox-selected-icon-color, var(--%NS%mat-sys-primary));
  background-color: var(--%NS%mat-checkbox-selected-icon-color, var(--%NS%mat-sys-primary));
}

.mdc-checkbox--disabled .mdc-checkbox__background {
  border-color: var(--%NS%mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__background {
    border-color: GrayText;
  }
}

.mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--%NS%mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}
@media (forced-colors: active) {
  .mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
  .mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
    border-color: GrayText;
  }
}

.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:checked) ~ .mdc-checkbox__background,
.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--%NS%mat-checkbox-unselected-hover-icon-color, var(--%NS%mat-sys-on-surface));
  background-color: transparent;
}

.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox:hover > .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--%NS%mat-checkbox-selected-hover-icon-color, var(--%NS%mat-sys-primary));
  background-color: var(--%NS%mat-checkbox-selected-hover-icon-color, var(--%NS%mat-sys-primary));
}

.mdc-checkbox__native-control:focus:focus:not(:checked) ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:focus:focus:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--%NS%mat-checkbox-unselected-focus-icon-color, var(--%NS%mat-sys-on-surface));
}

.mdc-checkbox__native-control:focus:focus:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:focus:focus:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--%NS%mat-checkbox-selected-focus-icon-color, var(--%NS%mat-sys-primary));
  background-color: var(--%NS%mat-checkbox-selected-focus-icon-color, var(--%NS%mat-sys-primary));
}

.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
  border-color: var(--%NS%mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
    border-color: GrayText;
  }
}
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--%NS%mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}

.mdc-checkbox__checkmark {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transition: opacity 180ms cubic-bezier(0.4, 0, 0.6, 1);
  color: var(--%NS%mat-checkbox-selected-checkmark-color, var(--%NS%mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mdc-checkbox__checkmark {
    color: CanvasText;
  }
}

.mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
  color: var(--%NS%mat-checkbox-disabled-selected-checkmark-color, var(--%NS%mat-sys-surface));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
    color: GrayText;
  }
}

.mdc-checkbox__checkmark-path {
  transition: stroke-dashoffset 180ms cubic-bezier(0.4, 0, 0.6, 1);
  stroke: currentColor;
  stroke-width: 3.12px;
  stroke-dashoffset: 29.7833385;
  stroke-dasharray: 29.7833385;
}

.mdc-checkbox__mixedmark {
  width: 100%;
  height: 0;
  transform: scaleX(0) rotate(0deg);
  border-width: 1px;
  border-style: solid;
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
  border-color: var(--%NS%mat-checkbox-selected-checkmark-color, var(--%NS%mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mdc-checkbox__mixedmark {
    margin: 0 1px;
  }
}

.mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
  border-color: var(--%NS%mat-checkbox-disabled-selected-checkmark-color, var(--%NS%mat-sys-surface));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
    border-color: GrayText;
  }
}

.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,
.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,
.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,
.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background {
  animation-duration: 180ms;
  animation-timing-function: linear;
}

.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-unchecked-checked-checkmark-path 180ms linear;
  transition: none;
}

.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-checked-unchecked-checkmark-path 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark {
  animation: mdc-checkbox-checked-indeterminate-checkmark 90ms linear;
  transition: none;
}
.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-checked-indeterminate-mixedmark 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark {
  animation: mdc-checkbox-indeterminate-checked-checkmark 500ms linear;
  transition: none;
}
.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-checked-mixedmark 500ms linear;
  transition: none;
}

.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear;
  transition: none;
}

.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path {
  stroke-dashoffset: 0;
}

.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transition: opacity 180ms cubic-bezier(0, 0, 0.2, 1), transform 180ms cubic-bezier(0, 0, 0.2, 1);
  opacity: 1;
}
.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(-45deg);
}

.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(0deg);
  opacity: 1;
}

@keyframes mdc-checkbox-unchecked-checked-checkmark-path {
  0%, 50% {
    stroke-dashoffset: 29.7833385;
  }
  50% {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark {
  0%, 68.2% {
    transform: scaleX(0);
  }
  68.2% {
    animation-timing-function: cubic-bezier(0, 0, 0, 1);
  }
  100% {
    transform: scaleX(1);
  }
}
@keyframes mdc-checkbox-checked-unchecked-checkmark-path {
  from {
    animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
    opacity: 1;
    stroke-dashoffset: 0;
  }
  to {
    opacity: 0;
    stroke-dashoffset: -29.7833385;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-checkmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(45deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-checkmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(45deg);
    opacity: 0;
  }
  to {
    transform: rotate(360deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(-45deg);
    opacity: 0;
  }
  to {
    transform: rotate(0deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(315deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark {
  0% {
    animation-timing-function: linear;
    transform: scaleX(1);
    opacity: 1;
  }
  32.8%, 100% {
    transform: scaleX(0);
    opacity: 0;
  }
}
.mat-mdc-checkbox {
  display: inline-block;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-touch-target,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__native-control,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__ripple,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-ripple::before,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-checkbox label {
  cursor: pointer;
}
.mat-mdc-checkbox .mat-internal-form-field {
  color: var(--%NS%mat-checkbox-label-text-color, var(--%NS%mat-sys-on-surface));
  font-family: var(--%NS%mat-checkbox-label-text-font, var(--%NS%mat-sys-body-medium-font));
  line-height: var(--%NS%mat-checkbox-label-text-line-height, var(--%NS%mat-sys-body-medium-line-height));
  font-size: var(--%NS%mat-checkbox-label-text-size, var(--%NS%mat-sys-body-medium-size));
  letter-spacing: var(--%NS%mat-checkbox-label-text-tracking, var(--%NS%mat-sys-body-medium-tracking));
  font-weight: var(--%NS%mat-checkbox-label-text-weight, var(--%NS%mat-sys-body-medium-weight));
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive input {
  cursor: default;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled label {
  cursor: default;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled .mat-internal-form-field-label {
  color: var(--%NS%mat-checkbox-disabled-label-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-checkbox.mat-mdc-checkbox-disabled .mat-internal-form-field-label {
    color: GrayText;
  }
}
.mat-mdc-checkbox .mat-internal-form-field-label:empty {
  display: none;
}
.mat-mdc-checkbox .mdc-checkbox__ripple {
  opacity: 0;
}

.mat-mdc-checkbox .mat-mdc-checkbox-ripple,
.mdc-checkbox__ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-checkbox .mat-mdc-checkbox-ripple:not(:empty),
.mdc-checkbox__ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-mdc-checkbox-ripple .mat-ripple-element {
  opacity: 0.1;
}

.mat-mdc-checkbox-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--%NS%mat-checkbox-touch-target-size, 48px);
  width: var(--%NS%mat-checkbox-touch-target-size, 48px);
  transform: translate(-50%, -50%);
  display: var(--%NS%mat-checkbox-touch-target-display, block);
}

.mat-mdc-checkbox .mat-mdc-checkbox-ripple::before {
  border-radius: 50%;
}

.mdc-checkbox__native-control:focus-visible ~ .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2})})()}return i})();var os=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵmod=$e$1({type:i});static ɵinj=Se({imports:[Bo,bv]})}return i})();var Ac=new m(`MAT_PROGRESS_BAR_DEFAULT_OPTIONS`);var as=(()=>{class i{_elementRef=h(et);_ngZone=h(ee$1);_changeDetectorRef=h(oa$1);_renderer=h(Dr);_cleanupTransitionEnd;constructor(){let e=Ro(),t=h(Ac,{optional:!0});this._isNoopAnimation=e===`di-disabled`,e===`reduced-motion`&&this._elementRef.nativeElement.classList.add(`mat-progress-bar-reduced-motion`),t&&(t.color&&(this.color=this._defaultColor=t.color),this.mode=t.mode||this.mode)}_isNoopAnimation;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;_defaultColor=`primary`;get value(){return this._value}set value(e){this._value=rs(e||0),this._changeDetectorRef.markForCheck()}_value=0;get bufferValue(){return this._bufferValue||0}set bufferValue(e){this._bufferValue=rs(e||0),this._changeDetectorRef.markForCheck()}_bufferValue=0;animationEnd=new Le;get mode(){return this._mode}set mode(e){this._mode=e,this._changeDetectorRef.markForCheck()}_mode=`determinate`;ngAfterViewInit(){this._ngZone.runOutsideAngular(()=>{this._cleanupTransitionEnd=this._renderer.listen(this._elementRef.nativeElement,`transitionend`,this._transitionendHandler)})}ngOnDestroy(){this._cleanupTransitionEnd?.()}_getPrimaryBarTransform(){return`scaleX(${this._isIndeterminate()?1:this.value/100})`}_getBufferBarFlexBasis(){return`${this.mode===`buffer`?this.bufferValue:100}%`}_isIndeterminate(){return this.mode===`indeterminate`||this.mode===`query`}_transitionendHandler=e=>{this.animationEnd.observers.length===0||!e.target||!e.target.classList.contains(`mdc-linear-progress__primary-bar`)||(this.mode===`determinate`||this.mode===`buffer`)&&this._ngZone.run(()=>this.animationEnd.next({value:this.value}))};static ɵfac=function(t){return new(t||i)};static ɵcmp=(function(){function e(t,o){t&1&&Qs$1(0,`div`,2)}return On$1({type:i,selectors:[[`mat-progress-bar`]],hostAttrs:[`role`,`progressbar`,`aria-valuemin`,`0`,`aria-valuemax`,`100`,`tabindex`,`-1`,1,`mat-mdc-progress-bar`,`mdc-linear-progress`],hostVars:10,hostBindings:function(o,r){o&2&&(Po$1(`aria-valuenow`,r._isIndeterminate()?null:r.value)(`mode`,r.mode),Xl$1(`mat-`+r.color),Xs$1(`_mat-animation-noopable`,r._isNoopAnimation)(`mdc-linear-progress--animation-ready`,!r._isNoopAnimation)(`mdc-linear-progress--indeterminate`,r._isIndeterminate()))},inputs:{color:`color`,value:[2,`value`,`value`,i2],bufferValue:[2,`bufferValue`,`bufferValue`,i2],mode:`mode`},outputs:{animationEnd:`animationEnd`},exportAs:[`matProgressBar`],decls:7,vars:5,consts:[[`aria-hidden`,`true`,1,`mdc-linear-progress__buffer`],[1,`mdc-linear-progress__buffer-bar`],[1,`mdc-linear-progress__buffer-dots`],[`aria-hidden`,`true`,1,`mdc-linear-progress__bar`,`mdc-linear-progress__primary-bar`],[1,`mdc-linear-progress__bar-inner`],[`aria-hidden`,`true`,1,`mdc-linear-progress__bar`,`mdc-linear-progress__secondary-bar`]],template:function(o,r){o&1&&(Zl$1(0,`div`,0),Qs$1(1,`div`,1),dC(2,e,1,0,`div`,2),Kl(),Zl$1(3,`div`,3),Qs$1(4,`span`,4),Kl(),Zl$1(5,`div`,5),Qs$1(6,`span`,4),Kl()),o&2&&(Sw(),Rm(`flex-basis`,r._getBufferBarFlexBasis()),Sw(),pC(r.mode===`buffer`?2:-1),Sw(),Rm(`transform`,r._getPrimaryBarTransform()))},styles:[`.mat-mdc-progress-bar {
  --%NS%mat-progress-bar-animation-multiplier: 1;
  display: block;
  text-align: start;
}
.mat-mdc-progress-bar[mode=query] {
  transform: scaleX(-1);
}
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-dots,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__secondary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__bar-inner.mdc-linear-progress__bar-inner {
  animation: none;
}
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-bar {
  transition: transform 1ms;
}

.mat-progress-bar-reduced-motion {
  --%NS%mat-progress-bar-animation-multiplier: 2;
}

.mdc-linear-progress {
  position: relative;
  width: 100%;
  transform: translateZ(0);
  outline: 1px solid transparent;
  overflow-x: hidden;
  transition: opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  height: max(var(--%NS%mat-progress-bar-track-height, 4px), var(--%NS%mat-progress-bar-active-indicator-height, 4px));
}
@media (forced-colors: active) {
  .mdc-linear-progress {
    outline-color: CanvasText;
  }
}

.mdc-linear-progress__bar {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 100%;
  animation: none;
  transform-origin: top left;
  transition: transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  height: var(--%NS%mat-progress-bar-active-indicator-height, 4px);
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__bar {
  transition: none;
}
[dir=rtl] .mdc-linear-progress__bar {
  right: 0;
  transform-origin: center right;
}

.mdc-linear-progress__bar-inner {
  display: inline-block;
  position: absolute;
  width: 100%;
  animation: none;
  border-top-style: solid;
  border-color: var(--%NS%mat-progress-bar-active-indicator-color, var(--%NS%mat-sys-primary));
  border-top-width: var(--%NS%mat-progress-bar-active-indicator-height, 4px);
}

.mdc-linear-progress__buffer {
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 100%;
  overflow: hidden;
  height: var(--%NS%mat-progress-bar-track-height, 4px);
  border-radius: var(--%NS%mat-progress-bar-track-shape, var(--%NS%mat-sys-corner-none));
}

.mdc-linear-progress__buffer-dots {
  background-image: radial-gradient(circle, var(--%NS%mat-progress-bar-track-color, var(--%NS%mat-sys-surface-variant)) calc(var(--%NS%mat-progress-bar-track-height, 4px) / 2), transparent 0);
  background-repeat: repeat-x;
  background-size: calc(calc(var(--%NS%mat-progress-bar-track-height, 4px) / 2) * 5);
  background-position: left;
  flex: auto;
  transform: rotate(180deg);
  animation: mdc-linear-progress-buffering calc(250ms * var(--%NS%mat-progress-bar-animation-multiplier)) infinite linear;
}
@media (forced-colors: active) {
  .mdc-linear-progress__buffer-dots {
    background-color: ButtonBorder;
  }
}
[dir=rtl] .mdc-linear-progress__buffer-dots {
  animation: mdc-linear-progress-buffering-reverse calc(250ms * var(--%NS%mat-progress-bar-animation-multiplier)) infinite linear;
  transform: rotate(0);
}

.mdc-linear-progress__buffer-bar {
  flex: 0 1 100%;
  transition: flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  background-color: var(--%NS%mat-progress-bar-track-color, var(--%NS%mat-sys-surface-variant));
}

.mdc-linear-progress__primary-bar {
  transform: scaleX(0);
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar {
  left: -145.166611%;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar {
  animation: mdc-linear-progress-primary-indeterminate-translate calc(2s * var(--%NS%mat-progress-bar-animation-multiplier)) infinite linear;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar > .mdc-linear-progress__bar-inner {
  animation: mdc-linear-progress-primary-indeterminate-scale calc(2s * var(--%NS%mat-progress-bar-animation-multiplier)) infinite linear;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar {
  animation-name: mdc-linear-progress-primary-indeterminate-translate-reverse;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar {
  right: -145.166611%;
  left: auto;
}

.mdc-linear-progress__secondary-bar {
  display: none;
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar {
  left: -54.888891%;
  display: block;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar {
  animation: mdc-linear-progress-secondary-indeterminate-translate calc(2s * var(--%NS%mat-progress-bar-animation-multiplier)) infinite linear;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar > .mdc-linear-progress__bar-inner {
  animation: mdc-linear-progress-secondary-indeterminate-scale calc(2s * var(--%NS%mat-progress-bar-animation-multiplier)) infinite linear;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar {
  animation-name: mdc-linear-progress-secondary-indeterminate-translate-reverse;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar {
  right: -54.888891%;
  left: auto;
}

@keyframes mdc-linear-progress-buffering {
  from {
    transform: rotate(180deg) translateX(calc(var(--%NS%mat-progress-bar-track-height, 4px) * -2.5));
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-translate {
  0% {
    transform: translateX(0);
  }
  20% {
    animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    transform: translateX(0);
  }
  59.15% {
    animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    transform: translateX(83.67142%);
  }
  100% {
    transform: translateX(200.611057%);
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-scale {
  0% {
    transform: scaleX(0.08);
  }
  36.65% {
    animation-timing-function: cubic-bezier(0.334731, 0.12482, 0.785844, 1);
    transform: scaleX(0.08);
  }
  69.15% {
    animation-timing-function: cubic-bezier(0.06, 0.11, 0.6, 1);
    transform: scaleX(0.661479);
  }
  100% {
    transform: scaleX(0.08);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-translate {
  0% {
    animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    transform: translateX(0);
  }
  25% {
    animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    transform: translateX(37.651913%);
  }
  48.35% {
    animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    transform: translateX(84.386165%);
  }
  100% {
    transform: translateX(160.277782%);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-scale {
  0% {
    animation-timing-function: cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);
    transform: scaleX(0.08);
  }
  19.15% {
    animation-timing-function: cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);
    transform: scaleX(0.457104);
  }
  44.15% {
    animation-timing-function: cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);
    transform: scaleX(0.72796);
  }
  100% {
    transform: scaleX(0.08);
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse {
  0% {
    transform: translateX(0);
  }
  20% {
    animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    transform: translateX(0);
  }
  59.15% {
    animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    transform: translateX(-83.67142%);
  }
  100% {
    transform: translateX(-200.611057%);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse {
  0% {
    animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    transform: translateX(0);
  }
  25% {
    animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    transform: translateX(-37.651913%);
  }
  48.35% {
    animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    transform: translateX(-84.386165%);
  }
  100% {
    transform: translateX(-160.277782%);
  }
}
@keyframes mdc-linear-progress-buffering-reverse {
  from {
    transform: translateX(-10px);
  }
}
`],encapsulation:2})})()}return i})();function rs(i,n=0,e=100){return Math.max(n,Math.min(e,i))}var ss=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵmod=$e$1({type:i});static ɵinj=Se({imports:[bv]})}return i})();var Pc=20;var _t=(()=>{class i{_ngZone=h(ee$1);_platform=h(ee);_renderer=h(Mn$1).createRenderer(null,null);_cleanupGlobalListener;_scrolled=new B;_scrolledCount=0;scrollContainers=new Map;register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let t=this.scrollContainers.get(e);t&&(t.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=Pc){return this._platform.isBrowser?new S(t=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen(`document`,`scroll`,()=>this._scrolled.next())));let o=e>0?this._scrolled.pipe(TD(e)).subscribe(t):this._scrolled.subscribe(t);return this._scrolledCount++,()=>{o.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):pe()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((e,t)=>this.deregister(t)),this._scrolled.complete()}ancestorScrolled(e,t){let o=this.getAncestorScrollContainers(e);return this.scrolled(t).pipe(We(r=>!r||o.indexOf(r)>-1))}getAncestorScrollContainers(e){let t=[];return this.scrollContainers.forEach((o,r)=>{this._targetContainsElement(r,e)&&t.push(r)}),t}_targetContainsElement(e,t){let o=me(t),r=e.getElementRef().nativeElement;do if(o==r)return!0;while(o=o.parentElement);return!1}static ɵfac=function(t){return new(t||i)};static ɵprov=he$1({token:i,factory:i.ɵfac})}return i})();var Fc=20;var Qe=(()=>{class i{_platform=h(ee);_listeners;_viewportSize=null;_change=new B;_document=h(H);constructor(){let e=h(ee$1),t=h(Mn$1).createRenderer(null,null);e.runOutsideAngular(()=>{if(this._platform.isBrowser){let o=r=>this._change.next(r);this._listeners=[t.listen(`window`,`resize`,o),t.listen(`window`,`orientationchange`,o)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(e=>e()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:t,height:o}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+o,right:e.left+t,height:o,width:t}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,t=this._getWindow(),o=e.documentElement,r=o.getBoundingClientRect();return{top:-r.top||e.body?.scrollTop||t.scrollY||o.scrollTop||0,left:-r.left||e.body?.scrollLeft||t.scrollX||o.scrollLeft||0}}change(e=Fc){return e>0?this._change.pipe(TD(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}static ɵfac=function(t){return new(t||i)};static ɵprov=he$1({token:i,factory:i.ɵfac})}return i})();var at=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵmod=$e$1({type:i});static ɵinj=Se({})}return i})();var jo=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵmod=$e$1({type:i});static ɵinj=Se({imports:[bv,at,bv,at]})}return i})();var gn=class{_attachedHost=null;attach(n){return this._attachedHost=n,n.attach(this)}detach(){let n=this._attachedHost;n!=null&&(this._attachedHost=null,n.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(n){this._attachedHost=n}};var _n=class extends gn{component;viewContainerRef;injector;projectableNodes;bindings;directives;constructor(n,e,t,o,r,a){super(),this.component=n,this.viewContainerRef=e,this.injector=t,this.projectableNodes=o,this.bindings=r||null,this.directives=a||null}};var vn=class extends gn{templateRef;viewContainerRef;context;injector;constructor(n,e,t,o){super(),this.templateRef=n,this.viewContainerRef=e,this.context=t,this.injector=o}get origin(){return this.templateRef.elementRef}attach(n,e=this.context){return this.context=e,super.attach(n)}detach(){return this.context=void 0,super.detach()}};var Ho=class extends gn{element;constructor(n){super(),this.element=n instanceof et?n.nativeElement:n}};var Go=class{_attachedPortal=null;_disposeFn=null;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(n){if(n instanceof _n)return this._attachedPortal=n,this.attachComponentPortal(n);if(n instanceof vn)return this._attachedPortal=n,this.attachTemplatePortal(n);if(this.attachDomPortal&&n instanceof Ho)return this._attachedPortal=n,this.attachDomPortal(n)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(n){this._disposeFn=n}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}};var xi=class extends Go{outletElement;_appRef;_defaultInjector;constructor(n,e,t){super(),this.outletElement=n,this._appRef=e,this._defaultInjector=t}attachComponentPortal(n){let e;if(n.viewContainerRef){let t=n.injector||n.viewContainerRef.injector,o=t.get(Nn$1,null,{optional:!0})||void 0;e=n.viewContainerRef.createComponent(n.component,{index:n.viewContainerRef.length,injector:t,ngModuleRef:o,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0,directives:n.directives||void 0}),this.setDisposeFn(()=>e.destroy())}else{let t=this._appRef,o=n.injector||this._defaultInjector||G.NULL,r=o.get(ue,t.injector);e=ey(n.component,{elementInjector:o,environmentInjector:r,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0,directives:n.directives||void 0}),t.attachView(e.hostView),this.setDisposeFn(()=>{t.viewCount>0&&t.detachView(e.hostView),e.destroy()})}return this.outletElement.appendChild(this._getComponentRootNode(e)),this._attachedPortal=n,e}attachTemplatePortal(n){let e=n.viewContainerRef,t=e.createEmbeddedView(n.templateRef,n.context,{injector:n.injector});return t.rootNodes.forEach(o=>this.outletElement.appendChild(o)),t.detectChanges(),this.setDisposeFn(()=>{let o=e.indexOf(t);o!==-1&&e.remove(o)}),this._attachedPortal=n,t}attachDomPortal=n=>{let e=n.element;e.parentNode;let t=this.outletElement.ownerDocument.createComment(`dom-portal`);e.parentNode.insertBefore(t,e),this.outletElement.appendChild(e),this._attachedPortal=n,super.setDisposeFn(()=>{t.parentNode&&t.parentNode.replaceChild(e,t)})};dispose(){super.dispose(),this.outletElement.remove()}_getComponentRootNode(n){return n.hostView.rootNodes[0]}};var ls=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵmod=$e$1({type:i});static ɵinj=Se({})}return i})();var cs=Qa();function bs(i){return new ki(i.get(Qe),i.get(H))}var ki=class{_viewportRuler;_previousHTMLStyles={top:``,left:``};_previousScrollPosition;_isEnabled=!1;_document;constructor(n,e){this._viewportRuler=n,this._document=e}attach(){}enable(){if(this._canBeEnabled()){let n=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=n.style.left||``,this._previousHTMLStyles.top=n.style.top||``,n.style.left=he(-this._previousScrollPosition.left),n.style.top=he(-this._previousScrollPosition.top),n.classList.add(`cdk-global-scrollblock`),this._isEnabled=!0}}disable(){if(this._isEnabled){let n=this._document.documentElement,e=this._document.body,t=n.style,o=e.style,r=t.scrollBehavior||``,a=o.scrollBehavior||``;this._isEnabled=!1,t.left=this._previousHTMLStyles.left,t.top=this._previousHTMLStyles.top,n.classList.remove(`cdk-global-scrollblock`),cs&&(t.scrollBehavior=o.scrollBehavior=`auto`),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),cs&&(t.scrollBehavior=r,o.scrollBehavior=a)}}_canBeEnabled(){if(this._document.documentElement.classList.contains(`cdk-global-scrollblock`)||this._isEnabled)return!1;let e=this._document.documentElement,t=this._viewportRuler.getViewportSize();return e.scrollHeight>t.height||e.scrollWidth>t.width}};function gs(i,n){return new Ci(i.get(_t),i.get(ee$1),i.get(Qe),n)}var Ci=class{_scrollDispatcher;_ngZone;_viewportRuler;_config;_scrollSubscription=null;_overlayRef;_initialScrollPosition;constructor(n,e,t,o){this._scrollDispatcher=n,this._ngZone=e,this._viewportRuler=t,this._config=o}attach(n){this._overlayRef,this._overlayRef=n}enable(){if(this._scrollSubscription)return;let n=this._scrollDispatcher.scrolled(0).pipe(We(e=>!e||!this._overlayRef.overlayElement.contains(e.getElementRef().nativeElement)));this._config&&this._config.threshold&&this._config.threshold>1?(this._initialScrollPosition=this._viewportRuler.getViewportScrollPosition().top,this._scrollSubscription=n.subscribe(()=>{let e=this._viewportRuler.getViewportScrollPosition().top;Math.abs(e-this._initialScrollPosition)>this._config.threshold?this._detach():this._overlayRef.updatePosition()})):this._scrollSubscription=n.subscribe(this._detach)}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}_detach=()=>{this.disable(),this._overlayRef.hasAttached()&&this._ngZone.run(()=>this._overlayRef.detach())}};var yn=class{enable(){}disable(){}attach(){}};function Wo(i,n){return n.some(e=>{let t=i.bottom<e.top,o=i.top>e.bottom,r=i.right<e.left,a=i.left>e.right;return t||o||r||a})}function ds(i,n){return n.some(e=>{let t=i.top<e.top,o=i.bottom>e.bottom,r=i.left<e.left,a=i.right>e.right;return t||o||r||a})}function Dt(i,n){return new Si(i.get(_t),i.get(Qe),i.get(ee$1),n)}var Si=class{_scrollDispatcher;_viewportRuler;_ngZone;_config;_scrollSubscription=null;_overlayRef;constructor(n,e,t,o){this._scrollDispatcher=n,this._viewportRuler=e,this._ngZone=t,this._config=o}attach(n){this._overlayRef,this._overlayRef=n}enable(){if(!this._scrollSubscription){let n=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(n).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let e=this._overlayRef.overlayElement.getBoundingClientRect(),{width:t,height:o}=this._viewportRuler.getViewportSize();Wo(e,[{width:t,height:o,bottom:o,right:t,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()))}})}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}};var _s=(()=>{class i{_injector=h(G);noop=()=>new yn;close=e=>gs(this._injector,e);block=()=>bs(this._injector);reposition=e=>Dt(this._injector,e);static ɵfac=function(t){return new(t||i)};static ɵprov=he$1({token:i,factory:i.ɵfac})}return i})();var xn=class{positionStrategy;scrollStrategy=new yn;panelClass=``;hasBackdrop=!1;backdropClass=`cdk-overlay-dark-backdrop`;disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=!1;usePopover;eventPredicate;constructor(n){if(n){let e=Object.keys(n);for(let t of e)n[t]!==void 0&&(this[t]=n[t])}}};var wi=class{connectionPair;scrollableViewProperties;constructor(n,e){this.connectionPair=n,this.scrollableViewProperties=e}};var vs=(()=>{class i{_attachedOverlays=[];_document=h(H);_isAttached=!1;ngOnDestroy(){this.detach()}add(e){this.remove(e),this._attachedOverlays.push(e)}remove(e){let t=this._attachedOverlays.indexOf(e);t>-1&&this._attachedOverlays.splice(t,1),this._attachedOverlays.length===0&&this.detach()}canReceiveEvent(e,t,o){return o.observers.length<1?!1:e.eventPredicate?e.eventPredicate(t):!0}static ɵfac=function(t){return new(t||i)};static ɵprov=he$1({token:i,factory:i.ɵfac})}return i})();var ys=(()=>{class i extends vs{_ngZone=h(ee$1);_renderer=h(Mn$1).createRenderer(null,null);_cleanupKeydown;add(e){super.add(e),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen(`body`,`keydown`,this._keydownListener)}),this._isAttached=!0)}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=!1)}_keydownListener=e=>{let t=this._attachedOverlays;for(let o=t.length-1;o>-1;o--){let r=t[o];if(this.canReceiveEvent(r,e,r._keydownEvents)){this._ngZone.run(()=>r._keydownEvents.next(e));break}}};static ɵfac=function(t){return new(t||i)};static ɵprov=he$1({token:i,factory:i.ɵfac})}return i})();var xs=(()=>{class i extends vs{_platform=h(ee);_ngZone=h(ee$1);_renderer=h(Mn$1).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=!1;_pointerDownEventTarget=null;_cleanups;add(e){if(super.add(e),!this._isAttached){let t=this._document.body,o={capture:!0},r=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[r.listen(t,`pointerdown`,this._pointerDownListener,o),r.listen(t,`click`,this._clickListener,o),r.listen(t,`auxclick`,this._clickListener,o),r.listen(t,`contextmenu`,this._clickListener,o)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=t.style.cursor,t.style.cursor=`pointer`,this._cursorStyleIsSet=!0),this._isAttached=!0}}detach(){this._isAttached&&(this._cleanups?.forEach(e=>e()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=!1),this._isAttached=!1)}_pointerDownListener=e=>{this._pointerDownEventTarget=de(e)};_clickListener=e=>{let t=de(e),o=e.type===`click`&&this._pointerDownEventTarget?this._pointerDownEventTarget:t;this._pointerDownEventTarget=null;let r=this._attachedOverlays.slice();for(let a=r.length-1;a>-1;a--){let s=r[a],c=s._outsidePointerEvents;if(!(!s.hasAttached()||!this.canReceiveEvent(s,e,c))){if(ms(s.overlayElement,t)||ms(s.overlayElement,o))break;this._ngZone?this._ngZone.run(()=>c.next(e)):c.next(e)}}};static ɵfac=function(t){return new(t||i)};static ɵprov=he$1({token:i,factory:i.ɵfac})}return i})();function ms(i,n){let e=typeof ShadowRoot<`u`&&ShadowRoot,t=n;for(;t;){if(t===i)return!0;t=e&&t instanceof ShadowRoot?t.host:t.parentNode}return!1}var ks=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵcmp=On$1({type:i,selectors:[[`ng-component`]],hostAttrs:[`cdk-overlay-style-loader`,``],decls:0,vars:0,template:function(t,o){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
  pointer-events: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.cdk-overlay-container {
  position: fixed;
}
@layer cdk-overlay {
  .cdk-overlay-container {
    z-index: 1000;
  }
}
.cdk-overlay-container:empty {
  display: none;
}

.cdk-global-overlay-wrapper {
  display: flex;
  position: absolute;
}
@layer cdk-overlay {
  .cdk-global-overlay-wrapper {
    z-index: 1000;
  }
}

.cdk-overlay-pane {
  position: absolute;
  pointer-events: auto;
  box-sizing: border-box;
  display: flex;
  max-width: 100%;
  max-height: 100%;
}
@layer cdk-overlay {
  .cdk-overlay-pane {
    z-index: 1000;
  }
}

.cdk-overlay-backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: auto;
  -webkit-tap-highlight-color: transparent;
  opacity: 0;
  touch-action: manipulation;
}
@layer cdk-overlay {
  .cdk-overlay-backdrop {
    z-index: 1000;
    transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
  }
}
@media (prefers-reduced-motion) {
  .cdk-overlay-backdrop {
    transition-duration: 1ms;
  }
}

.cdk-overlay-backdrop-showing {
  opacity: 1;
}
@media (forced-colors: active) {
  .cdk-overlay-backdrop-showing {
    opacity: 0.6;
  }
}

@layer cdk-overlay {
  .cdk-overlay-dark-backdrop {
    background: rgba(0, 0, 0, 0.32);
  }
}

.cdk-overlay-transparent-backdrop {
  transition: visibility 1ms linear, opacity 1ms linear;
  visibility: hidden;
  opacity: 1;
}
.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing, .cdk-high-contrast-active .cdk-overlay-transparent-backdrop {
  opacity: 0;
  visibility: visible;
}

.cdk-overlay-backdrop-noop-animation {
  transition: none;
}

.cdk-overlay-connected-position-bounding-box {
  position: absolute;
  display: flex;
  flex-direction: column;
  min-width: 1px;
  min-height: 1px;
}
@layer cdk-overlay {
  .cdk-overlay-connected-position-bounding-box {
    z-index: 1000;
  }
}

.cdk-global-scrollblock {
  position: fixed;
  width: 100%;
  overflow-y: scroll;
}

.cdk-overlay-popover {
  background: none;
  border: none;
  padding: 0;
  outline: 0;
  overflow: visible;
  position: fixed;
  pointer-events: none;
  white-space: normal;
  color: inherit;
  text-decoration: none;
  width: 100%;
  height: 100%;
  inset: auto;
  top: 0;
  left: 0;
}
.cdk-overlay-popover::backdrop {
  display: none;
}
.cdk-overlay-popover .cdk-overlay-backdrop {
  position: fixed;
  z-index: auto;
}
`],encapsulation:2})}return i})();var Cs=(()=>{class i{_platform=h(ee);_containerElement;_document=h(H);_styleLoader=h(DM);ngOnDestroy(){this._containerElement?.remove()}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let e=`cdk-overlay-container`;if(this._platform.isBrowser||Ao()){let o=this._document.querySelectorAll(`.${e}[platform="server"], .${e}[platform="test"]`);for(let r=0;r<o.length;r++)o[r].remove()}let t=this._document.createElement(`div`);t.classList.add(e),Ao()?t.setAttribute(`platform`,`test`):this._platform.isBrowser||t.setAttribute(`platform`,`server`),this._document.body.appendChild(t),this._containerElement=t}_loadStyles(){this._styleLoader.load(ks)}static ɵfac=function(t){return new(t||i)};static ɵprov=he$1({token:i,factory:i.ɵfac})}return i})();var $o=class{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(n,e,t,o){this._renderer=e,this._ngZone=t,this.element=n.createElement(`div`),this.element.classList.add(`cdk-overlay-backdrop`),this._cleanupClick=e.listen(this.element,`click`,o)}detach(){this._ngZone.runOutsideAngular(()=>{let n=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(n,`transitionend`,this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),n.style.pointerEvents=`none`,n.classList.remove(`cdk-overlay-backdrop-showing`)})}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove()}};function qo(i){return i&&i.nodeType===1}var Uo=be([]);var Ei=class{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new B;_attachments=new B;_detachments=new B;_positionStrategy;_scrollStrategy;_locationChanges;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=!1;_previousHostParent;_keydownEvents=new B;_outsidePointerEvents=new B;_afterNextRenderRef;constructor(n,e,t,o,r,a,s,c,h,p=!1,_,E){this._portalOutlet=n,this._host=e,this._pane=t,this._config=o,this._ngZone=r,this._keyboardDispatcher=a,this._document=s,this._location=c,this._outsideClickDispatcher=h,this._animationsDisabled=p,this._injector=_,this._renderer=E,o.scrollStrategy&&(this._scrollStrategy=o.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=o.positionStrategy}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(n){if(this._disposed)return null;this._attachHost();let e=this._portalOutlet.attach(n);if(this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),zt$1(()=>{Uo.update(t=>t.includes(this)?t:[...t,this])}),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=sw(()=>{this.hasAttached()&&this.updatePosition()},{injector:this._injector}),this._togglePointerEvents(!0),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!0),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation===!0||this._config.disposeOnNavigation===`pop-state`){let t=this._location.subscribe(()=>this.dispose());this._locationChanges=()=>t.unsubscribe()}else this._config.disposeOnNavigation===`url-change`&&(this._locationChanges=this._location.onUrlChange(()=>this.dispose()));return this._outsideClickDispatcher.add(this),typeof e?.onDestroy==`function`&&e.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()))}),e}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(!1),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let n=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges?.(),this._outsideClickDispatcher.remove(this),zt$1(()=>{Uo.update(e=>e.filter(t=>t!==this))}),n}dispose(){if(this._disposed)return;let n=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges?.(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,n&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=!0,zt$1(()=>{Uo.update(e=>e.filter(t=>t!==this))})}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}updatePositionStrategy(n){n!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=n,this.hasAttached()&&(n.attach(this),this.updatePosition()))}updateSize(n){this._config=y(y({},this._config),n),this._updateElementSize()}setDirection(n){this._config=R(y({},this._config),{direction:n}),this._updateElementDirection()}addPanelClass(n){this._pane&&this._toggleClasses(this._pane,n,!0)}removePanelClass(n){this._pane&&this._toggleClasses(this._pane,n,!1)}getDirection(){let n=this._config.direction;return n?typeof n==`string`?n:n.value:`ltr`}updateScrollStrategy(n){n!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=n,this.hasAttached()&&(n.attach(this),n.enable()))}_updateElementDirection(){this._host.setAttribute(`dir`,this.getDirection())}_updateElementSize(){if(!this._pane)return;let n=this._pane.style;n.width=he(this._config.width),n.height=he(this._config.height),n.minWidth=he(this._config.minWidth),n.minHeight=he(this._config.minHeight),n.maxWidth=he(this._config.maxWidth),n.maxHeight=he(this._config.maxHeight)}_togglePointerEvents(n){this._pane.style.pointerEvents=n?``:`none`}_attachHost(){if(!this._host.parentElement){let n=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;qo(n)?n.after(this._host):n?.type===`parent`?n.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host)}if(this._config.usePopover)try{this._host.showPopover()}catch{}}_attachBackdrop(){let n=`cdk-overlay-backdrop-showing`;this._backdropRef?.dispose(),this._backdropRef=new $o(this._document,this._renderer,this._ngZone,e=>{this._backdropClick.next(e)}),this._animationsDisabled&&this._backdropRef.element.classList.add(`cdk-overlay-backdrop-noop-animation`),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,!0),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<`u`?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(n))}):this._backdropRef.element.classList.add(n)}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host)}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach()}_toggleClasses(n,e,t){let o=ft(e||[]).filter(r=>!!r);o.length&&(t?n.classList.add(...o):n.classList.remove(...o))}_detachContentWhenEmpty(){let n=!1;try{this._detachContentAfterRenderRef=sw(()=>{n=!0,this._detachContent()},{injector:this._injector})}catch(e){if(n)throw e;this._detachContent()}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent()}),this._detachContentMutationObserver.observe(this._pane,{childList:!0}))}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!1),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent())}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect()}_disposeScrollStrategy(){let n=this._scrollStrategy;n?.disable(),n?.detach?.()}};var us=`cdk-overlay-connected-position-bounding-box`;var Vc=/([A-Za-z%]+)$/;function kn(i,n){return new Di(n,i.get(Qe),i.get(H),i.get(ee),i.get(Cs))}var Di=class{_viewportRuler;_document;_platform;_overlayContainer;_overlayRef;_isInitialRender=!1;_lastBoundingBoxSize={width:0,height:0};_isPushed=!1;_canPush=!0;_growAfterOpen=!1;_hasFlexibleDimensions=!0;_positionLocked=!1;_originRect;_overlayRect;_viewportRect;_containerRect;_viewportMargin=0;_scrollables=[];_preferredPositions=[];_origin;_pane;_isDisposed=!1;_boundingBox=null;_lastPosition=null;_lastScrollVisibility=null;_positionChanges=new B;_resizeSubscription=K.EMPTY;_offsetX=0;_offsetY=0;_transformOriginSelector;_appliedPanelClasses=[];_previousPushAmount=null;_popoverLocation=`global`;positionChanges=this._positionChanges;get positions(){return this._preferredPositions}constructor(n,e,t,o,r){this._viewportRuler=e,this._document=t,this._platform=o,this._overlayContainer=r,this.setOrigin(n)}attach(n){this._overlayRef&&this._overlayRef,this._validatePositions(),n.hostElement.classList.add(us),this._overlayRef=n,this._boundingBox=n.hostElement,this._pane=n.overlayElement,this._isDisposed=!1,this._isInitialRender=!0,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=!0,this.apply()})}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._getContainerRect();let n=this._originRect,e=this._overlayRect,t=this._viewportRect,o=this._containerRect,r=[],a;for(let s of this._preferredPositions){let c=this._getOriginPoint(n,o,s),h=this._getOverlayPoint(c,e,s),p=this._getOverlayFit(h,e,t,s);if(p.isCompletelyWithinViewport){this._isPushed=!1,this._applyPosition(s,c);return}if(this._canFitWithFlexibleDimensions(p,h,t)){r.push({position:s,origin:c,overlayRect:e,boundingBoxRect:this._calculateBoundingBoxRect(c,s)});continue}(!a||a.overlayFit.visibleArea<p.visibleArea)&&(a={overlayFit:p,overlayPoint:h,originPoint:c,position:s,overlayRect:e})}if(r.length){let s=null,c=-1;for(let h of r){let p=h.boundingBoxRect.width*h.boundingBoxRect.height*(h.position.weight||1);p>c&&(c=p,s=h)}this._isPushed=!1,this._applyPosition(s.position,s.origin);return}if(this._canPush){this._isPushed=!0,this._applyPosition(a.position,a.originPoint);return}this._applyPosition(a.position,a.originPoint)}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe()}dispose(){this._isDisposed||(this._boundingBox&&Et(this._boundingBox.style,{top:``,left:``,right:``,bottom:``,height:``,width:``,alignItems:``,justifyContent:``}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(us),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=!0)}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let n=this._lastPosition;n?(this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._getContainerRect(),this._applyPosition(n,this._getOriginPoint(this._originRect,this._containerRect,n))):this.apply()}withScrollableContainers(n){return this._scrollables=n,this}withPositions(n){return this._preferredPositions=n,n.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(n){return this._viewportMargin=n,this}withFlexibleDimensions(n=!0){return this._hasFlexibleDimensions=n,this}withGrowAfterOpen(n=!0){return this._growAfterOpen=n,this}withPush(n=!0){return this._canPush=n,this}withLockedPosition(n=!0){return this._positionLocked=n,this}setOrigin(n){return this._origin=n,this}withDefaultOffsetX(n){return this._offsetX=n,this}withDefaultOffsetY(n){return this._offsetY=n,this}withTransformOriginOn(n){return this._transformOriginSelector=n,this}withPopoverLocation(n){return this._popoverLocation=n,this}getPopoverInsertionPoint(){return this._popoverLocation===`global`?null:this._popoverLocation!==`inline`?this._popoverLocation:this._origin instanceof et?this._origin.nativeElement:qo(this._origin)?this._origin:null}_getOriginPoint(n,e,t){let o;if(t.originX==`center`)o=n.left+n.width/2;else{let a=this._isRtl()?n.right:n.left,s=this._isRtl()?n.left:n.right;o=t.originX==`start`?a:s}e.left<0&&(o-=e.left);let r;return t.originY==`center`?r=n.top+n.height/2:r=t.originY==`top`?n.top:n.bottom,e.top<0&&(r-=e.top),{x:o,y:r}}_getOverlayPoint(n,e,t){let o;t.overlayX==`center`?o=-e.width/2:t.overlayX===`start`?o=this._isRtl()?-e.width:0:o=this._isRtl()?0:-e.width;let r;return t.overlayY==`center`?r=-e.height/2:r=t.overlayY==`top`?0:-e.height,{x:n.x+o,y:n.y+r}}_getOverlayFit(n,e,t,o){let r=hs(e),{x:a,y:s}=n,c=this._getOffset(o,`x`),h=this._getOffset(o,`y`);c&&(a+=c),h&&(s+=h);let p=0-a,_=a+r.width-t.width,E=0-s,g=s+r.height-t.height,T=this._subtractOverflows(r.width,p,_),j=this._subtractOverflows(r.height,E,g),se=T*j;return{visibleArea:se,isCompletelyWithinViewport:r.width*r.height===se,fitsInViewportVertically:j===r.height,fitsInViewportHorizontally:T==r.width}}_canFitWithFlexibleDimensions(n,e,t){if(this._hasFlexibleDimensions){let o=t.bottom-e.y,r=t.right-e.x,a=ps(this._overlayRef.getConfig().minHeight),s=ps(this._overlayRef.getConfig().minWidth),c=n.fitsInViewportVertically||a!=null&&a<=o,h=n.fitsInViewportHorizontally||s!=null&&s<=r;return c&&h}return!1}_pushOverlayOnScreen(n,e,t){if(this._previousPushAmount&&this._positionLocked)return{x:n.x+this._previousPushAmount.x,y:n.y+this._previousPushAmount.y};let o=hs(e),r=this._viewportRect,a=Math.max(n.x+o.width-r.width,0),s=Math.max(n.y+o.height-r.height,0),c=Math.max(r.top-t.top-n.y,0),h=Math.max(r.left-t.left-n.x,0),p=0,_=0;return o.width<=r.width?p=h||-a:p=n.x<this._getViewportMarginStart()?r.left-t.left-n.x:0,o.height<=r.height?_=c||-s:_=n.y<this._getViewportMarginTop()?r.top-t.top-n.y:0,this._previousPushAmount={x:p,y:_},{x:n.x+p,y:n.y+_}}_applyPosition(n,e){if(this._setTransformOrigin(n),this._setOverlayElementStyles(e,n),this._setBoundingBoxStyles(e,n),n.panelClass&&this._addPanelClasses(n.panelClass),this._positionChanges.observers.length){let t=this._getScrollVisibility();if(n!==this._lastPosition||!this._lastScrollVisibility||!Lc(this._lastScrollVisibility,t)){let o=new wi(n,t);this._positionChanges.next(o)}this._lastScrollVisibility=t}this._lastPosition=n,this._isInitialRender=!1}_setTransformOrigin(n){if(!this._transformOriginSelector)return;let e=this._boundingBox.querySelectorAll(this._transformOriginSelector),t,o=n.overlayY;n.overlayX===`center`?t=`center`:this._isRtl()?t=n.overlayX===`start`?`right`:`left`:t=n.overlayX===`start`?`left`:`right`;for(let r=0;r<e.length;r++)e[r].style.transformOrigin=`${t} ${o}`}_calculateBoundingBoxRect(n,e){let t=this._viewportRect,o=this._isRtl(),r,a,s;if(e.overlayY===`top`)a=n.y,r=t.height-a+this._getViewportMarginBottom();else if(e.overlayY===`bottom`)s=t.height-n.y+this._getViewportMarginTop()+this._getViewportMarginBottom(),r=t.height-s+this._getViewportMarginTop();else{let g=Math.min(t.bottom-n.y+t.top,n.y),T=this._lastBoundingBoxSize.height;r=g*2,a=n.y-g,r>T&&!this._isInitialRender&&!this._growAfterOpen&&(a=n.y-T/2)}let c=e.overlayX===`start`&&!o||e.overlayX===`end`&&o,h=e.overlayX===`end`&&!o||e.overlayX===`start`&&o,p,_,E;if(h)E=t.width-n.x+this._getViewportMarginStart()+this._getViewportMarginEnd(),p=n.x-this._getViewportMarginStart();else if(c)_=n.x,p=t.right-n.x-this._getViewportMarginEnd();else{let g=Math.min(t.right-n.x+t.left,n.x),T=this._lastBoundingBoxSize.width;p=g*2,_=n.x-g,p>T&&!this._isInitialRender&&!this._growAfterOpen&&(_=n.x-T/2)}return{top:a,left:_,bottom:s,right:E,width:p,height:r}}_setBoundingBoxStyles(n,e){let t=this._calculateBoundingBoxRect(n,e);!this._isInitialRender&&!this._growAfterOpen&&(t.height=Math.min(t.height,this._lastBoundingBoxSize.height),t.width=Math.min(t.width,this._lastBoundingBoxSize.width));let o={};if(this._hasExactPosition())o.top=o.left=`0`,o.bottom=o.right=`auto`,o.maxHeight=o.maxWidth=``,o.width=o.height=`100%`;else{let r=this._overlayRef.getConfig().maxHeight,a=this._overlayRef.getConfig().maxWidth;o.width=he(t.width),o.height=he(t.height),o.top=he(t.top)||`auto`,o.bottom=he(t.bottom)||`auto`,o.left=he(t.left)||`auto`,o.right=he(t.right)||`auto`,e.overlayX===`center`?o.alignItems=`center`:o.alignItems=e.overlayX===`end`?`flex-end`:`flex-start`,e.overlayY===`center`?o.justifyContent=`center`:o.justifyContent=e.overlayY===`bottom`?`flex-end`:`flex-start`,r&&(o.maxHeight=he(r)),a&&(o.maxWidth=he(a))}this._lastBoundingBoxSize=t,Et(this._boundingBox.style,o)}_resetBoundingBoxStyles(){Et(this._boundingBox.style,{top:`0`,left:`0`,right:`0`,bottom:`0`,height:``,width:``,alignItems:``,justifyContent:``})}_resetOverlayElementStyles(){Et(this._pane.style,{top:``,left:``,bottom:``,right:``,position:``,transform:``})}_setOverlayElementStyles(n,e){let t={},o=this._hasExactPosition(),r=this._hasFlexibleDimensions,a=this._overlayRef.getConfig();if(o){let p=this._viewportRuler.getViewportScrollPosition();Et(t,this._getExactOverlayY(e,n,p)),Et(t,this._getExactOverlayX(e,n,p))}else t.position=`static`;let s=``,c=this._getOffset(e,`x`),h=this._getOffset(e,`y`);c&&(s+=`translateX(${c}px) `),h&&(s+=`translateY(${h}px)`),t.transform=s.trim(),a.maxHeight&&(o?t.maxHeight=he(a.maxHeight):r&&(t.maxHeight=``)),a.maxWidth&&(o?t.maxWidth=he(a.maxWidth):r&&(t.maxWidth=``)),Et(this._pane.style,t)}_getExactOverlayY(n,e,t){let o={top:``,bottom:``},r=this._getOverlayPoint(e,this._overlayRect,n);if(this._isPushed&&(r=this._pushOverlayOnScreen(r,this._overlayRect,t)),n.overlayY===`bottom`)o.bottom=`${this._document.documentElement.clientHeight-(r.y+this._overlayRect.height)}px`;else o.top=he(r.y);return o}_getExactOverlayX(n,e,t){let o={left:``,right:``},r=this._getOverlayPoint(e,this._overlayRect,n);this._isPushed&&(r=this._pushOverlayOnScreen(r,this._overlayRect,t));let a;if(this._isRtl()?a=n.overlayX===`end`?`left`:`right`:a=n.overlayX===`end`?`right`:`left`,a===`right`)o.right=`${this._document.documentElement.clientWidth-(r.x+this._overlayRect.width)}px`;else o.left=he(r.x);return o}_getScrollVisibility(){let n=this._getOriginRect(),e=this._pane.getBoundingClientRect(),t=this._scrollables.map(o=>o.getElementRef().nativeElement.getBoundingClientRect());return{isOriginClipped:ds(n,t),isOriginOutsideView:Wo(n,t),isOverlayClipped:ds(e,t),isOverlayOutsideView:Wo(e,t)}}_subtractOverflows(n,...e){return e.reduce((t,o)=>t-Math.max(o,0),n)}_getNarrowedViewportRect(){let n=this._document.documentElement.clientWidth,e=this._document.documentElement.clientHeight,t=this._viewportRuler.getViewportScrollPosition();return{top:t.top+this._getViewportMarginTop(),left:t.left+this._getViewportMarginStart(),right:t.left+n-this._getViewportMarginEnd(),bottom:t.top+e-this._getViewportMarginBottom(),width:n-this._getViewportMarginStart()-this._getViewportMarginEnd(),height:e-this._getViewportMarginTop()-this._getViewportMarginBottom()}}_isRtl(){return this._overlayRef.getDirection()===`rtl`}_hasExactPosition(){return!this._hasFlexibleDimensions||this._isPushed}_getOffset(n,e){return e===`x`?n.offsetX==null?this._offsetX:n.offsetX:n.offsetY==null?this._offsetY:n.offsetY}_validatePositions(){}_addPanelClasses(n){this._pane&&ft(n).forEach(e=>{e!==``&&this._appliedPanelClasses.indexOf(e)===-1&&(this._appliedPanelClasses.push(e),this._pane.classList.add(e))})}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(n=>{this._pane.classList.remove(n)}),this._appliedPanelClasses=[])}_getViewportMarginStart(){return typeof this._viewportMargin==`number`?this._viewportMargin:this._viewportMargin?.start??0}_getViewportMarginEnd(){return typeof this._viewportMargin==`number`?this._viewportMargin:this._viewportMargin?.end??0}_getViewportMarginTop(){return typeof this._viewportMargin==`number`?this._viewportMargin:this._viewportMargin?.top??0}_getViewportMarginBottom(){return typeof this._viewportMargin==`number`?this._viewportMargin:this._viewportMargin?.bottom??0}_getOriginRect(){let n=this._origin;if(n instanceof et)return n.nativeElement.getBoundingClientRect();if(n instanceof Element)return n.getBoundingClientRect();let e=n.width||0,t=n.height||0;return{top:n.y,bottom:n.y+t,left:n.x,right:n.x+e,height:t,width:e}}_getContainerRect(){let n=this._overlayRef.getConfig().usePopover&&this._popoverLocation!==`global`,e=this._overlayContainer.getContainerElement();n&&(e.style.display=`block`);let t=e.getBoundingClientRect();return n&&(e.style.display=``),t}};function Et(i,n){for(let e in n)Object.hasOwn(n,e)&&(i[e]=n[e]);return i}function ps(i){if(typeof i!=`number`&&i!=null){let[n,e]=i.split(Vc);return!e||e===`px`?parseFloat(n):null}return i||null}function hs(i){return{top:Math.floor(i.top),right:Math.floor(i.right),bottom:Math.floor(i.bottom),left:Math.floor(i.left),width:Math.floor(i.width),height:Math.floor(i.height)}}function Lc(i,n){return i===n?!0:i.isOriginClipped===n.isOriginClipped&&i.isOriginOutsideView===n.isOriginOutsideView&&i.isOverlayClipped===n.isOverlayClipped&&i.isOverlayOutsideView===n.isOverlayOutsideView}var fs=`cdk-global-overlay-wrapper`;function Ss(i){return new Mi}var Mi=class{_overlayRef;_cssPosition=`static`;_topOffset=``;_bottomOffset=``;_alignItems=``;_xPosition=``;_xOffset=``;_width=``;_height=``;_isDisposed=!1;attach(n){let e=n.getConfig();this._overlayRef=n,this._width&&!e.width&&n.updateSize({width:this._width}),this._height&&!e.height&&n.updateSize({height:this._height}),n.hostElement.classList.add(fs),this._isDisposed=!1}top(n=``){return this._bottomOffset=``,this._topOffset=n,this._alignItems=`flex-start`,this}left(n=``){return this._xOffset=n,this._xPosition=`left`,this}bottom(n=``){return this._topOffset=``,this._bottomOffset=n,this._alignItems=`flex-end`,this}right(n=``){return this._xOffset=n,this._xPosition=`right`,this}start(n=``){return this._xOffset=n,this._xPosition=`start`,this}end(n=``){return this._xOffset=n,this._xPosition=`end`,this}width(n=``){return this._overlayRef?this._overlayRef.updateSize({width:n}):this._width=n,this}height(n=``){return this._overlayRef?this._overlayRef.updateSize({height:n}):this._height=n,this}centerHorizontally(n=``){return this.left(n),this._xPosition=`center`,this}centerVertically(n=``){return this.top(n),this._alignItems=`center`,this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let n=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement.style,{width:o,height:r,maxWidth:a,maxHeight:s}=this._overlayRef.getConfig(),c=(o===`100%`||o===`100vw`)&&(!a||a===`100%`||a===`100vw`),h=(r===`100%`||r===`100vh`)&&(!s||s===`100%`||s===`100vh`),p=this._xPosition,_=this._xOffset,E=this._overlayRef.getConfig().direction===`rtl`,g=``,T=``,j=``;c?j=`flex-start`:p===`center`?(j=`center`,E?T=_:g=_):E?p===`left`||p===`end`?(j=`flex-end`,g=_):(p===`right`||p===`start`)&&(j=`flex-start`,T=_):p===`left`||p===`start`?(j=`flex-start`,g=_):(p===`right`||p===`end`)&&(j=`flex-end`,T=_),n.position=this._cssPosition,n.marginLeft=c?`0`:g,n.marginTop=h?`0`:this._topOffset,n.marginBottom=this._bottomOffset,n.marginRight=c?`0`:T,e.justifyContent=j,e.alignItems=h?`flex-start`:this._alignItems}dispose(){if(this._isDisposed||!this._overlayRef)return;let n=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement,t=e.style;e.classList.remove(fs),t.justifyContent=t.alignItems=n.marginTop=n.marginBottom=n.marginLeft=n.marginRight=n.position=``,this._overlayRef=null,this._isDisposed=!0}};var ws=(()=>{class i{_injector=h(G);global(){return Ss()}flexibleConnectedTo(e){return kn(this._injector,e)}static ɵfac=function(t){return new(t||i)};static ɵprov=he$1({token:i,factory:i.ɵfac})}return i})();var Cn=new m(`OVERLAY_DEFAULT_CONFIG`);function Sn(i,n){i.get(DM).load(ks);let e=i.get(Cs),t=i.get(H),o=i.get(ye),r=i.get(tt),a=i.get(bM),s=i.get(Dr,null,{optional:!0})||i.get(Mn$1).createRenderer(null,null),c=new xn(n),h=i.get(Cn,null,{optional:!0})?.usePopover??!0;c.direction=c.direction||a.value,!t.body||!(`showPopover`in t.body)?c.usePopover=!1:c.usePopover=n?.usePopover??h;let p=t.createElement(`div`),_=t.createElement(`div`);p.id=o.getId(`cdk-overlay-`),p.classList.add(`cdk-overlay-pane`),_.appendChild(p),c.usePopover&&(_.setAttribute(`popover`,`manual`),_.classList.add(`cdk-overlay-popover`));let E=c.usePopover?c.positionStrategy?.getPopoverInsertionPoint?.():null;return qo(E)?E.after(_):E?.type===`parent`?E.element.appendChild(_):e.getContainerElement().appendChild(_),new Ei(new xi(p,r,i),_,p,c,i.get(ee$1),i.get(ys),t,i.get(sy),i.get(xs),n?.disableAnimations??i.get(DE,null,{optional:!0})===`NoopAnimations`,i.get(ue),s)}var Es=(()=>{class i{scrollStrategies=h(_s);_positionBuilder=h(ws);_injector=h(G);create(e){return Sn(this._injector,e)}position(){return this._positionBuilder}static ɵfac=function(t){return new(t||i)};static ɵprov=he$1({token:i,factory:i.ɵfac})}return i})();var zc=[{originX:`start`,originY:`bottom`,overlayX:`start`,overlayY:`top`},{originX:`start`,originY:`top`,overlayX:`start`,overlayY:`bottom`},{originX:`end`,originY:`top`,overlayX:`end`,overlayY:`bottom`},{originX:`end`,originY:`bottom`,overlayX:`end`,overlayY:`top`}];var Bc=new m(`cdk-connected-overlay-scroll-strategy`,{providedIn:`root`,factory:()=>{let i=h(G);return()=>Dt(i)}});var Ut=(()=>{class i{elementRef=h(et);static ɵfac=function(t){return new(t||i)};static ɵdir=Tr({type:i,selectors:[[``,`cdk-overlay-origin`,``],[``,`overlay-origin`,``],[``,`cdkOverlayOrigin`,``]],exportAs:[`cdkOverlayOrigin`]})}return i})();var Ds=new m(`cdk-connected-overlay-default-config`);var Ii=(()=>{class i{_dir=h(bM,{optional:!0});_injector=h(G);_overlayRef;_templatePortal;_backdropSubscription=K.EMPTY;_attachSubscription=K.EMPTY;_detachSubscription=K.EMPTY;_positionSubscription=K.EMPTY;_offsetX;_offsetY;_position;_scrollStrategyFactory=h(Bc);_ngZone=h(ee$1);origin;positions;positionStrategy;get offsetX(){return this._offsetX}set offsetX(e){this._offsetX=e,this._position&&this._updatePositionStrategy(this._position)}get offsetY(){return this._offsetY}set offsetY(e){this._offsetY=e,this._position&&this._updatePositionStrategy(this._position)}width;height;minWidth;minHeight;backdropClass;panelClass;viewportMargin=0;scrollStrategy;open=!1;disableClose=!1;transformOriginSelector;hasBackdrop=!1;lockPosition=!1;flexibleDimensions=!1;growAfterOpen=!1;push=!1;disposeOnNavigation=!1;usePopover;matchWidth=!1;set _config(e){typeof e!=`string`&&this._assignConfig(e)}backdropClick=new Le;positionChange=new Le;attach=new Le;detach=new Le;overlayKeydown=new Le;overlayOutsideClick=new Le;constructor(){let e=h(ht),t=h($t$1),o=h(Ds,{optional:!0}),r=h(Cn,{optional:!0});this.usePopover=r?.usePopover===!1?null:`global`,this._templatePortal=new vn(e,t),this.scrollStrategy=this._scrollStrategyFactory(),o&&this._assignConfig(o)}get overlayRef(){return this._overlayRef}get dir(){return this._dir?this._dir.value:`ltr`}ngOnDestroy(){this._attachSubscription.unsubscribe(),this._detachSubscription.unsubscribe(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this._overlayRef?.dispose()}ngOnChanges(e){this._position&&(this._updatePositionStrategy(this._position),this._overlayRef?.updateSize({width:this._getWidth(),minWidth:this.minWidth,height:this.height,minHeight:this.minHeight}),e.origin&&this.open&&this._position.apply()),e.open&&(this.open?this.attachOverlay():this.detachOverlay())}_createOverlay(){(!this.positions||!this.positions.length)&&(this.positions=zc);let e=this._overlayRef=Sn(this._injector,this._buildConfig());this._attachSubscription=e.attachments().subscribe(()=>this.attach.emit()),this._detachSubscription=e.detachments().subscribe(()=>this.detach.emit()),e.keydownEvents().subscribe(t=>{this.overlayKeydown.next(t),t.keyCode===27&&!this.disableClose&&!$e(t)&&(t.preventDefault(),this.detachOverlay())}),this._overlayRef.outsidePointerEvents().subscribe(t=>{let o=this._getOriginElement(),r=de(t);(!o||o!==r&&!o.contains(r))&&this.overlayOutsideClick.next(t)})}_buildConfig(){let e=this._position=this.positionStrategy||this._createPositionStrategy(),t=new xn({direction:this._dir||`ltr`,positionStrategy:e,scrollStrategy:this.scrollStrategy,hasBackdrop:this.hasBackdrop,disposeOnNavigation:this.disposeOnNavigation,usePopover:!!this.usePopover});return(this.height||this.height===0)&&(t.height=this.height),(this.minWidth||this.minWidth===0)&&(t.minWidth=this.minWidth),(this.minHeight||this.minHeight===0)&&(t.minHeight=this.minHeight),this.backdropClass&&(t.backdropClass=this.backdropClass),this.panelClass&&(t.panelClass=this.panelClass),t}_updatePositionStrategy(e){let t=this.positions.map(o=>({originX:o.originX,originY:o.originY,overlayX:o.overlayX,overlayY:o.overlayY,offsetX:o.offsetX||this.offsetX,offsetY:o.offsetY||this.offsetY,panelClass:o.panelClass||void 0}));return e.setOrigin(this._getOrigin()).withPositions(t).withFlexibleDimensions(this.flexibleDimensions).withPush(this.push).withGrowAfterOpen(this.growAfterOpen).withViewportMargin(this.viewportMargin).withLockedPosition(this.lockPosition).withTransformOriginOn(this.transformOriginSelector).withPopoverLocation(this.usePopover===null?`global`:this.usePopover)}_createPositionStrategy(){let e=kn(this._injector,this._getOrigin());return this._updatePositionStrategy(e),e}_getOrigin(){return this.origin instanceof Ut?this.origin.elementRef:this.origin}_getOriginElement(){return this.origin instanceof Ut?this.origin.elementRef.nativeElement:this.origin instanceof et?this.origin.nativeElement:typeof Element<`u`&&this.origin instanceof Element?this.origin:null}_getWidth(){return this.width?this.width:this.matchWidth?this._getOriginElement()?.getBoundingClientRect?.().width:void 0}attachOverlay(){this._overlayRef||this._createOverlay();let e=this._overlayRef;e.getConfig().hasBackdrop=this.hasBackdrop,e.updateSize({width:this._getWidth()}),e.hasAttached()||e.attach(this._templatePortal),this.hasBackdrop?this._backdropSubscription=e.backdropClick().subscribe(t=>this.backdropClick.emit(t)):this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.positionChange.observers.length>0&&(this._positionSubscription=this._position.positionChanges.pipe(jD(()=>this.positionChange.observers.length>0)).subscribe(t=>{this._ngZone.run(()=>this.positionChange.emit(t)),this.positionChange.observers.length===0&&this._positionSubscription.unsubscribe()})),this.open=!0}detachOverlay(){this._overlayRef?.detach(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.open=!1}_assignConfig(e){this.origin=e.origin??this.origin,this.positions=e.positions??this.positions,this.positionStrategy=e.positionStrategy??this.positionStrategy,this.offsetX=e.offsetX??this.offsetX,this.offsetY=e.offsetY??this.offsetY,this.width=e.width??this.width,this.height=e.height??this.height,this.minWidth=e.minWidth??this.minWidth,this.minHeight=e.minHeight??this.minHeight,this.backdropClass=e.backdropClass??this.backdropClass,this.panelClass=e.panelClass??this.panelClass,this.viewportMargin=e.viewportMargin??this.viewportMargin,this.scrollStrategy=e.scrollStrategy??this.scrollStrategy,this.disableClose=e.disableClose??this.disableClose,this.transformOriginSelector=e.transformOriginSelector??this.transformOriginSelector,this.hasBackdrop=e.hasBackdrop??this.hasBackdrop,this.lockPosition=e.lockPosition??this.lockPosition,this.flexibleDimensions=e.flexibleDimensions??this.flexibleDimensions,this.growAfterOpen=e.growAfterOpen??this.growAfterOpen,this.push=e.push??this.push,this.disposeOnNavigation=e.disposeOnNavigation??this.disposeOnNavigation,this.usePopover=e.usePopover??this.usePopover,this.matchWidth=e.matchWidth??this.matchWidth}static ɵfac=function(t){return new(t||i)};static ɵdir=Tr({type:i,selectors:[[``,`cdk-connected-overlay`,``],[``,`connected-overlay`,``],[``,`cdkConnectedOverlay`,``]],inputs:{origin:[0,`cdkConnectedOverlayOrigin`,`origin`],positions:[0,`cdkConnectedOverlayPositions`,`positions`],positionStrategy:[0,`cdkConnectedOverlayPositionStrategy`,`positionStrategy`],offsetX:[0,`cdkConnectedOverlayOffsetX`,`offsetX`],offsetY:[0,`cdkConnectedOverlayOffsetY`,`offsetY`],width:[0,`cdkConnectedOverlayWidth`,`width`],height:[0,`cdkConnectedOverlayHeight`,`height`],minWidth:[0,`cdkConnectedOverlayMinWidth`,`minWidth`],minHeight:[0,`cdkConnectedOverlayMinHeight`,`minHeight`],backdropClass:[0,`cdkConnectedOverlayBackdropClass`,`backdropClass`],panelClass:[0,`cdkConnectedOverlayPanelClass`,`panelClass`],viewportMargin:[0,`cdkConnectedOverlayViewportMargin`,`viewportMargin`],scrollStrategy:[0,`cdkConnectedOverlayScrollStrategy`,`scrollStrategy`],open:[0,`cdkConnectedOverlayOpen`,`open`],disableClose:[0,`cdkConnectedOverlayDisableClose`,`disableClose`],transformOriginSelector:[0,`cdkConnectedOverlayTransformOriginOn`,`transformOriginSelector`],hasBackdrop:[2,`cdkConnectedOverlayHasBackdrop`,`hasBackdrop`,Jm],lockPosition:[2,`cdkConnectedOverlayLockPosition`,`lockPosition`,Jm],flexibleDimensions:[2,`cdkConnectedOverlayFlexibleDimensions`,`flexibleDimensions`,Jm],growAfterOpen:[2,`cdkConnectedOverlayGrowAfterOpen`,`growAfterOpen`,Jm],push:[2,`cdkConnectedOverlayPush`,`push`,Jm],disposeOnNavigation:[2,`cdkConnectedOverlayDisposeOnNavigation`,`disposeOnNavigation`,e=>e===`url-change`||e===`pop-state`?e:Jm(e)],usePopover:[0,`cdkConnectedOverlayUsePopover`,`usePopover`],matchWidth:[2,`cdkConnectedOverlayMatchWidth`,`matchWidth`,Jm],_config:[0,`cdkConnectedOverlay`,`_config`]},outputs:{backdropClick:`backdropClick`,positionChange:`positionChange`,attach:`attach`,detach:`detach`,overlayKeydown:`overlayKeydown`,overlayOutsideClick:`overlayOutsideClick`},exportAs:[`cdkConnectedOverlay`],features:[Ao$1]})}return i})();var wn=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵmod=$e$1({type:i});static ɵinj=Se({providers:[Es],imports:[bv,ls,jo,jo]})}return i})();var jc=20;var Hc=new m(`mat-tooltip-scroll-strategy`,{providedIn:`root`,factory:()=>{let i=h(G);return()=>Dt(i,{scrollThrottle:jc})}});var Gc=new m(`mat-tooltip-default-options`,{providedIn:`root`,factory:()=>({showDelay:0,hideDelay:0,touchendHideDelay:1500})});var Ms=`tooltip-panel`;var Uc={passive:!0};var Wc=8;var $c=8;var qc=24;var Xc=200;var En=(()=>{class i{_elementRef=h(et);_ngZone=h(ee$1);_platform=h(ee);_ariaDescriber=h(ka);_focusMonitor=h(on);_dir=h(bM);_injector=h(G);_viewContainerRef=h($t$1);_mediaMatcher=h(Ft);_document=h(H);_renderer=h(Dr);_animationsDisabled=Ce();_defaultOptions=h(Gc,{optional:!0});_overlayRef=null;_tooltipInstance=null;_overlayPanelClass;_portal;_position=`below`;_positionAtOrigin=!1;_disabled=!1;_tooltipClass;_viewInitialized=!1;_pointerExitEventsInitialized=!1;_tooltipComponent=Ns;_viewportMargin=8;_currentPosition;_cssClassPrefix=`mat-mdc`;_ariaDescriptionPending=!1;_dirSubscribed=!1;get position(){return this._position}set position(e){e!==this._position&&(this._position=e,this._overlayRef&&(this._updatePosition(this._overlayRef),this._tooltipInstance?.show(0),this._overlayRef.updatePosition()))}get positionAtOrigin(){return this._positionAtOrigin}set positionAtOrigin(e){this._positionAtOrigin=rt(e),this._detach(),this._overlayRef=null}get disabled(){return this._disabled}set disabled(e){let t=rt(e);this._disabled!==t&&(this._disabled=t,t?this.hide(0):this._setupPointerEnterEventsIfNeeded(),this._syncAriaDescription(this.message))}get showDelay(){return this._showDelay}set showDelay(e){this._showDelay=ot(e)}_showDelay;get hideDelay(){return this._hideDelay}set hideDelay(e){this._hideDelay=ot(e),this._tooltipInstance&&(this._tooltipInstance._mouseLeaveHideDelay=this._hideDelay)}_hideDelay;touchGestures=`auto`;get message(){return this._message}set message(e){let t=this._message;this._message=e!=null?String(e).trim():``,!this._message&&this._isTooltipVisible()?this.hide(0):(this._setupPointerEnterEventsIfNeeded(),this._updateTooltipMessage()),this._syncAriaDescription(t)}_message=``;get tooltipClass(){return this._tooltipClass}set tooltipClass(e){this._tooltipClass=e,this._tooltipInstance&&this._setTooltipClass(this._tooltipClass)}_eventCleanups=[];_touchstartTimeout=null;_destroyed=new B;_isDestroyed=!1;constructor(){let e=this._defaultOptions;e&&(this._showDelay=e.showDelay,this._hideDelay=e.hideDelay,e.position&&(this.position=e.position),e.positionAtOrigin&&(this.positionAtOrigin=e.positionAtOrigin),e.touchGestures&&(this.touchGestures=e.touchGestures),e.tooltipClass&&(this.tooltipClass=e.tooltipClass)),this._viewportMargin=Wc}ngAfterViewInit(){this._viewInitialized=!0,this._setupPointerEnterEventsIfNeeded(),this._focusMonitor.monitor(this._elementRef).pipe(lc$1(this._destroyed)).subscribe(e=>{e?e===`keyboard`&&this._ngZone.run(()=>this.show()):this._ngZone.run(()=>this.hide(0))})}ngOnDestroy(){let e=this._elementRef.nativeElement;this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this._overlayRef&&(this._overlayRef.dispose(),this._tooltipInstance=null),this._eventCleanups.forEach(t=>t()),this._eventCleanups.length=0,this._destroyed.next(),this._destroyed.complete(),this._isDestroyed=!0,this._ariaDescriber.removeDescription(e,this.message,`tooltip`),this._focusMonitor.stopMonitoring(e)}show(e=this.showDelay,t){if(this.disabled||!this.message||this._isTooltipVisible()){this._tooltipInstance?._cancelPendingAnimations();return}let o=this._createOverlay(t);this._detach(),this._portal=this._portal||new _n(this._tooltipComponent,this._viewContainerRef);let r=this._tooltipInstance=o.attach(this._portal).instance;r._triggerElement=this._elementRef.nativeElement,r._mouseLeaveHideDelay=this._hideDelay,r.afterHidden().pipe(lc$1(this._destroyed)).subscribe(()=>this._detach()),this._setTooltipClass(this._tooltipClass),this._updateTooltipMessage(),r.show(e)}hide(e=this.hideDelay){let t=this._tooltipInstance;t&&(t.isVisible()?t.hide(e):(t._cancelPendingAnimations(),this._detach()))}toggle(e){this._isTooltipVisible()?this.hide():this.show(void 0,e)}_isTooltipVisible(){return!!this._tooltipInstance&&this._tooltipInstance.isVisible()}_createOverlay(e){if(this._overlayRef){let a=this._overlayRef.getConfig().positionStrategy;if((!this.positionAtOrigin||!e)&&a._origin instanceof et)return this._overlayRef;this._detach()}let t=this._injector.get(_t).getAncestorScrollContainers(this._elementRef),o=`${this._cssClassPrefix}-${Ms}`,r=kn(this._injector,this.positionAtOrigin?e||this._elementRef:this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(!1).withViewportMargin(this._viewportMargin).withScrollableContainers(t).withPopoverLocation(`global`);return r.positionChanges.pipe(lc$1(this._destroyed)).subscribe(a=>{this._updateCurrentPositionClass(a.connectionPair),this._tooltipInstance&&a.scrollableViewProperties.isOverlayClipped&&this._tooltipInstance.isVisible()&&this._ngZone.run(()=>this.hide(0))}),this._overlayRef=Sn(this._injector,{direction:this._dir,positionStrategy:r,panelClass:this._overlayPanelClass?[...this._overlayPanelClass,o]:o,scrollStrategy:this._injector.get(Hc)(),disableAnimations:this._animationsDisabled,eventPredicate:this._overlayEventPredicate}),this._updatePosition(this._overlayRef),this._overlayRef.detachments().pipe(lc$1(this._destroyed)).subscribe(()=>this._detach()),this._overlayRef.outsidePointerEvents().pipe(lc$1(this._destroyed)).subscribe(()=>this._tooltipInstance?._handleBodyInteraction()),this._overlayRef.keydownEvents().pipe(lc$1(this._destroyed)).subscribe(a=>{a.preventDefault(),a.stopPropagation(),this._ngZone.run(()=>this.hide(0))}),this._defaultOptions?.disableTooltipInteractivity&&this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`),this._dirSubscribed||(this._dirSubscribed=!0,this._dir.change.pipe(lc$1(this._destroyed)).subscribe(()=>{this._overlayRef&&this._updatePosition(this._overlayRef)})),this._overlayRef}_detach(){this._overlayRef&&this._overlayRef.hasAttached()&&this._overlayRef.detach(),this._tooltipInstance=null}_updatePosition(e){let t=e.getConfig().positionStrategy,o=this._getOrigin(),r=this._getOverlayPosition();t.withPositions([this._addOffset(y(y({},o.main),r.main)),this._addOffset(y(y({},o.fallback),r.fallback))])}_addOffset(e){let t=$c,o=!this._dir||this._dir.value==`ltr`;return e.originY===`top`?e.offsetY=-t:e.originY===`bottom`?e.offsetY=t:e.originX===`start`?e.offsetX=o?-t:t:e.originX===`end`&&(e.offsetX=o?t:-t),e}_getOrigin(){let e=!this._dir||this._dir.value==`ltr`,t=this.position,o;t==`above`||t==`below`?o={originX:`center`,originY:t==`above`?`top`:`bottom`}:t==`before`||t==`left`&&e||t==`right`&&!e?o={originX:`start`,originY:`center`}:(t==`after`||t==`right`&&e||t==`left`&&!e)&&(o={originX:`end`,originY:`center`});let{x:r,y:a}=this._invertPosition(o.originX,o.originY);return{main:o,fallback:{originX:r,originY:a}}}_getOverlayPosition(){let e=!this._dir||this._dir.value==`ltr`,t=this.position,o;t==`above`?o={overlayX:`center`,overlayY:`bottom`}:t==`below`?o={overlayX:`center`,overlayY:`top`}:t==`before`||t==`left`&&e||t==`right`&&!e?o={overlayX:`end`,overlayY:`center`}:(t==`after`||t==`right`&&e||t==`left`&&!e)&&(o={overlayX:`start`,overlayY:`center`});let{x:r,y:a}=this._invertPosition(o.overlayX,o.overlayY);return{main:o,fallback:{overlayX:r,overlayY:a}}}_updateTooltipMessage(){this._tooltipInstance&&(this._tooltipInstance.message=this.message,this._tooltipInstance._markForCheck(),sw(()=>{this._tooltipInstance&&this._overlayRef.updatePosition()},{injector:this._injector}))}_setTooltipClass(e){this._tooltipInstance&&(this._tooltipInstance.tooltipClass=e instanceof Set?Array.from(e):e,this._tooltipInstance._markForCheck())}_invertPosition(e,t){return this.position===`above`||this.position===`below`?t===`top`?t=`bottom`:t===`bottom`&&(t=`top`):e===`end`?e=`start`:e===`start`&&(e=`end`),{x:e,y:t}}_updateCurrentPositionClass(e){let{overlayY:t,originX:o,originY:r}=e,a;if(t===`center`?this._dir&&this._dir.value===`rtl`?a=o===`end`?`left`:`right`:a=o===`start`?`left`:`right`:a=t===`bottom`&&r===`top`?`above`:`below`,a!==this._currentPosition){let s=this._overlayRef;if(s){let c=`${this._cssClassPrefix}-${Ms}-`;s.removePanelClass(c+this._currentPosition),s.addPanelClass(c+a)}this._currentPosition=a}}_setupPointerEnterEventsIfNeeded(){this._disabled||!this.message||!this._viewInitialized||this._eventCleanups.length||(this._isTouchPlatform()?this.touchGestures!==`off`&&(this._disableNativeGesturesIfNecessary(),this._addListener(`touchstart`,e=>{let t=e.targetTouches?.[0],o=t?{x:t.clientX,y:t.clientY}:void 0;this._setupPointerExitEventsIfNeeded(),this._touchstartTimeout&&clearTimeout(this._touchstartTimeout);let r=500;this._touchstartTimeout=setTimeout(()=>{this._touchstartTimeout=null,this.show(void 0,o)},this._defaultOptions?.touchLongPressShowDelay??r)})):this._addListener(`mouseenter`,e=>{this._setupPointerExitEventsIfNeeded();let t;e.x!==void 0&&e.y!==void 0&&(t=e),this.show(void 0,t)}))}_setupPointerExitEventsIfNeeded(){if(!this._pointerExitEventsInitialized){if(this._pointerExitEventsInitialized=!0,!this._isTouchPlatform())this._addListener(`mouseleave`,e=>{let t=e.relatedTarget;(!t||!this._overlayRef?.overlayElement.contains(t))&&this.hide()}),this._addListener(`wheel`,e=>{if(this._isTooltipVisible()){let t=this._document.elementFromPoint(e.clientX,e.clientY),o=this._elementRef.nativeElement;t!==o&&!o.contains(t)&&this.hide()}});else if(this.touchGestures!==`off`){this._disableNativeGesturesIfNecessary();let e=()=>{this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this.hide(this._defaultOptions?.touchendHideDelay)};this._addListener(`touchend`,e),this._addListener(`touchcancel`,e)}}}_addListener(e,t){this._eventCleanups.push(this._renderer.listen(this._elementRef.nativeElement,e,t,Uc))}_isTouchPlatform(){let e=this._defaultOptions?.detectHoverCapability;return typeof e==`function`?!e():this._platform.IOS||this._platform.ANDROID?!0:this._platform.isBrowser?!!e&&this._mediaMatcher.matchMedia(`(any-hover: none)`).matches:!1}_disableNativeGesturesIfNecessary(){let e=this.touchGestures;if(e!==`off`){let t=this._elementRef.nativeElement,o=t.style;(e===`on`||t.nodeName!==`INPUT`&&t.nodeName!==`TEXTAREA`)&&(o.userSelect=o.msUserSelect=o.webkitUserSelect=o.MozUserSelect=`none`),(e===`on`||!t.draggable)&&(o.webkitUserDrag=`none`),o.touchAction=`none`,o.webkitTapHighlightColor=`transparent`}}_syncAriaDescription(e){this._ariaDescriptionPending||(this._ariaDescriptionPending=!0,this._ariaDescriber.removeDescription(this._elementRef.nativeElement,e,`tooltip`),this._isDestroyed||sw({write:()=>{this._ariaDescriptionPending=!1,this.message&&!this.disabled&&this._ariaDescriber.describe(this._elementRef.nativeElement,this.message,`tooltip`)}},{injector:this._injector}))}_overlayEventPredicate=e=>e.type===`keydown`?this._isTooltipVisible()&&e.keyCode===27&&!$e(e):!0;static ɵfac=function(t){return new(t||i)};static ɵdir=Tr({type:i,selectors:[[``,`matTooltip`,``]],hostAttrs:[1,`mat-mdc-tooltip-trigger`],hostVars:2,hostBindings:function(t,o){t&2&&Xs$1(`mat-mdc-tooltip-disabled`,o.disabled)},inputs:{position:[0,`matTooltipPosition`,`position`],positionAtOrigin:[0,`matTooltipPositionAtOrigin`,`positionAtOrigin`],disabled:[0,`matTooltipDisabled`,`disabled`],showDelay:[0,`matTooltipShowDelay`,`showDelay`],hideDelay:[0,`matTooltipHideDelay`,`hideDelay`],touchGestures:[0,`matTooltipTouchGestures`,`touchGestures`],message:[0,`matTooltip`,`message`],tooltipClass:[0,`matTooltipClass`,`tooltipClass`]},exportAs:[`matTooltip`]})}return i})();var Ns=(()=>{class i{_changeDetectorRef=h(oa$1);_elementRef=h(et);_isMultiline=!1;message;tooltipClass;_showTimeoutId;_hideTimeoutId;_triggerElement;_mouseLeaveHideDelay;_animationsDisabled=Ce();_tooltip;_closeOnInteraction=!1;_isVisible=!1;_onHide=new B;_showAnimation=`mat-mdc-tooltip-show`;_hideAnimation=`mat-mdc-tooltip-hide`;show(e){this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=setTimeout(()=>{this._toggleVisibility(!0),this._showTimeoutId=void 0},e)}hide(e){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId=setTimeout(()=>{this._toggleVisibility(!1),this._hideTimeoutId=void 0},e)}afterHidden(){return this._onHide}isVisible(){return this._isVisible}ngOnDestroy(){this._cancelPendingAnimations(),this._onHide.complete(),this._triggerElement=null}_handleBodyInteraction(){this._closeOnInteraction&&this.hide(0)}_markForCheck(){this._changeDetectorRef.markForCheck()}_handleMouseLeave({relatedTarget:e}){(!e||!this._triggerElement.contains(e))&&(this.isVisible()?this.hide(this._mouseLeaveHideDelay):this._finalizeAnimation(!1))}_onShow(){this._isMultiline=this._isTooltipMultiline(),this._markForCheck()}_isTooltipMultiline(){let e=this._elementRef.nativeElement.getBoundingClientRect();return e.height>qc&&e.width>=Xc}_handleAnimationEnd({animationName:e}){(e===this._showAnimation||e===this._hideAnimation)&&this._finalizeAnimation(e===this._showAnimation)}_cancelPendingAnimations(){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=this._hideTimeoutId=void 0}_finalizeAnimation(e){e?this._closeOnInteraction=!0:this.isVisible()||this._onHide.next()}_toggleVisibility(e){let t=this._tooltip.nativeElement,o=this._showAnimation,r=this._hideAnimation;if(t.classList.remove(e?r:o),t.classList.add(e?o:r),this._isVisible!==e&&(this._isVisible=e,this._changeDetectorRef.markForCheck()),e&&!this._animationsDisabled&&typeof getComputedStyle==`function`){let a=getComputedStyle(t);(a.getPropertyValue(`animation-duration`)===`0s`||a.getPropertyValue(`animation-name`)===`none`)&&(this._animationsDisabled=!0)}e&&this._onShow(),this._animationsDisabled&&(t.classList.add(`_mat-animation-noopable`),this._finalizeAnimation(e))}static ɵfac=function(t){return new(t||i)};static ɵcmp=(function(){let e=[`tooltip`];return On$1({type:i,selectors:[[`mat-tooltip-component`]],viewQuery:function(o,r){if(o&1&&_m(e,7),o&2){let a;NC(a=AC())&&(r._tooltip=a.first)}},hostAttrs:[`aria-hidden`,`true`],hostBindings:function(o,r){o&1&&Cm(`mouseleave`,function(s){return r._handleMouseLeave(s)})},decls:4,vars:5,consts:[[`tooltip`,``],[1,`mdc-tooltip`,`mat-mdc-tooltip`,3,`animationend`],[1,`mat-mdc-tooltip-surface`,`mdc-tooltip__surface`]],template:function(o,r){o&1&&(Zl$1(0,`div`,1,0),Tm(`animationend`,function(s){return r._handleAnimationEnd(s)}),Zl$1(2,`div`,2),XC(3),Kl()()),o&2&&(Xl$1(r.tooltipClass),Xs$1(`mdc-tooltip--multiline`,r._isMultiline),Sw(3),jm(r.message))},styles:[`.mat-mdc-tooltip {
  position: relative;
  transform: scale(0);
  display: inline-flex;
}
.mat-mdc-tooltip::before {
  content: "";
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  position: absolute;
}
.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before {
  top: -8px;
}
.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before {
  bottom: -8px;
}
.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before {
  left: -8px;
}
.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before {
  right: -8px;
}
.mat-mdc-tooltip._mat-animation-noopable {
  animation: none;
  transform: scale(1);
}

.mat-mdc-tooltip-surface {
  word-break: normal;
  overflow-wrap: anywhere;
  padding: 4px 8px;
  min-width: 40px;
  max-width: 200px;
  min-height: 24px;
  max-height: 40vh;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
  will-change: transform, opacity;
  background-color: var(--%NS%mat-tooltip-container-color, var(--%NS%mat-sys-inverse-surface));
  color: var(--%NS%mat-tooltip-supporting-text-color, var(--%NS%mat-sys-inverse-on-surface));
  border-radius: var(--%NS%mat-tooltip-container-shape, var(--%NS%mat-sys-corner-extra-small));
  font-family: var(--%NS%mat-tooltip-supporting-text-font, var(--%NS%mat-sys-body-small-font));
  font-size: var(--%NS%mat-tooltip-supporting-text-size, var(--%NS%mat-sys-body-small-size));
  font-weight: var(--%NS%mat-tooltip-supporting-text-weight, var(--%NS%mat-sys-body-small-weight));
  line-height: var(--%NS%mat-tooltip-supporting-text-line-height, var(--%NS%mat-sys-body-small-line-height));
  letter-spacing: var(--%NS%mat-tooltip-supporting-text-tracking, var(--%NS%mat-sys-body-small-tracking));
}
.mat-mdc-tooltip-surface::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}
.mdc-tooltip--multiline .mat-mdc-tooltip-surface {
  text-align: left;
}
[dir=rtl] .mdc-tooltip--multiline .mat-mdc-tooltip-surface {
  text-align: right;
}

.mat-mdc-tooltip-panel {
  line-height: normal;
}
.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive {
  pointer-events: none;
}

@keyframes mat-mdc-tooltip-show {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes mat-mdc-tooltip-hide {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
}
.mat-mdc-tooltip-show {
  animation: mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards;
}

.mat-mdc-tooltip-hide {
  animation: mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards;
}
`],encapsulation:2})})()}return i})();var Oi=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵmod=$e$1({type:i});static ɵinj=Se({imports:[yo,wn,bv,at]})}return i})();var Kc={capture:!0};var Yc=[`focus`,`mousedown`,`mouseenter`,`touchstart`];var Xo=`mat-ripple-loader-uninitialized`;var Ko=`mat-ripple-loader-class-name`;var Os=`mat-ripple-loader-centered`;var Ri=`mat-ripple-loader-disabled`;var Rs=(()=>{class i{_document=h(H);_animationsDisabled=Ce();_globalRippleOptions=h(Vo,{optional:!0});_platform=h(ee);_ngZone=h(ee$1);_injector=h(G);_eventCleanups;_hosts=new Map;constructor(){let e=h(Mn$1).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>Yc.map(t=>e.listen(this._document,t,this._onInteraction,Kc)))}ngOnDestroy(){let e=this._hosts.keys();for(let t of e)this.destroyRipple(t);this._eventCleanups.forEach(t=>t())}configureRipple(e,t){e.setAttribute(Xo,this._globalRippleOptions?.namespace??``),(t.className||!e.hasAttribute(Ko))&&e.setAttribute(Ko,t.className||``),t.centered&&e.setAttribute(Os,``),t.disabled&&e.setAttribute(Ri,``)}setDisabled(e,t){let o=this._hosts.get(e);o?(o.target.rippleDisabled=t,!t&&!o.hasSetUpEvents&&(o.hasSetUpEvents=!0,o.renderer.setupTriggerEvents(e))):t?e.setAttribute(Ri,``):e.removeAttribute(Ri)}_onInteraction=e=>{let t=de(e);if(t instanceof HTMLElement){let o=t.closest(`[${Xo}="${this._globalRippleOptions?.namespace??``}"]`);o&&this._createRipple(o)}};_createRipple(e){if(!this._document||this._hosts.has(e))return;e.querySelector(`.mat-ripple`)?.remove();let t=this._document.createElement(`span`);t.classList.add(`mat-ripple`,e.getAttribute(Ko)),e.append(t);let o=this._globalRippleOptions,r=this._animationsDisabled?0:o?.animation?.enterDuration??fn.enterDuration,a=this._animationsDisabled?0:o?.animation?.exitDuration??fn.exitDuration,s={rippleDisabled:this._animationsDisabled||o?.disabled||e.hasAttribute(Ri),rippleConfig:{centered:e.hasAttribute(Os),terminateOnPointerUp:o?.terminateOnPointerUp,animation:{enterDuration:r,exitDuration:a}}},c=new bn(s,this._ngZone,t,this._platform,this._injector),h=!s.rippleDisabled;h&&c.setupTriggerEvents(e),this._hosts.set(e,{target:s,renderer:c,hasSetUpEvents:h}),e.removeAttribute(Xo)}destroyRipple(e){let t=this._hosts.get(e);t&&(t.renderer._removeTriggerEvents(),this._hosts.delete(e))}static ɵfac=function(t){return new(t||i)};static ɵprov=he$1({token:i,factory:i.ɵfac})}return i})();var Zc=new m(`MAT_BUTTON_CONFIG`);function As(i){return i==null?void 0:i2(i)}var Yo=(()=>{class i{_elementRef=h(et);_ngZone=h(ee$1);_animationsDisabled=Ce();_config=h(Zc,{optional:!0});_focusMonitor=h(on);_cleanupClick;_renderer=h(Dr);_rippleLoader=h(Rs);_isAnchor;_isFab=!1;color;get disableRipple(){return this._disableRipple}set disableRipple(e){this._disableRipple=e,this._updateRippleDisabled()}_disableRipple=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._updateRippleDisabled()}_disabled=!1;ariaDisabled;disabledInteractive;tabIndex;set _tabindex(e){this.tabIndex=e}showProgress=t2(!1,{transform:Jm});constructor(){h(DM).load(Ht);let e=this._elementRef.nativeElement;this._isAnchor=e.tagName===`A`,this.disabledInteractive=this._config?.disabledInteractive??!1,this.color=this._config?.color??null,this._rippleLoader?.configureRipple(e,{className:`mat-mdc-button-ripple`})}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0),this._isAnchor&&this._setupAsAnchor()}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement)}focus(e=`program`,t){e?this._focusMonitor.focusVia(this._elementRef.nativeElement,e,t):this._elementRef.nativeElement.focus(t)}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this._isAnchor?this.disabled||null:this.disabled&&this.disabledInteractive?!0:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:!0}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled)}_getTabIndex(){return this._isAnchor?this.disabled&&!this.disabledInteractive?-1:this.tabIndex:this.tabIndex}_setupAsAnchor(){this._cleanupClick=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,`click`,e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}))}static ɵfac=function(t){return new(t||i)};static ɵdir=Tr({type:i,hostAttrs:[1,`mat-mdc-button-base`],hostVars:15,hostBindings:function(t,o){t&2&&(Po$1(`disabled`,o._getDisabledAttribute())(`aria-disabled`,o._getAriaDisabled())(`tabindex`,o._getTabIndex()),Xl$1(o.color?`mat-`+o.color:``),Xs$1(`mat-mdc-button-progress-indicator-shown`,o.showProgress())(`mat-mdc-button-disabled`,o.disabled)(`mat-mdc-button-disabled-interactive`,o.disabledInteractive)(`mat-unthemed`,!o.color)(`_mat-animation-noopable`,o._animationsDisabled))},inputs:{color:`color`,disableRipple:[2,`disableRipple`,`disableRipple`,Jm],disabled:[2,`disabled`,`disabled`,Jm],ariaDisabled:[2,`aria-disabled`,`ariaDisabled`,Jm],disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,Jm],tabIndex:[2,`tabIndex`,`tabIndex`,As],_tabindex:[2,`tabindex`,`_tabindex`,As],showProgress:[1,`showProgress`]}})}return i})();var Zo=(()=>{class i extends Yo{constructor(){super(),this._rippleLoader.configureRipple(this._elementRef.nativeElement,{centered:!0})}static ɵfac=function(t){return new(t||i)};static ɵcmp=(function(){let e=[`*`,[[``,`progressIndicator`,``]]],t=[`*`,`[progressIndicator]`];function o(r,a){r&1&&(Zl$1(0,`div`,1),Jl$1(1,1),Kl())}return On$1({type:i,selectors:[[`button`,`mat-icon-button`,``],[`a`,`mat-icon-button`,``],[`button`,`matIconButton`,``],[`a`,`matIconButton`,``]],hostAttrs:[1,`mdc-icon-button`,`mat-mdc-icon-button`],exportAs:[`matButton`,`matAnchor`],features:[fm],ngContentSelectors:t,decls:5,vars:1,consts:[[1,`mat-mdc-button-persistent-ripple`,`mdc-icon-button__ripple`],[1,`mat-mdc-button-progress-indicator-container`],[1,`mat-focus-indicator`],[1,`mat-mdc-button-touch-target`]],template:function(a,s){a&1&&(Ql$1(e),Qs$1(0,`span`,0),Jl$1(1),dC(2,o,2,0,`div`,1),Qs$1(3,`span`,2)(4,`span`,3)),a&2&&(Sw(2),pC(s.showProgress()?2:-1))},styles:[`.mat-mdc-icon-button {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: transparent;
  fill: currentColor;
  text-decoration: none;
  cursor: pointer;
  z-index: 0;
  overflow: visible;
  border-radius: var(--%NS%mat-icon-button-container-shape, var(--%NS%mat-sys-corner-full, 50%));
  flex-shrink: 0;
  text-align: center;
  width: var(--%NS%mat-icon-button-state-layer-size, 40px);
  height: var(--%NS%mat-icon-button-state-layer-size, 40px);
  padding: calc(calc(var(--%NS%mat-icon-button-state-layer-size, 40px) - var(--%NS%mat-icon-button-icon-size, 24px)) / 2);
  font-size: var(--%NS%mat-icon-button-icon-size, 24px);
  color: var(--%NS%mat-icon-button-icon-color, var(--%NS%mat-sys-on-surface-variant));
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-icon-button .mat-mdc-button-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-icon-button .mdc-button__label,
.mat-mdc-icon-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-icon-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-icon-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-ripple-element {
  background-color: var(--%NS%mat-icon-button-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface-variant) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-icon-button-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-icon-button-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-icon-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-icon-button-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-icon-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-icon-button-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-mdc-icon-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-icon-button-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-icon-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--%NS%mat-icon-button-touch-target-size, 48px);
  display: var(--%NS%mat-icon-button-touch-target-display, block);
  left: 50%;
  width: var(--%NS%mat-icon-button-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-icon-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-icon-button[disabled], .mat-mdc-icon-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--%NS%mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-icon-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-icon-button img,
.mat-mdc-icon-button svg {
  width: var(--%NS%mat-icon-button-icon-size, 24px);
  height: var(--%NS%mat-icon-button-icon-size, 24px);
  vertical-align: baseline;
}
.mat-mdc-icon-button .mat-mdc-button-progress-indicator-container .mdc-circular-progress__determinate-circle-graphic {
  width: inherit;
  height: inherit;
}
.mat-mdc-icon-button .mat-mdc-button-progress-indicator-container .mdc-circular-progress__indeterminate-circle-graphic {
  height: 100%;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple {
  border-radius: var(--%NS%mat-icon-button-container-shape, var(--%NS%mat-sys-corner-full, 50%));
}
.mat-mdc-icon-button[hidden] {
  display: none;
}
.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before {
  background: transparent;
  opacity: 1;
}

.mat-mdc-button-progress-indicator-container {
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.mat-mdc-button-progress-indicator-shown mat-icon {
  visibility: hidden;
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2})})()}return i})();var Ai=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵmod=$e$1({type:i});static ɵinj=Se({imports:[bv]})}return i})();var Ts=new Map([[`text`,[`mat-mdc-button`]],[`filled`,[`mdc-button--unelevated`,`mat-mdc-unelevated-button`]],[`elevated`,[`mdc-button--raised`,`mat-mdc-raised-button`]],[`outlined`,[`mdc-button--outlined`,`mat-mdc-outlined-button`]],[`tonal`,[`mat-tonal-button`]]]);var Ti=(()=>{class i extends Yo{get appearance(){return this._appearance}set appearance(e){this.setAppearance(e||this._config?.defaultAppearance||`text`)}_appearance=null;constructor(){super();let e=Qc(this._elementRef.nativeElement);e&&this.setAppearance(e)}setAppearance(e){if(e===this._appearance)return;let t=this._elementRef.nativeElement.classList,o=this._appearance?Ts.get(this._appearance):null,r=Ts.get(e);o&&t.remove(...o),t.add(...r),this._appearance=e}static ɵfac=function(t){return new(t||i)};static ɵcmp=(function(){let e=[[[``,8,`material-icons`,3,`iconPositionEnd`,``],[`mat-icon`,3,`iconPositionEnd`,``],[``,`matButtonIcon`,``,3,`iconPositionEnd`,``],[``,8,`material-symbols-outlined`,3,`iconPositionEnd`,``],[``,8,`material-symbols-rounded`,3,`iconPositionEnd`,``],[``,8,`material-symbols-sharp`,3,`iconPositionEnd`,``]],`*`,[[``,`iconPositionEnd`,``,8,`material-icons`],[`mat-icon`,`iconPositionEnd`,``],[``,`matButtonIcon`,``,`iconPositionEnd`,``],[``,`iconPositionEnd`,``,8,`material-symbols-outlined`],[``,`iconPositionEnd`,``,8,`material-symbols-rounded`],[``,`iconPositionEnd`,``,8,`material-symbols-sharp`]],[[``,`progressIndicator`,``]]],t=[`.material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd]), .material-symbols-outlined:not([iconPositionEnd]), .material-symbols-rounded:not([iconPositionEnd]), .material-symbols-sharp:not([iconPositionEnd])`,`*`,`.material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd], .material-symbols-outlined[iconPositionEnd], .material-symbols-rounded[iconPositionEnd], .material-symbols-sharp[iconPositionEnd]`,`[progressIndicator]`];function o(r,a){r&1&&(Zl$1(0,`div`,2),Jl$1(1,3),Kl())}return On$1({type:i,selectors:[[`button`,`matButton`,``],[`a`,`matButton`,``],[`button`,`mat-button`,``],[`button`,`mat-raised-button`,``],[`button`,`mat-flat-button`,``],[`button`,`mat-stroked-button`,``],[`a`,`mat-button`,``],[`a`,`mat-raised-button`,``],[`a`,`mat-flat-button`,``],[`a`,`mat-stroked-button`,``]],hostAttrs:[1,`mdc-button`],inputs:{appearance:[0,`matButton`,`appearance`]},exportAs:[`matButton`,`matAnchor`],features:[fm],ngContentSelectors:t,decls:8,vars:5,consts:[[1,`mat-mdc-button-persistent-ripple`],[1,`mdc-button__label`],[1,`mat-mdc-button-progress-indicator-container`],[1,`mat-focus-indicator`],[1,`mat-mdc-button-touch-target`]],template:function(a,s){a&1&&(Ql$1(e),Qs$1(0,`span`,0),Jl$1(1),Zl$1(2,`span`,1),Jl$1(3,1),Kl(),Jl$1(4,2),dC(5,o,2,0,`div`,2),Qs$1(6,`span`,3)(7,`span`,4)),a&2&&(Xs$1(`mdc-button__ripple`,!s._isFab)(`mdc-fab__ripple`,s._isFab),Sw(5),pC(s.showProgress()?5:-1))},styles:[`.mat-mdc-button-base {
  text-decoration: none;
}
.mat-mdc-button-base .mat-icon {
  min-height: fit-content;
  flex-shrink: 0;
}
@media (hover: none) {
  .mat-mdc-button-base:hover > span.mat-mdc-button-persistent-ripple::before {
    opacity: 0;
  }
}

.mdc-button {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 64px;
  border: none;
  outline: none;
  line-height: inherit;
  -webkit-appearance: none;
  overflow: visible;
  vertical-align: middle;
  background: transparent;
  padding: 0 8px;
}
.mdc-button::-moz-focus-inner {
  padding: 0;
  border: 0;
}
.mdc-button:active {
  outline: none;
}
.mdc-button:hover {
  cursor: pointer;
}
.mdc-button:disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-button[hidden] {
  display: none;
}
.mdc-button .mdc-button__label {
  position: relative;
}

.mat-mdc-button {
  padding: 0 var(--%NS%mat-button-text-horizontal-padding, 12px);
  height: var(--%NS%mat-button-text-container-height, 40px);
  font-family: var(--%NS%mat-button-text-label-text-font, var(--%NS%mat-sys-label-large-font));
  font-size: var(--%NS%mat-button-text-label-text-size, var(--%NS%mat-sys-label-large-size));
  letter-spacing: var(--%NS%mat-button-text-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  text-transform: var(--%NS%mat-button-text-label-text-transform);
  font-weight: var(--%NS%mat-button-text-label-text-weight, var(--%NS%mat-sys-label-large-weight));
}
.mat-mdc-button, .mat-mdc-button .mdc-button__ripple {
  border-radius: var(--%NS%mat-button-text-container-shape, var(--%NS%mat-sys-corner-full));
}
.mat-mdc-button:not(:disabled) {
  color: var(--%NS%mat-button-text-label-text-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-button[disabled], .mat-mdc-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--%NS%mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-button:has(.material-icons, .material-symbols-outlined, .material-symbols-rounded,
.material-symbols-sharp, mat-icon, [matButtonIcon]) {
  padding: 0 var(--%NS%mat-button-text-with-icon-horizontal-padding, 16px);
}
.mat-mdc-button > .mat-icon {
  margin-right: var(--%NS%mat-button-text-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-text-icon-offset, -4px);
}
[dir=rtl] .mat-mdc-button > .mat-icon {
  margin-right: var(--%NS%mat-button-text-icon-offset, -4px);
  margin-left: var(--%NS%mat-button-text-icon-spacing, 8px);
}
.mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-text-icon-offset, -4px);
  margin-left: var(--%NS%mat-button-text-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-text-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-text-icon-offset, -4px);
}
.mat-mdc-button .mat-ripple-element {
  background-color: var(--%NS%mat-button-text-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-primary) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-text-state-layer-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-text-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-text-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-text-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-mdc-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-text-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--%NS%mat-button-text-touch-target-size, 48px);
  display: var(--%NS%mat-button-text-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-unelevated-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--%NS%mat-button-filled-container-height, 40px);
  font-family: var(--%NS%mat-button-filled-label-text-font, var(--%NS%mat-sys-label-large-font));
  font-size: var(--%NS%mat-button-filled-label-text-size, var(--%NS%mat-sys-label-large-size));
  letter-spacing: var(--%NS%mat-button-filled-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  text-transform: var(--%NS%mat-button-filled-label-text-transform);
  font-weight: var(--%NS%mat-button-filled-label-text-weight, var(--%NS%mat-sys-label-large-weight));
  padding: 0 var(--%NS%mat-button-filled-horizontal-padding, 24px);
}
.mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--%NS%mat-button-filled-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-filled-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--%NS%mat-button-filled-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-filled-icon-spacing, 8px);
}
.mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-filled-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-filled-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-filled-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-filled-icon-offset, -8px);
}
.mat-mdc-unelevated-button .mat-ripple-element {
  background-color: var(--%NS%mat-button-filled-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-primary) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-filled-state-layer-color, var(--%NS%mat-sys-on-primary));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-filled-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-unelevated-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-filled-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-unelevated-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-filled-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-mdc-unelevated-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-filled-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-unelevated-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--%NS%mat-button-filled-touch-target-size, 48px);
  display: var(--%NS%mat-button-filled-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-unelevated-button:not(:disabled) {
  color: var(--%NS%mat-button-filled-label-text-color, var(--%NS%mat-sys-on-primary));
  background-color: var(--%NS%mat-button-filled-container-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-unelevated-button, .mat-mdc-unelevated-button .mdc-button__ripple {
  border-radius: var(--%NS%mat-button-filled-container-shape, var(--%NS%mat-sys-corner-full));
}
.mat-mdc-unelevated-button .mat-mdc-button-progress-indicator-container {
  --%NS%mat-progress-spinner-active-indicator-color: var(--%NS%mat-button-filled-progress-active-indicator-color, var(--%NS%mat-sys-on-primary));
}
.mat-mdc-unelevated-button[disabled], .mat-mdc-unelevated-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--%NS%mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  background-color: var(--%NS%mat-button-filled-disabled-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-raised-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--%NS%mat-button-protected-container-elevation-shadow, var(--%NS%mat-sys-level1));
  height: var(--%NS%mat-button-protected-container-height, 40px);
  font-family: var(--%NS%mat-button-protected-label-text-font, var(--%NS%mat-sys-label-large-font));
  font-size: var(--%NS%mat-button-protected-label-text-size, var(--%NS%mat-sys-label-large-size));
  letter-spacing: var(--%NS%mat-button-protected-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  text-transform: var(--%NS%mat-button-protected-label-text-transform);
  font-weight: var(--%NS%mat-button-protected-label-text-weight, var(--%NS%mat-sys-label-large-weight));
  padding: 0 var(--%NS%mat-button-protected-horizontal-padding, 24px);
}
.mat-mdc-raised-button > .mat-icon {
  margin-right: var(--%NS%mat-button-protected-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-protected-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-raised-button > .mat-icon {
  margin-right: var(--%NS%mat-button-protected-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-protected-icon-spacing, 8px);
}
.mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-protected-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-protected-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-protected-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-protected-icon-offset, -8px);
}
.mat-mdc-raised-button .mat-ripple-element {
  background-color: var(--%NS%mat-button-protected-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-primary) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-protected-state-layer-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-protected-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-raised-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-protected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-raised-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-protected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-mdc-raised-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-protected-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-raised-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--%NS%mat-button-protected-touch-target-size, 48px);
  display: var(--%NS%mat-button-protected-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-raised-button:not(:disabled) {
  color: var(--%NS%mat-button-protected-label-text-color, var(--%NS%mat-sys-primary));
  background-color: var(--%NS%mat-button-protected-container-color, var(--%NS%mat-sys-surface));
}
.mat-mdc-raised-button, .mat-mdc-raised-button .mdc-button__ripple {
  border-radius: var(--%NS%mat-button-protected-container-shape, var(--%NS%mat-sys-corner-full));
}
@media (hover: hover) {
  .mat-mdc-raised-button:hover {
    box-shadow: var(--%NS%mat-button-protected-hover-container-elevation-shadow, var(--%NS%mat-sys-level2));
  }
}
.mat-mdc-raised-button:focus {
  box-shadow: var(--%NS%mat-button-protected-focus-container-elevation-shadow, var(--%NS%mat-sys-level1));
}
.mat-mdc-raised-button:active, .mat-mdc-raised-button:focus:active {
  box-shadow: var(--%NS%mat-button-protected-pressed-container-elevation-shadow, var(--%NS%mat-sys-level1));
}
.mat-mdc-raised-button[disabled], .mat-mdc-raised-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--%NS%mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  background-color: var(--%NS%mat-button-protected-disabled-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-raised-button[disabled].mat-mdc-button-disabled, .mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled {
  box-shadow: var(--%NS%mat-button-protected-disabled-container-elevation-shadow, var(--%NS%mat-sys-level0));
}
.mat-mdc-raised-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-outlined-button {
  border-style: solid;
  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--%NS%mat-button-outlined-container-height, 40px);
  font-family: var(--%NS%mat-button-outlined-label-text-font, var(--%NS%mat-sys-label-large-font));
  font-size: var(--%NS%mat-button-outlined-label-text-size, var(--%NS%mat-sys-label-large-size));
  letter-spacing: var(--%NS%mat-button-outlined-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  text-transform: var(--%NS%mat-button-outlined-label-text-transform);
  font-weight: var(--%NS%mat-button-outlined-label-text-weight, var(--%NS%mat-sys-label-large-weight));
  border-radius: var(--%NS%mat-button-outlined-container-shape, var(--%NS%mat-sys-corner-full));
  border-width: var(--%NS%mat-button-outlined-outline-width, 1px);
  padding: 0 var(--%NS%mat-button-outlined-horizontal-padding, 24px);
}
.mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--%NS%mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-outlined-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--%NS%mat-button-outlined-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-outlined-icon-spacing, 8px);
}
.mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-outlined-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-outlined-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-outlined-icon-offset, -8px);
}
.mat-mdc-outlined-button .mat-ripple-element {
  background-color: var(--%NS%mat-button-outlined-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-primary) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-outlined-state-layer-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-outlined-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-outlined-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-outlined-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-outlined-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-outlined-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-mdc-outlined-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-outlined-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-outlined-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--%NS%mat-button-outlined-touch-target-size, 48px);
  display: var(--%NS%mat-button-outlined-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-outlined-button:not(:disabled) {
  color: var(--%NS%mat-button-outlined-label-text-color, var(--%NS%mat-sys-primary));
  border-color: var(--%NS%mat-button-outlined-outline-color, var(--%NS%mat-sys-outline));
}
.mat-mdc-outlined-button[disabled], .mat-mdc-outlined-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--%NS%mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  border-color: var(--%NS%mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-tonal-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--%NS%mat-button-tonal-container-height, 40px);
  font-family: var(--%NS%mat-button-tonal-label-text-font, var(--%NS%mat-sys-label-large-font));
  font-size: var(--%NS%mat-button-tonal-label-text-size, var(--%NS%mat-sys-label-large-size));
  letter-spacing: var(--%NS%mat-button-tonal-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  text-transform: var(--%NS%mat-button-tonal-label-text-transform);
  font-weight: var(--%NS%mat-button-tonal-label-text-weight, var(--%NS%mat-sys-label-large-weight));
  padding: 0 var(--%NS%mat-button-tonal-horizontal-padding, 24px);
}
.mat-tonal-button:not(:disabled) {
  color: var(--%NS%mat-button-tonal-label-text-color, var(--%NS%mat-sys-on-secondary-container));
  background-color: var(--%NS%mat-button-tonal-container-color, var(--%NS%mat-sys-secondary-container));
}
.mat-tonal-button, .mat-tonal-button .mdc-button__ripple {
  border-radius: var(--%NS%mat-button-tonal-container-shape, var(--%NS%mat-sys-corner-full));
}
.mat-tonal-button[disabled], .mat-tonal-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--%NS%mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  background-color: var(--%NS%mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mat-tonal-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-tonal-button > .mat-icon {
  margin-right: var(--%NS%mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-tonal-icon-offset, -8px);
}
[dir=rtl] .mat-tonal-button > .mat-icon {
  margin-right: var(--%NS%mat-button-tonal-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-tonal-icon-spacing, 8px);
}
.mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-tonal-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-tonal-icon-spacing, 8px);
}
[dir=rtl] .mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-tonal-icon-offset, -8px);
}
.mat-tonal-button .mat-ripple-element {
  background-color: var(--%NS%mat-button-tonal-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-secondary-container) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-tonal-state-layer-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-tonal-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-tonal-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-tonal-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-tonal-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-tonal-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-tonal-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-tonal-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
}
.mat-tonal-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--%NS%mat-button-tonal-touch-target-size, 48px);
  display: var(--%NS%mat-button-tonal-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-button,
.mat-mdc-unelevated-button,
.mat-mdc-raised-button,
.mat-mdc-outlined-button,
.mat-tonal-button {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-button .mdc-button__label,
.mat-mdc-button .mat-icon,
.mat-mdc-unelevated-button .mdc-button__label,
.mat-mdc-unelevated-button .mat-icon,
.mat-mdc-raised-button .mdc-button__label,
.mat-mdc-raised-button .mat-icon,
.mat-mdc-outlined-button .mdc-button__label,
.mat-mdc-outlined-button .mat-icon,
.mat-tonal-button .mdc-button__label,
.mat-tonal-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-button .mat-focus-indicator,
.mat-mdc-unelevated-button .mat-focus-indicator,
.mat-mdc-raised-button .mat-focus-indicator,
.mat-mdc-outlined-button .mat-focus-indicator,
.mat-tonal-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-unelevated-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-raised-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-outlined-button:focus-visible > .mat-focus-indicator::before,
.mat-tonal-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-button._mat-animation-noopable,
.mat-mdc-unelevated-button._mat-animation-noopable,
.mat-mdc-raised-button._mat-animation-noopable,
.mat-mdc-outlined-button._mat-animation-noopable,
.mat-tonal-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-button > .mat-icon,
.mat-mdc-unelevated-button > .mat-icon,
.mat-mdc-raised-button > .mat-icon,
.mat-mdc-outlined-button > .mat-icon,
.mat-tonal-button > .mat-icon {
  display: inline-block;
  position: relative;
  vertical-align: top;
  font-size: 1.125rem;
  height: 1.125rem;
  width: 1.125rem;
}

.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mdc-button__ripple {
  top: -1px;
  left: -1px;
  bottom: -1px;
  right: -1px;
}

.mat-mdc-unelevated-button .mat-focus-indicator::before,
.mat-tonal-button .mat-focus-indicator::before,
.mat-mdc-raised-button .mat-focus-indicator::before {
  margin: calc(calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-outlined-button .mat-focus-indicator::before {
  margin: calc(calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 3px) * -1);
}

.mat-mdc-button-progress-indicator-container {
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.mat-mdc-button-progress-indicator-shown mat-icon,
.mat-mdc-button-progress-indicator-shown [matButtonIcon],
.mat-mdc-button-progress-indicator-shown .mdc-button__label {
  visibility: hidden;
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2})})()}return i})();function Qc(i){return i.hasAttribute(`mat-raised-button`)?`elevated`:i.hasAttribute(`mat-stroked-button`)?`outlined`:i.hasAttribute(`mat-flat-button`)?`filled`:i.hasAttribute(`mat-button`)?`text`:null}var Wt=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵmod=$e$1({type:i});static ɵinj=Se({imports:[Ai,bv]})}return i})();var Xe=class i{name=t2.required();static ɵfac=function(e){return new(e||i)};static ɵcmp=On$1({type:i,selectors:[[`bhw-icon`]],hostAttrs:[`aria-hidden`,`true`],inputs:{name:[1,`name`]},decls:1,vars:1,consts:[[3,`svgIcon`]],template:function(e,t){e&1&&Dm(0,`mat-icon`,0),e&2&&vm(`svgIcon`,t.name())},dependencies:[U3,B3],styles:[`[_nghost-%COMP%]{display:inline-flex;flex-shrink:0;width:1.5rem;height:1.5rem;align-items:center;justify-content:center;line-height:0;aspect-ratio:1}mat-icon[_ngcontent-%COMP%]{display:block;width:100%;height:100%;font-size:inherit;line-height:1}`]})};function Jc(i,n){i&1&&Dm(0,`bhw-icon`,4),i&2&&vm(`name`,n)}function ed(i,n){if(i&1){let e=bC();ks$1(0,`button`,2),Cm(`click`,function(){vp(e);let o=SC();return Dp(o.clicked.emit())}),ks$1(1,`span`,3),dC(2,Jc,1,1,`bhw-icon`,4),XC(3),Yl$1()()}if(i&2){let e,t=SC();vm(`disabled`,t.disabled()),Sw(2),pC((e=t.icon())?2:-1,e),Sw(),ed$1(` `,t.label())}}function td(i,n){i&1&&Dm(0,`bhw-icon`,4),i&2&&vm(`name`,n)}function nd(i,n){if(i&1){let e=bC();ks$1(0,`button`,5),Cm(`click`,function(){vp(e);let o=SC();return Dp(o.clicked.emit())}),ks$1(1,`span`,3),dC(2,td,1,1,`bhw-icon`,4),XC(3),Yl$1()()}if(i&2){let e,t=SC();vm(`disabled`,t.disabled()),Sw(2),pC((e=t.icon())?2:-1,e),Sw(),ed$1(` `,t.label())}}var Pi=class i{label=t2.required();disabled=t2(!1);icon=t2(null);appearance=t2(`filled`);block=t2(!1);compact=t2(!1);clicked=e2();static ɵfac=function(e){return new(e||i)};static ɵcmp=On$1({type:i,selectors:[[`bhw-button`]],hostVars:4,hostBindings:function(e,t){e&2&&Xs$1(`block`,t.block())(`compact`,t.compact())},inputs:{label:[1,`label`],disabled:[1,`disabled`],icon:[1,`icon`],appearance:[1,`appearance`],block:[1,`block`],compact:[1,`compact`]},outputs:{clicked:`clicked`},decls:2,vars:1,consts:[[`mat-stroked-button`,``,`type`,`button`,3,`disabled`],[`mat-flat-button`,``,`type`,`button`,3,`disabled`],[`mat-stroked-button`,``,`type`,`button`,3,`click`,`disabled`],[1,`button-content`],[3,`name`],[`mat-flat-button`,``,`type`,`button`,3,`click`,`disabled`]],template:function(e,t){e&1&&dC(0,ed,4,3,`button`,0)(1,nd,4,3,`button`,1),e&2&&pC(t.appearance()===`outlined`?0:1)},dependencies:[Wt,Ti,Xe],styles:[`[_nghost-%COMP%]{display:inline-flex}.block[_nghost-%COMP%]{display:flex;width:100%}.block[_nghost-%COMP%]   button[_ngcontent-%COMP%]{width:100%}button[_ngcontent-%COMP%]{min-height:3rem;border-radius:1rem}bhw-icon[_ngcontent-%COMP%]{width:1.25rem;height:1.25rem}.button-content[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:.5rem;line-height:1.25}.compact[_nghost-%COMP%]   button[_ngcontent-%COMP%]{padding-inline:.375rem;font-size:.875rem}.compact[_nghost-%COMP%]   .button-content[_ngcontent-%COMP%]{gap:.375rem}.compact[_nghost-%COMP%]   bhw-icon[_ngcontent-%COMP%]{width:1.25rem;height:1.25rem}.unavailable[_nghost-%COMP%]   button[_ngcontent-%COMP%]{background:#1b1b1b;border-color:#393939;color:#777;cursor:not-allowed}.compact[_nghost-%COMP%]:not(.unavailable)   button[_ngcontent-%COMP%]{color:var(--%NS%bhw-input-accent);border-color:color-mix(in srgb,var(--%NS%bhw-input-accent) 40%,transparent);background:color-mix(in srgb,var(--%NS%bhw-input-accent) 7%,transparent)}`]})};var Dn=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new B;bulk={select:n=>this._select(n),deselect:n=>this._deselect(n),setSelection:n=>this._setSelection(n)};constructor(n=!1,e,t=!0,o){this._multiple=n,this._emitChanges=t,this.compareWith=o,e&&e.length&&(n?e.forEach(r=>this._markSelected(r)):this._markSelected(e[0]),this._selectedToEmit.length=0)}select(...n){return this._select(n)}deselect(...n){return this._deselect(n)}setSelection(...n){return this._setSelection(n)}toggle(n){return this.isSelected(n)?this.deselect(n):this.select(n)}clear(n=!0){this._unmarkAll();let e=this._hasQueuedChanges();return n&&this._emitChangeEvent(),e}isSelected(n){return this._selection.has(this._getConcreteValue(n))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(n){this._multiple&&this.selected&&this._selected.sort(n)}isMultipleSelection(){return this._multiple}_select(n){this._verifyValueAssignment(n),n.forEach(t=>this._markSelected(t));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}_deselect(n){this._verifyValueAssignment(n),n.forEach(t=>this._unmarkSelected(t));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}_setSelection(n){this._verifyValueAssignment(n);let e=this.selected,t=new Set(n.map(r=>this._getConcreteValue(r)));n.forEach(r=>this._markSelected(r)),e.filter(r=>!t.has(this._getConcreteValue(r,t))).forEach(r=>this._unmarkSelected(r));let o=this._hasQueuedChanges();return this._emitChangeEvent(),o}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(n){n=this._getConcreteValue(n),this.isSelected(n)||(this._multiple||this._unmarkAll(),this.isSelected(n)||this._selection.add(n),this._emitChanges&&this._selectedToEmit.push(n))}_unmarkSelected(n){n=this._getConcreteValue(n),this.isSelected(n)&&(this._selection.delete(n),this._emitChanges&&this._deselectedToEmit.push(n))}_unmarkAll(){this.isEmpty()||this._selection.forEach(n=>this._unmarkSelected(n))}_verifyValueAssignment(n){n.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(n,e){if(this.compareWith){e=e??this._selection;for(let t of e)if(this.compareWith(n,t))return t;return n}else return n}};var Fs=Symbol(`FIELD_TREE`);function Mn(i){return typeof i==`function`&&i[Fs]===!0}var Fi=new m(``);var Jo=class{_box;_destroyed=new B;_resizeSubject=new B;_resizeObserver;_elementObservables=new Map;constructor(n){this._box=n,typeof ResizeObserver<`u`&&(this._resizeObserver=new ResizeObserver(e=>this._resizeSubject.next(e)))}observe(n){return this._elementObservables.has(n)||this._elementObservables.set(n,new S(e=>{let t=this._resizeSubject.subscribe(e);return this._resizeObserver?.observe(n,{box:this._box}),()=>{this._resizeObserver?.unobserve(n),t.unsubscribe(),this._elementObservables.delete(n)}}).pipe(We(e=>e.some(t=>t.target===n)),Fi$1({bufferSize:1,refCount:!0}),lc$1(this._destroyed))),this._elementObservables.get(n)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}};var Ls=(()=>{class i{_cleanupErrorListener;_observers=new Map;_ngZone=h(ee$1);constructor(){}ngOnDestroy(){for(let[,e]of this._observers)e.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(e,t){let o=t?.box||`content-box`;return this._observers.has(o)||this._observers.set(o,new Jo(o)),this._observers.get(o).observe(e)}static ɵfac=function(t){return new(t||i)};static ɵprov=he$1({token:i,factory:i.ɵfac})}return i})();var er=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵdir=Tr({type:i,selectors:[[`mat-label`]]})}return i})();var id=new m(`MatError`);var tr=(()=>{class i{align=`start`;id=h(ye).getId(`mat-mdc-hint-`);static ɵfac=function(t){return new(t||i)};static ɵdir=Tr({type:i,selectors:[[`mat-hint`]],hostAttrs:[1,`mat-mdc-form-field-hint`,`mat-mdc-form-field-bottom-align`],hostVars:4,hostBindings:function(t,o){t&2&&(Js$1(`id`,o.id),Po$1(`align`,null),Xs$1(`mat-mdc-form-field-hint-end`,o.align===`end`))},inputs:{align:`align`,id:`id`}})}return i})();var od=new m(`MatPrefix`);var rd=new m(`MatSuffix`);var Ws=new m(`FloatingLabelParent`);var zs=(()=>{class i{_elementRef=h(et);get floating(){return this._floating}set floating(e){this._floating=e,this.monitorResize&&this._handleResize()}_floating=!1;get monitorResize(){return this._monitorResize}set monitorResize(e){this._monitorResize=e,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe()}_monitorResize=!1;_resizeObserver=h(Ls);_ngZone=h(ee$1);_parent=h(Ws);_resizeSubscription=new K;ngOnDestroy(){this._resizeSubscription.unsubscribe()}getWidth(){return ad(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized())}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:`border-box`}).subscribe(()=>this._handleResize())})}static ɵfac=function(t){return new(t||i)};static ɵdir=Tr({type:i,selectors:[[`label`,`matFormFieldFloatingLabel`,``]],hostAttrs:[1,`mdc-floating-label`,`mat-mdc-floating-label`],hostVars:2,hostBindings:function(t,o){t&2&&Xs$1(`mdc-floating-label--float-above`,o.floating)},inputs:{floating:`floating`,monitorResize:`monitorResize`}})}return i})();function ad(i){let n=i;if(n.offsetParent!==null)return n.scrollWidth;let e=n.cloneNode(!0);e.style.setProperty(`position`,`absolute`),e.style.setProperty(`transform`,`translate(-9999px, -9999px)`),document.documentElement.appendChild(e);let t=e.scrollWidth;return e.remove(),t}var Bs=`mdc-line-ripple--active`;var Vi=`mdc-line-ripple--deactivating`;var js=(()=>{class i{_elementRef=h(et);_cleanupTransitionEnd;constructor(){let e=h(ee$1),t=h(Dr);e.runOutsideAngular(()=>{this._cleanupTransitionEnd=t.listen(this._elementRef.nativeElement,`transitionend`,this._handleTransitionEnd)})}activate(){let e=this._elementRef.nativeElement.classList;e.remove(Vi),e.add(Bs)}deactivate(){this._elementRef.nativeElement.classList.add(Vi)}_handleTransitionEnd=e=>{let t=this._elementRef.nativeElement.classList,o=t.contains(Vi);e.propertyName===`opacity`&&o&&t.remove(Bs,Vi)};ngOnDestroy(){this._cleanupTransitionEnd()}static ɵfac=function(t){return new(t||i)};static ɵdir=Tr({type:i,selectors:[[`div`,`matFormFieldLineRipple`,``]],hostAttrs:[1,`mdc-line-ripple`]})}return i})();var Hs=(()=>{class i{_elementRef=h(et);_ngZone=h(ee$1);open=!1;_notch;ngAfterViewInit(){let e=this._elementRef.nativeElement,t=e.querySelector(`.mdc-floating-label`);t?(e.classList.add(`mdc-notched-outline--upgraded`),typeof requestAnimationFrame==`function`&&(t.style.transitionDuration=`0s`,this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>t.style.transitionDuration=``)}))):e.classList.add(`mdc-notched-outline--no-label`)}_setNotchWidth(e){let t=this._notch.nativeElement;!this.open||!e?t.style.width=``:t.style.width=`calc(${e}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`}_setMaxWidth(e){this._notch.nativeElement.style.setProperty(`--mat-form-field-notch-max-width`,`calc(100% - ${e}px)`)}static ɵfac=function(t){return new(t||i)};static ɵcmp=(function(){let e=[`notch`];return On$1({type:i,selectors:[[`div`,`matFormFieldNotchedOutline`,``]],viewQuery:function(r,a){if(r&1&&_m(e,5),r&2){let s;NC(s=AC())&&(a._notch=s.first)}},hostAttrs:[1,`mdc-notched-outline`],hostVars:2,hostBindings:function(r,a){r&2&&Xs$1(`mdc-notched-outline--notched`,a.open)},inputs:{open:[0,`matFormFieldNotchedOutlineOpen`,`open`]},ngContentSelectors:[`*`],decls:5,vars:0,consts:[[`notch`,``],[1,`mat-mdc-notch-piece`,`mdc-notched-outline__leading`],[1,`mat-mdc-notch-piece`,`mdc-notched-outline__notch`],[1,`mat-mdc-notch-piece`,`mdc-notched-outline__trailing`]],template:function(r,a){r&1&&(Ql$1(),Qs$1(0,`div`,1),Zl$1(1,`div`,2,0),Jl$1(3),Kl(),Qs$1(4,`div`,3))},encapsulation:2})})()}return i})();var Nn=(()=>{class i{id;ngField=null;ngControl=null;focused=!1;empty=!1;shouldLabelFloat=!1;required=!1;disabled=!1;errorState=!1;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;stateChanges=null;value;static ɵfac=function(t){return new(t||i)};static ɵdir=Tr({type:i})}return i})();var In=new m(`MatFormField`);var sd=new m(`MAT_FORM_FIELD_DEFAULT_OPTIONS`);var Gs=`fill`;var ld=`auto`;var Us=`fixed`;var cd=`translateY(-50%)`;var $s=(()=>{class i{_elementRef=h(et);_changeDetectorRef=h(oa$1);_platform=h(ee);_idGenerator=h(ye);_ngZone=h(ee$1);_defaults=h(sd,{optional:!0});_currentDirection;_unwrapMaybeSignal(e){return Eo$1(e)?e():e}_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=n2(`iconPrefixContainer`);_textPrefixContainerSignal=n2(`textPrefixContainer`);_iconSuffixContainerSignal=n2(`iconSuffixContainer`);_textSuffixContainerSignal=n2(`textSuffixContainer`);_prefixSuffixContainers=Sr(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(e=>e?.nativeElement).filter(e=>e!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=r2(er);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(e){this._hideRequiredMarker=rt(e)}_hideRequiredMarker=!1;color=`primary`;get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||ld}set floatLabel(e){e!==this._floatLabel&&(this._floatLabel=e,this._changeDetectorRef.markForCheck())}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(e){let t=e||this._defaults?.appearance||Gs;this._appearanceSignal.set(t)}_appearanceSignal=be(Gs);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||Us}set subscriptSizing(e){this._subscriptSizing=e||this._defaults?.subscriptSizing||Us}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(e){this._hintLabel=e,this._processHints()}_hintLabel=``;_hasIconPrefix=!1;_hasTextPrefix=!1;_hasIconSuffix=!1;_hasTextSuffix=!1;_labelId=this._idGenerator.getId(`mat-mdc-form-field-label-`);_hintLabelId=this._idGenerator.getId(`mat-mdc-hint-`);_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(e){this._explicitFormFieldControl=e}_destroyed=new B;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=Ce();constructor(){let e=this._defaults,t=h(bM);e&&(e.appearance&&(this.appearance=e.appearance),this._hideRequiredMarker=!!e?.hideRequiredMarker,e.color&&(this.color=e.color)),Do$1(()=>this._currentDirection=t.valueSignal()),this._syncOutlineLabelOffset()}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add(`mat-form-field-animations-enabled`)},300)}),this._changeDetectorRef.detectChanges()}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix()}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=Mn(this._control.ngField)?null:this._control.ngControl.control.validator),this._previousControl=this._control,this._changeDetectorRef.markForCheck()),this._control.ngControl&&this._control.ngControl.control&&!Mn(this._control.ngField)&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck()}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete()}getLabelId=Sr(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel=`always`)}_initializeControl(e){let t=this._control,o=`mat-mdc-form-field-type-`;e&&this._elementRef.nativeElement.classList.remove(o+e.controlType),t.controlType&&this._elementRef.nativeElement.classList.add(o+t.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=t.stateChanges?.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck()}),this._describedByChanges?.unsubscribe(),this._describedByChanges=t.stateChanges?.pipe(PD([void 0,void 0]),k(()=>[this._unwrapMaybeSignal(t.errorState),t.userAriaDescribedBy]),FD(),We(([[r,a],[s,c]])=>r!==s||a!==c)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),t.ngControl&&t.ngControl.valueChanges&&!Mn(t.ngField)&&(this._valueChanges=t.ngControl.valueChanges.pipe(lc$1(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()))}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(e=>!e._isText),this._hasTextPrefix=!!this._prefixChildren.find(e=>e._isText),this._hasIconSuffix=!!this._suffixChildren.find(e=>!e._isText),this._hasTextSuffix=!!this._suffixChildren.find(e=>e._isText)}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),CD(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck()})}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck()}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck()}),this._validateHints(),this._syncDescribedByIds()}_assertFormFieldControl(){this._control}_updateFocusState(){let e=this._unwrapMaybeSignal(this._control.focused);e&&!this._isFocused?(this._isFocused=!0,this._lineRipple?.activate()):!e&&(this._isFocused||this._isFocused===null)&&(this._isFocused=!1,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle(`mat-focused`,e),this._textField?.nativeElement.classList.toggle(`mdc-text-field--focused`,e)}_syncOutlineLabelOffset(){s2({earlyRead:()=>{if(this._appearanceSignal()!==`outline`)return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset())});for(let e of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(e,{box:`border-box`})}return this._getOutlinedLabelOffset()},write:e=>this._writeOutlinedLabelStyles(e())})}_shouldAlwaysFloat(){return this.floatLabel===`always`}_hasOutline(){return this.appearance===`outline`}_forceDisplayInfixLabel(){return!this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=Sr(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._shouldAlwaysFloat()||this._unwrapMaybeSignal(this._control.shouldLabelFloat):!1}_shouldForward(e){let t=this._control?.ngField||this._control?.ngControl;if(!t)return!1;if(Mn(t)){let o=t();return e===`valid`?o.valid():e===`dirty`?o.dirty():e===`touched`?o.touched():e===`pending`?o.pending():e===`untouched`?!o.touched():e===`pristine`?!o.dirty():e===`invalid`?!o.valid():!1}else{let o=t;return e===`valid`?o.valid:e===`dirty`?o.dirty:e===`touched`?o.touched:e===`pending`?o.pending:e===`untouched`?o.untouched:e===`pristine`?o.pristine:e===`invalid`?o.invalid:!1}}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._unwrapMaybeSignal(this._control.errorState)?`error`:`hint`}_handleLabelResized(){this._refreshOutlineNotchWidth()}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth())}_processHints(){this._validateHints(),this._syncDescribedByIds()}_validateHints(){this._hintChildren}_syncDescribedByIds(){if(this._control){let e=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy==`string`&&e.push(...this._control.userAriaDescribedBy.split(` `)),this._getSubscriptMessageType()===`hint`){let r=this._hintChildren?this._hintChildren.find(s=>s.align===`start`):null,a=this._hintChildren?this._hintChildren.find(s=>s.align===`end`):null;r?e.push(r.id):this._hintLabel&&e.push(this._hintLabelId),a&&e.push(a.id)}else this._errorChildren&&e.push(...this._errorChildren.map(r=>r.id));let t=this._control.describedByIds,o;if(t){let r=this._describedByIds||e;o=e.concat(t.filter(a=>a&&!r.includes(a)))}else o=e;this._control.setDescribedByIds(o),this._describedByIds=e}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return[``,null];if(!this._isAttachedToDom())return null;let e=this._iconPrefixContainer?.nativeElement,t=this._textPrefixContainer?.nativeElement,o=this._iconSuffixContainer?.nativeElement,r=this._textSuffixContainer?.nativeElement,a=e?.getBoundingClientRect().width??0,s=t?.getBoundingClientRect().width??0,c=o?.getBoundingClientRect().width??0,h=r?.getBoundingClientRect().width??0;return[`var(--mat-mdc-form-field-label-transform, ${cd} translateX(${`calc(${this._currentDirection===`rtl`?`-1`:`1`} * (${`${a+s}px`} + var(--mat-mdc-form-field-label-offset-x, 0px)))`}))`,a+s+c+h]}_writeOutlinedLabelStyles(e){if(e!==null){let[t,o]=e;this._floatingLabel&&(this._floatingLabel.element.style.transform=t),o!==null&&this._notchedOutline?._setMaxWidth(o)}}_isAttachedToDom(){let e=this._elementRef.nativeElement;if(e.getRootNode){let t=e.getRootNode();return t&&t!==e}return document.documentElement.contains(e)}static ɵfac=function(t){return new(t||i)};static ɵcmp=(function(){let e=[`iconPrefixContainer`],t=[`textPrefixContainer`],o=[`iconSuffixContainer`],r=[`textSuffixContainer`],a=[`textField`],s=[`*`,[[`mat-label`]],[[``,`matPrefix`,``],[``,`matIconPrefix`,``]],[[``,`matTextPrefix`,``]],[[``,`matTextSuffix`,``]],[[``,`matSuffix`,``],[``,`matIconSuffix`,``]],[[`mat-error`],[``,`matError`,``]],[[`mat-hint`,3,`align`,`end`]],[[`mat-hint`,`align`,`end`]]],c=[`*`,`mat-label`,`[matPrefix], [matIconPrefix]`,`[matTextPrefix]`,`[matTextSuffix]`,`[matSuffix], [matIconSuffix]`,`mat-error, [matError]`,`mat-hint:not([align='end'])`,`mat-hint[align='end']`];function h(P,ie){P&1&&Dm(0,`span`,21)}function p(P,ie){if(P&1&&(ks$1(0,`label`,20),Jl$1(1,1),dC(2,h,1,0,`span`,21),Yl$1()),P&2){let b=SC(2);vm(`floating`,b._shouldLabelFloat())(`monitorResize`,b._hasOutline())(`id`,b._labelId),Po$1(`for`,b._control.disableAutomaticLabeling?null:b._control.id),Sw(2),pC(!b.hideRequiredMarker&&b._unwrapMaybeSignal(b._control.required)?2:-1)}}function _(P,ie){if(P&1&&dC(0,p,3,5,`label`,20),P&2){let b=SC();pC(b._hasFloatingLabel()?0:-1)}}function E(P,ie){P&1&&Dm(0,`div`,7)}function g(P,ie){}function T(P,ie){if(P&1&&hm$1(0,g,0,0,`ng-template`,13),P&2){SC(2);let b=RC(1);vm(`ngTemplateOutlet`,b)}}function j(P,ie){if(P&1&&(ks$1(0,`div`,9),dC(1,T,1,1,null,13),Yl$1()),P&2){let b=SC();vm(`matFormFieldNotchedOutlineOpen`,b._shouldLabelFloat()),Sw(),pC(b._forceDisplayInfixLabel()?-1:1)}}function se(P,ie){P&1&&(ks$1(0,`div`,10,2),Jl$1(2,2),Yl$1())}function Mt(P,ie){P&1&&(ks$1(0,`div`,11,3),Jl$1(2,3),Yl$1())}function st(P,ie){}function lt(P,ie){if(P&1&&hm$1(0,st,0,0,`ng-template`,13),P&2){SC();let b=RC(1);vm(`ngTemplateOutlet`,b)}}function Fn(P,ie){P&1&&(ks$1(0,`div`,14,4),Jl$1(2,4),Yl$1())}function Vn(P,ie){P&1&&(ks$1(0,`div`,15,5),Jl$1(2,5),Yl$1())}function Vl(P,ie){P&1&&Dm(0,`div`,16)}function Ll(P,ie){P&1&&(ks$1(0,`div`,18),Jl$1(1,6),Yl$1())}function zl(P,ie){if(P&1&&(ks$1(0,`mat-hint`,22),XC(1),Yl$1()),P&2){let b=SC(2);vm(`id`,b._hintLabelId),Sw(),jm(b.hintLabel)}}function Bl(P,ie){if(P&1&&(ks$1(0,`div`,19),dC(1,zl,2,2,`mat-hint`,22),Jl$1(2,7),Dm(3,`div`,23),Jl$1(4,8),Yl$1()),P&2){let b=SC();Sw(),pC(b.hintLabel?1:-1)}}return On$1({type:i,selectors:[[`mat-form-field`]],contentQueries:function(ie,b,oe){if(ie&1&&(Mm(oe,b._labelChild,er,5),Sm(oe,Nn,5)(oe,od,5)(oe,rd,5)(oe,id,5)(oe,tr,5)),ie&2){xC();let De;NC(De=AC())&&(b._formFieldControl=De.first),NC(De=AC())&&(b._prefixChildren=De),NC(De=AC())&&(b._suffixChildren=De),NC(De=AC())&&(b._errorChildren=De),NC(De=AC())&&(b._hintChildren=De)}},viewQuery:function(ie,b){if(ie&1&&(Nm(b._iconPrefixContainerSignal,e,5)(b._textPrefixContainerSignal,t,5)(b._iconSuffixContainerSignal,o,5)(b._textSuffixContainerSignal,r,5),_m(a,5)(e,5)(t,5)(o,5)(r,5)(zs,5)(Hs,5)(js,5)),ie&2){xC(4);let oe;NC(oe=AC())&&(b._textField=oe.first),NC(oe=AC())&&(b._iconPrefixContainer=oe.first),NC(oe=AC())&&(b._textPrefixContainer=oe.first),NC(oe=AC())&&(b._iconSuffixContainer=oe.first),NC(oe=AC())&&(b._textSuffixContainer=oe.first),NC(oe=AC())&&(b._floatingLabel=oe.first),NC(oe=AC())&&(b._notchedOutline=oe.first),NC(oe=AC())&&(b._lineRipple=oe.first)}},hostAttrs:[1,`mat-mdc-form-field`],hostVars:38,hostBindings:function(ie,b){ie&2&&Xs$1(`mat-mdc-form-field-label-always-float`,b._shouldAlwaysFloat())(`mat-mdc-form-field-has-icon-prefix`,b._hasIconPrefix)(`mat-mdc-form-field-has-icon-suffix`,b._hasIconSuffix)(`mat-form-field-invalid`,b._unwrapMaybeSignal(b._control.errorState))(`mat-form-field-disabled`,b._unwrapMaybeSignal(b._control.disabled))(`mat-form-field-autofilled`,b._unwrapMaybeSignal(b._control.autofilled))(`mat-form-field-appearance-fill`,b.appearance==`fill`)(`mat-form-field-appearance-outline`,b.appearance==`outline`)(`mat-form-field-hide-placeholder`,b._hasFloatingLabel()&&!b._shouldLabelFloat())(`mat-primary`,b.color!==`accent`&&b.color!==`warn`)(`mat-accent`,b.color===`accent`)(`mat-warn`,b.color===`warn`)(`ng-untouched`,b._shouldForward(`untouched`))(`ng-touched`,b._shouldForward(`touched`))(`ng-pristine`,b._shouldForward(`pristine`))(`ng-dirty`,b._shouldForward(`dirty`))(`ng-valid`,b._shouldForward(`valid`))(`ng-invalid`,b._shouldForward(`invalid`))(`ng-pending`,b._shouldForward(`pending`))},inputs:{hideRequiredMarker:`hideRequiredMarker`,color:`color`,floatLabel:`floatLabel`,appearance:`appearance`,subscriptSizing:`subscriptSizing`,hintLabel:`hintLabel`},exportAs:[`matFormField`],features:[$m([{provide:In,useExisting:i},{provide:Ws,useExisting:i}])],ngContentSelectors:c,decls:18,vars:21,consts:[[`labelTemplate`,``],[`textField`,``],[`iconPrefixContainer`,``],[`textPrefixContainer`,``],[`textSuffixContainer`,``],[`iconSuffixContainer`,``],[1,`mat-mdc-text-field-wrapper`,`mdc-text-field`,3,`click`],[1,`mat-mdc-form-field-focus-overlay`],[1,`mat-mdc-form-field-flex`],[`matFormFieldNotchedOutline`,``,3,`matFormFieldNotchedOutlineOpen`],[1,`mat-mdc-form-field-icon-prefix`],[1,`mat-mdc-form-field-text-prefix`],[1,`mat-mdc-form-field-infix`],[3,`ngTemplateOutlet`],[1,`mat-mdc-form-field-text-suffix`],[1,`mat-mdc-form-field-icon-suffix`],[`matFormFieldLineRipple`,``],[`aria-atomic`,`true`,`aria-live`,`polite`,1,`mat-mdc-form-field-subscript-wrapper`,`mat-mdc-form-field-bottom-align`],[1,`mat-mdc-form-field-error-wrapper`],[1,`mat-mdc-form-field-hint-wrapper`],[`matFormFieldFloatingLabel`,``,3,`floating`,`monitorResize`,`id`],[`aria-hidden`,`true`,1,`mat-mdc-form-field-required-marker`,`mdc-floating-label--required`],[3,`id`],[1,`mat-mdc-form-field-hint-spacer`]],template:function(ie,b){if(ie&1&&(Ql$1(s),hm$1(0,_,1,1,`ng-template`,null,0,aT),ks$1(2,`div`,6,1),Cm(`click`,function(De){return b._control.onContainerClick(De)}),dC(4,E,1,0,`div`,7),ks$1(5,`div`,8),dC(6,j,2,2,`div`,9),dC(7,se,3,0,`div`,10),dC(8,Mt,3,0,`div`,11),ks$1(9,`div`,12),dC(10,lt,1,1,null,13),Jl$1(11),Yl$1(),dC(12,Fn,3,0,`div`,14),dC(13,Vn,3,0,`div`,15),Yl$1(),dC(14,Vl,1,0,`div`,16),Yl$1(),ks$1(15,`div`,17),dC(16,Ll,2,0,`div`,18)(17,Bl,5,1,`div`,19),Yl$1()),ie&2){let oe,De=b._unwrapMaybeSignal(b._control.disabled);Sw(2),Xs$1(`mdc-text-field--filled`,!b._hasOutline())(`mdc-text-field--outlined`,b._hasOutline())(`mdc-text-field--no-label`,!b._hasFloatingLabel())(`mdc-text-field--disabled`,De)(`mdc-text-field--invalid`,b._unwrapMaybeSignal(b._control.errorState)),Sw(2),pC(!b._hasOutline()&&!De?4:-1),Sw(2),pC(b._hasOutline()?6:-1),Sw(),pC(b._hasIconPrefix?7:-1),Sw(),pC(b._hasTextPrefix?8:-1),Sw(2),pC(!b._hasOutline()||b._forceDisplayInfixLabel()?10:-1),Sw(2),pC(b._hasTextSuffix?12:-1),Sw(),pC(b._hasIconSuffix?13:-1),Sw(),pC(b._hasOutline()?-1:14),Sw(),Xs$1(`mat-mdc-form-field-subscript-dynamic-size`,b.subscriptSizing===`dynamic`);let jl=b._getSubscriptMessageType();Sw(),pC((oe=jl)===`error`?16:oe===`hint`?17:-1)}},dependencies:[zs,Hs,qT,js,tr],styles:[`.mdc-text-field {
  display: inline-flex;
  align-items: baseline;
  padding: 0 16px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  will-change: opacity, transform, color;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.mdc-text-field__input {
  width: 100%;
  min-width: 0;
  border: none;
  border-radius: 0;
  background: none;
  padding: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  height: 28px;
}
.mdc-text-field__input::-webkit-calendar-picker-indicator, .mdc-text-field__input::-webkit-search-cancel-button {
  display: none;
}
.mdc-text-field__input::-ms-clear {
  display: none;
}
.mdc-text-field__input:focus {
  outline: none;
}
.mdc-text-field__input:invalid {
  box-shadow: none;
}
.mdc-text-field__input::placeholder {
  opacity: 0;
}
.mdc-text-field__input::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field__input::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field__input:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mdc-text-field--focused .mdc-text-field__input::placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  opacity: 1;
}
.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder {
  opacity: 0;
}
.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--outlined .mdc-text-field__input, .mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input {
  height: 100%;
}
.mdc-text-field--outlined .mdc-text-field__input {
  display: flex;
  border: none !important;
  background-color: transparent;
}
.mdc-text-field--disabled .mdc-text-field__input {
  pointer-events: auto;
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--%NS%mat-form-field-filled-input-text-color, var(--%NS%mat-sys-on-surface));
  caret-color: var(--%NS%mat-form-field-filled-caret-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--%NS%mat-form-field-outlined-input-text-color, var(--%NS%mat-sys-on-surface));
  caret-color: var(--%NS%mat-form-field-outlined-caret-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--%NS%mat-form-field-filled-error-caret-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--outlined.mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--%NS%mat-form-field-outlined-error-caret-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--%NS%mat-form-field-filled-disabled-input-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--%NS%mat-form-field-outlined-disabled-input-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-text-field__input {
    background-color: Window;
  }
}

.mdc-text-field--filled {
  height: 56px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: var(--%NS%mat-form-field-filled-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-top-right-radius: var(--%NS%mat-form-field-filled-container-shape, var(--%NS%mat-sys-corner-extra-small));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) {
  background-color: var(--%NS%mat-form-field-filled-container-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled {
  background-color: var(--%NS%mat-form-field-filled-disabled-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 4%, transparent));
}

.mdc-text-field--outlined {
  height: 56px;
  overflow: visible;
  padding-right: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)));
  padding-left: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)) + 4px);
}
[dir=rtl] .mdc-text-field--outlined {
  padding-right: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)) + 4px);
  padding-left: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)));
}

.mdc-floating-label {
  position: absolute;
  left: 0;
  transform-origin: left top;
  line-height: 1.15rem;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: text;
  overflow: hidden;
  will-change: transform;
}
[dir=rtl] .mdc-floating-label {
  right: 0;
  left: auto;
  transform-origin: right top;
  text-align: right;
}
.mdc-text-field .mdc-floating-label {
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.mdc-notched-outline .mdc-floating-label {
  display: inline-block;
  position: relative;
  max-width: 100%;
}
.mdc-text-field--outlined .mdc-floating-label {
  left: 4px;
  right: auto;
}
[dir=rtl] .mdc-text-field--outlined .mdc-floating-label {
  left: auto;
  right: 4px;
}
.mdc-text-field--filled .mdc-floating-label {
  left: 16px;
  right: auto;
}
[dir=rtl] .mdc-text-field--filled .mdc-floating-label {
  left: auto;
  right: 16px;
}
.mdc-text-field--disabled .mdc-floating-label {
  cursor: default;
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-floating-label {
    z-index: 1;
  }
}
.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label {
  display: none;
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-label-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-focus-label-text-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-hover-label-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-error-label-text-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-error-focus-label-text-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-error-hover-label-text-color, var(--%NS%mat-sys-on-error-container));
}
.mdc-text-field--filled .mdc-floating-label {
  font-family: var(--%NS%mat-form-field-filled-label-text-font, var(--%NS%mat-sys-body-large-font));
  font-size: var(--%NS%mat-form-field-filled-label-text-size, var(--%NS%mat-sys-body-large-size));
  font-weight: var(--%NS%mat-form-field-filled-label-text-weight, var(--%NS%mat-sys-body-large-weight));
  letter-spacing: var(--%NS%mat-form-field-filled-label-text-tracking, var(--%NS%mat-sys-body-large-tracking));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-label-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-focus-label-text-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-hover-label-text-color, var(--%NS%mat-sys-on-surface));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-error-label-text-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-error-focus-label-text-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-error-hover-label-text-color, var(--%NS%mat-sys-on-error-container));
}
.mdc-text-field--outlined .mdc-floating-label {
  font-family: var(--%NS%mat-form-field-outlined-label-text-font, var(--%NS%mat-sys-body-large-font));
  font-size: var(--%NS%mat-form-field-outlined-label-text-size, var(--%NS%mat-sys-body-large-size));
  font-weight: var(--%NS%mat-form-field-outlined-label-text-weight, var(--%NS%mat-sys-body-large-weight));
  letter-spacing: var(--%NS%mat-form-field-outlined-label-text-tracking, var(--%NS%mat-sys-body-large-tracking));
}

.mdc-floating-label--float-above {
  cursor: auto;
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--filled .mdc-floating-label--float-above {
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--outlined .mdc-floating-label--float-above {
  transform: translateY(-37.25px) scale(1);
  font-size: 0.75rem;
}
.mdc-notched-outline .mdc-floating-label--float-above {
  text-overflow: clip;
}
.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: 133.3333333333%;
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  transform: translateY(-34.75px) scale(0.75);
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: 1rem;
}

.mdc-floating-label--%NS%required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 1px;
  margin-right: 0;
  content: "*";
}
[dir=rtl] .mdc-floating-label--%NS%required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 0;
  margin-right: 1px;
}

.mdc-notched-outline {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 100%;
  text-align: left;
  pointer-events: none;
}
[dir=rtl] .mdc-notched-outline {
  text-align: right;
}
.mdc-text-field--outlined .mdc-notched-outline {
  z-index: 1;
}

.mat-mdc-notch-piece {
  box-sizing: border-box;
  height: 100%;
  pointer-events: none;
  border: none;
  border-top: 1px solid;
  border-bottom: 1px solid;
}
.mdc-text-field--focused .mat-mdc-notch-piece {
  border-width: 2px;
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-outline-color, var(--%NS%mat-sys-outline));
  border-width: var(--%NS%mat-form-field-outlined-outline-width, 1px);
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-hover-outline-color, var(--%NS%mat-sys-on-surface));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-focus-outline-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-disabled-outline-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-error-outline-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-error-hover-outline-color, var(--%NS%mat-sys-on-error-container));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-error-focus-outline-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece {
  border-width: var(--%NS%mat-form-field-outlined-focus-outline-width, 2px);
}

.mdc-notched-outline__leading {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading {
  width: max(12px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)));
}
[dir=rtl] .mdc-notched-outline__leading {
  border-left: none;
  border-right: 1px solid;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  border-top-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
}

.mdc-notched-outline__trailing {
  flex-grow: 1;
  border-left: none;
  border-right: 1px solid;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
}
[dir=rtl] .mdc-notched-outline__trailing {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
}

.mdc-notched-outline__notch {
  flex: 0 0 auto;
  width: auto;
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch {
  max-width: min(var(--%NS%mat-form-field-notch-max-width, 100%), calc(100% - max(12px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  max-width: min(100%, calc(100% - max(12px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 1px;
}
.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 2px;
}
.mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 0;
  padding-right: 8px;
  border-top: none;
}
[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 8px;
  padding-right: 0;
}
.mdc-notched-outline--no-label .mdc-notched-outline__notch {
  display: none;
}

.mdc-line-ripple::before, .mdc-line-ripple::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom-style: solid;
  content: "";
}
.mdc-line-ripple::before {
  z-index: 1;
  border-bottom-width: var(--%NS%mat-form-field-filled-active-indicator-height, 1px);
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-active-indicator-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-hover-active-indicator-color, var(--%NS%mat-sys-on-surface));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-disabled-active-indicator-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-error-active-indicator-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-error-hover-active-indicator-color, var(--%NS%mat-sys-on-error-container));
}
.mdc-line-ripple::after {
  transform: scaleX(0);
  opacity: 0;
  z-index: 2;
}
.mdc-text-field--filled .mdc-line-ripple::after {
  border-bottom-width: var(--%NS%mat-form-field-filled-focus-active-indicator-height, 2px);
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--%NS%mat-form-field-filled-focus-active-indicator-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--filled.mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--%NS%mat-form-field-filled-error-focus-active-indicator-color, var(--%NS%mat-sys-error));
}

.mdc-line-ripple--%NS%active::after {
  transform: scaleX(1);
  opacity: 1;
}

.mdc-line-ripple--%NS%deactivating::after {
  opacity: 0;
}

.mdc-text-field--disabled {
  pointer-events: none;
}

.mat-mdc-form-field-textarea-control {
  vertical-align: middle;
  resize: vertical;
  box-sizing: border-box;
  height: auto;
  margin: 0;
  padding: 0;
  border: none;
  overflow: auto;
}

.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font: inherit;
  letter-spacing: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  border: none;
}

.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  line-height: normal;
  pointer-events: all;
  will-change: auto;
}

.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label {
  cursor: inherit;
}

.mdc-text-field--%NS%no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,
.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control {
  height: auto;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color] {
  height: 23px;
}

.mat-mdc-text-field-wrapper {
  height: auto;
  flex: auto;
  will-change: auto;
}

.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-left: 0;
  --%NS%mat-mdc-form-field-label-offset-x: -16px;
}

.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

[dir=rtl] .mat-mdc-text-field-wrapper {
  padding-left: 16px;
  padding-right: 16px;
}
[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-left: 0;
}
[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

.mat-form-field-disabled .mdc-text-field__input::placeholder {
  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder {
  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder {
  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
  opacity: 1;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label {
  left: auto;
  right: auto;
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input {
  display: inline-block;
}

.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch {
  padding-top: 0;
}

.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: 1px solid transparent;
}

[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: none;
  border-right: 1px solid transparent;
}

.mat-mdc-form-field-infix {
  min-height: var(--%NS%mat-form-field-container-height, 56px);
  padding-top: var(--%NS%mat-form-field-filled-with-label-container-padding-top, 24px);
  padding-bottom: var(--%NS%mat-form-field-filled-with-label-container-padding-bottom, 8px);
}
.mdc-text-field--outlined .mat-mdc-form-field-infix, .mdc-text-field--no-label .mat-mdc-form-field-infix {
  padding-top: var(--%NS%mat-form-field-container-vertical-padding, 16px);
  padding-bottom: var(--%NS%mat-form-field-container-vertical-padding, 16px);
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label {
  top: calc(var(--%NS%mat-form-field-container-height, 56px) / 2);
}

.mdc-text-field--filled .mat-mdc-floating-label {
  display: var(--%NS%mat-form-field-filled-label-display, block);
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  --%NS%mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--%NS%mat-form-field-container-height, 56px) / 2) * -1))
    scale(var(--%NS%mat-mdc-form-field-floating-label-scale, 0.75));
  transform: var(--%NS%mat-mdc-form-field-label-transform);
}

@keyframes _mat-form-field-subscript-animation {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.mat-mdc-form-field-subscript-wrapper {
  box-sizing: border-box;
  width: 100%;
  position: relative;
}

.mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-error-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 16px;
  opacity: 1;
  transform: translateY(0);
  animation: _mat-form-field-subscript-animation 0ms cubic-bezier(0.55, 0, 0.55, 0.2);
}

.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper {
  position: static;
}

.mat-mdc-form-field-bottom-align::before {
  content: "";
  display: inline-block;
  height: 16px;
}

.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before {
  content: unset;
}

.mat-mdc-form-field-hint-end {
  order: 1;
}

.mat-mdc-form-field-hint-wrapper {
  display: flex;
}

.mat-mdc-form-field-hint-spacer {
  flex: 1 0 1em;
}

.mat-mdc-form-field-error {
  display: block;
  color: var(--%NS%mat-form-field-error-text-color, var(--%NS%mat-sys-error));
}

.mat-mdc-form-field-subscript-wrapper,
.mat-mdc-form-field-bottom-align::before {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--%NS%mat-form-field-subscript-text-font, var(--%NS%mat-sys-body-small-font));
  line-height: var(--%NS%mat-form-field-subscript-text-line-height, var(--%NS%mat-sys-body-small-line-height));
  font-size: var(--%NS%mat-form-field-subscript-text-size, var(--%NS%mat-sys-body-small-size));
  letter-spacing: var(--%NS%mat-form-field-subscript-text-tracking, var(--%NS%mat-sys-body-small-tracking));
  font-weight: var(--%NS%mat-form-field-subscript-text-weight, var(--%NS%mat-sys-body-small-weight));
}

.mat-mdc-form-field-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  opacity: 0;
  pointer-events: none;
  background-color: var(--%NS%mat-form-field-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay {
  opacity: var(--%NS%mat-form-field-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay {
  opacity: var(--%NS%mat-form-field-focus-state-layer-opacity, 0);
}

select.mat-mdc-form-field-input-control {
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: transparent;
  display: inline-flex;
  box-sizing: border-box;
}
select.mat-mdc-form-field-input-control:not(:disabled) {
  cursor: pointer;
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option {
  color: var(--%NS%mat-form-field-select-option-text-color, var(--%NS%mat-sys-neutral10));
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled {
  color: var(--%NS%mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--%NS%mat-sys-neutral10) 38%, transparent));
}

.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -2.5px;
  pointer-events: none;
  color: var(--%NS%mat-form-field-enabled-select-arrow-color, var(--%NS%mat-sys-on-surface-variant));
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  right: auto;
  left: 0;
}
.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after {
  color: var(--%NS%mat-form-field-focus-select-arrow-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after {
  color: var(--%NS%mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 15px;
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 0;
  padding-left: 15px;
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper {
    outline: solid 1px;
  }
}
@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper {
    outline-color: GrayText;
  }
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper {
    outline: dashed 3px;
  }
}

@media (forced-colors: active) {
  .mat-mdc-form-field.mat-focused .mdc-notched-outline {
    border: dashed 3px;
  }
}

.mat-mdc-form-field-input-control[type=date], .mat-mdc-form-field-input-control[type=datetime], .mat-mdc-form-field-input-control[type=datetime-local], .mat-mdc-form-field-input-control[type=month], .mat-mdc-form-field-input-control[type=week], .mat-mdc-form-field-input-control[type=time] {
  line-height: 1;
}
.mat-mdc-form-field-input-control::-webkit-datetime-edit {
  line-height: 1;
  padding: 0;
  margin-bottom: -2px;
}

.mat-mdc-form-field {
  --%NS%mat-mdc-form-field-floating-label-scale: 0.75;
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
  text-align: left;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--%NS%mat-form-field-container-text-font, var(--%NS%mat-sys-body-large-font));
  line-height: var(--%NS%mat-form-field-container-text-line-height, var(--%NS%mat-sys-body-large-line-height));
  font-size: var(--%NS%mat-form-field-container-text-size, var(--%NS%mat-sys-body-large-size));
  letter-spacing: var(--%NS%mat-form-field-container-text-tracking, var(--%NS%mat-sys-body-large-tracking));
  font-weight: var(--%NS%mat-form-field-container-text-weight, var(--%NS%mat-sys-body-large-weight));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above {
  font-size: calc(var(--%NS%mat-form-field-outlined-label-text-populated-size) * var(--%NS%mat-mdc-form-field-floating-label-scale));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: var(--%NS%mat-form-field-outlined-label-text-populated-size);
}
[dir=rtl] .mat-mdc-form-field {
  text-align: right;
}

.mat-mdc-form-field-flex {
  display: inline-flex;
  align-items: baseline;
  box-sizing: border-box;
  width: 100%;
}

.mat-mdc-text-field-wrapper {
  width: 100%;
  z-index: 0;
}

.mat-mdc-form-field-icon-prefix,
.mat-mdc-form-field-icon-suffix {
  align-self: center;
  line-height: 0;
  pointer-events: auto;
  position: relative;
  z-index: 1;
}
.mat-mdc-form-field-icon-prefix > .mat-icon,
.mat-mdc-form-field-icon-suffix > .mat-icon {
  padding: 0 12px;
  box-sizing: content-box;
}

.mat-mdc-form-field-icon-prefix {
  color: var(--%NS%mat-form-field-leading-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-prefix {
  color: var(--%NS%mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-trailing-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-invalid .mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-error-trailing-icon-color, var(--%NS%mat-sys-error));
}
.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-error-hover-trailing-icon-color, var(--%NS%mat-sys-on-error-container));
}
.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-error-focus-trailing-icon-color, var(--%NS%mat-sys-error));
}

.mat-mdc-form-field-icon-prefix,
[dir=rtl] .mat-mdc-form-field-icon-suffix {
  padding: 0 4px 0 0;
}

.mat-mdc-form-field-icon-suffix,
[dir=rtl] .mat-mdc-form-field-icon-prefix {
  padding: 0 0 0 4px;
}

.mat-mdc-form-field-subscript-wrapper .mat-icon,
.mat-mdc-form-field label .mat-icon {
  width: 1em;
  height: 1em;
  font-size: inherit;
}

.mat-mdc-form-field-infix {
  flex: auto;
  min-width: 0;
  width: 180px;
  position: relative;
  box-sizing: border-box;
}
.mat-mdc-form-field-infix:has(textarea[cols]) {
  width: auto;
}

.mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: -1px;
  -webkit-clip-path: inset(-9em -999em -9em 1px);
  clip-path: inset(-9em -999em -9em 1px);
}
[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: 0;
  margin-right: -1px;
  -webkit-clip-path: inset(-9em 1px -9em -999em);
  clip-path: inset(-9em 1px -9em -999em);
}

.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-floating-label {
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input {
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-moz-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-webkit-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input:-ms-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--%NS%filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before {
  transition-duration: 75ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-line-ripple::after {
  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-error-wrapper {
  animation-duration: 300ms;
}

.mdc-notched-outline .mdc-floating-label {
  max-width: calc(100% + 1px);
}

.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: calc(133.3333333333% + 1px);
}
`],encapsulation:2})})()}return i})();var qs=(()=>{class i{_animationsDisabled=Ce();state=`unchecked`;disabled=!1;appearance=`full`;static ɵfac=function(t){return new(t||i)};static ɵcmp=On$1({type:i,selectors:[[`mat-pseudo-checkbox`]],hostAttrs:[1,`mat-pseudo-checkbox`],hostVars:12,hostBindings:function(t,o){t&2&&Xs$1(`mat-pseudo-checkbox-indeterminate`,o.state===`indeterminate`)(`mat-pseudo-checkbox-checked`,o.state===`checked`)(`mat-pseudo-checkbox-disabled`,o.disabled)(`mat-pseudo-checkbox-minimal`,o.appearance===`minimal`)(`mat-pseudo-checkbox-full`,o.appearance===`full`)(`_mat-animation-noopable`,o._animationsDisabled)},inputs:{state:`state`,disabled:`disabled`,appearance:`appearance`},decls:0,vars:0,template:function(t,o){},styles:[`.mat-pseudo-checkbox {
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1), background-color 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox::after {
  position: absolute;
  opacity: 0;
  content: "";
  border-bottom: 2px solid currentColor;
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-pseudo-checkbox._mat-animation-noopable::after {
  transition: none;
}

.mat-pseudo-checkbox-disabled {
  cursor: default;
}

.mat-pseudo-checkbox-indeterminate::after {
  left: 1px;
  opacity: 1;
  border-radius: 2px;
}

.mat-pseudo-checkbox-checked::after {
  left: 1px;
  border-left: 2px solid currentColor;
  transform: rotate(-45deg);
  opacity: 1;
  box-sizing: content-box;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  color: var(--%NS%mat-pseudo-checkbox-minimal-selected-checkmark-color, var(--%NS%mat-sys-primary));
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--%NS%mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mat-pseudo-checkbox-full {
  border-color: var(--%NS%mat-pseudo-checkbox-full-unselected-icon-color, var(--%NS%mat-sys-on-surface-variant));
  border-width: 2px;
  border-style: solid;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-disabled {
  border-color: var(--%NS%mat-pseudo-checkbox-full-disabled-unselected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate {
  background-color: var(--%NS%mat-pseudo-checkbox-full-selected-icon-color, var(--%NS%mat-sys-primary));
  border-color: transparent;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  color: var(--%NS%mat-pseudo-checkbox-full-selected-checkmark-color, var(--%NS%mat-sys-on-primary));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {
  background-color: var(--%NS%mat-pseudo-checkbox-full-disabled-selected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--%NS%mat-pseudo-checkbox-full-disabled-selected-checkmark-color, var(--%NS%mat-sys-surface));
}

.mat-pseudo-checkbox {
  width: 18px;
  height: 18px;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after {
  width: 14px;
  height: 6px;
  transform-origin: center;
  top: -4.2426406871px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  top: 8px;
  width: 16px;
}

.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after {
  width: 10px;
  height: 4px;
  transform-origin: center;
  top: -2.8284271247px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  top: 6px;
  width: 12px;
}
`],encapsulation:2})}return i})();var ir=new m(`MAT_OPTION_PARENT_COMPONENT`);var or=new m(`MatOptgroup`);var nr=class{source;isUserInput;constructor(n,e=!1){this.source=n,this.isUserInput=e}};var vt=(()=>{class i{_element=h(et);_changeDetectorRef=h(oa$1);_parent=h(ir,{optional:!0});group=h(or,{optional:!0});_signalDisableRipple=!1;_selected=!1;_active=!1;_mostRecentViewValue=``;get multiple(){return this._parent&&this._parent.multiple}get selected(){return this._selected}value;id=h(ye).getId(`mat-option-`);get disabled(){return this.group&&this.group.disabled||this._disabled()}set disabled(e){this._disabled.set(e)}_disabled=be(!1);get disableRipple(){return this._signalDisableRipple?this._parent.disableRipple():!!this._parent?.disableRipple}get hideSingleSelectionIndicator(){return!!(this._parent&&this._parent.hideSingleSelectionIndicator)}onSelectionChange=new Le;_text;_stateChanges=new B;constructor(){let e=h(DM);e.load(Ht),e.load(h3),this._signalDisableRipple=!!this._parent&&Eo$1(this._parent.disableRipple)}get active(){return this._active}get viewValue(){return(this._text?.nativeElement.textContent||``).trim()}select(e=!0){this._selected||(this._selected=!0,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}deselect(e=!0){this._selected&&(this._selected=!1,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}focus(e,t){let o=this._getHostElement();typeof o.focus==`function`&&o.focus(t)}setActiveStyles(){this._active||(this._active=!0,this._changeDetectorRef.markForCheck())}setInactiveStyles(){this._active&&(this._active=!1,this._changeDetectorRef.markForCheck())}getLabel(){return this.viewValue}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!$e(e)&&(this._selectViaInteraction(),e.preventDefault())}_selectViaInteraction(){this.disabled||(this._selected=this.multiple?!this._selected:!0,this._changeDetectorRef.markForCheck(),this._emitSelectionChangeEvent(!0))}_getTabIndex(){return this.disabled?`-1`:`0`}_getHostElement(){return this._element.nativeElement}ngAfterViewChecked(){if(this._selected){let e=this.viewValue;e!==this._mostRecentViewValue&&(this._mostRecentViewValue&&this._stateChanges.next(),this._mostRecentViewValue=e)}}ngOnDestroy(){this._stateChanges.complete()}_emitSelectionChangeEvent(e=!1){this.onSelectionChange.emit(new nr(this,e))}static ɵfac=function(t){return new(t||i)};static ɵcmp=(function(){let e=[`text`],t=[[[`mat-icon`]],`*`],o=[`mat-icon`,`*`];function r(c,h){if(c&1&&Dm(0,`mat-pseudo-checkbox`,1),c&2){let p=SC();vm(`disabled`,p.disabled)(`state`,p.selected?`checked`:`unchecked`)}}function a(c,h){if(c&1&&Dm(0,`mat-pseudo-checkbox`,3),c&2){let p=SC();vm(`disabled`,p.disabled)}}function s(c,h){if(c&1&&(ks$1(0,`span`,4),XC(1),Yl$1()),c&2){let p=SC();Sw(),ed$1(`(`,p.group.label,`)`)}}return On$1({type:i,selectors:[[`mat-option`]],viewQuery:function(h,p){if(h&1&&_m(e,7),h&2){let _;NC(_=AC())&&(p._text=_.first)}},hostAttrs:[`role`,`option`,1,`mat-mdc-option`,`mdc-list-item`],hostVars:11,hostBindings:function(h,p){h&1&&Cm(`click`,function(){return p._selectViaInteraction()})(`keydown`,function(E){return p._handleKeydown(E)}),h&2&&(Js$1(`id`,p.id),Po$1(`aria-selected`,p.selected)(`aria-disabled`,p.disabled.toString()),Xs$1(`mdc-list-item--selected`,p.selected)(`mat-mdc-option-multiple`,p.multiple)(`mat-mdc-option-active`,p.active)(`mdc-list-item--disabled`,p.disabled))},inputs:{value:`value`,id:`id`,disabled:[2,`disabled`,`disabled`,Jm]},outputs:{onSelectionChange:`onSelectionChange`},exportAs:[`matOption`],ngContentSelectors:o,decls:8,vars:5,consts:[[`text`,``],[`aria-hidden`,`true`,1,`mat-mdc-option-pseudo-checkbox`,3,`disabled`,`state`],[1,`mdc-list-item__primary-text`],[`state`,`checked`,`aria-hidden`,`true`,`appearance`,`minimal`,1,`mat-mdc-option-pseudo-checkbox`,3,`disabled`],[1,`cdk-visually-hidden`],[`aria-hidden`,`true`,`mat-ripple`,``,1,`mat-mdc-option-ripple`,`mat-focus-indicator`,3,`matRippleTrigger`,`matRippleDisabled`]],template:function(h,p){h&1&&(Ql$1(t),dC(0,r,1,2,`mat-pseudo-checkbox`,1),Jl$1(1),ks$1(2,`span`,2,0),Jl$1(4,1),Yl$1(),dC(5,a,1,1,`mat-pseudo-checkbox`,3),dC(6,s,2,1,`span`,4),Dm(7,`div`,5)),h&2&&(pC(p.multiple?0:-1),Sw(5),pC(!p.multiple&&p.selected&&!p.hideSingleSelectionIndicator?5:-1),Sw(),pC(p.group&&p.group._inert?6:-1),Sw(),vm(`matRippleTrigger`,p._getHostElement())(`matRippleDisabled`,p.disabled||p.disableRipple))},dependencies:[qs,yi],styles:[`.mat-mdc-option {
  -webkit-user-select: none;
  user-select: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  min-height: 48px;
  padding: 0 16px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  color: var(--%NS%mat-option-label-text-color, var(--%NS%mat-sys-on-surface));
  font-family: var(--%NS%mat-option-label-text-font, var(--%NS%mat-sys-label-large-font));
  line-height: var(--%NS%mat-option-label-text-line-height, var(--%NS%mat-sys-label-large-line-height));
  font-size: var(--%NS%mat-option-label-text-size, var(--%NS%mat-sys-body-large-size));
  letter-spacing: var(--%NS%mat-option-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  font-weight: var(--%NS%mat-option-label-text-weight, var(--%NS%mat-sys-body-large-weight));
}
.mat-mdc-option:hover:not(.mdc-list-item--disabled) {
  background-color: var(--%NS%mat-option-hover-state-layer-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) calc(var(--%NS%mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-option:focus.mdc-list-item, .mat-mdc-option.mat-mdc-option-active.mdc-list-item {
  background-color: var(--%NS%mat-option-focus-state-layer-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) calc(var(--%NS%mat-sys-focus-state-layer-opacity) * 100%), transparent));
  outline: 0;
}
.mat-mdc-option.mdc-list-item--%NS%selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) {
  background-color: var(--%NS%mat-option-selected-state-layer-color, var(--%NS%mat-sys-secondary-container));
}
.mat-mdc-option.mdc-list-item--%NS%selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) .mdc-list-item__primary-text {
  color: var(--%NS%mat-option-selected-state-label-text-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-option .mat-pseudo-checkbox {
  --%NS%mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--%NS%mat-option-selected-state-label-text-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-option.mdc-list-item {
  align-items: center;
  background: transparent;
}
.mat-mdc-option.mdc-list-item--disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-option.mdc-list-item--disabled .mat-mdc-option-pseudo-checkbox, .mat-mdc-option.mdc-list-item--disabled .mdc-list-item__primary-text, .mat-mdc-option.mdc-list-item--disabled > mat-icon {
  opacity: 0.38;
}
.mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 32px;
}
[dir=rtl] .mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 16px;
  padding-right: 32px;
}
.mat-mdc-option .mat-icon,
.mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-icon,
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 0;
  margin-left: 16px;
}
.mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-left: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-right: 16px;
  margin-left: 0;
}
.mat-mdc-option .mat-mdc-option-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
.mat-mdc-option .mdc-list-item__primary-text {
  white-space: normal;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  font-family: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  margin-right: auto;
}
[dir=rtl] .mat-mdc-option .mdc-list-item__primary-text {
  margin-right: 0;
  margin-left: auto;
}
@media (forced-colors: active) {
  .mat-mdc-option.mdc-list-item--%NS%selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    width: 10px;
    height: 0;
    border-bottom: solid 10px;
    border-radius: 10px;
  }
  [dir=rtl] .mat-mdc-option.mdc-list-item--%NS%selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    right: auto;
    left: 16px;
  }
}

.mat-mdc-option-multiple {
  --%NS%mat-list-list-item-selected-container-color: var(--%NS%mat-list-list-item-container-color, transparent);
}

.mat-mdc-option-active .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2})})()}return i})();function Xs(i,n,e){if(e.length){let t=n.toArray(),o=e.toArray(),r=0;for(let a=0;a<i+1;a++)t[a].group&&t[a].group===o[r]&&r++;return r}return 0}function Ks(i,n,e,t){return i<e?i:i+n>e+t?Math.max(0,i-t+n):e}var Bi=(()=>{class i{isErrorState(e,t){return!!(e&&e.invalid&&(e.touched||t&&t.submitted))}isSignalErrorState(e){if(!e)return!1;let t=e().invalid(),o=e().touched();return t&&o}static ɵfac=function(t){return new(t||i)};static ɵprov=he$1({token:i,factory:i.ɵfac})}return i})();var $t=class{_defaultMatcher;_parentFormGroup;_parentForm;_stateChanges;errorState=!1;matcher;ngControl;formField;constructor(n,e,t,o,r){this._defaultMatcher=n,this._parentFormGroup=t,this._parentForm=o,this._stateChanges=r,e?Eo$1(e.field)&&!e.updateValueAndValidity?(this.formField=e,this.ngControl=null):(this.formField=null,this.ngControl=e):this.ngControl=this.formField=null}updateErrorState(){let n=this.errorState,e=this._getCurrentErrorState(this.matcher||this._defaultMatcher);e!==n&&(this.errorState=e,this._stateChanges.next())}_getCurrentErrorState(n){if(this.formField&&n?.isSignalErrorState)return n.isSignalErrorState(this.formField.field())??!1;let e=this._parentFormGroup||this._parentForm,t=this.ngControl?this.ngControl.control:null;return n?.isErrorState(t,e)??!1}};var On=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵmod=$e$1({type:i});static ɵinj=Se({imports:[oi,$s,bv]})}return i})();var Ys=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵmod=$e$1({type:i});static ɵinj=Se({imports:[bv]})}return i})();var rr=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵmod=$e$1({type:i});static ɵinj=Se({imports:[Ai,Ys,vt,bv]})}return i})();var dd=new m(`mat-select-scroll-strategy`,{providedIn:`root`,factory:()=>{let i=h(G);return()=>Dt(i)}});var md=new m(`MAT_SELECT_CONFIG`);var Zs=new m(`MatSelectTrigger`);var ar=class{source;value;constructor(n,e){this.source=n,this.value=e}};var qt=(()=>{class i{_viewportRuler=h(Qe);_changeDetectorRef=h(oa$1);_elementRef=h(et);_dir=h(bM,{optional:!0});_idGenerator=h(ye);_renderer=h(Dr);_parentFormField=h(In,{optional:!0});ngControl=h(jt,{self:!0,optional:!0});_liveAnnouncer=h(rn);_defaultOptions=h(md,{optional:!0});_animationsDisabled=Ce();_popoverLocation;_initialized=new B;_cleanupDetach;options;optionGroups;customTrigger;_positions=[{originX:`start`,originY:`bottom`,overlayX:`start`,overlayY:`top`},{originX:`end`,originY:`bottom`,overlayX:`end`,overlayY:`top`},{originX:`start`,originY:`top`,overlayX:`start`,overlayY:`bottom`,panelClass:`mat-mdc-select-panel-above`},{originX:`end`,originY:`top`,overlayX:`end`,overlayY:`bottom`,panelClass:`mat-mdc-select-panel-above`}];_scrollOptionIntoView(e){let t=this.options.toArray()[e];if(t){let o=this.panel.nativeElement,r=Xs(e,this.options,this.optionGroups),a=t._getHostElement();e===0&&r===1?o.scrollTop=0:o.scrollTop=Ks(a.offsetTop,a.offsetHeight,o.scrollTop,o.offsetHeight)}}_positioningSettled(){this._scrollOptionIntoView(this._keyManager.activeItemIndex||0)}_getChangeEvent(e){return new ar(this,e)}_scrollStrategyFactory=h(dd);_panelOpen=!1;_compareWith=(e,t)=>e===t;_uid=this._idGenerator.getId(`mat-select-`);_triggerAriaLabelledBy=null;_previousControl;_destroy=new B;_errorStateTracker;stateChanges=new B;disableAutomaticLabeling=!0;userAriaDescribedBy;_selectionModel;_keyManager;_preferredOverlayOrigin;_overlayWidth;_onChange=()=>{};_onTouched=()=>{};_valueId=this._idGenerator.getId(`mat-select-value-`);_scrollStrategy;_overlayPanelClass=this._defaultOptions?.overlayPanelClass||``;get focused(){return this._focused||this._panelOpen}_focused=!1;controlType=`mat-select`;trigger;panel;_overlayDir;panelClass;disabled=!1;get disableRipple(){return this._disableRipple()}set disableRipple(e){this._disableRipple.set(e)}_disableRipple=be(!1);tabIndex=0;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties()}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??!1;get placeholder(){return this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next()}_placeholder;get required(){return this._required??this.ngControl?.control?.hasValidator(St.required)??!1}set required(e){this._required=e,this.stateChanges.next()}_required;get multiple(){return this._multiple}set multiple(e){this._selectionModel,this._multiple=e}_multiple=!1;disableOptionCentering=this._defaultOptions?.disableOptionCentering??!1;get compareWith(){return this._compareWith}set compareWith(e){this._compareWith=e,this._selectionModel&&this._initializeSelection()}get value(){return this._value}set value(e){this._assignValue(e)&&this._onChange(e)}_value;ariaLabel=``;ariaLabelledby;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}typeaheadDebounceInterval;sortComparator;get id(){return this._id}set id(e){this._id=e||this._uid,this.stateChanges.next()}_id;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}panelWidth=this._defaultOptions&&typeof this._defaultOptions.panelWidth<`u`?this._defaultOptions.panelWidth:`auto`;canSelectNullableOptions=this._defaultOptions?.canSelectNullableOptions??!1;optionSelectionChanges=mD(()=>{let e=this.options;return e?e.changes.pipe(PD(e),De(()=>CD(...e.map(t=>t.onSelectionChange)))):this._initialized.pipe(De(()=>this.optionSelectionChanges))});openedChange=new Le;_openedStream=this.openedChange.pipe(We(e=>e),k(()=>{}));_closedStream=this.openedChange.pipe(We(e=>!e),k(()=>{}));selectionChange=new Le;valueChange=new Le;constructor(){let e=h(Bi),t=h(pn,{optional:!0}),o=h(hn,{optional:!0}),r=h(new ra$1(`tabindex`),{optional:!0}),a=h(Cn,{optional:!0}),s=h(Fi,{optional:!0,self:!0});this.ngControl&&(this.ngControl.valueAccessor=this),this._defaultOptions?.typeaheadDebounceInterval!=null&&(this.typeaheadDebounceInterval=this._defaultOptions.typeaheadDebounceInterval),this._errorStateTracker=new $t(e,s||this.ngControl,o,t,this.stateChanges),this._scrollStrategy=this._scrollStrategyFactory(),this.tabIndex=r==null?0:parseInt(r)||0,this._popoverLocation=a?.usePopover===!1?null:`inline`,this.id=this.id}ngOnInit(){this._selectionModel=new Dn(this.multiple),this.stateChanges.next(),this._viewportRuler.change().pipe(lc$1(this._destroy)).subscribe(()=>{this.panelOpen&&(this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._changeDetectorRef.detectChanges())})}ngAfterContentInit(){this._initialized.next(),this._initialized.complete(),this._initKeyManager(),this._selectionModel.changed.pipe(lc$1(this._destroy)).subscribe(e=>{e.added.forEach(t=>t.select()),e.removed.forEach(t=>t.deselect())}),this.options.changes.pipe(PD(null),lc$1(this._destroy)).subscribe(()=>{this._resetOptions(),this._initializeSelection()})}ngDoCheck(){let e=this._getTriggerAriaLabelledby(),t=this.ngControl;if(e!==this._triggerAriaLabelledBy){let o=this._elementRef.nativeElement;this._triggerAriaLabelledBy=e,e?o.setAttribute(`aria-labelledby`,e):o.removeAttribute(`aria-labelledby`)}t&&(this._previousControl!==t.control&&(this._previousControl!==void 0&&t.disabled!==null&&t.disabled!==this.disabled&&(this.disabled=t.disabled),this._previousControl=t.control),this.updateErrorState())}ngOnChanges(e){(e.disabled||e.userAriaDescribedBy)&&this.stateChanges.next(),e.typeaheadDebounceInterval&&this._keyManager&&this._keyManager.withTypeAhead(this.typeaheadDebounceInterval),e.panelClass&&this.panelClass instanceof Set&&(this.panelClass=Array.from(this.panelClass))}ngOnDestroy(){this._cleanupDetach?.(),this._keyManager?.destroy(),this._destroy.next(),this._destroy.complete(),this.stateChanges.complete()}toggle(){this.panelOpen?this.close():this.open()}open(){this._canOpen()&&(this._parentFormField&&(this._preferredOverlayOrigin=this._parentFormField.getConnectedOverlayOrigin()),this._cleanupDetach?.(),this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._panelOpen=!0,this._overlayDir.positionChange.pipe(me$1(1)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this._positioningSettled()}),this._overlayDir.attachOverlay(),this._keyManager.withHorizontalOrientation(null),this._highlightCorrectOption(),this._changeDetectorRef.markForCheck(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!0)))}close(){this._panelOpen&&(this._panelOpen=!1,this._exitAndDetach(),this._keyManager.withHorizontalOrientation(this._isRtl()?`rtl`:`ltr`),this._changeDetectorRef.markForCheck(),this._onTouched(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!1)))}_exitAndDetach(){if(this._animationsDisabled||!this.panel){this._detachOverlay();return}this._cleanupDetach?.(),this._cleanupDetach=()=>{t(),clearTimeout(o),this._cleanupDetach=void 0};let e=this.panel.nativeElement,t=this._renderer.listen(e,`animationend`,r=>{r.animationName===`_mat-select-exit`&&(this._cleanupDetach?.(),this._detachOverlay())}),o=setTimeout(()=>{this._cleanupDetach?.(),this._detachOverlay()},200);e.classList.add(`mat-select-panel-exit`)}_detachOverlay(){this._overlayDir.detachOverlay(),this._changeDetectorRef.markForCheck()}writeValue(e){this._assignValue(e)}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this.stateChanges.next()}get panelOpen(){return this._panelOpen}get selected(){return this.multiple?this._selectionModel?.selected||[]:this._selectionModel?.selected[0]}get triggerValue(){if(this.empty)return``;if(this._multiple){let e=this._selectionModel.selected.map(t=>t.viewValue);return this._isRtl()&&e.reverse(),e.join(`, `)}return this._selectionModel.selected[0].viewValue}updateErrorState(){this._errorStateTracker.updateErrorState()}_isRtl(){return this._dir?this._dir.value===`rtl`:!1}_handleKeydown(e){this.disabled||(this.panelOpen?this._handleOpenKeydown(e):this._handleClosedKeydown(e))}_handleClosedKeydown(e){let t=e.keyCode,o=t===40||t===38||t===37||t===39,r=t===13||t===32,a=this._keyManager;if(!a.isTyping()&&r&&!$e(e)||(this.multiple||e.altKey)&&o)e.preventDefault(),this.open();else if(!this.multiple){let s=this.selected;a.onKeydown(e);let c=this.selected;c&&s!==c&&this._liveAnnouncer.announce(c.viewValue,1e4)}}_handleOpenKeydown(e){let t=this._keyManager,o=e.keyCode,r=o===40||o===38,a=t.isTyping();if(r&&e.altKey)e.preventDefault(),this.close();else if(!a&&(o===13||o===32)&&t.activeItem&&!$e(e))e.preventDefault(),t.activeItem._selectViaInteraction();else if(!a&&this._multiple&&o===65&&e.ctrlKey){e.preventDefault();let s=this.options.some(c=>!c.disabled&&!c.selected);this.options.forEach(c=>{c.disabled||(s?c.select():c.deselect())})}else{let s=t.activeItemIndex;t.onKeydown(e),this._multiple&&r&&e.shiftKey&&t.activeItem&&t.activeItemIndex!==s&&t.activeItem._selectViaInteraction()}}_handleOverlayKeydown(e){e.keyCode===27&&!$e(e)&&(e.preventDefault(),this.close())}_onFocus(){this.disabled||(this._focused=!0,this.stateChanges.next())}_onBlur(){this._focused=!1,this._keyManager?.cancelTypeahead(),!this.disabled&&!this.panelOpen&&(this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next())}get empty(){return!this._selectionModel||this._selectionModel.isEmpty()}_initializeSelection(){Promise.resolve().then(()=>{this.ngControl&&(this._value=this.ngControl.value),this._setSelectionByValue(this._value),this.stateChanges.next()})}_setSelectionByValue(e){if(this.options.forEach(t=>t.setInactiveStyles()),this._selectionModel.clear(),this.multiple&&e)e.forEach(t=>this._selectOptionByValue(t)),this._sortValues();else{let t=this._selectOptionByValue(e);t?this._keyManager.updateActiveItem(t):this.panelOpen||this._keyManager.updateActiveItem(-1)}this._changeDetectorRef.markForCheck()}_selectOptionByValue(e){let t=this.options.find(o=>{if(this._selectionModel.isSelected(o))return!1;try{return(o.value!=null||this.canSelectNullableOptions)&&this._compareWith(o.value,e)}catch{return!1}});return t&&this._selectionModel.select(t),t}_assignValue(e){return e!==this._value||this._multiple&&Array.isArray(e)?(this.options&&this._setSelectionByValue(e),this._value=e,!0):!1}_skipPredicate=e=>this.panelOpen?!1:e.disabled;_getOverlayWidth(e){return this.panelWidth===`auto`?(e instanceof Ut?e.elementRef:e||this._elementRef).nativeElement.getBoundingClientRect().width:this.panelWidth===null?``:this.panelWidth}_syncParentProperties(){if(this.options)for(let e of this.options)e._changeDetectorRef.markForCheck()}_initKeyManager(){this._keyManager=new an(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl()?`rtl`:`ltr`).withHomeAndEnd().withPageUpDown().withAllowedModifierKeys([`shiftKey`]).skipPredicate(this._skipPredicate),this._keyManager.tabOut.subscribe(()=>{this.panelOpen&&(!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction(),this.focus(),this.close())}),this._keyManager.change.subscribe(()=>{this._panelOpen&&this.panel?this._scrollOptionIntoView(this._keyManager.activeItemIndex||0):!this._panelOpen&&!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction()})}_resetOptions(){let e=CD(this.options.changes,this._destroy);this.optionSelectionChanges.pipe(lc$1(e)).subscribe(t=>{this._onSelect(t.source,t.isUserInput),t.isUserInput&&!this.multiple&&this._panelOpen&&(this.close(),this.focus())}),CD(...this.options.map(t=>t._stateChanges)).pipe(lc$1(e)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this.stateChanges.next()})}_onSelect(e,t){let o=this._selectionModel.isSelected(e);!this.canSelectNullableOptions&&e.value==null&&!this._multiple?(e.deselect(),this._selectionModel.clear(),this.value!=null&&this._propagateChanges(e.value)):(o!==e.selected&&(e.selected?this._selectionModel.select(e):this._selectionModel.deselect(e)),t&&this._keyManager.setActiveItem(e),this.multiple&&(this._sortValues(),t&&this.focus())),o!==this._selectionModel.isSelected(e)&&this._propagateChanges(),this.stateChanges.next()}_sortValues(){if(this.multiple){let e=this.options.toArray();this._selectionModel.sort((t,o)=>this.sortComparator?this.sortComparator(t,o,e):e.indexOf(t)-e.indexOf(o)),this.stateChanges.next()}}_propagateChanges(e){let t;this.multiple?t=this.selected.map(o=>o.value):t=this.selected?this.selected.value:e,this._value=t,this.valueChange.emit(t),this._onChange(t),this.selectionChange.emit(this._getChangeEvent(t)),this._changeDetectorRef.markForCheck()}_highlightCorrectOption(){if(this._keyManager)if(this.empty){let e=-1;for(let t=0;t<this.options.length;t++)if(!this.options.get(t).disabled){e=t;break}this._keyManager.setActiveItem(e)}else this._keyManager.setActiveItem(this._selectionModel.selected[0])}_canOpen(){return!this._panelOpen&&!this.disabled&&this.options?.length>0&&!!this._overlayDir}focus(e){this._elementRef.nativeElement.focus(e)}_getPanelAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||null,t=e?e+` `:``;return this.ariaLabelledby?t+this.ariaLabelledby:e}_getAriaActiveDescendant(){return this.panelOpen&&this._keyManager&&this._keyManager.activeItem?this._keyManager.activeItem.id:null}_getTriggerAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||``;return this.ariaLabelledby&&(e+=` `+this.ariaLabelledby),e||(e=this._valueId),e}get describedByIds(){return this._elementRef.nativeElement.getAttribute(`aria-describedby`)?.split(` `)||[]}setDescribedByIds(e){let t=this._elementRef.nativeElement;e.length?t.setAttribute(`aria-describedby`,e.join(` `)):t.removeAttribute(`aria-describedby`)}onContainerClick(e){let t=de(e);t&&(t.tagName===`MAT-OPTION`||t.classList.contains(`cdk-overlay-backdrop`)||t.closest(`.mat-mdc-select-panel`))||(this.focus(),this.open())}get shouldLabelFloat(){return this.panelOpen||!this.empty||this.focused&&!!this.placeholder}static ɵfac=function(t){return new(t||i)};static ɵcmp=(function(){let e=[`trigger`],t=[`panel`],o=[[[`mat-select-trigger`]],`*`],r=[`mat-select-trigger`,`*`];function a(_,E){if(_&1&&(ks$1(0,`span`,4),XC(1),Yl$1()),_&2){let g=SC();Sw(),jm(g.placeholder)}}function s(_,E){_&1&&Jl$1(0)}function c(_,E){if(_&1&&(ks$1(0,`span`,11),XC(1),Yl$1()),_&2){let g=SC(2);Sw(),jm(g.triggerValue)}}function h(_,E){if(_&1&&(ks$1(0,`span`,5),dC(1,s,1,0)(2,c,2,1,`span`,11),Yl$1()),_&2){let g=SC();Sw(),pC(g.customTrigger?1:2)}}function p(_,E){if(_&1){let g=bC();ks$1(0,`div`,12,1),Cm(`keydown`,function(j){vp(g);let se=SC();return Dp(se._handleKeydown(j))}),Jl$1(2,1),Yl$1()}if(_&2){let g=SC();Xl$1(g.panelClass),Xs$1(`mat-select-panel-animations-enabled`,!g._animationsDisabled)(`mat-primary`,g._parentFormField?.color===`primary`)(`mat-accent`,g._parentFormField?.color===`accent`)(`mat-warn`,g._parentFormField?.color===`warn`)(`mat-undefined`,!g._parentFormField?.color),Po$1(`id`,g.id+`-panel`)(`aria-multiselectable`,g.multiple)(`aria-label`,g.ariaLabel||null)(`aria-labelledby`,g._getPanelAriaLabelledby())}}return On$1({type:i,selectors:[[`mat-select`]],contentQueries:function(E,g,T){if(E&1&&Sm(T,Zs,5)(T,vt,5)(T,or,5),E&2){let j;NC(j=AC())&&(g.customTrigger=j.first),NC(j=AC())&&(g.options=j),NC(j=AC())&&(g.optionGroups=j)}},viewQuery:function(E,g){if(E&1&&_m(e,5)(t,5)(Ii,5),E&2){let T;NC(T=AC())&&(g.trigger=T.first),NC(T=AC())&&(g.panel=T.first),NC(T=AC())&&(g._overlayDir=T.first)}},hostAttrs:[`role`,`combobox`,`aria-haspopup`,`listbox`,1,`mat-mdc-select`],hostVars:21,hostBindings:function(E,g){E&1&&Cm(`keydown`,function(j){return g._handleKeydown(j)})(`focus`,function(){return g._onFocus()})(`blur`,function(){return g._onBlur()}),E&2&&(Po$1(`id`,g.id)(`tabindex`,g.disabled?-1:g.tabIndex)(`aria-controls`,g.panelOpen?g.id+`-panel`:null)(`aria-expanded`,g.panelOpen)(`aria-label`,g.ariaLabel||null)(`aria-required`,g.required.toString())(`aria-disabled`,g.disabled.toString())(`aria-invalid`,g.errorState)(`aria-activedescendant`,g._getAriaActiveDescendant()),Xs$1(`mat-mdc-select-disabled`,g.disabled)(`mat-mdc-select-invalid`,g.errorState)(`mat-mdc-select-required`,g.required)(`mat-mdc-select-empty`,g.empty)(`mat-mdc-select-multiple`,g.multiple)(`mat-select-open`,g.panelOpen))},inputs:{userAriaDescribedBy:[0,`aria-describedby`,`userAriaDescribedBy`],panelClass:`panelClass`,disabled:[2,`disabled`,`disabled`,Jm],disableRipple:[2,`disableRipple`,`disableRipple`,Jm],tabIndex:[2,`tabIndex`,`tabIndex`,_=>_==null?0:i2(_)],hideSingleSelectionIndicator:[2,`hideSingleSelectionIndicator`,`hideSingleSelectionIndicator`,Jm],placeholder:`placeholder`,required:[2,`required`,`required`,Jm],multiple:[2,`multiple`,`multiple`,Jm],disableOptionCentering:[2,`disableOptionCentering`,`disableOptionCentering`,Jm],compareWith:`compareWith`,value:`value`,ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],errorStateMatcher:`errorStateMatcher`,typeaheadDebounceInterval:[2,`typeaheadDebounceInterval`,`typeaheadDebounceInterval`,i2],sortComparator:`sortComparator`,id:`id`,panelWidth:`panelWidth`,canSelectNullableOptions:[2,`canSelectNullableOptions`,`canSelectNullableOptions`,Jm]},outputs:{openedChange:`openedChange`,_openedStream:`opened`,_closedStream:`closed`,selectionChange:`selectionChange`,valueChange:`valueChange`},exportAs:[`matSelect`],features:[$m([{provide:Nn,useExisting:i},{provide:ir,useExisting:i}]),Ao$1],ngContentSelectors:r,decls:11,vars:10,consts:[[`fallbackOverlayOrigin`,`cdkOverlayOrigin`,`trigger`,``],[`panel`,``],[`cdk-overlay-origin`,``,1,`mat-mdc-select-trigger`,3,`click`],[1,`mat-mdc-select-value`],[1,`mat-mdc-select-placeholder`,`mat-mdc-select-min-line`],[1,`mat-mdc-select-value-text`],[1,`mat-mdc-select-arrow-wrapper`],[1,`mat-mdc-select-arrow`],[`viewBox`,`0 0 24 24`,`width`,`24px`,`height`,`24px`,`focusable`,`false`,`aria-hidden`,`true`],[`d`,`M7 10l5 5 5-5z`],[`cdk-connected-overlay`,``,`cdkConnectedOverlayHasBackdrop`,``,`cdkConnectedOverlayBackdropClass`,`cdk-overlay-transparent-backdrop`,3,`detach`,`backdropClick`,`overlayKeydown`,`cdkConnectedOverlayDisableClose`,`cdkConnectedOverlayPanelClass`,`cdkConnectedOverlayScrollStrategy`,`cdkConnectedOverlayOrigin`,`cdkConnectedOverlayPositions`,`cdkConnectedOverlayWidth`,`cdkConnectedOverlayFlexibleDimensions`,`cdkConnectedOverlayUsePopover`],[1,`mat-mdc-select-min-line`],[`role`,`listbox`,`tabindex`,`-1`,1,`mat-mdc-select-panel`,`mdc-menu-surface`,`mdc-menu-surface--open`,3,`keydown`]],template:function(E,g){if(E&1&&(Ql$1(o),ks$1(0,`div`,2,0),Cm(`click`,function(){return g.open()}),ks$1(3,`div`,3),dC(4,a,2,1,`span`,4)(5,h,3,1,`span`,5),Yl$1(),ks$1(6,`div`,6)(7,`div`,7),Op(),ks$1(8,`svg`,8),Dm(9,`path`,9),Yl$1()()()(),hm$1(10,p,3,16,`ng-template`,10),Cm(`detach`,function(){return g.close()})(`backdropClick`,function(){return g.close()})(`overlayKeydown`,function(j){return g._handleOverlayKeydown(j)})),E&2){let T=RC(1);Sw(3),Po$1(`id`,g._valueId),Sw(),pC(g.empty?4:5),Sw(6),vm(`cdkConnectedOverlayDisableClose`,!0)(`cdkConnectedOverlayPanelClass`,g._overlayPanelClass)(`cdkConnectedOverlayScrollStrategy`,g._scrollStrategy)(`cdkConnectedOverlayOrigin`,g._preferredOverlayOrigin||T)(`cdkConnectedOverlayPositions`,g._positions)(`cdkConnectedOverlayWidth`,g._overlayWidth)(`cdkConnectedOverlayFlexibleDimensions`,!0)(`cdkConnectedOverlayUsePopover`,g._popoverLocation)}},dependencies:[Ut,Ii],styles:[`@keyframes _mat-select-enter {
  from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-select-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-select {
  display: inline-block;
  width: 100%;
  outline: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--%NS%mat-select-enabled-trigger-text-color, var(--%NS%mat-sys-on-surface));
  font-family: var(--%NS%mat-select-trigger-text-font, var(--%NS%mat-sys-body-large-font));
  line-height: var(--%NS%mat-select-trigger-text-line-height, var(--%NS%mat-sys-body-large-line-height));
  font-size: var(--%NS%mat-select-trigger-text-size, var(--%NS%mat-sys-body-large-size));
  font-weight: var(--%NS%mat-select-trigger-text-weight, var(--%NS%mat-sys-body-large-weight));
  letter-spacing: var(--%NS%mat-select-trigger-text-tracking, var(--%NS%mat-sys-body-large-tracking));
}

div.mat-mdc-select-panel {
  box-shadow: var(--%NS%mat-select-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
}

.mat-mdc-select-disabled {
  color: var(--%NS%mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-select-disabled .mat-mdc-select-placeholder {
  color: var(--%NS%mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-select-trigger {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  width: 100%;
}
.mat-mdc-select-disabled .mat-mdc-select-trigger {
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
}

.mat-mdc-select-value {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mat-mdc-select-value-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mat-mdc-select-arrow-wrapper {
  height: 24px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
}
.mat-form-field-appearance-fill .mdc-text-field--no-label .mat-mdc-select-arrow-wrapper {
  transform: none;
}

.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-invalid .mat-mdc-select-arrow,
.mat-form-field-invalid:not(.mat-form-field-disabled) .mat-mdc-form-field-infix::after {
  color: var(--%NS%mat-select-invalid-arrow-color, var(--%NS%mat-sys-error));
}

.mat-mdc-select-arrow {
  width: 10px;
  height: 5px;
  position: relative;
  color: var(--%NS%mat-select-enabled-arrow-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-form-field.mat-focused .mat-mdc-select-arrow {
  color: var(--%NS%mat-select-focused-arrow-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-disabled .mat-mdc-select-arrow {
  color: var(--%NS%mat-select-disabled-arrow-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-select-open .mat-mdc-select-arrow {
  transform: rotate(180deg);
}
.mat-form-field-animations-enabled .mat-mdc-select-arrow {
  transition: transform 80ms linear;
}
.mat-mdc-select-arrow svg {
  fill: currentColor;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media (forced-colors: active) {
  .mat-mdc-select-arrow svg {
    fill: CanvasText;
  }
  .mat-mdc-select-disabled .mat-mdc-select-arrow svg {
    fill: GrayText;
  }
}

div.mat-mdc-select-panel {
  width: 100%;
  max-height: 275px;
  outline: 0;
  overflow: auto;
  padding: 8px 0;
  box-sizing: border-box;
  transform-origin: top center;
  border-radius: 0 0 4px 4px;
  position: relative;
  background-color: var(--%NS%mat-select-panel-background-color, var(--%NS%mat-sys-surface-container));
}
.mat-mdc-select-panel-above div.mat-mdc-select-panel {
  border-radius: 4px 4px 0 0;
  transform-origin: bottom center;
}
@media (forced-colors: active) {
  div.mat-mdc-select-panel {
    outline: solid 1px;
  }
}

.mat-select-panel-animations-enabled {
  animation: _mat-select-enter 120ms cubic-bezier(0, 0, 0.2, 1) forwards;
}
.mat-select-panel-animations-enabled.mat-select-panel-exit {
  animation: _mat-select-exit 100ms linear forwards;
}

.mat-mdc-select-placeholder {
  transition: color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);
  color: var(--%NS%mat-select-placeholder-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-form-field:not(.mat-form-field-animations-enabled) .mat-mdc-select-placeholder, ._mat-animation-noopable .mat-mdc-select-placeholder {
  transition: none;
}
.mat-form-field-hide-placeholder .mat-mdc-select-placeholder {
  color: transparent;
  -webkit-text-fill-color: transparent;
  transition: none;
  display: block;
}

.mat-mdc-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper {
  cursor: pointer;
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mat-mdc-floating-label {
  max-width: calc(100% - 18px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mdc-floating-label--float-above {
  max-width: calc(100% / 0.75 - 24px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-notched-outline__notch {
  max-width: calc(100% - 60px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-text-field--label-floating .mdc-notched-outline__notch {
  max-width: calc(100% - 24px);
}

.mat-mdc-select-min-line:empty::before {
  content: " ";
  white-space: pre;
  width: 1px;
  display: inline-block;
  visibility: hidden;
}

.mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper {
  transform: var(--%NS%mat-select-arrow-transform, translateY(-8px));
}
`],encapsulation:2})})()}return i})();var Qs=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵdir=Tr({type:i,selectors:[[`mat-select-trigger`]],features:[$m([{provide:Zs,useExisting:i}])]})}return i})();var ji=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵmod=$e$1({type:i});static ɵinj=Se({imports:[wn,rr,bv,at,On,rr]})}return i})();var Xt=class i{constructor(n,e,t,o,r){this.select=n;this.host=e;this.renderer=t;this.injector=o;n.openedChange.pipe(De(a=>a?CD(pe(null),nc$1(window,`resize`),nc$1(document,`scroll`,{capture:!0})).pipe(Rt(()=>sw(()=>this.position(),{injector:this.injector}))):Te),Id$1(r)).subscribe()}select;host;renderer;injector;position(){if(!this.select.panelOpen)return;let n=this.select.panel?.nativeElement,t=(n?.closest(`.cdk-overlay-popover`)??n?.closest(`.cdk-overlay-container`))?.querySelector(`.cdk-overlay-backdrop`);if(!t)return;this.renderer.addClass(t,`bhw-select-backdrop`);let o=t.querySelector(`.bhw-select-trigger-area`);o||(o=this.renderer.createElement(`span`),this.renderer.addClass(o,`bhw-select-trigger-area`),this.renderer.setAttribute(o,`aria-hidden`,`true`),this.renderer.appendChild(t,o));let r=this.host.nativeElement.getBoundingClientRect(),a=t.getBoundingClientRect();for(let[s,c]of Object.entries({left:r.left-a.left,top:r.top-a.top,width:r.width,height:r.height}))this.renderer.setStyle(o,s,`${c}px`)}static ɵfac=function(e){return new(e||i)(Rn$1(qt),Rn$1(et),Rn$1(Dr),Rn$1(G),Rn$1(J))};static ɵdir=Tr({type:i,selectors:[[`mat-select`,`bhwSelectCursor`,``]]})};var ud=(i,n)=>n.value;function pd(i,n){if(i&1&&(ks$1(0,`mat-option`,2),XC(1),Yl$1()),i&2){let e=n.$implicit;vm(`value`,e.value),Sw(),jm(e.label)}}var Kt=class i{label=t2.required();value=t2(``);options=t2.required();disabled=t2(!1);changed=e2();static ɵfac=function(e){return new(e||i)};static ɵcmp=On$1({type:i,selectors:[[`bhw-choice`]],inputs:{label:[1,`label`],value:[1,`value`],options:[1,`options`],disabled:[1,`disabled`]},outputs:{changed:`changed`},decls:5,vars:4,consts:[[1,`field-label`],[`bhwSelectCursor`,``,`panelClass`,`bhw-select-panel`,3,`selectionChange`,`aria-label`,`disabled`,`value`],[3,`value`]],template:function(e,t){e&1&&(ks$1(0,`span`,0),XC(1),Yl$1(),ks$1(2,`mat-select`,1),Cm(`selectionChange`,function(r){return t.changed.emit(r.value)}),mC(3,pd,2,2,`mat-option`,2,ud),Yl$1()),e&2&&(Sw(),jm(t.label()),Sw(),ym(`aria-label`,t.label()),vm(`disabled`,t.disabled())(`value`,t.value()),Sw(),yC(t.options()))},dependencies:[ji,qt,vt,Xt],styles:[`[_nghost-%COMP%]{display:block;min-width:0}.field-label[_ngcontent-%COMP%]{display:block;margin-bottom:.4rem;color:#b4b2bf;font-size:.75rem}mat-select[_ngcontent-%COMP%]{box-sizing:border-box;border-radius:1rem;background:#101114}`]})};var hd=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵcmp=On$1({type:i,selectors:[[`ng-component`]],hostAttrs:[`cdk-text-field-style-loader`,``],decls:0,vars:0,template:function(t,o){},styles:[`textarea.cdk-textarea-autosize {
  resize: none;
}

textarea.cdk-textarea-autosize-measuring {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: auto !important;
  overflow: hidden !important;
}

textarea.cdk-textarea-autosize-measuring-firefox {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: 0 !important;
}

@keyframes cdk-text-field-autofill-start { /*!*/ }
@keyframes cdk-text-field-autofill-end { /*!*/ }
.cdk-text-field-autofill-monitored:-webkit-autofill {
  animation: cdk-text-field-autofill-start 0s 1ms;
}

.cdk-text-field-autofill-monitored:not(:-webkit-autofill) {
  animation: cdk-text-field-autofill-end 0s 1ms;
}
`],encapsulation:2})}return i})();var fd={passive:!0};var Js=(()=>{class i{_platform=h(ee);_ngZone=h(ee$1);_renderer=h(Mn$1).createRenderer(null,null);_styleLoader=h(DM);_monitoredElements=new Map;monitor(e){if(!this._platform.isBrowser)return Te;this._styleLoader.load(hd);let t=me(e),o=this._monitoredElements.get(t);if(o)return o.subject;let r=new B,a=`cdk-text-field-autofilled`,s=h=>{h.animationName===`cdk-text-field-autofill-start`&&!t.classList.contains(a)?(t.classList.add(a),this._ngZone.run(()=>r.next({target:h.target,isAutofilled:!0}))):h.animationName===`cdk-text-field-autofill-end`&&t.classList.contains(a)&&(t.classList.remove(a),this._ngZone.run(()=>r.next({target:h.target,isAutofilled:!1})))},c=this._ngZone.runOutsideAngular(()=>(t.classList.add(`cdk-text-field-autofill-monitored`),this._renderer.listen(t,`animationstart`,s,fd)));return this._monitoredElements.set(t,{subject:r,unlisten:c}),r}stopMonitoring(e){let t=me(e),o=this._monitoredElements.get(t);o&&(o.unlisten(),o.subject.complete(),t.classList.remove(`cdk-text-field-autofill-monitored`),t.classList.remove(`cdk-text-field-autofilled`),this._monitoredElements.delete(t))}ngOnDestroy(){this._monitoredElements.forEach((e,t)=>this.stopMonitoring(t))}static ɵfac=function(t){return new(t||i)};static ɵprov=he$1({token:i,factory:i.ɵfac})}return i})();var el=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵmod=$e$1({type:i});static ɵinj=Se({})}return i})();var tl=new m(`MAT_INPUT_VALUE_ACCESSOR`);var bd=[`button`,`checkbox`,`file`,`hidden`,`image`,`radio`,`range`,`reset`,`submit`];var gd=new m(`MAT_INPUT_CONFIG`);var nl=(()=>{class i{_elementRef=h(et);_platform=h(ee);ngControl=h(jt,{optional:!0,self:!0});_autofillMonitor=h(Js);_ngZone=h(ee$1);_formField=h(In,{optional:!0});_renderer=h(Dr);_uid=h(ye).getId(`mat-input-`);_previousNativeValue;_inputValueAccessor;_signalBasedValueAccessor;_previousPlaceholder=null;_errorStateTracker;_config=h(gd,{optional:!0});_cleanupIosKeyup;_cleanupWebkitWheel;_isServer=!1;_isNativeSelect=!1;_isTextarea=!1;_isInFormField=!1;focused=!1;stateChanges=new B;controlType=`mat-input`;autofilled=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=rt(e),this.focused&&(this.focused=!1,this.stateChanges.next())}_disabled=!1;get id(){return this._id}set id(e){this._id=e||this._uid}_id;placeholder;name;get required(){return this._required??this.ngControl?.control?.hasValidator(St.required)??!1}set required(e){this._required=rt(e)}_required;get type(){return this._type}set type(e){this._type=e||`text`,this._validateType(),!this._isTextarea&&To().has(this._type)&&(this._elementRef.nativeElement.type=this._type)}_type=`text`;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}userAriaDescribedBy;get value(){return this._signalBasedValueAccessor?this._signalBasedValueAccessor.value():this._inputValueAccessor.value}set value(e){e!==this.value&&(this._signalBasedValueAccessor?this._signalBasedValueAccessor.value.set(e):this._inputValueAccessor.value=e,this.stateChanges.next())}get readonly(){return this._readonly}set readonly(e){this._readonly=rt(e)}_readonly=!1;disabledInteractive;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}_neverEmptyInputTypes=[`date`,`datetime`,`datetime-local`,`month`,`time`,`week`].filter(e=>To().has(e));constructor(){let e=h(pn,{optional:!0}),t=h(hn,{optional:!0}),o=h(Bi),r=h(tl,{optional:!0,self:!0}),a=h(Fi,{optional:!0,self:!0}),s=this._elementRef.nativeElement,c=s.nodeName.toLowerCase();r?Eo$1(r.value)?this._signalBasedValueAccessor=r:this._inputValueAccessor=r:this._inputValueAccessor=s,this._previousNativeValue=this.value,this.id=this.id,this._platform.IOS&&this._ngZone.runOutsideAngular(()=>{this._cleanupIosKeyup=this._renderer.listen(s,`keyup`,this._iOSKeyupListener)}),this._errorStateTracker=new $t(o,a||this.ngControl,t,e,this.stateChanges),this._isServer=!this._platform.isBrowser,this._isNativeSelect=c===`select`,this._isTextarea=c===`textarea`,this._isInFormField=!!this._formField,this.disabledInteractive=this._config?.disabledInteractive||!1,this._isNativeSelect&&(this.controlType=s.multiple?`mat-native-select-multiple`:`mat-native-select`),this._signalBasedValueAccessor&&Do$1(()=>{this._signalBasedValueAccessor.value(),this.stateChanges.next()})}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(e=>{this.autofilled=e.isAutofilled,this.stateChanges.next()})}ngOnChanges(){this.stateChanges.next()}ngOnDestroy(){this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),this._cleanupIosKeyup?.(),this._cleanupWebkitWheel?.()}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==null&&this.ngControl.disabled!==this.disabled&&(this.disabled=this.ngControl.disabled,this.stateChanges.next())),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder()}focus(e){this._elementRef.nativeElement.focus(e)}updateErrorState(){this._errorStateTracker.updateErrorState()}_focusChanged(e){if(e!==this.focused){if(!this._isNativeSelect&&e&&this.disabled&&this.disabledInteractive){let t=this._elementRef.nativeElement;t.type===`number`?(t.type=`text`,t.setSelectionRange(0,0),t.type=`number`):t.setSelectionRange(0,0)}this.focused=e,this.stateChanges.next()}}_onInput(){}_dirtyCheckNativeValue(){let e=this._elementRef.nativeElement.value;this._previousNativeValue!==e&&(this._previousNativeValue=e,this.stateChanges.next())}_dirtyCheckPlaceholder(){let e=this._getPlaceholder();if(e!==this._previousPlaceholder){let t=this._elementRef.nativeElement;this._previousPlaceholder=e,e?t.setAttribute(`placeholder`,e):t.removeAttribute(`placeholder`)}}_getPlaceholder(){return this.placeholder||null}_validateType(){bd.indexOf(this._type)}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let e=this._elementRef.nativeElement.validity;return e&&e.badInput}get empty(){return!this._isNeverEmpty()&&!this._elementRef.nativeElement.value&&!this._isBadInput()&&!this.autofilled}get shouldLabelFloat(){if(this._isNativeSelect){let e=this._elementRef.nativeElement,t=e.options[0];return this.focused||e.multiple||!this.empty||!!(e.selectedIndex>-1&&t&&t.label)}else return this.focused&&!this.disabled||!this.empty}get describedByIds(){return this._elementRef.nativeElement.getAttribute(`aria-describedby`)?.split(` `)||[]}setDescribedByIds(e){let t=this._elementRef.nativeElement;e.length?t.setAttribute(`aria-describedby`,e.join(` `)):t.removeAttribute(`aria-describedby`)}onContainerClick(){this.focused||this.focus()}_isInlineSelect(){let e=this._elementRef.nativeElement;return this._isNativeSelect&&(e.multiple||e.size>1)}_iOSKeyupListener=e=>{let t=e.target;!t.value&&t.selectionStart===0&&t.selectionEnd===0&&(t.setSelectionRange(1,1),t.setSelectionRange(0,0))};_getReadonlyAttribute(){return this._isNativeSelect?null:this.readonly||this.disabled&&this.disabledInteractive?`true`:null}static ɵfac=function(t){return new(t||i)};static ɵdir=Tr({type:i,selectors:[[`input`,`matInput`,``],[`textarea`,`matInput`,``],[`select`,`matNativeControl`,``],[`input`,`matNativeControl`,``],[`textarea`,`matNativeControl`,``]],hostAttrs:[1,`mat-mdc-input-element`],hostVars:21,hostBindings:function(t,o){t&1&&Cm(`focus`,function(){return o._focusChanged(!0)})(`blur`,function(){return o._focusChanged(!1)})(`input`,function(){return o._onInput()}),t&2&&(Js$1(`id`,o.id)(`disabled`,o.disabled&&!o.disabledInteractive)(`required`,o.required),Po$1(`name`,o.name||null)(`readonly`,o._getReadonlyAttribute())(`aria-disabled`,o.disabled&&o.disabledInteractive?`true`:null)(`aria-invalid`,o.empty&&o.required?null:o.errorState)(`aria-required`,o.required)(`id`,o.id),Xs$1(`mat-input-server`,o._isServer)(`mat-mdc-form-field-textarea-control`,o._isInFormField&&o._isTextarea)(`mat-mdc-form-field-input-control`,o._isInFormField)(`mat-mdc-input-disabled-interactive`,o.disabledInteractive)(`mdc-text-field__input`,o._isInFormField)(`mat-mdc-native-select-inline`,o._isInlineSelect()))},inputs:{disabled:`disabled`,id:`id`,placeholder:`placeholder`,name:`name`,required:`required`,type:`type`,errorStateMatcher:`errorStateMatcher`,userAriaDescribedBy:[0,`aria-describedby`,`userAriaDescribedBy`],value:`value`,readonly:`readonly`,disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,Jm]},exportAs:[`matInput`],features:[$m([{provide:Nn,useExisting:i}]),Ao$1]})}return i})();var il=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵmod=$e$1({type:i});static ɵinj=Se({imports:[On,On,el,bv]})}return i})();var Hi=class i{label=t2.required();value=t2(``);disabled=t2(!1);changed=e2();static ɵfac=function(e){return new(e||i)};static ɵcmp=On$1({type:i,selectors:[[`bhw-text-field`]],inputs:{label:[1,`label`],value:[1,`value`],disabled:[1,`disabled`]},outputs:{changed:`changed`},decls:5,vars:3,consts:[[`field`,``],[`matInput`,``,`maxlength`,`1024`,3,`change`,`disabled`,`value`]],template:function(e,t){if(e&1){let o=bC();ks$1(0,`label`)(1,`span`),XC(2),Yl$1(),ks$1(3,`input`,1,0),Cm(`change`,function(){vp(o);let a=RC(4);return Dp(t.changed.emit(a.value))}),Yl$1()()}e&2&&(Sw(2),jm(t.label()),Sw(),vm(`disabled`,t.disabled())(`value`,t.value()))},dependencies:[il,nl],styles:[`[_nghost-%COMP%]{display:block;min-width:0}label[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:block;margin-bottom:.4rem;color:#b4b2bf;font-size:.75rem}input[_ngcontent-%COMP%]{box-sizing:border-box;width:100%;min-height:2.75rem;padding:.65rem .75rem;border:1px solid #42404a;border-radius:1rem;background:#101114;color:#edeaf2;font:inherit;transition:border-color .18s ease}input[_ngcontent-%COMP%]:not(:disabled):hover, input[_ngcontent-%COMP%]:not(:disabled):focus{border-color:#c58eff}input[_ngcontent-%COMP%]:focus{outline:none}`]})};var vd=[`*`];var Gi=class i{static nextId=0;contentId=`bhw-expansion-${i.nextId++}`;label=t2.required();expanded=be(!1);static ɵfac=function(e){return new(e||i)};static ɵcmp=On$1({type:i,selectors:[[`bhw-expansion`]],inputs:{label:[1,`label`]},ngContentSelectors:vd,decls:9,vars:10,consts:[[`mat-button`,``,`type`,`button`,3,`click`],[1,`heading-content`],[`name`,`expand`],[1,`collapsible`,3,`id`,`inert`],[1,`inner`],[1,`content`]],template:function(e,t){e&1&&(Ql$1(),ks$1(0,`button`,0),Cm(`click`,function(){return t.expanded.set(!t.expanded())}),ks$1(1,`span`,1),Dm(2,`bhw-icon`,2),ks$1(3,`span`),XC(4),Yl$1()()(),ks$1(5,`div`,3)(6,`div`,4)(7,`div`,5),Jl$1(8),Yl$1()()()),e&2&&(Po$1(`aria-controls`,t.contentId)(`aria-expanded`,t.expanded()),Sw(2),Xs$1(`expanded`,t.expanded()),Sw(2),jm(t.label()),Sw(),Xs$1(`expanded`,t.expanded()),vm(`id`,t.contentId)(`inert`,!t.expanded()),Po$1(`aria-hidden`,!t.expanded()))},dependencies:[Wt,Ti,Xe],styles:[`[_nghost-%COMP%]{display:block;min-width:0;border:1px solid #42404a;border-radius:1rem;background:#1e1d24}button[_ngcontent-%COMP%]{width:100%;min-height:3rem;justify-content:flex-start;border-radius:1rem}.heading-content[_ngcontent-%COMP%]{display:flex;align-items:center}bhw-icon[_ngcontent-%COMP%]{width:1.25rem;height:1.25rem;margin-inline-end:.5rem;transition:transform .25s ease}bhw-icon.expanded[_ngcontent-%COMP%]{transform:rotate(90deg)}.collapsible[_ngcontent-%COMP%]{display:grid;grid-template-rows:0fr;opacity:0;transition:grid-template-rows .25s ease,opacity .25s ease}.collapsible.expanded[_ngcontent-%COMP%]{grid-template-rows:1fr;opacity:1}.inner[_ngcontent-%COMP%]{min-height:0;overflow:hidden}.content[_ngcontent-%COMP%]{padding:0 1rem 1rem}`]})};var Ui=class i{country=t2.required();source=Sr(()=>`assets/flag/${this.country()}.svg`);static ɵfac=function(e){return new(e||i)};static ɵcmp=On$1({type:i,selectors:[[`bhw-flag`]],hostAttrs:[`aria-hidden`,`true`],inputs:{country:[1,`country`]},decls:1,vars:1,consts:[[`alt`,``,`height`,`14`,`width`,`20`,3,`src`]],template:function(e,t){e&1&&Qs$1(0,`img`,0),e&2&&Js$1(`src`,t.source())},styles:[`[_nghost-%COMP%]{display:inline-flex;flex-shrink:0;align-items:center}img[_ngcontent-%COMP%]{border-radius:.25rem;display:block;object-fit:cover}`]})};var yd=(i,n)=>n.code;function xd(i,n){if(i&1&&(ks$1(0,`mat-option`,4)(1,`span`,5),Dm(2,`bhw-flag`,3),ks$1(3,`span`,6),XC(4),Yl$1(),ks$1(5,`span`,7),XC(6),Yl$1()()()),i&2){let e=n.$implicit;vm(`value`,e.code),Sw(2),vm(`country`,e.flag),Sw(2),jm(e.code.toUpperCase()),Sw(),Po$1(`lang`,e.code),Sw(),jm(e.name)}}function kd(i,n){if(i&1){let e=bC();Im(0),ks$1(1,`mat-select`,1),Cm(`selectionChange`,function(o){vp(e);let r=SC();return Dp(r.select(o.value))}),ks$1(2,`mat-select-trigger`)(3,`span`,2),Dm(4,`bhw-flag`,3),ks$1(5,`span`),XC(6),Yl$1()()(),mC(7,xd,7,5,`mat-option`,4,yd),Yl$1(),wm()}if(i&2){let e=n.$implicit,t=SC();Sw(),ym(`aria-label`,e(`navigation.language`)),vm(`hideSingleSelectionIndicator`,!1)(`panelWidth`,220)(`value`,t.preferences.language()),Sw(3),vm(`country`,t.selected.flag),Sw(2),jm(t.selected.code.toUpperCase()),Sw(),yC(t.languages)}}var Wi=class i{constructor(n){this.preferences=n}preferences;languages=Av;get selected(){return this.languages.find(n=>n.code===this.preferences.language())??this.languages[0]}select(n){this.preferences.select(n)}static ɵfac=function(e){return new(e||i)(Rn$1(Ov))};static ɵcmp=On$1({type:i,selectors:[[`bhw-language-picker`]],decls:1,vars:0,consts:[[4,`transloco`],[`bhwSelectCursor`,``,`panelClass`,`bhw-language-panel`,3,`selectionChange`,`aria-label`,`hideSingleSelectionIndicator`,`panelWidth`,`value`],[1,`language-trigger`],[3,`country`],[3,`value`],[1,`language-option`],[1,`language-code`],[1,`language-name`]],template:function(e,t){e&1&&hm$1(0,kd,9,6,`ng-container`,0)},dependencies:[ji,qt,Qs,vt,Xt,zz,Ui],styles:[`[_nghost-%COMP%]{display:inline-flex;width:6.5rem;flex-shrink:0}mat-select[_ngcontent-%COMP%]{border-radius:1rem;background:#1e1d24}.language-trigger[_ngcontent-%COMP%], .language-option[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.6rem}.language-code[_ngcontent-%COMP%]{font-weight:500}.language-name[_ngcontent-%COMP%]{color:#b4b2bf}`]})};function Cd(i,n){if(i&1&&(Im(0),ks$1(1,`footer`,1)(2,`div`,2)(3,`p`),XC(4),ks$1(5,`a`,3),XC(6,`Beheader`),Yl$1(),XC(7,`.`),Yl$1(),ks$1(8,`p`),XC(9),Yl$1()(),ks$1(10,`nav`)(11,`a`,4),Dm(12,`bhw-icon`,5),XC(13),Yl$1(),ks$1(14,`span`,6),XC(15,`·`),Yl$1(),ks$1(16,`a`,7),Dm(17,`bhw-icon`,8),XC(18),Yl$1(),ks$1(19,`span`,6),XC(20,`·`),Yl$1(),ks$1(21,`a`,9),Dm(22,`bhw-icon`,10),XC(23),Yl$1()()(),wm()),i&2){let e=n.$implicit;Sw(4),ed$1(``,e(`footer.inspired`),` `),Sw(5),jm(e(`footer.independent`)),Sw(),Po$1(`aria-label`,e(`footer.links`)),Sw(3),jm(e(`footer.source`)),Sw(5),jm(e(`footer.patreon`)),Sw(5),jm(e(`footer.kofi`))}}var $i=class i{static ɵfac=function(e){return new(e||i)};static ɵcmp=On$1({type:i,selectors:[[`bhw-footer`]],decls:1,vars:0,consts:[[4,`transloco`],[1,`app-footer`],[1,`credit`],[`href`,`https://github.com/p2r3/beheader`,`rel`,`noopener noreferrer`,`target`,`_blank`],[`href`,`https://github.com/Crystal-Spider/beheader-web`,`rel`,`noopener noreferrer`,`target`,`_blank`],[`name`,`github`],[`aria-hidden`,`true`],[`href`,`https://www.patreon.com/crystalspider`,`rel`,`noopener noreferrer`,`target`,`_blank`],[`name`,`patreon`],[`href`,`https://ko-fi.com/crystalspider`,`rel`,`noopener noreferrer`,`target`,`_blank`],[`name`,`kofi`]],template:function(e,t){e&1&&hm$1(0,Cd,24,6,`ng-container`,0)},dependencies:[zz,Xe],styles:[`[_nghost-%COMP%]{display:block}.app-footer[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem 2rem;margin-top:2.5rem;padding-block:1.5rem;border-top:1px solid #42404a;color:#b4b2bf;font-size:.75rem}.app-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0}.app-footer[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem}.app-footer[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:.4rem;min-height:2.75rem}.app-footer[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   bhw-icon[_ngcontent-%COMP%]{width:1rem;height:1rem;color:#bcb6c1}`]})};function ol(i){return JSON.stringify({application:`beheader-web`,version:`0.1.0`,browser:navigator.userAgent,diagnostics:i.slice(0,30).map(({code:n,severity:e})=>({code:n,severity:e}))},null,2)}function rl(i){let n=[...new Set(i.map(e=>e.code))].slice(0,8).join(`, `);return`https://github.com/Crystal-Spider/beheader-web/issues/new?${new URLSearchParams({title:`Generation issue`,body:`Beheader Web 0.1.0
Diagnostic codes: ${n}

What happened?

Please review and attach the downloaded diagnostics if useful. Do not attach private input files.`})}`}function lr(i){return Array.from(i,n=>n.charCodeAt(0)<32?`_`:n).join(``).replace(/[<>:"/\\|?*]/g,`_`).replace(/[. ]+$/,``).slice(0,100)||`polyglot`}function mr(i){let n=i.cloneNode(!0),e=n.querySelectorAll(`[id]`),t=i.nodeName.toLowerCase();n.removeAttribute(`id`);for(let o=0;o<e.length;o++)e[o].removeAttribute(`id`);return t===`canvas`?ll(i,n):(t===`input`||t===`select`||t===`textarea`)&&sl(i,n),al(`canvas`,i,n,ll),al(`input, textarea, select`,i,n,sl),n}function al(i,n,e,t){let o=n.querySelectorAll(i);if(o.length){let r=e.querySelectorAll(i);for(let a=0;a<o.length;a++)t(o[a],r[a])}}var Sd=0;function sl(i,n){n.type!==`file`&&(n.value=i.value),n.type===`radio`&&n.name&&(n.name=`mat-clone-${n.name}-${Sd++}`)}function ll(i,n){let e=n.getContext(`2d`);if(e)try{e.drawImage(i,0,0)}catch{}}function _r(i){let n=i.getBoundingClientRect();return{top:n.top,right:n.right,bottom:n.bottom,left:n.left,width:n.width,height:n.height,x:n.x,y:n.y}}function ur(i,n,e){let{top:t,bottom:o,left:r,right:a}=i;return e>=t&&e<=o&&n>=r&&n<=a}function wd(i,n){let e=n.left<i.left,t=n.left+n.width>i.right,o=n.top<i.top,r=n.top+n.height>i.bottom;return e||t||o||r}function Tn(i,n,e){i.top+=n,i.bottom=i.top+i.height,i.left+=e,i.right=i.left+i.width}function cl(i,n,e,t){let{top:o,right:r,bottom:a,left:s,width:c,height:h}=i,p=c*n,_=h*n;return t>o-_&&t<a+_&&e>s-p&&e<r+p}var qi=class{_document;positions=new Map;constructor(n){this._document=n}clear(){this.positions.clear()}cache(n){this.clear(),this.positions.set(this._document,{scrollPosition:this.getViewportScrollPosition()}),n.forEach(e=>{this.positions.set(e,{scrollPosition:{top:e.scrollTop,left:e.scrollLeft},clientRect:_r(e)})})}handleScroll(n){let e=de(n),t=this.positions.get(e);if(!t)return null;let o=t.scrollPosition,r,a;if(e===this._document){let h=this.getViewportScrollPosition();r=h.top,a=h.left}else r=e.scrollTop,a=e.scrollLeft;let s=o.top-r,c=o.left-a;return this.positions.forEach((h,p)=>{h.clientRect&&e!==p&&e.contains(p)&&Tn(h.clientRect,s,c)}),o.top=r,o.left=a,{top:s,left:c}}getViewportScrollPosition(){return{top:window.scrollY,left:window.scrollX}}};function xl(i,n){let e=i.rootNodes;if(e.length===1&&e[0].nodeType===n.ELEMENT_NODE)return e[0];let t=n.createElement(`div`);return e.forEach(o=>t.appendChild(o)),t}function vr(i,n,e){for(let t in n)if(Object.hasOwn(n,t)){let o=n[t];o?i.setProperty(t,o,e?.has(t)?`important`:``):i.removeProperty(t)}return i}function Yt(i,n){let e=n?``:`none`;vr(i.style,{"touch-action":n?``:`none`,"-webkit-user-drag":n?``:`none`,"-webkit-tap-highlight-color":n?``:`transparent`,"user-select":e,"-ms-user-select":e,"-webkit-user-select":e,"-moz-user-select":e})}function dl(i,n,e){vr(i.style,{position:n?``:`fixed`,top:n?``:`0`,opacity:n?``:`0`,left:n?``:`-999em`},e)}function Xi(i,n){return n&&n!=`none`?i+` `+n:i}function ml(i,n){i.style.width=`${n.width}px`,i.style.height=`${n.height}px`,i.style.transform=Pn(n.left,n.top)}function Pn(i,n){return`translate3d(${Math.round(i)}px, ${Math.round(n)}px, 0)`}var Rn={capture:!0};var cr={passive:!1,capture:!0};var Ed=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵcmp=On$1({type:i,selectors:[[`ng-component`]],hostAttrs:[`cdk-drag-resets-container`,``],decls:0,vars:0,template:function(t,o){},styles:[`@layer cdk-resets {
  .cdk-drag-preview {
    background: none;
    border: none;
    padding: 0;
    color: inherit;
    overflow: visible;
    inset: auto;
  }
}
.cdk-drag-placeholder *,
.cdk-drag-preview * {
  pointer-events: none !important;
}
`],encapsulation:2})}return i})();var Yi=(()=>{class i{_ngZone=h(ee$1);_document=h(H);_styleLoader=h(DM);_renderer=h(Mn$1).createRenderer(null,null);_cleanupDocumentTouchmove;_scroll=new B;_dropInstances=new Set;_dragInstances=new Set;_activeDragInstances=be([]);_globalListeners;_draggingPredicate=e=>e.isDragging();_domNodesToDirectives=null;pointerMove=new B;pointerUp=new B;registerDropContainer(e){this._dropInstances.has(e)||this._dropInstances.add(e)}registerDragItem(e){this._dragInstances.add(e),this._dragInstances.size===1&&this._ngZone.runOutsideAngular(()=>{this._cleanupDocumentTouchmove?.(),this._cleanupDocumentTouchmove=this._renderer.listen(this._document,`touchmove`,this._persistentTouchmoveListener,cr)})}removeDropContainer(e){this._dropInstances.delete(e)}removeDragItem(e){this._dragInstances.delete(e),this.stopDragging(e),this._dragInstances.size===0&&this._cleanupDocumentTouchmove?.()}startDragging(e,t){if(!(this._activeDragInstances().indexOf(e)>-1)&&(this._styleLoader.load(Ed),this._activeDragInstances.update(o=>[...o,e]),this._activeDragInstances().length===1)){let o=t.type.startsWith(`touch`),r=s=>this.pointerUp.next(s),a=[[`scroll`,s=>this._scroll.next(s),Rn],[`selectstart`,this._preventDefaultWhileDragging,cr]];o?a.push([`touchend`,r,Rn],[`touchcancel`,r,Rn]):a.push([`mouseup`,r,Rn]),o||a.push([`mousemove`,s=>this.pointerMove.next(s),cr]),this._ngZone.runOutsideAngular(()=>{this._globalListeners=a.map(([s,c,h])=>this._renderer.listen(this._document,s,c,h))})}}stopDragging(e){this._activeDragInstances.update(t=>{let o=t.indexOf(e);return o>-1?(t.splice(o,1),[...t]):t}),this._activeDragInstances().length===0&&this._clearGlobalListeners()}isDragging(e){return this._activeDragInstances().indexOf(e)>-1}scrolled(e){let t=[this._scroll];return e&&e!==this._document&&t.push(new S(o=>this._ngZone.runOutsideAngular(()=>{let r=this._renderer.listen(e,`scroll`,a=>{this._activeDragInstances().length&&o.next(a)},Rn);return()=>{r()}}))),CD(...t)}registerDirectiveNode(e,t){this._domNodesToDirectives??=new WeakMap,this._domNodesToDirectives.set(e,t)}removeDirectiveNode(e){this._domNodesToDirectives?.delete(e)}getDragDirectiveForNode(e){return this._domNodesToDirectives?.get(e)||null}ngOnDestroy(){this._dragInstances.forEach(e=>this.removeDragItem(e)),this._dropInstances.forEach(e=>this.removeDropContainer(e)),this._domNodesToDirectives=null,this._clearGlobalListeners(),this.pointerMove.complete(),this.pointerUp.complete()}_preventDefaultWhileDragging=e=>{this._activeDragInstances().length>0&&e.preventDefault()};_persistentTouchmoveListener=e=>{this._activeDragInstances().length>0&&(this._activeDragInstances().some(this._draggingPredicate)&&e.preventDefault(),this.pointerMove.next(e))};_clearGlobalListeners(){this._globalListeners?.forEach(e=>e()),this._globalListeners=void 0}static ɵfac=function(t){return new(t||i)};static ɵprov=he$1({token:i,factory:i.ɵfac})}return i})();function ul(i){let n=i.toLowerCase().indexOf(`ms`)>-1?1:1e3;return parseFloat(i)*n}function Dd(i){let n=getComputedStyle(i),e=dr(n,`transition-property`),t=e.find(s=>s===`transform`||s===`all`);if(!t)return 0;let o=e.indexOf(t),r=dr(n,`transition-duration`),a=dr(n,`transition-delay`);return ul(r[o])+ul(a[o])}function dr(i,n){return i.getPropertyValue(n).split(`,`).map(t=>t.trim())}var Md=new Set([`position`]);var pr=class{_document;_rootElement;_direction;_initialDomRect;_previewTemplate;_previewClass;_pickupPositionOnPage;_initialTransform;_zIndex;_renderer;_previewEmbeddedView=null;_preview;get element(){return this._preview}constructor(n,e,t,o,r,a,s,c,h,p){this._document=n,this._rootElement=e,this._direction=t,this._initialDomRect=o,this._previewTemplate=r,this._previewClass=a,this._pickupPositionOnPage=s,this._initialTransform=c,this._zIndex=h,this._renderer=p}attach(n){this._preview=this._createPreview(),n.appendChild(this._preview),pl(this._preview)&&this._preview.showPopover()}destroy(){this._preview.remove(),this._previewEmbeddedView?.destroy(),this._preview=this._previewEmbeddedView=null}setTransform(n){this._preview.style.transform=n}getBoundingClientRect(){return this._preview.getBoundingClientRect()}addClass(n){this._preview.classList.add(n)}getTransitionDuration(){return Dd(this._preview)}addEventListener(n,e){return this._renderer.listen(this._preview,n,e)}_createPreview(){let n=this._previewTemplate,e=this._previewClass,t=n?n.template:null,o;if(t&&n){let r=n.matchSize?this._initialDomRect:null,a=n.viewContainer.createEmbeddedView(t,n.context);a.detectChanges(),o=xl(a,this._document),this._previewEmbeddedView=a,n.matchSize?ml(o,r):o.style.transform=Pn(this._pickupPositionOnPage.x,this._pickupPositionOnPage.y)}else o=mr(this._rootElement),ml(o,this._initialDomRect),this._initialTransform&&(o.style.transform=this._initialTransform);return vr(o.style,{"pointer-events":`none`,margin:pl(o)?`0 auto 0 0`:`0`,position:`fixed`,top:`0`,left:`0`,"z-index":this._zIndex+``},Md),Yt(o,!1),o.classList.add(`cdk-drag-preview`),o.setAttribute(`popover`,`manual`),o.setAttribute(`dir`,this._direction),e&&(Array.isArray(e)?e.forEach(r=>o.classList.add(r)):o.classList.add(e)),o}};function pl(i){return`showPopover`in i}var Nd={passive:!0};var hl={passive:!1};var Id={passive:!1,capture:!0};var Od=800;var fl=`cdk-drag-placeholder`;var bl=new Set([`position`]);function kl(i,n,e={dragStartThreshold:5,pointerDirectionChangeThreshold:5}){let t=i.get(Dr,null,{optional:!0})||i.get(Mn$1).createRenderer(null,null);return new hr(n,e,i.get(H),i.get(ee$1),i.get(Qe),i.get(Yi),t)}var hr=class{_config;_document;_ngZone;_viewportRuler;_dragDropRegistry;_renderer;_rootElementCleanups;_cleanupShadowRootSelectStart;_preview=null;_previewContainer;_placeholderRef=null;_placeholder;_pickupPositionInElement;_pickupPositionOnPage;_marker;_anchor=null;_passiveTransform={x:0,y:0};_activeTransform={x:0,y:0};_initialTransform;_hasStartedDragging=be(!1);_hasMoved=!1;_initialContainer;_initialIndex;_parentPositions;_moveEvents=new B;_pointerDirectionDelta;_pointerPositionAtLastDirectionChange;_lastKnownPointerPosition;_rootElement;_ownerSVGElement=null;_rootElementTapHighlight;_pointerMoveSubscription=K.EMPTY;_pointerUpSubscription=K.EMPTY;_scrollSubscription=K.EMPTY;_resizeSubscription=K.EMPTY;_lastTouchEventTime;_dragStartTime;_boundaryElement=null;_nativeInteractionsEnabled=!0;_initialDomRect;_previewRect;_boundaryRect;_previewTemplate;_placeholderTemplate;_handles=[];_disabledHandles=new Set;_dropContainer;_direction=`ltr`;_parentDragRef=null;_cachedShadowRoot;lockAxis=null;dragStartDelay=0;previewClass;scale=1;get disabled(){return this._disabled||!!(this._dropContainer&&this._dropContainer.disabled)}set disabled(n){n!==this._disabled&&(this._disabled=n,this._toggleNativeDragInteractions(),this._handles.forEach(e=>Yt(e,n)))}_disabled=!1;beforeStarted=new B;started=new B;released=new B;ended=new B;entered=new B;exited=new B;dropped=new B;moved=this._moveEvents;data;constrainPosition;constructor(n,e,t,o,r,a,s){this._config=e,this._document=t,this._ngZone=o,this._viewportRuler=r,this._dragDropRegistry=a,this._renderer=s,this.withRootElement(n).withParent(e.parentDragRef||null),this._parentPositions=new qi(t),a.registerDragItem(this)}getPlaceholderElement(){return this._placeholder}getRootElement(){return this._rootElement}getVisibleElement(){return this.isDragging()?this.getPlaceholderElement():this.getRootElement()}withHandles(n){this._handles=n.map(t=>me(t)),this._handles.forEach(t=>Yt(t,this.disabled)),this._toggleNativeDragInteractions();let e=new Set;return this._disabledHandles.forEach(t=>{this._handles.indexOf(t)>-1&&e.add(t)}),this._disabledHandles=e,this}withPreviewTemplate(n){return this._previewTemplate=n,this}withPlaceholderTemplate(n){return this._placeholderTemplate=n,this}withRootElement(n){let e=me(n);if(e!==this._rootElement){this._removeRootElementListeners();let t=this._renderer;this._rootElementCleanups=this._ngZone.runOutsideAngular(()=>[t.listen(e,`mousedown`,this._pointerDown,hl),t.listen(e,`touchstart`,this._pointerDown,Nd),t.listen(e,`dragstart`,this._nativeDragStart,hl)]),this._initialTransform=void 0,this._rootElement=e}return typeof SVGElement<`u`&&this._rootElement instanceof SVGElement&&(this._ownerSVGElement=this._rootElement.ownerSVGElement),this}withBoundaryElement(n){return this._boundaryElement=n?me(n):null,this._resizeSubscription.unsubscribe(),n&&(this._resizeSubscription=this._viewportRuler.change(10).subscribe(()=>this._containInsideBoundaryOnResize())),this}withParent(n){return this._parentDragRef=n,this}dispose(){this._removeRootElementListeners(),this.isDragging()&&this._rootElement?.remove(),this._marker?.remove(),this._destroyPreview(),this._destroyPlaceholder(),this._dragDropRegistry.removeDragItem(this),this._removeListeners(),this.beforeStarted.complete(),this.started.complete(),this.released.complete(),this.ended.complete(),this.entered.complete(),this.exited.complete(),this.dropped.complete(),this._moveEvents.complete(),this._handles=[],this._disabledHandles.clear(),this._dropContainer=void 0,this._resizeSubscription.unsubscribe(),this._parentPositions.clear(),this._boundaryElement=this._rootElement=this._ownerSVGElement=this._placeholderTemplate=this._previewTemplate=this._marker=this._parentDragRef=null}isDragging(){return this._hasStartedDragging()&&this._dragDropRegistry.isDragging(this)}reset(){this._rootElement.style.transform=this._initialTransform||``,this._activeTransform={x:0,y:0},this._passiveTransform={x:0,y:0}}resetToBoundary(){if(this._boundaryElement&&this._rootElement&&wd(this._boundaryElement.getBoundingClientRect(),this._rootElement.getBoundingClientRect())){let n=this._boundaryElement.getBoundingClientRect(),e=this._rootElement.getBoundingClientRect(),t=0,o=0;e.left<n.left?t=n.left-e.left:e.right>n.right&&(t=n.right-e.right),e.top<n.top?o=n.top-e.top:e.bottom>n.bottom&&(o=n.bottom-e.bottom);let r=this._activeTransform.x,a=this._activeTransform.y,s=r+t,c=a+o;this._rootElement.style.transform=Pn(s,c),this._activeTransform={x:s,y:c},this._passiveTransform={x:s,y:c}}}disableHandle(n){!this._disabledHandles.has(n)&&this._handles.indexOf(n)>-1&&(this._disabledHandles.add(n),Yt(n,!0))}enableHandle(n){this._disabledHandles.has(n)&&(this._disabledHandles.delete(n),Yt(n,this.disabled))}withDirection(n){return this._direction=n,this}_withDropContainer(n){this._dropContainer=n}getFreeDragPosition(){let n=this.isDragging()?this._activeTransform:this._passiveTransform;return{x:n.x,y:n.y}}setFreeDragPosition(n){return this._activeTransform={x:0,y:0},this._passiveTransform.x=n.x,this._passiveTransform.y=n.y,this._dropContainer||this._applyRootElementTransform(n.x,n.y),this}withPreviewContainer(n){return this._previewContainer=n,this}_sortFromLastPointerPosition(){let n=this._lastKnownPointerPosition;n&&this._dropContainer&&this._updateActiveDropContainer(this._getConstrainedPointerPosition(n),n)}_removeListeners(){this._pointerMoveSubscription.unsubscribe(),this._pointerUpSubscription.unsubscribe(),this._scrollSubscription.unsubscribe(),this._cleanupShadowRootSelectStart?.(),this._cleanupShadowRootSelectStart=void 0}_destroyPreview(){this._preview?.destroy(),this._preview=null}_destroyPlaceholder(){this._anchor?.remove(),this._placeholder?.remove(),this._placeholderRef?.destroy(),this._placeholder=this._anchor=this._placeholderRef=null}_pointerDown=n=>{if(this.beforeStarted.next(),this._handles.length){let e=this._getTargetHandle(n);e&&!this._disabledHandles.has(e)&&!this.disabled&&this._initializeDragSequence(e,n)}else this.disabled||this._initializeDragSequence(this._rootElement,n)};_pointerMove=n=>{let e=this._getPointerPositionOnPage(n);if(!this._hasStartedDragging()){if(Math.abs(e.x-this._pickupPositionOnPage.x)+Math.abs(e.y-this._pickupPositionOnPage.y)>=this._config.dragStartThreshold){let s=Date.now()>=this._dragStartTime+this._getDragStartDelay(n),c=this._dropContainer;if(!s){this._endDragSequence(n);return}(!c||!c.isDragging()&&!c.isReceiving())&&(n.cancelable&&n.preventDefault(),this._hasStartedDragging.set(!0),this._ngZone.run(()=>this._startDragSequence(n)))}return}n.cancelable&&n.preventDefault();let t=this._getConstrainedPointerPosition(e);if(this._hasMoved=!0,this._lastKnownPointerPosition=e,this._updatePointerDirectionDelta(t),this._dropContainer)this._updateActiveDropContainer(t,e);else{let o=this.constrainPosition?this._initialDomRect:this._pickupPositionOnPage,r=this._activeTransform;r.x=t.x-o.x+this._passiveTransform.x,r.y=t.y-o.y+this._passiveTransform.y,this._applyRootElementTransform(r.x,r.y)}this._moveEvents.observers.length&&this._ngZone.run(()=>{this._moveEvents.next({source:this,pointerPosition:t,event:n,distance:this._getDragDistance(t),delta:this._pointerDirectionDelta})})};_pointerUp=n=>{this._endDragSequence(n)};_endDragSequence(n){if(this._dragDropRegistry.isDragging(this)&&(this._removeListeners(),this._dragDropRegistry.stopDragging(this),this._toggleNativeDragInteractions(),this._handles&&(this._rootElement.style.webkitTapHighlightColor=this._rootElementTapHighlight),!!this._hasStartedDragging()))if(this.released.next({source:this,event:n}),this._dropContainer)this._dropContainer._stopScrolling(),this._animatePreviewToPlaceholder().then(()=>{this._cleanupDragArtifacts(n),this._cleanupCachedDimensions(),this._dragDropRegistry.stopDragging(this)});else{this._passiveTransform.x=this._activeTransform.x;let e=this._getPointerPositionOnPage(n);this._passiveTransform.y=this._activeTransform.y,this._ngZone.run(()=>{this.ended.next({source:this,distance:this._getDragDistance(e),dropPoint:e,event:n})}),this._cleanupCachedDimensions(),this._dragDropRegistry.stopDragging(this)}}_startDragSequence(n){An(n)&&(this._lastTouchEventTime=Date.now()),this._toggleNativeDragInteractions();let e=this._getShadowRoot(),t=this._dropContainer;if(e&&this._ngZone.runOutsideAngular(()=>{this._cleanupShadowRootSelectStart=this._renderer.listen(e,`selectstart`,Rd,Id)}),t){let o=this._rootElement,r=o.parentNode,a=this._placeholder=this._createPlaceholderElement(),s=this._marker=this._marker||this._document.createComment(``);r.insertBefore(s,o),this._initialTransform=o.style.transform||``,this._preview=new pr(this._document,this._rootElement,this._direction,this._initialDomRect,this._previewTemplate||null,this.previewClass||null,this._pickupPositionOnPage,this._initialTransform,this._config.zIndex||1e3,this._renderer),this._preview.attach(this._getPreviewInsertionPoint(r,e)),dl(o,!1,bl),this._document.body.appendChild(r.replaceChild(a,o)),this.started.next({source:this,event:n}),t.start(),this._initialContainer=t,this._initialIndex=t.getItemIndex(this)}else this.started.next({source:this,event:n}),this._initialContainer=this._initialIndex=void 0;this._parentPositions.cache(t?t.getScrollableParents():[])}_initializeDragSequence(n,e){this._parentDragRef&&e.stopPropagation();let t=this.isDragging(),o=An(e),r=!o&&e.button!==0,a=this._rootElement,s=de(e),c=!o&&this._lastTouchEventTime&&this._lastTouchEventTime+Od>Date.now(),h=o?xt(e):yt(e);if(s&&s.draggable&&e.type===`mousedown`&&e.preventDefault(),t||r||c||h)return;if(this._handles.length){let E=a.style;this._rootElementTapHighlight=E.webkitTapHighlightColor||``,E.webkitTapHighlightColor=`transparent`}this._hasMoved=!1,this._hasStartedDragging.set(this._hasMoved),this._removeListeners(),this._initialDomRect=this._rootElement.getBoundingClientRect(),this._pointerMoveSubscription=this._dragDropRegistry.pointerMove.subscribe(this._pointerMove),this._pointerUpSubscription=this._dragDropRegistry.pointerUp.subscribe(this._pointerUp),this._scrollSubscription=this._dragDropRegistry.scrolled(this._getShadowRoot()).subscribe(E=>this._updateOnScroll(E)),this._boundaryElement&&(this._boundaryRect=_r(this._boundaryElement));let p=this._previewTemplate;this._pickupPositionInElement=p&&p.template&&!p.matchSize?{x:0,y:0}:this._getPointerPositionInElement(this._initialDomRect,n,e);let _=this._pickupPositionOnPage=this._lastKnownPointerPosition=this._getPointerPositionOnPage(e);this._pointerDirectionDelta={x:0,y:0},this._pointerPositionAtLastDirectionChange={x:_.x,y:_.y},this._dragStartTime=Date.now(),this._dragDropRegistry.startDragging(this,e)}_cleanupDragArtifacts(n){dl(this._rootElement,!0,bl),this._marker.parentNode.replaceChild(this._rootElement,this._marker),this._destroyPreview(),this._destroyPlaceholder(),this._initialDomRect=this._boundaryRect=this._previewRect=this._initialTransform=void 0,this._ngZone.run(()=>{let e=this._dropContainer,t=e.getItemIndex(this),o=this._getPointerPositionOnPage(n),r=this._getDragDistance(o),a=e._isOverContainer(o.x,o.y);this.ended.next({source:this,distance:r,dropPoint:o,event:n}),this.dropped.next({item:this,currentIndex:t,previousIndex:this._initialIndex,container:e,previousContainer:this._initialContainer,isPointerOverContainer:a,distance:r,dropPoint:o,event:n}),e.drop(this,t,this._initialIndex,this._initialContainer,a,r,o,n),this._dropContainer=this._initialContainer})}_updateActiveDropContainer({x:n,y:e},{x:t,y:o}){let r=this._initialContainer._getSiblingContainerFromPosition(this,n,e);!r&&this._dropContainer!==this._initialContainer&&this._initialContainer._isOverContainer(n,e)&&(r=this._initialContainer),r&&r!==this._dropContainer&&this._ngZone.run(()=>{let a=this._dropContainer.getItemIndex(this),s=this._dropContainer.getItemAtIndex(a+1)?.getVisibleElement()||null;this.exited.next({item:this,container:this._dropContainer}),this._dropContainer.exit(this),this._conditionallyInsertAnchor(r,this._dropContainer,s),this._dropContainer=r,this._dropContainer.enter(this,n,e,r===this._initialContainer&&r.sortingDisabled?this._initialIndex:void 0),this.entered.next({item:this,container:r,currentIndex:r.getItemIndex(this)})}),this.isDragging()&&(this._dropContainer._startScrollingIfNecessary(t,o),this._dropContainer._sortItem(this,n,e,this._pointerDirectionDelta),this.constrainPosition?this._applyPreviewTransform(n,e):this._applyPreviewTransform(n-this._pickupPositionInElement.x,e-this._pickupPositionInElement.y))}_animatePreviewToPlaceholder(){if(!this._hasMoved)return Promise.resolve();let n=this._placeholder.getBoundingClientRect();this._preview.addClass(`cdk-drag-animating`),this._applyPreviewTransform(n.left,n.top);let e=this._preview.getTransitionDuration();return e===0?Promise.resolve():this._ngZone.runOutsideAngular(()=>new Promise(t=>{let o=s=>{(!s||this._preview&&de(s)===this._preview.element&&s.propertyName===`transform`)&&(a(),t(),clearTimeout(r))},r=setTimeout(o,e*1.5),a=this._preview.addEventListener(`transitionend`,o)}))}_createPlaceholderElement(){let n=this._placeholderTemplate,e=n?n.template:null,t;return e?(this._placeholderRef=n.viewContainer.createEmbeddedView(e,n.context),this._placeholderRef.detectChanges(),t=xl(this._placeholderRef,this._document)):t=mr(this._rootElement),t.style.pointerEvents=`none`,t.classList.add(fl),t}_getPointerPositionInElement(n,e,t){let o=e===this._rootElement?null:e,r=o?o.getBoundingClientRect():n,a=An(t)?t.targetTouches[0]:t,s=this._getViewportScrollPosition(),c=a.pageX-r.left-s.left,h=a.pageY-r.top-s.top;return{x:r.left-n.left+c,y:r.top-n.top+h}}_getPointerPositionOnPage(n){let e=this._getViewportScrollPosition(),t=An(n)?n.targetTouches[0]||n.changedTouches[0]||{pageX:0,pageY:0}:n,o=t.pageX-e.left,r=t.pageY-e.top;if(this._ownerSVGElement){let a=this._ownerSVGElement.getScreenCTM();if(a){let s=this._ownerSVGElement.createSVGPoint();return s.x=o,s.y=r,s.matrixTransform(a.inverse())}}return{x:o,y:r}}_getConstrainedPointerPosition(n){let e=this._dropContainer?this._dropContainer.lockAxis:null,{x:t,y:o}=this.constrainPosition?this.constrainPosition(n,this,this._initialDomRect,this._pickupPositionInElement):n;if(this.lockAxis===`x`||e===`x`?o=this._pickupPositionOnPage.y-(this.constrainPosition?this._pickupPositionInElement.y:0):(this.lockAxis===`y`||e===`y`)&&(t=this._pickupPositionOnPage.x-(this.constrainPosition?this._pickupPositionInElement.x:0)),this._boundaryRect){let{x:r,y:a}=this.constrainPosition?{x:0,y:0}:this._pickupPositionInElement,s=this._boundaryRect,{width:c,height:h}=this._getPreviewRect(),p=s.top+a,_=s.bottom-(h-a),E=s.left+r,g=s.right-(c-r);t=gl(t,E,g),o=gl(o,p,_)}return{x:t,y:o}}_updatePointerDirectionDelta(n){let{x:e,y:t}=n,o=this._pointerDirectionDelta,r=this._pointerPositionAtLastDirectionChange,a=Math.abs(e-r.x),s=Math.abs(t-r.y);return a>this._config.pointerDirectionChangeThreshold&&(o.x=e>r.x?1:-1,r.x=e),s>this._config.pointerDirectionChangeThreshold&&(o.y=t>r.y?1:-1,r.y=t),o}_toggleNativeDragInteractions(){if(!this._rootElement||!this._handles)return;let n=this._handles.length>0||!this.isDragging();n!==this._nativeInteractionsEnabled&&(this._nativeInteractionsEnabled=n,Yt(this._rootElement,n))}_removeRootElementListeners(){this._rootElementCleanups?.forEach(n=>n()),this._rootElementCleanups=void 0}_applyRootElementTransform(n,e){let t=1/this.scale,o=Pn(n*t,e*t),r=this._rootElement.style;this._initialTransform??=r.transform&&r.transform!=`none`?r.transform:``,r.transform=Xi(o,this._initialTransform)}_applyPreviewTransform(n,e){let t=this._previewTemplate?.template?void 0:this._initialTransform,o=Pn(n,e);this._preview.setTransform(Xi(o,t))}_getDragDistance(n){let e=this._pickupPositionOnPage;return e?{x:n.x-e.x,y:n.y-e.y}:{x:0,y:0}}_cleanupCachedDimensions(){this._boundaryRect=this._previewRect=void 0,this._parentPositions.clear()}_containInsideBoundaryOnResize(){let{x:n,y:e}=this._passiveTransform;if(n===0&&e===0||this.isDragging()||!this._boundaryElement)return;let t=this._rootElement.getBoundingClientRect(),o=this._boundaryElement.getBoundingClientRect();if(o.width===0&&o.height===0||t.width===0&&t.height===0)return;let r=o.left-t.left,a=t.right-o.right,s=o.top-t.top,c=t.bottom-o.bottom;o.width>t.width?(r>0&&(n+=r),a>0&&(n-=a)):n=0,o.height>t.height?(s>0&&(e+=s),c>0&&(e-=c)):e=0,(n!==this._passiveTransform.x||e!==this._passiveTransform.y)&&this.setFreeDragPosition({y:e,x:n})}_getDragStartDelay(n){let e=this.dragStartDelay;return typeof e==`number`?e:An(n)?e.touch:e?e.mouse:0}_updateOnScroll(n){let e=this._parentPositions.handleScroll(n);if(e){let t=de(n);this._boundaryRect&&t!==this._boundaryElement&&t.contains(this._boundaryElement)&&Tn(this._boundaryRect,e.top,e.left),this._pickupPositionOnPage.x+=e.left,this._pickupPositionOnPage.y+=e.top,this._dropContainer||(this._activeTransform.x-=e.left,this._activeTransform.y-=e.top,this._applyRootElementTransform(this._activeTransform.x,this._activeTransform.y))}}_getViewportScrollPosition(){return this._parentPositions.positions.get(this._document)?.scrollPosition||this._parentPositions.getViewportScrollPosition()}_getShadowRoot(){return this._cachedShadowRoot===void 0&&(this._cachedShadowRoot=kt(this._rootElement)),this._cachedShadowRoot}_getPreviewInsertionPoint(n,e){let t=this._previewContainer||`global`;if(t===`parent`)return n;if(t===`global`){let o=this._document;return e||o.fullscreenElement||o.webkitFullscreenElement||o.body}return me(t)}_getPreviewRect(){return(!this._previewRect||!this._previewRect.width&&!this._previewRect.height)&&(this._previewRect=this._preview?this._preview.getBoundingClientRect():this._initialDomRect),this._previewRect}_nativeDragStart=n=>{if(this._handles.length){let e=this._getTargetHandle(n);e&&!this._disabledHandles.has(e)&&!this.disabled&&n.preventDefault()}else this.disabled||n.preventDefault()};_getTargetHandle(n){return this._handles.find(e=>n.target&&(n.target===e||e.contains(n.target)))}_conditionallyInsertAnchor(n,e,t){if(n===this._initialContainer)this._anchor?.remove(),this._anchor=null;else if(e===this._initialContainer&&e.hasAnchor){let o=this._anchor??=mr(this._placeholder);o.classList.remove(fl),o.classList.add(`cdk-drag-anchor`),o.style.transform=``,t?t.before(o):me(e.element).appendChild(o)}}};function gl(i,n,e){return Math.max(n,Math.min(e,i))}function An(i){return i.type[0]===`t`}function Rd(i){i.preventDefault()}function Cl(i,n,e){let t=_l(n,i.length-1),o=_l(e,i.length-1);if(t===o)return;let r=i[t],a=o<t?-1:1;for(let s=t;s!==o;s+=a)i[s]=i[s+a];i[o]=r}function _l(i,n){return Math.max(0,Math.min(n,i))}var Ki=class{_dragDropRegistry;_element;_sortPredicate;_itemPositions=[];_activeDraggables;orientation=`vertical`;direction=`ltr`;constructor(n){this._dragDropRegistry=n}_previousSwap={drag:null,delta:0,overlaps:!1};start(n){this.withItems(n)}sort(n,e,t,o){let r=this._itemPositions,a=this._getItemIndexFromPointerPosition(n,e,t,o);if(a===-1&&r.length>0)return null;let s=this.orientation===`horizontal`,c=r.findIndex(se=>se.drag===n),h=r[a],p=r[c].clientRect,_=h.clientRect,E=c>a?1:-1,g=this._getItemOffsetPx(p,_,E),T=this._getSiblingOffsetPx(c,r,E),j=r.slice();return Cl(r,c,a),r.forEach((se,Mt)=>{if(j[Mt]===se)return;let st=se.drag===n,lt=st?g:T,Fn=st?n.getPlaceholderElement():se.drag.getRootElement();se.offset+=lt;let Vn=Math.round(se.offset*(1/se.drag.scale));s?(Fn.style.transform=Xi(`translate3d(${Vn}px, 0, 0)`,se.initialTransform),Tn(se.clientRect,0,lt)):(Fn.style.transform=Xi(`translate3d(0, ${Vn}px, 0)`,se.initialTransform),Tn(se.clientRect,lt,0))}),this._previousSwap.overlaps=ur(_,e,t),this._previousSwap.drag=h.drag,this._previousSwap.delta=s?o.x:o.y,{previousIndex:c,currentIndex:a}}enter(n,e,t,o){let r=this._activeDraggables,a=r.indexOf(n),s=n.getPlaceholderElement();a>-1&&r.splice(a,1);let c=o==null||o<0?this._getItemIndexFromPointerPosition(n,e,t):o,h=r[c];if(h===n&&(h=r[c+1]),!h&&(c==null||c===-1||c<r.length-1)&&this._shouldEnterAsFirstChild(e,t)&&(h=r[0]),h&&!this._dragDropRegistry.isDragging(h)){let p=h.getRootElement();p.parentElement.insertBefore(s,p),r.splice(c,0,n)}else this._element.appendChild(s),r.push(n);s.style.transform=``,this._cacheItemPositions()}withItems(n){this._activeDraggables=n.slice(),this._cacheItemPositions()}withSortPredicate(n){this._sortPredicate=n}reset(){this._activeDraggables?.forEach(n=>{let e=n.getRootElement();if(e){let t=this._itemPositions.find(o=>o.drag===n)?.initialTransform;e.style.transform=t||``}}),this._itemPositions=[],this._activeDraggables=[],this._previousSwap.drag=null,this._previousSwap.delta=0,this._previousSwap.overlaps=!1}getActiveItemsSnapshot(){return this._activeDraggables}getItemIndex(n){return this._getVisualItemPositions().findIndex(e=>e.drag===n)}getItemAtIndex(n){return this._getVisualItemPositions()[n]?.drag||null}updateOnScroll(n,e){this._itemPositions.forEach(({clientRect:t})=>{Tn(t,n,e)}),this._itemPositions.forEach(({drag:t})=>{this._dragDropRegistry.isDragging(t)&&t._sortFromLastPointerPosition()})}withElementContainer(n){this._element=n}_cacheItemPositions(){let n=this.orientation===`horizontal`;this._itemPositions=this._activeDraggables.map(e=>{let t=e.getVisibleElement();return{drag:e,offset:0,initialTransform:t.style.transform||``,clientRect:_r(t)}}).sort((e,t)=>n?e.clientRect.left-t.clientRect.left:e.clientRect.top-t.clientRect.top)}_getVisualItemPositions(){return this.orientation===`horizontal`&&this.direction===`rtl`?this._itemPositions.slice().reverse():this._itemPositions}_getItemOffsetPx(n,e,t){let o=this.orientation===`horizontal`,r=o?e.left-n.left:e.top-n.top;return t===-1&&(r+=o?e.width-n.width:e.height-n.height),r}_getSiblingOffsetPx(n,e,t){let o=this.orientation===`horizontal`,r=e[n].clientRect,a=e[n+t*-1],s=r[o?`width`:`height`]*t;if(a){let c=o?`left`:`top`,h=o?`right`:`bottom`;t===-1?s-=a.clientRect[c]-r[h]:s+=r[c]-a.clientRect[h]}return s}_shouldEnterAsFirstChild(n,e){if(!this._activeDraggables.length)return!1;let t=this._itemPositions,o=this.orientation===`horizontal`;if(t[0].drag!==this._activeDraggables[0]){let a=t[t.length-1].clientRect;return o?n>=a.right:e>=a.bottom}else{let a=t[0].clientRect;return o?n<=a.left:e<=a.top}}_getItemIndexFromPointerPosition(n,e,t,o){let r=this.orientation===`horizontal`,a=this._itemPositions.findIndex(({drag:s,clientRect:c})=>{if(s===n)return!1;if(o){let h=r?o.x:o.y;if(s===this._previousSwap.drag&&this._previousSwap.overlaps&&h===this._previousSwap.delta)return!1}return r?e>=Math.floor(c.left)&&e<Math.floor(c.right):t>=Math.floor(c.top)&&t<Math.floor(c.bottom)});return a===-1||!this._sortPredicate(a,n)?-1:a}};var fr=class{_document;_dragDropRegistry;_element;_sortPredicate;_rootNode;_activeItems;_previousSwap={drag:null,deltaX:0,deltaY:0,overlaps:!1};_relatedNodes=[];constructor(n,e){this._document=n,this._dragDropRegistry=e}start(n){let e=this._element.childNodes;this._relatedNodes=[];for(let t=0;t<e.length;t++){let o=e[t];this._relatedNodes.push([o,o.nextSibling])}this.withItems(n)}sort(n,e,t,o){let r=this._getItemIndexFromPointerPosition(n,e,t),a=this._previousSwap;if(r===-1||this._activeItems[r]===n)return null;let s=this._activeItems[r];if(a.drag===s&&a.overlaps&&a.deltaX===o.x&&a.deltaY===o.y)return null;let c=this.getItemIndex(n),h=n.getPlaceholderElement(),p=s.getRootElement();r>c?p.after(h):p.before(h),Cl(this._activeItems,c,r);let _=this._getRootNode().elementFromPoint(e,t);return a.deltaX=o.x,a.deltaY=o.y,a.drag=s,a.overlaps=p===_||p.contains(_),{previousIndex:c,currentIndex:r}}enter(n,e,t,o){let r=this._activeItems.indexOf(n);r>-1&&this._activeItems.splice(r,1);let a=o==null||o<0?this._getItemIndexFromPointerPosition(n,e,t):o;a===-1&&(a=this._getClosestItemIndexToPointer(n,e,t));let s=this._activeItems[a];s&&!this._dragDropRegistry.isDragging(s)?(this._activeItems.splice(a,0,n),s.getRootElement().before(n.getPlaceholderElement())):(this._activeItems.push(n),this._element.appendChild(n.getPlaceholderElement()))}withItems(n){this._activeItems=n.slice()}withSortPredicate(n){this._sortPredicate=n}reset(){let n=this._element,e=this._previousSwap;for(let t=this._relatedNodes.length-1;t>-1;t--){let[o,r]=this._relatedNodes[t];o.parentNode===n&&o.nextSibling!==r&&(r===null?n.appendChild(o):r.parentNode===n&&n.insertBefore(o,r))}this._relatedNodes=[],this._activeItems=[],e.drag=null,e.deltaX=e.deltaY=0,e.overlaps=!1}getActiveItemsSnapshot(){return this._activeItems}getItemIndex(n){return this._activeItems.indexOf(n)}getItemAtIndex(n){return this._activeItems[n]||null}updateOnScroll(){this._activeItems.forEach(n=>{this._dragDropRegistry.isDragging(n)&&n._sortFromLastPointerPosition()})}withElementContainer(n){n!==this._element&&(this._element=n,this._rootNode=void 0)}_getItemIndexFromPointerPosition(n,e,t){let o=this._getRootNode().elementFromPoint(Math.floor(e),Math.floor(t)),r=o?this._activeItems.findIndex(a=>{let s=a.getRootElement();return o===s||s.contains(o)}):-1;return r===-1||!this._sortPredicate(r,n)?-1:r}_getRootNode(){return this._rootNode||(this._rootNode=kt(this._element)||this._document),this._rootNode}_getClosestItemIndexToPointer(n,e,t){if(this._activeItems.length===0)return-1;if(this._activeItems.length===1)return 0;let o=1/0,r=-1;for(let a=0;a<this._activeItems.length;a++){let s=this._activeItems[a];if(s!==n){let{x:c,y:h}=s.getRootElement().getBoundingClientRect(),p=Math.hypot(e-c,t-h);p<o&&(o=p,r=a)}}return r}};var vl=.05;var Sl=.05;var Ke=(function(i){return i[i.NONE=0]=`NONE`,i[i.UP=1]=`UP`,i[i.DOWN=2]=`DOWN`,i})(Ke||{});var Ae=(function(i){return i[i.NONE=0]=`NONE`,i[i.LEFT=1]=`LEFT`,i[i.RIGHT=2]=`RIGHT`,i})(Ae||{});function wl(i,n){return new br(n,i.get(Yi),i.get(H),i.get(ee$1),i.get(Qe))}var br=class{_dragDropRegistry;_ngZone;_viewportRuler;element;disabled=!1;sortingDisabled=!1;lockAxis=null;autoScrollDisabled=!1;autoScrollStep=2;hasAnchor=!1;enterPredicate=()=>!0;sortPredicate=()=>!0;beforeStarted=new B;entered=new B;exited=new B;dropped=new B;sorted=new B;receivingStarted=new B;receivingStopped=new B;data;_container;_isDragging=!1;_parentPositions;_sortStrategy;_domRect;_draggables=[];_siblings=[];_activeSiblings=new Set;_viewportScrollSubscription=K.EMPTY;_verticalScrollDirection=Ke.NONE;_horizontalScrollDirection=Ae.NONE;_scrollNode;_stopScrollTimers=new B;_cachedShadowRoot=null;_document;_scrollableElements=[];_initialScrollSnap;_direction=`ltr`;constructor(n,e,t,o,r){this._dragDropRegistry=e,this._ngZone=o,this._viewportRuler=r;let a=this.element=me(n);this._document=t,this.withOrientation(`vertical`).withElementContainer(a),e.registerDropContainer(this),this._parentPositions=new qi(t)}dispose(){this._stopScrolling(),this._stopScrollTimers.complete(),this._viewportScrollSubscription.unsubscribe(),this.beforeStarted.complete(),this.entered.complete(),this.exited.complete(),this.dropped.complete(),this.sorted.complete(),this.receivingStarted.complete(),this.receivingStopped.complete(),this._activeSiblings.clear(),this._scrollNode=null,this._parentPositions.clear(),this._dragDropRegistry.removeDropContainer(this)}isDragging(){return this._isDragging}start(){this._draggingStarted(),this._notifyReceivingSiblings()}enter(n,e,t,o){this._draggingStarted(),o==null&&this.sortingDisabled&&(o=this._draggables.indexOf(n)),this._sortStrategy.enter(n,e,t,o),this._cacheParentPositions(),this._notifyReceivingSiblings(),this.entered.next({item:n,container:this,currentIndex:this.getItemIndex(n)})}exit(n){this._reset(),this.exited.next({item:n,container:this})}drop(n,e,t,o,r,a,s,c){this._reset(),this.dropped.next({item:n,currentIndex:e,previousIndex:t,container:this,previousContainer:o,isPointerOverContainer:r,distance:a,dropPoint:s,event:c})}withItems(n){let e=this._draggables;return this._draggables=n,n.forEach(t=>t._withDropContainer(this)),this.isDragging()&&(e.filter(o=>o.isDragging()).every(o=>n.indexOf(o)===-1)?this._reset():this._sortStrategy.withItems(this._draggables)),this}withDirection(n){return this._direction=n,this._sortStrategy instanceof Ki&&(this._sortStrategy.direction=n),this}connectedTo(n){return this._siblings=n.slice(),this}withOrientation(n){if(n===`mixed`)this._sortStrategy=new fr(this._document,this._dragDropRegistry);else{let e=new Ki(this._dragDropRegistry);e.direction=this._direction,e.orientation=n,this._sortStrategy=e}return this._sortStrategy.withElementContainer(this._container),this._sortStrategy.withSortPredicate((e,t)=>this.sortPredicate(e,t,this)),this}withScrollableParents(n){let e=this._container;return this._scrollableElements=n.indexOf(e)===-1?[e,...n]:n.slice(),this}withElementContainer(n){if(n===this._container)return this;me(this.element);let t=this._scrollableElements.indexOf(this._container),o=this._scrollableElements.indexOf(n);return t>-1&&this._scrollableElements.splice(t,1),o>-1&&this._scrollableElements.splice(o,1),this._sortStrategy&&this._sortStrategy.withElementContainer(n),this._cachedShadowRoot=null,this._scrollableElements.unshift(n),this._container=n,this}getScrollableParents(){return this._scrollableElements}getItemIndex(n){return this._isDragging?this._sortStrategy.getItemIndex(n):this._draggables.indexOf(n)}getItemAtIndex(n){return this._isDragging?this._sortStrategy.getItemAtIndex(n):this._draggables[n]||null}isReceiving(){return this._activeSiblings.size>0}_sortItem(n,e,t,o){if(this.sortingDisabled||!this._domRect||!cl(this._domRect,vl,e,t))return;let r=this._sortStrategy.sort(n,e,t,o);r&&this.sorted.next({previousIndex:r.previousIndex,currentIndex:r.currentIndex,container:this,item:n})}_startScrollingIfNecessary(n,e){if(this.autoScrollDisabled)return;let t,o=Ke.NONE,r=Ae.NONE;if(this._parentPositions.positions.forEach((a,s)=>{s===this._document||!a.clientRect||t||cl(a.clientRect,vl,n,e)&&([o,r]=Ad(s,a.clientRect,this._direction,n,e),(o||r)&&(t=s))}),!o&&!r){let{width:a,height:s}=this._viewportRuler.getViewportSize(),c={width:a,height:s,top:0,right:a,bottom:s,left:0};o=El(c,e),r=Dl(c,n),t=window}t&&(o!==this._verticalScrollDirection||r!==this._horizontalScrollDirection||t!==this._scrollNode)&&(this._verticalScrollDirection=o,this._horizontalScrollDirection=r,this._scrollNode=t,(o||r)&&t?this._ngZone.runOutsideAngular(this._startScrollInterval):this._stopScrolling())}_stopScrolling(){this._stopScrollTimers.next()}_draggingStarted(){let n=this._container.style;this.beforeStarted.next(),this._isDragging=!0,this._initialScrollSnap=n.msScrollSnapType||n.scrollSnapType||``,n.scrollSnapType=n.msScrollSnapType=`none`,this._sortStrategy.start(this._draggables),this._cacheParentPositions(),this._viewportScrollSubscription.unsubscribe(),this._listenToScrollEvents()}_cacheParentPositions(){this._parentPositions.cache(this._scrollableElements),this._domRect=this._parentPositions.positions.get(this._container).clientRect}_reset(){this._isDragging=!1;let n=this._container.style;n.scrollSnapType=n.msScrollSnapType=this._initialScrollSnap,this._siblings.forEach(e=>e._stopReceiving(this)),this._sortStrategy.reset(),this._stopScrolling(),this._viewportScrollSubscription.unsubscribe(),this._parentPositions.clear()}_startScrollInterval=()=>{this._stopScrolling(),bD(0,Xv).pipe(lc$1(this._stopScrollTimers)).subscribe(()=>{let n=this._scrollNode,e=this.autoScrollStep;this._verticalScrollDirection===Ke.UP?n.scrollBy(0,-e):this._verticalScrollDirection===Ke.DOWN&&n.scrollBy(0,e),this._horizontalScrollDirection===Ae.LEFT?n.scrollBy(-e,0):this._horizontalScrollDirection===Ae.RIGHT&&n.scrollBy(e,0)})};_isOverContainer(n,e){return this._domRect!=null&&ur(this._domRect,n,e)}_getSiblingContainerFromPosition(n,e,t){return this._siblings.find(o=>o._canReceive(n,e,t))}_canReceive(n,e,t){if(!this._domRect||!ur(this._domRect,e,t)||!this.enterPredicate(n,this))return!1;let o=this._getShadowRoot().elementFromPoint(e,t);return o?o===this._container||this._container.contains(o):!1}_startReceiving(n,e){let t=this._activeSiblings;!t.has(n)&&e.every(o=>this.enterPredicate(o,this)||this._draggables.indexOf(o)>-1)&&(t.add(n),this._cacheParentPositions(),this._listenToScrollEvents(),this.receivingStarted.next({initiator:n,receiver:this,items:e}))}_stopReceiving(n){this._activeSiblings.delete(n),this._viewportScrollSubscription.unsubscribe(),this.receivingStopped.next({initiator:n,receiver:this})}_listenToScrollEvents(){this._viewportScrollSubscription=this._dragDropRegistry.scrolled(this._getShadowRoot()).subscribe(n=>{if(this.isDragging()){let e=this._parentPositions.handleScroll(n);e&&this._sortStrategy.updateOnScroll(e.top,e.left)}else this.isReceiving()&&this._cacheParentPositions()})}_getShadowRoot(){if(!this._cachedShadowRoot){let n=kt(this._container);this._cachedShadowRoot=n||this._document}return this._cachedShadowRoot}_notifyReceivingSiblings(){let n=this._sortStrategy.getActiveItemsSnapshot().filter(e=>e.isDragging());this._siblings.forEach(e=>e._startReceiving(this,n))}};function El(i,n){let{top:e,bottom:t,height:o}=i,r=o*Sl;return n>=e-r&&n<=e+r?Ke.UP:n>=t-r&&n<=t+r?Ke.DOWN:Ke.NONE}function Dl(i,n){let{left:e,right:t,width:o}=i,r=o*Sl;return n>=e-r&&n<=e+r?Ae.LEFT:n>=t-r&&n<=t+r?Ae.RIGHT:Ae.NONE}function Ad(i,n,e,t,o){let r=El(n,o),a=Dl(n,t),s=Ke.NONE,c=Ae.NONE;if(r){let h=i.scrollTop;r===Ke.UP?h>0&&(s=Ke.UP):i.scrollHeight-h>i.clientHeight&&(s=Ke.DOWN)}if(a){let h=i.scrollLeft;e===`rtl`?a===Ae.RIGHT?h<0&&(c=Ae.RIGHT):i.scrollWidth+h>i.clientWidth&&(c=Ae.LEFT):a===Ae.LEFT?h>0&&(c=Ae.LEFT):i.scrollWidth-h>i.clientWidth&&(c=Ae.RIGHT)}return[s,c]}var Td=(()=>{class i{_injector=h(G);createDrag(e,t){return kl(this._injector,e,t)}createDropList(e){return wl(this._injector,e)}static ɵfac=function(t){return new(t||i)};static ɵprov=he$1({token:i,factory:i.ɵfac})}return i})();var gr=new m(`CDK_DRAG_PARENT`);var Ml=new m(`CdkDragHandle`);var Nl=(()=>{class i{element=h(et);_parentDrag=h(gr,{optional:!0,skipSelf:!0});_dragDropRegistry=h(Yi);_stateChanges=new B;get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._stateChanges.next(this)}_disabled=!1;constructor(){this._parentDrag?._addHandle(this)}ngAfterViewInit(){if(!this._parentDrag){let e=this.element.nativeElement.parentElement;for(;e;){let t=this._dragDropRegistry.getDragDirectiveForNode(e);if(t){this._parentDrag=t,t._addHandle(this);break}e=e.parentElement}}}ngOnDestroy(){this._parentDrag?._removeHandle(this),this._stateChanges.complete()}static ɵfac=function(t){return new(t||i)};static ɵdir=Tr({type:i,selectors:[[``,`cdkDragHandle`,``]],hostAttrs:[1,`cdk-drag-handle`],inputs:{disabled:[2,`cdkDragHandleDisabled`,`disabled`,Jm]},features:[$m([{provide:Ml,useExisting:i}])]})}return i})();var Il=new m(`CDK_DRAG_CONFIG`);var Ol=new m(`CdkDropList`);var Rl=(()=>{class i{element=h(et);dropContainer=h(Ol,{optional:!0,skipSelf:!0});_ngZone=h(ee$1);_viewContainerRef=h($t$1);_dir=h(bM,{optional:!0});_changeDetectorRef=h(oa$1);_selfHandle=h(Ml,{optional:!0,self:!0});_parentDrag=h(gr,{optional:!0,skipSelf:!0});_dragDropRegistry=h(Yi);_destroyed=new B;_handles=new Oe([]);_previewTemplate=null;_placeholderTemplate=null;_dragRef;data;lockAxis=null;rootElementSelector;boundaryElement;dragStartDelay;freeDragPosition;get disabled(){return this._disabled||!!(this.dropContainer&&this.dropContainer.disabled)}set disabled(e){this._disabled=e,this._dragRef.disabled=this._disabled}_disabled=!1;constrainPosition;previewClass;previewContainer;scale=1;started=new Le;released=new Le;ended=new Le;entered=new Le;exited=new Le;dropped=new Le;moved=new S(e=>{let t=this._dragRef.moved.pipe(k(o=>({source:this,pointerPosition:o.pointerPosition,event:o.event,delta:o.delta,distance:o.distance}))).subscribe(e);return()=>{t.unsubscribe()}});_injector=h(G);constructor(){let e=this.dropContainer,t=h(Il,{optional:!0});this._dragRef=kl(this._injector,this.element,{dragStartThreshold:t&&t.dragStartThreshold!=null?t.dragStartThreshold:5,pointerDirectionChangeThreshold:t&&t.pointerDirectionChangeThreshold!=null?t.pointerDirectionChangeThreshold:5,zIndex:t?.zIndex}),this._dragRef.data=this,this._dragDropRegistry.registerDirectiveNode(this.element.nativeElement,this),t&&this._assignDefaults(t),e&&(e.addItem(this),e._dropListRef.beforeStarted.pipe(lc$1(this._destroyed)).subscribe(()=>{this._dragRef.scale=this.scale})),this._syncInputs(this._dragRef),this._handleEvents(this._dragRef)}getPlaceholderElement(){return this._dragRef.getPlaceholderElement()}getRootElement(){return this._dragRef.getRootElement()}reset(){this._dragRef.reset()}resetToBoundary(){this._dragRef.resetToBoundary()}getFreeDragPosition(){return this._dragRef.getFreeDragPosition()}setFreeDragPosition(e){this._dragRef.setFreeDragPosition(e)}ngAfterViewInit(){sw(()=>{this._updateRootElement(),this._setupHandlesListener(),this._dragRef.scale=this.scale,this.freeDragPosition&&this._dragRef.setFreeDragPosition(this.freeDragPosition)},{injector:this._injector})}ngOnChanges(e){let t=e.rootElementSelector,o=e.freeDragPosition;t&&!t.firstChange&&this._updateRootElement(),this._dragRef.scale=this.scale,o&&!o.firstChange&&this.freeDragPosition&&this._dragRef.setFreeDragPosition(this.freeDragPosition)}ngOnDestroy(){this.dropContainer&&this.dropContainer.removeItem(this),this._dragDropRegistry.removeDirectiveNode(this.element.nativeElement),this._ngZone.runOutsideAngular(()=>{this._handles.complete(),this._destroyed.next(),this._destroyed.complete(),this._dragRef.dispose()})}_addHandle(e){let t=this._handles.getValue();t.push(e),this._handles.next(t)}_removeHandle(e){let t=this._handles.getValue(),o=t.indexOf(e);o>-1&&(t.splice(o,1),this._handles.next(t))}_setPreviewTemplate(e){this._previewTemplate=e}_resetPreviewTemplate(e){e===this._previewTemplate&&(this._previewTemplate=null)}_setPlaceholderTemplate(e){this._placeholderTemplate=e}_resetPlaceholderTemplate(e){e===this._placeholderTemplate&&(this._placeholderTemplate=null)}_updateRootElement(){let e=this.element.nativeElement,t=e;this.rootElementSelector&&(t=e.closest!==void 0?e.closest(this.rootElementSelector):e.parentElement?.closest(this.rootElementSelector)),this._dragRef.withRootElement(t||e)}_getBoundaryElement(){let e=this.boundaryElement;return e?typeof e==`string`?this.element.nativeElement.closest(e):me(e):null}_syncInputs(e){e.beforeStarted.subscribe(()=>{if(!e.isDragging()){let t=this._dir,o=this.dragStartDelay,r=this._placeholderTemplate?{template:this._placeholderTemplate.templateRef,context:this._placeholderTemplate.data,viewContainer:this._viewContainerRef}:null,a=this._previewTemplate?{template:this._previewTemplate.templateRef,context:this._previewTemplate.data,matchSize:this._previewTemplate.matchSize,viewContainer:this._viewContainerRef}:null;e.disabled=this.disabled,e.lockAxis=this.lockAxis,e.scale=this.scale,e.dragStartDelay=typeof o==`object`&&o?o:ot(o),e.constrainPosition=this.constrainPosition,e.previewClass=this.previewClass,e.withBoundaryElement(this._getBoundaryElement()).withPlaceholderTemplate(r).withPreviewTemplate(a).withPreviewContainer(this.previewContainer||`global`),t&&e.withDirection(t.value)}}),e.beforeStarted.pipe(me$1(1)).subscribe(()=>{if(this._parentDrag){e.withParent(this._parentDrag._dragRef);return}let t=this.element.nativeElement.parentElement;for(;t;){let o=this._dragDropRegistry.getDragDirectiveForNode(t);if(o){e.withParent(o._dragRef);break}t=t.parentElement}})}_handleEvents(e){e.started.subscribe(t=>{this.started.emit({source:this,event:t.event}),this._changeDetectorRef.markForCheck()}),e.released.subscribe(t=>{this.released.emit({source:this,event:t.event})}),e.ended.subscribe(t=>{this.ended.emit({source:this,distance:t.distance,dropPoint:t.dropPoint,event:t.event}),this._changeDetectorRef.markForCheck()}),e.entered.subscribe(t=>{this.entered.emit({container:t.container.data,item:this,currentIndex:t.currentIndex})}),e.exited.subscribe(t=>{this.exited.emit({container:t.container.data,item:this})}),e.dropped.subscribe(t=>{this.dropped.emit({previousIndex:t.previousIndex,currentIndex:t.currentIndex,previousContainer:t.previousContainer.data,container:t.container.data,isPointerOverContainer:t.isPointerOverContainer,item:this,distance:t.distance,dropPoint:t.dropPoint,event:t.event})})}_assignDefaults(e){let{lockAxis:t,dragStartDelay:o,constrainPosition:r,previewClass:a,boundaryElement:s,draggingDisabled:c,rootElementSelector:h,previewContainer:p}=e;this.disabled=c??!1,this.dragStartDelay=o||0,this.lockAxis=t||null,r&&(this.constrainPosition=r),a&&(this.previewClass=a),s&&(this.boundaryElement=s),h&&(this.rootElementSelector=h),p&&(this.previewContainer=p)}_setupHandlesListener(){this._handles.pipe(Rt(e=>{let t=e.map(o=>o.element);this._selfHandle&&this.rootElementSelector&&t.push(this.element),this._dragRef.withHandles(t)}),De(e=>CD(...e.map(t=>t._stateChanges.pipe(PD(t))))),lc$1(this._destroyed)).subscribe(e=>{let t=this._dragRef,o=e.element.nativeElement;e.disabled?t.disableHandle(o):t.enableHandle(o)})}static ɵfac=function(t){return new(t||i)};static ɵdir=Tr({type:i,selectors:[[``,`cdkDrag`,``]],hostAttrs:[1,`cdk-drag`],hostVars:4,hostBindings:function(t,o){t&2&&Xs$1(`cdk-drag-disabled`,o.disabled)(`cdk-drag-dragging`,o._dragRef.isDragging())},inputs:{data:[0,`cdkDragData`,`data`],lockAxis:[0,`cdkDragLockAxis`,`lockAxis`],rootElementSelector:[0,`cdkDragRootElement`,`rootElementSelector`],boundaryElement:[0,`cdkDragBoundary`,`boundaryElement`],dragStartDelay:[0,`cdkDragStartDelay`,`dragStartDelay`],freeDragPosition:[0,`cdkDragFreeDragPosition`,`freeDragPosition`],disabled:[2,`cdkDragDisabled`,`disabled`,Jm],constrainPosition:[0,`cdkDragConstrainPosition`,`constrainPosition`],previewClass:[0,`cdkDragPreviewClass`,`previewClass`],previewContainer:[0,`cdkDragPreviewContainer`,`previewContainer`],scale:[2,`cdkDragScale`,`scale`,i2]},outputs:{started:`cdkDragStarted`,released:`cdkDragReleased`,ended:`cdkDragEnded`,entered:`cdkDragEntered`,exited:`cdkDragExited`,dropped:`cdkDragDropped`,moved:`cdkDragMoved`},exportAs:[`cdkDrag`],features:[$m([{provide:gr,useExisting:i}]),Ao$1]})}return i})();var yl=new m(`CdkDropListGroup`);var Al=(()=>{class i{element=h(et);_changeDetectorRef=h(oa$1);_scrollDispatcher=h(_t);_dir=h(bM,{optional:!0});_group=h(yl,{optional:!0,skipSelf:!0});_latestSortedRefs;_destroyed=new B;_scrollableParentsResolved=!1;static _dropLists=[];_dropListRef;connectedTo=[];data;orientation=`vertical`;id=h(ye).getId(`cdk-drop-list-`);lockAxis=null;get disabled(){return this._disabled||!!this._group&&this._group.disabled}set disabled(e){this._dropListRef.disabled=this._disabled=e}_disabled=!1;sortingDisabled=!1;enterPredicate=()=>!0;sortPredicate=()=>!0;autoScrollDisabled=!1;autoScrollStep;elementContainerSelector=null;hasAnchor=!1;dropped=new Le;entered=new Le;exited=new Le;sorted=new Le;_unsortedItems=new Set;constructor(){let e=h(Il,{optional:!0}),t=h(G);this._dropListRef=wl(t,this.element),this._dropListRef.data=this,e&&this._assignDefaults(e),this._dropListRef.enterPredicate=(o,r)=>this.enterPredicate(o.data,r.data),this._dropListRef.sortPredicate=(o,r,a)=>this.sortPredicate(o,r.data,a.data),this._setupInputSyncSubscription(this._dropListRef),this._handleEvents(this._dropListRef),i._dropLists.push(this),this._group&&this._group._items.add(this)}addItem(e){this._unsortedItems.add(e),e._dragRef._withDropContainer(this._dropListRef),this._dropListRef.isDragging()&&this._syncItemsWithRef(this.getSortedItems().map(t=>t._dragRef))}removeItem(e){if(this._unsortedItems.delete(e),this._latestSortedRefs){let t=this._latestSortedRefs.indexOf(e._dragRef);t>-1&&(this._latestSortedRefs.splice(t,1),this._syncItemsWithRef(this._latestSortedRefs))}}getSortedItems(){return Array.from(this._unsortedItems).sort((e,t)=>e._dragRef.getVisibleElement().compareDocumentPosition(t._dragRef.getVisibleElement())&Node.DOCUMENT_POSITION_FOLLOWING?-1:1)}ngOnDestroy(){let e=i._dropLists.indexOf(this);e>-1&&i._dropLists.splice(e,1),this._group&&this._group._items.delete(this),this._latestSortedRefs=void 0,this._unsortedItems.clear(),this._dropListRef.dispose(),this._destroyed.next(),this._destroyed.complete()}_setupInputSyncSubscription(e){this._dir&&this._dir.change.pipe(PD(this._dir.value),lc$1(this._destroyed)).subscribe(t=>e.withDirection(t)),e.beforeStarted.subscribe(()=>{let t=ft(this.connectedTo).map(o=>{if(typeof o==`string`)return i._dropLists.find(a=>a.id===o);return o});if(this._group&&this._group._items.forEach(o=>{t.indexOf(o)===-1&&t.push(o)}),!this._scrollableParentsResolved){let o=this._scrollDispatcher.getAncestorScrollContainers(this.element).map(r=>r.getElementRef().nativeElement);this._dropListRef.withScrollableParents(o),this._scrollableParentsResolved=!0}if(this.elementContainerSelector){let o=this.element.nativeElement.querySelector(this.elementContainerSelector);e.withElementContainer(o)}e.disabled=this.disabled,e.lockAxis=this.lockAxis,e.sortingDisabled=this.sortingDisabled,e.autoScrollDisabled=this.autoScrollDisabled,e.autoScrollStep=ot(this.autoScrollStep,2),e.hasAnchor=this.hasAnchor,e.connectedTo(t.filter(o=>o&&o!==this).map(o=>o._dropListRef)).withOrientation(this.orientation)})}_handleEvents(e){e.beforeStarted.subscribe(()=>{this._syncItemsWithRef(this.getSortedItems().map(t=>t._dragRef)),this._changeDetectorRef.markForCheck()}),e.entered.subscribe(t=>{this.entered.emit({container:this,item:t.item.data,currentIndex:t.currentIndex})}),e.exited.subscribe(t=>{this.exited.emit({container:this,item:t.item.data}),this._changeDetectorRef.markForCheck()}),e.sorted.subscribe(t=>{this.sorted.emit({previousIndex:t.previousIndex,currentIndex:t.currentIndex,container:this,item:t.item.data})}),e.dropped.subscribe(t=>{this.dropped.emit({previousIndex:t.previousIndex,currentIndex:t.currentIndex,previousContainer:t.previousContainer.data,container:t.container.data,item:t.item.data,isPointerOverContainer:t.isPointerOverContainer,distance:t.distance,dropPoint:t.dropPoint,event:t.event}),this._changeDetectorRef.markForCheck()}),CD(e.receivingStarted,e.receivingStopped).subscribe(()=>this._changeDetectorRef.markForCheck())}_assignDefaults(e){let{lockAxis:t,draggingDisabled:o,sortingDisabled:r,listAutoScrollDisabled:a,listOrientation:s}=e;this.disabled=o??!1,this.sortingDisabled=r??!1,this.autoScrollDisabled=a??!1,this.orientation=s||`vertical`,this.lockAxis=t||null}_syncItemsWithRef(e){this._latestSortedRefs=e,this._dropListRef.withItems(e)}static ɵfac=function(t){return new(t||i)};static ɵdir=Tr({type:i,selectors:[[``,`cdkDropList`,``],[`cdk-drop-list`]],hostAttrs:[1,`cdk-drop-list`],hostVars:7,hostBindings:function(t,o){t&2&&(Po$1(`id`,o.id),Xs$1(`cdk-drop-list-disabled`,o.disabled)(`cdk-drop-list-dragging`,o._dropListRef.isDragging())(`cdk-drop-list-receiving`,o._dropListRef.isReceiving()))},inputs:{connectedTo:[0,`cdkDropListConnectedTo`,`connectedTo`],data:[0,`cdkDropListData`,`data`],orientation:[0,`cdkDropListOrientation`,`orientation`],id:`id`,lockAxis:[0,`cdkDropListLockAxis`,`lockAxis`],disabled:[2,`cdkDropListDisabled`,`disabled`,Jm],sortingDisabled:[2,`cdkDropListSortingDisabled`,`sortingDisabled`,Jm],enterPredicate:[0,`cdkDropListEnterPredicate`,`enterPredicate`],sortPredicate:[0,`cdkDropListSortPredicate`,`sortPredicate`],autoScrollDisabled:[2,`cdkDropListAutoScrollDisabled`,`autoScrollDisabled`,Jm],autoScrollStep:[0,`cdkDropListAutoScrollStep`,`autoScrollStep`],elementContainerSelector:[0,`cdkDropListElementContainer`,`elementContainerSelector`],hasAnchor:[2,`cdkDropListHasAnchor`,`hasAnchor`,Jm]},outputs:{dropped:`cdkDropListDropped`,entered:`cdkDropListEntered`,exited:`cdkDropListExited`,sorted:`cdkDropListSorted`},exportAs:[`cdkDropList`],features:[$m([{provide:yl,useValue:void 0},{provide:Ol,useExisting:i}])]})}return i})();var Tl=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵmod=$e$1({type:i});static ɵinj=Se({providers:[Td],imports:[at]})}return i})();var Zi=class i{icon=t2.required();label=t2.required();description=t2(``);disabled=t2(!1);clicked=e2();static ɵfac=function(e){return new(e||i)};static ɵcmp=On$1({type:i,selectors:[[`bhw-icon-button`]],inputs:{icon:[1,`icon`],label:[1,`label`],description:[1,`description`],disabled:[1,`disabled`]},outputs:{clicked:`clicked`},decls:2,vars:7,consts:[[`mat-icon-button`,``,`type`,`button`,3,`click`,`disabled`,`matTooltip`,`matTooltipDisabled`,`matTooltipShowDelay`],[3,`name`]],template:function(e,t){e&1&&(ks$1(0,`button`,0),Cm(`click`,function(){return t.clicked.emit()}),Dm(1,`bhw-icon`,1),Yl$1()),e&2&&(vm(`disabled`,t.disabled())(`matTooltip`,t.label())(`matTooltipDisabled`,t.disabled())(`matTooltipShowDelay`,250),Po$1(`aria-describedby`,t.description()||null)(`aria-label`,t.label()),Sw(),vm(`name`,t.icon()))},dependencies:[Wt,Zo,Oi,En,Xe],styles:[`[_nghost-%COMP%]{--%NS%mat-icon-button-icon-size: 1.5rem;--%NS%mat-icon-button-state-layer-size: 2.75rem;--%NS%mat-icon-button-touch-target-size: 2.75rem;display:inline-flex;flex-shrink:0}button[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;width:2.75rem;height:2.75rem;padding:0;border-radius:50%;color:#b4b2bf}button[_ngcontent-%COMP%]:not(:disabled):hover{color:#c58eff}bhw-icon[_ngcontent-%COMP%]{width:1.5rem;height:1.5rem}`]})};var Vd=()=>({mouse:0,touch:150});var Ld=(i,n)=>n.id;function zd(i,n){if(i&1){let e=bC();ks$1(0,`article`,3)(1,`bhw-icon-button`,4),Cm(`keydown.arrowdown`,function(o){let r=vp(e).$index,a=SC(2);return Dp(a.keyboard(o,r,1))})(`keydown.arrowup`,function(o){let r=vp(e).$index,a=SC(2);return Dp(a.keyboard(o,r,-1))}),Yl$1(),ks$1(2,`div`,5)(3,`h3`),XC(4),Yl$1(),ks$1(5,`p`),XC(6),Yl$1()(),ks$1(7,`bhw-icon-button`,6),Cm(`clicked`,function(){let o=vp(e).$implicit,r=SC(2);return Dp(r.removed.emit(o.id))}),Yl$1(),ks$1(8,`bhw-choice`,7),Cm(`changed`,function(o){let r=vp(e).$implicit,a=SC(2);return Dp(a.assigned.emit({id:r.id,role:o}))}),Yl$1(),ks$1(9,`bhw-icon-button`,8),Cm(`clicked`,function(){let o=vp(e).$implicit,r=SC(2);return Dp(r.replaced.emit(o.id))}),Yl$1()()}if(i&2){let e=n.$implicit,t=SC().$implicit,o=SC();vm(`cdkDragDisabled`,o.disabled())(`cdkDragStartDelay`,sT(18,Vd)),Po$1(`aria-label`,e.name)(`data-file-id`,e.id),Sw(),vm(`cdkDragHandleDisabled`,o.disabled()||o.inputs().length<2)(`disabled`,o.disabled()||o.inputs().length<2)(`label`,t(`ui.reorder`)),Sw(3),jm(e.name),Sw(2),Vm(``,o.size(e.size),` · `,t(`role.`+(e.role||`auto`))),Sw(),vm(`disabled`,o.disabled())(`label`,t(`ui.remove`)),Sw(),vm(`disabled`,o.disabled())(`label`,t(`ui.role`))(`options`,o.roles())(`value`,e.explicitRole),Sw(),vm(`disabled`,o.disabled())(`label`,t(`ui.replace`))}}function Bd(i,n){if(i&1){let e=bC();Im(0),ks$1(1,`p`,1),XC(2),Yl$1(),ks$1(3,`div`,2),Cm(`cdkDropListDropped`,function(o){vp(e);let r=SC();return Dp(r.drop(o))}),mC(4,zd,10,19,`article`,3,Ld),Yl$1(),wm()}if(i&2){let e=n.$implicit,t=SC();Sw(2),jm(e(`ui.reorderHint`)),Sw(),vm(`cdkDropListData`,t.inputs())(`cdkDropListDisabled`,t.disabled()),Po$1(`aria-label`,e(`ui.selected`)),Sw(),yC(t.inputs())}}var Qi=class i{constructor(n,e,t){this.announcer=e;this.translations=t;Do$1(()=>{let o=this.pendingFocus();o&&!this.disabled()&&(this.pendingFocus.set(null),queueMicrotask(()=>n.nativeElement.querySelector(`[data-file-id="${CSS.escape(o)}"] .drag-handle button`)?.focus()))})}announcer;translations;inputs=t2.required();disabled=t2(!1);roles=t2.required();replaced=e2();removed=e2();assigned=e2();reordered=e2();pendingFocus=be(null);drop(n){this.move(n.previousIndex,n.currentIndex)}keyboard(n,e,t){n.preventDefault(),n.stopPropagation(),this.move(e,e+t,!0)}size(n){return n>=1024**3?`${(n/1024**3).toFixed(2)} GiB`:n>=1024**2?`${(n/1024**2).toFixed(2)} MiB`:`${(n/1024).toFixed(1)} KiB`}move(n,e,t=!1){let o=this.inputs()[n];this.disabled()||!o||n===e||e<0||e>=this.inputs().length||(t&&this.pendingFocus.set(o.id),this.reordered.emit({id:o.id,index:e}),this.announcer.announce(this.translations.translate(`ui.reordered`,{position:e+1,count:this.inputs().length})))}static ɵfac=function(e){return new(e||i)(Rn$1(et),Rn$1(rn),Rn$1(Od$1))};static ɵcmp=On$1({type:i,selectors:[[`bhw-input-list`]],inputs:{inputs:[1,`inputs`],disabled:[1,`disabled`],roles:[1,`roles`]},outputs:{replaced:`replaced`,removed:`removed`,assigned:`assigned`,reordered:`reordered`},decls:1,vars:0,consts:[[4,`transloco`],[`id`,`reorder-hint`,1,`visually-hidden`],[`cdkDropList`,``,`cdkDropListOrientation`,`vertical`,1,`selected-files`,3,`cdkDropListDropped`,`cdkDropListData`,`cdkDropListDisabled`],[`cdkDrag`,``,`cdkDragLockAxis`,`y`,1,`selected-file`,3,`cdkDragDisabled`,`cdkDragStartDelay`],[`cdkDragHandle`,``,`description`,`reorder-hint`,`icon`,`drag`,1,`drag-handle`,3,`keydown.arrowdown`,`keydown.arrowup`,`cdkDragHandleDisabled`,`disabled`,`label`],[1,`file-metadata`],[`icon`,`close`,1,`remove-action`,3,`clicked`,`disabled`,`label`],[3,`changed`,`disabled`,`label`,`options`,`value`],[`icon`,`replace`,1,`replace-action`,3,`clicked`,`disabled`,`label`]],template:function(e,t){e&1&&hm$1(0,Bd,6,4,`ng-container`,0)},dependencies:[Tl,Al,Rl,Nl,zz,Kt,Zi],styles:[`[_nghost-%COMP%]{display:block}.selected-files[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.75rem;margin-block:1rem}.selected-file[_ngcontent-%COMP%]{position:relative;display:grid;grid-template-columns:2.75rem minmax(0,1fr);align-items:center;gap:.75rem;padding:1rem 3.75rem 1rem .5rem;border:1px solid #42404a;border-radius:1rem;background:#1e1d24}.drag-handle[_ngcontent-%COMP%]{grid-row:1/3;cursor:grab;touch-action:none}.drag-handle[_ngcontent-%COMP%]:active{cursor:grabbing}.file-metadata[_ngcontent-%COMP%]{grid-column:2;min-width:0}h3[_ngcontent-%COMP%]{overflow-wrap:anywhere;margin:0;font-size:.95rem;font-weight:500}p[_ngcontent-%COMP%]{margin:.4rem 0 0;color:#b4b2bf;font-size:.8rem}.remove-action[_ngcontent-%COMP%]{position:absolute;top:.5rem;right:.5rem}bhw-choice[_ngcontent-%COMP%]{grid-column:2;width:100%;max-width:18rem}.replace-action[_ngcontent-%COMP%]{position:absolute;bottom:.5rem;right:.5rem}.cdk-drag-preview[_ngcontent-%COMP%]{border-color:#c58eff}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:.2}.cdk-drag-animating[_ngcontent-%COMP%], .cdk-drop-list-dragging[_ngcontent-%COMP%]   .selected-file[_ngcontent-%COMP%]:not(.cdk-drag-placeholder){transition:transform .2s cubic-bezier(.2,0,0,1)}.visually-hidden[_ngcontent-%COMP%]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}@media(max-width:35rem){.selected-file[_ngcontent-%COMP%]{grid-template-columns:2.75rem minmax(0,1fr);gap:.5rem;padding:.75rem 3.75rem .75rem .5rem}}`]})};var Ji=class i{ready=be(!1);update=be(!1);busy;events=new K;constructor(n,e){this.busy=e.selectSignal(gv.selectBusy),n.isEnabled&&(this.events.add(n.versionUpdates.subscribe(t=>{t.type===`VERSION_READY`&&this.update.set(!0)})),this.events.add(n.unrecoverable.subscribe(()=>{this.update.set(!0)})),navigator.serviceWorker.ready.then(async()=>{navigator.onLine&&await n.checkForUpdate(),this.ready.set(!0)}).catch(()=>{this.ready.set(!1)}))}apply(){this.update()&&!this.busy()&&location.reload()}ngOnDestroy(){this.events.unsubscribe()}static ɵfac=function(e){return new(e||i)(v(RM),v(Qo))};static ɵprov=b({token:i,factory:i.ɵfac,providedIn:`root`})};var Gd=(i,n)=>n.kind;var Pl=(i,n)=>n.id;var Ud=(i,n)=>n.family;function Wd(i,n){if(i&1&&(ks$1(0,`div`,12),XC(1),Yl$1()),i&2){let e=SC().$implicit;Sw(),jm(e(`ui.drop`))}}function $d(i,n){if(i&1&&(ks$1(0,`p`,13),XC(1),Yl$1()),i&2){let e=SC().$implicit;Sw(),jm(e(`offline.ready`))}}function qd(i,n){if(i&1){let e=bC();ks$1(0,`p`),XC(1),Yl$1(),ks$1(2,`bhw-button`,41),Cm(`clicked`,function(){vp(e);let o=SC(2);return Dp(o.offline.apply())}),Yl$1()}if(i&2){let e=SC().$implicit,t=SC();Sw(),jm(e(`offline.update`)),Sw(),vm(`disabled`,t.job().busy)(`label`,e(`offline.reload`))}}function Xd(i,n){if(i&1&&(ks$1(0,`p`,14),XC(1),Yl$1()),i&2){let e=SC().$implicit;Sw(),jm(e(`diagnostic.`+n.code))}}function Kd(i,n){if(i&1&&(ks$1(0,`p`,14),XC(1),Yl$1()),i&2){let e=SC().$implicit,t=SC();Sw(),Vm(``,e(`offline.large`),` `,t.size(t.job().plan?.resources?.temporaryBytes||0))}}function Yd(i,n){if(i&1&&(ks$1(0,`span`,44),XC(1),Yl$1()),i&2){let e=SC().$implicit,t=SC(2);Sw(),jm(t.availabilityReason(e))}}function Zd(i,n){if(i&1){let e=bC();ks$1(0,`li`,42)(1,`bhw-button`,43),Cm(`clicked`,function(){let o=vp(e).$implicit;SC();let r=RC(25),a=SC();return Dp(a.choose(r,o))}),Yl$1(),dC(2,Yd,2,1,`span`,44),Yl$1()}if(i&2){let e=n.$implicit,t=SC().$implicit,o=SC();Xl$1(`format-`+e.kind),Xs$1(`unavailable`,o.job().busy||!e.enabled),vm(`matTooltip`,o.availabilityReason(e))(`matTooltipShowDelay`,250),Po$1(`aria-disabled`,o.job().busy||!e.enabled)(`tabindex`,o.job().busy||!e.enabled?0:null),Sw(),Xs$1(`unavailable`,o.job().busy||!e.enabled),vm(`block`,!0)(`compact`,!0)(`disabled`,o.job().busy||!e.enabled)(`icon`,e.kind)(`label`,t(`generator.`+e.kind)),Sw(),pC(e.reason?2:-1)}}function Qd(i,n){if(i&1){let e=bC();ks$1(0,`bhw-button`,22),Cm(`clicked`,function(){let o=vp(e).$implicit;SC();let r=RC(25),a=SC();return Dp(a.choose(r,o))}),Yl$1()}if(i&2){let e=n.$implicit,t=SC().$implicit,o=SC();vm(`disabled`,!o.auxiliaryEnabled(e))(`label`,t(`role.`+e))}}function Jd(i,n){if(i&1){let e=bC();ks$1(0,`bhw-text-field`,46),Cm(`changed`,function(o){vp(e);let r=SC(3);return Dp(r.path(o))}),Yl$1()}if(i&2){let e=SC().$implicit,t=SC().$implicit,o=SC();vm(`disabled`,o.job().busy)(`label`,t(`ui.htmlPath`))(`value`,o.session.options.htmlPath||e.name)}}function em(i,n){if(i&1&&dC(0,Jd,1,3,`bhw-text-field`,45),i&2){let e=n.$implicit;pC(e.role===`html`?0:-1)}}function tm(i,n){if(i&1&&(ks$1(0,`li`)(1,`code`),XC(2),Yl$1(),XC(3),Yl$1()),i&2){let e=n.$implicit,t=SC(2).$implicit;Sw(2),jm(e.reference),Sw(),Vm(` · `,e.from,` · `,t(`reference.`+e.reason))}}function nm(i,n){if(i&1){let e=bC();ks$1(0,`div`,30)(1,`p`),XC(2),Yl$1(),ks$1(3,`ul`),mC(4,tm,4,3,`li`,null,hC),Yl$1(),ks$1(6,`mat-checkbox`,47),Cm(`change`,function(o){vp(e);let r=SC(2);return Dp(r.allow(o.checked))}),XC(7),Yl$1()()}if(i&2){let e=SC().$implicit,t=SC();Sw(2),jm(e(`ui.references`)),Sw(2),yC(t.job().plan?.references),Sw(2),vm(`checked`,!!t.session.options.allowUnresolved)(`disabled`,t.job().busy),Sw(),jm(e(`ui.allowReferences`))}}function im(i,n){if(i&1&&(ks$1(0,`li`)(1,`code`),XC(2),Yl$1()()),i&2){let e=n.$implicit;Sw(2),jm(e.path)}}function om(i,n){if(i&1&&(ks$1(0,`p`),XC(1),Yl$1(),ks$1(2,`ul`),mC(3,im,3,1,`li`,null,hC),Yl$1()),i&2){let e=SC().$implicit,t=SC();Sw(),jm(e(`ui.collisions`)),Sw(2),yC(t.job().plan?.collisions)}}function rm(i,n){if(i&1&&(ks$1(0,`p`,14),XC(1),Yl$1()),i&2){let e=SC(2).$implicit,t=SC();Sw(),Vm(``,e(`ui.headerSpace`),`: `,t.job().plan?.headerSpace,` B`)}}function am(i,n){if(i&1&&dC(0,rm,2,2,`p`,14),i&2){let e=n.$implicit;pC(e.role===`extra-header`?0:-1)}}function sm(i,n){if(i&1&&(ks$1(0,`p`)(1,`code`),XC(2),Yl$1(),XC(3),Yl$1()),i&2){let e=n.$implicit,t=SC().$implicit;Xs$1(`error`,e.severity===`error`),Sw(2),jm(e.code),Sw(),ed$1(` · `,t(`diagnostic.`+e.code))}}function lm(i,n){if(i&1){let e=bC();ks$1(0,`bhw-button`,48),Cm(`clicked`,function(){vp(e);let o=SC(2);return Dp(o.logs())}),Yl$1()}if(i&2){let e=SC().$implicit;vm(`label`,e(`ui.logs`))}}function cm(i,n){if(i&1&&(ks$1(0,`a`,34),XC(1),Yl$1()),i&2){let e=SC().$implicit,t=SC();vm(`href`,t.issue(),BI),Sw(),jm(e(`ui.issue`))}}function dm(i,n){if(i&1){let e=bC();ks$1(0,`div`,49)(1,`p`),XC(2),Yl$1(),Dm(3,`mat-progress-bar`,50),ks$1(4,`p`),XC(5),Yl$1()(),ks$1(6,`bhw-button`,48),Cm(`clicked`,function(){vp(e);let o=SC(2);return Dp(o.cancel())}),Yl$1()}if(i&2){let e=SC().$implicit,t=SC();Sw(2),jm(e(`stage.`+(t.job().progress?.stage||`plan`))),Sw(),vm(`mode`,t.job().progress?.total?`determinate`:`indeterminate`)(`value`,100*(t.job().progress?.completed||0)/(t.job().progress?.total||1)),Sw(2),jm(t.progressLabel()),Sw(),vm(`label`,e(`ui.cancel`))}}function mm(i,n){if(i&1&&(ks$1(0,`li`),XC(1),Yl$1()),i&2){let e=n.$implicit,t=SC(2).$implicit;Sw(),Vm(``,t(`open.`+e.family),` (`,e.extensions.join(`, `),`)`)}}function um(i,n){if(i&1){let e=bC();ks$1(0,`div`,39)(1,`p`),XC(2),Yl$1(),ks$1(3,`div`,51)(4,`bhw-text-field`,46),Cm(`changed`,function(o){vp(e);let r=SC(2);return Dp(r.remember(`name`,o))}),Yl$1(),ks$1(5,`bhw-choice`,52),Cm(`changed`,function(o){vp(e);let r=SC(2);return Dp(r.remember(`extension`,o))}),Yl$1()(),ks$1(6,`bhw-button`,53),Cm(`clicked`,function(){vp(e);let o=SC(2);return Dp(o.download())}),Yl$1(),ks$1(7,`ul`),mC(8,mm,2,2,`li`,null,Ud),Yl$1(),ks$1(10,`p`,14),XC(11),Yl$1()()}if(i&2){let e=SC().$implicit,t=SC();Sw(2),Vm(``,e(`ui.ready`),` · `,t.size(n.size)),Sw(2),vm(`disabled`,t.job().busy)(`label`,e(`ui.filename`))(`value`,t.name()),Sw(),vm(`disabled`,t.job().busy)(`label`,e(`ui.extension`))(`options`,t.variants())(`value`,t.selectedExtension()),Sw(),vm(`disabled`,t.job().busy)(`label`,e(`ui.download`)),Sw(2),yC(t.job().interpretations),Sw(3),jm(e(`ui.sameBytes`))}}function pm(i,n){if(i&1&&(ks$1(0,`div`,40),Dm(1,`bhw-icon`,54),ks$1(2,`h3`),XC(3),Yl$1(),ks$1(4,`p`),XC(5),Yl$1(),ks$1(6,`span`,55),XC(7),Yl$1()()),i&2){let e=SC().$implicit;Sw(3),jm(e(`generator.outputEmptyTitle`)),Sw(2),jm(e(`generator.outputEmptyDescription`)),Sw(2),jm(e(`generator.outputHint`))}}function hm(i,n){if(i&1){let e=bC();Im(0),ks$1(1,`div`,2)(2,`header`,3)(3,`a`,4),XC(4,`beheader`),ks$1(5,`span`),XC(6,` web`),Yl$1()(),Dm(7,`bhw-language-picker`),Yl$1(),ks$1(8,`main`,5)(9,`section`,6)(10,`p`,7),XC(11),Yl$1(),ks$1(12,`h1`,8),XC(13),Yl$1(),ks$1(14,`p`,9),XC(15),Yl$1(),ks$1(16,`p`,10),Dm(17,`bhw-icon`,11),XC(18),Yl$1()(),dC(19,Wd,2,1,`div`,12),dC(20,$d,2,1,`p`,13),dC(21,qd,3,3),dC(22,Xd,2,1,`p`,14),dC(23,Kd,2,2,`p`,14),ks$1(24,`input`,15,0),Cm(`change`,function(){vp(e);let o=RC(25),r=SC();return Dp(r.picked(o))}),Yl$1(),Dm(26,`hr`,16),ks$1(27,`section`,17)(28,`div`,18)(29,`h2`,19),XC(30),Yl$1()(),ks$1(31,`div`,20),Dm(32,`bhw-icon`,21),ks$1(33,`div`)(34,`h3`),XC(35),Yl$1(),ks$1(36,`p`),XC(37),Yl$1()(),ks$1(38,`bhw-button`,22),Cm(`clicked`,function(){vp(e);let o=RC(25),r=SC();return Dp(r.choose(o))}),Yl$1()(),ks$1(39,`ul`,23),mC(40,Zd,3,16,`li`,24,Gd),Yl$1(),ks$1(42,`div`,25)(43,`bhw-button`,22),Cm(`clicked`,function(){vp(e);let o=SC();return Dp(o.example())}),Yl$1(),ks$1(44,`bhw-expansion`,26)(45,`p`),XC(46),Yl$1(),ks$1(47,`div`,27),mC(48,Qd,1,2,`bhw-button`,28,gC),Yl$1()()(),ks$1(50,`bhw-input-list`,29),Cm(`assigned`,function(o){vp(e);let r=SC();return Dp(r.session.assign(o.id,o.role))})(`removed`,function(o){vp(e);let r=SC();return Dp(r.session.remove(o))})(`reordered`,function(o){vp(e);let r=SC();return Dp(r.reorder(o))})(`replaced`,function(o){vp(e);let r=RC(25),a=SC();return Dp(a.choose(r,void 0,o))}),Yl$1(),mC(51,em,1,1,null,null,Pl),dC(53,nm,8,4,`div`,30),dC(54,om,5,1),mC(55,am,1,1,null,null,Pl),ks$1(57,`div`,31),mC(58,sm,4,4,`p`,32,hC),dC(60,lm,1,1,`bhw-button`,33),dC(61,cm,2,2,`a`,34),Yl$1(),ks$1(62,`div`,35)(63,`p`),XC(64),Yl$1(),dC(65,dm,7,5),ks$1(66,`bhw-button`,36),Cm(`clicked`,function(){vp(e);let o=SC();return Dp(o.generate())}),Yl$1()()(),Dm(67,`hr`,16),ks$1(68,`section`,37)(69,`div`,18)(70,`h2`,38),XC(71),Yl$1()(),dC(72,um,12,12,`div`,39)(73,pm,8,3,`div`,40),Yl$1()(),Dm(74,`bhw-footer`),Yl$1(),wm()}if(i&2){let e,t,o=n.$implicit,r=SC();Sw(11),jm(o(`hero.eyebrow`)),Sw(2),jm(o(`hero.title`)),Sw(2),jm(o(`hero.description`)),Sw(3),jm(o(`hero.privacy`)),Sw(),pC(r.dragging()?19:-1),Sw(),pC(r.offline.ready()?20:-1),Sw(),pC(r.offline.update()?21:-1),Sw(),pC((e=r.processing.storageDiagnostic())?22:-1,e),Sw(),pC(r.job().plan?.resources?.large?23:-1),Sw(),vm(`multiple`,!0),Po$1(`accept`,r.pickerAccept||r.accepted())(`aria-label`,o(`generator.choose`)),Sw(6),jm(o(`generator.filesTitle`)),Sw(5),jm(o(`generator.emptyTitle`)),Sw(2),jm(o(`ui.drop`)),Sw(),vm(`disabled`,r.job().busy||!r.accepted())(`label`,o(`generator.choose`)),Sw(),Po$1(`aria-label`,o(`generator.formatsLabel`)),Sw(),yC(r.availability()),Sw(3),vm(`disabled`,r.job().busy)(`label`,o(`ui.example`)),Sw(),vm(`label`,o(`ui.advanced`)),Sw(2),jm(o(`ui.auxiliaryHint`)),Sw(2),yC(r.auxiliaryRoles),Sw(2),vm(`disabled`,r.job().busy)(`inputs`,r.cards())(`roles`,r.roles()),Sw(),yC(r.inputs()),Sw(2),pC(r.job().plan?.references?.length?53:-1),Sw(),pC(r.job().plan?.collisions?.length?54:-1),Sw(),yC(r.inputs()),Sw(3),yC(r.job().diagnostics),Sw(2),pC(r.job().diagnostics.length?60:-1),Sw(),pC(r.unexpected()?61:-1),Sw(3),jm(o(`generator.selectionHint`)),Sw(),pC(r.job().busy?65:-1),Sw(),vm(`block`,!0)(`disabled`,r.job().busy||!r.job().plan?.ready)(`label`,o(`generator.combine`)),Sw(5),jm(o(`generator.outputTitle`)),Sw(),pC((t=r.job().artifact)?72:73,t)}}var Fl=class i{constructor(n,e,t,o,r,a){this.processing=n;this.session=e;this.store=t;this.translations=o;this.offline=r;this.changeDetector=a;this.availability=t.selectSignal(dG.selectAvailability),this.accepted=t.selectSignal(dG.selectAcceptedTypes),this.inputs=t.selectSignal(dG.selectInputs),this.cards=Sr(()=>this.inputs().map(s=>R(y({},s),{explicitRole:this.session.role(s.id)}))),this.job=t.selectSignal(gv.selectJobState),this.extensions=Sr(()=>this.job().interpretations.flatMap(s=>s.extensions)),this.selectedExtension=Sr(()=>this.extensions().includes(this.extension())?this.extension():this.extensions()[0]??``)}processing;session;store;translations;offline;changeDetector;availability;accepted;inputs;cards;job;name=be(this.preference(`name`)||`polyglot`);extension=be(this.preference(`extension`));dragging=be(!1);extensions;selectedExtension;pickingRole;replacing;pickerAccept=``;auxiliaryRoles=[`html-assets`,`appendable`,`extra-header`];choose(n,e,t){this.job().busy||(this.pickingRole=typeof e==`string`?e:e?.family,this.replacing=t,this.pickerAccept=typeof e==`object`?e.accept.join(`,`):e===`html-assets`?`.zip`:e?``:t?this.availability().flatMap(o=>o.accept).join(`,`):this.accepted(),n.accept=this.pickerAccept,n.multiple=!t,n.click())}picked(n){this.session.add(Array.from(n.files??[]),this.pickingRole,this.replacing),n.value=``,this.pickerAccept=``,this.pickingRole=void 0,this.replacing=void 0}drag(n){n.dataTransfer?.types.includes(`Files`)&&(n.preventDefault(),this.dragging.set(!0))}leave(n){n.relatedTarget||this.dragging.set(!1)}drop(n){n.preventDefault(),this.dragging.set(!1),this.session.add(Array.from(n.dataTransfer?.files??[]))}generate(){!this.job().busy&&this.job().plan?.ready&&this.store.dispatch(Or.requested({operation:`generate`}))}cancel(){this.store.dispatch(Or.cancelRequested({}))}reorder(n){this.session.move(n.id,n.index),this.changeDetector.detectChanges()}availabilityReason(n){if(this.job().busy)return this.translations.translate(`ui.busyReason`);let e=n.reason===`ROLE_CONFLICT`&&n.family===`media`?`MEDIA_SLOT_OCCUPIED`:n.reason;return e?this.translations.translate(`availability.${e}`):``}roles(){return[``,...hM].map(n=>({value:n,label:this.translations.translate(`role.${n||`auto`}`)}))}auxiliaryEnabled(n){return!this.job().busy&&this.inputs().length<128&&this.inputs().reduce((e,t)=>e+t.size,0)<2*1024**3&&(n===`appendable`||!this.inputs().some(e=>e.role===n))&&(n!==`html-assets`||this.inputs().some(e=>e.role===`html`))}variants(){return this.extensions().map(n=>({value:n,label:`.${n}`}))}path(n){this.session.options=R(y({},this.session.options),{htmlPath:n||void 0,allowUnresolved:!1}),this.session.refresh()}allow(n){this.session.options=R(y({},this.session.options),{allowUnresolved:n}),this.session.refresh()}remember(n,e){n===`name`?this.name.set(lr(e)):this.extension.set(e);try{localStorage.setItem(`bhw.output.${n}`,n===`name`?this.name():e)}catch{}}size(n){return n>=1024**3?`${(n/1024**3).toFixed(2)} GiB`:n>=1024**2?`${(n/1024**2).toFixed(2)} MiB`:`${(n/1024).toFixed(1)} KiB`}progressLabel(){let n=this.job().progress;if(!n?.total)return``;let e=n.unit===`bytes`?`${this.size(n.completed)} / ${this.size(n.total)}`:n.unit===`microseconds`?`${(n.completed/1e6).toFixed(1)} / ${(n.total/1e6).toFixed(1)} s`:`${n.completed} / ${n.total} ${this.translations.translate(`unit.inputs`)}`;return`${Math.floor(100*n.completed/n.total)}% \xB7 ${e}`}async download(){let n=this.job().artifact;if(!(!n||this.job().busy))try{this.save(await this.processing.resolve(n),`${lr(this.name())}.${this.selectedExtension()}`)}catch(e){this.store.dispatch(Or.failed({diagnostic:nt(e)}))}}logs(){this.save(new Blob([ol(this.job().diagnostics)],{type:`application/json`}),`beheader-web-diagnostics.json`)}issue(){return rl(this.job().diagnostics)}unexpected(){return this.job().diagnostics.some(n=>[`WORKER_FAILED`,`WORKER_PROTOCOL`,`IO_FAILURE`,`AUDIO_CONVERSION_FAILED`,`CLEANUP_FAILED`].includes(n.code))}async example(){try{await this.session.example()}catch(n){this.store.dispatch(Or.failed({diagnostic:nt(n)}))}}preference(n){try{return localStorage.getItem(`bhw.output.${n}`)??``}catch{return``}}save(n,e){let t=URL.createObjectURL(n),o=document.createElement(`a`);o.href=t,o.download=e,document.body.append(o),o.click(),o.remove(),setTimeout(()=>{URL.revokeObjectURL(t)},6e4)}static ɵfac=function(e){return new(e||i)(Rn$1(Aa$1),Rn$1(Iv),Rn$1(Qo),Rn$1(Od$1),Rn$1(Ji),Rn$1(oa$1))};static ɵcmp=On$1({type:i,selectors:[[`bhw-generator`]],hostBindings:function(e,t){e&1&&Cm(`dragover`,function(r){return t.drag(r)},$I)(`dragleave`,function(r){return t.leave(r)},$I)(`drop`,function(r){return t.drop(r)},$I)},decls:1,vars:0,consts:[[`picker`,``],[4,`transloco`],[1,`app-shell`],[1,`app-header`],[`href`,`./`,1,`wordmark`],[`id`,`content`],[`aria-labelledby`,`hero-title`,1,`hero`],[1,`eyebrow`],[`id`,`hero-title`],[1,`hero-description`],[1,`privacy`],[`name`,`privacy`],[`aria-hidden`,`true`,1,`drop-overlay`],[`data-testid`,`offline-ready`,1,`metadata`],[1,`metadata`],[`data-testid`,`file-picker`,`hidden`,``,`tabindex`,`-1`,`type`,`file`,3,`change`,`multiple`],[1,`section-divider`],[`aria-labelledby`,`files-title`,1,`files-section`],[1,`section-heading`],[`id`,`files-title`],[1,`file-placeholder`],[`name`,`upload`,1,`upload-icon`],[`appearance`,`outlined`,3,`clicked`,`disabled`,`label`],[1,`format-list`],[3,`class`,`unavailable`,`matTooltip`,`matTooltipShowDelay`],[1,`selection-toolbar`],[3,`label`],[1,`actions`],[`appearance`,`outlined`,3,`disabled`,`label`],[3,`assigned`,`removed`,`reordered`,`replaced`,`disabled`,`inputs`,`roles`],[1,`reference-panel`],[`aria-live`,`polite`,1,`diagnostics`],[3,`error`],[`appearance`,`outlined`,3,`label`],[`rel`,`noopener noreferrer`,`target`,`_blank`,3,`href`],[1,`combine-area`],[`icon`,`magic`,3,`clicked`,`block`,`disabled`,`label`],[`aria-labelledby`,`output-title`,1,`output-section`],[`id`,`output-title`],[`aria-live`,`polite`,1,`result-panel`],[1,`output-placeholder`],[3,`clicked`,`disabled`,`label`],[3,`matTooltip`,`matTooltipShowDelay`],[`appearance`,`outlined`,3,`clicked`,`block`,`compact`,`disabled`,`icon`,`label`],[1,`visually-hidden`],[3,`disabled`,`label`,`value`],[3,`changed`,`disabled`,`label`,`value`],[3,`change`,`checked`,`disabled`],[`appearance`,`outlined`,3,`clicked`,`label`],[`aria-live`,`polite`,`role`,`status`],[3,`mode`,`value`],[1,`output-controls`],[3,`changed`,`disabled`,`label`,`options`,`value`],[`icon`,`download`,3,`clicked`,`disabled`,`label`],[`name`,`download`,1,`download-icon`],[1,`output-hint`]],template:function(e,t){e&1&&hm$1(0,hm,75,36,`ng-container`,1)},dependencies:[zz,Pi,Kt,Hi,Gi,Qi,Xe,Wi,$i,os,Bo,ss,as,Oi,En],styles:[`[_nghost-%COMP%]{display:block}.app-shell[_ngcontent-%COMP%]{max-width:70rem;margin-inline:auto;padding-inline:clamp(1rem,4vw,3rem)}.app-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding-block:1.75rem}.wordmark[_ngcontent-%COMP%]{color:#edeaf2;font-size:1.1rem;font-weight:500;letter-spacing:-.04em}.wordmark[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#c58eff;font-weight:400}.hero[_ngcontent-%COMP%]{padding:clamp(1.5rem,4vw,3rem);border-radius:1rem;background:linear-gradient(120deg,#bb9aee,#ecadd3);color:#241b2d}.eyebrow[_ngcontent-%COMP%]{margin:0 0 1rem;font-size:.7rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase}h1[_ngcontent-%COMP%]{margin:0;font-size:clamp(2rem,5vw,3.75rem);font-weight:500;letter-spacing:-.05em;line-height:1.08}.hero-description[_ngcontent-%COMP%]{margin-block:1.25rem 0}.privacy[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.4rem;margin-block:1.5rem 0;font-size:.8rem}.privacy[_ngcontent-%COMP%]   bhw-icon[_ngcontent-%COMP%]{width:1rem;height:1rem}.section-heading[_ngcontent-%COMP%]{margin-bottom:1rem}h2[_ngcontent-%COMP%]{color:#c58eff;margin:0;font-size:1rem;font-weight:500}.file-placeholder[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1.25rem;padding:1.75rem;border:1px dashed #42404a;border-radius:1rem;background:#1e1d24}.file-placeholder[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{flex:1}.file-placeholder[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0;font-size:1rem;font-weight:500}.file-placeholder[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:.4rem 0 0;color:#b4b2bf;font-size:.85rem}.upload-icon[_ngcontent-%COMP%]{width:2rem;height:2rem;color:#c58eff}.format-list[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:.75rem;margin:1rem 0 0;padding:0;list-style:none}.format-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{min-width:0;border-radius:1rem}.format-list[_ngcontent-%COMP%]   li.unavailable[_ngcontent-%COMP%]{cursor:not-allowed;filter:grayscale(1)}.format-list[_ngcontent-%COMP%]   li.unavailable[_ngcontent-%COMP%]   bhw-button[_ngcontent-%COMP%]{pointer-events:none}.visually-hidden[_ngcontent-%COMP%]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.combine-area[_ngcontent-%COMP%]{margin-block:1.25rem 0}.combine-area[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0 0 1rem;color:#b4b2bf;font-size:.8rem}.output-section[_ngcontent-%COMP%]{padding:1.5rem;border-radius:1rem;background:#1e1d24}.output-placeholder[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;padding:1.5rem 1rem;text-align:center}.output-placeholder[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:1rem 0 .5rem;font-size:1rem;font-weight:500}.output-placeholder[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:#b4b2bf;font-size:.85rem}.download-icon[_ngcontent-%COMP%]{width:2rem;height:2rem;color:#c58eff}.output-hint[_ngcontent-%COMP%]{margin-top:1.5rem;color:#b4b2bf;font-size:.75rem}.selection-toolbar[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:start;gap:1rem;margin-block:1rem}.selection-toolbar[_ngcontent-%COMP%]   bhw-expansion[_ngcontent-%COMP%]{flex:1}.actions[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:.5rem}.metadata[_ngcontent-%COMP%]{color:#b4b2bf;font-size:.8rem}.reference-panel[_ngcontent-%COMP%]{padding:1rem;border:1px solid #42404a;border-radius:1rem;background:#1e1d24}.reference-panel[_ngcontent-%COMP%]   li[_ngcontent-%COMP%], .diagnostics[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .result-panel[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{overflow-wrap:anywhere}.diagnostics[_ngcontent-%COMP%]{margin-block:1rem}.diagnostics[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%]{color:#ffb4c1}.diagnostics[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-block;padding:1rem}.output-controls[_ngcontent-%COMP%]{display:grid;grid-template-columns:minmax(0,1fr) minmax(6rem,10rem);gap:1rem;margin-block:1rem}.result-panel[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{padding-left:1.2rem;color:#b4b2bf;line-height:1.8}.drop-overlay[_ngcontent-%COMP%]{position:fixed;inset:1rem;z-index:100;display:grid;place-items:center;padding:2rem;border:2px dashed #c58eff;border-radius:1rem;background:#101114;text-align:center;pointer-events:none}@media(max-width:48rem){.app-header[_ngcontent-%COMP%]{padding-block:1.25rem}.format-list[_ngcontent-%COMP%]{grid-template-columns:repeat(3,minmax(0,1fr))}.file-placeholder[_ngcontent-%COMP%]{flex-wrap:wrap;padding:1.25rem}.file-placeholder[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{flex-basis:calc(100% - 3.5rem)}.file-placeholder[_ngcontent-%COMP%]   bhw-button[_ngcontent-%COMP%]{width:100%}}@media(max-width:35rem){.output-controls[_ngcontent-%COMP%]{grid-template-columns:minmax(0,1fr)}.selection-toolbar[_ngcontent-%COMP%]   bhw-expansion[_ngcontent-%COMP%]{flex-basis:100%}}@media(max-width:28rem){.format-list[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}.hero-description[_ngcontent-%COMP%]{font-size:.9rem}.output-section[_ngcontent-%COMP%]{padding:1.25rem}}.section-divider[_ngcontent-%COMP%]{margin-block:2rem;border:0;border-top:1px solid #42404a}.format-image[_ngcontent-%COMP%]{--%NS%bhw-input-accent: #abc7ff}.format-audio[_ngcontent-%COMP%]{--%NS%bhw-input-accent: #f2acd5}.format-video[_ngcontent-%COMP%]{--%NS%bhw-input-accent: #ccabff}.format-html[_ngcontent-%COMP%]{--%NS%bhw-input-accent: #85dfcc}.format-pdf[_ngcontent-%COMP%]{--%NS%bhw-input-accent: #f3b1af}.format-archive[_ngcontent-%COMP%]{--%NS%bhw-input-accent: #edd08d}`]})};export{Fl as Generator};