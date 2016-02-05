var React = require('react');

const defaultColors = [
	'rgb(  0,   0,   0)', 'rgb(230,   0,   0)', 'rgb(255, 153,   0)',
	'rgb(255, 255,   0)', 'rgb(  0, 138,   0)', 'rgb(  0, 102, 204)',
	'rgb(153,  51, 255)', 'rgb(255, 255, 255)', 'rgb(250, 204, 204)',
	'rgb(255, 235, 204)', 'rgb(255, 255, 204)', 'rgb(204, 232, 204)',
	'rgb(204, 224, 245)', 'rgb(235, 214, 255)', 'rgb(187, 187, 187)',
	'rgb(240, 102, 102)', 'rgb(255, 194, 102)', 'rgb(255, 255, 102)',
	'rgb(102, 185, 102)', 'rgb(102, 163, 224)', 'rgb(194, 133, 255)',
	'rgb(136, 136, 136)', 'rgb(161,   0,   0)', 'rgb(178, 107,   0)',
	'rgb(178, 178,   0)', 'rgb(  0,  97,   0)', 'rgb(  0,  71, 178)',
	'rgb(107,  36, 178)', 'rgb( 68,  68,  68)', 'rgb( 92,   0,   0)',
	'rgb(102,  61,   0)', 'rgb(102, 102,   0)', 'rgb(  0,  55,   0)',
	'rgb(  0,  41, 102)', 'rgb( 61,  20,  10)',
];

var Toolbar = React.createClass({
	render: function () {
		return (
			<div id="toolbar" className="ql-toolbar-container toolbar">
				<div className="ql-format-group">
					<select className="notebook-selection-dropdown">
						{notebooks}
					</select>
					<select className="ql-font">
						<option value="sans-serif">Sans Serif</option>
						<option value="serif">Serif</option>
						<option value="monospace">Monospace</option>
					</select>
					<span className="ql-format-separator"></span>
					<select className="ql-size">
						<option value="10px">Small</option>
						<option value="13px" defaultValue>Normal</option>
						<option value="18px">Large</option>
						<option value="32px">Huge</option>
					</select>
					<span className="ql-format-separator"></span>
					<span className="ql-bold ql-format-button"></span>
					<span className="ql-italic ql-format-button"></span>
					<span className="ql-strike ql-format-button"></span>
					<span className="ql-underline ql-format-button"></span>
					<span className="ql-format-separator"></span>
					<span className="ql-link ql-format-button"></span>
					<span className="ql-format-separator"></span>
					<select className="ql-background ql-format-button">
						{defaultColors.map(function (color) {
							return (<option value={color} />);
						})}
					</select>
					<span className="ql-format-separator"></span>
					<select className="ql-color ql-format-button">
						{defaultColors.map(function (color) {
							return (<option value={color} />);
						})}
					</select>
					<span className="ql-format-separator"></span>
					<span className="ql-bullet ql-format-button"/>
					<span className="ql-list ql-format-button"/>
				</div>
			</div>
		);
	}
});

module.exports = Toolbar;
