import{$ as Ul$1,$t as lD,A as Jv,An as wt$1,At as dm,B as P,Bt as g,C as Hs$1,Cn as ut$1,Ct as bo$1,D as It$1,Dn as wn$1,Dt as cp,E as Ip,En as we,Et as co$1,F as Me,Fn as yv,Ft as ew,G as Sn$1,Gt as iC,H as QU,Ht as hI,I as Ne,In as z_,It as fD,J as Tn$1,Jt as jb,K as Sr$1,Kt as im,L as Nm,Ln as zb,Lt as fe$1,M as LI,Mn as yI,Mt as eD,N as Le,Nn as yr$1,Nt as eH,O as JU,On as wo$1,Ot as cz,P as M,Pn as ys$1,Pt as ee,Q as Ub,Qt as kt,R as No$1,Rn as zl$1,Rt as fm,S as Hl$1,Sn as um,St as bd,T as In$1,Tn as vr$1,Tt as cm,U as Qv,Ut as hm,V as Q,Vt as gm,W as SC,Wt as hv,X as U8,Xt as jm,Y as Tr$1,Yt as jl$1,Z as U_,Zt as ki$1,_ as Ft$1,_n as st,_t as _s$1,a as $s$1,an as nH,at as Xa$1,b as H2,bn as uD,bt as av,c as B,cn as pe,ct as Xv,d as Bm,dn as qa,dt as Ys$1,en as ld,et as Us$1,f as Bs$1,fn as qs,ft as Yz,g as Ea,gn as so$1,gt as _n,h as EG,hn as sm,ht as _i$1,i as $o$1,in as nC,it as XU,j as Kb,jn as y,jt as dr$1,k as Jt,kn as wp,kt as dD,l as Bb,ln as pm,lt as Y_,m as DT,mn as rH,mt as Zz,n as $b,nn as m,nt as Wm,o as A,on as oC,ot as Xb,p as Cm,pn as rC,pt as Ze$1,q as Tm,qt as iv,r as $l$1,rn as me,rt as X,s as Ae,sn as om,st as Xg,t as $,tn as lo$1,tt as Vl$1,u as Bl$1,un as qD,ut as Ye$1,v as G,vn as tm,vt as ao$1,w as IG,wn as vm,wt as bt$1,x as Hb,xn as ue$1,xt as b,y as Gn$1,yn as tv,yt as ap,z as OC,zt as fo$1}from"./main-H7BUITZT.js";function St(i){return i.buttons===0||i.detail===0}function wt(i){let t=i.touches&&i.touches[0]||i.changedTouches&&i.changedTouches[0];return!!t&&t.identifier===-1&&(t.radiusX==null||t.radiusX===1)&&(t.radiusY==null||t.radiusY===1)}var bi;function Xa(){if(bi==null){let i=typeof document<`u`?document.head:null;bi=!!(i&&(i.createShadowRoot||i.attachShadow))}return bi}function gi(i){if(Xa()){let t=i.getRootNode?i.getRootNode():null;if(typeof ShadowRoot<`u`&&ShadowRoot&&t instanceof ShadowRoot)return t}return null}function ue(i){if(i.composedPath)try{return i.composedPath()[0]}catch{}return i.target}var _i;try{_i=typeof Intl<`u`&&Intl.v8BreakIterator}catch{_i=!1}var ne=(()=>{class i{_platformId=g(ao$1);isBrowser=this._platformId?H2(this._platformId):typeof document==`object`&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||_i)&&typeof CSS<`u`&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!(`MSStream`in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;static ɵfac=function(n){return new(n||i)};static ɵprov=pe({token:i,factory:i.ɵfac})}return i})();var Mt;function Ka(){if(Mt==null&&typeof window<`u`)try{window.addEventListener(`test`,null,Object.defineProperty({},"passive",{get:()=>Mt=!0}))}finally{Mt=Mt||!1}return Mt}function lt(i){return Ka()?i:!!i.capture}function Oe(i){return i instanceof Ye$1?i.nativeElement:i}var Ya=new m(`cdk-input-modality-detector-options`);var Za={ignoreKeys:[18,17,224,91,16]};var Qa=650;var vi={passive:!0,capture:!0};var Ja=(()=>{class i{_platform=g(ne);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new Me(null);_options;_lastTouchMs=0;_onKeydown=e=>{this._options?.ignoreKeys?.some(n=>n===e.keyCode)||(this._modality.next(`keyboard`),this._mostRecentTarget=ue(e))};_onMousedown=e=>{Date.now()-this._lastTouchMs<Qa||(this._modality.next(St(e)?`keyboard`:`mouse`),this._mostRecentTarget=ue(e))};_onTouchstart=e=>{if(wt(e)){this._modality.next(`keyboard`);return}this._lastTouchMs=Date.now(),this._modality.next(`touch`),this._mostRecentTarget=ue(e)};constructor(){let e=g(ee),n=g(B),a=g(Ya,{optional:!0});if(this._options=y(y({},Za),a),this.modalityDetected=this._modality.pipe(lD(1)),this.modalityChanged=this.modalityDetected.pipe(qa()),this._platform.isBrowser){let r=g(In$1).createRenderer(null,null);this._listenerCleanups=e.runOutsideAngular(()=>[r.listen(n,`keydown`,this._onKeydown,vi),r.listen(n,`mousedown`,this._onMousedown,vi),r.listen(n,`touchstart`,this._onTouchstart,vi)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(e=>e())}static ɵfac=function(n){return new(n||i)};static ɵprov=pe({token:i,factory:i.ɵfac})}return i})();var Nt=(function(i){return i[i.IMMEDIATE=0]=`IMMEDIATE`,i[i.EVENTUAL=1]=`EVENTUAL`,i})(Nt||{});var er=new m(`cdk-focus-monitor-default-options`);var vn=lt({passive:!0,capture:!0});var yi=(()=>{class i{_ngZone=g(ee);_platform=g(ne);_inputModalityDetector=g(Ja);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=g(B);_stopInputModalityDetector=new $;constructor(){let e=g(er,{optional:!0});this._detectionMode=e?.detectionMode||Nt.IMMEDIATE}_rootNodeFocusAndBlurListener=e=>{let n=ue(e);for(let a=n;a;a=a.parentElement)e.type===`focus`?this._onFocus(e,a):this._onBlur(e,a)};monitor(e,n=!1){let a=Oe(e);if(!this._platform.isBrowser||a.nodeType!==1)return fe$1();let r=gi(a)||this._document,o=this._elementInfo.get(a);if(o)return n&&(o.checkChildren=!0),o.subject;let m={checkChildren:n,subject:new $,rootNode:r};return this._elementInfo.set(a,m),this._registerGlobalListeners(m),m.subject}stopMonitoring(e){let n=Oe(e),a=this._elementInfo.get(n);a&&(a.subject.complete(),this._setClasses(n),this._elementInfo.delete(n),this._removeGlobalListeners(a))}focusVia(e,n,a){let r=Oe(e);r===this._document.activeElement?this._getClosestElementsInfo(r).forEach(([m,f])=>this._originChanged(m,n,f)):(this._setOrigin(n),typeof r.focus==`function`&&r.focus(a))}ngOnDestroy(){this._elementInfo.forEach((e,n)=>this.stopMonitoring(n))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(e){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(e)?`touch`:`program`:this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:e&&this._isLastInteractionFromInputLabel(e)?`mouse`:`program`}_shouldBeAttributedToTouch(e){return this._detectionMode===Nt.EVENTUAL||!!e?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(e,n){e.classList.toggle(`cdk-focused`,!!n),e.classList.toggle(`cdk-touch-focused`,n===`touch`),e.classList.toggle(`cdk-keyboard-focused`,n===`keyboard`),e.classList.toggle(`cdk-mouse-focused`,n===`mouse`),e.classList.toggle(`cdk-program-focused`,n===`program`)}_setOrigin(e,n=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=e,this._originFromTouchInteraction=e===`touch`&&n,this._detectionMode===Nt.IMMEDIATE){clearTimeout(this._originTimeoutId);let a=this._originFromTouchInteraction?Qa:1;this._originTimeoutId=setTimeout(()=>this._origin=null,a)}})}_onFocus(e,n){let a=this._elementInfo.get(n),r=ue(e);!a||!a.checkChildren&&n!==r||this._originChanged(n,this._getFocusOrigin(r),a)}_onBlur(e,n){let a=this._elementInfo.get(n);!a||a.checkChildren&&e.relatedTarget instanceof Node&&n.contains(e.relatedTarget)||(this._setClasses(n),this._emitOrigin(a,null))}_emitOrigin(e,n){e.subject.observers.length&&this._ngZone.run(()=>e.subject.next(n))}_registerGlobalListeners(e){if(!this._platform.isBrowser)return;let n=e.rootNode,a=this._rootNodeFocusListenerCount.get(n)||0;a||this._ngZone.runOutsideAngular(()=>{n.addEventListener(`focus`,this._rootNodeFocusAndBlurListener,vn),n.addEventListener(`blur`,this._rootNodeFocusAndBlurListener,vn)}),this._rootNodeFocusListenerCount.set(n,a+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener(`focus`,this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(Xa$1(this._stopInputModalityDetector)).subscribe(r=>{this._setOrigin(r,!0)}))}_removeGlobalListeners(e){let n=e.rootNode;if(this._rootNodeFocusListenerCount.has(n)){let a=this._rootNodeFocusListenerCount.get(n);a>1?this._rootNodeFocusListenerCount.set(n,a-1):(n.removeEventListener(`focus`,this._rootNodeFocusAndBlurListener,vn),n.removeEventListener(`blur`,this._rootNodeFocusAndBlurListener,vn),this._rootNodeFocusListenerCount.delete(n))}--this._monitoredElementCount||(this._getWindow().removeEventListener(`focus`,this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(e,n,a){this._setClasses(e,n),this._emitOrigin(a,n),this._lastFocusOrigin=n}_getClosestElementsInfo(e){let n=[];return this._elementInfo.forEach((a,r)=>{(r===e||a.checkChildren&&r.contains(e))&&n.push([r,a])}),n}_isLastInteractionFromInputLabel(e){let{_mostRecentTarget:n,mostRecentModality:a}=this._inputModalityDetector;if(a!==`mouse`||!n||n===e||e.nodeName!==`INPUT`&&e.nodeName!==`TEXTAREA`||e.disabled)return!1;let r=e.labels;if(r){for(let o=0;o<r.length;o++)if(r[o].contains(n))return!0}return!1}static ɵfac=function(n){return new(n||i)};static ɵprov=pe({token:i,factory:i.ɵfac})}return i})();function xi(i){return Array.isArray(i)?i:[i]}var tr=new Set;var Ye;var ki=(()=>{class i{_platform=g(ne);_nonce=g(co$1,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):rs}matchMedia(e){return(this._platform.WEBKIT||this._platform.BLINK)&&as(e,this._nonce),this._matchMedia(e)}static ɵfac=function(n){return new(n||i)};static ɵprov=pe({token:i,factory:i.ɵfac})}return i})();function as(i,t){if(!tr.has(i))try{Ye||(Ye=document.createElement(`style`),t&&Ye.setAttribute(`nonce`,t),Ye.setAttribute(`type`,`text/css`),document.head.appendChild(Ye)),Ye.sheet&&(Ye.sheet.insertRule(`@media ${i.replace(/[{}]/g,``)} {body{ }}`,0),tr.add(i))}catch(e){console.error(e)}}function rs(i){return{matches:i===`all`||i===``,media:i,addListener:()=>{},removeListener:()=>{}}}var os=(()=>{class i{create(e){return typeof MutationObserver>`u`?null:new MutationObserver(e)}static ɵfac=function(n){return new(n||i)};static ɵprov=pe({token:i,factory:i.ɵfac})}return i})();var nr=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵmod=Ze$1({type:i});static ɵinj=Ae({providers:[os]})}return i})();var ir=new m(`liveAnnouncerElement`,{providedIn:`root`,factory:()=>null});var ar=new m(`LIVE_ANNOUNCER_DEFAULT_OPTIONS`);var ss=0;var Ci=(()=>{class i{_ngZone=g(ee);_defaultOptions=g(ar,{optional:!0});_liveElement;_document=g(B);_sanitizer=g(ld);_previousTimeout;_currentPromise;_currentResolve;constructor(){let e=g(ir,{optional:!0});this._liveElement=e||this._createLiveElement()}announce(e,...n){let a=this._defaultOptions,r,o;return n.length===1&&typeof n[0]==`number`?o=n[0]:[r,o]=n,this.clear(),clearTimeout(this._previousTimeout),r||(r=a&&a.politeness?a.politeness:`polite`),o==null&&a&&(o=a.duration),this._liveElement.setAttribute(`aria-live`,r),this._liveElement.id&&this._exposeAnnouncerToModals(this._liveElement.id),this._ngZone.runOutsideAngular(()=>(this._currentPromise||(this._currentPromise=new Promise(m=>this._currentResolve=m)),clearTimeout(this._previousTimeout),this._previousTimeout=setTimeout(()=>{!e||typeof e==`string`?this._liveElement.textContent=e:Zz(this._liveElement,e,this._sanitizer),typeof o==`number`&&(this._previousTimeout=setTimeout(()=>this.clear(),o)),this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0},100),this._currentPromise))}clear(){this._liveElement&&(this._liveElement.textContent=``)}ngOnDestroy(){clearTimeout(this._previousTimeout),this._liveElement?.remove(),this._liveElement=null,this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0}_createLiveElement(){let e=`cdk-live-announcer-element`,n=this._document.getElementsByClassName(e),a=this._document.createElement(`div`);for(let r=0;r<n.length;r++)n[r].remove();return a.classList.add(e),a.classList.add(`cdk-visually-hidden`),a.setAttribute(`aria-atomic`,`true`),a.setAttribute(`aria-live`,`polite`),a.id=`cdk-live-announcer-${ss++}`,this._document.body.appendChild(a),a}_exposeAnnouncerToModals(e){let n=this._document.querySelectorAll(`body > .cdk-overlay-container [aria-modal="true"]`);for(let a=0;a<n.length;a++){let r=n[a],o=r.getAttribute(`aria-owns`);o?o.indexOf(e)===-1&&r.setAttribute(`aria-owns`,o+` `+e):r.setAttribute(`aria-owns`,e)}}static ɵfac=function(n){return new(n||i)};static ɵprov=pe({token:i,factory:i.ɵfac})}return i})();var ls=200;var yn=class{_letterKeyStream=new $;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new $;selectedItem=this._selectedItem;constructor(t,e){let n=typeof e?.debounceInterval==`number`?e.debounceInterval:ls;e?.skipPredicate&&(this._skipPredicateFn=e.skipPredicate),this.setItems(t),this._setupKeyHandler(n)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(t){this._selectedItemIndex=t}setItems(t){this._items=t}handleKey(t){let e=t.keyCode;t.key&&t.key.length===1?this._letterKeyStream.next(t.key.toLocaleUpperCase()):(e>=65&&e<=90||e>=48&&e<=57)&&this._letterKeyStream.next(String.fromCharCode(e))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(t){this._letterKeyStream.pipe(bt$1(e=>this._pressedLetters.push(e)),eD(t),Jt(()=>this._pressedLetters.length>0),P(()=>this._pressedLetters.join(``).toLocaleUpperCase())).subscribe(e=>{for(let n=1;n<this._items.length+1;n++){let a=(this._selectedItemIndex+n)%this._items.length,r=this._items[a];if(!this._skipPredicateFn?.(r)&&r.getLabel?.().toLocaleUpperCase().trim().indexOf(e)===0){this._selectedItem.next(r);break}}this._pressedLetters=[]})}};function He(i,...t){return t.length?t.some(e=>i[e]):i.altKey||i.shiftKey||i.ctrlKey||i.metaKey}var xn=class{_items;_activeItemIndex=Le(-1);_activeItem=Le(null);_wrap=!1;_typeaheadSubscription=X.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=t=>t.disabled;constructor(t,e){this._items=t,t instanceof ys$1?this._itemChangesSubscription=t.changes.subscribe(n=>this._itemsChanged(n.toArray())):fo$1(t)&&(this._effectRef=lo$1(()=>this._itemsChanged(t()),{injector:e}))}tabOut=new $;change=new $;skipPredicate(t){return this._skipPredicateFn=t,this}withWrap(t=!0){return this._wrap=t,this}withVerticalOrientation(t=!0){return this._vertical=t,this}withHorizontalOrientation(t){return this._horizontal=t,this}withAllowedModifierKeys(t){return this._allowedModifierKeys=t,this}withTypeAhead(t=200){this._typeaheadSubscription.unsubscribe();let e=this._getItemsArray();return this._typeahead=new yn(e,{debounceInterval:typeof t==`number`?t:void 0,skipPredicate:n=>this._skipPredicateFn(n)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(n=>{this.setActiveItem(n)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(t=!0){return this._homeAndEnd=t,this}withPageUpDown(t=!0,e=10){return this._pageUpAndDown={enabled:t,delta:e},this}setActiveItem(t){let e=this._activeItem();this.updateActiveItem(t),this._activeItem()!==e&&this.change.next(this._activeItemIndex())}onKeydown(t){let e=t.keyCode,a=[`altKey`,`ctrlKey`,`metaKey`,`shiftKey`].every(r=>!t[r]||this._allowedModifierKeys.indexOf(r)>-1);switch(e){case 9:this.tabOut.next();return;case 40:if(this._vertical&&a){this.setNextItemActive();break}else return;case 38:if(this._vertical&&a){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&a){this._horizontal===`rtl`?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&a){this._horizontal===`rtl`?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&a){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&a){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&a){let r=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(r>0?r:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&a){let r=this._activeItemIndex()+this._pageUpAndDown.delta,o=this._getItemsArray().length;this._setActiveItemByIndex(r<o?r:o-1,-1);break}else return;default:(a||He(t,`shiftKey`))&&this._typeahead?.handleKey(t);return}this._typeahead?.reset(),t.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(t){let e=this._getItemsArray(),n=typeof t==`number`?t:e.indexOf(t),a=e[n];this._activeItem.set(a??null),this._activeItemIndex.set(n),this._typeahead?.setCurrentSelectedItemIndex(n)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(t){this._wrap?this._setActiveInWrapMode(t):this._setActiveInDefaultMode(t)}_setActiveInWrapMode(t){let e=this._getItemsArray();for(let n=1;n<=e.length;n++){let a=(this._activeItemIndex()+t*n+e.length)%e.length,r=e[a];if(!this._skipPredicateFn(r)){this.setActiveItem(a);return}}}_setActiveInDefaultMode(t){this._setActiveItemByIndex(this._activeItemIndex()+t,t)}_setActiveItemByIndex(t,e){let n=this._getItemsArray();if(n[t]){for(;this._skipPredicateFn(n[t]);)if(t+=e,!n[t])return;this.setActiveItem(t)}}_getItemsArray(){return fo$1(this._items)?this._items():this._items instanceof ys$1?this._items.toArray():this._items}_itemsChanged(t){this._typeahead?.setItems(t);let e=this._activeItem();if(e){let n=t.indexOf(e);n>-1&&n!==this._activeItemIndex()&&(this._activeItemIndex.set(n),this._typeahead?.setCurrentSelectedItemIndex(n))}}};var Et=class extends xn{setActiveItem(t){this.activeItem&&this.activeItem.setInactiveStyles(),super.setActiveItem(t),this.activeItem&&this.activeItem.setActiveStyles()}};var lr=new Map;var fe=class i{_appId=g(so$1);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(t,e=!1){this._appId!==`ng`&&(t+=this._appId);let n=lr.get(t);return n===void 0?n=0:n++,lr.set(t,n),`${t}${e?i._infix+`-`:``}${n}`}static ɵfac=function(e){return new(e||i)};static ɵprov=pe({token:i,factory:i.ɵfac})};var hr=(()=>{class i{_renderer;_elementRef;onChange=e=>{};onTouched=()=>{};constructor(e,n){this._renderer=e,this._elementRef=n}setProperty(e,n){this._renderer.setProperty(this._elementRef.nativeElement,e,n)}registerOnTouched(e){this.onTouched=e}registerOnChange(e){this.onChange=e}setDisabledState(e){this.setProperty(`disabled`,e)}static ɵfac=function(n){return new(n||i)(Tn$1(dr$1),Tn$1(Ye$1))};static ɵdir=yr$1({type:i})}return i})();var cs=(()=>{class i extends hr{static ɵfac=(()=>{let e;return function(a){return(e||(e=bo$1(i)))(a||i)}})();static ɵdir=yr$1({type:i,features:[Xg]})}return i})();var Ei=new m(``);var ds={provide:Ei,useExisting:ki$1(()=>br),multi:!0};function ms(){let i=ut$1()?ut$1().getUserAgent():``;return/android (\d+)/.test(i.toLowerCase())}var us=new m(``);var br=(()=>{class i extends hr{_compositionMode;_composing=!1;constructor(e,n,a){super(e,n),this._compositionMode=a,this._compositionMode??=!ms()}writeValue(e){let n=e??``;this.setProperty(`value`,n)}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e)}_compositionStart(){this._composing=!0}_compositionEnd(e){this._composing=!1,this._compositionMode&&this.onChange(e)}static ɵfac=function(n){return new(n||i)(Tn$1(dr$1),Tn$1(Ye$1),Tn$1(us,8))};static ɵdir=yr$1({type:i,selectors:[[`input`,`formControlName`,``,3,`type`,`checkbox`,3,`ngNoCva`,``],[`textarea`,`formControlName`,``,3,`ngNoCva`,``],[`input`,`formControl`,``,3,`type`,`checkbox`,3,`ngNoCva`,``],[`textarea`,`formControl`,``,3,`ngNoCva`,``],[`input`,`ngModel`,``,3,`type`,`checkbox`,3,`ngNoCva`,``],[`textarea`,`ngModel`,``,3,`ngNoCva`,``],[``,`ngDefaultControl`,``]],hostBindings:function(n,a){n&1&&dm(`input`,function(o){return a._handleInput(o.target.value)})(`blur`,function(){return a.onTouched()})(`compositionstart`,function(){return a._compositionStart()})(`compositionend`,function(o){return a._compositionEnd(o.target.value)})},standalone:!1,features:[Nm([ds]),Xg]})}return i})();function Di(i){return i==null||Oi(i)===0}function Oi(i){return i==null?null:Array.isArray(i)||typeof i==`string`?i.length:i instanceof Set?i.size:null}var Ft=new m(``);var gr=new m(``);var ps=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;var Ze=class{static min(t){return fs(t)}static max(t){return hs(t)}static required(t){return _r(t)}static requiredTrue(t){return bs(t)}static email(t){return gs(t)}static minLength(t){return _s(t)}static maxLength(t){return vs(t)}static pattern(t){return ys(t)}static nullValidator(t){return Cn()}static compose(t){return Sr(t)}static composeAsync(t){return wr(t)}};function fs(i){return t=>{if(t.value==null||i==null)return null;let e=parseFloat(t.value);return!isNaN(e)&&e<i?{min:{min:i,actual:t.value}}:null}}function hs(i){return t=>{if(t.value==null||i==null)return null;let e=parseFloat(t.value);return!isNaN(e)&&e>i?{max:{max:i,actual:t.value}}:null}}function _r(i){return Di(i.value)?{required:!0}:null}function bs(i){return i.value===!0?null:{required:!0}}function gs(i){return Di(i.value)||ps.test(i.value)?null:{email:!0}}function _s(i){return t=>{let e=t.value?.length??Oi(t.value);return e===null||e===0?null:e<i?{minlength:{requiredLength:i,actualLength:e}}:null}}function vs(i){return t=>{let e=t.value?.length??Oi(t.value);return e!==null&&e>i?{maxlength:{requiredLength:i,actualLength:e}}:null}}function ys(i){if(!i)return Cn;let t,e;return typeof i==`string`?(e=``,i.charAt(0)!==`^`&&(e+=`^`),e+=i,i.charAt(i.length-1)!==`$`&&(e+=`$`),t=new RegExp(e)):(e=i.toString(),t=i),n=>{if(Di(n.value))return null;let a=n.value;return t.test(a)?null:{pattern:{requiredPattern:e,actualValue:a}}}}function Cn(i){return null}function vr(i){return i!=null}function yr(i){return Bs$1(i)?me(i):i}function xr(i){let t={};return i.forEach(e=>{t=e!=null?y(y({},t),e):t}),Object.keys(t).length===0?null:t}function kr(i,t){return t.map(e=>e(i))}function xs(i){return!i.validate}function Cr(i){return i.map(t=>xs(t)?t:e=>t.validate(e))}function Sr(i){if(!i)return null;let t=i.filter(vr);return t.length==0?null:function(e){return xr(kr(e,t))}}function Ii(i){return i!=null?Sr(Cr(i)):null}function wr(i){if(!i)return null;let t=i.filter(vr);return t.length==0?null:function(e){let n=kr(e,t).map(yr);return Gn$1(n).pipe(P(xr))}}function Ai(i){return i!=null?wr(Cr(i)):null}function cr(i,t){return i===null?[t]:Array.isArray(i)?[...i,t]:[i,t]}function Mr(i){return i._rawValidators}function Nr(i){return i._rawAsyncValidators}function Mi(i){return i?Array.isArray(i)?i:[i]:[]}function Sn(i,t){return Array.isArray(i)?i.includes(t):i===t}function dr(i,t){let e=Mi(t);return Mi(i).forEach(a=>{Sn(e,a)||e.push(a)}),e}function mr(i,t){return Mi(t).filter(e=>!Sn(i,e))}var wn=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(t){this._rawValidators=t||[],this._composedValidatorFn=Ii(this._rawValidators)}_setAsyncValidators(t){this._rawAsyncValidators=t||[],this._composedAsyncValidatorFn=Ai(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(t){this._onDestroyCallbacks.push(t)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(t=>t()),this._onDestroyCallbacks=[]}reset(t=void 0){this.control?.reset(t)}hasError(t,e){return this.control?this.control.hasError(t,e):!1}getError(t,e){return this.control?this.control.getError(t,e):null}};var mt=class extends wn{name;get formDirective(){return null}get path(){return null}};var Dt=`VALID`;var kn=`INVALID`;var ct=`PENDING`;var Ot=`DISABLED`;var qe=class{};var Mn=class extends qe{value;source;constructor(t,e){super(),this.value=t,this.source=e}};var At=class extends qe{pristine;source;constructor(t,e){super(),this.pristine=t,this.source=e}};var Rt=class extends qe{touched;source;constructor(t,e){super(),this.touched=t,this.source=e}};var dt=class extends qe{status;source;constructor(t,e){super(),this.status=t,this.source=e}};var Nn=class extends qe{source;constructor(t){super(),this.source=t}};var ut=class extends qe{source;constructor(t){super(),this.source=t}};function Er(i){return(An(i)?i.validators:i)||null}function ks(i){return Array.isArray(i)?Ii(i):i||null}function Dr(i,t){return(An(t)?t.asyncValidators:i)||null}function Cs(i){return Array.isArray(i)?Ai(i):i||null}function An(i){return i!=null&&!Array.isArray(i)&&typeof i==`object`}function Ss(i,t,e){let n=i.controls;if(!(t?Object.keys(n):n).length)throw new b(1e3,``);if(!Or(n,e))throw new b(1001,``)}function ws(i,t,e){i._forEachChild((n,a)=>{if(e[a]===void 0)throw new b(-1002,``)})}var En=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_hasRequired=Le(!1);_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(t,e){this._assignValidators(t),this._assignAsyncValidators(e)}get validator(){return this._composedValidatorFn}set validator(t){this._rawValidators=this._composedValidatorFn=t,this._updateHasRequiredValidator()}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(t){this._rawAsyncValidators=this._composedAsyncValidatorFn=t}get parent(){return this._parent}get status(){return Ft$1(this.statusReactive)}set status(t){Ft$1(()=>this.statusReactive.set(t))}_status=vr$1(()=>this.statusReactive());statusReactive=Le(void 0);get valid(){return this.status===Dt}get invalid(){return this.status===kn}get pending(){return this.status===ct}get disabled(){return this.status===Ot}get enabled(){return this.status!==Ot}errors;get pristine(){return Ft$1(this.pristineReactive)}set pristine(t){Ft$1(()=>this.pristineReactive.set(t))}_pristine=vr$1(()=>this.pristineReactive());pristineReactive=Le(!0);get dirty(){return!this.pristine}get touched(){return Ft$1(this.touchedReactive)}set touched(t){Ft$1(()=>this.touchedReactive.set(t))}_touched=vr$1(()=>this.touchedReactive());touchedReactive=Le(!1);get untouched(){return!this.touched}_events=new $;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:`change`}setValidators(t){this._assignValidators(t)}setAsyncValidators(t){this._assignAsyncValidators(t)}addValidators(t){this.setValidators(dr(t,this._rawValidators))}addAsyncValidators(t){this.setAsyncValidators(dr(t,this._rawAsyncValidators))}removeValidators(t){this.setValidators(mr(t,this._rawValidators))}removeAsyncValidators(t){this.setAsyncValidators(mr(t,this._rawAsyncValidators))}hasValidator(t){return Sn(this._rawValidators,t)}hasAsyncValidator(t){return Sn(this._rawAsyncValidators,t)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(t={}){let e=this.touched===!1;this.touched=!0;let n=t.sourceControl??this;t.onlySelf||this._parent?.markAsTouched(A(y({},t),{sourceControl:n})),e&&t.emitEvent!==!1&&this._events.next(new Rt(!0,n))}markAllAsDirty(t={}){this.markAsDirty({onlySelf:!0,emitEvent:t.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsDirty(t))}markAllAsTouched(t={}){this.markAsTouched({onlySelf:!0,emitEvent:t.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsTouched(t))}markAsUntouched(t={}){let e=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let n=t.sourceControl??this;this._forEachChild(a=>{a.markAsUntouched({onlySelf:!0,emitEvent:t.emitEvent,sourceControl:n})}),t.onlySelf||this._parent?._updateTouched(t,n),e&&t.emitEvent!==!1&&this._events.next(new Rt(!1,n))}markAsDirty(t={}){let e=this.pristine===!0;this.pristine=!1;let n=t.sourceControl??this;t.onlySelf||this._parent?.markAsDirty(A(y({},t),{sourceControl:n})),e&&t.emitEvent!==!1&&this._events.next(new At(!1,n))}markAsPristine(t={}){let e=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let n=t.sourceControl??this;this._forEachChild(a=>{a.markAsPristine({onlySelf:!0,emitEvent:t.emitEvent})}),t.onlySelf||this._parent?._updatePristine(t,n),e&&t.emitEvent!==!1&&this._events.next(new At(!0,n))}markAsPending(t={}){this.status=ct;let e=t.sourceControl??this;t.emitEvent!==!1&&(this._events.next(new dt(this.status,e)),this.statusChanges.emit(this.status)),t.onlySelf||this._parent?.markAsPending(A(y({},t),{sourceControl:e}))}disable(t={}){let e=this._parentMarkedDirty(t.onlySelf);this.status=Ot,this.errors=null,this._forEachChild(a=>{a.disable(A(y({},t),{onlySelf:!0}))}),this._updateValue();let n=t.sourceControl??this;t.emitEvent!==!1&&(this._events.next(new Mn(this.value,n)),this._events.next(new dt(this.status,n)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(A(y({},t),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(a=>a(!0))}enable(t={}){let e=this._parentMarkedDirty(t.onlySelf);this.status=Dt,this._forEachChild(n=>{n.enable(A(y({},t),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent}),this._updateAncestors(A(y({},t),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(n=>n(!1))}_updateAncestors(t,e){t.onlySelf||(this._parent?.updateValueAndValidity(t),t.skipPristineCheck||this._parent?._updatePristine({},e),this._parent?._updateTouched({},e))}setParent(t){this._parent=t}getRawValue(){return this.value}updateValueAndValidity(t={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let n=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===Dt||this.status===ct)&&this._runAsyncValidator(n,t.emitEvent)}let e=t.sourceControl??this;t.emitEvent!==!1&&(this._events.next(new Mn(this.value,e)),this._events.next(new dt(this.status,e)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),t.onlySelf||this._parent?.updateValueAndValidity(A(y({},t),{sourceControl:e}))}_updateTreeValidity(t={emitEvent:!0}){this._forEachChild(e=>e._updateTreeValidity(t)),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?Ot:Dt}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(t,e){if(this.asyncValidator){this.status=ct,this._hasOwnPendingAsyncValidator={emitEvent:e!==!1,shouldHaveEmitted:t!==!1};let n=yr(this.asyncValidator(this));this._asyncValidationSubscription=n.subscribe(a=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(a,{emitEvent:e,shouldHaveEmitted:t})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let t=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,t}return!1}setErrors(t,e={}){this.errors=t,this._updateControlsErrors(e.emitEvent!==!1,this,e.shouldHaveEmitted)}get(t){let e=t;return e==null||(Array.isArray(e)||(e=e.split(`.`)),e.length===0)?null:e.reduce((n,a)=>n&&n._find(a),this)}getError(t,e){let n=e?this.get(e):this;return n?.errors?n.errors[t]:null}hasError(t,e){return!!this.getError(t,e)}get root(){let t=this;for(;t._parent;)t=t._parent;return t}_updateControlsErrors(t,e,n){this.status=this._calculateStatus(),t&&this.statusChanges.emit(this.status),(t||n)&&this._events.next(new dt(this.status,e)),this._parent&&this._parent._updateControlsErrors(t,e,n)}_initObservables(){this.valueChanges=new Ne,this.statusChanges=new Ne}_calculateStatus(){return this._allControlsDisabled()?Ot:this.errors?kn:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(ct)?ct:this._anyControlsHaveStatus(kn)?kn:Dt}_anyControlsHaveStatus(t){return this._anyControls(e=>e.status===t)}_anyControlsDirty(){return this._anyControls(t=>t.dirty)}_anyControlsTouched(){return this._anyControls(t=>t.touched)}_updatePristine(t,e){let n=!this._anyControlsDirty(),a=this.pristine!==n;this.pristine=n,t.onlySelf||this._parent?._updatePristine(t,e),a&&this._events.next(new At(this.pristine,e))}_updateTouched(t={},e){this.touched=this._anyControlsTouched(),this._events.next(new Rt(this.touched,e)),t.onlySelf||this._parent?._updateTouched(t,e)}_onDisabledChange=[];_registerOnCollectionChange(t){this._onCollectionChange=t}_setUpdateStrategy(t){An(t)&&t.updateOn!=null&&(this._updateOn=t.updateOn)}_parentMarkedDirty(t){return!t&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(t){return null}_assignValidators(t){this._rawValidators=Array.isArray(t)?t.slice():t,this._composedValidatorFn=ks(this._rawValidators),this._updateHasRequiredValidator()}_assignAsyncValidators(t){this._rawAsyncValidators=Array.isArray(t)?t.slice():t,this._composedAsyncValidatorFn=Cs(this._rawAsyncValidators)}_updateHasRequiredValidator(){Ft$1(()=>this._hasRequired.set(this.hasValidator(Ze.required)))}};function Or(i,t){return Object.hasOwn(i,t)}function Ms(i){return i.tagName===`INPUT`||i.tagName===`SELECT`||i.tagName===`TEXTAREA`}function Ns(i,t,e,n){switch(e){case`name`:i.setAttribute(t,e,n);break;case`disabled`:case`readonly`:case`required`:n?i.setAttribute(t,e,``):i.removeAttribute(t,e);break;case`max`:case`min`:case`minLength`:case`maxLength`:n!==void 0?i.setAttribute(t,e,n.toString()):i.removeAttribute(t,e)}}var Ni=class{kind;context;control;message;constructor({kind:t,context:e,control:n}){this.kind=t,this.context=e,this.control=n}};var Es=(()=>{class i{_validator=Cn;_onChange;_enabled;ngOnChanges(e){if(this.inputName in e){let n=this.normalizeInput(e[this.inputName].currentValue);this._enabled=this.enabled(n),this._validator=this._enabled?this.createValidator(n):Cn,this._onChange?.()}}validate(e){return this._validator(e)}registerOnValidatorChange(e){this._onChange=e}enabled(e){return e!=null}static ɵfac=function(n){return new(n||i)};static ɵdir=yr$1({type:i,features:[wo$1]})}return i})();var Ds={provide:Ft,useExisting:ki$1(()=>Ir),multi:!0};var Ir=(()=>{class i extends Es{required;inputName=`required`;normalizeInput=jm;createValidator=e=>_r;enabled(e){return e}static ɵfac=(()=>{let e;return function(a){return(e||(e=bo$1(i)))(a||i)}})();static ɵdir=yr$1({type:i,selectors:[[``,`required`,``,`formControlName`,``,3,`type`,`checkbox`],[``,`required`,``,`formControl`,``,3,`type`,`checkbox`],[``,`required`,``,`ngModel`,``,3,`type`,`checkbox`]],hostVars:1,hostBindings:function(n,a){n&2&&No$1(`required`,a._enabled?``:null)},inputs:{required:`required`},standalone:!1,features:[Nm([Ds]),Xg]})}return i})();var Ar=new m(``,{factory:()=>Os});var Os=`always`;function ur(i,t,e=!0){let n=()=>{};t?.valueAccessor?.registerOnChange(n),t?.valueAccessor?.registerOnTouched(n),On(i,t),i&&(t._invokeOnDestroyCallbacks(),i._registerOnCollectionChange(()=>{}))}function Dn(i,t){i.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(t)})}function Rr(i,t){let e=Mr(i);t.validator!==null?i.setValidators(cr(e,t.validator)):typeof e==`function`&&i.setValidators([e]);let n=Nr(i);t.asyncValidator!==null?i.setAsyncValidators(cr(n,t.asyncValidator)):typeof n==`function`&&i.setAsyncValidators([n]);let a=()=>i.updateValueAndValidity();Dn(t._rawValidators,a),Dn(t._rawAsyncValidators,a)}function On(i,t){let e=!1;if(i!==null){if(t.validator!==null){let a=Mr(i);if(Array.isArray(a)&&a.length>0){let r=a.filter(o=>o!==t.validator);r.length!==a.length&&(e=!0,i.setValidators(r))}}if(t.asyncValidator!==null){let a=Nr(i);if(Array.isArray(a)&&a.length>0){let r=a.filter(o=>o!==t.asyncValidator);r.length!==a.length&&(e=!0,i.setAsyncValidators(r))}}}let n=()=>{};return Dn(t._rawValidators,n),Dn(t._rawAsyncValidators,n),e}function Fr(i,t){Rr(i,t)}function Is(i,t){return On(i,t)}function As(i){return Object.getPrototypeOf(i.constructor)===cs}function Tr(i,t){i._syncPendingControls(),t.forEach(e=>{let n=e.control;n.updateOn===`submit`&&n._pendingChange&&(e.viewToModelUpdate(n._pendingValue),n._pendingChange=!1)})}function Rs(i,t){if(!t)return null;let e,n,a;return t.forEach(r=>{r.constructor===br?e=r:As(r)?n=r:a=r}),a||n||e||null}function Fs(i,t){let e=i.indexOf(t);e>-1&&i.splice(e,1)}var pt=class extends wn{_parent=null;name=null;valueAccessor=null;isCustomControlBased=!1;userOnReset;resetSubscription;set onReset(t){this.userOnReset=t,this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.control&&(this.resetSubscription=this.control.events.subscribe(e=>{e instanceof ut&&this.control&&this.userOnReset?.(this.control.value)}),this.subscription?.add(this.resetSubscription))}isNativeFormElement=!1;rawValueAccessors;_selectedValueAccessor=null;get selectedValueAccessor(){return this._selectedValueAccessor??=Rs(this,this.rawValueAccessors)}parseErrorsValidator=null;renderer;injector;requiredValidatorViaDi;subscription;customControlBindings=null;constructor(t,e,n){super(),this.injector=t,this.renderer=e,this.rawValueAccessors=n,this.injector?.get(Q)?.onDestroy(()=>{this.removeParseErrorsValidator(this.control),this.subscription?.unsubscribe()})}setupCustomControl(){this.subscription?.unsubscribe();let t=this.injector?.get(Ys$1);if(!this.control||!t)return;let e=t.markForCheck.bind(t);this.subscription=new X,this.subscription.add(this.control.valueChanges.subscribe(e)),this.subscription.add(this.control.statusChanges.subscribe(e)),this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.userOnReset&&(this.resetSubscription=this.control.events.subscribe(n=>{n instanceof ut&&this.control&&this.userOnReset?.(this.control.value)}),this.subscription.add(this.resetSubscription)),this.parseErrorsValidator&&this.control.addValidators(this.parseErrorsValidator)}ngControlCreate(t){!t.nativeElement.hasAttribute?.(`ngNoCva`)&&(this.rawValueAccessors&&this.rawValueAccessors.length>0||this.valueAccessor!==null)||!t.customControl||(this.isCustomControlBased=!0,t.listenToCustomControlModel(a=>{this.control?.markAsDirty(),this.control?.setValue(a,{emitModelToViewChange:!1}),this.viewToModelUpdate(a)}),t.listenToCustomControlOutput(`touch`,()=>{this.control?.markAsTouched()}),this.customControlBindings={},this.isNativeFormElement=Ms(t.nativeElement),this.requiredValidatorViaDi=this._rawValidators.find(a=>a instanceof Ir))}ngControlUpdate(t,e){if(!this.isCustomControlBased)return;let n=this.control,a=this.customControlBindings;Object.is(a.value,n.value)||(a.value=n.value,t.setCustomControlModelInput(n.value)),this.bindControlProperty(t,a,`touched`,n.touched),this.bindControlProperty(t,a,`dirty`,n.dirty),this.bindControlProperty(t,a,`valid`,n.valid),this.bindControlProperty(t,a,`invalid`,n.invalid),this.bindControlProperty(t,a,`pending`,n.pending),this.bindControlProperty(t,a,`disabled`,n.disabled),this.shouldBindRequired&&this.bindControlProperty(t,a,`required`,this.isRequired);let r=n.errors;if(a.errors!==r){a.errors=r;let o=this._convertErrors(r);t.setInputOnDirectives(`errors`,o)}}get isRequired(){return(this.requiredValidatorViaDi?._enabled||this.control?._hasRequired())??!1}get shouldBindRequired(){return!0}bindControlProperty(t,e,n,a){if(e[n]===a)return;e[n]=a;let r=t.setInputOnDirectives(n,a);this.isNativeFormElement&&!r&&(n===`disabled`||n===`required`)&&this.renderer&&Ns(this.renderer,t.nativeElement,n,a)}_convertErrors(t){if(t===null)return[];let e=this.control;return Object.entries(t).map(([n,a])=>new Ni({context:a,kind:n,control:e}))}setParseErrorSource(t){if(t===void 0)return;let e=null,n=vr$1(()=>{let a=t();return a.length===0?null:a.reduce((r,o)=>(r[o.kind]=o,r),{})});this.parseErrorsValidator=(()=>e).bind(this),lo$1(()=>{e=n(),this.control?.updateValueAndValidity({emitEvent:!1})},{injector:this.injector})}removeParseErrorsValidator(t){this.parseErrorsValidator&&(t?.removeValidators(this.parseErrorsValidator),t?.updateValueAndValidity({emitEvent:!1}))}};var In=class extends En{constructor(t,e,n){super(Er(e),Dr(n,e)),this.controls=t,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(t,e){return this._find(t)||(this.controls[t]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(t,e,n={}){this.registerControl(t,e),this.updateValueAndValidity({emitEvent:n.emitEvent}),this._onCollectionChange()}removeControl(t,e={}){let n=this._find(t);n&&n._registerOnCollectionChange(()=>{}),delete this.controls[t],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}setControl(t,e,n={}){let a=this._find(t);a&&a._registerOnCollectionChange(()=>{}),delete this.controls[t],e&&this.registerControl(t,e),this.updateValueAndValidity({emitEvent:n.emitEvent}),this._onCollectionChange()}contains(t){return this._find(t)?.enabled===!0}setValue(t,e={}){Ft$1(()=>{ws(this,!0,t),Object.keys(t).forEach(n=>{Ss(this,!0,n),this.controls[n].setValue(t[n],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)})}patchValue(t,e={}){t!=null&&(Object.keys(t).forEach(n=>{let a=this._find(n);a&&a.patchValue(t[n],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(t={},e={}){this._forEachChild((n,a)=>{n.reset(t?t[a]:null,A(y({},e),{onlySelf:!0}))}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==!1&&this._events.next(new ut(this))}getRawValue(){return this._reduceChildren({},(t,e,n)=>(t[n]=e.getRawValue(),t))}_syncPendingControls(){let t=this._reduceChildren(!1,(e,n)=>n._syncPendingControls()?!0:e);return t&&this.updateValueAndValidity({onlySelf:!0}),t}_forEachChild(t){Object.keys(this.controls).forEach(e=>{let n=this.controls[e];n&&t(n,e)})}_setUpControls(){this._forEachChild(t=>{t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(t){for(let[e,n]of Object.entries(this.controls))if(this.contains(e)&&t(n))return!0;return!1}_reduceValue(){return this._reduceChildren({},(e,n,a)=>((n.enabled||this.disabled)&&(e[a]=n.value),e))}_reduceChildren(t,e){let n=t;return this._forEachChild((a,r)=>{n=e(n,a,r)}),n}_allControlsDisabled(){for(let t of Object.keys(this.controls))if(this.controls[t].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(t){return Or(this.controls,t)?this.controls[t]:null}};var Ts={provide:mt,useExisting:ki$1(()=>Tt)};var It=Promise.resolve();var Tt=(()=>{class i extends mt{callSetDisabledState;get submitted(){return Ft$1(this.submittedReactive)}_submitted=vr$1(()=>this.submittedReactive());submittedReactive=Le(!1);_directives=new Set;form;ngSubmit=new Ne;options;constructor(e,n,a){super(),this.callSetDisabledState=a,this.form=new In({},Ii(e),Ai(n))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(e){It.then(()=>{e.control=this._findContainer(e.path).registerControl(e.name,e.control),e._setupWithForm(this.callSetDisabledState),e.control.updateValueAndValidity({emitEvent:!1}),this._directives.add(e)})}getControl(e){return this.form.get(e.path)}removeControl(e){It.then(()=>{this._findContainer(e.path)?.removeControl(e.name),this._directives.delete(e)})}addFormGroup(e){It.then(()=>{let n=this._findContainer(e.path),a=new In({});Fr(a,e),n.registerControl(e.name,a),a.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(e){It.then(()=>{this._findContainer(e.path)?.removeControl?.(e.name)})}getFormGroup(e){return this.form.get(e.path)}updateModel(e,n){It.then(()=>{this.form.get(e.path).setValue(n)})}setValue(e){this.control.setValue(e)}onSubmit(e){return this.submittedReactive.set(!0),Tr(this.form,this._directives),this.ngSubmit.emit(e),this.form._events.next(new Nn(this.control)),e?.target?.method===`dialog`}onReset(){this.resetForm()}resetForm(e=void 0){this.form.reset(e),this.submittedReactive.set(!1)}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn)}_findContainer(e){return e.pop(),e.length?this.form.get(e):this.form}static ɵfac=function(n){return new(n||i)(Tn$1(Ft,10),Tn$1(gr,10),Tn$1(Ar,8))};static ɵdir=yr$1({type:i,selectors:[[`form`,3,`ngNoForm`,``,3,`formGroup`,``,3,`formArray`,``],[`ng-form`],[``,`ngForm`,``]],hostBindings:function(n,a){n&1&&dm(`submit`,function(o){return a.onSubmit(o)})(`reset`,function(){return a.onReset()})},inputs:{options:[0,`ngFormOptions`,`options`]},outputs:{ngSubmit:`ngSubmit`},exportAs:[`ngForm`],standalone:!1,features:[Nm([Ts]),Xg]})}return i})();function pr(i,t){let e=i.indexOf(t);e>-1&&i.splice(e,1)}function fr(i){return typeof i==`object`&&i!==null&&Object.keys(i).length===2&&`value`in i&&`disabled`in i}var Ps=class extends En{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(t=null,e,n){super(Er(e),Dr(n,e)),this._applyFormState(t),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),An(e)&&(e.nonNullable||e.initialValueIsDefault)&&(fr(t)?this.defaultValue=t.value:this.defaultValue=t)}setValue(t,e={}){Ft$1(()=>{this.value=this._pendingValue=t,this._onChange.length&&e.emitModelToViewChange!==!1&&this._onChange.forEach(n=>n(this.value,e.emitViewToModelChange!==!1)),this.updateValueAndValidity(e)})}patchValue(t,e={}){this.setValue(t,e)}reset(t=this.defaultValue,e={}){this._applyFormState(t),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),e.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,e?.emitEvent!==!1&&this._events.next(new ut(this))}_updateValue(){}_anyControls(t){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(t){this._onChange.push(t)}_unregisterOnChange(t){pr(this._onChange,t)}registerOnDisabledChange(t){this._onDisabledChange.push(t)}_unregisterOnDisabledChange(t){pr(this._onDisabledChange,t)}_forEachChild(t){}_syncPendingControls(){return this.updateOn===`submit`&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(t){fr(t)?(this.value=this._pendingValue=t.value,t.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=t}};var Vs=i=>i instanceof Ps;var Ls=(()=>{class i extends mt{callSetDisabledState;get submitted(){return Ft$1(this._submittedReactive)}set submitted(e){this._submittedReactive.set(e)}_submitted=vr$1(()=>this._submittedReactive());_submittedReactive=Le(!1);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(e,n,a){super(),this.callSetDisabledState=a,this._setValidators(e),this._setAsyncValidators(n)}ngOnChanges(e){this.onChanges(e)}ngOnDestroy(){this.onDestroy()}onChanges(e){if(!this.form)throw new b(1052,!1);Object.hasOwn(e,`form`)&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}onDestroy(){this.form&&(On(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get path(){return[]}addControl(e){let n=this.form.get(e.path);return e._setupWithForm(n,this.callSetDisabledState),n.updateValueAndValidity({emitEvent:!1}),this.directives.push(e),n}getControl(e){return this.form.get(e.path)}removeControl(e){ur(e.control||null,e,!1),Fs(this.directives,e)}addFormGroup(e){this._setUpFormContainer(e)}removeFormGroup(e){this._cleanUpFormContainer(e)}getFormGroup(e){return this.form.get(e.path)}getFormArray(e){return this.form.get(e.path)}addFormArray(e){this._setUpFormContainer(e)}removeFormArray(e){this._cleanUpFormContainer(e)}updateModel(e,n){this.form.get(e.path).setValue(n)}onReset(){this.resetForm()}resetForm(e=void 0,n={}){this.form.reset(e,n),this._submittedReactive.set(!1)}onSubmit(e){return this.submitted=!0,Tr(this.form,this.directives),this.ngSubmit.emit(e),this.form._events.next(new Nn(this.control)),e?.target?.method===`dialog`}_updateDomValue(){this.directives.forEach(e=>{let n=e.control,a=this.form.get(e.path);n!==a&&(ur(n||null,e),Vs(a)&&e._setupWithForm(a,this.callSetDisabledState))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(e){let n=this.form.get(e.path);Fr(n,e),n.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(e){let n=this.form?.get(e.path);n&&Is(n,e)&&n.updateValueAndValidity({emitEvent:!1})}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{})}_updateValidators(){Rr(this.form,this),this._oldForm&&On(this._oldForm,this)}static ɵfac=function(n){return new(n||i)(Tn$1(Ft,10),Tn$1(gr,10),Tn$1(Ar,8))};static ɵdir=yr$1({type:i,features:[Xg,wo$1]})}return i})();var zs={provide:mt,useExisting:ki$1(()=>Pt)};var Pt=(()=>{class i extends Ls{form=null;ngSubmit=new Ne;get control(){return this.form}static ɵfac=(()=>{let e;return function(a){return(e||(e=bo$1(i)))(a||i)}})();static ɵdir=yr$1({type:i,selectors:[[``,`formGroup`,``]],hostBindings:function(n,a){n&1&&dm(`submit`,function(o){return a.onSubmit(o)})(`reset`,function(){return a.onReset()})},inputs:{form:[0,`formGroup`,`form`]},outputs:{ngSubmit:`ngSubmit`},exportAs:[`ngForm`],standalone:!1,features:[Nm([zs]),Xg]})}return i})();var Pr=(()=>{class i{labelPosition=`after`;static ɵfac=function(n){return new(n||i)};static ɵcmp=(function(){return Sn$1({type:i,selectors:[[``,`mat-internal-form-field`,``]],hostAttrs:[1,`mdc-form-field`,`mat-internal-form-field`],hostVars:2,hostBindings:function(a,r){a&2&&$s$1(`mdc-form-field--align-end`,r.labelPosition===`before`)},inputs:{labelPosition:`labelPosition`},ngContentSelectors:[`*`],decls:1,vars:0,template:function(a,r){a&1&&(Ul$1(),Hl$1(0))},styles:[`.mat-internal-form-field {
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
`],encapsulation:2})})()}return i})();var Bs=new m(`MATERIAL_ANIMATIONS`);var Vr=null;function Ri(){return g(Bs,{optional:!0})?.animationsDisabled||g(qD,{optional:!0})===`NoopAnimations`?`di-disabled`:(Vr??=g(ki).matchMedia(`(prefers-reduced-motion)`).matches,Vr?`reduced-motion`:`enabled`)}function Ce(){return Ri()!==`enabled`}var ft=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵcmp=Sn$1({type:i,selectors:[[`structural-styles`]],decls:0,vars:0,template:function(n,a){},styles:[`.mat-focus-indicator {
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
`],encapsulation:2})}return i})();var Qe;function Lr(){if(Qe==null){if(typeof document!=`object`||!document||typeof Element!=`function`||!Element)return Qe=!1,Qe;if(document.documentElement?.style&&`scrollBehavior`in document.documentElement.style)Qe=!0;else{let i=Element.prototype.scrollTo;i?Qe=!/\{\s*\[native code\]\s*\}/.test(i.toString()):Qe=!1}}return Qe}function Fi(){return typeof __karma__<`u`&&!!__karma__||typeof jasmine<`u`&&!!jasmine||typeof jest<`u`&&!!jest||typeof Mocha<`u`&&!!Mocha}var ht;var zr=[`color`,`button`,`checkbox`,`date`,`datetime-local`,`email`,`file`,`hidden`,`image`,`month`,`number`,`password`,`radio`,`range`,`reset`,`search`,`submit`,`tel`,`text`,`time`,`url`,`week`];function Ti(){if(ht)return ht;if(typeof document!=`object`||!document)return ht=new Set(zr),ht;let i=document.createElement(`input`);return ht=new Set(zr.filter(t=>(i.setAttribute(`type`,t),i.type===t))),ht}function ie(i){return i==null?``:typeof i==`string`?i:`${i}px`}function bt(i){return i!=null&&`${i}`!=`false`}var Fe=(function(i){return i[i.FADING_IN=0]=`FADING_IN`,i[i.VISIBLE=1]=`VISIBLE`,i[i.FADING_OUT=2]=`FADING_OUT`,i[i.HIDDEN=3]=`HIDDEN`,i})(Fe||{});var Pi=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=Fe.HIDDEN;constructor(t,e,n,a=!1){this._renderer=t,this.element=e,this.config=n,this._animationForciblyDisabledThroughCss=a}fadeOut(){this._renderer.fadeOutRipple(this)}};var jr=lt({passive:!0,capture:!0});var Vi=class{_events=new Map;addHandler(t,e,n,a){let r=this._events.get(e);if(r){let o=r.get(n);o?o.add(a):r.set(n,new Set([a]))}else this._events.set(e,new Map([[n,new Set([a])]])),t.runOutsideAngular(()=>{document.addEventListener(e,this._delegateEventHandler,jr)})}removeHandler(t,e,n){let a=this._events.get(t);if(!a)return;let r=a.get(e);r&&(r.delete(n),r.size===0&&a.delete(e),a.size===0&&(this._events.delete(t),document.removeEventListener(t,this._delegateEventHandler,jr)))}_delegateEventHandler=t=>{let e=ue(t);e&&this._events.get(t.type)?.forEach((n,a)=>{(a===e||a.contains(e))&&n.forEach(r=>r.handleEvent(t))})}};var Vt={enterDuration:225,exitDuration:150};var js=800;var Hr=lt({passive:!0,capture:!0});var Gr=[`mousedown`,`touchstart`];var Ur=[`mouseup`,`mouseleave`,`touchend`,`touchcancel`];var Hs=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵcmp=Sn$1({type:i,selectors:[[`ng-component`]],hostAttrs:[`mat-ripple-style-loader`,``],decls:0,vars:0,template:function(n,a){},styles:[`.mat-ripple {
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
`],encapsulation:2})}return i})();var Lt=class i{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new Vi;constructor(t,e,n,a,r){this._target=t,this._ngZone=e,this._platform=a,a.isBrowser&&(this._containerElement=Oe(n)),r&&r.get(z_).load(Hs)}fadeInRipple(t,e,n={}){let a=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),r=y(y({},Vt),n.animation);n.centered&&(t=a.left+a.width/2,e=a.top+a.height/2);let o=n.radius||Gs(t,e,a),m=t-a.left,f=e-a.top,v=r.enterDuration,u=document.createElement(`div`);u.classList.add(`mat-ripple-element`),u.style.left=`${m-o}px`,u.style.top=`${f-o}px`,u.style.height=`${o*2}px`,u.style.width=`${o*2}px`,n.color!=null&&(u.style.backgroundColor=n.color),u.style.transitionDuration=`${v}ms`,this._containerElement.appendChild(u);let _=window.getComputedStyle(u),O=_.transitionProperty,h=_.transitionDuration,S=O===`none`||h===`0s`||h===`0s, 0s`||a.width===0&&a.height===0,V=new Pi(this,u,n,S);u.style.transform=`scale3d(1, 1, 1)`,V.state=Fe.FADING_IN,n.persistent||(this._mostRecentTransientRipple=V);let Te=null;return!S&&(v||r.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let Yt=()=>{Te&&(Te.fallbackTimer=null),clearTimeout(Zt),this._finishRippleTransition(V)},xt=()=>this._destroyRipple(V),Zt=setTimeout(xt,v+100);u.addEventListener(`transitionend`,Yt),u.addEventListener(`transitioncancel`,xt),Te={onTransitionEnd:Yt,onTransitionCancel:xt,fallbackTimer:Zt}}),this._activeRipples.set(V,Te),(S||!v)&&this._finishRippleTransition(V),V}fadeOutRipple(t){if(t.state===Fe.FADING_OUT||t.state===Fe.HIDDEN)return;let e=t.element,n=y(y({},Vt),t.config.animation);e.style.transitionDuration=`${n.exitDuration}ms`,e.style.opacity=`0`,t.state=Fe.FADING_OUT,(t._animationForciblyDisabledThroughCss||!n.exitDuration)&&this._finishRippleTransition(t)}fadeOutAll(){this._getActiveRipples().forEach(t=>t.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(t=>{t.config.persistent||t.fadeOut()})}setupTriggerEvents(t){let e=Oe(t);!this._platform.isBrowser||!e||e===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=e,Gr.forEach(n=>{i._eventManager.addHandler(this._ngZone,n,e,this)}))}handleEvent(t){t.type===`mousedown`?this._onMousedown(t):t.type===`touchstart`?this._onTouchStart(t):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{Ur.forEach(e=>{this._triggerElement.addEventListener(e,this,Hr)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(t){t.state===Fe.FADING_IN?this._startFadeOutTransition(t):t.state===Fe.FADING_OUT&&this._destroyRipple(t)}_startFadeOutTransition(t){let e=t===this._mostRecentTransientRipple,{persistent:n}=t.config;t.state=Fe.VISIBLE,!n&&(!e||!this._isPointerDown)&&t.fadeOut()}_destroyRipple(t){let e=this._activeRipples.get(t)??null;this._activeRipples.delete(t),this._activeRipples.size||(this._containerRect=null),t===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),t.state=Fe.HIDDEN,e!==null&&(t.element.removeEventListener(`transitionend`,e.onTransitionEnd),t.element.removeEventListener(`transitioncancel`,e.onTransitionCancel),e.fallbackTimer!==null&&clearTimeout(e.fallbackTimer)),t.element.remove()}_onMousedown(t){let e=St(t),n=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+js;!this._target.rippleDisabled&&!e&&!n&&(this._isPointerDown=!0,this.fadeInRipple(t.clientX,t.clientY,this._target.rippleConfig))}_onTouchStart(t){if(!this._target.rippleDisabled&&!wt(t)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let e=t.changedTouches;if(e)for(let n=0;n<e.length;n++)this.fadeInRipple(e[n].clientX,e[n].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(t=>{let e=t.state===Fe.VISIBLE||t.config.terminateOnPointerUp&&t.state===Fe.FADING_IN;!t.config.persistent&&e&&t.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let t=this._triggerElement;t&&(Gr.forEach(e=>i._eventManager.removeHandler(e,t,this)),this._pointerUpEventsRegistered&&(Ur.forEach(e=>t.removeEventListener(e,this,Hr)),this._pointerUpEventsRegistered=!1))}};function Gs(i,t,e){let n=Math.max(Math.abs(i-e.left),Math.abs(i-e.right)),a=Math.max(Math.abs(t-e.top),Math.abs(t-e.bottom));return Math.sqrt(n*n+a*a)}var Li=new m(`mat-ripple-global-options`);var Rn=(()=>{class i{_elementRef=g(Ye$1);_animationsDisabled=Ce();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(e){e&&this.fadeOutAllNonPersistent(),this._disabled=e,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(e){this._trigger=e,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let e=g(ee),n=g(ne),a=g(Li,{optional:!0}),r=g(G);this._globalOptions=a||{},this._rippleRenderer=new Lt(this,e,this._elementRef,n,r)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:y(y(y({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(e,n=0,a){return typeof e==`number`?this._rippleRenderer.fadeInRipple(e,n,y(y({},this.rippleConfig),a)):this._rippleRenderer.fadeInRipple(0,0,y(y({},this.rippleConfig),e))}static ɵfac=function(n){return new(n||i)};static ɵdir=yr$1({type:i,selectors:[[``,`mat-ripple`,``],[``,`matRipple`,``]],hostAttrs:[1,`mat-ripple`],hostVars:2,hostBindings:function(n,a){n&2&&$s$1(`mat-ripple-unbounded`,a.unbounded)},inputs:{color:[0,`matRippleColor`,`color`],unbounded:[0,`matRippleUnbounded`,`unbounded`],centered:[0,`matRippleCentered`,`centered`],radius:[0,`matRippleRadius`,`radius`],animation:[0,`matRippleAnimation`,`animation`],disabled:[0,`matRippleDisabled`,`disabled`],trigger:[0,`matRippleTrigger`,`trigger`]},exportAs:[`matRipple`]})}return i})();var zi={color:`accent`,clickAction:`check-indeterminate`,disabledInteractive:!1};var Us=new m(`mat-checkbox-default-options`,{providedIn:`root`,factory:()=>zi});var he=(function(i){return i[i.Init=0]=`Init`,i[i.Checked=1]=`Checked`,i[i.Unchecked=2]=`Unchecked`,i[i.Indeterminate=3]=`Indeterminate`,i})(he||{});var Bi=class{source;checked};var ji=(()=>{class i{_elementRef=g(Ye$1);_changeDetectorRef=g(Ys$1);_ngZone=g(ee);_animationsDisabled=Ce();_options=g(Us,{optional:!0});focus(){this._inputElement.nativeElement.focus()}_createChangeEvent(e){let n=new Bi;return n.source=this,n.checked=e,n}_getAnimationTargetElement(){return this._inputElement?.nativeElement}_animationClasses={uncheckedToChecked:`mdc-checkbox--anim-unchecked-checked`,uncheckedToIndeterminate:`mdc-checkbox--anim-unchecked-indeterminate`,checkedToUnchecked:`mdc-checkbox--anim-checked-unchecked`,checkedToIndeterminate:`mdc-checkbox--anim-checked-indeterminate`,indeterminateToChecked:`mdc-checkbox--anim-indeterminate-checked`,indeterminateToUnchecked:`mdc-checkbox--anim-indeterminate-unchecked`};ariaLabel=``;ariaLabelledby=null;ariaDescribedby;ariaExpanded;ariaControls;ariaOwns;_uniqueId;id;get inputId(){return`${this.id||this._uniqueId}-input`}required=!1;labelPosition=`after`;name=null;change=new Ne;indeterminateChange=new Ne;value;disableRipple=!1;_inputElement;tabIndex;color;disabledInteractive;_onTouched=()=>{};_currentAnimationClass=``;_currentCheckState=he.Init;_controlValueAccessorChangeFn=()=>{};_validatorChangeFn=()=>{};constructor(){g(z_).load(ft);let e=g(new qs(`tabindex`),{optional:!0});this._options=this._options||zi,this.color=this._options.color||zi.color,this.tabIndex=e==null?0:parseInt(e)||0,this.id=this._uniqueId=g(fe).getId(`mat-mdc-checkbox-`),this.disabledInteractive=this._options?.disabledInteractive??!1}ngOnChanges(e){e.required&&this._validatorChangeFn()}ngAfterViewInit(){this._syncIndeterminate(this.indeterminate)}get checked(){return this._checked}set checked(e){e!=this.checked&&(this._checked=e,this._changeDetectorRef.markForCheck())}_checked=!1;get disabled(){return this._disabled}set disabled(e){e!==this.disabled&&(this._disabled=e,this._changeDetectorRef.markForCheck())}_disabled=!1;get indeterminate(){return this._indeterminate()}set indeterminate(e){let n=e!=this._indeterminate();this._indeterminate.set(e),n&&(e?this._transitionCheckState(he.Indeterminate):this._transitionCheckState(this.checked?he.Checked:he.Unchecked),this.indeterminateChange.emit(e)),this._syncIndeterminate(e)}_indeterminate=Le(!1);_isRippleDisabled(){return this.disableRipple||this.disabled}_onLabelTextChange(){this._changeDetectorRef.detectChanges()}writeValue(e){this.checked=!!e}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}validate(e){return this.required&&e.value!==!0?{required:!0}:null}registerOnValidatorChange(e){this._validatorChangeFn=e}_transitionCheckState(e){let n=this._currentCheckState,a=this._getAnimationTargetElement();if(!(n===e||!a)&&(this._currentAnimationClass&&a.classList.remove(this._currentAnimationClass),this._currentAnimationClass=this._getAnimationClassForCheckStateTransition(n,e),this._currentCheckState=e,this._currentAnimationClass.length>0)){a.classList.add(this._currentAnimationClass);let r=this._currentAnimationClass;this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{a.classList.remove(r)},1e3)})}}_emitChangeEvent(){this._controlValueAccessorChangeFn(this.checked),this.change.emit(this._createChangeEvent(this.checked)),this._inputElement&&(this._inputElement.nativeElement.checked=this.checked)}toggle(){this.checked=!this.checked,this._controlValueAccessorChangeFn(this.checked)}_handleInputClick(){let e=this._options?.clickAction;!this.disabled&&e!==`noop`?(this.indeterminate&&e!==`check`&&Promise.resolve().then(()=>{this._indeterminate.set(!1),this.indeterminateChange.emit(!1)}),this._checked=!this._checked,this._transitionCheckState(this._checked?he.Checked:he.Unchecked),this._emitChangeEvent()):(this.disabled&&this.disabledInteractive||!this.disabled&&e===`noop`)&&(this._inputElement.nativeElement.checked=this.checked,this._inputElement.nativeElement.indeterminate=this.indeterminate)}_onInteractionEvent(e){e.stopPropagation()}_onBlur(){Promise.resolve().then(()=>{this._onTouched(),this._changeDetectorRef.markForCheck()})}_getAnimationClassForCheckStateTransition(e,n){if(this._animationsDisabled)return``;switch(e){case he.Init:if(n===he.Checked)return this._animationClasses.uncheckedToChecked;if(n==he.Indeterminate)return this._checked?this._animationClasses.checkedToIndeterminate:this._animationClasses.uncheckedToIndeterminate;break;case he.Unchecked:return n===he.Checked?this._animationClasses.uncheckedToChecked:this._animationClasses.uncheckedToIndeterminate;case he.Checked:return n===he.Unchecked?this._animationClasses.checkedToUnchecked:this._animationClasses.checkedToIndeterminate;case he.Indeterminate:return n===he.Checked?this._animationClasses.indeterminateToChecked:this._animationClasses.indeterminateToUnchecked}return``}_syncIndeterminate(e){let n=this._inputElement;n&&(n.nativeElement.indeterminate=e)}_onInputClick(){this._handleInputClick()}_preventBubblingFromLabel(e){e.target&&this._inputElement&&e.target!==this._inputElement.nativeElement&&e.stopPropagation()}static ɵfac=function(n){return new(n||i)};static ɵcmp=(function(){let e=[`input`];return Sn$1({type:i,selectors:[[`mat-checkbox`]],viewQuery:function(r,o){if(r&1&&pm(e,5),r&2){let m;nC(m=rC())&&(o._inputElement=m.first)}},hostAttrs:[1,`mat-mdc-checkbox`],hostVars:16,hostBindings:function(r,o){r&2&&(Hs$1(`id`,o.id),No$1(`tabindex`,null)(`aria-label`,null)(`aria-labelledby`,null),$l$1(o.color?`mat-`+o.color:`mat-accent`),$s$1(`_mat-animation-noopable`,o._animationsDisabled)(`mdc-checkbox--disabled`,o.disabled)(`mat-mdc-checkbox-disabled`,o.disabled)(`mat-mdc-checkbox-checked`,o.checked)(`mat-mdc-checkbox-disabled-interactive`,o.disabledInteractive))},inputs:{ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],ariaDescribedby:[0,`aria-describedby`,`ariaDescribedby`],ariaExpanded:[2,`aria-expanded`,`ariaExpanded`,jm],ariaControls:[0,`aria-controls`,`ariaControls`],ariaOwns:[0,`aria-owns`,`ariaOwns`],id:`id`,required:[2,`required`,`required`,jm],labelPosition:`labelPosition`,name:`name`,value:`value`,disableRipple:[2,`disableRipple`,`disableRipple`,jm],tabIndex:[2,`tabIndex`,`tabIndex`,a=>a==null?void 0:nH(a)],color:`color`,disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,jm],checked:[2,`checked`,`checked`,jm],disabled:[2,`disabled`,`disabled`,jm],indeterminate:[2,`indeterminate`,`indeterminate`,jm]},outputs:{change:`change`,indeterminateChange:`indeterminateChange`},exportAs:[`matCheckbox`],features:[Nm([{provide:Ei,useExisting:ki$1(()=>i),multi:!0},{provide:Ft,useExisting:i,multi:!0}]),wo$1],ngContentSelectors:[`*`],decls:15,vars:23,consts:[[`checkbox`,``],[`input`,``],[`label`,``],[`mat-internal-form-field`,``,3,`click`,`labelPosition`,`for`],[1,`mdc-checkbox`],[`aria-hidden`,`true`,1,`mat-mdc-checkbox-touch-target`],[`type`,`checkbox`,1,`mdc-checkbox__native-control`,3,`blur`,`click`,`change`,`checked`,`indeterminate`,`disabled`,`id`,`required`,`tabIndex`],[`aria-hidden`,`true`,1,`mdc-checkbox__ripple`],[`aria-hidden`,`true`,1,`mdc-checkbox__background`],[`focusable`,`false`,`viewBox`,`0 0 24 24`,1,`mdc-checkbox__checkmark`],[`fill`,`none`,`d`,`M1.73,12.91 8.1,19.28 22.79,4.59`,1,`mdc-checkbox__checkmark-path`],[1,`mdc-checkbox__mixedmark`],[`mat-ripple`,``,`aria-hidden`,`true`,1,`mat-mdc-checkbox-ripple`,`mat-focus-indicator`,3,`matRippleTrigger`,`matRippleDisabled`,`matRippleCentered`],[1,`mat-internal-form-field-label`,`mdc-label`]],template:function(r,o){if(r&1&&(Ul$1(),_s$1(0,`label`,3),dm(`click`,function(f){return o._preventBubblingFromLabel(f)}),_s$1(1,`span`,4,0),sm(3,`span`,5),_s$1(4,`input`,6,1),dm(`blur`,function(){return o._onBlur()})(`click`,function(){return o._onInputClick()})(`change`,function(f){return o._onInteractionEvent(f)}),jl$1(),sm(6,`span`,7),_s$1(7,`span`,8),Ip(),_s$1(8,`svg`,9),sm(9,`path`,10),jl$1(),wp(),sm(10,`span`,11),jl$1(),sm(11,`span`,12),jl$1(),_s$1(12,`span`,13,2),Hl$1(14),jl$1()()),r&2){let m=iC(2);im(`labelPosition`,o.labelPosition)(`for`,o.inputId),ew(4),$s$1(`mdc-checkbox--selected`,o.checked),im(`checked`,o.checked)(`indeterminate`,o.indeterminate)(`disabled`,o.disabled&&!o.disabledInteractive)(`id`,o.inputId)(`required`,o.required)(`tabIndex`,o.disabled&&!o.disabledInteractive?-1:o.tabIndex),No$1(`aria-label`,o.ariaLabel||null)(`aria-labelledby`,o.ariaLabelledby)(`aria-describedby`,o.ariaDescribedby)(`aria-checked`,o.indeterminate?`mixed`:null)(`aria-controls`,o.ariaControls)(`aria-disabled`,o.disabled&&o.disabledInteractive?!0:null)(`aria-expanded`,o.ariaExpanded)(`aria-owns`,o.ariaOwns)(`name`,o.name)(`value`,o.value),ew(7),im(`matRippleTrigger`,m)(`matRippleDisabled`,o.disableRipple||o.disabled)(`matRippleCentered`,!0)}},dependencies:[Rn,Pr],styles:[`.mdc-checkbox {
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
`],encapsulation:2})})()}return i})();var Wr=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵmod=Ze$1({type:i});static ɵinj=Ae({imports:[ji,av]})}return i})();var $s=new m(`MAT_PROGRESS_BAR_DEFAULT_OPTIONS`);var qr=(()=>{class i{_elementRef=g(Ye$1);_ngZone=g(ee);_changeDetectorRef=g(Ys$1);_renderer=g(dr$1);_cleanupTransitionEnd;constructor(){let e=Ri(),n=g($s,{optional:!0});this._isNoopAnimation=e===`di-disabled`,e===`reduced-motion`&&this._elementRef.nativeElement.classList.add(`mat-progress-bar-reduced-motion`),n&&(n.color&&(this.color=this._defaultColor=n.color),this.mode=n.mode||this.mode)}_isNoopAnimation;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;_defaultColor=`primary`;get value(){return this._value}set value(e){this._value=$r(e||0),this._changeDetectorRef.markForCheck()}_value=0;get bufferValue(){return this._bufferValue||0}set bufferValue(e){this._bufferValue=$r(e||0),this._changeDetectorRef.markForCheck()}_bufferValue=0;animationEnd=new Ne;get mode(){return this._mode}set mode(e){this._mode=e,this._changeDetectorRef.markForCheck()}_mode=`determinate`;ngAfterViewInit(){this._ngZone.runOutsideAngular(()=>{this._cleanupTransitionEnd=this._renderer.listen(this._elementRef.nativeElement,`transitionend`,this._transitionendHandler)})}ngOnDestroy(){this._cleanupTransitionEnd?.()}_getPrimaryBarTransform(){return`scaleX(${this._isIndeterminate()?1:this.value/100})`}_getBufferBarFlexBasis(){return`${this.mode===`buffer`?this.bufferValue:100}%`}_isIndeterminate(){return this.mode===`indeterminate`||this.mode===`query`}_transitionendHandler=e=>{this.animationEnd.observers.length===0||!e.target||!e.target.classList.contains(`mdc-linear-progress__primary-bar`)||(this.mode===`determinate`||this.mode===`buffer`)&&this._ngZone.run(()=>this.animationEnd.next({value:this.value}))};static ɵfac=function(n){return new(n||i)};static ɵcmp=(function(){function e(n,a){n&1&&Us$1(0,`div`,2)}return Sn$1({type:i,selectors:[[`mat-progress-bar`]],hostAttrs:[`role`,`progressbar`,`aria-valuemin`,`0`,`aria-valuemax`,`100`,`tabindex`,`-1`,1,`mat-mdc-progress-bar`,`mdc-linear-progress`],hostVars:10,hostBindings:function(a,r){a&2&&(No$1(`aria-valuenow`,r._isIndeterminate()?null:r.value)(`mode`,r.mode),$l$1(`mat-`+r.color),$s$1(`_mat-animation-noopable`,r._isNoopAnimation)(`mdc-linear-progress--animation-ready`,!r._isNoopAnimation)(`mdc-linear-progress--indeterminate`,r._isIndeterminate()))},inputs:{color:`color`,value:[2,`value`,`value`,nH],bufferValue:[2,`bufferValue`,`bufferValue`,nH],mode:`mode`},outputs:{animationEnd:`animationEnd`},exportAs:[`matProgressBar`],decls:7,vars:5,consts:[[`aria-hidden`,`true`,1,`mdc-linear-progress__buffer`],[1,`mdc-linear-progress__buffer-bar`],[1,`mdc-linear-progress__buffer-dots`],[`aria-hidden`,`true`,1,`mdc-linear-progress__bar`,`mdc-linear-progress__primary-bar`],[1,`mdc-linear-progress__bar-inner`],[`aria-hidden`,`true`,1,`mdc-linear-progress__bar`,`mdc-linear-progress__secondary-bar`]],template:function(a,r){a&1&&(Vl$1(0,`div`,0),Us$1(1,`div`,1),jb(2,e,1,0,`div`,2),Bl$1(),Vl$1(3,`div`,3),Us$1(4,`span`,4),Bl$1(),Vl$1(5,`div`,5),Us$1(6,`span`,4),Bl$1()),a&2&&(ew(),vm(`flex-basis`,r._getBufferBarFlexBasis()),ew(),Bb(r.mode===`buffer`?2:-1),ew(),vm(`transform`,r._getPrimaryBarTransform()))},styles:[`.mat-mdc-progress-bar {
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
`],encapsulation:2})})()}return i})();function $r(i,t=0,e=100){return Math.max(t,Math.min(e,i))}var Xr=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵmod=Ze$1({type:i});static ɵinj=Ae({imports:[av]})}return i})();var Xs={capture:!0};var Ks=[`focus`,`mousedown`,`mouseenter`,`touchstart`];var Hi=`mat-ripple-loader-uninitialized`;var Gi=`mat-ripple-loader-class-name`;var Kr=`mat-ripple-loader-centered`;var Fn=`mat-ripple-loader-disabled`;var Yr=(()=>{class i{_document=g(B);_animationsDisabled=Ce();_globalRippleOptions=g(Li,{optional:!0});_platform=g(ne);_ngZone=g(ee);_injector=g(G);_eventCleanups;_hosts=new Map;constructor(){let e=g(In$1).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>Ks.map(n=>e.listen(this._document,n,this._onInteraction,Xs)))}ngOnDestroy(){let e=this._hosts.keys();for(let n of e)this.destroyRipple(n);this._eventCleanups.forEach(n=>n())}configureRipple(e,n){e.setAttribute(Hi,this._globalRippleOptions?.namespace??``),(n.className||!e.hasAttribute(Gi))&&e.setAttribute(Gi,n.className||``),n.centered&&e.setAttribute(Kr,``),n.disabled&&e.setAttribute(Fn,``)}setDisabled(e,n){let a=this._hosts.get(e);a?(a.target.rippleDisabled=n,!n&&!a.hasSetUpEvents&&(a.hasSetUpEvents=!0,a.renderer.setupTriggerEvents(e))):n?e.setAttribute(Fn,``):e.removeAttribute(Fn)}_onInteraction=e=>{let n=ue(e);if(n instanceof HTMLElement){let a=n.closest(`[${Hi}="${this._globalRippleOptions?.namespace??``}"]`);a&&this._createRipple(a)}};_createRipple(e){if(!this._document||this._hosts.has(e))return;e.querySelector(`.mat-ripple`)?.remove();let n=this._document.createElement(`span`);n.classList.add(`mat-ripple`,e.getAttribute(Gi)),e.append(n);let a=this._globalRippleOptions,r=this._animationsDisabled?0:a?.animation?.enterDuration??Vt.enterDuration,o=this._animationsDisabled?0:a?.animation?.exitDuration??Vt.exitDuration,m={rippleDisabled:this._animationsDisabled||a?.disabled||e.hasAttribute(Fn),rippleConfig:{centered:e.hasAttribute(Kr),terminateOnPointerUp:a?.terminateOnPointerUp,animation:{enterDuration:r,exitDuration:o}}},f=new Lt(m,this._ngZone,n,this._platform,this._injector),v=!m.rippleDisabled;v&&f.setupTriggerEvents(e),this._hosts.set(e,{target:m,renderer:f,hasSetUpEvents:v}),e.removeAttribute(Hi)}destroyRipple(e){let n=this._hosts.get(e);n&&(n.renderer._removeTriggerEvents(),this._hosts.delete(e))}static ɵfac=function(n){return new(n||i)};static ɵprov=pe({token:i,factory:i.ɵfac})}return i})();var Ys=new m(`MAT_BUTTON_CONFIG`);function Zr(i){return i==null?void 0:nH(i)}var Qr=(()=>{class i{_elementRef=g(Ye$1);_ngZone=g(ee);_animationsDisabled=Ce();_config=g(Ys,{optional:!0});_focusMonitor=g(yi);_cleanupClick;_renderer=g(dr$1);_rippleLoader=g(Yr);_isAnchor;_isFab=!1;color;get disableRipple(){return this._disableRipple}set disableRipple(e){this._disableRipple=e,this._updateRippleDisabled()}_disableRipple=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._updateRippleDisabled()}_disabled=!1;ariaDisabled;disabledInteractive;tabIndex;set _tabindex(e){this.tabIndex=e}showProgress=JU(!1,{transform:jm});constructor(){g(z_).load(ft);let e=this._elementRef.nativeElement;this._isAnchor=e.tagName===`A`,this.disabledInteractive=this._config?.disabledInteractive??!1,this.color=this._config?.color??null,this._rippleLoader?.configureRipple(e,{className:`mat-mdc-button-ripple`})}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0),this._isAnchor&&this._setupAsAnchor()}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement)}focus(e=`program`,n){e?this._focusMonitor.focusVia(this._elementRef.nativeElement,e,n):this._elementRef.nativeElement.focus(n)}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this._isAnchor?this.disabled||null:this.disabled&&this.disabledInteractive?!0:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:!0}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled)}_getTabIndex(){return this._isAnchor?this.disabled&&!this.disabledInteractive?-1:this.tabIndex:this.tabIndex}_setupAsAnchor(){this._cleanupClick=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,`click`,e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}))}static ɵfac=function(n){return new(n||i)};static ɵdir=yr$1({type:i,hostAttrs:[1,`mat-mdc-button-base`],hostVars:15,hostBindings:function(n,a){n&2&&(No$1(`disabled`,a._getDisabledAttribute())(`aria-disabled`,a._getAriaDisabled())(`tabindex`,a._getTabIndex()),$l$1(a.color?`mat-`+a.color:``),$s$1(`mat-mdc-button-progress-indicator-shown`,a.showProgress())(`mat-mdc-button-disabled`,a.disabled)(`mat-mdc-button-disabled-interactive`,a.disabledInteractive)(`mat-unthemed`,!a.color)(`_mat-animation-noopable`,a._animationsDisabled))},inputs:{color:`color`,disableRipple:[2,`disableRipple`,`disableRipple`,jm],disabled:[2,`disabled`,`disabled`,jm],ariaDisabled:[2,`aria-disabled`,`ariaDisabled`,jm],disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,jm],tabIndex:[2,`tabIndex`,`tabIndex`,Zr],_tabindex:[2,`tabindex`,`_tabindex`,Zr],showProgress:[1,`showProgress`]}})}return i})();var Tn=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵmod=Ze$1({type:i});static ɵinj=Ae({imports:[av]})}return i})();var Jr=new Map([[`text`,[`mat-mdc-button`]],[`filled`,[`mdc-button--unelevated`,`mat-mdc-unelevated-button`]],[`elevated`,[`mdc-button--raised`,`mat-mdc-raised-button`]],[`outlined`,[`mdc-button--outlined`,`mat-mdc-outlined-button`]],[`tonal`,[`mat-tonal-button`]]]);var eo=(()=>{class i extends Qr{get appearance(){return this._appearance}set appearance(e){this.setAppearance(e||this._config?.defaultAppearance||`text`)}_appearance=null;constructor(){super();let e=Zs(this._elementRef.nativeElement);e&&this.setAppearance(e)}setAppearance(e){if(e===this._appearance)return;let n=this._elementRef.nativeElement.classList,a=this._appearance?Jr.get(this._appearance):null,r=Jr.get(e);a&&n.remove(...a),n.add(...r),this._appearance=e}static ɵfac=function(n){return new(n||i)};static ɵcmp=(function(){let e=[[[``,8,`material-icons`,3,`iconPositionEnd`,``],[`mat-icon`,3,`iconPositionEnd`,``],[``,`matButtonIcon`,``,3,`iconPositionEnd`,``],[``,8,`material-symbols-outlined`,3,`iconPositionEnd`,``],[``,8,`material-symbols-rounded`,3,`iconPositionEnd`,``],[``,8,`material-symbols-sharp`,3,`iconPositionEnd`,``]],`*`,[[``,`iconPositionEnd`,``,8,`material-icons`],[`mat-icon`,`iconPositionEnd`,``],[``,`matButtonIcon`,``,`iconPositionEnd`,``],[``,`iconPositionEnd`,``,8,`material-symbols-outlined`],[``,`iconPositionEnd`,``,8,`material-symbols-rounded`],[``,`iconPositionEnd`,``,8,`material-symbols-sharp`]],[[``,`progressIndicator`,``]]],n=[`.material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd]), .material-symbols-outlined:not([iconPositionEnd]), .material-symbols-rounded:not([iconPositionEnd]), .material-symbols-sharp:not([iconPositionEnd])`,`*`,`.material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd], .material-symbols-outlined[iconPositionEnd], .material-symbols-rounded[iconPositionEnd], .material-symbols-sharp[iconPositionEnd]`,`[progressIndicator]`];function a(r,o){r&1&&(Vl$1(0,`div`,2),Hl$1(1,3),Bl$1())}return Sn$1({type:i,selectors:[[`button`,`matButton`,``],[`a`,`matButton`,``],[`button`,`mat-button`,``],[`button`,`mat-raised-button`,``],[`button`,`mat-flat-button`,``],[`button`,`mat-stroked-button`,``],[`a`,`mat-button`,``],[`a`,`mat-raised-button`,``],[`a`,`mat-flat-button`,``],[`a`,`mat-stroked-button`,``]],hostAttrs:[1,`mdc-button`],inputs:{appearance:[0,`matButton`,`appearance`]},exportAs:[`matButton`,`matAnchor`],features:[Xg],ngContentSelectors:n,decls:8,vars:5,consts:[[1,`mat-mdc-button-persistent-ripple`],[1,`mdc-button__label`],[1,`mat-mdc-button-progress-indicator-container`],[1,`mat-focus-indicator`],[1,`mat-mdc-button-touch-target`]],template:function(o,m){o&1&&(Ul$1(e),Us$1(0,`span`,0),Hl$1(1),Vl$1(2,`span`,1),Hl$1(3,1),Bl$1(),Hl$1(4,2),jb(5,a,2,0,`div`,2),Us$1(6,`span`,3)(7,`span`,4)),o&2&&($s$1(`mdc-button__ripple`,!m._isFab)(`mdc-fab__ripple`,m._isFab),ew(5),Bb(m.showProgress()?5:-1))},styles:[`.mat-mdc-button-base {
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
`],encapsulation:2})})()}return i})();function Zs(i){return i.hasAttribute(`mat-raised-button`)?`elevated`:i.hasAttribute(`mat-stroked-button`)?`outlined`:i.hasAttribute(`mat-flat-button`)?`filled`:i.hasAttribute(`mat-button`)?`text`:null}var to=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵmod=Ze$1({type:i});static ɵinj=Ae({imports:[Tn,av]})}return i})();var gt=class i{name=JU.required();static ɵfac=function(e){return new(e||i)};static ɵcmp=Sn$1({type:i,selectors:[[`bhw-icon`]],hostAttrs:[`aria-hidden`,`true`],inputs:{name:[1,`name`]},decls:1,vars:1,consts:[[3,`svgIcon`]],template:function(e,n){e&1&&sm(0,`mat-icon`,0),e&2&&im(`svgIcon`,n.name())},dependencies:[IG,EG],styles:[`[_nghost-%COMP%]{display:inline-flex;flex-shrink:0;width:1.5rem;height:1.5rem;vertical-align:middle}mat-icon[_ngcontent-%COMP%]{width:100%;height:100%}`]})};function Js(i,t){i&1&&sm(0,`bhw-icon`,4),i&2&&im(`name`,t)}function el(i,t){if(i&1){let e=Kb();_s$1(0,`button`,2),dm(`click`,function(){ap(e);let a=Xb();return cp(a.clicked.emit())}),_s$1(1,`span`,3),jb(2,Js,1,1,`bhw-icon`,4),SC(3),jl$1()()}if(i&2){let e,n=Xb();im(`disabled`,n.disabled()),ew(2),Bb((e=n.icon())?2:-1,e),ew(),zl$1(` `,n.label())}}function tl(i,t){i&1&&sm(0,`bhw-icon`,4),i&2&&im(`name`,t)}function nl(i,t){if(i&1){let e=Kb();_s$1(0,`button`,5),dm(`click`,function(){ap(e);let a=Xb();return cp(a.clicked.emit())}),_s$1(1,`span`,3),jb(2,tl,1,1,`bhw-icon`,4),SC(3),jl$1()()}if(i&2){let e,n=Xb();im(`disabled`,n.disabled()),ew(2),Bb((e=n.icon())?2:-1,e),ew(),zl$1(` `,n.label())}}var Pn=class i{label=JU.required();disabled=JU(!1);icon=JU(null);appearance=JU(`filled`);block=JU(!1);compact=JU(!1);clicked=QU();static ɵfac=function(e){return new(e||i)};static ɵcmp=Sn$1({type:i,selectors:[[`bhw-button`]],hostVars:4,hostBindings:function(e,n){e&2&&$s$1(`block`,n.block())(`compact`,n.compact())},inputs:{label:[1,`label`],disabled:[1,`disabled`],icon:[1,`icon`],appearance:[1,`appearance`],block:[1,`block`],compact:[1,`compact`]},outputs:{clicked:`clicked`},decls:2,vars:1,consts:[[`mat-stroked-button`,``,`type`,`button`,3,`disabled`],[`mat-flat-button`,``,`type`,`button`,3,`disabled`],[`mat-stroked-button`,``,`type`,`button`,3,`click`,`disabled`],[1,`button-content`],[3,`name`],[`mat-flat-button`,``,`type`,`button`,3,`click`,`disabled`]],template:function(e,n){e&1&&jb(0,el,4,3,`button`,0)(1,nl,4,3,`button`,1),e&2&&Bb(n.appearance()===`outlined`?0:1)},dependencies:[to,eo,gt],styles:[`[_nghost-%COMP%]{display:inline-flex}.block[_nghost-%COMP%]{display:flex;width:100%}.block[_nghost-%COMP%]   button[_ngcontent-%COMP%]{width:100%}button[_ngcontent-%COMP%]{min-height:3rem}bhw-icon[_ngcontent-%COMP%]{width:1.25rem;height:1.25rem}.button-content[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;gap:.5rem}.compact[_nghost-%COMP%]   button[_ngcontent-%COMP%]{padding-inline:.5rem;font-size:.75rem}.compact[_nghost-%COMP%]   bhw-icon[_ngcontent-%COMP%]{width:1rem;height:1rem}`]})};var zt=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new $;bulk={select:t=>this._select(t),deselect:t=>this._deselect(t),setSelection:t=>this._setSelection(t)};constructor(t=!1,e,n=!0,a){this._multiple=t,this._emitChanges=n,this.compareWith=a,e&&e.length&&(t?e.forEach(r=>this._markSelected(r)):this._markSelected(e[0]),this._selectedToEmit.length=0)}select(...t){return this._select(t)}deselect(...t){return this._deselect(t)}setSelection(...t){return this._setSelection(t)}toggle(t){return this.isSelected(t)?this.deselect(t):this.select(t)}clear(t=!0){this._unmarkAll();let e=this._hasQueuedChanges();return t&&this._emitChangeEvent(),e}isSelected(t){return this._selection.has(this._getConcreteValue(t))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(t){this._multiple&&this.selected&&this._selected.sort(t)}isMultipleSelection(){return this._multiple}_select(t){this._verifyValueAssignment(t),t.forEach(n=>this._markSelected(n));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}_deselect(t){this._verifyValueAssignment(t),t.forEach(n=>this._unmarkSelected(n));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}_setSelection(t){this._verifyValueAssignment(t);let e=this.selected,n=new Set(t.map(r=>this._getConcreteValue(r)));t.forEach(r=>this._markSelected(r)),e.filter(r=>!n.has(this._getConcreteValue(r,n))).forEach(r=>this._unmarkSelected(r));let a=this._hasQueuedChanges();return this._emitChangeEvent(),a}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(t){t=this._getConcreteValue(t),this.isSelected(t)||(this._multiple||this._unmarkAll(),this.isSelected(t)||this._selection.add(t),this._emitChanges&&this._selectedToEmit.push(t))}_unmarkSelected(t){t=this._getConcreteValue(t),this.isSelected(t)&&(this._selection.delete(t),this._emitChanges&&this._deselectedToEmit.push(t))}_unmarkAll(){this.isEmpty()||this._selection.forEach(t=>this._unmarkSelected(t))}_verifyValueAssignment(t){t.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(t,e){if(this.compareWith){e=e??this._selection;for(let n of e)if(this.compareWith(t,n))return n;return t}else return t}};var il=20;var Ui=(()=>{class i{_ngZone=g(ee);_platform=g(ne);_renderer=g(In$1).createRenderer(null,null);_cleanupGlobalListener;_scrolled=new $;_scrolledCount=0;scrollContainers=new Map;register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let n=this.scrollContainers.get(e);n&&(n.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=il){return this._platform.isBrowser?new M(n=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen(`document`,`scroll`,()=>this._scrolled.next())));let a=e>0?this._scrolled.pipe(Xv(e)).subscribe(n):this._scrolled.subscribe(n);return this._scrolledCount++,()=>{a.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):fe$1()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((e,n)=>this.deregister(n)),this._scrolled.complete()}ancestorScrolled(e,n){let a=this.getAncestorScrollContainers(e);return this.scrolled(n).pipe(Jt(r=>!r||a.indexOf(r)>-1))}getAncestorScrollContainers(e){let n=[];return this.scrollContainers.forEach((a,r)=>{this._targetContainsElement(r,e)&&n.push(r)}),n}_targetContainsElement(e,n){let a=Oe(n),r=e.getElementRef().nativeElement;do if(a==r)return!0;while(a=a.parentElement);return!1}static ɵfac=function(n){return new(n||i)};static ɵprov=pe({token:i,factory:i.ɵfac})}return i})();var al=20;var Je=(()=>{class i{_platform=g(ne);_listeners;_viewportSize=null;_change=new $;_document=g(B);constructor(){let e=g(ee),n=g(In$1).createRenderer(null,null);e.runOutsideAngular(()=>{if(this._platform.isBrowser){let a=r=>this._change.next(r);this._listeners=[n.listen(`window`,`resize`,a),n.listen(`window`,`orientationchange`,a)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(e=>e()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:n,height:a}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+a,right:e.left+n,height:a,width:n}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,n=this._getWindow(),a=e.documentElement,r=a.getBoundingClientRect();return{top:-r.top||e.body?.scrollTop||n.scrollY||a.scrollTop||0,left:-r.left||e.body?.scrollLeft||n.scrollX||a.scrollLeft||0}}change(e=al){return e>0?this._change.pipe(Xv(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}static ɵfac=function(n){return new(n||i)};static ɵprov=pe({token:i,factory:i.ɵfac})}return i})();var Vn=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵmod=Ze$1({type:i});static ɵinj=Ae({})}return i})();var Wi=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵmod=Ze$1({type:i});static ɵinj=Ae({imports:[av,Vn,av,Vn]})}return i})();var Bt=class{_attachedHost=null;attach(t){return this._attachedHost=t,t.attach(this)}detach(){let t=this._attachedHost;t!=null&&(this._attachedHost=null,t.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(t){this._attachedHost=t}};var $i=class extends Bt{component;viewContainerRef;injector;projectableNodes;bindings;directives;constructor(t,e,n,a,r,o){super(),this.component=t,this.viewContainerRef=e,this.injector=n,this.projectableNodes=a,this.bindings=r||null,this.directives=o||null}};var jt=class extends Bt{templateRef;viewContainerRef;context;injector;constructor(t,e,n,a){super(),this.templateRef=t,this.viewContainerRef=e,this.context=n,this.injector=a}get origin(){return this.templateRef.elementRef}attach(t,e=this.context){return this.context=e,super.attach(t)}detach(){return this.context=void 0,super.detach()}};var qi=class extends Bt{element;constructor(t){super(),this.element=t instanceof Ye$1?t.nativeElement:t}};var Xi=class{_attachedPortal=null;_disposeFn=null;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(t){if(t instanceof $i)return this._attachedPortal=t,this.attachComponentPortal(t);if(t instanceof jt)return this._attachedPortal=t,this.attachTemplatePortal(t);if(this.attachDomPortal&&t instanceof qi)return this._attachedPortal=t,this.attachDomPortal(t)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(t){this._disposeFn=t}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}};var Ln=class extends Xi{outletElement;_appRef;_defaultInjector;constructor(t,e,n){super(),this.outletElement=t,this._appRef=e,this._defaultInjector=n}attachComponentPortal(t){let e;if(t.viewContainerRef){let n=t.injector||t.viewContainerRef.injector,a=n.get(wn$1,null,{optional:!0})||void 0;e=t.viewContainerRef.createComponent(t.component,{index:t.viewContainerRef.length,injector:n,ngModuleRef:a,projectableNodes:t.projectableNodes||void 0,bindings:t.bindings||void 0,directives:t.directives||void 0}),this.setDisposeFn(()=>e.destroy())}else{let n=this._appRef,a=t.injector||this._defaultInjector||G.NULL,r=a.get(ue$1,n.injector);e=Bm(t.component,{elementInjector:a,environmentInjector:r,projectableNodes:t.projectableNodes||void 0,bindings:t.bindings||void 0,directives:t.directives||void 0}),n.attachView(e.hostView),this.setDisposeFn(()=>{n.viewCount>0&&n.detachView(e.hostView),e.destroy()})}return this.outletElement.appendChild(this._getComponentRootNode(e)),this._attachedPortal=t,e}attachTemplatePortal(t){let e=t.viewContainerRef,n=e.createEmbeddedView(t.templateRef,t.context,{injector:t.injector});return n.rootNodes.forEach(a=>this.outletElement.appendChild(a)),n.detectChanges(),this.setDisposeFn(()=>{let a=e.indexOf(n);a!==-1&&e.remove(a)}),this._attachedPortal=t,n}attachDomPortal=t=>{let e=t.element;e.parentNode;let n=this.outletElement.ownerDocument.createComment(`dom-portal`);e.parentNode.insertBefore(n,e),this.outletElement.appendChild(e),this._attachedPortal=t,super.setDisposeFn(()=>{n.parentNode&&n.parentNode.replaceChild(e,n)})};dispose(){super.dispose(),this.outletElement.remove()}_getComponentRootNode(t){return t.hostView.rootNodes[0]}};var no=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵmod=Ze$1({type:i});static ɵinj=Ae({})}return i})();var io=Lr();function uo(i){return new zn(i.get(Je),i.get(B))}var zn=class{_viewportRuler;_previousHTMLStyles={top:``,left:``};_previousScrollPosition;_isEnabled=!1;_document;constructor(t,e){this._viewportRuler=t,this._document=e}attach(){}enable(){if(this._canBeEnabled()){let t=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=t.style.left||``,this._previousHTMLStyles.top=t.style.top||``,t.style.left=ie(-this._previousScrollPosition.left),t.style.top=ie(-this._previousScrollPosition.top),t.classList.add(`cdk-global-scrollblock`),this._isEnabled=!0}}disable(){if(this._isEnabled){let t=this._document.documentElement,e=this._document.body,n=t.style,a=e.style,r=n.scrollBehavior||``,o=a.scrollBehavior||``;this._isEnabled=!1,n.left=this._previousHTMLStyles.left,n.top=this._previousHTMLStyles.top,t.classList.remove(`cdk-global-scrollblock`),io&&(n.scrollBehavior=a.scrollBehavior=`auto`),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),io&&(n.scrollBehavior=r,a.scrollBehavior=o)}}_canBeEnabled(){if(this._document.documentElement.classList.contains(`cdk-global-scrollblock`)||this._isEnabled)return!1;let e=this._document.documentElement,n=this._viewportRuler.getViewportSize();return e.scrollHeight>n.height||e.scrollWidth>n.width}};function po(i,t){return new Bn(i.get(Ui),i.get(ee),i.get(Je),t)}var Bn=class{_scrollDispatcher;_ngZone;_viewportRuler;_config;_scrollSubscription=null;_overlayRef;_initialScrollPosition;constructor(t,e,n,a){this._scrollDispatcher=t,this._ngZone=e,this._viewportRuler=n,this._config=a}attach(t){this._overlayRef,this._overlayRef=t}enable(){if(this._scrollSubscription)return;let t=this._scrollDispatcher.scrolled(0).pipe(Jt(e=>!e||!this._overlayRef.overlayElement.contains(e.getElementRef().nativeElement)));this._config&&this._config.threshold&&this._config.threshold>1?(this._initialScrollPosition=this._viewportRuler.getViewportScrollPosition().top,this._scrollSubscription=t.subscribe(()=>{let e=this._viewportRuler.getViewportScrollPosition().top;Math.abs(e-this._initialScrollPosition)>this._config.threshold?this._detach():this._overlayRef.updatePosition()})):this._scrollSubscription=t.subscribe(this._detach)}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}_detach=()=>{this.disable(),this._overlayRef.hasAttached()&&this._ngZone.run(()=>this._overlayRef.detach())}};var Ht=class{enable(){}disable(){}attach(){}};function Yi(i,t){return t.some(e=>{let n=i.bottom<e.top,a=i.top>e.bottom,r=i.right<e.left,o=i.left>e.right;return n||a||r||o})}function ao(i,t){return t.some(e=>{let n=i.top<e.top,a=i.bottom>e.bottom,r=i.left<e.left,o=i.right>e.right;return n||a||r||o})}function Ut(i,t){return new jn(i.get(Ui),i.get(Je),i.get(ee),t)}var jn=class{_scrollDispatcher;_viewportRuler;_ngZone;_config;_scrollSubscription=null;_overlayRef;constructor(t,e,n,a){this._scrollDispatcher=t,this._viewportRuler=e,this._ngZone=n,this._config=a}attach(t){this._overlayRef,this._overlayRef=t}enable(){if(!this._scrollSubscription){let t=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(t).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let e=this._overlayRef.overlayElement.getBoundingClientRect(),{width:n,height:a}=this._viewportRuler.getViewportSize();Yi(e,[{width:n,height:a,bottom:a,right:n,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()))}})}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}};var fo=(()=>{class i{_injector=g(G);noop=()=>new Ht;close=e=>po(this._injector,e);block=()=>uo(this._injector);reposition=e=>Ut(this._injector,e);static ɵfac=function(n){return new(n||i)};static ɵprov=pe({token:i,factory:i.ɵfac})}return i})();var Gt=class{positionStrategy;scrollStrategy=new Ht;panelClass=``;hasBackdrop=!1;backdropClass=`cdk-overlay-dark-backdrop`;disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=!1;usePopover;eventPredicate;constructor(t){if(t){let e=Object.keys(t);for(let n of e)t[n]!==void 0&&(this[n]=t[n])}}};var Hn=class{connectionPair;scrollableViewProperties;constructor(t,e){this.connectionPair=t,this.scrollableViewProperties=e}};var ho=(()=>{class i{_attachedOverlays=[];_document=g(B);_isAttached=!1;ngOnDestroy(){this.detach()}add(e){this.remove(e),this._attachedOverlays.push(e)}remove(e){let n=this._attachedOverlays.indexOf(e);n>-1&&this._attachedOverlays.splice(n,1),this._attachedOverlays.length===0&&this.detach()}canReceiveEvent(e,n,a){return a.observers.length<1?!1:e.eventPredicate?e.eventPredicate(n):!0}static ɵfac=function(n){return new(n||i)};static ɵprov=pe({token:i,factory:i.ɵfac})}return i})();var bo=(()=>{class i extends ho{_ngZone=g(ee);_renderer=g(In$1).createRenderer(null,null);_cleanupKeydown;add(e){super.add(e),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen(`body`,`keydown`,this._keydownListener)}),this._isAttached=!0)}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=!1)}_keydownListener=e=>{let n=this._attachedOverlays;for(let a=n.length-1;a>-1;a--){let r=n[a];if(this.canReceiveEvent(r,e,r._keydownEvents)){this._ngZone.run(()=>r._keydownEvents.next(e));break}}};static ɵfac=function(n){return new(n||i)};static ɵprov=pe({token:i,factory:i.ɵfac})}return i})();var go=(()=>{class i extends ho{_platform=g(ne);_ngZone=g(ee);_renderer=g(In$1).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=!1;_pointerDownEventTarget=null;_cleanups;add(e){if(super.add(e),!this._isAttached){let n=this._document.body,a={capture:!0},r=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[r.listen(n,`pointerdown`,this._pointerDownListener,a),r.listen(n,`click`,this._clickListener,a),r.listen(n,`auxclick`,this._clickListener,a),r.listen(n,`contextmenu`,this._clickListener,a)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=n.style.cursor,n.style.cursor=`pointer`,this._cursorStyleIsSet=!0),this._isAttached=!0}}detach(){this._isAttached&&(this._cleanups?.forEach(e=>e()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=!1),this._isAttached=!1)}_pointerDownListener=e=>{this._pointerDownEventTarget=ue(e)};_clickListener=e=>{let n=ue(e),a=e.type===`click`&&this._pointerDownEventTarget?this._pointerDownEventTarget:n;this._pointerDownEventTarget=null;let r=this._attachedOverlays.slice();for(let o=r.length-1;o>-1;o--){let m=r[o],f=m._outsidePointerEvents;if(!(!m.hasAttached()||!this.canReceiveEvent(m,e,f))){if(ro(m.overlayElement,n)||ro(m.overlayElement,a))break;this._ngZone?this._ngZone.run(()=>f.next(e)):f.next(e)}}};static ɵfac=function(n){return new(n||i)};static ɵprov=pe({token:i,factory:i.ɵfac})}return i})();function ro(i,t){let e=typeof ShadowRoot<`u`&&ShadowRoot,n=t;for(;n;){if(n===i)return!0;n=e&&n instanceof ShadowRoot?n.host:n.parentNode}return!1}var _o=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵcmp=Sn$1({type:i,selectors:[[`ng-component`]],hostAttrs:[`cdk-overlay-style-loader`,``],decls:0,vars:0,template:function(n,a){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
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
`],encapsulation:2})}return i})();var vo=(()=>{class i{_platform=g(ne);_containerElement;_document=g(B);_styleLoader=g(z_);ngOnDestroy(){this._containerElement?.remove()}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let e=`cdk-overlay-container`;if(this._platform.isBrowser||Fi()){let a=this._document.querySelectorAll(`.${e}[platform="server"], .${e}[platform="test"]`);for(let r=0;r<a.length;r++)a[r].remove()}let n=this._document.createElement(`div`);n.classList.add(e),Fi()?n.setAttribute(`platform`,`test`):this._platform.isBrowser||n.setAttribute(`platform`,`server`),this._document.body.appendChild(n),this._containerElement=n}_loadStyles(){this._styleLoader.load(_o)}static ɵfac=function(n){return new(n||i)};static ɵprov=pe({token:i,factory:i.ɵfac})}return i})();var Zi=class{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(t,e,n,a){this._renderer=e,this._ngZone=n,this.element=t.createElement(`div`),this.element.classList.add(`cdk-overlay-backdrop`),this._cleanupClick=e.listen(this.element,`click`,a)}detach(){this._ngZone.runOutsideAngular(()=>{let t=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(t,`transitionend`,this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),t.style.pointerEvents=`none`,t.classList.remove(`cdk-overlay-backdrop-showing`)})}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove()}};function Qi(i){return i&&i.nodeType===1}var Ki=Le([]);var Gn=class{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new $;_attachments=new $;_detachments=new $;_positionStrategy;_scrollStrategy;_locationChanges;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=!1;_previousHostParent;_keydownEvents=new $;_outsidePointerEvents=new $;_afterNextRenderRef;constructor(t,e,n,a,r,o,m,f,v,u=!1,_,O){this._portalOutlet=t,this._host=e,this._pane=n,this._config=a,this._ngZone=r,this._keyboardDispatcher=o,this._document=m,this._location=f,this._outsideClickDispatcher=v,this._animationsDisabled=u,this._injector=_,this._renderer=O,a.scrollStrategy&&(this._scrollStrategy=a.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=a.positionStrategy}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(t){if(this._disposed)return null;this._attachHost();let e=this._portalOutlet.attach(t);if(this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),Ft$1(()=>{Ki.update(n=>n.includes(this)?n:[...n,this])}),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=LI(()=>{this.hasAttached()&&this.updatePosition()},{injector:this._injector}),this._togglePointerEvents(!0),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!0),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation===!0||this._config.disposeOnNavigation===`pop-state`){let n=this._location.subscribe(()=>this.dispose());this._locationChanges=()=>n.unsubscribe()}else this._config.disposeOnNavigation===`url-change`&&(this._locationChanges=this._location.onUrlChange(()=>this.dispose()));return this._outsideClickDispatcher.add(this),typeof e?.onDestroy==`function`&&e.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()))}),e}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(!1),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let t=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges?.(),this._outsideClickDispatcher.remove(this),Ft$1(()=>{Ki.update(e=>e.filter(n=>n!==this))}),t}dispose(){if(this._disposed)return;let t=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges?.(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,t&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=!0,Ft$1(()=>{Ki.update(e=>e.filter(n=>n!==this))})}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}updatePositionStrategy(t){t!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=t,this.hasAttached()&&(t.attach(this),this.updatePosition()))}updateSize(t){this._config=y(y({},this._config),t),this._updateElementSize()}setDirection(t){this._config=A(y({},this._config),{direction:t}),this._updateElementDirection()}addPanelClass(t){this._pane&&this._toggleClasses(this._pane,t,!0)}removePanelClass(t){this._pane&&this._toggleClasses(this._pane,t,!1)}getDirection(){let t=this._config.direction;return t?typeof t==`string`?t:t.value:`ltr`}updateScrollStrategy(t){t!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=t,this.hasAttached()&&(t.attach(this),t.enable()))}_updateElementDirection(){this._host.setAttribute(`dir`,this.getDirection())}_updateElementSize(){if(!this._pane)return;let t=this._pane.style;t.width=ie(this._config.width),t.height=ie(this._config.height),t.minWidth=ie(this._config.minWidth),t.minHeight=ie(this._config.minHeight),t.maxWidth=ie(this._config.maxWidth),t.maxHeight=ie(this._config.maxHeight)}_togglePointerEvents(t){this._pane.style.pointerEvents=t?``:`none`}_attachHost(){if(!this._host.parentElement){let t=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;Qi(t)?t.after(this._host):t?.type===`parent`?t.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host)}if(this._config.usePopover)try{this._host.showPopover()}catch{}}_attachBackdrop(){let t=`cdk-overlay-backdrop-showing`;this._backdropRef?.dispose(),this._backdropRef=new Zi(this._document,this._renderer,this._ngZone,e=>{this._backdropClick.next(e)}),this._animationsDisabled&&this._backdropRef.element.classList.add(`cdk-overlay-backdrop-noop-animation`),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,!0),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<`u`?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(t))}):this._backdropRef.element.classList.add(t)}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host)}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach()}_toggleClasses(t,e,n){let a=xi(e||[]).filter(r=>!!r);a.length&&(n?t.classList.add(...a):t.classList.remove(...a))}_detachContentWhenEmpty(){let t=!1;try{this._detachContentAfterRenderRef=LI(()=>{t=!0,this._detachContent()},{injector:this._injector})}catch(e){if(t)throw e;this._detachContent()}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent()}),this._detachContentMutationObserver.observe(this._pane,{childList:!0}))}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!1),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent())}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect()}_disposeScrollStrategy(){let t=this._scrollStrategy;t?.disable(),t?.detach?.()}};var oo=`cdk-overlay-connected-position-bounding-box`;var rl=/([A-Za-z%]+)$/;function Ji(i,t){return new Un(t,i.get(Je),i.get(B),i.get(ne),i.get(vo))}var Un=class{_viewportRuler;_document;_platform;_overlayContainer;_overlayRef;_isInitialRender=!1;_lastBoundingBoxSize={width:0,height:0};_isPushed=!1;_canPush=!0;_growAfterOpen=!1;_hasFlexibleDimensions=!0;_positionLocked=!1;_originRect;_overlayRect;_viewportRect;_containerRect;_viewportMargin=0;_scrollables=[];_preferredPositions=[];_origin;_pane;_isDisposed=!1;_boundingBox=null;_lastPosition=null;_lastScrollVisibility=null;_positionChanges=new $;_resizeSubscription=X.EMPTY;_offsetX=0;_offsetY=0;_transformOriginSelector;_appliedPanelClasses=[];_previousPushAmount=null;_popoverLocation=`global`;positionChanges=this._positionChanges;get positions(){return this._preferredPositions}constructor(t,e,n,a,r){this._viewportRuler=e,this._document=n,this._platform=a,this._overlayContainer=r,this.setOrigin(t)}attach(t){this._overlayRef&&this._overlayRef,this._validatePositions(),t.hostElement.classList.add(oo),this._overlayRef=t,this._boundingBox=t.hostElement,this._pane=t.overlayElement,this._isDisposed=!1,this._isInitialRender=!0,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=!0,this.apply()})}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._getContainerRect();let t=this._originRect,e=this._overlayRect,n=this._viewportRect,a=this._containerRect,r=[],o;for(let m of this._preferredPositions){let f=this._getOriginPoint(t,a,m),v=this._getOverlayPoint(f,e,m),u=this._getOverlayFit(v,e,n,m);if(u.isCompletelyWithinViewport){this._isPushed=!1,this._applyPosition(m,f);return}if(this._canFitWithFlexibleDimensions(u,v,n)){r.push({position:m,origin:f,overlayRect:e,boundingBoxRect:this._calculateBoundingBoxRect(f,m)});continue}(!o||o.overlayFit.visibleArea<u.visibleArea)&&(o={overlayFit:u,overlayPoint:v,originPoint:f,position:m,overlayRect:e})}if(r.length){let m=null,f=-1;for(let v of r){let u=v.boundingBoxRect.width*v.boundingBoxRect.height*(v.position.weight||1);u>f&&(f=u,m=v)}this._isPushed=!1,this._applyPosition(m.position,m.origin);return}if(this._canPush){this._isPushed=!0,this._applyPosition(o.position,o.originPoint);return}this._applyPosition(o.position,o.originPoint)}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe()}dispose(){this._isDisposed||(this._boundingBox&&et(this._boundingBox.style,{top:``,left:``,right:``,bottom:``,height:``,width:``,alignItems:``,justifyContent:``}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(oo),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=!0)}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let t=this._lastPosition;t?(this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._getContainerRect(),this._applyPosition(t,this._getOriginPoint(this._originRect,this._containerRect,t))):this.apply()}withScrollableContainers(t){return this._scrollables=t,this}withPositions(t){return this._preferredPositions=t,t.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(t){return this._viewportMargin=t,this}withFlexibleDimensions(t=!0){return this._hasFlexibleDimensions=t,this}withGrowAfterOpen(t=!0){return this._growAfterOpen=t,this}withPush(t=!0){return this._canPush=t,this}withLockedPosition(t=!0){return this._positionLocked=t,this}setOrigin(t){return this._origin=t,this}withDefaultOffsetX(t){return this._offsetX=t,this}withDefaultOffsetY(t){return this._offsetY=t,this}withTransformOriginOn(t){return this._transformOriginSelector=t,this}withPopoverLocation(t){return this._popoverLocation=t,this}getPopoverInsertionPoint(){return this._popoverLocation===`global`?null:this._popoverLocation!==`inline`?this._popoverLocation:this._origin instanceof Ye$1?this._origin.nativeElement:Qi(this._origin)?this._origin:null}_getOriginPoint(t,e,n){let a;if(n.originX==`center`)a=t.left+t.width/2;else{let o=this._isRtl()?t.right:t.left,m=this._isRtl()?t.left:t.right;a=n.originX==`start`?o:m}e.left<0&&(a-=e.left);let r;return n.originY==`center`?r=t.top+t.height/2:r=n.originY==`top`?t.top:t.bottom,e.top<0&&(r-=e.top),{x:a,y:r}}_getOverlayPoint(t,e,n){let a;n.overlayX==`center`?a=-e.width/2:n.overlayX===`start`?a=this._isRtl()?-e.width:0:a=this._isRtl()?0:-e.width;let r;return n.overlayY==`center`?r=-e.height/2:r=n.overlayY==`top`?0:-e.height,{x:t.x+a,y:t.y+r}}_getOverlayFit(t,e,n,a){let r=lo(e),{x:o,y:m}=t,f=this._getOffset(a,`x`),v=this._getOffset(a,`y`);f&&(o+=f),v&&(m+=v);let u=0-o,_=o+r.width-n.width,O=0-m,h=m+r.height-n.height,S=this._subtractOverflows(r.width,u,_),V=this._subtractOverflows(r.height,O,h),Te=S*V;return{visibleArea:Te,isCompletelyWithinViewport:r.width*r.height===Te,fitsInViewportVertically:V===r.height,fitsInViewportHorizontally:S==r.width}}_canFitWithFlexibleDimensions(t,e,n){if(this._hasFlexibleDimensions){let a=n.bottom-e.y,r=n.right-e.x,o=so(this._overlayRef.getConfig().minHeight),m=so(this._overlayRef.getConfig().minWidth),f=t.fitsInViewportVertically||o!=null&&o<=a,v=t.fitsInViewportHorizontally||m!=null&&m<=r;return f&&v}return!1}_pushOverlayOnScreen(t,e,n){if(this._previousPushAmount&&this._positionLocked)return{x:t.x+this._previousPushAmount.x,y:t.y+this._previousPushAmount.y};let a=lo(e),r=this._viewportRect,o=Math.max(t.x+a.width-r.width,0),m=Math.max(t.y+a.height-r.height,0),f=Math.max(r.top-n.top-t.y,0),v=Math.max(r.left-n.left-t.x,0),u=0,_=0;return a.width<=r.width?u=v||-o:u=t.x<this._getViewportMarginStart()?r.left-n.left-t.x:0,a.height<=r.height?_=f||-m:_=t.y<this._getViewportMarginTop()?r.top-n.top-t.y:0,this._previousPushAmount={x:u,y:_},{x:t.x+u,y:t.y+_}}_applyPosition(t,e){if(this._setTransformOrigin(t),this._setOverlayElementStyles(e,t),this._setBoundingBoxStyles(e,t),t.panelClass&&this._addPanelClasses(t.panelClass),this._positionChanges.observers.length){let n=this._getScrollVisibility();if(t!==this._lastPosition||!this._lastScrollVisibility||!ol(this._lastScrollVisibility,n)){let a=new Hn(t,n);this._positionChanges.next(a)}this._lastScrollVisibility=n}this._lastPosition=t,this._isInitialRender=!1}_setTransformOrigin(t){if(!this._transformOriginSelector)return;let e=this._boundingBox.querySelectorAll(this._transformOriginSelector),n,a=t.overlayY;t.overlayX===`center`?n=`center`:this._isRtl()?n=t.overlayX===`start`?`right`:`left`:n=t.overlayX===`start`?`left`:`right`;for(let r=0;r<e.length;r++)e[r].style.transformOrigin=`${n} ${a}`}_calculateBoundingBoxRect(t,e){let n=this._viewportRect,a=this._isRtl(),r,o,m;if(e.overlayY===`top`)o=t.y,r=n.height-o+this._getViewportMarginBottom();else if(e.overlayY===`bottom`)m=n.height-t.y+this._getViewportMarginTop()+this._getViewportMarginBottom(),r=n.height-m+this._getViewportMarginTop();else{let h=Math.min(n.bottom-t.y+n.top,t.y),S=this._lastBoundingBoxSize.height;r=h*2,o=t.y-h,r>S&&!this._isInitialRender&&!this._growAfterOpen&&(o=t.y-S/2)}let f=e.overlayX===`start`&&!a||e.overlayX===`end`&&a,v=e.overlayX===`end`&&!a||e.overlayX===`start`&&a,u,_,O;if(v)O=n.width-t.x+this._getViewportMarginStart()+this._getViewportMarginEnd(),u=t.x-this._getViewportMarginStart();else if(f)_=t.x,u=n.right-t.x-this._getViewportMarginEnd();else{let h=Math.min(n.right-t.x+n.left,t.x),S=this._lastBoundingBoxSize.width;u=h*2,_=t.x-h,u>S&&!this._isInitialRender&&!this._growAfterOpen&&(_=t.x-S/2)}return{top:o,left:_,bottom:m,right:O,width:u,height:r}}_setBoundingBoxStyles(t,e){let n=this._calculateBoundingBoxRect(t,e);!this._isInitialRender&&!this._growAfterOpen&&(n.height=Math.min(n.height,this._lastBoundingBoxSize.height),n.width=Math.min(n.width,this._lastBoundingBoxSize.width));let a={};if(this._hasExactPosition())a.top=a.left=`0`,a.bottom=a.right=`auto`,a.maxHeight=a.maxWidth=``,a.width=a.height=`100%`;else{let r=this._overlayRef.getConfig().maxHeight,o=this._overlayRef.getConfig().maxWidth;a.width=ie(n.width),a.height=ie(n.height),a.top=ie(n.top)||`auto`,a.bottom=ie(n.bottom)||`auto`,a.left=ie(n.left)||`auto`,a.right=ie(n.right)||`auto`,e.overlayX===`center`?a.alignItems=`center`:a.alignItems=e.overlayX===`end`?`flex-end`:`flex-start`,e.overlayY===`center`?a.justifyContent=`center`:a.justifyContent=e.overlayY===`bottom`?`flex-end`:`flex-start`,r&&(a.maxHeight=ie(r)),o&&(a.maxWidth=ie(o))}this._lastBoundingBoxSize=n,et(this._boundingBox.style,a)}_resetBoundingBoxStyles(){et(this._boundingBox.style,{top:`0`,left:`0`,right:`0`,bottom:`0`,height:``,width:``,alignItems:``,justifyContent:``})}_resetOverlayElementStyles(){et(this._pane.style,{top:``,left:``,bottom:``,right:``,position:``,transform:``})}_setOverlayElementStyles(t,e){let n={},a=this._hasExactPosition(),r=this._hasFlexibleDimensions,o=this._overlayRef.getConfig();if(a){let u=this._viewportRuler.getViewportScrollPosition();et(n,this._getExactOverlayY(e,t,u)),et(n,this._getExactOverlayX(e,t,u))}else n.position=`static`;let m=``,f=this._getOffset(e,`x`),v=this._getOffset(e,`y`);f&&(m+=`translateX(${f}px) `),v&&(m+=`translateY(${v}px)`),n.transform=m.trim(),o.maxHeight&&(a?n.maxHeight=ie(o.maxHeight):r&&(n.maxHeight=``)),o.maxWidth&&(a?n.maxWidth=ie(o.maxWidth):r&&(n.maxWidth=``)),et(this._pane.style,n)}_getExactOverlayY(t,e,n){let a={top:``,bottom:``},r=this._getOverlayPoint(e,this._overlayRect,t);if(this._isPushed&&(r=this._pushOverlayOnScreen(r,this._overlayRect,n)),t.overlayY===`bottom`)a.bottom=`${this._document.documentElement.clientHeight-(r.y+this._overlayRect.height)}px`;else a.top=ie(r.y);return a}_getExactOverlayX(t,e,n){let a={left:``,right:``},r=this._getOverlayPoint(e,this._overlayRect,t);this._isPushed&&(r=this._pushOverlayOnScreen(r,this._overlayRect,n));let o;if(this._isRtl()?o=t.overlayX===`end`?`left`:`right`:o=t.overlayX===`end`?`right`:`left`,o===`right`)a.right=`${this._document.documentElement.clientWidth-(r.x+this._overlayRect.width)}px`;else a.left=ie(r.x);return a}_getScrollVisibility(){let t=this._getOriginRect(),e=this._pane.getBoundingClientRect(),n=this._scrollables.map(a=>a.getElementRef().nativeElement.getBoundingClientRect());return{isOriginClipped:ao(t,n),isOriginOutsideView:Yi(t,n),isOverlayClipped:ao(e,n),isOverlayOutsideView:Yi(e,n)}}_subtractOverflows(t,...e){return e.reduce((n,a)=>n-Math.max(a,0),t)}_getNarrowedViewportRect(){let t=this._document.documentElement.clientWidth,e=this._document.documentElement.clientHeight,n=this._viewportRuler.getViewportScrollPosition();return{top:n.top+this._getViewportMarginTop(),left:n.left+this._getViewportMarginStart(),right:n.left+t-this._getViewportMarginEnd(),bottom:n.top+e-this._getViewportMarginBottom(),width:t-this._getViewportMarginStart()-this._getViewportMarginEnd(),height:e-this._getViewportMarginTop()-this._getViewportMarginBottom()}}_isRtl(){return this._overlayRef.getDirection()===`rtl`}_hasExactPosition(){return!this._hasFlexibleDimensions||this._isPushed}_getOffset(t,e){return e===`x`?t.offsetX==null?this._offsetX:t.offsetX:t.offsetY==null?this._offsetY:t.offsetY}_validatePositions(){}_addPanelClasses(t){this._pane&&xi(t).forEach(e=>{e!==``&&this._appliedPanelClasses.indexOf(e)===-1&&(this._appliedPanelClasses.push(e),this._pane.classList.add(e))})}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(t=>{this._pane.classList.remove(t)}),this._appliedPanelClasses=[])}_getViewportMarginStart(){return typeof this._viewportMargin==`number`?this._viewportMargin:this._viewportMargin?.start??0}_getViewportMarginEnd(){return typeof this._viewportMargin==`number`?this._viewportMargin:this._viewportMargin?.end??0}_getViewportMarginTop(){return typeof this._viewportMargin==`number`?this._viewportMargin:this._viewportMargin?.top??0}_getViewportMarginBottom(){return typeof this._viewportMargin==`number`?this._viewportMargin:this._viewportMargin?.bottom??0}_getOriginRect(){let t=this._origin;if(t instanceof Ye$1)return t.nativeElement.getBoundingClientRect();if(t instanceof Element)return t.getBoundingClientRect();let e=t.width||0,n=t.height||0;return{top:t.y,bottom:t.y+n,left:t.x,right:t.x+e,height:n,width:e}}_getContainerRect(){let t=this._overlayRef.getConfig().usePopover&&this._popoverLocation!==`global`,e=this._overlayContainer.getContainerElement();t&&(e.style.display=`block`);let n=e.getBoundingClientRect();return t&&(e.style.display=``),n}};function et(i,t){for(let e in t)Object.hasOwn(t,e)&&(i[e]=t[e]);return i}function so(i){if(typeof i!=`number`&&i!=null){let[t,e]=i.split(rl);return!e||e===`px`?parseFloat(t):null}return i||null}function lo(i){return{top:Math.floor(i.top),right:Math.floor(i.right),bottom:Math.floor(i.bottom),left:Math.floor(i.left),width:Math.floor(i.width),height:Math.floor(i.height)}}function ol(i,t){return i===t?!0:i.isOriginClipped===t.isOriginClipped&&i.isOriginOutsideView===t.isOriginOutsideView&&i.isOverlayClipped===t.isOverlayClipped&&i.isOverlayOutsideView===t.isOverlayOutsideView}var co=`cdk-global-overlay-wrapper`;function yo(i){return new Wn}var Wn=class{_overlayRef;_cssPosition=`static`;_topOffset=``;_bottomOffset=``;_alignItems=``;_xPosition=``;_xOffset=``;_width=``;_height=``;_isDisposed=!1;attach(t){let e=t.getConfig();this._overlayRef=t,this._width&&!e.width&&t.updateSize({width:this._width}),this._height&&!e.height&&t.updateSize({height:this._height}),t.hostElement.classList.add(co),this._isDisposed=!1}top(t=``){return this._bottomOffset=``,this._topOffset=t,this._alignItems=`flex-start`,this}left(t=``){return this._xOffset=t,this._xPosition=`left`,this}bottom(t=``){return this._topOffset=``,this._bottomOffset=t,this._alignItems=`flex-end`,this}right(t=``){return this._xOffset=t,this._xPosition=`right`,this}start(t=``){return this._xOffset=t,this._xPosition=`start`,this}end(t=``){return this._xOffset=t,this._xPosition=`end`,this}width(t=``){return this._overlayRef?this._overlayRef.updateSize({width:t}):this._width=t,this}height(t=``){return this._overlayRef?this._overlayRef.updateSize({height:t}):this._height=t,this}centerHorizontally(t=``){return this.left(t),this._xPosition=`center`,this}centerVertically(t=``){return this.top(t),this._alignItems=`center`,this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let t=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement.style,{width:a,height:r,maxWidth:o,maxHeight:m}=this._overlayRef.getConfig(),f=(a===`100%`||a===`100vw`)&&(!o||o===`100%`||o===`100vw`),v=(r===`100%`||r===`100vh`)&&(!m||m===`100%`||m===`100vh`),u=this._xPosition,_=this._xOffset,O=this._overlayRef.getConfig().direction===`rtl`,h=``,S=``,V=``;f?V=`flex-start`:u===`center`?(V=`center`,O?S=_:h=_):O?u===`left`||u===`end`?(V=`flex-end`,h=_):(u===`right`||u===`start`)&&(V=`flex-start`,S=_):u===`left`||u===`start`?(V=`flex-start`,h=_):(u===`right`||u===`end`)&&(V=`flex-end`,S=_),t.position=this._cssPosition,t.marginLeft=f?`0`:h,t.marginTop=v?`0`:this._topOffset,t.marginBottom=this._bottomOffset,t.marginRight=f?`0`:S,e.justifyContent=V,e.alignItems=v?`flex-start`:this._alignItems}dispose(){if(this._isDisposed||!this._overlayRef)return;let t=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement,n=e.style;e.classList.remove(co),n.justifyContent=n.alignItems=t.marginTop=t.marginBottom=t.marginLeft=t.marginRight=t.position=``,this._overlayRef=null,this._isDisposed=!0}};var xo=(()=>{class i{_injector=g(G);global(){return yo()}flexibleConnectedTo(e){return Ji(this._injector,e)}static ɵfac=function(n){return new(n||i)};static ɵprov=pe({token:i,factory:i.ɵfac})}return i})();var Wt=new m(`OVERLAY_DEFAULT_CONFIG`);function ea(i,t){i.get(z_).load(_o);let e=i.get(vo),n=i.get(B),a=i.get(fe),r=i.get(_n),o=i.get(Y_),m=i.get(dr$1,null,{optional:!0})||i.get(In$1).createRenderer(null,null),f=new Gt(t),v=i.get(Wt,null,{optional:!0})?.usePopover??!0;f.direction=f.direction||o.value,!n.body||!(`showPopover`in n.body)?f.usePopover=!1:f.usePopover=t?.usePopover??v;let u=n.createElement(`div`),_=n.createElement(`div`);u.id=a.getId(`cdk-overlay-`),u.classList.add(`cdk-overlay-pane`),_.appendChild(u),f.usePopover&&(_.setAttribute(`popover`,`manual`),_.classList.add(`cdk-overlay-popover`));let O=f.usePopover?f.positionStrategy?.getPopoverInsertionPoint?.():null;return Qi(O)?O.after(_):O?.type===`parent`?O.element.appendChild(_):e.getContainerElement().appendChild(_),new Gn(new Ln(u,r,i),_,u,f,i.get(ee),i.get(bo),n,i.get(Wm),i.get(go),t?.disableAnimations??i.get(qD,null,{optional:!0})===`NoopAnimations`,i.get(ue$1),m)}var ko=(()=>{class i{scrollStrategies=g(fo);_positionBuilder=g(xo);_injector=g(G);create(e){return ea(this._injector,e)}position(){return this._positionBuilder}static ɵfac=function(n){return new(n||i)};static ɵprov=pe({token:i,factory:i.ɵfac})}return i})();var sl=[{originX:`start`,originY:`bottom`,overlayX:`start`,overlayY:`top`},{originX:`start`,originY:`top`,overlayX:`start`,overlayY:`bottom`},{originX:`end`,originY:`top`,overlayX:`end`,overlayY:`bottom`},{originX:`end`,originY:`bottom`,overlayX:`end`,overlayY:`top`}];var ll=new m(`cdk-connected-overlay-scroll-strategy`,{providedIn:`root`,factory:()=>{let i=g(G);return()=>Ut(i)}});var vt=(()=>{class i{elementRef=g(Ye$1);static ɵfac=function(n){return new(n||i)};static ɵdir=yr$1({type:i,selectors:[[``,`cdk-overlay-origin`,``],[``,`overlay-origin`,``],[``,`cdkOverlayOrigin`,``]],exportAs:[`cdkOverlayOrigin`]})}return i})();var Co=new m(`cdk-connected-overlay-default-config`);var $n=(()=>{class i{_dir=g(Y_,{optional:!0});_injector=g(G);_overlayRef;_templatePortal;_backdropSubscription=X.EMPTY;_attachSubscription=X.EMPTY;_detachSubscription=X.EMPTY;_positionSubscription=X.EMPTY;_offsetX;_offsetY;_position;_scrollStrategyFactory=g(ll);_ngZone=g(ee);origin;positions;positionStrategy;get offsetX(){return this._offsetX}set offsetX(e){this._offsetX=e,this._position&&this._updatePositionStrategy(this._position)}get offsetY(){return this._offsetY}set offsetY(e){this._offsetY=e,this._position&&this._updatePositionStrategy(this._position)}width;height;minWidth;minHeight;backdropClass;panelClass;viewportMargin=0;scrollStrategy;open=!1;disableClose=!1;transformOriginSelector;hasBackdrop=!1;lockPosition=!1;flexibleDimensions=!1;growAfterOpen=!1;push=!1;disposeOnNavigation=!1;usePopover;matchWidth=!1;set _config(e){typeof e!=`string`&&this._assignConfig(e)}backdropClick=new Ne;positionChange=new Ne;attach=new Ne;detach=new Ne;overlayKeydown=new Ne;overlayOutsideClick=new Ne;constructor(){let e=g(st),n=g(kt),a=g(Co,{optional:!0}),r=g(Wt,{optional:!0});this.usePopover=r?.usePopover===!1?null:`global`,this._templatePortal=new jt(e,n),this.scrollStrategy=this._scrollStrategyFactory(),a&&this._assignConfig(a)}get overlayRef(){return this._overlayRef}get dir(){return this._dir?this._dir.value:`ltr`}ngOnDestroy(){this._attachSubscription.unsubscribe(),this._detachSubscription.unsubscribe(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this._overlayRef?.dispose()}ngOnChanges(e){this._position&&(this._updatePositionStrategy(this._position),this._overlayRef?.updateSize({width:this._getWidth(),minWidth:this.minWidth,height:this.height,minHeight:this.minHeight}),e.origin&&this.open&&this._position.apply()),e.open&&(this.open?this.attachOverlay():this.detachOverlay())}_createOverlay(){(!this.positions||!this.positions.length)&&(this.positions=sl);let e=this._overlayRef=ea(this._injector,this._buildConfig());this._attachSubscription=e.attachments().subscribe(()=>this.attach.emit()),this._detachSubscription=e.detachments().subscribe(()=>this.detach.emit()),e.keydownEvents().subscribe(n=>{this.overlayKeydown.next(n),n.keyCode===27&&!this.disableClose&&!He(n)&&(n.preventDefault(),this.detachOverlay())}),this._overlayRef.outsidePointerEvents().subscribe(n=>{let a=this._getOriginElement(),r=ue(n);(!a||a!==r&&!a.contains(r))&&this.overlayOutsideClick.next(n)})}_buildConfig(){let e=this._position=this.positionStrategy||this._createPositionStrategy(),n=new Gt({direction:this._dir||`ltr`,positionStrategy:e,scrollStrategy:this.scrollStrategy,hasBackdrop:this.hasBackdrop,disposeOnNavigation:this.disposeOnNavigation,usePopover:!!this.usePopover});return(this.height||this.height===0)&&(n.height=this.height),(this.minWidth||this.minWidth===0)&&(n.minWidth=this.minWidth),(this.minHeight||this.minHeight===0)&&(n.minHeight=this.minHeight),this.backdropClass&&(n.backdropClass=this.backdropClass),this.panelClass&&(n.panelClass=this.panelClass),n}_updatePositionStrategy(e){let n=this.positions.map(a=>({originX:a.originX,originY:a.originY,overlayX:a.overlayX,overlayY:a.overlayY,offsetX:a.offsetX||this.offsetX,offsetY:a.offsetY||this.offsetY,panelClass:a.panelClass||void 0}));return e.setOrigin(this._getOrigin()).withPositions(n).withFlexibleDimensions(this.flexibleDimensions).withPush(this.push).withGrowAfterOpen(this.growAfterOpen).withViewportMargin(this.viewportMargin).withLockedPosition(this.lockPosition).withTransformOriginOn(this.transformOriginSelector).withPopoverLocation(this.usePopover===null?`global`:this.usePopover)}_createPositionStrategy(){let e=Ji(this._injector,this._getOrigin());return this._updatePositionStrategy(e),e}_getOrigin(){return this.origin instanceof vt?this.origin.elementRef:this.origin}_getOriginElement(){return this.origin instanceof vt?this.origin.elementRef.nativeElement:this.origin instanceof Ye$1?this.origin.nativeElement:typeof Element<`u`&&this.origin instanceof Element?this.origin:null}_getWidth(){return this.width?this.width:this.matchWidth?this._getOriginElement()?.getBoundingClientRect?.().width:void 0}attachOverlay(){this._overlayRef||this._createOverlay();let e=this._overlayRef;e.getConfig().hasBackdrop=this.hasBackdrop,e.updateSize({width:this._getWidth()}),e.hasAttached()||e.attach(this._templatePortal),this.hasBackdrop?this._backdropSubscription=e.backdropClick().subscribe(n=>this.backdropClick.emit(n)):this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.positionChange.observers.length>0&&(this._positionSubscription=this._position.positionChanges.pipe(fD(()=>this.positionChange.observers.length>0)).subscribe(n=>{this._ngZone.run(()=>this.positionChange.emit(n)),this.positionChange.observers.length===0&&this._positionSubscription.unsubscribe()})),this.open=!0}detachOverlay(){this._overlayRef?.detach(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.open=!1}_assignConfig(e){this.origin=e.origin??this.origin,this.positions=e.positions??this.positions,this.positionStrategy=e.positionStrategy??this.positionStrategy,this.offsetX=e.offsetX??this.offsetX,this.offsetY=e.offsetY??this.offsetY,this.width=e.width??this.width,this.height=e.height??this.height,this.minWidth=e.minWidth??this.minWidth,this.minHeight=e.minHeight??this.minHeight,this.backdropClass=e.backdropClass??this.backdropClass,this.panelClass=e.panelClass??this.panelClass,this.viewportMargin=e.viewportMargin??this.viewportMargin,this.scrollStrategy=e.scrollStrategy??this.scrollStrategy,this.disableClose=e.disableClose??this.disableClose,this.transformOriginSelector=e.transformOriginSelector??this.transformOriginSelector,this.hasBackdrop=e.hasBackdrop??this.hasBackdrop,this.lockPosition=e.lockPosition??this.lockPosition,this.flexibleDimensions=e.flexibleDimensions??this.flexibleDimensions,this.growAfterOpen=e.growAfterOpen??this.growAfterOpen,this.push=e.push??this.push,this.disposeOnNavigation=e.disposeOnNavigation??this.disposeOnNavigation,this.usePopover=e.usePopover??this.usePopover,this.matchWidth=e.matchWidth??this.matchWidth}static ɵfac=function(n){return new(n||i)};static ɵdir=yr$1({type:i,selectors:[[``,`cdk-connected-overlay`,``],[``,`connected-overlay`,``],[``,`cdkConnectedOverlay`,``]],inputs:{origin:[0,`cdkConnectedOverlayOrigin`,`origin`],positions:[0,`cdkConnectedOverlayPositions`,`positions`],positionStrategy:[0,`cdkConnectedOverlayPositionStrategy`,`positionStrategy`],offsetX:[0,`cdkConnectedOverlayOffsetX`,`offsetX`],offsetY:[0,`cdkConnectedOverlayOffsetY`,`offsetY`],width:[0,`cdkConnectedOverlayWidth`,`width`],height:[0,`cdkConnectedOverlayHeight`,`height`],minWidth:[0,`cdkConnectedOverlayMinWidth`,`minWidth`],minHeight:[0,`cdkConnectedOverlayMinHeight`,`minHeight`],backdropClass:[0,`cdkConnectedOverlayBackdropClass`,`backdropClass`],panelClass:[0,`cdkConnectedOverlayPanelClass`,`panelClass`],viewportMargin:[0,`cdkConnectedOverlayViewportMargin`,`viewportMargin`],scrollStrategy:[0,`cdkConnectedOverlayScrollStrategy`,`scrollStrategy`],open:[0,`cdkConnectedOverlayOpen`,`open`],disableClose:[0,`cdkConnectedOverlayDisableClose`,`disableClose`],transformOriginSelector:[0,`cdkConnectedOverlayTransformOriginOn`,`transformOriginSelector`],hasBackdrop:[2,`cdkConnectedOverlayHasBackdrop`,`hasBackdrop`,jm],lockPosition:[2,`cdkConnectedOverlayLockPosition`,`lockPosition`,jm],flexibleDimensions:[2,`cdkConnectedOverlayFlexibleDimensions`,`flexibleDimensions`,jm],growAfterOpen:[2,`cdkConnectedOverlayGrowAfterOpen`,`growAfterOpen`,jm],push:[2,`cdkConnectedOverlayPush`,`push`,jm],disposeOnNavigation:[2,`cdkConnectedOverlayDisposeOnNavigation`,`disposeOnNavigation`,e=>e===`url-change`||e===`pop-state`?e:jm(e)],usePopover:[0,`cdkConnectedOverlayUsePopover`,`usePopover`],matchWidth:[2,`cdkConnectedOverlayMatchWidth`,`matchWidth`,jm],_config:[0,`cdkConnectedOverlay`,`_config`]},outputs:{backdropClick:`backdropClick`,positionChange:`positionChange`,attach:`attach`,detach:`detach`,overlayKeydown:`overlayKeydown`,overlayOutsideClick:`overlayOutsideClick`},exportAs:[`cdkConnectedOverlay`],features:[wo$1]})}return i})();var ta=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵmod=Ze$1({type:i});static ɵinj=Ae({providers:[ko],imports:[av,no,Wi,Wi]})}return i})();var wo=Symbol(`FIELD_TREE`);function $t(i){return typeof i==`function`&&i[wo]===!0}var qn=new m(``);var na=class{_box;_destroyed=new $;_resizeSubject=new $;_resizeObserver;_elementObservables=new Map;constructor(t){this._box=t,typeof ResizeObserver<`u`&&(this._resizeObserver=new ResizeObserver(e=>this._resizeSubject.next(e)))}observe(t){return this._elementObservables.has(t)||this._elementObservables.set(t,new M(e=>{let n=this._resizeSubject.subscribe(e);return this._resizeObserver?.observe(t,{box:this._box}),()=>{this._resizeObserver?.unobserve(t),n.unsubscribe(),this._elementObservables.delete(t)}}).pipe(Jt(e=>e.some(n=>n.target===t)),_i$1({bufferSize:1,refCount:!0}),Xa$1(this._destroyed))),this._elementObservables.get(t)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}};var No=(()=>{class i{_cleanupErrorListener;_observers=new Map;_ngZone=g(ee);constructor(){}ngOnDestroy(){for(let[,e]of this._observers)e.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(e,n){let a=n?.box||`content-box`;return this._observers.has(a)||this._observers.set(a,new na(a)),this._observers.get(a).observe(e)}static ɵfac=function(n){return new(n||i)};static ɵprov=pe({token:i,factory:i.ɵfac})}return i})();var ia=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵdir=yr$1({type:i,selectors:[[`mat-label`]]})}return i})();var cl=new m(`MatError`);var aa=(()=>{class i{align=`start`;id=g(fe).getId(`mat-mdc-hint-`);static ɵfac=function(n){return new(n||i)};static ɵdir=yr$1({type:i,selectors:[[`mat-hint`]],hostAttrs:[1,`mat-mdc-form-field-hint`,`mat-mdc-form-field-bottom-align`],hostVars:4,hostBindings:function(n,a){n&2&&(Hs$1(`id`,a.id),No$1(`align`,null),$s$1(`mat-mdc-form-field-hint-end`,a.align===`end`))},inputs:{align:`align`,id:`id`}})}return i})();var dl=new m(`MatPrefix`);var ml=new m(`MatSuffix`);var Fo=new m(`FloatingLabelParent`);var Eo=(()=>{class i{_elementRef=g(Ye$1);get floating(){return this._floating}set floating(e){this._floating=e,this.monitorResize&&this._handleResize()}_floating=!1;get monitorResize(){return this._monitorResize}set monitorResize(e){this._monitorResize=e,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe()}_monitorResize=!1;_resizeObserver=g(No);_ngZone=g(ee);_parent=g(Fo);_resizeSubscription=new X;ngOnDestroy(){this._resizeSubscription.unsubscribe()}getWidth(){return ul(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized())}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:`border-box`}).subscribe(()=>this._handleResize())})}static ɵfac=function(n){return new(n||i)};static ɵdir=yr$1({type:i,selectors:[[`label`,`matFormFieldFloatingLabel`,``]],hostAttrs:[1,`mdc-floating-label`,`mat-mdc-floating-label`],hostVars:2,hostBindings:function(n,a){n&2&&$s$1(`mdc-floating-label--float-above`,a.floating)},inputs:{floating:`floating`,monitorResize:`monitorResize`}})}return i})();function ul(i){let t=i;if(t.offsetParent!==null)return t.scrollWidth;let e=t.cloneNode(!0);e.style.setProperty(`position`,`absolute`),e.style.setProperty(`transform`,`translate(-9999px, -9999px)`),document.documentElement.appendChild(e);let n=e.scrollWidth;return e.remove(),n}var Do=`mdc-line-ripple--active`;var Xn=`mdc-line-ripple--deactivating`;var Oo=(()=>{class i{_elementRef=g(Ye$1);_cleanupTransitionEnd;constructor(){let e=g(ee),n=g(dr$1);e.runOutsideAngular(()=>{this._cleanupTransitionEnd=n.listen(this._elementRef.nativeElement,`transitionend`,this._handleTransitionEnd)})}activate(){let e=this._elementRef.nativeElement.classList;e.remove(Xn),e.add(Do)}deactivate(){this._elementRef.nativeElement.classList.add(Xn)}_handleTransitionEnd=e=>{let n=this._elementRef.nativeElement.classList,a=n.contains(Xn);e.propertyName===`opacity`&&a&&n.remove(Do,Xn)};ngOnDestroy(){this._cleanupTransitionEnd()}static ɵfac=function(n){return new(n||i)};static ɵdir=yr$1({type:i,selectors:[[`div`,`matFormFieldLineRipple`,``]],hostAttrs:[1,`mdc-line-ripple`]})}return i})();var Io=(()=>{class i{_elementRef=g(Ye$1);_ngZone=g(ee);open=!1;_notch;ngAfterViewInit(){let e=this._elementRef.nativeElement,n=e.querySelector(`.mdc-floating-label`);n?(e.classList.add(`mdc-notched-outline--upgraded`),typeof requestAnimationFrame==`function`&&(n.style.transitionDuration=`0s`,this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>n.style.transitionDuration=``)}))):e.classList.add(`mdc-notched-outline--no-label`)}_setNotchWidth(e){let n=this._notch.nativeElement;!this.open||!e?n.style.width=``:n.style.width=`calc(${e}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`}_setMaxWidth(e){this._notch.nativeElement.style.setProperty(`--mat-form-field-notch-max-width`,`calc(100% - ${e}px)`)}static ɵfac=function(n){return new(n||i)};static ɵcmp=(function(){let e=[`notch`];return Sn$1({type:i,selectors:[[`div`,`matFormFieldNotchedOutline`,``]],viewQuery:function(r,o){if(r&1&&pm(e,5),r&2){let m;nC(m=rC())&&(o._notch=m.first)}},hostAttrs:[1,`mdc-notched-outline`],hostVars:2,hostBindings:function(r,o){r&2&&$s$1(`mdc-notched-outline--notched`,o.open)},inputs:{open:[0,`matFormFieldNotchedOutlineOpen`,`open`]},ngContentSelectors:[`*`],decls:5,vars:0,consts:[[`notch`,``],[1,`mat-mdc-notch-piece`,`mdc-notched-outline__leading`],[1,`mat-mdc-notch-piece`,`mdc-notched-outline__notch`],[1,`mat-mdc-notch-piece`,`mdc-notched-outline__trailing`]],template:function(r,o){r&1&&(Ul$1(),Us$1(0,`div`,1),Vl$1(1,`div`,2,0),Hl$1(3),Bl$1(),Us$1(4,`div`,3))},encapsulation:2})})()}return i})();var qt=(()=>{class i{id;ngField=null;ngControl=null;focused=!1;empty=!1;shouldLabelFloat=!1;required=!1;disabled=!1;errorState=!1;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;stateChanges=null;value;static ɵfac=function(n){return new(n||i)};static ɵdir=yr$1({type:i})}return i})();var Xt=new m(`MatFormField`);var pl=new m(`MAT_FORM_FIELD_DEFAULT_OPTIONS`);var Ao=`fill`;var fl=`auto`;var Ro=`fixed`;var hl=`translateY(-50%)`;var To=(()=>{class i{_elementRef=g(Ye$1);_changeDetectorRef=g(Ys$1);_platform=g(ne);_idGenerator=g(fe);_ngZone=g(ee);_defaults=g(pl,{optional:!0});_currentDirection;_unwrapMaybeSignal(e){return fo$1(e)?e():e}_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=XU(`iconPrefixContainer`);_textPrefixContainerSignal=XU(`textPrefixContainer`);_iconSuffixContainerSignal=XU(`iconSuffixContainer`);_textSuffixContainerSignal=XU(`textSuffixContainer`);_prefixSuffixContainers=vr$1(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(e=>e?.nativeElement).filter(e=>e!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=eH(ia);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(e){this._hideRequiredMarker=bt(e)}_hideRequiredMarker=!1;color=`primary`;get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||fl}set floatLabel(e){e!==this._floatLabel&&(this._floatLabel=e,this._changeDetectorRef.markForCheck())}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(e){let n=e||this._defaults?.appearance||Ao;this._appearanceSignal.set(n)}_appearanceSignal=Le(Ao);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||Ro}set subscriptSizing(e){this._subscriptSizing=e||this._defaults?.subscriptSizing||Ro}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(e){this._hintLabel=e,this._processHints()}_hintLabel=``;_hasIconPrefix=!1;_hasTextPrefix=!1;_hasIconSuffix=!1;_hasTextSuffix=!1;_labelId=this._idGenerator.getId(`mat-mdc-form-field-label-`);_hintLabelId=this._idGenerator.getId(`mat-mdc-hint-`);_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(e){this._explicitFormFieldControl=e}_destroyed=new $;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=Ce();constructor(){let e=this._defaults,n=g(Y_);e&&(e.appearance&&(this.appearance=e.appearance),this._hideRequiredMarker=!!e?.hideRequiredMarker,e.color&&(this.color=e.color)),lo$1(()=>this._currentDirection=n.valueSignal()),this._syncOutlineLabelOffset()}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add(`mat-form-field-animations-enabled`)},300)}),this._changeDetectorRef.detectChanges()}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix()}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=$t(this._control.ngField)?null:this._control.ngControl.control.validator),this._previousControl=this._control,this._changeDetectorRef.markForCheck()),this._control.ngControl&&this._control.ngControl.control&&!$t(this._control.ngField)&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck()}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete()}getLabelId=vr$1(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel=`always`)}_initializeControl(e){let n=this._control,a=`mat-mdc-form-field-type-`;e&&this._elementRef.nativeElement.classList.remove(a+e.controlType),n.controlType&&this._elementRef.nativeElement.classList.add(a+n.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=n.stateChanges?.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck()}),this._describedByChanges?.unsubscribe(),this._describedByChanges=n.stateChanges?.pipe(dD([void 0,void 0]),P(()=>[this._unwrapMaybeSignal(n.errorState),n.userAriaDescribedBy]),uD(),Jt(([[r,o],[m,f]])=>r!==m||o!==f)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),n.ngControl&&n.ngControl.valueChanges&&!$t(n.ngField)&&(this._valueChanges=n.ngControl.valueChanges.pipe(Xa$1(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()))}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(e=>!e._isText),this._hasTextPrefix=!!this._prefixChildren.find(e=>e._isText),this._hasIconSuffix=!!this._suffixChildren.find(e=>!e._isText),this._hasTextSuffix=!!this._suffixChildren.find(e=>e._isText)}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),Jv(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck()})}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck()}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck()}),this._validateHints(),this._syncDescribedByIds()}_assertFormFieldControl(){this._control}_updateFocusState(){let e=this._unwrapMaybeSignal(this._control.focused);e&&!this._isFocused?(this._isFocused=!0,this._lineRipple?.activate()):!e&&(this._isFocused||this._isFocused===null)&&(this._isFocused=!1,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle(`mat-focused`,e),this._textField?.nativeElement.classList.toggle(`mdc-text-field--focused`,e)}_syncOutlineLabelOffset(){rH({earlyRead:()=>{if(this._appearanceSignal()!==`outline`)return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset())});for(let e of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(e,{box:`border-box`})}return this._getOutlinedLabelOffset()},write:e=>this._writeOutlinedLabelStyles(e())})}_shouldAlwaysFloat(){return this.floatLabel===`always`}_hasOutline(){return this.appearance===`outline`}_forceDisplayInfixLabel(){return!this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=vr$1(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._shouldAlwaysFloat()||this._unwrapMaybeSignal(this._control.shouldLabelFloat):!1}_shouldForward(e){let n=this._control?.ngField||this._control?.ngControl;if(!n)return!1;if($t(n)){let a=n();return e===`valid`?a.valid():e===`dirty`?a.dirty():e===`touched`?a.touched():e===`pending`?a.pending():e===`untouched`?!a.touched():e===`pristine`?!a.dirty():e===`invalid`?!a.valid():!1}else{let a=n;return e===`valid`?a.valid:e===`dirty`?a.dirty:e===`touched`?a.touched:e===`pending`?a.pending:e===`untouched`?a.untouched:e===`pristine`?a.pristine:e===`invalid`?a.invalid:!1}}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._unwrapMaybeSignal(this._control.errorState)?`error`:`hint`}_handleLabelResized(){this._refreshOutlineNotchWidth()}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth())}_processHints(){this._validateHints(),this._syncDescribedByIds()}_validateHints(){this._hintChildren}_syncDescribedByIds(){if(this._control){let e=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy==`string`&&e.push(...this._control.userAriaDescribedBy.split(` `)),this._getSubscriptMessageType()===`hint`){let r=this._hintChildren?this._hintChildren.find(m=>m.align===`start`):null,o=this._hintChildren?this._hintChildren.find(m=>m.align===`end`):null;r?e.push(r.id):this._hintLabel&&e.push(this._hintLabelId),o&&e.push(o.id)}else this._errorChildren&&e.push(...this._errorChildren.map(r=>r.id));let n=this._control.describedByIds,a;if(n){let r=this._describedByIds||e;a=e.concat(n.filter(o=>o&&!r.includes(o)))}else a=e;this._control.setDescribedByIds(a),this._describedByIds=e}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return[``,null];if(!this._isAttachedToDom())return null;let e=this._iconPrefixContainer?.nativeElement,n=this._textPrefixContainer?.nativeElement,a=this._iconSuffixContainer?.nativeElement,r=this._textSuffixContainer?.nativeElement,o=e?.getBoundingClientRect().width??0,m=n?.getBoundingClientRect().width??0,f=a?.getBoundingClientRect().width??0,v=r?.getBoundingClientRect().width??0;return[`var(--mat-mdc-form-field-label-transform, ${hl} translateX(${`calc(${this._currentDirection===`rtl`?`-1`:`1`} * (${`${o+m}px`} + var(--mat-mdc-form-field-label-offset-x, 0px)))`}))`,o+m+f+v]}_writeOutlinedLabelStyles(e){if(e!==null){let[n,a]=e;this._floatingLabel&&(this._floatingLabel.element.style.transform=n),a!==null&&this._notchedOutline?._setMaxWidth(a)}}_isAttachedToDom(){let e=this._elementRef.nativeElement;if(e.getRootNode){let n=e.getRootNode();return n&&n!==e}return document.documentElement.contains(e)}static ɵfac=function(n){return new(n||i)};static ɵcmp=(function(){let e=[`iconPrefixContainer`],n=[`textPrefixContainer`],a=[`iconSuffixContainer`],r=[`textSuffixContainer`],o=[`textField`],m=[`*`,[[`mat-label`]],[[``,`matPrefix`,``],[``,`matIconPrefix`,``]],[[``,`matTextPrefix`,``]],[[``,`matTextSuffix`,``]],[[``,`matSuffix`,``],[``,`matIconSuffix`,``]],[[`mat-error`],[``,`matError`,``]],[[`mat-hint`,3,`align`,`end`]],[[`mat-hint`,`align`,`end`]]],f=[`*`,`mat-label`,`[matPrefix], [matIconPrefix]`,`[matTextPrefix]`,`[matTextSuffix]`,`[matSuffix], [matIconSuffix]`,`mat-error, [matError]`,`mat-hint:not([align='end'])`,`mat-hint[align='end']`];function v(w,X){w&1&&sm(0,`span`,21)}function u(w,X){if(w&1&&(_s$1(0,`label`,20),Hl$1(1,1),jb(2,v,1,0,`span`,21),jl$1()),w&2){let p=Xb(2);im(`floating`,p._shouldLabelFloat())(`monitorResize`,p._hasOutline())(`id`,p._labelId),No$1(`for`,p._control.disableAutomaticLabeling?null:p._control.id),ew(2),Bb(!p.hideRequiredMarker&&p._unwrapMaybeSignal(p._control.required)?2:-1)}}function _(w,X){if(w&1&&jb(0,u,3,5,`label`,20),w&2){let p=Xb();Bb(p._hasFloatingLabel()?0:-1)}}function O(w,X){w&1&&sm(0,`div`,7)}function h(w,X){}function S(w,X){if(w&1&&tm(0,h,0,0,`ng-template`,13),w&2){Xb(2);let p=iC(1);im(`ngTemplateOutlet`,p)}}function V(w,X){if(w&1&&(_s$1(0,`div`,9),jb(1,S,1,1,null,13),jl$1()),w&2){let p=Xb();im(`matFormFieldNotchedOutlineOpen`,p._shouldLabelFloat()),ew(),Bb(p._forceDisplayInfixLabel()?-1:1)}}function Te(w,X){w&1&&(_s$1(0,`div`,10,2),Hl$1(2,2),jl$1())}function Yt(w,X){w&1&&(_s$1(0,`div`,11,3),Hl$1(2,3),jl$1())}function xt(w,X){}function Zt(w,X){if(w&1&&tm(0,xt,0,0,`ng-template`,13),w&2){Xb();let p=iC(1);im(`ngTemplateOutlet`,p)}}function Zo(w,X){w&1&&(_s$1(0,`div`,14,4),Hl$1(2,4),jl$1())}function Qo(w,X){w&1&&(_s$1(0,`div`,15,5),Hl$1(2,5),jl$1())}function Jo(w,X){w&1&&sm(0,`div`,16)}function es(w,X){w&1&&(_s$1(0,`div`,18),Hl$1(1,6),jl$1())}function ts(w,X){if(w&1&&(_s$1(0,`mat-hint`,22),SC(1),jl$1()),w&2){let p=Xb(2);im(`id`,p._hintLabelId),ew(),Cm(p.hintLabel)}}function ns(w,X){if(w&1&&(_s$1(0,`div`,19),jb(1,ts,2,2,`mat-hint`,22),Hl$1(2,7),sm(3,`div`,23),Hl$1(4,8),jl$1()),w&2){let p=Xb();ew(),Bb(p.hintLabel?1:-1)}}return Sn$1({type:i,selectors:[[`mat-form-field`]],contentQueries:function(X,p,K){if(X&1&&(hm(K,p._labelChild,ia,5),fm(K,qt,5)(K,dl,5)(K,ml,5)(K,cl,5)(K,aa,5)),X&2){oC();let be;nC(be=rC())&&(p._formFieldControl=be.first),nC(be=rC())&&(p._prefixChildren=be),nC(be=rC())&&(p._suffixChildren=be),nC(be=rC())&&(p._errorChildren=be),nC(be=rC())&&(p._hintChildren=be)}},viewQuery:function(X,p){if(X&1&&(gm(p._iconPrefixContainerSignal,e,5)(p._textPrefixContainerSignal,n,5)(p._iconSuffixContainerSignal,a,5)(p._textSuffixContainerSignal,r,5),pm(o,5)(e,5)(n,5)(a,5)(r,5)(Eo,5)(Io,5)(Oo,5)),X&2){oC(4);let K;nC(K=rC())&&(p._textField=K.first),nC(K=rC())&&(p._iconPrefixContainer=K.first),nC(K=rC())&&(p._textPrefixContainer=K.first),nC(K=rC())&&(p._iconSuffixContainer=K.first),nC(K=rC())&&(p._textSuffixContainer=K.first),nC(K=rC())&&(p._floatingLabel=K.first),nC(K=rC())&&(p._notchedOutline=K.first),nC(K=rC())&&(p._lineRipple=K.first)}},hostAttrs:[1,`mat-mdc-form-field`],hostVars:38,hostBindings:function(X,p){X&2&&$s$1(`mat-mdc-form-field-label-always-float`,p._shouldAlwaysFloat())(`mat-mdc-form-field-has-icon-prefix`,p._hasIconPrefix)(`mat-mdc-form-field-has-icon-suffix`,p._hasIconSuffix)(`mat-form-field-invalid`,p._unwrapMaybeSignal(p._control.errorState))(`mat-form-field-disabled`,p._unwrapMaybeSignal(p._control.disabled))(`mat-form-field-autofilled`,p._unwrapMaybeSignal(p._control.autofilled))(`mat-form-field-appearance-fill`,p.appearance==`fill`)(`mat-form-field-appearance-outline`,p.appearance==`outline`)(`mat-form-field-hide-placeholder`,p._hasFloatingLabel()&&!p._shouldLabelFloat())(`mat-primary`,p.color!==`accent`&&p.color!==`warn`)(`mat-accent`,p.color===`accent`)(`mat-warn`,p.color===`warn`)(`ng-untouched`,p._shouldForward(`untouched`))(`ng-touched`,p._shouldForward(`touched`))(`ng-pristine`,p._shouldForward(`pristine`))(`ng-dirty`,p._shouldForward(`dirty`))(`ng-valid`,p._shouldForward(`valid`))(`ng-invalid`,p._shouldForward(`invalid`))(`ng-pending`,p._shouldForward(`pending`))},inputs:{hideRequiredMarker:`hideRequiredMarker`,color:`color`,floatLabel:`floatLabel`,appearance:`appearance`,subscriptSizing:`subscriptSizing`,hintLabel:`hintLabel`},exportAs:[`matFormField`],features:[Nm([{provide:Xt,useExisting:i},{provide:Fo,useExisting:i}])],ngContentSelectors:f,decls:18,vars:21,consts:[[`labelTemplate`,``],[`textField`,``],[`iconPrefixContainer`,``],[`textPrefixContainer`,``],[`textSuffixContainer`,``],[`iconSuffixContainer`,``],[1,`mat-mdc-text-field-wrapper`,`mdc-text-field`,3,`click`],[1,`mat-mdc-form-field-focus-overlay`],[1,`mat-mdc-form-field-flex`],[`matFormFieldNotchedOutline`,``,3,`matFormFieldNotchedOutlineOpen`],[1,`mat-mdc-form-field-icon-prefix`],[1,`mat-mdc-form-field-text-prefix`],[1,`mat-mdc-form-field-infix`],[3,`ngTemplateOutlet`],[1,`mat-mdc-form-field-text-suffix`],[1,`mat-mdc-form-field-icon-suffix`],[`matFormFieldLineRipple`,``],[`aria-atomic`,`true`,`aria-live`,`polite`,1,`mat-mdc-form-field-subscript-wrapper`,`mat-mdc-form-field-bottom-align`],[1,`mat-mdc-form-field-error-wrapper`],[1,`mat-mdc-form-field-hint-wrapper`],[`matFormFieldFloatingLabel`,``,3,`floating`,`monitorResize`,`id`],[`aria-hidden`,`true`,1,`mat-mdc-form-field-required-marker`,`mdc-floating-label--required`],[3,`id`],[1,`mat-mdc-form-field-hint-spacer`]],template:function(X,p){if(X&1&&(Ul$1(m),tm(0,_,1,1,`ng-template`,null,0,OC),_s$1(2,`div`,6,1),dm(`click`,function(be){return p._control.onContainerClick(be)}),jb(4,O,1,0,`div`,7),_s$1(5,`div`,8),jb(6,V,2,2,`div`,9),jb(7,Te,3,0,`div`,10),jb(8,Yt,3,0,`div`,11),_s$1(9,`div`,12),jb(10,Zt,1,1,null,13),Hl$1(11),jl$1(),jb(12,Zo,3,0,`div`,14),jb(13,Qo,3,0,`div`,15),jl$1(),jb(14,Jo,1,0,`div`,16),jl$1(),_s$1(15,`div`,17),jb(16,es,2,0,`div`,18)(17,ns,5,1,`div`,19),jl$1()),X&2){let K,be=p._unwrapMaybeSignal(p._control.disabled);ew(2),$s$1(`mdc-text-field--filled`,!p._hasOutline())(`mdc-text-field--outlined`,p._hasOutline())(`mdc-text-field--no-label`,!p._hasFloatingLabel())(`mdc-text-field--disabled`,be)(`mdc-text-field--invalid`,p._unwrapMaybeSignal(p._control.errorState)),ew(2),Bb(!p._hasOutline()&&!be?4:-1),ew(2),Bb(p._hasOutline()?6:-1),ew(),Bb(p._hasIconPrefix?7:-1),ew(),Bb(p._hasTextPrefix?8:-1),ew(2),Bb(!p._hasOutline()||p._forceDisplayInfixLabel()?10:-1),ew(2),Bb(p._hasTextSuffix?12:-1),ew(),Bb(p._hasIconSuffix?13:-1),ew(),Bb(p._hasOutline()?-1:14),ew(),$s$1(`mat-mdc-form-field-subscript-dynamic-size`,p.subscriptSizing===`dynamic`);let is=p._getSubscriptMessageType();ew(),Bb((K=is)===`error`?16:K===`hint`?17:-1)}},dependencies:[Eo,Io,DT,Oo,aa],styles:[`.mdc-text-field {
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
`],encapsulation:2})})()}return i})();var Po=(()=>{class i{_animationsDisabled=Ce();state=`unchecked`;disabled=!1;appearance=`full`;static ɵfac=function(n){return new(n||i)};static ɵcmp=Sn$1({type:i,selectors:[[`mat-pseudo-checkbox`]],hostAttrs:[1,`mat-pseudo-checkbox`],hostVars:12,hostBindings:function(n,a){n&2&&$s$1(`mat-pseudo-checkbox-indeterminate`,a.state===`indeterminate`)(`mat-pseudo-checkbox-checked`,a.state===`checked`)(`mat-pseudo-checkbox-disabled`,a.disabled)(`mat-pseudo-checkbox-minimal`,a.appearance===`minimal`)(`mat-pseudo-checkbox-full`,a.appearance===`full`)(`_mat-animation-noopable`,a._animationsDisabled)},inputs:{state:`state`,disabled:`disabled`,appearance:`appearance`},decls:0,vars:0,template:function(n,a){},styles:[`.mat-pseudo-checkbox {
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
`],encapsulation:2})}return i})();var oa=new m(`MAT_OPTION_PARENT_COMPONENT`);var sa=new m(`MatOptgroup`);var ra=class{source;isUserInput;constructor(t,e=!1){this.source=t,this.isUserInput=e}};var Xe=(()=>{class i{_element=g(Ye$1);_changeDetectorRef=g(Ys$1);_parent=g(oa,{optional:!0});group=g(sa,{optional:!0});_signalDisableRipple=!1;_selected=!1;_active=!1;_mostRecentViewValue=``;get multiple(){return this._parent&&this._parent.multiple}get selected(){return this._selected}value;id=g(fe).getId(`mat-option-`);get disabled(){return this.group&&this.group.disabled||this._disabled()}set disabled(e){this._disabled.set(e)}_disabled=Le(!1);get disableRipple(){return this._signalDisableRipple?this._parent.disableRipple():!!this._parent?.disableRipple}get hideSingleSelectionIndicator(){return!!(this._parent&&this._parent.hideSingleSelectionIndicator)}onSelectionChange=new Ne;_text;_stateChanges=new $;constructor(){let e=g(z_);e.load(ft),e.load(Yz),this._signalDisableRipple=!!this._parent&&fo$1(this._parent.disableRipple)}get active(){return this._active}get viewValue(){return(this._text?.nativeElement.textContent||``).trim()}select(e=!0){this._selected||(this._selected=!0,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}deselect(e=!0){this._selected&&(this._selected=!1,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}focus(e,n){let a=this._getHostElement();typeof a.focus==`function`&&a.focus(n)}setActiveStyles(){this._active||(this._active=!0,this._changeDetectorRef.markForCheck())}setInactiveStyles(){this._active&&(this._active=!1,this._changeDetectorRef.markForCheck())}getLabel(){return this.viewValue}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!He(e)&&(this._selectViaInteraction(),e.preventDefault())}_selectViaInteraction(){this.disabled||(this._selected=this.multiple?!this._selected:!0,this._changeDetectorRef.markForCheck(),this._emitSelectionChangeEvent(!0))}_getTabIndex(){return this.disabled?`-1`:`0`}_getHostElement(){return this._element.nativeElement}ngAfterViewChecked(){if(this._selected){let e=this.viewValue;e!==this._mostRecentViewValue&&(this._mostRecentViewValue&&this._stateChanges.next(),this._mostRecentViewValue=e)}}ngOnDestroy(){this._stateChanges.complete()}_emitSelectionChangeEvent(e=!1){this.onSelectionChange.emit(new ra(this,e))}static ɵfac=function(n){return new(n||i)};static ɵcmp=(function(){let e=[`text`],n=[[[`mat-icon`]],`*`],a=[`mat-icon`,`*`];function r(f,v){if(f&1&&sm(0,`mat-pseudo-checkbox`,1),f&2){let u=Xb();im(`disabled`,u.disabled)(`state`,u.selected?`checked`:`unchecked`)}}function o(f,v){if(f&1&&sm(0,`mat-pseudo-checkbox`,3),f&2){let u=Xb();im(`disabled`,u.disabled)}}function m(f,v){if(f&1&&(_s$1(0,`span`,4),SC(1),jl$1()),f&2){let u=Xb();ew(),zl$1(`(`,u.group.label,`)`)}}return Sn$1({type:i,selectors:[[`mat-option`]],viewQuery:function(v,u){if(v&1&&pm(e,7),v&2){let _;nC(_=rC())&&(u._text=_.first)}},hostAttrs:[`role`,`option`,1,`mat-mdc-option`,`mdc-list-item`],hostVars:11,hostBindings:function(v,u){v&1&&dm(`click`,function(){return u._selectViaInteraction()})(`keydown`,function(O){return u._handleKeydown(O)}),v&2&&(Hs$1(`id`,u.id),No$1(`aria-selected`,u.selected)(`aria-disabled`,u.disabled.toString()),$s$1(`mdc-list-item--selected`,u.selected)(`mat-mdc-option-multiple`,u.multiple)(`mat-mdc-option-active`,u.active)(`mdc-list-item--disabled`,u.disabled))},inputs:{value:`value`,id:`id`,disabled:[2,`disabled`,`disabled`,jm]},outputs:{onSelectionChange:`onSelectionChange`},exportAs:[`matOption`],ngContentSelectors:a,decls:8,vars:5,consts:[[`text`,``],[`aria-hidden`,`true`,1,`mat-mdc-option-pseudo-checkbox`,3,`disabled`,`state`],[1,`mdc-list-item__primary-text`],[`state`,`checked`,`aria-hidden`,`true`,`appearance`,`minimal`,1,`mat-mdc-option-pseudo-checkbox`,3,`disabled`],[1,`cdk-visually-hidden`],[`aria-hidden`,`true`,`mat-ripple`,``,1,`mat-mdc-option-ripple`,`mat-focus-indicator`,3,`matRippleTrigger`,`matRippleDisabled`]],template:function(v,u){v&1&&(Ul$1(n),jb(0,r,1,2,`mat-pseudo-checkbox`,1),Hl$1(1),_s$1(2,`span`,2,0),Hl$1(4,1),jl$1(),jb(5,o,1,1,`mat-pseudo-checkbox`,3),jb(6,m,2,1,`span`,4),sm(7,`div`,5)),v&2&&(Bb(u.multiple?0:-1),ew(5),Bb(!u.multiple&&u.selected&&!u.hideSingleSelectionIndicator?5:-1),ew(),Bb(u.group&&u.group._inert?6:-1),ew(),im(`matRippleTrigger`,u._getHostElement())(`matRippleDisabled`,u.disabled||u.disableRipple))},dependencies:[Po,Rn],styles:[`.mat-mdc-option {
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
`],encapsulation:2})})()}return i})();function Vo(i,t,e){if(e.length){let n=t.toArray(),a=e.toArray(),r=0;for(let o=0;o<i+1;o++)n[o].group&&n[o].group===a[r]&&r++;return r}return 0}function Lo(i,t,e,n){return i<e?i:i+t>e+n?Math.max(0,i-n+t):e}var Zn=(()=>{class i{isErrorState(e,n){return!!(e&&e.invalid&&(e.touched||n&&n.submitted))}isSignalErrorState(e){if(!e)return!1;let n=e().invalid(),a=e().touched();return n&&a}static ɵfac=function(n){return new(n||i)};static ɵprov=pe({token:i,factory:i.ɵfac})}return i})();var yt=class{_defaultMatcher;_parentFormGroup;_parentForm;_stateChanges;errorState=!1;matcher;ngControl;formField;constructor(t,e,n,a,r){this._defaultMatcher=t,this._parentFormGroup=n,this._parentForm=a,this._stateChanges=r,e?fo$1(e.field)&&!e.updateValueAndValidity?(this.formField=e,this.ngControl=null):(this.formField=null,this.ngControl=e):this.ngControl=this.formField=null}updateErrorState(){let t=this.errorState,e=this._getCurrentErrorState(this.matcher||this._defaultMatcher);e!==t&&(this.errorState=e,this._stateChanges.next())}_getCurrentErrorState(t){if(this.formField&&t?.isSignalErrorState)return t.isSignalErrorState(this.formField.field())??!1;let e=this._parentFormGroup||this._parentForm,n=this.ngControl?this.ngControl.control:null;return t?.isErrorState(n,e)??!1}};var Kt=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵmod=Ze$1({type:i});static ɵinj=Ae({imports:[nr,To,av]})}return i})();var zo=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵmod=Ze$1({type:i});static ɵinj=Ae({imports:[av]})}return i})();var la=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵmod=Ze$1({type:i});static ɵinj=Ae({imports:[Tn,zo,Xe,av]})}return i})();var bl=new m(`mat-select-scroll-strategy`,{providedIn:`root`,factory:()=>{let i=g(G);return()=>Ut(i)}});var gl=new m(`MAT_SELECT_CONFIG`);var Bo=new m(`MatSelectTrigger`);var ca=class{source;value;constructor(t,e){this.source=t,this.value=e}};var Qn=(()=>{class i{_viewportRuler=g(Je);_changeDetectorRef=g(Ys$1);_elementRef=g(Ye$1);_dir=g(Y_,{optional:!0});_idGenerator=g(fe);_renderer=g(dr$1);_parentFormField=g(Xt,{optional:!0});ngControl=g(pt,{self:!0,optional:!0});_liveAnnouncer=g(Ci);_defaultOptions=g(gl,{optional:!0});_animationsDisabled=Ce();_popoverLocation;_initialized=new $;_cleanupDetach;options;optionGroups;customTrigger;_positions=[{originX:`start`,originY:`bottom`,overlayX:`start`,overlayY:`top`},{originX:`end`,originY:`bottom`,overlayX:`end`,overlayY:`top`},{originX:`start`,originY:`top`,overlayX:`start`,overlayY:`bottom`,panelClass:`mat-mdc-select-panel-above`},{originX:`end`,originY:`top`,overlayX:`end`,overlayY:`bottom`,panelClass:`mat-mdc-select-panel-above`}];_scrollOptionIntoView(e){let n=this.options.toArray()[e];if(n){let a=this.panel.nativeElement,r=Vo(e,this.options,this.optionGroups),o=n._getHostElement();e===0&&r===1?a.scrollTop=0:a.scrollTop=Lo(o.offsetTop,o.offsetHeight,a.scrollTop,a.offsetHeight)}}_positioningSettled(){this._scrollOptionIntoView(this._keyManager.activeItemIndex||0)}_getChangeEvent(e){return new ca(this,e)}_scrollStrategyFactory=g(bl);_panelOpen=!1;_compareWith=(e,n)=>e===n;_uid=this._idGenerator.getId(`mat-select-`);_triggerAriaLabelledBy=null;_previousControl;_destroy=new $;_errorStateTracker;stateChanges=new $;disableAutomaticLabeling=!0;userAriaDescribedBy;_selectionModel;_keyManager;_preferredOverlayOrigin;_overlayWidth;_onChange=()=>{};_onTouched=()=>{};_valueId=this._idGenerator.getId(`mat-select-value-`);_scrollStrategy;_overlayPanelClass=this._defaultOptions?.overlayPanelClass||``;get focused(){return this._focused||this._panelOpen}_focused=!1;controlType=`mat-select`;trigger;panel;_overlayDir;panelClass;disabled=!1;get disableRipple(){return this._disableRipple()}set disableRipple(e){this._disableRipple.set(e)}_disableRipple=Le(!1);tabIndex=0;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties()}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??!1;get placeholder(){return this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next()}_placeholder;get required(){return this._required??this.ngControl?.control?.hasValidator(Ze.required)??!1}set required(e){this._required=e,this.stateChanges.next()}_required;get multiple(){return this._multiple}set multiple(e){this._selectionModel,this._multiple=e}_multiple=!1;disableOptionCentering=this._defaultOptions?.disableOptionCentering??!1;get compareWith(){return this._compareWith}set compareWith(e){this._compareWith=e,this._selectionModel&&this._initializeSelection()}get value(){return this._value}set value(e){this._assignValue(e)&&this._onChange(e)}_value;ariaLabel=``;ariaLabelledby;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}typeaheadDebounceInterval;sortComparator;get id(){return this._id}set id(e){this._id=e||this._uid,this.stateChanges.next()}_id;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}panelWidth=this._defaultOptions&&typeof this._defaultOptions.panelWidth<`u`?this._defaultOptions.panelWidth:`auto`;canSelectNullableOptions=this._defaultOptions?.canSelectNullableOptions??!1;optionSelectionChanges=Qv(()=>{let e=this.options;return e?e.changes.pipe(dD(e),wt$1(()=>Jv(...e.map(n=>n.onSelectionChange)))):this._initialized.pipe(wt$1(()=>this.optionSelectionChanges))});openedChange=new Ne;_openedStream=this.openedChange.pipe(Jt(e=>e),P(()=>{}));_closedStream=this.openedChange.pipe(Jt(e=>!e),P(()=>{}));selectionChange=new Ne;valueChange=new Ne;constructor(){let e=g(Zn),n=g(Tt,{optional:!0}),a=g(Pt,{optional:!0}),r=g(new qs(`tabindex`),{optional:!0}),o=g(Wt,{optional:!0}),m=g(qn,{optional:!0,self:!0});this.ngControl&&(this.ngControl.valueAccessor=this),this._defaultOptions?.typeaheadDebounceInterval!=null&&(this.typeaheadDebounceInterval=this._defaultOptions.typeaheadDebounceInterval),this._errorStateTracker=new yt(e,m||this.ngControl,a,n,this.stateChanges),this._scrollStrategy=this._scrollStrategyFactory(),this.tabIndex=r==null?0:parseInt(r)||0,this._popoverLocation=o?.usePopover===!1?null:`inline`,this.id=this.id}ngOnInit(){this._selectionModel=new zt(this.multiple),this.stateChanges.next(),this._viewportRuler.change().pipe(Xa$1(this._destroy)).subscribe(()=>{this.panelOpen&&(this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._changeDetectorRef.detectChanges())})}ngAfterContentInit(){this._initialized.next(),this._initialized.complete(),this._initKeyManager(),this._selectionModel.changed.pipe(Xa$1(this._destroy)).subscribe(e=>{e.added.forEach(n=>n.select()),e.removed.forEach(n=>n.deselect())}),this.options.changes.pipe(dD(null),Xa$1(this._destroy)).subscribe(()=>{this._resetOptions(),this._initializeSelection()})}ngDoCheck(){let e=this._getTriggerAriaLabelledby(),n=this.ngControl;if(e!==this._triggerAriaLabelledBy){let a=this._elementRef.nativeElement;this._triggerAriaLabelledBy=e,e?a.setAttribute(`aria-labelledby`,e):a.removeAttribute(`aria-labelledby`)}n&&(this._previousControl!==n.control&&(this._previousControl!==void 0&&n.disabled!==null&&n.disabled!==this.disabled&&(this.disabled=n.disabled),this._previousControl=n.control),this.updateErrorState())}ngOnChanges(e){(e.disabled||e.userAriaDescribedBy)&&this.stateChanges.next(),e.typeaheadDebounceInterval&&this._keyManager&&this._keyManager.withTypeAhead(this.typeaheadDebounceInterval),e.panelClass&&this.panelClass instanceof Set&&(this.panelClass=Array.from(this.panelClass))}ngOnDestroy(){this._cleanupDetach?.(),this._keyManager?.destroy(),this._destroy.next(),this._destroy.complete(),this.stateChanges.complete()}toggle(){this.panelOpen?this.close():this.open()}open(){this._canOpen()&&(this._parentFormField&&(this._preferredOverlayOrigin=this._parentFormField.getConnectedOverlayOrigin()),this._cleanupDetach?.(),this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._panelOpen=!0,this._overlayDir.positionChange.pipe(It$1(1)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this._positioningSettled()}),this._overlayDir.attachOverlay(),this._keyManager.withHorizontalOrientation(null),this._highlightCorrectOption(),this._changeDetectorRef.markForCheck(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!0)))}close(){this._panelOpen&&(this._panelOpen=!1,this._exitAndDetach(),this._keyManager.withHorizontalOrientation(this._isRtl()?`rtl`:`ltr`),this._changeDetectorRef.markForCheck(),this._onTouched(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!1)))}_exitAndDetach(){if(this._animationsDisabled||!this.panel){this._detachOverlay();return}this._cleanupDetach?.(),this._cleanupDetach=()=>{n(),clearTimeout(a),this._cleanupDetach=void 0};let e=this.panel.nativeElement,n=this._renderer.listen(e,`animationend`,r=>{r.animationName===`_mat-select-exit`&&(this._cleanupDetach?.(),this._detachOverlay())}),a=setTimeout(()=>{this._cleanupDetach?.(),this._detachOverlay()},200);e.classList.add(`mat-select-panel-exit`)}_detachOverlay(){this._overlayDir.detachOverlay(),this._changeDetectorRef.markForCheck()}writeValue(e){this._assignValue(e)}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this.stateChanges.next()}get panelOpen(){return this._panelOpen}get selected(){return this.multiple?this._selectionModel?.selected||[]:this._selectionModel?.selected[0]}get triggerValue(){if(this.empty)return``;if(this._multiple){let e=this._selectionModel.selected.map(n=>n.viewValue);return this._isRtl()&&e.reverse(),e.join(`, `)}return this._selectionModel.selected[0].viewValue}updateErrorState(){this._errorStateTracker.updateErrorState()}_isRtl(){return this._dir?this._dir.value===`rtl`:!1}_handleKeydown(e){this.disabled||(this.panelOpen?this._handleOpenKeydown(e):this._handleClosedKeydown(e))}_handleClosedKeydown(e){let n=e.keyCode,a=n===40||n===38||n===37||n===39,r=n===13||n===32,o=this._keyManager;if(!o.isTyping()&&r&&!He(e)||(this.multiple||e.altKey)&&a)e.preventDefault(),this.open();else if(!this.multiple){let m=this.selected;o.onKeydown(e);let f=this.selected;f&&m!==f&&this._liveAnnouncer.announce(f.viewValue,1e4)}}_handleOpenKeydown(e){let n=this._keyManager,a=e.keyCode,r=a===40||a===38,o=n.isTyping();if(r&&e.altKey)e.preventDefault(),this.close();else if(!o&&(a===13||a===32)&&n.activeItem&&!He(e))e.preventDefault(),n.activeItem._selectViaInteraction();else if(!o&&this._multiple&&a===65&&e.ctrlKey){e.preventDefault();let m=this.options.some(f=>!f.disabled&&!f.selected);this.options.forEach(f=>{f.disabled||(m?f.select():f.deselect())})}else{let m=n.activeItemIndex;n.onKeydown(e),this._multiple&&r&&e.shiftKey&&n.activeItem&&n.activeItemIndex!==m&&n.activeItem._selectViaInteraction()}}_handleOverlayKeydown(e){e.keyCode===27&&!He(e)&&(e.preventDefault(),this.close())}_onFocus(){this.disabled||(this._focused=!0,this.stateChanges.next())}_onBlur(){this._focused=!1,this._keyManager?.cancelTypeahead(),!this.disabled&&!this.panelOpen&&(this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next())}get empty(){return!this._selectionModel||this._selectionModel.isEmpty()}_initializeSelection(){Promise.resolve().then(()=>{this.ngControl&&(this._value=this.ngControl.value),this._setSelectionByValue(this._value),this.stateChanges.next()})}_setSelectionByValue(e){if(this.options.forEach(n=>n.setInactiveStyles()),this._selectionModel.clear(),this.multiple&&e)e.forEach(n=>this._selectOptionByValue(n)),this._sortValues();else{let n=this._selectOptionByValue(e);n?this._keyManager.updateActiveItem(n):this.panelOpen||this._keyManager.updateActiveItem(-1)}this._changeDetectorRef.markForCheck()}_selectOptionByValue(e){let n=this.options.find(a=>{if(this._selectionModel.isSelected(a))return!1;try{return(a.value!=null||this.canSelectNullableOptions)&&this._compareWith(a.value,e)}catch{return!1}});return n&&this._selectionModel.select(n),n}_assignValue(e){return e!==this._value||this._multiple&&Array.isArray(e)?(this.options&&this._setSelectionByValue(e),this._value=e,!0):!1}_skipPredicate=e=>this.panelOpen?!1:e.disabled;_getOverlayWidth(e){return this.panelWidth===`auto`?(e instanceof vt?e.elementRef:e||this._elementRef).nativeElement.getBoundingClientRect().width:this.panelWidth===null?``:this.panelWidth}_syncParentProperties(){if(this.options)for(let e of this.options)e._changeDetectorRef.markForCheck()}_initKeyManager(){this._keyManager=new Et(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl()?`rtl`:`ltr`).withHomeAndEnd().withPageUpDown().withAllowedModifierKeys([`shiftKey`]).skipPredicate(this._skipPredicate),this._keyManager.tabOut.subscribe(()=>{this.panelOpen&&(!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction(),this.focus(),this.close())}),this._keyManager.change.subscribe(()=>{this._panelOpen&&this.panel?this._scrollOptionIntoView(this._keyManager.activeItemIndex||0):!this._panelOpen&&!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction()})}_resetOptions(){let e=Jv(this.options.changes,this._destroy);this.optionSelectionChanges.pipe(Xa$1(e)).subscribe(n=>{this._onSelect(n.source,n.isUserInput),n.isUserInput&&!this.multiple&&this._panelOpen&&(this.close(),this.focus())}),Jv(...this.options.map(n=>n._stateChanges)).pipe(Xa$1(e)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this.stateChanges.next()})}_onSelect(e,n){let a=this._selectionModel.isSelected(e);!this.canSelectNullableOptions&&e.value==null&&!this._multiple?(e.deselect(),this._selectionModel.clear(),this.value!=null&&this._propagateChanges(e.value)):(a!==e.selected&&(e.selected?this._selectionModel.select(e):this._selectionModel.deselect(e)),n&&this._keyManager.setActiveItem(e),this.multiple&&(this._sortValues(),n&&this.focus())),a!==this._selectionModel.isSelected(e)&&this._propagateChanges(),this.stateChanges.next()}_sortValues(){if(this.multiple){let e=this.options.toArray();this._selectionModel.sort((n,a)=>this.sortComparator?this.sortComparator(n,a,e):e.indexOf(n)-e.indexOf(a)),this.stateChanges.next()}}_propagateChanges(e){let n;this.multiple?n=this.selected.map(a=>a.value):n=this.selected?this.selected.value:e,this._value=n,this.valueChange.emit(n),this._onChange(n),this.selectionChange.emit(this._getChangeEvent(n)),this._changeDetectorRef.markForCheck()}_highlightCorrectOption(){if(this._keyManager)if(this.empty){let e=-1;for(let n=0;n<this.options.length;n++)if(!this.options.get(n).disabled){e=n;break}this._keyManager.setActiveItem(e)}else this._keyManager.setActiveItem(this._selectionModel.selected[0])}_canOpen(){return!this._panelOpen&&!this.disabled&&this.options?.length>0&&!!this._overlayDir}focus(e){this._elementRef.nativeElement.focus(e)}_getPanelAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||null,n=e?e+` `:``;return this.ariaLabelledby?n+this.ariaLabelledby:e}_getAriaActiveDescendant(){return this.panelOpen&&this._keyManager&&this._keyManager.activeItem?this._keyManager.activeItem.id:null}_getTriggerAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||``;return this.ariaLabelledby&&(e+=` `+this.ariaLabelledby),e||(e=this._valueId),e}get describedByIds(){return this._elementRef.nativeElement.getAttribute(`aria-describedby`)?.split(` `)||[]}setDescribedByIds(e){let n=this._elementRef.nativeElement;e.length?n.setAttribute(`aria-describedby`,e.join(` `)):n.removeAttribute(`aria-describedby`)}onContainerClick(e){let n=ue(e);n&&(n.tagName===`MAT-OPTION`||n.classList.contains(`cdk-overlay-backdrop`)||n.closest(`.mat-mdc-select-panel`))||(this.focus(),this.open())}get shouldLabelFloat(){return this.panelOpen||!this.empty||this.focused&&!!this.placeholder}static ɵfac=function(n){return new(n||i)};static ɵcmp=(function(){let e=[`trigger`],n=[`panel`],a=[[[`mat-select-trigger`]],`*`],r=[`mat-select-trigger`,`*`];function o(_,O){if(_&1&&(_s$1(0,`span`,4),SC(1),jl$1()),_&2){let h=Xb();ew(),Cm(h.placeholder)}}function m(_,O){_&1&&Hl$1(0)}function f(_,O){if(_&1&&(_s$1(0,`span`,11),SC(1),jl$1()),_&2){let h=Xb(2);ew(),Cm(h.triggerValue)}}function v(_,O){if(_&1&&(_s$1(0,`span`,5),jb(1,m,1,0)(2,f,2,1,`span`,11),jl$1()),_&2){let h=Xb();ew(),Bb(h.customTrigger?1:2)}}function u(_,O){if(_&1){let h=Kb();_s$1(0,`div`,12,1),dm(`keydown`,function(V){ap(h);let Te=Xb();return cp(Te._handleKeydown(V))}),Hl$1(2,1),jl$1()}if(_&2){let h=Xb();$l$1(h.panelClass),$s$1(`mat-select-panel-animations-enabled`,!h._animationsDisabled)(`mat-primary`,h._parentFormField?.color===`primary`)(`mat-accent`,h._parentFormField?.color===`accent`)(`mat-warn`,h._parentFormField?.color===`warn`)(`mat-undefined`,!h._parentFormField?.color),No$1(`id`,h.id+`-panel`)(`aria-multiselectable`,h.multiple)(`aria-label`,h.ariaLabel||null)(`aria-labelledby`,h._getPanelAriaLabelledby())}}return Sn$1({type:i,selectors:[[`mat-select`]],contentQueries:function(O,h,S){if(O&1&&fm(S,Bo,5)(S,Xe,5)(S,sa,5),O&2){let V;nC(V=rC())&&(h.customTrigger=V.first),nC(V=rC())&&(h.options=V),nC(V=rC())&&(h.optionGroups=V)}},viewQuery:function(O,h){if(O&1&&pm(e,5)(n,5)($n,5),O&2){let S;nC(S=rC())&&(h.trigger=S.first),nC(S=rC())&&(h.panel=S.first),nC(S=rC())&&(h._overlayDir=S.first)}},hostAttrs:[`role`,`combobox`,`aria-haspopup`,`listbox`,1,`mat-mdc-select`],hostVars:21,hostBindings:function(O,h){O&1&&dm(`keydown`,function(V){return h._handleKeydown(V)})(`focus`,function(){return h._onFocus()})(`blur`,function(){return h._onBlur()}),O&2&&(No$1(`id`,h.id)(`tabindex`,h.disabled?-1:h.tabIndex)(`aria-controls`,h.panelOpen?h.id+`-panel`:null)(`aria-expanded`,h.panelOpen)(`aria-label`,h.ariaLabel||null)(`aria-required`,h.required.toString())(`aria-disabled`,h.disabled.toString())(`aria-invalid`,h.errorState)(`aria-activedescendant`,h._getAriaActiveDescendant()),$s$1(`mat-mdc-select-disabled`,h.disabled)(`mat-mdc-select-invalid`,h.errorState)(`mat-mdc-select-required`,h.required)(`mat-mdc-select-empty`,h.empty)(`mat-mdc-select-multiple`,h.multiple)(`mat-select-open`,h.panelOpen))},inputs:{userAriaDescribedBy:[0,`aria-describedby`,`userAriaDescribedBy`],panelClass:`panelClass`,disabled:[2,`disabled`,`disabled`,jm],disableRipple:[2,`disableRipple`,`disableRipple`,jm],tabIndex:[2,`tabIndex`,`tabIndex`,_=>_==null?0:nH(_)],hideSingleSelectionIndicator:[2,`hideSingleSelectionIndicator`,`hideSingleSelectionIndicator`,jm],placeholder:`placeholder`,required:[2,`required`,`required`,jm],multiple:[2,`multiple`,`multiple`,jm],disableOptionCentering:[2,`disableOptionCentering`,`disableOptionCentering`,jm],compareWith:`compareWith`,value:`value`,ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],errorStateMatcher:`errorStateMatcher`,typeaheadDebounceInterval:[2,`typeaheadDebounceInterval`,`typeaheadDebounceInterval`,nH],sortComparator:`sortComparator`,id:`id`,panelWidth:`panelWidth`,canSelectNullableOptions:[2,`canSelectNullableOptions`,`canSelectNullableOptions`,jm]},outputs:{openedChange:`openedChange`,_openedStream:`opened`,_closedStream:`closed`,selectionChange:`selectionChange`,valueChange:`valueChange`},exportAs:[`matSelect`],features:[Nm([{provide:qt,useExisting:i},{provide:oa,useExisting:i}]),wo$1],ngContentSelectors:r,decls:11,vars:10,consts:[[`fallbackOverlayOrigin`,`cdkOverlayOrigin`,`trigger`,``],[`panel`,``],[`cdk-overlay-origin`,``,1,`mat-mdc-select-trigger`,3,`click`],[1,`mat-mdc-select-value`],[1,`mat-mdc-select-placeholder`,`mat-mdc-select-min-line`],[1,`mat-mdc-select-value-text`],[1,`mat-mdc-select-arrow-wrapper`],[1,`mat-mdc-select-arrow`],[`viewBox`,`0 0 24 24`,`width`,`24px`,`height`,`24px`,`focusable`,`false`,`aria-hidden`,`true`],[`d`,`M7 10l5 5 5-5z`],[`cdk-connected-overlay`,``,`cdkConnectedOverlayHasBackdrop`,``,`cdkConnectedOverlayBackdropClass`,`cdk-overlay-transparent-backdrop`,3,`detach`,`backdropClick`,`overlayKeydown`,`cdkConnectedOverlayDisableClose`,`cdkConnectedOverlayPanelClass`,`cdkConnectedOverlayScrollStrategy`,`cdkConnectedOverlayOrigin`,`cdkConnectedOverlayPositions`,`cdkConnectedOverlayWidth`,`cdkConnectedOverlayFlexibleDimensions`,`cdkConnectedOverlayUsePopover`],[1,`mat-mdc-select-min-line`],[`role`,`listbox`,`tabindex`,`-1`,1,`mat-mdc-select-panel`,`mdc-menu-surface`,`mdc-menu-surface--open`,3,`keydown`]],template:function(O,h){if(O&1&&(Ul$1(a),_s$1(0,`div`,2,0),dm(`click`,function(){return h.open()}),_s$1(3,`div`,3),jb(4,o,2,1,`span`,4)(5,v,3,1,`span`,5),jl$1(),_s$1(6,`div`,6)(7,`div`,7),Ip(),_s$1(8,`svg`,8),sm(9,`path`,9),jl$1()()()(),tm(10,u,3,16,`ng-template`,10),dm(`detach`,function(){return h.close()})(`backdropClick`,function(){return h.close()})(`overlayKeydown`,function(V){return h._handleOverlayKeydown(V)})),O&2){let S=iC(1);ew(3),No$1(`id`,h._valueId),ew(),Bb(h.empty?4:5),ew(6),im(`cdkConnectedOverlayDisableClose`,!0)(`cdkConnectedOverlayPanelClass`,h._overlayPanelClass)(`cdkConnectedOverlayScrollStrategy`,h._scrollStrategy)(`cdkConnectedOverlayOrigin`,h._preferredOverlayOrigin||S)(`cdkConnectedOverlayPositions`,h._positions)(`cdkConnectedOverlayWidth`,h._overlayWidth)(`cdkConnectedOverlayFlexibleDimensions`,!0)(`cdkConnectedOverlayUsePopover`,h._popoverLocation)}},dependencies:[vt,$n],styles:[`@keyframes _mat-select-enter {
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
`],encapsulation:2})})()}return i})();var jo=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵdir=yr$1({type:i,selectors:[[`mat-select-trigger`]],features:[Nm([{provide:Bo,useExisting:i}])]})}return i})();var Jn=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵmod=Ze$1({type:i});static ɵinj=Ae({imports:[ta,la,av,Vn,Kt,la]})}return i})();var _l=(i,t)=>t.value;function vl(i,t){if(i&1&&(_s$1(0,`mat-option`,2),SC(1),jl$1()),i&2){let e=t.$implicit;im(`value`,e.value),ew(),Cm(e.label)}}var ei=class i{label=JU.required();value=JU(``);options=JU.required();disabled=JU(!1);changed=QU();static ɵfac=function(e){return new(e||i)};static ɵcmp=Sn$1({type:i,selectors:[[`bhw-choice`]],inputs:{label:[1,`label`],value:[1,`value`],options:[1,`options`],disabled:[1,`disabled`]},outputs:{changed:`changed`},decls:5,vars:4,consts:[[1,`field-label`],[3,`selectionChange`,`aria-label`,`disabled`,`value`],[3,`value`]],template:function(e,n){e&1&&(_s$1(0,`span`,0),SC(1),jl$1(),_s$1(2,`mat-select`,1),dm(`selectionChange`,function(r){return n.changed.emit(r.value)}),$b(3,vl,2,2,`mat-option`,2,_l),jl$1()),e&2&&(ew(),Cm(n.label()),ew(),om(`aria-label`,n.label()),im(`disabled`,n.disabled())(`value`,n.value()),ew(),zb(n.options()))},dependencies:[Jn,Qn,Xe],styles:[`[_nghost-%COMP%]{display:block;min-width:0}.field-label[_ngcontent-%COMP%]{display:block;margin-bottom:.4rem;color:#a4afb8;font-size:.75rem}mat-select[_ngcontent-%COMP%]{box-sizing:border-box;padding:.65rem .75rem;border:1px solid #30383f;border-radius:.65rem}`]})};var yl=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵcmp=Sn$1({type:i,selectors:[[`ng-component`]],hostAttrs:[`cdk-text-field-style-loader`,``],decls:0,vars:0,template:function(n,a){},styles:[`textarea.cdk-textarea-autosize {
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
`],encapsulation:2})}return i})();var xl={passive:!0};var Go=(()=>{class i{_platform=g(ne);_ngZone=g(ee);_renderer=g(In$1).createRenderer(null,null);_styleLoader=g(z_);_monitoredElements=new Map;monitor(e){if(!this._platform.isBrowser)return we;this._styleLoader.load(yl);let n=Oe(e),a=this._monitoredElements.get(n);if(a)return a.subject;let r=new $,o=`cdk-text-field-autofilled`,m=v=>{v.animationName===`cdk-text-field-autofill-start`&&!n.classList.contains(o)?(n.classList.add(o),this._ngZone.run(()=>r.next({target:v.target,isAutofilled:!0}))):v.animationName===`cdk-text-field-autofill-end`&&n.classList.contains(o)&&(n.classList.remove(o),this._ngZone.run(()=>r.next({target:v.target,isAutofilled:!1})))},f=this._ngZone.runOutsideAngular(()=>(n.classList.add(`cdk-text-field-autofill-monitored`),this._renderer.listen(n,`animationstart`,m,xl)));return this._monitoredElements.set(n,{subject:r,unlisten:f}),r}stopMonitoring(e){let n=Oe(e),a=this._monitoredElements.get(n);a&&(a.unlisten(),a.subject.complete(),n.classList.remove(`cdk-text-field-autofill-monitored`),n.classList.remove(`cdk-text-field-autofilled`),this._monitoredElements.delete(n))}ngOnDestroy(){this._monitoredElements.forEach((e,n)=>this.stopMonitoring(n))}static ɵfac=function(n){return new(n||i)};static ɵprov=pe({token:i,factory:i.ɵfac})}return i})();var Uo=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵmod=Ze$1({type:i});static ɵinj=Ae({})}return i})();var Wo=new m(`MAT_INPUT_VALUE_ACCESSOR`);var kl=[`button`,`checkbox`,`file`,`hidden`,`image`,`radio`,`range`,`reset`,`submit`];var Cl=new m(`MAT_INPUT_CONFIG`);var $o=(()=>{class i{_elementRef=g(Ye$1);_platform=g(ne);ngControl=g(pt,{optional:!0,self:!0});_autofillMonitor=g(Go);_ngZone=g(ee);_formField=g(Xt,{optional:!0});_renderer=g(dr$1);_uid=g(fe).getId(`mat-input-`);_previousNativeValue;_inputValueAccessor;_signalBasedValueAccessor;_previousPlaceholder=null;_errorStateTracker;_config=g(Cl,{optional:!0});_cleanupIosKeyup;_cleanupWebkitWheel;_isServer=!1;_isNativeSelect=!1;_isTextarea=!1;_isInFormField=!1;focused=!1;stateChanges=new $;controlType=`mat-input`;autofilled=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=bt(e),this.focused&&(this.focused=!1,this.stateChanges.next())}_disabled=!1;get id(){return this._id}set id(e){this._id=e||this._uid}_id;placeholder;name;get required(){return this._required??this.ngControl?.control?.hasValidator(Ze.required)??!1}set required(e){this._required=bt(e)}_required;get type(){return this._type}set type(e){this._type=e||`text`,this._validateType(),!this._isTextarea&&Ti().has(this._type)&&(this._elementRef.nativeElement.type=this._type)}_type=`text`;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}userAriaDescribedBy;get value(){return this._signalBasedValueAccessor?this._signalBasedValueAccessor.value():this._inputValueAccessor.value}set value(e){e!==this.value&&(this._signalBasedValueAccessor?this._signalBasedValueAccessor.value.set(e):this._inputValueAccessor.value=e,this.stateChanges.next())}get readonly(){return this._readonly}set readonly(e){this._readonly=bt(e)}_readonly=!1;disabledInteractive;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}_neverEmptyInputTypes=[`date`,`datetime`,`datetime-local`,`month`,`time`,`week`].filter(e=>Ti().has(e));constructor(){let e=g(Tt,{optional:!0}),n=g(Pt,{optional:!0}),a=g(Zn),r=g(Wo,{optional:!0,self:!0}),o=g(qn,{optional:!0,self:!0}),m=this._elementRef.nativeElement,f=m.nodeName.toLowerCase();r?fo$1(r.value)?this._signalBasedValueAccessor=r:this._inputValueAccessor=r:this._inputValueAccessor=m,this._previousNativeValue=this.value,this.id=this.id,this._platform.IOS&&this._ngZone.runOutsideAngular(()=>{this._cleanupIosKeyup=this._renderer.listen(m,`keyup`,this._iOSKeyupListener)}),this._errorStateTracker=new yt(a,o||this.ngControl,n,e,this.stateChanges),this._isServer=!this._platform.isBrowser,this._isNativeSelect=f===`select`,this._isTextarea=f===`textarea`,this._isInFormField=!!this._formField,this.disabledInteractive=this._config?.disabledInteractive||!1,this._isNativeSelect&&(this.controlType=m.multiple?`mat-native-select-multiple`:`mat-native-select`),this._signalBasedValueAccessor&&lo$1(()=>{this._signalBasedValueAccessor.value(),this.stateChanges.next()})}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(e=>{this.autofilled=e.isAutofilled,this.stateChanges.next()})}ngOnChanges(){this.stateChanges.next()}ngOnDestroy(){this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),this._cleanupIosKeyup?.(),this._cleanupWebkitWheel?.()}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==null&&this.ngControl.disabled!==this.disabled&&(this.disabled=this.ngControl.disabled,this.stateChanges.next())),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder()}focus(e){this._elementRef.nativeElement.focus(e)}updateErrorState(){this._errorStateTracker.updateErrorState()}_focusChanged(e){if(e!==this.focused){if(!this._isNativeSelect&&e&&this.disabled&&this.disabledInteractive){let n=this._elementRef.nativeElement;n.type===`number`?(n.type=`text`,n.setSelectionRange(0,0),n.type=`number`):n.setSelectionRange(0,0)}this.focused=e,this.stateChanges.next()}}_onInput(){}_dirtyCheckNativeValue(){let e=this._elementRef.nativeElement.value;this._previousNativeValue!==e&&(this._previousNativeValue=e,this.stateChanges.next())}_dirtyCheckPlaceholder(){let e=this._getPlaceholder();if(e!==this._previousPlaceholder){let n=this._elementRef.nativeElement;this._previousPlaceholder=e,e?n.setAttribute(`placeholder`,e):n.removeAttribute(`placeholder`)}}_getPlaceholder(){return this.placeholder||null}_validateType(){kl.indexOf(this._type)}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let e=this._elementRef.nativeElement.validity;return e&&e.badInput}get empty(){return!this._isNeverEmpty()&&!this._elementRef.nativeElement.value&&!this._isBadInput()&&!this.autofilled}get shouldLabelFloat(){if(this._isNativeSelect){let e=this._elementRef.nativeElement,n=e.options[0];return this.focused||e.multiple||!this.empty||!!(e.selectedIndex>-1&&n&&n.label)}else return this.focused&&!this.disabled||!this.empty}get describedByIds(){return this._elementRef.nativeElement.getAttribute(`aria-describedby`)?.split(` `)||[]}setDescribedByIds(e){let n=this._elementRef.nativeElement;e.length?n.setAttribute(`aria-describedby`,e.join(` `)):n.removeAttribute(`aria-describedby`)}onContainerClick(){this.focused||this.focus()}_isInlineSelect(){let e=this._elementRef.nativeElement;return this._isNativeSelect&&(e.multiple||e.size>1)}_iOSKeyupListener=e=>{let n=e.target;!n.value&&n.selectionStart===0&&n.selectionEnd===0&&(n.setSelectionRange(1,1),n.setSelectionRange(0,0))};_getReadonlyAttribute(){return this._isNativeSelect?null:this.readonly||this.disabled&&this.disabledInteractive?`true`:null}static ɵfac=function(n){return new(n||i)};static ɵdir=yr$1({type:i,selectors:[[`input`,`matInput`,``],[`textarea`,`matInput`,``],[`select`,`matNativeControl`,``],[`input`,`matNativeControl`,``],[`textarea`,`matNativeControl`,``]],hostAttrs:[1,`mat-mdc-input-element`],hostVars:21,hostBindings:function(n,a){n&1&&dm(`focus`,function(){return a._focusChanged(!0)})(`blur`,function(){return a._focusChanged(!1)})(`input`,function(){return a._onInput()}),n&2&&(Hs$1(`id`,a.id)(`disabled`,a.disabled&&!a.disabledInteractive)(`required`,a.required),No$1(`name`,a.name||null)(`readonly`,a._getReadonlyAttribute())(`aria-disabled`,a.disabled&&a.disabledInteractive?`true`:null)(`aria-invalid`,a.empty&&a.required?null:a.errorState)(`aria-required`,a.required)(`id`,a.id),$s$1(`mat-input-server`,a._isServer)(`mat-mdc-form-field-textarea-control`,a._isInFormField&&a._isTextarea)(`mat-mdc-form-field-input-control`,a._isInFormField)(`mat-mdc-input-disabled-interactive`,a.disabledInteractive)(`mdc-text-field__input`,a._isInFormField)(`mat-mdc-native-select-inline`,a._isInlineSelect()))},inputs:{disabled:`disabled`,id:`id`,placeholder:`placeholder`,name:`name`,required:`required`,type:`type`,errorStateMatcher:`errorStateMatcher`,userAriaDescribedBy:[0,`aria-describedby`,`userAriaDescribedBy`],value:`value`,readonly:`readonly`,disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,jm]},exportAs:[`matInput`],features:[Nm([{provide:qt,useExisting:i}]),wo$1]})}return i})();var qo=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵmod=Ze$1({type:i});static ɵinj=Ae({imports:[Kt,Kt,Uo,av]})}return i})();var ti=class i{label=JU.required();value=JU(``);disabled=JU(!1);changed=QU();static ɵfac=function(e){return new(e||i)};static ɵcmp=Sn$1({type:i,selectors:[[`bhw-text-field`]],inputs:{label:[1,`label`],value:[1,`value`],disabled:[1,`disabled`]},outputs:{changed:`changed`},decls:5,vars:3,consts:[[`field`,``],[`matInput`,``,`maxlength`,`1024`,3,`change`,`disabled`,`value`]],template:function(e,n){if(e&1){let a=Kb();_s$1(0,`label`)(1,`span`),SC(2),jl$1(),_s$1(3,`input`,1,0),dm(`change`,function(){ap(a);let o=iC(4);return cp(n.changed.emit(o.value))}),jl$1()()}e&2&&(ew(2),Cm(n.label()),ew(),im(`disabled`,n.disabled())(`value`,n.value()))},dependencies:[qo,$o],styles:[`[_nghost-%COMP%]{display:block;min-width:0}label[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:block;margin-bottom:.4rem;color:#a4afb8;font-size:.75rem}input[_ngcontent-%COMP%]{box-sizing:border-box;width:100%;padding:.65rem .75rem;border:1px solid #30383f;border-radius:.65rem;background:transparent;color:#edf1f4;font:inherit}`]})};var ni=class i{country=JU.required();source=vr$1(()=>`assets/flag/${this.country()}.svg`);static ɵfac=function(e){return new(e||i)};static ɵcmp=Sn$1({type:i,selectors:[[`bhw-flag`]],hostAttrs:[`aria-hidden`,`true`],inputs:{country:[1,`country`]},decls:1,vars:1,consts:[[`alt`,``,`height`,`14`,`width`,`20`,3,`src`]],template:function(e,n){e&1&&Us$1(0,`img`,0),e&2&&Hs$1(`src`,n.source())},styles:[`[_nghost-%COMP%]{display:inline-flex;flex-shrink:0;align-items:center}img[_ngcontent-%COMP%]{display:block;border-radius:2px;object-fit:cover}`]})};var wl=(i,t)=>t.code;function Ml(i,t){if(i&1&&(_s$1(0,`mat-option`,4)(1,`span`,5),sm(2,`bhw-flag`,3),_s$1(3,`span`,6),SC(4),jl$1(),_s$1(5,`span`,7),SC(6),jl$1()()()),i&2){let e=t.$implicit;im(`value`,e.code),ew(2),im(`country`,e.flag),ew(2),Cm(e.code.toUpperCase()),ew(),No$1(`lang`,e.code),ew(),Cm(e.name)}}function Nl(i,t){if(i&1){let e=Kb();cm(0),_s$1(1,`mat-select`,1),dm(`selectionChange`,function(a){ap(e);let r=Xb();return cp(r.select(a.value))}),_s$1(2,`mat-select-trigger`)(3,`span`,2),sm(4,`bhw-flag`,3),_s$1(5,`span`),SC(6),jl$1()()(),$b(7,Ml,7,5,`mat-option`,4,wl),jl$1(),um()}if(i&2){let e=t.$implicit,n=Xb();ew(),om(`aria-label`,e(`navigation.language`)),im(`hideSingleSelectionIndicator`,!1)(`panelWidth`,220)(`value`,n.preferences.language()),ew(3),im(`country`,n.selected.flag),ew(2),Cm(n.selected.code.toUpperCase()),ew(),zb(n.languages)}}var ii=class i{constructor(t){this.preferences=t}preferences;languages=hv;get selected(){return this.languages.find(t=>t.code===this.preferences.language())??this.languages[0]}select(t){this.preferences.select(t)}static ɵfac=function(e){return new(e||i)(Tn$1(yv))};static ɵcmp=Sn$1({type:i,selectors:[[`bhw-language-picker`]],decls:1,vars:0,consts:[[4,`transloco`],[`panelClass`,`bhw-language-panel`,3,`selectionChange`,`aria-label`,`hideSingleSelectionIndicator`,`panelWidth`,`value`],[1,`language-trigger`],[3,`country`],[3,`value`],[1,`language-option`],[1,`language-code`],[1,`language-name`]],template:function(e,n){e&1&&tm(0,Nl,9,6,`ng-container`,0)},dependencies:[Jn,Qn,jo,Xe,U8,ni],styles:[`[_nghost-%COMP%]{display:inline-flex;width:6.5rem;flex-shrink:0}mat-select[_ngcontent-%COMP%]{border-radius:.75rem;background:#181c20;box-shadow:inset 0 0 0 1px #30383f}.language-trigger[_ngcontent-%COMP%], .language-option[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.6rem}.language-code[_ngcontent-%COMP%]{font-weight:500}.language-name[_ngcontent-%COMP%]{color:#a4afb8}`]})};function Xo(i){return JSON.stringify({application:`beheader-web`,version:`0.1.0`,browser:navigator.userAgent,diagnostics:i.slice(0,30).map(({code:t,severity:e})=>({code:t,severity:e}))},null,2)}function Ko(i){let t=[...new Set(i.map(e=>e.code))].slice(0,8).join(`, `);return`https://github.com/Crystal-Spider/beheader-web/issues/new?${new URLSearchParams({title:`Generation issue`,body:`Beheader Web 0.1.0
Diagnostic codes: ${t}

What happened?

Please review and attach the downloaded diagnostics if useful. Do not attach private input files.`})}`}function da(i){return Array.from(i,t=>t.charCodeAt(0)<32?`_`:t).join(``).replace(/[<>:"/\\|?*]/g,`_`).replace(/[. ]+$/,``).slice(0,100)||`polyglot`}var El=(i,t)=>t.kind;var ma=(i,t)=>t.id;var Dl=(i,t)=>t.family;function Ol(i,t){if(i&1&&(_s$1(0,`div`,13),SC(1),jl$1()),i&2){let e=Xb().$implicit;ew(),Cm(e(`ui.drop`))}}function Il(i,t){if(i&1&&(_s$1(0,`span`,48),SC(1),jl$1()),i&2){let e=Xb().$implicit,n=Xb().$implicit;ew(),Cm(n(`availability.`+e.reason))}}function Al(i,t){if(i&1){let e=Kb();_s$1(0,`li`)(1,`bhw-button`,47),dm(`clicked`,function(){let a=ap(e).$implicit;Xb();let r=iC(23),o=Xb();return cp(o.choose(r,a))}),jl$1(),jb(2,Il,2,1,`span`,48),jl$1()}if(i&2){let e=t.$implicit,n=Xb().$implicit,a=Xb();$s$1(`unavailable`,!e.enabled),No$1(`aria-disabled`,!e.enabled)(`title`,e.reason?n(`availability.`+e.reason):null),ew(),im(`block`,!0)(`compact`,!0)(`disabled`,a.job().busy||!e.enabled)(`icon`,e.kind)(`label`,n(`generator.`+e.kind)),ew(),Bb(e.reason?2:-1)}}function Rl(i,t){if(i&1){let e=Kb();_s$1(0,`bhw-button`,21),dm(`clicked`,function(){let a=ap(e).$implicit;Xb();let r=iC(23),o=Xb();return cp(o.choose(r,a))}),jl$1()}if(i&2){let e=t.$implicit,n=Xb().$implicit,a=Xb();im(`disabled`,!a.auxiliaryEnabled(e))(`label`,n(`role.`+e))}}function Fl(i,t){if(i&1){let e=Kb();_s$1(0,`article`,28)(1,`div`,49)(2,`h3`),SC(3),jl$1(),_s$1(4,`p`),SC(5),jl$1()(),_s$1(6,`bhw-choice`,50),dm(`changed`,function(a){let r=ap(e).$implicit,o=Xb(2);return cp(o.session.assign(r.id,a))}),jl$1(),_s$1(7,`div`,25)(8,`bhw-button`,21),dm(`clicked`,function(){let a=ap(e).$implicit;Xb();let r=iC(23),o=Xb();return cp(o.choose(r,void 0,a.id))}),jl$1(),_s$1(9,`bhw-button`,21),dm(`clicked`,function(){let a=ap(e).$implicit,r=Xb(2);return cp(r.session.remove(a.id))}),jl$1(),_s$1(10,`bhw-button`,21),dm(`clicked`,function(){let a=ap(e).$implicit,r=Xb(2);return cp(r.session.move(a.id,-1))}),jl$1(),_s$1(11,`bhw-button`,21),dm(`clicked`,function(){let a=ap(e).$implicit,r=Xb(2);return cp(r.session.move(a.id,1))}),jl$1()()()}if(i&2){let e=t.$implicit,n=t.$index,a=Xb().$implicit,r=Xb();No$1(`aria-label`,e.name),ew(3),Cm(e.name),ew(2),Tm(``,r.size(e.size),` · `,a(`role.`+(e.role||`auto`))),ew(),im(`disabled`,r.job().busy)(`label`,a(`ui.role`))(`options`,r.roles())(`value`,r.session.role(e.id)),ew(2),im(`disabled`,r.job().busy)(`label`,a(`ui.replace`)),ew(),im(`disabled`,r.job().busy)(`label`,a(`ui.remove`)),ew(),im(`disabled`,r.job().busy||n===0)(`label`,a(`ui.up`)),ew(),im(`disabled`,r.job().busy||n===r.inputs().length-1)(`label`,a(`ui.down`))}}function Tl(i,t){if(i&1){let e=Kb();_s$1(0,`bhw-text-field`,52),dm(`changed`,function(a){ap(e);let r=Xb(3);return cp(r.path(a))}),jl$1()}if(i&2){let e=Xb().$implicit,n=Xb().$implicit,a=Xb();im(`disabled`,a.job().busy)(`label`,n(`ui.htmlPath`))(`value`,a.session.options.htmlPath||e.name)}}function Pl(i,t){if(i&1&&jb(0,Tl,1,3,`bhw-text-field`,51),i&2){let e=t.$implicit;Bb(e.role===`html`?0:-1)}}function Vl(i,t){if(i&1&&(_s$1(0,`li`)(1,`code`),SC(2),jl$1(),SC(3),jl$1()),i&2){let e=t.$implicit,n=Xb(2).$implicit;ew(2),Cm(e.reference),ew(),Tm(` · `,e.from,` · `,n(`reference.`+e.reason))}}function Ll(i,t){if(i&1){let e=Kb();_s$1(0,`div`,29)(1,`p`),SC(2),jl$1(),_s$1(3,`ul`),$b(4,Vl,4,3,`li`,null,Ub),jl$1(),_s$1(6,`mat-checkbox`,53),dm(`change`,function(a){ap(e);let r=Xb(2);return cp(r.allow(a.checked))}),SC(7),jl$1()()}if(i&2){let e=Xb().$implicit,n=Xb();ew(2),Cm(e(`ui.references`)),ew(2),zb(n.job().plan?.references),ew(2),im(`checked`,!!n.session.options.allowUnresolved)(`disabled`,n.job().busy),ew(),Cm(e(`ui.allowReferences`))}}function zl(i,t){if(i&1&&(_s$1(0,`li`)(1,`code`),SC(2),jl$1()()),i&2){let e=t.$implicit;ew(2),Cm(e.path)}}function Bl(i,t){if(i&1&&(_s$1(0,`p`),SC(1),jl$1(),_s$1(2,`ul`),$b(3,zl,3,1,`li`,null,Ub),jl$1()),i&2){let e=Xb().$implicit,n=Xb();ew(),Cm(e(`ui.collisions`)),ew(2),zb(n.job().plan?.collisions)}}function jl(i,t){if(i&1&&(_s$1(0,`p`,54),SC(1),jl$1()),i&2){let e=Xb(2).$implicit,n=Xb();ew(),Tm(``,e(`ui.headerSpace`),`: `,n.job().plan?.headerSpace,` B`)}}function Hl(i,t){if(i&1&&jb(0,jl,2,2,`p`,54),i&2){let e=t.$implicit;Bb(e.role===`extra-header`?0:-1)}}function Gl(i,t){if(i&1&&(_s$1(0,`p`)(1,`code`),SC(2),jl$1(),SC(3),jl$1()),i&2){let e=t.$implicit,n=Xb().$implicit;$s$1(`error`,e.severity===`error`),ew(2),Cm(e.code),ew(),zl$1(` · `,n(`diagnostic.`+e.code))}}function Ul(i,t){if(i&1){let e=Kb();_s$1(0,`bhw-button`,55),dm(`clicked`,function(){ap(e);let a=Xb(2);return cp(a.logs())}),jl$1()}if(i&2){let e=Xb().$implicit;im(`label`,e(`ui.logs`))}}function Wl(i,t){if(i&1&&(_s$1(0,`a`,33),SC(1),jl$1()),i&2){let e=Xb().$implicit,n=Xb();im(`href`,n.issue(),hI),ew(),Cm(e(`ui.issue`))}}function $l(i,t){if(i&1){let e=Kb();_s$1(0,`div`,56)(1,`p`),SC(2),jl$1(),sm(3,`mat-progress-bar`,57),_s$1(4,`p`),SC(5),jl$1()(),_s$1(6,`bhw-button`,55),dm(`clicked`,function(){ap(e);let a=Xb(2);return cp(a.cancel())}),jl$1()}if(i&2){let e=Xb().$implicit,n=Xb();ew(2),Cm(e(`stage.`+(n.job().progress?.stage||`plan`))),ew(),im(`mode`,n.job().progress?.total?`determinate`:`indeterminate`)(`value`,100*(n.job().progress?.completed||0)/(n.job().progress?.total||1)),ew(2),Cm(n.progressLabel()),ew(),im(`label`,e(`ui.cancel`))}}function ql(i,t){if(i&1&&(_s$1(0,`li`),SC(1),jl$1()),i&2){let e=t.$implicit,n=Xb(2).$implicit;ew(),Tm(``,n(`open.`+e.family),` (`,e.extensions.join(`, `),`)`)}}function Xl(i,t){if(i&1){let e=Kb();_s$1(0,`div`,38)(1,`p`),SC(2),jl$1(),_s$1(3,`div`,58)(4,`bhw-text-field`,52),dm(`changed`,function(a){ap(e);let r=Xb(2);return cp(r.remember(`name`,a))}),jl$1(),_s$1(5,`bhw-choice`,50),dm(`changed`,function(a){ap(e);let r=Xb(2);return cp(r.remember(`extension`,a))}),jl$1()(),_s$1(6,`bhw-button`,59),dm(`clicked`,function(){ap(e);let a=Xb(2);return cp(a.download())}),jl$1(),_s$1(7,`ul`),$b(8,ql,2,2,`li`,null,Dl),jl$1(),_s$1(10,`p`,54),SC(11),jl$1()()}if(i&2){let e=Xb().$implicit,n=Xb();ew(2),Tm(``,e(`ui.ready`),` · `,n.size(t.size)),ew(2),im(`disabled`,n.job().busy)(`label`,e(`ui.filename`))(`value`,n.name()),ew(),im(`disabled`,n.job().busy)(`label`,e(`ui.extension`))(`options`,n.variants())(`value`,n.selectedExtension()),ew(),im(`disabled`,n.job().busy)(`label`,e(`ui.download`)),ew(2),zb(n.job().interpretations),ew(3),Cm(e(`ui.sameBytes`))}}function Kl(i,t){if(i&1&&(_s$1(0,`div`,39),sm(1,`bhw-icon`,60),_s$1(2,`h3`),SC(3),jl$1(),_s$1(4,`p`),SC(5),jl$1(),_s$1(6,`span`,61),SC(7),jl$1()()),i&2){let e=Xb().$implicit;ew(3),Cm(e(`generator.outputEmptyTitle`)),ew(2),Cm(e(`generator.outputEmptyDescription`)),ew(2),Cm(e(`generator.outputHint`))}}function Yl(i,t){if(i&1){let e=Kb();cm(0),_s$1(1,`a`,2),SC(2),jl$1(),_s$1(3,`div`,3)(4,`header`,4)(5,`a`,5),SC(6,`beheader`),_s$1(7,`span`),SC(8,` web`),jl$1()(),sm(9,`bhw-language-picker`),jl$1(),_s$1(10,`main`,6)(11,`section`,7)(12,`p`,8),SC(13),jl$1(),_s$1(14,`h1`,9),SC(15),jl$1(),_s$1(16,`p`,10),SC(17),jl$1(),_s$1(18,`p`,11),sm(19,`bhw-icon`,12),SC(20),jl$1()(),jb(21,Ol,2,1,`div`,13),_s$1(22,`input`,14,0),dm(`change`,function(){ap(e);let a=iC(23),r=Xb();return cp(r.picked(a))}),jl$1(),_s$1(24,`section`,15)(25,`div`,16)(26,`h2`,17),SC(27),jl$1(),_s$1(28,`span`,18),SC(29,`01`),jl$1()(),_s$1(30,`div`,19),sm(31,`bhw-icon`,20),_s$1(32,`div`)(33,`h3`),SC(34),jl$1(),_s$1(35,`p`),SC(36),jl$1()(),_s$1(37,`bhw-button`,21),dm(`clicked`,function(){ap(e);let a=iC(23),r=Xb();return cp(r.choose(a))}),jl$1()(),_s$1(38,`ul`,22),$b(39,Al,3,10,`li`,23,El),jl$1(),_s$1(41,`div`,24)(42,`bhw-button`,21),dm(`clicked`,function(){ap(e);let a=Xb();return cp(a.example())}),jl$1(),_s$1(43,`details`)(44,`summary`),SC(45),jl$1(),_s$1(46,`p`),SC(47),jl$1(),_s$1(48,`div`,25),$b(49,Rl,1,2,`bhw-button`,26,Hb),jl$1()()(),_s$1(51,`div`,27),$b(52,Fl,12,16,`article`,28,ma),jl$1(),$b(54,Pl,1,1,null,null,ma),jb(56,Ll,8,4,`div`,29),jb(57,Bl,5,1),$b(58,Hl,1,1,null,null,ma),_s$1(60,`div`,30),$b(61,Gl,4,4,`p`,31,Ub),jb(63,Ul,1,1,`bhw-button`,32),jb(64,Wl,2,2,`a`,33),jl$1(),_s$1(65,`div`,34)(66,`p`),SC(67),jl$1(),jb(68,$l,7,5),_s$1(69,`bhw-button`,35),dm(`clicked`,function(){ap(e);let a=Xb();return cp(a.generate())}),jl$1()()(),_s$1(70,`section`,36)(71,`div`,16)(72,`h2`,37),SC(73),jl$1(),_s$1(74,`span`,18),SC(75,`02`),jl$1()(),jb(76,Xl,12,12,`div`,38)(77,Kl,8,3,`div`,39),jl$1()(),_s$1(78,`footer`,40)(79,`div`,41)(80,`p`),SC(81),_s$1(82,`a`,42),SC(83,`Beheader`),jl$1(),SC(84,`.`),jl$1(),_s$1(85,`p`),SC(86),jl$1()(),_s$1(87,`nav`)(88,`a`,43),SC(89),jl$1(),_s$1(90,`span`,44),SC(91,`·`),jl$1(),_s$1(92,`a`,45),SC(93),jl$1(),_s$1(94,`span`,44),SC(95,`·`),jl$1(),_s$1(96,`a`,46),SC(97),jl$1()()()(),um()}if(i&2){let e,n=t.$implicit,a=Xb();ew(2),Cm(n(`navigation.skip`)),ew(11),Cm(n(`hero.eyebrow`)),ew(2),Cm(n(`hero.title`)),ew(2),Cm(n(`hero.description`)),ew(3),Cm(n(`hero.privacy`)),ew(),Bb(a.dragging()?21:-1),ew(),im(`multiple`,!0),No$1(`accept`,a.pickerAccept||a.accepted())(`aria-label`,n(`generator.choose`)),ew(5),Cm(n(`generator.filesTitle`)),ew(7),Cm(n(`generator.emptyTitle`)),ew(2),Cm(n(`ui.drop`)),ew(),im(`disabled`,a.job().busy||!a.accepted())(`label`,n(`generator.choose`)),ew(),No$1(`aria-label`,n(`generator.formatsLabel`)),ew(),zb(a.availability()),ew(3),im(`disabled`,a.job().busy)(`label`,n(`ui.example`)),ew(3),Cm(n(`ui.advanced`)),ew(2),Cm(n(`ui.auxiliaryHint`)),ew(2),zb(a.auxiliaryRoles),ew(2),No$1(`aria-label`,n(`ui.selected`)),ew(),zb(a.inputs()),ew(2),zb(a.inputs()),ew(2),Bb(a.job().plan?.references?.length?56:-1),ew(),Bb(a.job().plan?.collisions?.length?57:-1),ew(),zb(a.inputs()),ew(3),zb(a.job().diagnostics),ew(2),Bb(a.job().diagnostics.length?63:-1),ew(),Bb(a.unexpected()?64:-1),ew(3),Cm(n(`generator.selectionHint`)),ew(),Bb(a.job().busy?68:-1),ew(),im(`block`,!0)(`disabled`,a.job().busy||!a.job().plan?.ready)(`label`,n(`generator.combine`)),ew(4),Cm(n(`generator.outputTitle`)),ew(3),Bb((e=a.job().artifact)?76:77,e),ew(5),zl$1(``,n(`footer.inspired`),` `),ew(5),Cm(n(`footer.independent`)),ew(),No$1(`aria-label`,n(`footer.links`)),ew(2),Cm(n(`footer.source`)),ew(4),Cm(n(`footer.patreon`)),ew(4),Cm(n(`footer.kofi`))}}var Yo=class i{constructor(t,e,n,a){this.processing=t;this.session=e;this.store=n;this.translations=a;this.availability=n.selectSignal(cz.selectAvailability),this.accepted=n.selectSignal(cz.selectAcceptedTypes),this.inputs=n.selectSignal(cz.selectInputs),this.job=n.selectSignal(tv.selectJobState),this.extensions=vr$1(()=>this.job().interpretations.flatMap(r=>r.extensions)),this.selectedExtension=vr$1(()=>this.extensions().includes(this.extension())?this.extension():this.extensions()[0]??``)}processing;session;store;translations;availability;accepted;inputs;job;name=Le(this.preference(`name`)||`polyglot`);extension=Le(this.preference(`extension`));dragging=Le(!1);extensions;selectedExtension;pickingRole;replacing;pickerAccept=``;auxiliaryRoles=[`html-assets`,`appendable`,`extra-header`];choose(t,e,n){this.job().busy||(this.pickingRole=typeof e==`string`?e:e?.family,this.replacing=n,this.pickerAccept=typeof e==`object`?e.accept.join(`,`):e===`html-assets`?`.zip`:e?``:n?this.availability().flatMap(a=>a.accept).join(`,`):this.accepted(),t.accept=this.pickerAccept,t.multiple=!n,t.click())}picked(t){this.session.add(Array.from(t.files??[]),this.pickingRole,this.replacing),t.value=``,this.pickerAccept=``,this.pickingRole=void 0,this.replacing=void 0}drag(t){t.dataTransfer?.types.includes(`Files`)&&(t.preventDefault(),this.dragging.set(!0))}leave(t){t.relatedTarget||this.dragging.set(!1)}drop(t){t.preventDefault(),this.dragging.set(!1),this.session.add(Array.from(t.dataTransfer?.files??[]))}generate(){!this.job().busy&&this.job().plan?.ready&&this.store.dispatch(Tr$1.requested({operation:`generate`}))}cancel(){this.store.dispatch(Tr$1.cancelRequested({}))}roles(){return[``,...U_].map(t=>({value:t,label:this.translations.translate(`role.${t||`auto`}`)}))}auxiliaryEnabled(t){return!this.job().busy&&this.inputs().length<128&&this.inputs().reduce((e,n)=>e+n.size,0)<2*1024**3&&(t===`appendable`||!this.inputs().some(e=>e.role===t))&&(t!==`html-assets`||this.inputs().some(e=>e.role===`html`))}variants(){return this.extensions().map(t=>({value:t,label:`.${t}`}))}path(t){this.session.options=A(y({},this.session.options),{htmlPath:t||void 0,allowUnresolved:!1}),this.session.refresh()}allow(t){this.session.options=A(y({},this.session.options),{allowUnresolved:t}),this.session.refresh()}remember(t,e){t===`name`?this.name.set(da(e)):this.extension.set(e);try{localStorage.setItem(`bhw.output.${t}`,t===`name`?this.name():e)}catch{}}size(t){return t>=1024**3?`${(t/1024**3).toFixed(2)} GiB`:t>=1024**2?`${(t/1024**2).toFixed(2)} MiB`:`${(t/1024).toFixed(1)} KiB`}progressLabel(){let t=this.job().progress;if(!t?.total)return``;let e=t.unit===`bytes`?`${this.size(t.completed)} / ${this.size(t.total)}`:t.unit===`microseconds`?`${(t.completed/1e6).toFixed(1)} / ${(t.total/1e6).toFixed(1)} s`:`${t.completed} / ${t.total} ${this.translations.translate(`unit.inputs`)}`;return`${Math.floor(100*t.completed/t.total)}% \xB7 ${e}`}async download(){let t=this.job().artifact;if(!(!t||this.job().busy))try{this.save(await this.processing.resolve(t),`${da(this.name())}.${this.selectedExtension()}`)}catch(e){this.store.dispatch(Tr$1.failed({diagnostic:Sr$1(e)}))}}logs(){this.save(new Blob([Xo(this.job().diagnostics)],{type:`application/json`}),`beheader-web-diagnostics.json`)}issue(){return Ko(this.job().diagnostics)}unexpected(){return this.job().diagnostics.some(t=>[`WORKER_FAILED`,`WORKER_PROTOCOL`,`IO_FAILURE`,`AUDIO_CONVERSION_FAILED`,`CLEANUP_FAILED`].includes(t.code))}async example(){try{await this.session.example()}catch(t){this.store.dispatch(Tr$1.failed({diagnostic:Sr$1(t)}))}}preference(t){try{return localStorage.getItem(`bhw.output.${t}`)??``}catch{return``}}save(t,e){let n=URL.createObjectURL(t),a=document.createElement(`a`);a.href=n,a.download=e,document.body.append(a),a.click(),a.remove(),setTimeout(()=>{URL.revokeObjectURL(n)},6e4)}static ɵfac=function(e){return new(e||i)(Tn$1(Ea),Tn$1(iv),Tn$1($o$1),Tn$1(bd))};static ɵcmp=Sn$1({type:i,selectors:[[`bhw-generator`]],hostBindings:function(e,n){e&1&&dm(`dragover`,function(r){return n.drag(r)},yI)(`dragleave`,function(r){return n.leave(r)},yI)(`drop`,function(r){return n.drop(r)},yI)},decls:1,vars:0,consts:[[`picker`,``],[4,`transloco`],[`href`,`#content`,1,`skip-link`],[1,`app-shell`],[1,`app-header`],[`href`,`./`,1,`wordmark`],[`id`,`content`],[`aria-labelledby`,`hero-title`,1,`hero`],[1,`eyebrow`],[`id`,`hero-title`],[1,`hero-description`],[1,`privacy`],[`name`,`privacy`],[`aria-hidden`,`true`,1,`drop-overlay`],[`data-testid`,`file-picker`,`hidden`,``,`tabindex`,`-1`,`type`,`file`,3,`change`,`multiple`],[`aria-labelledby`,`files-title`,1,`files-section`],[1,`section-heading`],[`id`,`files-title`],[`aria-hidden`,`true`,1,`section-number`],[1,`file-placeholder`],[`name`,`upload`,1,`upload-icon`],[`appearance`,`outlined`,3,`clicked`,`disabled`,`label`],[1,`format-list`],[3,`unavailable`],[1,`selection-toolbar`],[1,`actions`],[`appearance`,`outlined`,3,`disabled`,`label`],[1,`selected-files`],[1,`selected-file`],[1,`reference-panel`],[`aria-live`,`polite`,1,`diagnostics`],[3,`error`],[`appearance`,`outlined`,3,`label`],[`rel`,`noopener noreferrer`,`target`,`_blank`,3,`href`],[1,`combine-area`],[`icon`,`magic`,3,`clicked`,`block`,`disabled`,`label`],[`aria-labelledby`,`output-title`,1,`output-section`],[`id`,`output-title`],[`aria-live`,`polite`,1,`result-panel`],[1,`output-placeholder`],[1,`app-footer`],[1,`credit`],[`href`,`https://github.com/p2r3/beheader`,`rel`,`noopener noreferrer`,`target`,`_blank`],[`href`,`https://github.com/Crystal-Spider/beheader-web`,`rel`,`noopener noreferrer`,`target`,`_blank`],[`aria-hidden`,`true`],[`href`,`https://www.patreon.com/crystalspider`,`rel`,`noopener noreferrer`,`target`,`_blank`],[`href`,`https://ko-fi.com/crystalspider`,`rel`,`noopener noreferrer`,`target`,`_blank`],[`appearance`,`outlined`,3,`clicked`,`block`,`compact`,`disabled`,`icon`,`label`],[1,`visually-hidden`],[1,`file-metadata`],[3,`changed`,`disabled`,`label`,`options`,`value`],[3,`disabled`,`label`,`value`],[3,`changed`,`disabled`,`label`,`value`],[3,`change`,`checked`,`disabled`],[1,`metadata`],[`appearance`,`outlined`,3,`clicked`,`label`],[`aria-live`,`polite`,`role`,`status`],[3,`mode`,`value`],[1,`output-controls`],[`icon`,`download`,3,`clicked`,`disabled`,`label`],[`name`,`download`,1,`download-icon`],[1,`output-hint`]],template:function(e,n){e&1&&tm(0,Yl,98,37,`ng-container`,1)},dependencies:[U8,Pn,ei,ti,gt,ii,Wr,ji,Xr,qr],styles:[`[_nghost-%COMP%]{display:block}.app-shell[_ngcontent-%COMP%]{max-width:70rem;margin-inline:auto;padding-inline:clamp(1rem,4vw,3rem)}.app-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding-block:1.75rem}.wordmark[_ngcontent-%COMP%]{color:#edf1f4;font-size:1.1rem;font-weight:500;letter-spacing:-.04em;text-decoration:none}.wordmark[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#a4afb8;font-weight:400}.hero[_ngcontent-%COMP%]{padding:clamp(1.5rem,4vw,3rem);border-radius:clamp(1.5rem,3vw,2rem);background:#8bceef;color:#101719}.eyebrow[_ngcontent-%COMP%]{margin:0 0 1rem;font-size:.7rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase}h1[_ngcontent-%COMP%]{margin:0;font-size:clamp(2rem,5vw,3.75rem);font-weight:500;letter-spacing:-.05em;line-height:1.08}.hero-description[_ngcontent-%COMP%]{margin-block:1.25rem 0}.privacy[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.4rem;margin-block:1.5rem 0;font-size:.8rem}.privacy[_ngcontent-%COMP%]   bhw-icon[_ngcontent-%COMP%]{width:1rem;height:1rem}.development-note[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:baseline;gap:.5rem .85rem;margin:1.25rem 0 2.25rem;color:#a4afb8;font-size:.8rem}.status-label[_ngcontent-%COMP%]{flex-shrink:0;padding:.2rem .6rem;border-radius:2rem;background:#181c20;color:#8bceef}.section-heading[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:1rem;margin-bottom:1rem}h2[_ngcontent-%COMP%]{margin:0;font-size:1rem;font-weight:500}.section-number[_ngcontent-%COMP%]{color:#a4afb8;font-size:.75rem;font-variant-numeric:tabular-nums}.file-placeholder[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1.25rem;padding:1.75rem;border:1px dashed #30383f;border-radius:1.5rem;background:#181c20}.file-placeholder[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{flex:1}.file-placeholder[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0;font-size:1rem;font-weight:500}.file-placeholder[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:.4rem 0 0;color:#a4afb8;font-size:.85rem}.upload-icon[_ngcontent-%COMP%]{width:2rem;height:2rem;color:#8bceef}.format-list[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:.75rem;margin:1rem 0 0;padding:0;list-style:none}.format-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.65rem;min-width:0;padding:1rem;border-radius:1rem;background:#181c20;font-size:.8rem}.format-list[_ngcontent-%COMP%]   bhw-icon[_ngcontent-%COMP%]{width:1.2rem;height:1.2rem;color:#a4afb8}.format-list[_ngcontent-%COMP%]   li.unavailable[_ngcontent-%COMP%]{color:#a4afb8;background:transparent;box-shadow:inset 0 0 0 1px #30383f}.visually-hidden[_ngcontent-%COMP%]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.combine-area[_ngcontent-%COMP%]{margin-block:1.25rem 2rem}.combine-area[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0 0 1rem;color:#a4afb8;font-size:.8rem}.output-section[_ngcontent-%COMP%]{padding:1.5rem;border-radius:1.5rem;background:#181c20}.output-placeholder[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;padding:1.5rem 1rem;text-align:center}.output-placeholder[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:1rem 0 .5rem;font-size:1rem;font-weight:500}.output-placeholder[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:#a4afb8;font-size:.85rem}.download-icon[_ngcontent-%COMP%]{width:2rem;height:2rem;color:#a4afb8}.output-hint[_ngcontent-%COMP%]{margin-top:1.5rem;color:#a4afb8;font-size:.75rem}.app-footer[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem 2rem;margin-top:2.5rem;padding-block:1.5rem 2.5rem;border-top:1px solid #30383f;color:#a4afb8;font-size:.75rem}.app-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0}.app-footer[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem}.app-footer[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-flex;align-items:center;min-height:2.75rem}.skip-link[_ngcontent-%COMP%]{position:absolute;inset-block-start:-5rem;inset-inline-start:1rem;z-index:10;padding:.75rem 1rem;border-radius:.5rem;background:#181c20}.skip-link[_ngcontent-%COMP%]:focus{inset-block-start:.5rem}@media(max-width:48rem){.app-header[_ngcontent-%COMP%]{padding-block:1.25rem}.format-list[_ngcontent-%COMP%]{grid-template-columns:repeat(3,minmax(0,1fr))}.file-placeholder[_ngcontent-%COMP%]{flex-wrap:wrap;padding:1.25rem}.file-placeholder[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{flex-basis:calc(100% - 3.5rem)}.file-placeholder[_ngcontent-%COMP%]   bhw-button[_ngcontent-%COMP%]{width:100%}}@media(max-width:28rem){.format-list[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}.hero-description[_ngcontent-%COMP%]{font-size:.9rem}.output-section[_ngcontent-%COMP%]{padding:1.25rem}}.selection-toolbar[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:1rem;margin-block:1rem}details[_ngcontent-%COMP%]{flex:1;min-width:0;padding:.75rem;border:1px solid #30383f;border-radius:.75rem}summary[_ngcontent-%COMP%]{cursor:pointer}.actions[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:.5rem}.selected-files[_ngcontent-%COMP%]{display:grid;gap:.75rem;margin-block:1rem}.selected-file[_ngcontent-%COMP%]{display:grid;grid-template-columns:minmax(0,1fr) minmax(10rem,15rem);align-items:center;gap:1rem;padding:1rem;border:1px solid #30383f;border-radius:1rem}.selected-file[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]{grid-column:1/-1}.file-metadata[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{overflow-wrap:anywhere;margin:0;font-size:.95rem}.file-metadata[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .metadata[_ngcontent-%COMP%]{color:#a4afb8;font-size:.8rem}.reference-panel[_ngcontent-%COMP%]{padding:1rem;border:1px solid #30383f;border-radius:1rem}.reference-panel[_ngcontent-%COMP%]   li[_ngcontent-%COMP%], .diagnostics[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .result-panel[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{overflow-wrap:anywhere}.diagnostics[_ngcontent-%COMP%]{margin-block:1rem}.diagnostics[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%]{color:#ffb4ab}.diagnostics[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-block;padding:1rem}.output-controls[_ngcontent-%COMP%]{display:grid;grid-template-columns:minmax(0,1fr) minmax(6rem,10rem);gap:1rem;margin-block:1rem}.result-panel[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{padding-left:1.2rem;color:#a4afb8;line-height:1.8}.drop-overlay[_ngcontent-%COMP%]{position:fixed;inset:1rem;z-index:100;display:grid;place-items:center;padding:2rem;border:2px dashed #8bceef;border-radius:1.5rem;background:#101316;text-align:center;pointer-events:none}.format-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:block;padding:0}@media(max-width:35rem){.selected-file[_ngcontent-%COMP%], .output-controls[_ngcontent-%COMP%]{grid-template-columns:minmax(0,1fr)}}@media(max-width:35rem){.selection-toolbar[_ngcontent-%COMP%]   details[_ngcontent-%COMP%]{flex-basis:100%}}`]})};export{Yo as Generator};