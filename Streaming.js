/**
 * Created by buhe on 16/4/29.
 */
import React, {Component} from 'react';
import {requireNativeComponent, Dimensions, NativeModules, DeviceEventEmitter, View} from 'react-native';
import { PropTypes } from 'prop-types';
//
// class Stream extends Component {
// 	static propTypes = {
//
// 	};
//
// 	render() {
// 		return (
// 			<RCTStream
// 				{...this.props}
// 			/>
// 		)
// 	}
// }
const { width , height } = Dimensions.get('window');

class Stream extends Component {
	constructor(props, context){
		super(props, context);
		// this._onReady = this._onReady.bind(this);
		// this._onPending = this._onPending.bind(this);
		// this._onStart = this._onStart.bind(this);
		// this._onError = this._onError.bind(this);
		// this._onStop = this._onStop.bind(this);
		// this._onRefresh = this._onRefresh.bind(this);
	}

	componentWillMount(){

	}

	componentDidMount(){

		DeviceEventEmitter.addListener("onReady", this.props.onReady);

		DeviceEventEmitter.addListener("onPending", this.props.onPending);

		DeviceEventEmitter.addListener("onStart", this.props.onStart);

		DeviceEventEmitter.addListener("onError", this.props.onError);

		DeviceEventEmitter.addListener("onStop", this.props.onStop);

		DeviceEventEmitter.addListener("onRefresh", this.props.onRefresh);

	}

	componentWillUnmount(){
		DeviceEventEmitter.removeAllListeners("onReady", this.props.onReady);

		DeviceEventEmitter.removeAllListeners("onPending", this.props.onPending);

		DeviceEventEmitter.removeAllListeners("onStart", this.props.onStart);

		DeviceEventEmitter.removeAllListeners("onError", this.props.onError);

		DeviceEventEmitter.removeAllListeners("onStop", this.props.onStop);

		DeviceEventEmitter.removeAllListeners("onRefresh", this.props.onRefresh);

		this.setNativeProps({started: false});
	}

	setPointOfInterest(x, y){
		NativeModules.StreamManager.focusOnPoint(x,y);
	}

	_assignRoot = (component) => {
	  this._root = component;
	};

	setNativeProps(nativeProps) {
	  this._root.setNativeProps(nativeProps);
	}


	static propTypes = {
		started: PropTypes.bool,
		cameraFronted: PropTypes.bool,
		url: PropTypes.string.isRequired,
		landscape: PropTypes.bool.isRequired,
		stop: PropTypes.func,
		zoom: PropTypes.number.isRequired,
		brightness: PropTypes.number.isRequired,


		onReady: PropTypes.func,
		onPending: PropTypes.func,
		onStart: PropTypes.func,
		onError: PropTypes.func,
		onStop: PropTypes.func,
		onRefresh: PropTypes.func,
		...View.propTypes,
	}

	static defaultProps= {
		cameraFronted: true,
		stopped: false
	}

	onReady(body){
		this.props.onReady ? this.props.onReady(body) : null;
	}

	onPending(body) {
		this.props.onPending ? this.props.onPending(body) : null;
	}

	onStart(event) {
		this.props.onStart ? this.props.onStart(body) : null;
	}

	onError(event) {
		this.props.onError ? this.props.onError(body) : null;
	}

	onStop(event) {
		this.props.onStop ? this.props.onStop(body) : null;
	}

	onRefresh(event) {
		this.props.onRefresh ? this.props.onRefresh(body) : null;
	}

	render() {
		let style = this.props.style;
		if(this.props.style){
			if(this.props.landscape){
				style = {
					...this.props.style,
					transform:[{rotate:'270deg'}],
					width:height,
					height:width
				};
			}else{
				style = {
					width: width,
					height: height,
					...this.props.style
				}
			}
		}
		const nativeProps = {
			...this.props,
			style: {
				...style
			}
		};

		return (
			<RCTStream
				ref={this._assignRoot}
				{...nativeProps}
			/>
		)
	}
}

const RCTStream = requireNativeComponent('RCTStream', Stream);

module.exports = Stream;
