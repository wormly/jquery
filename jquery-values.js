/* jQuery.values: get or set all of the name/value pairs from child input controls	 
 * @argument data {array} If included, will populate all child controls.
 * @returns element if data was provided, or array of values if not
 * Thanks to http://stackoverflow.com/questions/1489486/jquery-plugin-to-serialize-a-form-and-also-restore-populate-the-form
 */

$.fn.values = function (data) {
	var els = this.is(':input') ? this : this.find(':input').get();

	if (arguments.length === 0) {
		// return all data
		data = {};

		$.each(els, function () {
			var supportedType = (/select|textarea/i.test(this.nodeName) || /text|hidden|password|checkbox|range|radio/i.test(this.type));

			if (this.name && !this.disabled && supportedType) {
				if (data[this.name] == undefined) {
					data[this.name] = [];
				}
				val = $(this).val()

				if (/checkbox/i.test(this.type)) {
					if (!this.checked) val = null;
				}

				data[this.name].push(val);
			}
		});

		// Get rid of arrays for elements which are scalar values:
		$.each(data, function (elem, values) {
			if (values.length == 1) {
				data[elem] = values[0]
			}
		});

		return data;
	} else {
		$.each(els, function () {
			if (this.name && data[this.name] !== undefined) {
				var names = data[this.name];
				var $this = $(this);
				if (Object.prototype.toString.call(names) !== '[object Array]') {
					names = [names]; //backwards compat to old version of this code
				}
				if (this.type == 'checkbox' || this.type == 'radio') {
					var val = $this.val();
					var found = false;
					for (var i = 0; i < names.length; i++) {
						if (names[i] == val) {
							found = true;
							break;
						}
					}
					$this.prop("checked", found);
				} else {
					$this.val(names[0]);
				}
			}
		});
		return this;
	}
};