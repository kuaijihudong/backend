/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, Link, browserCompatibleDocumentParser, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, constrainPageCacheTo, createDocument, currentState, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, recallScrollPosition, ref, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  currentState = null;

  loadedAssets = null;

  referer = null;

  createDocument = null;

  xhr = null;

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    reflectNewUrl(url);
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  fetchReplacement = function(url, onLoadFunction) {
    if (onLoadFunction == null) {
      onLoadFunction = (function(_this) {
        return function() {};
      })(this);
    }
    triggerEvent('page:fetch', {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent('page:receive');
      if (doc = processResponse()) {
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        reflectRedirectedUrl();
        onLoadFunction();
        return triggerEvent('page:load');
      } else {
        return document.location.href = url.absolute;
      }
    };
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent('page:restore');
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, i, key, len, pageCacheKeys, results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    results = [];
    for (i = 0, len = pageCacheKeys.length; i < len; i++) {
      key = pageCacheKeys[i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent('page:expire', pageCache[key]);
      results.push(delete pageCache[key]);
    }
    return results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    triggerEvent('page:change');
    return triggerEvent('page:update');
  };

  executeScriptTags = function() {
    var attr, copy, i, j, len, len1, nextSibling, parentNode, ref, ref1, script, scripts;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (i = 0, len = scripts.length; i < len; i++) {
      script = scripts[i];
      if (!((ref = script.type) === '' || ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      ref1 = script.attributes;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        attr = ref1[j];
        copy.setAttribute(attr.name, attr.value);
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(currentState, '', location.href + preservedHash);
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  popCookie = function(name) {
    var ref, value;
    value = ((ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function() {
    return !triggerEvent('page:before-change');
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var ref;
      return (400 <= (ref = xhr.status) && ref < 600);
    };
    validContent = function() {
      return xhr.getResponseHeader('Content-Type').match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var i, len, node, ref, results;
      ref = doc.head.childNodes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        node = ref[i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var i, len, ref, results, value;
      if (a.length > b.length) {
        ref = [b, a], a = ref[0], b = ref[1];
      }
      results = [];
      for (i = 0, len = a.length; i < len; i++) {
        value = a[i];
        if (indexOf.call(b, value) >= 0) {
          results.push(value);
        }
      }
      return results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.body), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  browserCompatibleDocumentParser = function() {
    var createDocumentUsingDOM, createDocumentUsingParser, createDocumentUsingWrite, e, ref, testDoc;
    createDocumentUsingParser = function(html) {
      return (new DOMParser).parseFromString(html, 'text/html');
    };
    createDocumentUsingDOM = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.documentElement.innerHTML = html;
      return doc;
    };
    createDocumentUsingWrite = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.open('replace');
      doc.write(html);
      doc.close();
      return doc;
    };
    try {
      if (window.DOMParser) {
        testDoc = createDocumentUsingParser('<html><body><p>test');
        return createDocumentUsingParser;
      }
    } catch (_error) {
      e = _error;
      testDoc = createDocumentUsingDOM('<html><body><p>test');
      return createDocumentUsingDOM;
    } finally {
      if ((testDoc != null ? (ref = testDoc.body) != null ? ref.childNodes.length : void 0 : void 0) !== 1) {
        return createDocumentUsingWrite;
      }
    }
  };

  ComponentUrl = (function() {
    function ComponentUrl(original) {
      this.original = original != null ? original : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype._parse = function() {
      var ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      ref = this.link, this.href = ref.href, this.protocol = ref.protocol, this.host = ref.host, this.hostname = ref.hostname, this.port = ref.port, this.pathname = ref.pathname, this.search = ref.search, this.hash = ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(superClass) {
    extend(Link, superClass);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, i, len;
      extensions = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      for (i = 0, len = extensions.length; i < len; i++) {
        extension = extensions[i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link1) {
      this.link = link1;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this._crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    Link.prototype._anchored = function() {
      var current;
      return ((this.hash && this.withoutHash()) === (current = new ComponentUrl).withoutHash()) || (this.href === current.href + '#');
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.link;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event1) {
      this.event = event1;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented()) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent('page:change');
      return triggerEvent('page:update');
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent('page:update');
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, ref;
    if ((ref = event.state) != null ? ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    createDocument = browserCompatibleDocumentParser();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (ref = popCookie('request_method')) === 'GET' || ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks
  };

}).call(this);
(function () {
    window.UEDITOR_HOME_URL = '/assets/ueditor/'
})();
/**
 *  ueditor完整配置项
 *  可以在这里配置整个编辑器的特性
 */
/**************************提示********************************
 * 所有被注释的配置项均为UEditor默认值。
 * 修改默认配置请首先确保已经完全明确该参数的真实用途。
 * 主要有两种修改方案，一种是取消此处注释，然后修改成对应参数；另一种是在实例化编辑器时传入对应参数。
 * 当升级编辑器时，可直接使用旧版配置文件替换新版配置文件,不用担心旧版配置文件中因缺少新功能所需的参数而导致脚本报错。
 **************************提示********************************/



(function () {
    /**
     * 编辑器资源文件根路径。它所表示的含义是：以编辑器实例化页面为当前路径，指向编辑器资源文件（即dialog等文件夹）的路径。
     * 鉴于很多同学在使用编辑器的时候出现的种种路径问题，此处强烈建议大家使用"相对于网站根目录的相对路径"进行配置。
     * "相对于网站根目录的相对路径"也就是以斜杠开头的形如"/myProject/ueditor/"这样的路径。
     * 如果站点中有多个不在同一层级的页面需要实例化编辑器，且引用了同一UEditor的时候，此处的URL可能不适用于每个页面的编辑器。
     * 因此，UEditor提供了针对不同页面的编辑器可单独配置的根路径，具体来说，在需要实例化编辑器的页面最顶部写上如下代码即可。当然，需要令此处的URL等于对应的配置。
     * window.UEDITOR_HOME_URL = "/xxxx/xxxx/";
     */
    var URL = window.UEDITOR_HOME_URL || getUEBasePath();

    /**
     * 配置项主体。注意，此处所有涉及到路径的配置别遗漏URL变量。
     */
    window.UEDITOR_CONFIG = {

        //为编辑器实例添加一个路径，这个不能被注释
        UEDITOR_HOME_URL : URL

        //图片上传配置区
        ,imageUrl:URL+"php/imageUp.php"             //图片上传提交地址
        ,imagePath:URL + "php/"                     //图片修正地址，引用了fixedImagePath,如有特殊需求，可自行配置
        //,imageFieldName:"upfile"                  //图片数据的key,若此处修改，需要在后台对应文件修改对应参数
        //,compressSide:0                           //等比压缩的基准，确定maxImageSideLength参数的参照对象。0为按照最长边，1为按照宽度，2为按照高度
        //,maxImageSideLength:900                   //上传图片最大允许的边长，超过会自动等比缩放,不缩放就设置一个比较大的值，更多设置在image.html中
        //,savePath: [ 'upload1', 'upload2', 'upload3' ]    //图片保存在服务器端的目录， 默认为空， 此时在上传图片时会向服务器请求保存图片的目录列表，
                                                            // 如果用户不希望发送请求， 则可以在这里设置与服务器端能够对应上的目录名称列表
                                                            //比如： savePath: [ 'upload1', 'upload2' ]

        //涂鸦图片配置区
        ,scrawlUrl:URL+"php/scrawlUp.php"           //涂鸦上传地址
        ,scrawlPath:URL+"php/"                            //图片修正地址，同imagePath

        //附件上传配置区
        ,fileUrl:URL+"php/fileUp.php"               //附件上传提交地址
        ,filePath:URL + "php/"                   //附件修正地址，同imagePath
        //,fileFieldName:"upfile"                    //附件提交的表单名，若此处修改，需要在后台对应文件修改对应参数

        //远程抓取配置区
        //,catchRemoteImageEnable:true               //是否开启远程图片抓取,默认开启
        ,catcherUrl:URL +"php/getRemoteImage.php"   //处理远程图片抓取的地址
        ,catcherPath:URL + "php/"                  //图片修正地址，同imagePath
        //,catchFieldName:"upfile"                   //提交到后台远程图片uri合集，若此处修改，需要在后台对应文件修改对应参数
        //,separater:'ue_separate_ue'               //提交至后台的远程图片地址字符串分隔符
        //,localDomain:[]                            //本地顶级域名，当开启远程图片抓取时，除此之外的所有其它域名下的图片都将被抓取到本地,默认不抓取127.0.0.1和localhost

        //图片在线管理配置区
        ,imageManagerUrl:URL + "php/imageManager.php"       //图片在线管理的处理地址
        ,imageManagerPath:URL + "php/"                                    //图片修正地址，同imagePath

        //屏幕截图配置区
        ,snapscreenHost: location.hostname                                 //屏幕截图的server端文件所在的网站地址或者ip，请不要加http://
        ,snapscreenServerUrl: URL +"php/imageUp.php" //屏幕截图的server端保存程序，UEditor的范例代码为“URL +"server/upload/php/snapImgUp.php"”
        ,snapscreenPath: URL + "php/"
        ,snapscreenServerPort: location.port                                   //屏幕截图的server端端口
        //,snapscreenImgAlign: ''                                //截图的图片默认的排版方式

        //word转存配置区
        ,wordImageUrl:URL + "php/imageUp.php"             //word转存提交地址
        ,wordImagePath:URL + "php/"                       //
        //,wordImageFieldName:"upfile"                     //word转存表单名若此处修改，需要在后台对应文件修改对应参数

        //视频上传配置区
        ,getMovieUrl:URL+"php/getMovie.php"                   //视频数据获取地址
        ,videoUrl:URL+"php/fileUp.php"               //附件上传提交地址
        ,videoPath:URL + "php/"                   //附件修正地址，同imagePath
        //,videoFieldName:"upfile"                    //附件提交的表单名，若此处修改，需要在后台对应文件修改对应参数

        //工具栏上的所有的功能按钮和下拉框，可以在new编辑器的实例时选择自己需要的从新定义
        , toolbars:[
            ['fullscreen', 'source', '|', 'undo', 'redo', '|',
                'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                'directionalityltr', 'directionalityrtl', 'indent', '|',
                'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap', 'insertframe','insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
                'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
                'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
                'print', 'preview', 'searchreplace', 'help', 'drafts']
        ]
        //当鼠标放在工具栏上时显示的tooltip提示,留空支持自动多语言配置，否则以配置值为准
//        ,labelMap:{
//            'anchor':'', 'undo':''
//        }
        //webAppKey
        //百度应用的APIkey，每个站长必须首先去百度官网注册一个key后方能正常使用app功能
        //,webAppKey:""

        //语言配置项,默认是zh-cn。有需要的话也可以使用如下这样的方式来自动多语言切换，当然，前提条件是lang文件夹下存在对应的语言文件：
        //lang值也可以通过自动获取 (navigator.language||navigator.browserLanguage ||navigator.userLanguage).toLowerCase()
        //,lang:"zh-cn"
        //,langPath:URL +"lang/"

        //启用自动保存
        //,enableAutoSave: true
        //自动保存间隔时间， 单位ms
        //,saveInterval: 500

        //主题配置项,默认是default。有需要的话也可以使用如下这样的方式来自动多主题切换，当然，前提条件是themes文件夹下存在对应的主题文件：
        //现有如下皮肤:default
        //,theme:'default'
        //,themePath:URL +"themes/"

        //若实例化编辑器的页面手动修改的domain，此处需要设置为true
        //,customDomain:false

        //针对getAllHtml方法，会在对应的head标签中增加该编码设置。
        //,charset:"utf-8"

        //常用配置项目
        //,isShow : true    //默认显示编辑器

        //,initialContent:'欢迎使用ueditor!'    //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子

        //,initialFrameWidth:1000  //初始化编辑器宽度,默认1000
        //,initialFrameHeight:320  //初始化编辑器高度,默认320

        //,autoClearinitialContent:true //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了

        //,iframeCssUrl: URL + '/themes/iframe.css' //给编辑器内部引入一个css文件

        //,textarea:'editorValue' // 提交表单时，服务器获取编辑器提交内容的所用的参数，多实例时可以给容器name属性，会将name给定的值最为每个实例的键值，不用每次实例化的时候都设置这个值

        //,focus:false //初始化时，是否让编辑器获得焦点true或false

        //,autoClearEmptyNode : true //getContent时，是否删除空的inlineElement节点（包括嵌套的情况）

        //,fullscreen : false //是否开启初始化时即全屏，默认关闭

        //,readonly : false //编辑器初始化结束后,编辑区域是否是只读的，默认是false

        //,zIndex : 900     //编辑器层级的基数,默认是900

        //,imagePopup:true      //图片操作的浮层开关，默认打开

        //如果自定义，最好给p标签如下的行高，要不输入中文时，会有跳动感
        //,initialStyle:'p{line-height:1em}'//编辑器层级的基数,可以用来改变字体等

        //,autoSyncData:true //自动同步编辑器要提交的数据
        //,emotionLocalization:false //是否开启表情本地化，默认关闭。若要开启请确保emotion文件夹下包含官网提供的images表情文件夹

        //,pasteplain:false  //是否默认为纯文本粘贴。false为不使用纯文本粘贴，true为使用纯文本粘贴
        //纯文本粘贴模式下的过滤规则
//        'filterTxtRules' : function(){
//            function transP(node){
//                node.tagName = 'p';
//                node.setStyle();
//            }
//            return {
//                //直接删除及其字节点内容
//                '-' : 'script style object iframe embed input select',
//                'p': {$:{}},
//                'br':{$:{}},
//                'div':{'$':{}},
//                'li':{'$':{}},
//                'caption':transP,
//                'th':transP,
//                'tr':transP,
//                'h1':transP,'h2':transP,'h3':transP,'h4':transP,'h5':transP,'h6':transP,
//                'td':function(node){
//                    //没有内容的td直接删掉
//                    var txt = !!node.innerText();
//                    if(txt){
//                        node.parentNode.insertAfter(UE.uNode.createText(' &nbsp; &nbsp;'),node);
//                    }
//                    node.parentNode.removeChild(node,node.innerText())
//                }
//            }
//        }()
        //,allHtmlEnabled:false //提交到后台的数据是否包含整个html字符串
        //iframeUrlMap
        //dialog内容的路径 ～会被替换成URL,垓属性一旦打开，将覆盖所有的dialog的默认路径
        //,iframeUrlMap:{
        // 'anchor':'~/dialogs/anchor/anchor.html',
        // }

        //insertorderedlist
        //有序列表的下拉配置,值留空时支持多语言自动识别，若配置值，则以此值为准
//        ,'insertorderedlist':{
//              //自定的样式
//                'num':'1,2,3...',
//                'num1':'1),2),3)...',
//                'num2':'(1),(2),(3)...',
//                'cn':'一,二,三....',
//                'cn1':'一),二),三)....',
//                'cn2':'(一),(二),(三)....',
//             //系统自带
//             'decimal' : '' ,         //'1,2,3...'
//             'lower-alpha' : '' ,    // 'a,b,c...'
//             'lower-roman' : '' ,    //'i,ii,iii...'
//             'upper-alpha' : '' , lang   //'A,B,C'
//             'upper-roman' : ''      //'I,II,III...'
//        }

        //insertunorderedlist
        //无序列表的下拉配置，值留空时支持多语言自动识别，若配置值，则以此值为准
        //,insertunorderedlist : {
        //              //自定的样式
//        'dash' :'— 破折号',
//        'dot':' 。 小圆圈'
//             //系统自带
        //    'circle' : '',  // '○ 小圆圈'
        //    'disc' : '',    // '● 小圆点'
        //    'square' : ''   //'■ 小方块'
        //}
//        ,listDefaultPaddingLeft : '30'//默认的左边缩进的基数倍
//        ,listiconpath : 'http://bs.baidu.com/listicon/'//自定义标号的路径
//        ,maxListLevel : 3 //限制可以tab的级数-1不限制
        //fontfamily
        //字体设置 label留空支持多语言自动切换，若配置，则以配置值为准
//        ,'fontfamily':[
//            { label:'',name:'songti',val:'宋体,SimSun'},
//            { label:'',name:'kaiti',val:'楷体,楷体_GB2312, SimKai'},
//            { label:'',name:'yahei',val:'微软雅黑,Microsoft YaHei'},
//            { label:'',name:'heiti',val:'黑体, SimHei'},
//            { label:'',name:'lishu',val:'隶书, SimLi'},
//            { label:'',name:'andaleMono',val:'andale mono'},
//            { label:'',name:'arial',val:'arial, helvetica,sans-serif'},
//            { label:'',name:'arialBlack',val:'arial black,avant garde'},
//            { label:'',name:'comicSansMs',val:'comic sans ms'},
//            { label:'',name:'impact',val:'impact,chicago'},
//            { label:'',name:'timesNewRoman',val:'times new roman'}
//          ]

        //fontsize
        //字号
        //,'fontsize':[10, 11, 12, 14, 16, 18, 20, 24, 36]

        //paragraph
        //段落格式 值留空时支持多语言自动识别，若配置，则以配置值为准
        //,'paragraph':{'p':'', 'h1':'', 'h2':'', 'h3':'', 'h4':'', 'h5':'', 'h6':''}

        //rowspacingtop
        //段间距 值和显示的名字相同
        //,'rowspacingtop':['5', '10', '15', '20', '25']

        //rowspacingBottom
        //段间距 值和显示的名字相同
        //,'rowspacingbottom':['5', '10', '15', '20', '25']

        //lineheight
        //行内间距 值和显示的名字相同
        //,'lineheight':['1', '1.5','1.75','2', '3', '4', '5']

        //customstyle
        //自定义样式，不支持国际化，此处配置值即可最后显示值
        //block的元素是依据设置段落的逻辑设置的，inline的元素依据BIU的逻辑设置
        //尽量使用一些常用的标签
        //参数说明
        //tag 使用的标签名字
        //label 显示的名字也是用来标识不同类型的标识符，注意这个值每个要不同，
        //style 添加的样式
        //每一个对象就是一个自定义的样式
        //,'customstyle':[
        //      {tag:'h1', name:'tc', label:'', style:'border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:center;margin:0 0 20px 0;'},
        //      {tag:'h1', name:'tl',label:'', style:'border-bottom:#ccc 2px solid;padding:0 4px 0 0;margin:0 0 10px 0;'},
        //      {tag:'span',name:'im', label:'', style:'font-style:italic;font-weight:bold'},
        //      {tag:'span',name:'hi', label:'', style:'font-style:italic;font-weight:bold;color:rgb(51, 153, 204)'}
        //  ]

        //右键菜单的内容，可以参考plugins/contextmenu.js里边的默认菜单的例子，label留空支持国际化，否则以此配置为准
//        ,contextMenu:[
//            {
//                label:'',       //显示的名称
//                cmdName:'selectall',//执行的command命令，当点击这个右键菜单时
//                //exec可选，有了exec就会在点击时执行这个function，优先级高于cmdName
//                exec:function () {
//                    //this是当前编辑器的实例
//                    //this.ui._dialogs['inserttableDialog'].open();
//                }
//            }
//           ]

        //快捷菜单
        //,shortcutMenu:["fontfamily", "fontsize", "bold", "italic", "underline", "forecolor", "backcolor", "insertorderedlist", "insertunorderedlist"]

        //
        //wordCount
        //,wordCount:true          //是否开启字数统计
        //,maximumWords:10000       //允许的最大字符数
        //字数统计提示，{#count}代表当前字数，{#leave}代表还可以输入多少字符数,留空支持多语言自动切换，否则按此配置显示
        //,wordCountMsg:''   //当前已输入 {#count} 个字符，您还可以输入{#leave} 个字符
        //超出字数限制提示  留空支持多语言自动切换，否则按此配置显示
        //,wordOverFlowMsg:''    //<span style="color:red;">你输入的字符个数已经超出最大允许值，服务器可能会拒绝保存！</span>

        //tab
        //点击tab键时移动的距离,tabSize倍数，tabNode什么字符做为单位
        //,tabSize:4
        //,tabNode:'&nbsp;'

        //elementPathEnabled
        //是否启用元素路径，默认是显示
        //,elementPathEnabled : true

        //removeFormat
        //清除格式时可以删除的标签和属性
        //removeForamtTags标签
        //,removeFormatTags:'b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var'
        //removeFormatAttributes属性
        //,removeFormatAttributes:'class,style,lang,width,height,align,hspace,valign'

        //undo
        //可以最多回退的次数,默认20
        //,maxUndoCount:20
        //当输入的字符数超过该值时，保存一次现场
        //,maxInputCount:1

        //autoHeightEnabled
        // 是否自动长高,默认true
        //,autoHeightEnabled:true

        //scaleEnabled
        //是否可以拉伸长高,默认true(当开启时，自动长高失效)
        //,scaleEnabled:false
        //,minFrameWidth:800    //编辑器拖动时最小宽度,默认800
        //,minFrameHeight:220  //编辑器拖动时最小高度,默认220

        //tableDragable
        //表格是否可以拖拽
        //,tableDragable: true

        //autoFloatEnabled
        //是否保持toolbar的位置不动,默认true
        //,autoFloatEnabled:true
        //浮动时工具栏距离浏览器顶部的高度，用于某些具有固定头部的页面
        //,topOffset:30
        //编辑器底部距离工具栏高度(如果参数大于等于编辑器高度，则设置无效)
        //,toolbarTopOffset:400

        //indentValue
        //首行缩进距离,默认是2em
        //,indentValue:'2em'

        //pageBreakTag
        //分页标识符,默认是_ueditor_page_break_tag_
        //,pageBreakTag:'_ueditor_page_break_tag_'

        //sourceEditor
        //源码的查看方式,codemirror 是代码高亮，textarea是文本框,默认是codemirror
        //注意默认codemirror只能在ie8+和非ie中使用
        //,sourceEditor:"codemirror"
        //如果sourceEditor是codemirror，还用配置一下两个参数
        //codeMirrorJsUrl js加载的路径，默认是 URL + "third-party/codemirror/codemirror.js"
        //,codeMirrorJsUrl:URL + "third-party/codemirror/codemirror.js"
        //codeMirrorCssUrl css加载的路径，默认是 URL + "third-party/codemirror/codemirror.css"
        //,codeMirrorCssUrl:URL + "third-party/codemirror/codemirror.css"
        //编辑器初始化完成后是否进入源码模式，默认为否。
        //,sourceEditorFirst:false

        //autotypeset
        //  //自动排版参数
        //  ,autotypeset:{
        //      mergeEmptyline : true,         //合并空行
        //      removeClass : true,           //去掉冗余的class
        //      removeEmptyline : false,      //去掉空行
        //      textAlign : "left" ,           //段落的排版方式，可以是 left,right,center,justify 去掉这个属性表示不执行排版
        //      imageBlockLine : 'center',      //图片的浮动方式，独占一行剧中,左右浮动，默认: center,left,right,none 去掉这个属性表示不执行排版
        //      pasteFilter : false,            //根据规则过滤没事粘贴进来的内容
        //      clearFontSize : false,          //去掉所有的内嵌字号，使用编辑器默认的字号
        //      clearFontFamily : false,        //去掉所有的内嵌字体，使用编辑器默认的字体
        //      removeEmptyNode : false ,       // 去掉空节点
        //      //可以去掉的标签
        //      removeTagNames : {标签名字:1},
        //      indent : false,                 // 行首缩进
        //      indentValue : '2em'             //行首缩进的大小
        //  },
        //填写过滤规则
        //,filterRules : {}
        //,autoTransWordToList:false  //禁止word中粘贴进来的列表自动变成列表标签
        //,disabledTableInTable:true  //禁止表格嵌套
    };

    function getUEBasePath ( docUrl, confUrl ) {

        return getBasePath( docUrl || self.document.URL || self.location.href, confUrl || getConfigFilePath() );

    }

    function getConfigFilePath () {

        var configPath = document.getElementsByTagName('script');

        return configPath[ configPath.length -1 ].src;

    }

    function getBasePath ( docUrl, confUrl ) {

        var basePath = confUrl;


        if(/^(\/|\\\\)/.test(confUrl)){

            basePath = /^.+?\w(\/|\\\\)/.exec(docUrl)[0] + confUrl.replace(/^(\/|\\\\)/,'');

        }else if ( !/^[a-z]+:/i.test( confUrl ) ) {

            docUrl = docUrl.split( "#" )[0].split( "?" )[0].replace( /[^\\\/]+$/, '' );

            basePath = docUrl + "" + confUrl;

        }

        return optimizationPath( basePath );

    }

    function optimizationPath ( path ) {

        var protocol = /^[a-z]+:\/\//.exec( path )[ 0 ],
            tmp = null,
            res = [];

        path = path.replace( protocol, "" ).split( "?" )[0].split( "#" )[0];

        path = path.replace( /\\/g, '/').split( /\// );

        path[ path.length - 1 ] = "";

        while ( path.length ) {

            if ( ( tmp = path.shift() ) === ".." ) {
                res.pop();
            } else if ( tmp !== "." ) {
                res.push( tmp );
            }

        }

        return protocol + res.join( "/" );

    }

    window.UE = {
        getUEBasePath: getUEBasePath
    };

})();
(function(){function X(d,a,e){var b;a=a.toLowerCase();return(b=d.__allListeners||e&&(d.__allListeners={}))&&(b[a]||e&&(b[a]=[]))}function Y(d,a,e,b,c,g){b=b&&d[a];var f;for(!b&&(b=d[e]);!b&&(f=(f||d).parentNode);){if("BODY"==f.tagName||g&&!g(f))return null;b=f[e]}return b&&c&&!c(b)?Y(b,a,e,!1,c):b}UEDITOR_CONFIG=window.UEDITOR_CONFIG||{};var s=window.baidu||{};window.baidu=s;window.UE=s.editor=window.UE||{};UE.plugins={};UE.commands={};UE.instants={};UE.I18N={};UE.version="1.3.6";var I=UE.dom={},
q=UE.browser=function(){var d=navigator.userAgent.toLowerCase(),a=window.opera,e={ie:/(msie\s|trident.*rv:)([\w.]+)/.test(d),opera:!!a&&a.version,webkit:-1<d.indexOf(" applewebkit/"),mac:-1<d.indexOf("macintosh"),quirks:"BackCompat"==document.compatMode};e.gecko="Gecko"==navigator.product&&!e.webkit&&!e.opera&&!e.ie;var b=0;e.ie&&(b=1*(d.match(/(msie\s|trident.*rv:)([\w.]+)/)[2]||0),e.ie11Compat=11==document.documentMode,e.ie9Compat=9==document.documentMode,e.ie8=!!document.documentMode,e.ie8Compat=
8==document.documentMode,e.ie7Compat=7==b&&!document.documentMode||7==document.documentMode,e.ie6Compat=7>b||e.quirks,e.ie9above=8<b,e.ie9below=9>b);if(e.gecko){var c=d.match(/rv:([\d\.]+)/);c&&(c=c[1].split("."),b=1E4*c[0]+100*(c[1]||0)+1*(c[2]||0))}/chrome\/(\d+\.\d)/i.test(d)&&(e.chrome=+RegExp.$1);/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(d)&&!/chrome/i.test(d)&&(e.safari=+(RegExp.$1||RegExp.$2));e.opera&&(b=parseFloat(a.version()));e.webkit&&(b=parseFloat(d.match(/ applewebkit\/(\d+)/)[1]));
e.version=b;e.isCompatible=!e.mobile&&(e.ie&&6<=b||e.gecko&&10801<=b||e.opera&&9.5<=b||e.air&&1<=b||e.webkit&&522<=b||!1);return e}(),H=q.ie,ka=q.opera,p=UE.utils={each:function(d,a,e){if(null!=d)if(d.length===+d.length)for(var b=0,c=d.length;b<c;b++){if(!1===a.call(e,d[b],b,d))return!1}else for(b in d)if(d.hasOwnProperty(b)&&!1===a.call(e,d[b],b,d))return!1},makeInstance:function(d){var a=new Function;a.prototype=d;d=new a;a.prototype=null;return d},extend:function(d,a,e){if(a)for(var b in a)e&&
d.hasOwnProperty(b)||(d[b]=a[b]);return d},extend2:function(d){for(var a=arguments,e=1;e<a.length;e++){var b=a[e],c;for(c in b)d.hasOwnProperty(c)||(d[c]=b[c])}return d},inherits:function(d,a){var e=d.prototype,b=p.makeInstance(a.prototype);p.extend(b,e,!0);d.prototype=b;return b.constructor=d},bind:function(d,a){return function(){return d.apply(a,arguments)}},defer:function(d,a,e){var b;return function(){e&&clearTimeout(b);b=setTimeout(d,a)}},indexOf:function(d,a,e){var b=-1;e=this.isNumber(e)?e:
0;this.each(d,function(c,g){if(g>=e&&c===a)return b=g,!1});return b},removeItem:function(d,a){for(var e=0,b=d.length;e<b;e++)d[e]===a&&(d.splice(e,1),e--)},trim:function(d){return d.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g,"")},listToMap:function(d){if(!d)return{};d=p.isArray(d)?d:d.split(",");for(var a=0,e,b={};e=d[a++];)b[e.toUpperCase()]=b[e]=1;return b},unhtml:function(d,a){return d?d.replace(a||/[&<">'](?:(amp|lt|quot|gt|#39|nbsp);)?/g,function(a,b){return b?a:{"<":"&lt;","&":"&amp;",'"':"&quot;",
">":"&gt;","'":"&#39;"}[a]}):""},html:function(d){return d?d.replace(/&((g|l|quo)t|amp|#39|nbsp);/g,function(a){return{"&lt;":"<","&amp;":"&","&quot;":'"',"&gt;":">","&#39;":"'","&nbsp;":" "}[a]}):""},cssStyleToDomStyle:function(){var d=document.createElement("div").style,a={"float":void 0!=d.cssFloat?"cssFloat":void 0!=d.styleFloat?"styleFloat":"float"};return function(e){return a[e]||(a[e]=e.toLowerCase().replace(/-./g,function(a){return a.charAt(1).toUpperCase()}))}}(),loadFile:function(){function d(e,
b){try{for(var c=0,g;g=a[c++];)if(g.doc===e&&g.url==(b.src||b.href))return g}catch(f){return null}}var a=[];return function(e,b,c){var g=d(e,b);if(g)g.ready?c&&c():g.funs.push(c);else if(a.push({doc:e,url:b.src||b.href,funs:[c]}),!e.body){c=[];for(var f in b)"tag"!=f&&c.push(f+'="'+b[f]+'"');e.write("<"+b.tag+" "+c.join(" ")+" ></"+b.tag+">")}else if(!b.id||!e.getElementById(b.id)){var k=e.createElement(b.tag);delete b.tag;for(f in b)k.setAttribute(f,b[f]);k.onload=k.onreadystatechange=function(){if(!this.readyState||
/loaded|complete/.test(this.readyState)){g=d(e,b);if(0<g.funs.length){g.ready=1;for(var a;a=g.funs.pop();)a()}k.onload=k.onreadystatechange=null}};k.onerror=function(){throw Error("The load "+(b.href||b.src)+" fails,check the url settings of file ueditor.config.js ");};e.getElementsByTagName("head")[0].appendChild(k)}}}(),isEmptyObject:function(d){if(null==d)return!0;if(this.isArray(d)||this.isString(d))return 0===d.length;for(var a in d)if(d.hasOwnProperty(a))return!1;return!0},fixColor:function(d,
a){if(/color/i.test(d)&&/rgba?/.test(a)){var e=a.split(",");if(3<e.length)return"";a="#";for(var b=0,c;c=e[b++];)c=parseInt(c.replace(/[^\d]/gi,""),10).toString(16),a+=1==c.length?"0"+c:c;a=a.toUpperCase()}return a},optCss:function(d){function a(a,b){if(!a)return"";var f=a.top,k=a.bottom,e=a.left,d=a.right,n="";if(f&&e&&k&&d)n+=";"+b+":"+(f==k&&k==e&&e==d?f:f==k&&e==d?f+" "+e:e==d?f+" "+e+" "+k:f+" "+d+" "+k+" "+e)+";";else for(var h in a)n+=";"+b+"-"+h+":"+a[h]+";";return n}var e,b;d=d.replace(/(padding|margin|border)\-([^:]+):([^;]+);?/gi,
function(a,g,f,k){if(1==k.split(" ").length)switch(g){case "padding":return!e&&(e={}),e[f]=k,"";case "margin":return!b&&(b={}),b[f]=k,"";case "border":return"initial"==k?"":a}return a});d+=a(e,"padding")+a(b,"margin");return d.replace(/^[ \n\r\t;]*|[ \n\r\t]*$/,"").replace(/;([ \n\r\t]+)|\1;/g,";").replace(/(&((l|g)t|quot|#39))?;{2,}/g,function(a,b){return b?b+";;":";"})},clone:function(d,a){var e;a=a||{};for(var b in d)d.hasOwnProperty(b)&&(e=d[b],"object"==typeof e?(a[b]=p.isArray(e)?[]:{},p.clone(d[b],
a[b])):a[b]=e);return a},transUnitToPx:function(d){if(!/(pt|cm)/.test(d))return d;var a;d.replace(/([\d.]+)(\w+)/,function(e,b,c){d=b;a=c});switch(a){case "cm":d=25*parseFloat(d);break;case "pt":d=Math.round(96*parseFloat(d)/72)}return d+(d?"px":"")},domReady:function(){function d(e){for(e.isReady=!0;e=a.pop();e());}var a=[];return function(e,b){b=b||window;var c=b.document;e&&a.push(e);"complete"===c.readyState?d(c):(c.isReady&&d(c),q.ie&&11!=q.version?(function(){if(!c.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(arguments.callee,
0);return}d(c)}}(),b.attachEvent("onload",function(){d(c)})):(c.addEventListener("DOMContentLoaded",function(){c.removeEventListener("DOMContentLoaded",arguments.callee,!1);d(c)},!1),b.addEventListener("load",function(){d(c)},!1)))}}(),cssRule:q.ie&&11!=q.version?function(d,a,e){var b,c;if(void 0===a||a&&a.nodeType&&9==a.nodeType){if(e=a&&a.nodeType&&9==a.nodeType?a:e||document,b=e.indexList||(e.indexList={}),c=b[d],void 0!==c)return e.styleSheets[c].cssText}else{e=e||document;b=e.indexList||(e.indexList=
{});c=b[d];if(""===a)return void 0!==c?(e.styleSheets[c].cssText="",delete b[d],!0):!1;void 0!==c?sheetStyle=e.styleSheets[c]:(sheetStyle=e.createStyleSheet("",c=e.styleSheets.length),b[d]=c);sheetStyle.cssText=a}}:function(d,a,e){var b;if(void 0===a||a&&a.nodeType&&9==a.nodeType)return e=a&&a.nodeType&&9==a.nodeType?a:e||document,(b=e.getElementById(d))?b.innerHTML:void 0;e=e||document;b=e.getElementById(d);if(""===a)return b?(b.parentNode.removeChild(b),!0):!1;b?b.innerHTML=a:(b=e.createElement("style"),
b.id=d,b.innerHTML=a,e.getElementsByTagName("head")[0].appendChild(b))},sort:function(d,a){a=a||function(a,f){return a.localeCompare(f)};for(var e=0,b=d.length;e<b;e++)for(var c=e,g=d.length;c<g;c++)if(0<a(d[e],d[c])){var f=d[e];d[e]=d[c];d[c]=f}return d},clearEmptyAttrs:function(d){for(var a in d)""===d[a]&&delete d[a];return d}};p.each("String Function Array Number RegExp Object".split(" "),function(d){UE.utils["is"+d]=function(a){return Object.prototype.toString.apply(a)=="[object "+d+"]"}});var V=
UE.EventBase=function(){};V.prototype={addListener:function(d,a){d=p.trim(d).split(/\s+/);for(var e=0,b;b=d[e++];)X(this,b,!0).push(a)},on:function(d,a){return this.addListener(d,a)},off:function(d,a){return this.removeListener(d,a)},trigger:function(){return this.fireEvent.apply(this,arguments)},removeListener:function(d,a){d=p.trim(d).split(/\s+/);for(var e=0,b;b=d[e++];)p.removeItem(X(this,b)||[],a)},fireEvent:function(){for(var d=arguments[0],d=p.trim(d).split(" "),a=0,e;e=d[a++];){var b=X(this,
e),c,g,f;if(b)for(f=b.length;f--;)if(b[f]){g=b[f].apply(this,arguments);if(!0===g)return g;void 0!==g&&(c=g)}if(g=this["on"+e.toLowerCase()])c=g.apply(this,arguments)}return c}};var v=I.dtd=function(){function d(a){for(var f in a)a[f.toUpperCase()]=a[f];return a}var a=p.extend2,e=d({isindex:1,fieldset:1}),b=d({input:1,button:1,select:1,textarea:1,label:1}),c=a(d({a:1}),b),g=a({iframe:1},c),f=d({hr:1,ul:1,menu:1,div:1,blockquote:1,noscript:1,table:1,center:1,address:1,dir:1,pre:1,h5:1,dl:1,h4:1,noframes:1,
h6:1,ol:1,h1:1,h3:1,h2:1}),k=d({ins:1,del:1,script:1,style:1}),l=a(d({b:1,acronym:1,bdo:1,"var":1,"#":1,abbr:1,code:1,br:1,i:1,cite:1,kbd:1,u:1,strike:1,s:1,tt:1,strong:1,q:1,samp:1,em:1,dfn:1,span:1}),k),m=a(d({sub:1,img:1,embed:1,object:1,sup:1,basefont:1,map:1,applet:1,font:1,big:1,small:1}),l),n=a(d({p:1}),m),b=a(d({iframe:1}),m,b),m=d({img:1,embed:1,noscript:1,br:1,kbd:1,center:1,button:1,basefont:1,h5:1,h4:1,samp:1,h6:1,ol:1,h1:1,h3:1,h2:1,form:1,font:1,"#":1,select:1,menu:1,ins:1,abbr:1,label:1,
code:1,table:1,script:1,cite:1,input:1,iframe:1,strong:1,textarea:1,noframes:1,big:1,small:1,span:1,hr:1,sub:1,bdo:1,"var":1,div:1,object:1,sup:1,strike:1,dir:1,map:1,dl:1,applet:1,del:1,isindex:1,fieldset:1,ul:1,b:1,acronym:1,a:1,blockquote:1,i:1,u:1,s:1,tt:1,address:1,q:1,pre:1,p:1,em:1,dfn:1}),r=a(d({a:0}),b),t=d({tr:1}),x=d({"#":1}),w=a(d({param:1}),m),u=a(d({form:1}),e,g,f,n),P=d({li:1,ol:1,ul:1}),F=d({style:1,script:1}),D=d({base:1,link:1,meta:1,title:1}),F=a(D,F),L=d({head:1,body:1}),W=d({html:1}),
q=d({address:1,blockquote:1,center:1,dir:1,div:1,dl:1,fieldset:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,hr:1,isindex:1,menu:1,noframes:1,ol:1,p:1,pre:1,table:1,ul:1}),s=d({area:1,base:1,basefont:1,br:1,col:1,command:1,dialog:1,embed:1,hr:1,img:1,input:1,isindex:1,keygen:1,link:1,meta:1,param:1,source:1,track:1,wbr:1});return d({$nonBodyContent:a(W,L,D),$block:q,$inline:r,$inlineWithA:a(d({a:1}),r),$body:a(d({script:1,style:1}),q),$cdata:d({script:1,style:1}),$empty:s,$nonChild:d({iframe:1,textarea:1}),
$listItem:d({dd:1,dt:1,li:1}),$list:d({ul:1,ol:1,dl:1}),$isNotEmpty:d({table:1,ul:1,ol:1,dl:1,iframe:1,area:1,base:1,col:1,hr:1,img:1,embed:1,input:1,link:1,meta:1,param:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1}),$removeEmpty:d({a:1,abbr:1,acronym:1,address:1,b:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,q:1,s:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,tt:1,u:1,"var":1}),$removeEmptyBlock:d({p:1,div:1}),$tableContent:d({caption:1,col:1,colgroup:1,tbody:1,td:1,tfoot:1,
th:1,thead:1,tr:1,table:1}),$notTransContent:d({pre:1,script:1,style:1,textarea:1}),html:L,head:F,style:x,script:x,body:u,base:{},link:{},meta:{},title:x,col:{},tr:d({td:1,th:1}),img:{},embed:{},colgroup:d({thead:1,col:1,tbody:1,tr:1,tfoot:1}),noscript:u,td:u,br:{},th:u,center:u,kbd:r,button:a(n,f),basefont:{},h5:r,h4:r,samp:r,h6:r,ol:P,h1:r,h3:r,option:x,h2:r,form:a(e,g,f,n),select:d({optgroup:1,option:1}),font:r,ins:r,menu:P,abbr:r,label:r,table:d({thead:1,col:1,tbody:1,tr:1,colgroup:1,caption:1,
tfoot:1}),code:r,tfoot:t,cite:r,li:u,input:{},iframe:u,strong:r,textarea:x,noframes:u,big:r,small:r,span:d({"#":1,br:1,b:1,strong:1,u:1,i:1,em:1,sub:1,sup:1,strike:1,span:1}),hr:r,dt:r,sub:r,optgroup:d({option:1}),param:{},bdo:r,"var":r,div:u,object:w,sup:r,dd:u,strike:r,area:{},dir:P,map:a(d({area:1,form:1,p:1}),e,k,f),applet:w,dl:d({dt:1,dd:1}),del:r,isindex:{},fieldset:a(d({legend:1}),m),thead:t,ul:P,acronym:r,b:r,a:a(d({a:1}),b),blockquote:a(d({td:1,tr:1,tbody:1,li:1}),u),caption:r,i:r,u:r,tbody:t,
s:r,address:a(g,n),tt:r,legend:r,q:r,pre:a(l,c),p:a(d({a:1}),r),em:r,dfn:r})}(),da=H&&9>q.version?{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder"}:{tabindex:"tabIndex",readonly:"readOnly"},oa=p.listToMap("-webkit-box -moz-box block list-item table table-row-group table-header-group table-footer-group table-row table-column-group table-column table-cell table-caption".split(" ")),
d=I.domUtils={NODE_ELEMENT:1,NODE_DOCUMENT:9,NODE_TEXT:3,NODE_COMMENT:8,NODE_DOCUMENT_FRAGMENT:11,POSITION_IDENTICAL:0,POSITION_DISCONNECTED:1,POSITION_FOLLOWING:2,POSITION_PRECEDING:4,POSITION_IS_CONTAINED:8,POSITION_CONTAINS:16,fillChar:H&&"6"==q.version?"\ufeff":"\u200b",keys:{8:1,46:1,16:1,17:1,18:1,37:1,38:1,39:1,40:1,13:1},getPosition:function(d,a){if(d===a)return 0;var e,b=[d],c=[a];for(e=d;e=e.parentNode;){if(e===a)return 10;b.push(e)}for(e=a;e=e.parentNode;){if(e===d)return 20;c.push(e)}b.reverse();
c.reverse();if(b[0]!==c[0])return 1;for(e=-1;e++,b[e]===c[e];);d=b[e];for(a=c[e];d=d.nextSibling;)if(d===a)return 4;return 2},getNodeIndex:function(d,a){for(var e=d,b=0;e=e.previousSibling;)a&&3==e.nodeType?e.nodeType!=e.nextSibling.nodeType&&b++:b++;return b},inDoc:function(h,a){return 10==d.getPosition(h,a)},findParent:function(h,a,e){if(h&&!d.isBody(h))for(h=e?h:h.parentNode;h;){if(!a||a(h)||d.isBody(h))return a&&!a(h)&&d.isBody(h)?null:h;h=h.parentNode}return null},findParentByTagName:function(h,
a,e,b){a=p.listToMap(p.isArray(a)?a:[a]);return d.findParent(h,function(c){return a[c.tagName]&&!(b&&b(c))},e)},findParents:function(h,a,e,b){for(a=a&&(e&&e(h)||!e)?[h]:[];h=d.findParent(h,e);)a.push(h);return b?a:a.reverse()},insertAfter:function(d,a){return d.nextSibling?d.parentNode.insertBefore(a,d.nextSibling):d.parentNode.appendChild(a)},remove:function(d,a){var e=d.parentNode,b;if(e){if(a&&d.hasChildNodes())for(;b=d.firstChild;)e.insertBefore(b,d);e.removeChild(d)}return d},getNextDomNode:function(d,
a,e,b){return Y(d,"firstChild","nextSibling",a,e,b)},getPreDomNode:function(d,a,e,b){return Y(d,"lastChild","previousSibling",a,e,b)},isBookmarkNode:function(d){return 1==d.nodeType&&d.id&&/^_baidu_bookmark_/i.test(d.id)},getWindow:function(d){d=d.ownerDocument||d;return d.defaultView||d.parentWindow},getCommonAncestor:function(d,a){if(d===a)return d;for(var e=[d],b=[a],c=d,g=-1;c=c.parentNode;){if(c===a)return c;e.push(c)}for(c=a;c=c.parentNode;){if(c===d)return c;b.push(c)}e.reverse();for(b.reverse();g++,
e[g]===b[g];);return 0==g?null:e[g-1]},clearEmptySibling:function(h,a,e){function b(a,b){for(var f;a&&!d.isBookmarkNode(a)&&(d.isEmptyInlineElement(a)||!RegExp("[^\t\n\r"+d.fillChar+"]").test(a.nodeValue));)f=a[b],d.remove(a),a=f}!a&&b(h.nextSibling,"nextSibling");!e&&b(h.previousSibling,"previousSibling")},split:function(h,a){var e=h.ownerDocument;if(q.ie&&a==h.nodeValue.length){var b=e.createTextNode("");return d.insertAfter(h,b)}b=h.splitText(a);q.ie8&&(e=e.createTextNode(""),d.insertAfter(b,e),
d.remove(e));return b},isWhitespace:function(h){return!RegExp("[^ \t\n\r"+d.fillChar+"]").test(h.nodeValue)},getXY:function(d){for(var a=0,e=0;d.offsetParent;)e+=d.offsetTop,a+=d.offsetLeft,d=d.offsetParent;return{x:a,y:e}},on:function(d,a,e){var b=p.isArray(a)?a:p.trim(a).split(/\s+/),c=b.length;if(c)for(;c--;)if(a=b[c],d.addEventListener)d.addEventListener(a,e,!1);else{e._d||(e._d={els:[]});var g=a+e.toString(),f=p.indexOf(e._d.els,d);e._d[g]&&-1!=f||(-1==f&&e._d.els.push(d),e._d[g]||(e._d[g]=function(a){return e.call(a.srcElement,
a||window.event)}),d.attachEvent("on"+a,e._d[g]))}d=null},un:function(d,a,e){var b=p.isArray(a)?a:p.trim(a).split(/\s+/),c=b.length;if(c)for(;c--;)if(a=b[c],d.removeEventListener)d.removeEventListener(a,e,!1);else{var g=a+e.toString();try{d.detachEvent("on"+a,e._d?e._d[g]:e)}catch(f){}e._d&&e._d[g]&&(a=p.indexOf(e._d.els,d),-1!=a&&e._d.els.splice(a,1),0==e._d.els.length&&delete e._d[g])}},isSameElement:function(h,a){if(h.tagName!=a.tagName)return!1;var e=h.attributes,b=a.attributes;if(!H&&e.length!=
b.length)return!1;for(var c,g,f=0,k=0,l=0;c=e[l++];){if("style"==c.nodeName)if(c.specified&&f++,d.isSameStyle(h,a))continue;else return!1;if(H)if(c.specified)f++,g=b.getNamedItem(c.nodeName);else continue;else g=a.attributes[c.nodeName];if(!g.specified||c.nodeValue!=g.nodeValue)return!1}if(H){for(l=0;g=b[l++];)g.specified&&k++;if(f!=k)return!1}return!0},isSameStyle:function(d,a){var e=d.style.cssText.replace(/( ?; ?)/g,";").replace(/( ?: ?)/g,":"),b=a.style.cssText.replace(/( ?; ?)/g,";").replace(/( ?: ?)/g,
":");if(q.opera){e=d.style;b=a.style;if(e.length!=b.length)return!1;for(var c in e)if(!/^(\d+|csstext)$/i.test(c)&&e[c]!=b[c])return!1;return!0}if(!e||!b)return e==b;e=e.split(";");b=b.split(";");if(e.length!=b.length)return!1;c=0;for(var g;g=e[c++];)if(-1==p.indexOf(b,g))return!1;return!0},isBlockElm:function(h){return 1==h.nodeType&&(v.$block[h.tagName]||oa[d.getComputedStyle(h,"display")])&&!v.$nonChild[h.tagName]},isBody:function(d){return d&&1==d.nodeType&&"body"==d.tagName.toLowerCase()},breakParent:function(h,
a){var e,b=h,c=h,g,f;do{b=b.parentNode;g?(e=b.cloneNode(!1),e.appendChild(g),g=e,e=b.cloneNode(!1),e.appendChild(f),f=e):(g=b.cloneNode(!1),f=g.cloneNode(!1));for(;e=c.previousSibling;)g.insertBefore(e,g.firstChild);for(;e=c.nextSibling;)f.appendChild(e);c=b}while(a!==b);e=a.parentNode;e.insertBefore(g,a);e.insertBefore(f,a);e.insertBefore(h,f);d.remove(a);return h},isEmptyInlineElement:function(h){if(1!=h.nodeType||!v.$removeEmpty[h.tagName])return 0;for(h=h.firstChild;h;){if(d.isBookmarkNode(h)||
1==h.nodeType&&!d.isEmptyInlineElement(h)||3==h.nodeType&&!d.isWhitespace(h))return 0;h=h.nextSibling}return 1},trimWhiteTextNode:function(h){function a(a){for(var b;(b=h[a])&&3==b.nodeType&&d.isWhitespace(b);)h.removeChild(b)}a("firstChild");a("lastChild")},mergeChild:function(h,a,e){a=d.getElementsByTagName(h,h.tagName.toLowerCase());for(var b=0,c;c=a[b++];)if(c.parentNode&&!d.isBookmarkNode(c))if("span"==c.tagName.toLowerCase()){if(h===c.parentNode&&(d.trimWhiteTextNode(h),1==h.childNodes.length)){h.style.cssText=
c.style.cssText+";"+h.style.cssText;d.remove(c,!0);continue}c.style.cssText=h.style.cssText+";"+c.style.cssText;if(e){var g=e.style;if(g)for(var g=g.split(";"),f=0,k;k=g[f++];)c.style[p.cssStyleToDomStyle(k.split(":")[0])]=k.split(":")[1]}d.isSameStyle(c,h)&&d.remove(c,!0)}else d.isSameElement(h,c)&&d.remove(c,!0)},getElementsByTagName:function(h,a,e){if(e&&p.isString(e)){var b=e;e=function(a){return d.hasClass(a,b)}}a=p.trim(a).replace(/[ ]{2,}/g," ").split(" ");for(var c=[],g=0,f;f=a[g++];){f=h.getElementsByTagName(f);
for(var k=0,l;l=f[k++];)e&&!e(l)||c.push(l)}return c},mergeToParent:function(h){for(var a=h.parentNode;a&&v.$removeEmpty[a.tagName];){if(a.tagName==h.tagName||"A"==a.tagName){d.trimWhiteTextNode(a);if("SPAN"==a.tagName&&!d.isSameStyle(a,h)||"A"==a.tagName&&"SPAN"==h.tagName)if(1<a.childNodes.length||a!==h.parentNode){h.style.cssText=a.style.cssText+";"+h.style.cssText;a=a.parentNode;continue}else a.style.cssText+=";"+h.style.cssText,"A"==a.tagName&&(a.style.textDecoration="underline");if("A"!=a.tagName){a===
h.parentNode&&d.remove(h,!0);break}}a=a.parentNode}},mergeSibling:function(h,a,e){function b(a,b,f){var k;if((k=f[a])&&!d.isBookmarkNode(k)&&1==k.nodeType&&d.isSameElement(f,k)){for(;k.firstChild;)"firstChild"==b?f.insertBefore(k.lastChild,f.firstChild):f.appendChild(k.firstChild);d.remove(k)}}!a&&b("previousSibling","firstChild",h);!e&&b("nextSibling","lastChild",h)},unSelectable:H||q.opera?function(d){d.onselectstart=function(){return!1};d.onclick=d.onkeyup=d.onkeydown=function(){return!1};d.unselectable=
"on";d.setAttribute("unselectable","on");for(var a=0,e;e=d.all[a++];)switch(e.tagName.toLowerCase()){case "iframe":case "textarea":case "input":case "select":break;default:e.unselectable="on",d.setAttribute("unselectable","on")}}:function(d){d.style.MozUserSelect=d.style.webkitUserSelect=d.style.KhtmlUserSelect="none"},removeAttributes:function(d,a){a=p.isArray(a)?a:p.trim(a).replace(/[ ]{2,}/g," ").split(" ");for(var e=0,b;b=a[e++];){b=da[b]||b;switch(b){case "className":d[b]="";break;case "style":d.style.cssText=
"",!q.ie&&d.removeAttributeNode(d.getAttributeNode("style"))}d.removeAttribute(b)}},createElement:function(h,a,e){return d.setAttributes(h.createElement(a),e)},setAttributes:function(d,a){for(var e in a)if(a.hasOwnProperty(e)){var b=a[e];switch(e){case "class":d.className=b;break;case "style":d.style.cssText=d.style.cssText+";"+b;break;case "innerHTML":d[e]=b;break;case "value":d.value=b;break;default:d.setAttribute(da[e]||e,b)}}return d},getComputedStyle:function(h,a){if(-1<"width height top left".indexOf(a))return h["offset"+
a.replace(/^\w/,function(a){return a.toUpperCase()})]+"px";3==h.nodeType&&(h=h.parentNode);if(q.ie&&9>q.version&&"font-size"==a&&!h.style.fontSize&&!v.$empty[h.tagName]&&!v.$nonChild[h.tagName]){var e=h.ownerDocument.createElement("span");e.style.cssText="padding:0;border:0;font-family:simsun;";e.innerHTML=".";h.appendChild(e);var b=e.offsetHeight;h.removeChild(e);e=null;return b+"px"}try{e=d.getStyle(h,a)||(window.getComputedStyle?d.getWindow(h).getComputedStyle(h,"").getPropertyValue(a):(h.currentStyle||
h.style)[p.cssStyleToDomStyle(a)])}catch(c){return""}return p.transUnitToPx(p.fixColor(a,e))},removeClasses:function(h,a){a=p.isArray(a)?a:p.trim(a).replace(/[ ]{2,}/g," ").split(" ");for(var e=0,b,c=h.className;b=a[e++];)c=c.replace(RegExp("\\b"+b+"\\b"),"");(c=p.trim(c).replace(/[ ]{2,}/g," "))?h.className=c:d.removeAttributes(h,["class"])},addClass:function(d,a){if(d){a=p.trim(a).replace(/[ ]{2,}/g," ").split(" ");for(var e=0,b,c=d.className;b=a[e++];)RegExp("\\b"+b+"\\b").test(c)||(c+=" "+b);
d.className=p.trim(c)}},hasClass:function(d,a){if(p.isRegExp(a))return a.test(d.className);a=p.trim(a).replace(/[ ]{2,}/g," ").split(" ");for(var e=0,b,c=d.className;b=a[e++];)if(!RegExp("\\b"+b+"\\b","i").test(c))return!1;return e-1==a.length},preventDefault:function(d){d.preventDefault?d.preventDefault():d.returnValue=!1},removeStyle:function(h,a){q.ie?("color"==a&&(a="(^|;)"+a),h.style.cssText=h.style.cssText.replace(RegExp(a+"[^:]*:[^;]+;?","ig"),"")):h.style.removeProperty?h.style.removeProperty(a):
h.style.removeAttribute(p.cssStyleToDomStyle(a));h.style.cssText||d.removeAttributes(h,["style"])},getStyle:function(d,a){var e=d.style[p.cssStyleToDomStyle(a)];return p.fixColor(a,e)},setStyle:function(d,a,e){d.style[p.cssStyleToDomStyle(a)]=e;p.trim(d.style.cssText)||this.removeAttributes(d,"style")},setStyles:function(h,a){for(var e in a)a.hasOwnProperty(e)&&d.setStyle(h,e,a[e])},removeDirtyAttr:function(d){for(var a=0,e,b=d.getElementsByTagName("*");e=b[a++];)e.removeAttribute("_moz_dirty");d.removeAttribute("_moz_dirty")},
getChildCount:function(d,a){var e=0,b=d.firstChild;for(a=a||function(){return 1};b;)a(b)&&e++,b=b.nextSibling;return e},isEmptyNode:function(h){return!h.firstChild||0==d.getChildCount(h,function(a){return!d.isBr(a)&&!d.isBookmarkNode(a)&&!d.isWhitespace(a)})},clearSelectedArr:function(h){for(var a;a=h.pop();)d.removeAttributes(a,["class"])},scrollToView:function(h,a,e){var b=function(){var b=a.document,d="CSS1Compat"==b.compatMode;return{width:(d?b.documentElement.clientWidth:b.body.clientWidth)||
0,height:(d?b.documentElement.clientHeight:b.body.clientHeight)||0}}().height;e=-1*b+e+(h.offsetHeight||0);h=d.getXY(h);e+=h.y;h=function(a){if("pageXOffset"in a)return{x:a.pageXOffset||0,y:a.pageYOffset||0};a=a.document;return{x:a.documentElement.scrollLeft||a.body.scrollLeft||0,y:a.documentElement.scrollTop||a.body.scrollTop||0}}(a).y;(e>h||e<h-b)&&a.scrollTo(0,e+(0>e?-20:20))},isBr:function(d){return 1==d.nodeType&&"BR"==d.tagName},isFillChar:function(h,a){if(3!=h.nodeType)return!1;var e=h.nodeValue;
return a?RegExp("^"+d.fillChar).test(e):!e.replace(RegExp(d.fillChar,"g"),"").length},isStartInblock:function(h){h=h.cloneRange();var a=0,e=h.startContainer,b;if(1==e.nodeType&&e.childNodes[h.startOffset])for(var e=e.childNodes[h.startOffset],c=e.previousSibling;c&&d.isFillChar(c);)e=c,c=c.previousSibling;this.isFillChar(e,!0)&&1==h.startOffset&&(h.setStartBefore(e),e=h.startContainer);for(;e&&d.isFillChar(e);)b=e,e=e.previousSibling;b&&(h.setStartBefore(b),e=h.startContainer);for(1==e.nodeType&&
(d.isEmptyNode(e)&&1==h.startOffset)&&h.setStart(e,0).collapse(!0);!h.startOffset;){e=h.startContainer;if(d.isBlockElm(e)||d.isBody(e)){a=1;break}var c=h.startContainer.previousSibling,g;if(c){for(;c&&d.isFillChar(c);)g=c,c=c.previousSibling;g?h.setStartBefore(g):h.setStartBefore(h.startContainer)}else h.setStartBefore(h.startContainer)}return a&&!d.isBody(h.startContainer)?1:0},isEmptyBlock:function(h,a){if(1!=h.nodeType)return 0;a=a||RegExp("[ \t\r\n"+d.fillChar+"]","g");if(0<h[q.ie?"innerText":
"textContent"].replace(a,"").length)return 0;for(var e in v.$isNotEmpty)if(h.getElementsByTagName(e).length)return 0;return 1},setViewportOffset:function(d,a){var e=parseInt(d.style.left)|0,b=parseInt(d.style.top)|0,c=d.getBoundingClientRect(),g=a.left-c.left,c=a.top-c.top;g&&(d.style.left=e+g+"px");c&&(d.style.top=b+c+"px")},fillNode:function(h,a){var e=q.ie?h.createTextNode(d.fillChar):h.createElement("br");a.innerHTML="";a.appendChild(e)},moveChild:function(d,a,e){for(;d.firstChild;)e&&a.firstChild?
a.insertBefore(d.lastChild,a.firstChild):a.appendChild(d.firstChild)},hasNoAttributes:function(d){return q.ie?/^<\w+\s*?>/.test(d.outerHTML):0==d.attributes.length},isCustomeNode:function(d){return 1==d.nodeType&&d.getAttribute("_ue_custom_node_")},isTagNode:function(d,a){return 1==d.nodeType&&RegExp("\\b"+d.tagName+"\\b","i").test(a)},filterNodeList:function(d,a,e){var b=[];if(!p.isFunction(a)){var c=a;a=function(a){return-1!=p.indexOf(p.isArray(c)?c:c.split(" "),a.tagName.toLowerCase())}}p.each(d,
function(d){a(d)&&b.push(d)});return 0==b.length?null:1!=b.length&&e?b:b[0]},isInNodeEndBoundary:function(d,a){var e=d.startContainer;if(3==e.nodeType&&d.startOffset!=e.nodeValue.length||1==e.nodeType&&d.startOffset!=e.childNodes.length)return 0;for(;e!==a;){if(e.nextSibling)return 0;e=e.parentNode}return 1},isBoundaryNode:function(h,a){for(var e;!d.isBody(h);)if(e=h,h=h.parentNode,e!==h[a])return!1;return!0}},O=RegExp(d.fillChar,"g");(function(){function h(a){return!a.collapsed&&1==a.startContainer.nodeType&&
a.startContainer===a.endContainer&&1==a.endOffset-a.startOffset}function a(a,f,b,c){1==f.nodeType&&(v.$empty[f.tagName]||v.$nonChild[f.tagName])&&(b=d.getNodeIndex(f)+(a?0:1),f=f.parentNode);a?(c.startContainer=f,c.startOffset=b,c.endContainer||c.collapse(!0)):(c.endContainer=f,c.endOffset=b,c.startContainer||c.collapse(!1));c.collapsed=c.startContainer&&c.endContainer&&c.startContainer===c.endContainer&&c.startOffset==c.endOffset;return c}function e(a,f){var b=a.startContainer,c=a.endContainer,k=
a.startOffset,e=a.endOffset,l=a.document,g=l.createDocumentFragment(),h,D;1==b.nodeType&&(b=b.childNodes[k]||(h=b.appendChild(l.createTextNode(""))));1==c.nodeType&&(c=c.childNodes[e]||(D=c.appendChild(l.createTextNode(""))));if(b===c&&3==b.nodeType)return g.appendChild(l.createTextNode(b.substringData(k,e-k))),f&&(b.deleteData(k,e-k),a.collapse(!0)),g;for(var p,q,s=g,J=d.findParents(b,!0),v=d.findParents(c,!0),z=0;J[z]==v[z];)z++;for(var E=z,B;B=J[E];E++){p=B.nextSibling;B==b?h||(3==a.startContainer.nodeType?
(s.appendChild(l.createTextNode(b.nodeValue.slice(k))),f&&b.deleteData(k,b.nodeValue.length-k)):s.appendChild(f?b:b.cloneNode(!0))):(q=B.cloneNode(!1),s.appendChild(q));for(;p&&p!==c&&p!==v[E];)B=p.nextSibling,s.appendChild(f?p:p.cloneNode(!0)),p=B;s=q}s=g;J[z]||(s.appendChild(J[z-1].cloneNode(!1)),s=s.firstChild);for(E=z;k=v[E];E++){p=k.previousSibling;k==c?D||3!=a.endContainer.nodeType||(s.appendChild(l.createTextNode(c.substringData(0,e))),f&&c.deleteData(0,e)):(q=k.cloneNode(!1),s.appendChild(q));
if(E!=z||!J[z])for(;p&&p!==b;)k=p.previousSibling,s.insertBefore(f?p:p.cloneNode(!0),s.firstChild),p=k;s=q}f&&a.setStartBefore(v[z]?J[z]?v[z]:J[z-1]:v[z-1]).collapse(!0);h&&d.remove(h);D&&d.remove(D);return g}function b(a,f){try{if(k&&d.inDoc(k,a))if(k.nodeValue.replace(O,"").length)k.nodeValue=k.nodeValue.replace(O,"");else{var b=k.parentNode;for(d.remove(k);b&&d.isEmptyInlineElement(b)&&(q.safari?!(d.getPosition(b,f)&d.POSITION_CONTAINS):!b.contains(f));)k=b.parentNode,d.remove(b),b=k}}catch(c){}}
function c(a,f){var b;for(a=a[f];a&&d.isFillChar(a);)b=a[f],d.remove(a),a=b}var g=0,f=d.fillChar,k,l=I.Range=function(a){this.startContainer=this.startOffset=this.endContainer=this.endOffset=null;this.document=a;this.collapsed=!0};l.prototype={cloneContents:function(){return this.collapsed?null:e(this,0)},deleteContents:function(){var a;this.collapsed||e(this,1);q.webkit&&(a=this.startContainer,3!=a.nodeType||a.nodeValue.length||(this.setStartBefore(a).collapse(!0),d.remove(a)));return this},extractContents:function(){return this.collapsed?
null:e(this,2)},setStart:function(f,b){return a(!0,f,b,this)},setEnd:function(f,b){return a(!1,f,b,this)},setStartAfter:function(a){return this.setStart(a.parentNode,d.getNodeIndex(a)+1)},setStartBefore:function(a){return this.setStart(a.parentNode,d.getNodeIndex(a))},setEndAfter:function(a){return this.setEnd(a.parentNode,d.getNodeIndex(a)+1)},setEndBefore:function(a){return this.setEnd(a.parentNode,d.getNodeIndex(a))},setStartAtFirst:function(a){return this.setStart(a,0)},setStartAtLast:function(a){return this.setStart(a,
3==a.nodeType?a.nodeValue.length:a.childNodes.length)},setEndAtFirst:function(a){return this.setEnd(a,0)},setEndAtLast:function(a){return this.setEnd(a,3==a.nodeType?a.nodeValue.length:a.childNodes.length)},selectNode:function(a){return this.setStartBefore(a).setEndAfter(a)},selectNodeContents:function(a){return this.setStart(a,0).setEndAtLast(a)},cloneRange:function(){return(new l(this.document)).setStart(this.startContainer,this.startOffset).setEnd(this.endContainer,this.endOffset)},collapse:function(a){a?
(this.endContainer=this.startContainer,this.endOffset=this.startOffset):(this.startContainer=this.endContainer,this.startOffset=this.endOffset);this.collapsed=!0;return this},shrinkBoundary:function(a){function f(a){return 1==a.nodeType&&!d.isBookmarkNode(a)&&!v.$empty[a.tagName]&&!v.$nonChild[a.tagName]}for(var b,c=this.collapsed;1==this.startContainer.nodeType&&(b=this.startContainer.childNodes[this.startOffset])&&f(b);)this.setStart(b,0);if(c)return this.collapse(!0);if(!a)for(;1==this.endContainer.nodeType&&
0<this.endOffset&&(b=this.endContainer.childNodes[this.endOffset-1])&&f(b);)this.setEnd(b,b.childNodes.length);return this},getCommonAncestor:function(a,b){var f=this.startContainer,c=this.endContainer;return f===c?a&&h(this)&&(f=f.childNodes[this.startOffset],1==f.nodeType)?f:b&&3==f.nodeType?f.parentNode:f:d.getCommonAncestor(f,c)},trimBoundary:function(a){this.txtToElmBoundary();var f=this.startContainer,b=this.startOffset,c=this.collapsed,k=this.endContainer;if(3==f.nodeType){if(0==b)this.setStartBefore(f);
else if(b>=f.nodeValue.length)this.setStartAfter(f);else{var e=d.split(f,b);f===k?this.setEnd(e,this.endOffset-b):f.parentNode===k&&(this.endOffset+=1);this.setStartBefore(e)}if(c)return this.collapse(!0)}a||(b=this.endOffset,k=this.endContainer,3==k.nodeType&&(0==b?this.setEndBefore(k):(b<k.nodeValue.length&&d.split(k,b),this.setEndAfter(k))));return this},txtToElmBoundary:function(a){function f(a,b){var c=a[b+"Container"],d=a[b+"Offset"];if(3==c.nodeType)if(!d)a["set"+b.replace(/(\w)/,function(a){return a.toUpperCase()})+
"Before"](c);else if(d>=c.nodeValue.length)a["set"+b.replace(/(\w)/,function(a){return a.toUpperCase()})+"After"](c)}if(a||!this.collapsed)f(this,"start"),f(this,"end");return this},insertNode:function(a){var f=a,b=1;11==a.nodeType&&(f=a.firstChild,b=a.childNodes.length);this.trimBoundary(!0);var c=this.startContainer,d=c.childNodes[this.startOffset];d?c.insertBefore(a,d):c.appendChild(a);f.parentNode===this.endContainer&&(this.endOffset+=b);return this.setStartBefore(f)},setCursor:function(a,f){return this.collapse(!a).select(f)},
createBookmark:function(a,f){var b,c=this.document.createElement("span");c.style.cssText="display:none;line-height:0px;";c.appendChild(this.document.createTextNode("\u200d"));c.id="_baidu_bookmark_start_"+(f?"":g++);this.collapsed||(b=c.cloneNode(!0),b.id="_baidu_bookmark_end_"+(f?"":g++));this.insertNode(c);b&&this.collapse().insertNode(b).setEndBefore(b);this.setStartAfter(c);return{start:a?c.id:c,end:b?a?b.id:b:null,id:a}},moveToBookmark:function(a){var f=a.id?this.document.getElementById(a.start):
a.start;a=a.end&&a.id?this.document.getElementById(a.end):a.end;this.setStartBefore(f);d.remove(f);a?(this.setEndBefore(a),d.remove(a)):this.collapse(!0);return this},enlarge:function(a,f){var b=d.isBody,c,k,e=this.document.createTextNode("");if(a){k=this.startContainer;1==k.nodeType?k.childNodes[this.startOffset]?c=k=k.childNodes[this.startOffset]:(k.appendChild(e),c=k=e):c=k;for(;;){if(d.isBlockElm(k)){for(k=c;(c=k.previousSibling)&&!d.isBlockElm(c);)k=c;this.setStartBefore(k);break}c=k;k=k.parentNode}k=
this.endContainer;1==k.nodeType?((c=k.childNodes[this.endOffset])?k.insertBefore(e,c):k.appendChild(e),c=k=e):c=k;for(;;){if(d.isBlockElm(k)){for(k=c;(c=k.nextSibling)&&!d.isBlockElm(c);)k=c;this.setEndAfter(k);break}c=k;k=k.parentNode}e.parentNode===this.endContainer&&this.endOffset--;d.remove(e)}if(!this.collapsed){for(;!(0!=this.startOffset||f&&f(this.startContainer)||b(this.startContainer));)this.setStartBefore(this.startContainer);for(;!(this.endOffset!=(1==this.endContainer.nodeType?this.endContainer.childNodes.length:
this.endContainer.nodeValue.length)||f&&f(this.endContainer)||b(this.endContainer));)this.setEndAfter(this.endContainer)}return this},enlargeToBlockElm:function(a){for(;!d.isBlockElm(this.startContainer);)this.setStartBefore(this.startContainer);if(!a)for(;!d.isBlockElm(this.endContainer);)this.setEndAfter(this.endContainer);return this},adjustmentBoundary:function(){if(!this.collapsed){for(;!d.isBody(this.startContainer)&&this.startOffset==this.startContainer[3==this.startContainer.nodeType?"nodeValue":
"childNodes"].length&&this.startContainer[3==this.startContainer.nodeType?"nodeValue":"childNodes"].length;)this.setStartAfter(this.startContainer);for(;!d.isBody(this.endContainer)&&!this.endOffset&&this.endContainer[3==this.endContainer.nodeType?"nodeValue":"childNodes"].length;)this.setEndBefore(this.endContainer)}return this},applyInlineStyle:function(a,f,b){if(this.collapsed)return this;this.trimBoundary().enlarge(!1,function(a){return 1==a.nodeType&&d.isBlockElm(a)}).adjustmentBoundary();for(var c=
this.createBookmark(),k=c.end,e=function(a){return 1==a.nodeType?"br"!=a.tagName.toLowerCase():!d.isWhitespace(a)},l=d.getNextDomNode(c.start,!1,e),g,h,p=this.cloneRange();l&&d.getPosition(l,k)&d.POSITION_PRECEDING;)if(3==l.nodeType||v[a][l.tagName]){p.setStartBefore(l);for(g=l;g&&(3==g.nodeType||v[a][g.tagName])&&g!==k;)h=g,g=d.getNextDomNode(g,1==g.nodeType,null,function(f){return v[a][f.tagName]});var l=p.setEndAfter(h).extractContents(),q;if(b&&0<b.length){var W;W=q=b[0].cloneNode(!1);for(var s=
1,J;J=b[s++];)q.appendChild(J.cloneNode(!1)),q=q.firstChild}else q=p.document.createElement(a);f&&d.setAttributes(q,f);q.appendChild(l);p.insertNode(b?W:q);var ca;"span"==a&&f.style&&/text\-decoration/.test(f.style)&&(ca=d.findParentByTagName(q,"a",!0))?(d.setAttributes(ca,f),d.remove(q,!0),q=ca):(d.mergeSibling(q),d.clearEmptySibling(q));d.mergeChild(q,f);l=d.getNextDomNode(q,!1,e);d.mergeToParent(q);if(g===k)break}else l=d.getNextDomNode(l,!0,e);return this.moveToBookmark(c)},removeInlineStyle:function(a){if(this.collapsed)return this;
a=p.isArray(a)?a:[a];this.shrinkBoundary().adjustmentBoundary();for(var f=this.startContainer,b=this.endContainer;;){if(1==f.nodeType){if(-1<p.indexOf(a,f.tagName.toLowerCase()))break;if("body"==f.tagName.toLowerCase()){f=null;break}}f=f.parentNode}for(;;){if(1==b.nodeType){if(-1<p.indexOf(a,b.tagName.toLowerCase()))break;if("body"==b.tagName.toLowerCase()){b=null;break}}b=b.parentNode}var c=this.createBookmark(),k,e;f&&(e=this.cloneRange().setEndBefore(c.start).setStartBefore(f),k=e.extractContents(),
e.insertNode(k),d.clearEmptySibling(f,!0),f.parentNode.insertBefore(c.start,f));b&&(e=this.cloneRange().setStartAfter(c.end).setEndAfter(b),k=e.extractContents(),e.insertNode(k),d.clearEmptySibling(b,!1,!0),b.parentNode.insertBefore(c.end,b.nextSibling));for(f=d.getNextDomNode(c.start,!1,function(a){return 1==a.nodeType});f&&f!==c.end;)b=d.getNextDomNode(f,!0,function(a){return 1==a.nodeType}),-1<p.indexOf(a,f.tagName.toLowerCase())&&d.remove(f,!0),f=b;return this.moveToBookmark(c)},getClosedNode:function(){var a;
if(!this.collapsed){var f=this.cloneRange().adjustmentBoundary().shrinkBoundary();h(f)&&(f=f.startContainer.childNodes[f.startOffset])&&(1==f.nodeType&&(v.$empty[f.tagName]||v.$nonChild[f.tagName]))&&(a=f)}return a},select:q.ie?function(a,e){var l;this.collapsed||this.shrinkBoundary();var g=this.getClosedNode();if(g&&!e){try{l=this.document.body.createControlRange(),l.addElement(g),l.select()}catch(h){}return this}var g=this.createBookmark(),w=g.start;l=this.document.body.createTextRange();l.moveToElementText(w);
l.moveStart("character",1);if(!this.collapsed){var u=this.document.body.createTextRange(),w=g.end;u.moveToElementText(w);l.setEndPoint("EndToEnd",u)}else if(!a&&3!=this.startContainer.nodeType){var u=this.document.createTextNode(f),P=this.document.createElement("span");P.appendChild(this.document.createTextNode(f));w.parentNode.insertBefore(P,w);w.parentNode.insertBefore(u,w);b(this.document,u);k=u;c(P,"previousSibling");c(w,"nextSibling");l.moveStart("character",-1);l.collapse(!0)}this.moveToBookmark(g);
P&&d.remove(P);try{l.select()}catch(F){}return this}:function(a){function e(a){function f(b,c,k){3==b.nodeType&&b.nodeValue.length<c&&(a[k+"Offset"]=b.nodeValue.length)}f(a.startContainer,a.startOffset,"start");f(a.endContainer,a.endOffset,"end")}var l=d.getWindow(this.document),g=l.getSelection();q.gecko?this.document.body.focus():l.focus();if(g){g.removeAllRanges();this.collapsed&&!a&&(a=l=this.startContainer,1==l.nodeType&&(a=l.childNodes[this.startOffset]),3==l.nodeType&&this.startOffset||(a?
a.previousSibling&&3==a.previousSibling.nodeType:l.lastChild&&3==l.lastChild.nodeType)||(a=this.document.createTextNode(f),this.insertNode(a),b(this.document,a),c(a,"previousSibling"),c(a,"nextSibling"),k=a,this.setStart(a,q.webkit?1:0).collapse(!0)));l=this.document.createRange();if(this.collapsed&&q.opera&&1==this.startContainer.nodeType)if(a=this.startContainer.childNodes[this.startOffset]){for(;a&&d.isBlockElm(a);)if(1==a.nodeType&&a.childNodes[0])a=a.childNodes[0];else break;a&&this.setStartBefore(a).collapse(!0)}else(a=
this.startContainer.lastChild)&&d.isBr(a)&&this.setStartBefore(a).collapse(!0);e(this);l.setStart(this.startContainer,this.startOffset);l.setEnd(this.endContainer,this.endOffset);g.addRange(l)}return this},scrollToView:function(a,f){a=a?window:d.getWindow(this.document);var b=this.document.createElement("span");b.innerHTML="&nbsp;";this.cloneRange().insertNode(b);d.scrollToView(b,a,f);d.remove(b);return this},inFillChar:function(){var a=this.startContainer;return this.collapsed&&3==a.nodeType&&a.nodeValue.replace(RegExp("^"+
d.fillChar),"").length+1==a.nodeValue.length?!0:!1},createAddress:function(a,f){function b(a){for(var c=a?k.startContainer:k.endContainer,e=d.findParents(c,!0,function(a){return!d.isBody(a)}),l=[],g=0,m;m=e[g++];)l.push(d.getNodeIndex(m,f));e=0;if(f)if(3==c.nodeType){for(c=c.previousSibling;c&&3==c.nodeType;)e+=c.nodeValue.replace(O,"").length,c=c.previousSibling;e+=a?k.startOffset:k.endOffset}else if(c=c.childNodes[a?k.startOffset:k.endOffset])e=d.getNodeIndex(c,f);else for(c=a?k.startContainer:
k.endContainer,a=c.firstChild;a;)if(d.isFillChar(a))a=a.nextSibling;else if(e++,3==a.nodeType)for(;a&&3==a.nodeType;)a=a.nextSibling;else a=a.nextSibling;else e=a?d.isFillChar(c)?0:k.startOffset:k.endOffset;0>e&&(e=0);l.push(e);return l}var c={},k=this;c.startAddress=b(!0);a||(c.endAddress=k.collapsed?[].concat(c.startAddress):b());return c},moveToAddress:function(a,f){function b(a,f){for(var k=c.document.body,d,e,l=0,g,m=a.length;l<m;l++)if(g=a[l],d=k,k=k.childNodes[g],!k){e=g;break}f?k?c.setStartBefore(k):
c.setStart(d,e):k?c.setEndBefore(k):c.setEnd(d,e)}var c=this;b(a.startAddress,!0);!f&&a.endAddress&&b(a.endAddress);return c},equals:function(a){for(var f in this)if(this.hasOwnProperty(f)&&this[f]!==a[f])return!1;return!0},traversal:function(a,f){if(this.collapsed)return this;for(var b=this.createBookmark(),c=b.end,k=d.getNextDomNode(b.start,!1,f);k&&k!==c&&d.getPosition(k,c)&d.POSITION_PRECEDING;){var e=d.getNextDomNode(k,!1,f);a(k);k=e}return this.moveToBookmark(b)}}})();(function(){function h(a,
c){var e=d.getNodeIndex;a=a.duplicate();a.collapse(c);var f=a.parentElement();if(!f.hasChildNodes())return{container:f,offset:0};for(var k=f.children,l,m=a.duplicate(),n=0,h=k.length-1,t=-1;n<=h;){t=Math.floor((n+h)/2);l=k[t];m.moveToElementText(l);var x=m.compareEndPoints("StartToStart",a);if(0<x)h=t-1;else if(0>x)n=t+1;else return{container:f,offset:e(l)}}if(-1==t){m.moveToElementText(f);m.setEndPoint("StartToStart",a);m=m.text.replace(/(\r\n|\r)/g,"\n").length;k=f.childNodes;if(!m)return l=k[k.length-
1],{container:l,offset:l.nodeValue.length};for(e=k.length;0<m;)m-=k[--e].nodeValue.length;return{container:k[e],offset:-m}}m.collapse(0<x);m.setEndPoint(0<x?"StartToStart":"EndToStart",a);m=m.text.replace(/(\r\n|\r)/g,"\n").length;if(!m)return v.$empty[l.tagName]||v.$nonChild[l.tagName]?{container:f,offset:e(l)+(0<x?0:1)}:{container:l,offset:0<x?0:l.childNodes.length};for(;0<m;)try{k=l,l=l[0<x?"previousSibling":"nextSibling"],m-=l.nodeValue.length}catch(w){return{container:f,offset:e(k)}}return{container:l,
offset:0<x?-m:l.nodeValue.length+m}}function a(a,c){if(a.item)c.selectNode(a.item(0));else{var d=h(a,!0);c.setStart(d.container,d.offset);0!=a.compareEndPoints("StartToEnd",a)&&(d=h(a,!1),c.setEnd(d.container,d.offset))}return c}function e(a){var c;try{c=a.getNative().createRange()}catch(d){return null}var f=c.item?c.item(0):c.parentElement();return(f.ownerDocument||f)===a.document?c:null}(I.Selection=function(a){var c=this;c.document=a;q.ie9below&&(a=d.getWindow(a).frameElement,d.on(a,"beforedeactivate",
function(){c._bakIERange=c.getIERange()}),d.on(a,"activate",function(){try{!e(c)&&c._bakIERange&&c._bakIERange.select()}catch(a){}c._bakIERange=null}));a=a=null}).prototype={rangeInBody:function(a,c){var e=q.ie9below||c?a.item?a.item():a.parentElement():a.startContainer;return e===this.document.body||d.inDoc(e,this.document)},getNative:function(){var a=this.document;try{return a?q.ie9below?a.selection:d.getWindow(a).getSelection():null}catch(c){return null}},getIERange:function(){var a=e(this);return!a&&
this._bakIERange?this._bakIERange:a},cache:function(){this.clear();this._cachedRange=this.getRange();this._cachedStartElement=this.getStart();this._cachedStartElementPath=this.getStartElementPath()},getStartElementPath:function(){if(this._cachedStartElementPath)return this._cachedStartElementPath;var a=this.getStart();return a?d.findParents(a,!0,null,!0):[]},clear:function(){this._cachedStartElementPath=this._cachedRange=this._cachedStartElement=null},isFocus:function(){try{if(q.ie9below){var a=e(this);
return!(!a||!this.rangeInBody(a))}return!!this.getNative().rangeCount}catch(c){return!1}},getRange:function(){function b(a){for(var f=c.document.body.firstChild,b=a.collapsed;f&&f.firstChild;)a.setStart(f,0),f=f.firstChild;a.startContainer||a.setStart(c.document.body,0);b&&a.collapse(!0)}var c=this;if(null!=c._cachedRange)return this._cachedRange;var e=new s.editor.dom.Range(c.document);if(q.ie9below){var f=c.getIERange();if(f)try{a(f,e)}catch(k){b(e)}else b(e)}else{var l=c.getNative();if(l&&l.rangeCount)f=
l.getRangeAt(0),l=l.getRangeAt(l.rangeCount-1),e.setStart(f.startContainer,f.startOffset).setEnd(l.endContainer,l.endOffset),e.collapsed&&(d.isBody(e.startContainer)&&!e.startOffset)&&b(e);else{if(this._bakRange&&d.inDoc(this._bakRange.startContainer,this.document))return this._bakRange;b(e)}}return this._bakRange=e},getStart:function(){if(this._cachedStartElement)return this._cachedStartElement;var a=q.ie9below?this.getIERange():this.getRange(),c,d;if(q.ie9below){if(!a)return this.document.body.firstChild;
if(a.item)return a.item(0);c=a.duplicate();0<c.text.length&&c.moveStart("character",1);c.collapse(1);c=c.parentElement();for(d=a=a.parentElement();a=a.parentNode;)if(a==c){c=d;break}}else if(a.shrinkBoundary(),c=a.startContainer,1==c.nodeType&&c.hasChildNodes()&&(c=c.childNodes[Math.min(c.childNodes.length-1,a.startOffset)]),3==c.nodeType)return c.parentNode;return c},getText:function(){var a;return this.isFocus()&&(a=this.getNative())?(a=q.ie9below?a.createRange():a.getRangeAt(0),q.ie9below?a.text:
a.toString()):""},clearRange:function(){this.getNative()[q.ie9below?"empty":"removeAllRanges"]()}}})();(function(){function h(a,b){var c;if(b.textarea)if(p.isString(b.textarea))for(var e=0,g,h=d.getElementsByTagName(a,"textarea");g=h[e++];){if(g.id=="ueditor_textarea_"+b.options.textarea){c=g;break}}else c=b.textarea;c||(a.appendChild(c=d.createElement(document,"textarea",{name:b.options.textarea,id:"ueditor_textarea_"+b.options.textarea,style:"display:none"})),b.textarea=c);c.value=b.hasContents()?
b.options.allHtmlEnabled?b.getAllHtml():b.getContent(null,null,!0):""}function a(a){for(var b in a)return b}function e(a){a.langIsReady=!0;a.fireEvent("langReady")}var b=0,c,g=UE.Editor=function(f){var c=this;c.uid=b++;V.call(c);c.commands={};c.options=p.extend(p.clone(f||{}),UEDITOR_CONFIG,!0);c.shortcutkeys={};c.inputRules=[];c.outputRules=[];c.setOpt({isShow:!0,initialContent:"",initialStyle:"",autoClearinitialContent:!1,iframeCssUrl:c.options.UEDITOR_HOME_URL+"themes/iframe.css",textarea:"editorValue",
focus:!1,focusInEnd:!0,autoClearEmptyNode:!0,fullscreen:!1,readonly:!1,zIndex:999,imagePopup:!0,enterTag:"p",customDomain:!1,lang:"zh-cn",langPath:c.options.UEDITOR_HOME_URL+"lang/",theme:"default",themePath:c.options.UEDITOR_HOME_URL+"themes/",allHtmlEnabled:!1,scaleEnabled:!1,tableNativeEditInFF:!1,autoSyncData:!0,fileNameFormat:"{time}{rand:6}"});p.isEmptyObject(UE.I18N)?p.loadFile(document,{src:c.options.langPath+c.options.lang+"/"+c.options.lang+".js",tag:"script",type:"text/javascript",defer:"defer"},
function(){UE.plugin.load(c);e(c)}):(c.options.lang=a(UE.I18N),UE.plugin.load(c),e(c));UE.instants["ueditorInstant"+c.uid]=c};g.prototype={ready:function(a){a&&(this.isReady?a.apply(this):this.addListener("ready",a))},setOpt:function(a,b){var c={};p.isString(a)?c[a]=b:c=a;p.extend(this.options,c,!0)},destroy:function(){this.fireEvent("destroy");var a=this.container.parentNode,b=this.textarea;b?b.style.display="":(b=document.createElement("textarea"),a.parentNode.insertBefore(b,a));b.style.width=this.iframe.offsetWidth+
"px";b.style.height=this.iframe.offsetHeight+"px";b.value=this.getContent();b.id=this.key;a.innerHTML="";d.remove(a);var a=this.key,c;for(c in this)this.hasOwnProperty(c)&&delete this[c];UE.delEditor(a)},render:function(a){var b=this.options;p.isString(a)&&(a=document.getElementById(a));if(a){b.minFrameWidth=b.initialFrameWidth?b.initialFrameWidth:b.initialFrameWidth=a.offsetWidth;b.initialFrameHeight?b.minFrameHeight=b.initialFrameHeight:b.initialFrameHeight=b.minFrameHeight=a.offsetHeight;a.style.width=
/%$/.test(b.initialFrameWidth)?"100%":b.initialFrameWidth-parseInt(d.getComputedStyle(a,"padding-left"))-parseInt(d.getComputedStyle(a,"padding-right"))+"px";a.style.height=/%$/.test(b.initialFrameHeight)?"100%":b.initialFrameHeight-parseInt(d.getComputedStyle(a,"padding-top"))-parseInt(d.getComputedStyle(a,"padding-bottom"))+"px";a.style.zIndex=b.zIndex;var c=(H&&9>q.version?"":"<!DOCTYPE html>")+"<html xmlns='http://www.w3.org/1999/xhtml' class='view' ><head><style type='text/css'>.view{padding:0;word-wrap:break-word;cursor:text;height:90%;}\nbody{margin:8px;font-family:sans-serif;font-size:16px;}p{margin:5px 0;}</style>"+
(b.iframeCssUrl?"<link rel='stylesheet' type='text/css' href='"+p.unhtml(b.iframeCssUrl)+"'/>":"")+(b.initialStyle?"<style>"+b.initialStyle+"</style>":"")+"</head><body class='view' ></body><script type='text/javascript' "+(H?"defer='defer'":"")+" id='_initialScript'>setTimeout(function(){editor = window.parent.UE.instants['ueditorInstant"+this.uid+"'];editor._setup(document);},0);var _tmpScript = document.getElementById('_initialScript');_tmpScript.parentNode.removeChild(_tmpScript);\x3c/script></html>";
a.appendChild(d.createElement(document,"iframe",{id:"ueditor_"+this.uid,width:"100%",height:"100%",frameborder:"0",src:"javascript:void(function(){document.open();"+(b.customDomain&&document.domain!=location.hostname?'document.domain="'+document.domain+'";':"")+'document.write("'+c+'");document.close();}())'}));a.style.overflow="hidden";setTimeout(function(){/%$/.test(b.initialFrameWidth)&&(b.minFrameWidth=b.initialFrameWidth=a.offsetWidth);/%$/.test(b.initialFrameHeight)&&(b.minFrameHeight=b.initialFrameHeight=
a.offsetHeight,a.style.height=b.initialFrameHeight+"px")})}},_setup:function(a){var b=this,c=b.options;H?(a.body.disabled=!0,a.body.contentEditable=!0,a.body.disabled=!1):a.body.contentEditable=!0;a.body.spellcheck=!1;b.document=a;b.window=a.defaultView||a.parentWindow;b.iframe=b.window.frameElement;b.body=a.body;b.selection=new I.Selection(a);var e;q.gecko&&(e=this.selection.getNative())&&e.removeAllRanges();this._initEvents();for(var g=this.iframe.parentNode;!d.isBody(g);g=g.parentNode)if("FORM"==
g.tagName){b.form=g;if(b.options.autoSyncData)d.on(b.window,"blur",function(){h(g,b)});else d.on(g,"submit",function(){h(this,b)});break}if(c.initialContent)if(c.autoClearinitialContent){var r=b.execCommand;b.execCommand=function(){b.fireEvent("firstBeforeExecCommand");return r.apply(b,arguments)};this._setDefaultContent(c.initialContent)}else this.setContent(c.initialContent,!1,!0);d.isEmptyNode(b.body)&&(b.body.innerHTML="<p>"+(q.ie?"":"<br/>")+"</p>");c.focus&&setTimeout(function(){b.focus(b.options.focusInEnd);
!b.options.autoClearinitialContent&&b._selectionChange()},0);b.container||(b.container=this.iframe.parentNode);c.fullscreen&&b.ui&&b.ui.setFullScreen(!0);try{b.document.execCommand("2D-position",!1,!1)}catch(t){}try{b.document.execCommand("enableInlineTableEditing",!1,!1)}catch(x){}try{b.document.execCommand("enableObjectResizing",!1,!1)}catch(w){}b._bindshortcutKeys();b.isReady=1;b.fireEvent("ready");c.onready&&c.onready.call(b);if(!q.ie9below)d.on(b.window,["blur","focus"],function(a){if("blur"==
a.type){b._bakRange=b.selection.getRange();try{b._bakNativeRange=b.selection.getNative().getRangeAt(0),b.selection.getNative().removeAllRanges()}catch(f){b._bakNativeRange=null}}else try{b._bakRange&&b._bakRange.select()}catch(c){}});q.gecko&&10902>=q.version&&(b.body.contentEditable=!1,setTimeout(function(){b.body.contentEditable=!0},100),setInterval(function(){b.body.style.height=b.iframe.offsetHeight-20+"px"},100));!c.isShow&&b.setHide();c.readonly&&b.setDisabled()},sync:function(a){(a=a?document.getElementById(a):
d.findParent(this.iframe.parentNode,function(a){return"FORM"==a.tagName},!0))&&h(a,this)},setHeight:function(a,b){a!==parseInt(this.iframe.parentNode.style.height)&&(this.iframe.parentNode.style.height=a+"px");!b&&(this.options.minFrameHeight=this.options.initialFrameHeight=a);this.body.style.height=a+"px"},addshortcutkey:function(a,b){var c={};b?c[a]=b:c=a;p.extend(this.shortcutkeys,c)},_bindshortcutKeys:function(){var a=this,b=this.shortcutkeys;a.addListener("keydown",function(c,e){var g=e.keyCode||
e.which,h;for(h in b)for(var t=b[h].split(","),x=0,w;w=t[x++];){w=w.split(":");var u=w[0];w=w[1];if(/^(ctrl)(\+shift)?\+(\d+)$/.test(u.toLowerCase())||/^(\d+)$/.test(u))if("ctrl"==RegExp.$1&&(e.ctrlKey||e.metaKey)&&(""!=RegExp.$2?e[RegExp.$2.slice(1)+"Key"]:1)&&g==RegExp.$3||g==RegExp.$1)-1!=a.queryCommandState(h,w)&&a.execCommand(h,w),d.preventDefault(e)}})},getContent:function(a,b,c,d,e){a&&p.isFunction(a)&&(b=a,a="");if(b?!b():!this.hasContents())return"";this.fireEvent("beforegetcontent");b=UE.htmlparser(this.body.innerHTML,
d);this.filterOutputRule(b);this.fireEvent("aftergetcontent",a,b);return b.toHtml(e)},getAllHtml:function(){var a=[];this.fireEvent("getAllHtml",a);if(q.ie&&8<q.version){var b="";p.each(this.document.styleSheets,function(a){b+=a.href?'<link rel="stylesheet" type="text/css" href="'+a.href+'" />':"<style>"+a.cssText+"</style>"});p.each(this.document.getElementsByTagName("script"),function(a){b+=a.outerHTML})}return"<html><head>"+(this.options.charset?'<meta http-equiv="Content-Type" content="text/html; charset='+
this.options.charset+'"/>':"")+(b||this.document.getElementsByTagName("head")[0].innerHTML)+a.join("\n")+"</head><body "+(H&&9>q.version?'class="view"':"")+">"+this.getContent(null,null,!0)+"</body></html>"},getPlainTxt:function(){var a=RegExp(d.fillChar,"g"),b=this.body.innerHTML.replace(/[\n\r]/g,""),b=b.replace(/<(p|div)[^>]*>(<br\/?>|&nbsp;)<\/\1>/gi,"\n").replace(/<br\/?>/gi,"\n").replace(/<[^>/]+>/g,"").replace(/(\n)?<\/([^>]+)>/g,function(a,b,c){return v.$block[c]?"\n":b?b:""});return b.replace(a,
"").replace(/\u00a0/g," ").replace(/&nbsp;/g," ")},getContentTxt:function(){return this.body[q.ie?"innerText":"textContent"].replace(RegExp(d.fillChar,"g"),"").replace(/\u00a0/g," ")},setContent:function(a,b,c){this.fireEvent("beforesetcontent",a);a=UE.htmlparser(a);this.filterInputRule(a);a=a.toHtml();this.body.innerHTML=(b?this.body.innerHTML:"")+a;if("p"==this.options.enterTag)if(b=this.body.firstChild,!b||1==b.nodeType&&(v.$cdata[b.tagName]||"DIV"==b.tagName&&b.getAttribute("cdata_tag")||d.isCustomeNode(b))&&
b===this.body.lastChild)this.body.innerHTML="<p>"+(q.ie?"&nbsp;":"<br/>")+"</p>"+this.body.innerHTML;else for(var e=this.document.createElement("p");b;){for(;b&&(3==b.nodeType||1==b.nodeType&&v.p[b.tagName]&&!v.$cdata[b.tagName]);)a=b.nextSibling,e.appendChild(b),b=a;if(e.firstChild)if(b)b.parentNode.insertBefore(e,b),e=this.document.createElement("p");else{this.body.appendChild(e);break}b=b.nextSibling}this.fireEvent("aftersetcontent");this.fireEvent("contentchange");!c&&this._selectionChange();
this._bakRange=this._bakIERange=this._bakNativeRange=null;var g;q.gecko&&(g=this.selection.getNative())&&g.removeAllRanges();this.options.autoSyncData&&this.form&&h(this.form,this)},focus:function(a){try{var b=this.selection.getRange();if(a){var c=this.body.lastChild;c&&(1==c.nodeType&&!v.$empty[c.tagName])&&(d.isEmptyBlock(c)?b.setStartAtFirst(c):b.setStartAtLast(c),b.collapse(!0));b.setCursor(!0)}else!b.collapsed&&d.isBody(b.startContainer)&&0==b.startOffset&&(c=this.body.firstChild)&&(1==c.nodeType&&
!v.$empty[c.tagName])&&b.setStartAtFirst(c).collapse(!0),b.select(!0);this.fireEvent("focus selectionchange")}catch(e){}},isFocus:function(){return this.selection.isFocus()},blur:function(){var a=this.selection.getNative();if(a.empty&&q.ie){var b=document.body.createTextRange();b.moveToElementText(document.body);b.collapse(!0);b.select();a.empty()}else a.removeAllRanges()},_initEvents:function(){var a=this,b=a.document,c=a.window;a._proxyDomEvent=p.bind(a._proxyDomEvent,a);d.on(b,"click contextmenu mousedown keydown keyup keypress mouseup mouseover mouseout selectstart".split(" "),
a._proxyDomEvent);d.on(c,["focus","blur"],a._proxyDomEvent);d.on(a.body,"drop",function(b){q.gecko&&b.stopPropagation&&b.stopPropagation();a.fireEvent("contentchange")});d.on(b,["mouseup","keydown"],function(b){"keydown"==b.type&&(b.ctrlKey||b.metaKey||b.shiftKey||b.altKey)||2!=b.button&&a._selectionChange(250,b)})},_proxyDomEvent:function(a){return!1===this.fireEvent("before"+a.type.replace(/^on/,"").toLowerCase())||!1===this.fireEvent(a.type.replace(/^on/,""),a)?!1:this.fireEvent("after"+a.type.replace(/^on/,
"").toLowerCase())},_selectionChange:function(a,b){var e=this,d=!1,g,h;q.ie&&(9>q.version&&b&&"mouseup"==b.type)&&!this.selection.getRange().collapsed&&(d=!0,g=b.clientX,h=b.clientY);clearTimeout(c);c=setTimeout(function(){if(e.selection&&e.selection.getNative()){var a;if(d&&"None"==e.selection.getNative().type){a=e.document.body.createTextRange();try{a.moveToPoint(g,h)}catch(c){a=null}}var f;a&&(f=e.selection.getIERange,e.selection.getIERange=function(){return a});e.selection.cache();f&&(e.selection.getIERange=
f);e.selection._cachedRange&&e.selection._cachedStartElement&&(e.fireEvent("beforeselectionchange"),e.fireEvent("selectionchange",!!b),e.fireEvent("afterselectionchange"),e.selection.clear())}},a||50)},_callCmdFn:function(a,b){var c=b[0].toLowerCase(),e;e=(c=this.commands[c]||UE.commands[c])&&c[a];if(!(c&&e||"queryCommandState"!=a))return 0;if(e)return e.apply(this,b)},execCommand:function(a){a=a.toLowerCase();var b,c=this.commands[a]||UE.commands[a];if(!c||!c.execCommand)return null;c.notNeedUndo||
this.__hasEnterExecCommand?(b=this._callCmdFn("execCommand",arguments),this.__hasEnterExecCommand||(c.ignoreContentChange||this._ignoreContentChange)||this.fireEvent("contentchange")):(this.__hasEnterExecCommand=!0,-1!=this.queryCommandState.apply(this,arguments)&&(this.fireEvent("saveScene"),this.fireEvent("beforeexeccommand",a),b=this._callCmdFn("execCommand",arguments),c.ignoreContentChange||this._ignoreContentChange||this.fireEvent("contentchange"),this.fireEvent("afterexeccommand",a),this.fireEvent("saveScene")),
this.__hasEnterExecCommand=!1);this.__hasEnterExecCommand||(c.ignoreContentChange||this._ignoreContentChange)||this._selectionChange();return b},queryCommandState:function(a){return this._callCmdFn("queryCommandState",arguments)},queryCommandValue:function(a){return this._callCmdFn("queryCommandValue",arguments)},hasContents:function(a){if(a)for(var b=0,c;c=a[b++];)if(0<this.document.getElementsByTagName(c).length)return!0;if(!d.isEmptyBlock(this.body))return!0;a=["div"];for(b=0;c=a[b++];){c=d.getElementsByTagName(this.document,
c);for(var e=0,g;g=c[e++];)if(d.isCustomeNode(g))return!0}return!1},reset:function(){this.fireEvent("reset")},setEnabled:function(){var a;if("false"==this.body.contentEditable){this.body.contentEditable=!0;a=this.selection.getRange();try{a.moveToBookmark(this.lastBk),delete this.lastBk}catch(b){a.setStartAtFirst(this.body).collapse(!0)}a.select(!0);this.bkqueryCommandState&&(this.queryCommandState=this.bkqueryCommandState,delete this.bkqueryCommandState);this.fireEvent("selectionchange")}},enable:function(){return this.setEnabled()},
setDisabled:function(a){var b=this;a=a?p.isArray(a)?a:[a]:[];"true"==b.body.contentEditable&&(b.lastBk||(b.lastBk=b.selection.getRange().createBookmark(!0)),b.body.contentEditable=!1,b.bkqueryCommandState=b.queryCommandState,b.queryCommandState=function(c){return-1!=p.indexOf(a,c)?b.bkqueryCommandState.apply(b,arguments):-1},b.fireEvent("selectionchange"))},disable:function(a){return this.setDisabled(a)},_setDefaultContent:function(){function a(){var b=this;b.document.getElementById("initContent")&&
(b.body.innerHTML="<p>"+(H?"":"<br/>")+"</p>",b.removeListener("firstBeforeExecCommand focus",a),setTimeout(function(){b.focus();b._selectionChange()},0))}return function(b){this.body.innerHTML='<p id="initContent">'+b+"</p>";this.addListener("firstBeforeExecCommand focus",a)}}(),setShow:function(){var a=this.selection.getRange();if("none"==this.container.style.display){try{a.moveToBookmark(this.lastBk),delete this.lastBk}catch(b){a.setStartAtFirst(this.body).collapse(!0)}setTimeout(function(){a.select(!0)},
100);this.container.style.display=""}},show:function(){return this.setShow()},setHide:function(){this.lastBk||(this.lastBk=this.selection.getRange().createBookmark(!0));this.container.style.display="none"},hide:function(){return this.setHide()},getLang:function(a){var b=UE.I18N[this.options.lang];if(!b)throw Error("not import language file");a=(a||"").split(".");for(var c=0,e;(e=a[c++])&&(b=b[e],b););return b},getContentLength:function(a,b){var c=this.getContent(!1,!1,!0).length;if(a){b=(b||[]).concat(["hr",
"img","iframe"]);for(var c=this.getContentTxt().replace(/[\t\r\n]+/g,"").length,e=0,d;d=b[e++];)c+=this.document.getElementsByTagName(d).length}return c},addInputRule:function(a){this.inputRules.push(a)},filterInputRule:function(a){for(var b=0,c;c=this.inputRules[b++];)c.call(this,a)},addOutputRule:function(a){this.outputRules.push(a)},filterOutputRule:function(a){for(var b=0,c;c=this.outputRules[b++];)c.call(this,a)}};p.inherits(g,V)})();UE.ajax=function(){function d(a){var b=[],c;for(c in a)"method"!=
c&&"timeout"!=c&&"async"!=c&&"function"!=(typeof a[c]).toLowerCase()&&"object"!=(typeof a[c]).toLowerCase()&&b.push(encodeURIComponent(c)+"="+encodeURIComponent(a[c]));return b.join("&")}var a="XMLHttpRequest()";try{new ActiveXObject("Msxml2.XMLHTTP"),a="ActiveXObject('Msxml2.XMLHTTP')"}catch(e){try{new ActiveXObject("Microsoft.XMLHTTP"),a="ActiveXObject('Microsoft.XMLHTTP')"}catch(b){}}var c=new Function("return new "+a);return{request:function(a,b){var e=c(),l=!1,m={method:"POST",timeout:5E3,async:!0,
data:{},onsuccess:function(){},onerror:function(){}};"object"===typeof a&&(b=a,a=b.url);if(e&&a){var n=b?p.extend(m,b):m,m=d(n);p.isEmptyObject(n.data)||(m+=(m?"&":"")+d(n.data));var r=setTimeout(function(){4!=e.readyState&&(l=!0,e.abort(),clearTimeout(r))},n.timeout),t=n.method.toUpperCase(),x=a+(-1==a.indexOf("?")?"?":"&")+("POST"==t?"":m+"&noCache="+ +new Date);e.open(t,x,n.async);e.onreadystatechange=function(){if(4==e.readyState)if(l||200!=e.status)n.onerror(e);else n.onsuccess(e)};"POST"==t?
(e.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),e.send(m)):e.send(null)}}}}();UE.filterWord=function(){function d(a){return a=a.replace(/[\d.]+\w+/g,function(a){return p.transUnitToPx(a)})}function a(a){return a.replace(/[\t\r\n]+/g," ").replace(/\x3c!--[\s\S]*?--\x3e/ig,"").replace(/<v:shape [^>]*>[\s\S]*?.<\/v:shape>/gi,function(a){if(q.opera)return"";try{if(/Bitmap/i.test(a))return"";var c=a.match(/width:([ \d.]*p[tx])/i)[1],e=a.match(/height:([ \d.]*p[tx])/i)[1],f=a.match(/src=\s*"([^"]*)"/i)[1];
return'<img width="'+d(c)+'" height="'+d(e)+'" src="'+f+'" />'}catch(k){return""}}).replace(/<\/?div[^>]*>/g,"").replace(/v:\w+=(["']?)[^'"]+\1/g,"").replace(/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|xml|meta|link|style|\w+:\w+)(?=[\s\/>]))[^>]*>/gi,"").replace(/<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi,"<p><strong>$1</strong></p>").replace(/\s+(class|lang|align)\s*=\s*(['"]?)([\w-]+)\2/ig,function(a,c,e,d){return"class"==c&&"MsoListParagraph"==d?a:""}).replace(/<(font|span)[^>]*>(\s*)<\/\1>/gi,
function(a,c,e){return e.replace(/[\t\r\n ]+/g," ")}).replace(/(<[a-z][^>]*)\sstyle=(["'])([^\2]*?)\2/gi,function(a,c,e,f){a=[];f=f.replace(/^\s+|\s+$/,"").replace(/&#39;/g,"'").replace(/&quot;/gi,"'").split(/;\s*/g);e=0;for(var k;k=f[e];e++){var l,m=k.split(":");if(2==m.length&&(k=m[0].toLowerCase(),l=m[1].toLowerCase(),!(/^(background)\w*/.test(k)&&0==l.replace(/(initial|\s)/g,"").length||/^(margin)\w*/.test(k)&&/^0\w+$/.test(l)))){switch(k){case "mso-padding-alt":case "mso-padding-top-alt":case "mso-padding-right-alt":case "mso-padding-bottom-alt":case "mso-padding-left-alt":case "mso-margin-alt":case "mso-margin-top-alt":case "mso-margin-right-alt":case "mso-margin-bottom-alt":case "mso-margin-left-alt":case "mso-height":case "mso-width":case "mso-vertical-align-alt":/<table/.test(c)||
(a[e]=k.replace(/^mso-|-alt$/g,"")+":"+d(l));continue;case "horiz-align":a[e]="text-align:"+l;continue;case "vert-align":a[e]="vertical-align:"+l;continue;case "font-color":case "mso-foreground":a[e]="color:"+l;continue;case "mso-background":case "mso-highlight":a[e]="background:"+l;continue;case "mso-default-height":a[e]="min-height:"+d(l);continue;case "mso-default-width":a[e]="min-width:"+d(l);continue;case "mso-padding-between-alt":a[e]="border-collapse:separate;border-spacing:"+d(l);continue;
case "text-line-through":if("single"==l||"double"==l)a[e]="text-decoration:line-through";continue;case "mso-zero-height":"yes"==l&&(a[e]="display:none");continue;case "margin":if(!/[1-9]/.test(l))continue}/^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?:decor|trans)|top-bar|version|vnd|word-break)/.test(k)||/text\-indent|padding|margin/.test(k)&&/\-[\d.]+/.test(l)||(a[e]=k+":"+m[1])}}return c+(a.length?' style="'+a.join(";").replace(/;{2,}/g,
";")+'"':"")}).replace(/[\d.]+(cm|pt)/g,function(a){return p.transUnitToPx(a)})}return function(e){return/(class="?Mso|style="[^"]*\bmso\-|w:WordDocument|<(v|o):|lang=)/ig.test(e)?a(e):e}}();(function(){function d(a,b,c){a.push(r);return b+(c?1:-1)}function a(a,b){for(var c=0;c<b;c++)a.push(n)}function e(c,f,l,g){switch(c.type){case "root":for(var k=0,n;n=c.children[k++];)l&&("element"==n.type&&!v.$inlineWithA[n.tagName]&&1<k)&&(d(f,g,!0),a(f,g)),e(n,f,l,g);break;case "text":"pre"==c.parentNode.tagName?
f.push(c.data):f.push(m[c.parentNode.tagName]?p.html(c.data):c.data.replace(/[ ]{2}/g," &nbsp;"));break;case "element":b(c,f,l,g);break;case "comment":f.push("\x3c!--"+c.data+"--\x3e")}return f}function b(b,c,f,g){var k="";if(b.attrs){var k=[],m=b.attrs,n;for(n in m)k.push(n+(void 0!==m[n]?'="'+(l[n]?p.html(m[n]).replace(/["]/g,function(a){return"&quot;"}):p.unhtml(m[n]))+'"':""));k=k.join(" ")}c.push("<"+b.tagName+(k?" "+k:"")+(v.$empty[b.tagName]?"/":"")+">");f&&(!v.$inlineWithA[b.tagName]&&"pre"!=
b.tagName)&&(b.children&&b.children.length)&&(g=d(c,g,!0),a(c,g));if(b.children&&b.children.length)for(k=0;m=b.children[k++];)f&&("element"==m.type&&!v.$inlineWithA[m.tagName]&&1<k)&&(d(c,g),a(c,g)),e(m,c,f,g);v.$empty[b.tagName]||(f&&(!v.$inlineWithA[b.tagName]&&"pre"!=b.tagName)&&(b.children&&b.children.length)&&(g=d(c,g),a(c,g)),c.push("</"+b.tagName+">"))}function c(a,b){var e;if("element"==a.type&&a.getAttr("id")==b)return a;if(a.children&&a.children.length)for(var f=0;e=a.children[f++];)if(e=
c(e,b))return e}function g(a,b,c){"element"==a.type&&a.tagName==b&&c.push(a);if(a.children&&a.children.length)for(var e=0,f;f=a.children[e++];)g(f,b,c)}function f(a,b){if(a.children&&a.children.length)for(var c=0,e;e=a.children[c];)f(e,b),e.parentNode&&(e.children&&e.children.length&&b(e),e.parentNode&&c++);else b(a)}var k=UE.uNode=function(a){this.type=a.type;this.data=a.data;this.tagName=a.tagName;this.parentNode=a.parentNode;this.attrs=a.attrs||{};this.children=a.children},l={href:1,src:1,_src:1,
_href:1,cdata_data:1},m={style:1,script:1},n="    ",r="\n";k.createElement=function(a){return/[<>]/.test(a)?UE.htmlparser(a).children[0]:new k({type:"element",children:[],tagName:a})};k.createText=function(a,b){return new UE.uNode({type:"text",data:b?a:p.unhtml(a||"")})};k.prototype={toHtml:function(a){var b=[];e(this,b,a,0);return b.join("")},innerHTML:function(a){if("element"!=this.type||v.$empty[this.tagName])return this;if(p.isString(a)){if(this.children)for(var b=0,c;c=this.children[b++];)c.parentNode=
null;this.children=[];a=UE.htmlparser(a);for(b=0;c=a.children[b++];)this.children.push(c),c.parentNode=this;return this}a=new UE.uNode({type:"root",children:this.children});return a.toHtml()},innerText:function(a,b){if("element"!=this.type||v.$empty[this.tagName])return this;if(a){if(this.children)for(var c=0,e;e=this.children[c++];)e.parentNode=null;this.children=[];this.appendChild(k.createText(a,b));return this}return this.toHtml().replace(/<[^>]+>/g,"")},getData:function(){return"element"==this.type?
"":this.data},firstChild:function(){return this.children?this.children[0]:null},lastChild:function(){return this.children?this.children[this.children.length-1]:null},previousSibling:function(){for(var a=this.parentNode,b=0,c;c=a.children[b];b++)if(c===this)return 0==b?null:a.children[b-1]},nextSibling:function(){for(var a=this.parentNode,b=0,c;c=a.children[b++];)if(c===this)return a.children[b]},replaceChild:function(a,b){if(this.children){a.parentNode&&a.parentNode.removeChild(a);for(var c=0,e;e=
this.children[c];c++)if(e===b)return this.children.splice(c,1,a),b.parentNode=null,a.parentNode=this,a}},appendChild:function(a){if("root"==this.type||"element"==this.type&&!v.$empty[this.tagName]){this.children||(this.children=[]);a.parentNode&&a.parentNode.removeChild(a);for(var b=0,c;c=this.children[b];b++)if(c===a){this.children.splice(b,1);break}this.children.push(a);a.parentNode=this;return a}},insertBefore:function(a,b){if(this.children){a.parentNode&&a.parentNode.removeChild(a);for(var c=
0,e;e=this.children[c];c++)if(e===b)return this.children.splice(c,0,a),a.parentNode=this,a}},insertAfter:function(a,b){if(this.children){a.parentNode&&a.parentNode.removeChild(a);for(var c=0,e;e=this.children[c];c++)if(e===b)return this.children.splice(c+1,0,a),a.parentNode=this,a}},removeChild:function(a,b){if(this.children)for(var c=0,e;e=this.children[c];c++)if(e===a){this.children.splice(c,1);e.parentNode=null;if(b&&e.children&&e.children.length)for(var f=0,d;d=e.children[f];f++)this.children.splice(c+
f,0,d),d.parentNode=this;return e}},getAttr:function(a){return this.attrs&&this.attrs[a.toLowerCase()]},setAttr:function(a,b){if(a)if(this.attrs||(this.attrs={}),p.isObject(a))for(var c in a)a[c]?this.attrs[c.toLowerCase()]=a[c]:delete this.attrs[c];else b?this.attrs[a.toLowerCase()]=b:delete this.attrs[a];else delete this.attrs},getIndex:function(){for(var a=this.parentNode,b=0,c;c=a.children[b];b++)if(c===this)return b;return-1},getNodeById:function(a){var b;if(this.children&&this.children.length)for(var e=
0;b=this.children[e++];)if(b=c(b,a))return b},getNodesByTagName:function(a){a=p.trim(a).replace(/[ ]{2,}/g," ").split(" ");var b=[],c=this;p.each(a,function(a){if(c.children&&c.children.length)for(var e=0,f;f=c.children[e++];)g(f,a,b)});return b},getStyle:function(a){var b=this.getAttr("style");return b?(a=b.match(RegExp("(^|;)\\s*"+a+":([^;]+)","i")))&&a[0]?a[2]:"":""},setStyle:function(a,b){function c(a,b){e=e.replace(RegExp("(^|;)\\s*"+a+":([^;]+;?)","gi"),"$1");b&&(e=a+":"+p.unhtml(b)+";"+e)}
var e=this.getAttr("style");e||(e="");if(p.isObject(a))for(var f in a)c(f,a[f]);else c(a,b);this.setAttr("style",p.trim(e))},traversal:function(a){this.children&&this.children.length&&f(this,a);return this}}})();UE.htmlparser=function(h,a){function e(a,b){if(n[a.tagName]){var c=l.createElement(n[a.tagName]);a.appendChild(c);c.appendChild(l.createText(b))}else a.appendChild(l.createText(b))}function b(a,c,e){var f;if(f=m[c]){for(var d=a,n;"root"!=d.type;){if(p.isArray(f)?-1!=p.indexOf(f,d.tagName):
f==d.tagName){a=d;n=!0;break}d=d.parentNode}n||(a=b(a,p.isArray(f)?f[0]:f))}f=new l({parentNode:a,type:"element",tagName:c.toLowerCase(),children:v.$empty[c]?null:[]});if(e){for(d={};n=g.exec(e);)d[n[1].toLowerCase()]=k[n[1].toLowerCase()]?n[2]||n[3]||n[4]:p.unhtml(n[2]||n[3]||n[4]);f.attrs=d}a.children.push(f);return v.$empty[c]?a:f}var c=/<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\x3e)|(?:([^\s\/>]+)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'<>])*)\/?>))/g,g=/([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
f={b:1,code:1,i:1,u:1,strike:1,s:1,tt:1,strong:1,q:1,samp:1,em:1,span:1,sub:1,img:1,sup:1,font:1,big:1,small:1,iframe:1,a:1,br:1,pre:1};h=h.replace(RegExp(d.fillChar,"g"),"");a||(h=h.replace(RegExp("[\\r\\t\\n"+(a?"":" ")+"]*</?(\\w+)\\s*(?:[^>]*)>[\\r\\t\\n"+(a?"":" ")+"]*","g"),function(b,c){return c&&f[c.toLowerCase()]?b.replace(/(^[\n\r]+)|([\n\r]+$)/g,""):b.replace(RegExp("^[\\r\\n"+(a?"":" ")+"]+"),"").replace(RegExp("[\\r\\n"+(a?"":" ")+"]+$"),"")}));for(var k={href:1,src:1},l=UE.uNode,m={td:"tr",
tr:["tbody","thead","tfoot"],tbody:"table",th:"tr",thead:"table",tfoot:"table",caption:"table",li:["ul","ol"],dt:"dl",dd:"dl",option:"select"},n={ol:"li",ul:"li"},r,t=0,x=0,w=new l({type:"root",children:[]}),u=w;r=c.exec(h);){t=r.index;try{if(t>x&&e(u,h.slice(x,t)),r[3])v.$cdata[u.tagName]?e(u,r[0]):u=b(u,r[3].toLowerCase(),r[4]);else if(r[1]){if("root"!=u.type)if(v.$cdata[u.tagName]&&!v.$cdata[r[1]])e(u,r[0]);else{for(t=u;"element"==u.type&&u.tagName!=r[1].toLowerCase();)if(u=u.parentNode,"root"==
u.type)throw u=t,"break";u=u.parentNode}}else r[2]&&u.children.push(new l({type:"comment",data:r[2],parentNode:u}))}catch(P){}x=c.lastIndex}x<h.length&&e(u,h.slice(x));return w};UE.filterNode=function(){function d(a,e){switch(a.type){case "element":var b;if(b=e[a.tagName])if("-"===b)a.parentNode.removeChild(a);else if(p.isFunction(b)){var c=a.parentNode,g=a.getIndex();b(a);if(a.parentNode){if(a.children)for(b=0;g=a.children[b];)d(g,e),g.parentNode&&b++}else for(b=g;g=c.children[b];)d(g,e),g.parentNode&&
b++}else{if((b=b.$)&&a.attrs){var g={},f;for(c in b){f=a.getAttr(c);if("style"==c&&p.isArray(b[c])){var k=[];p.each(b[c],function(b){var c;(c=a.getStyle(b))&&k.push(b+":"+c)});f=k.join(";")}f&&(g[c]=f)}a.attrs=g}if(a.children)for(b=0;g=a.children[b];)d(g,e),g.parentNode&&b++}else if(v.$cdata[a.tagName])a.parentNode.removeChild(a);else for(c=a.parentNode,g=a.getIndex(),a.parentNode.removeChild(a,!0),b=g;g=c.children[b];)d(g,e),g.parentNode&&b++;break;case "comment":a.parentNode.removeChild(a)}}return function(a,
e){if(p.isEmptyObject(e))return a;var b;(b=e["-"])&&p.each(b.split(" "),function(a){e[a]="-"});b=0;for(var c;c=a.children[b];)d(c,e),c.parentNode&&b++;return a}}();UE.plugin=function(){var d={};return{register:function(a,e,b,c){b&&p.isFunction(b)&&(c=b,b=null);d[a]={optionName:b||a,execFn:e,afterDisabled:c}},load:function(a){p.each(d,function(e){var b=e.execFn.call(a);!1!==a.options[e.optionName]?b&&p.each(b,function(b,e){switch(e.toLowerCase()){case "shortcutkey":a.addshortcutkey(b);break;case "bindevents":p.each(b,
function(b,c){a.addListener(c,b)});break;case "bindmultievents":p.each(p.isArray(b)?b:[b],function(b){var c=p.trim(b.type).split(/\s+/);p.each(c,function(c){a.addListener(c,b.handler)})});break;case "commands":p.each(b,function(b,c){a.commands[c]=b});break;case "outputrule":a.addOutputRule(b);break;case "inputrule":a.addInputRule(b);break;case "defaultoptions":a.setOpt(b)}}):e.afterDisabled&&e.afterDisabled.call(a)});p.each(UE.plugins,function(e){e.call(a)})},run:function(a,e){var b=d[pluginName];
b&&b.exeFn.call(e)}}}();UE.plugins.defaultfilter=function(){var d=this;d.setOpt({allowDivTransToP:!0,disabledTableInTable:!0});d.addInputRule(function(a){function e(a){for(;a&&"element"==a.type;){if("td"==a.tagName)return!0;a=a.parentNode}return!1}var b=this.options.allowDivTransToP,c;a.traversal(function(a){if("element"==a.type)if(v.$cdata[a.tagName]||!d.options.autoClearEmptyNode||!v.$inline[a.tagName]||v.$empty[a.tagName]||a.attrs&&!p.isEmptyObject(a.attrs))switch(a.tagName){case "style":case "script":a.setAttr({cdata_tag:a.tagName,
cdata_data:a.innerHTML()||"",_ue_custom_node_:"true"});a.tagName="div";a.innerHTML("");break;case "a":(c=a.getAttr("href"))&&a.setAttr("_href",c);break;case "img":if((c=a.getAttr("src"))&&/^data:/.test(c)){a.parentNode.removeChild(a);break}a.setAttr("_src",a.getAttr("src"));break;case "span":q.webkit&&(c=a.getStyle("white-space"))&&/nowrap|normal/.test(c)&&(a.setStyle("white-space",""),d.options.autoClearEmptyNode&&p.isEmptyObject(a.attrs)&&a.parentNode.removeChild(a,!0));break;case "p":if(c=a.getAttr("align"))a.setAttr("align"),
a.setStyle("text-align",c);p.each(a.children,function(b){if("element"==b.type&&"p"==b.tagName){var c=b.nextSibling();for(a.parentNode.insertAfter(b,a);c;){var e=c.nextSibling();a.parentNode.insertAfter(c,b);b=c;c=e}return!1}});a.firstChild()||a.innerHTML(q.ie?"&nbsp;":"<br/>");break;case "div":if(a.getAttr("cdata_tag"))break;if((c=a.getAttr("class"))&&/^line number\d+/.test(c))break;if(!b)break;for(var f,k=UE.uNode.createElement("p");f=a.firstChild();)"text"!=f.type&&UE.dom.dtd.$block[f.tagName]?
k.firstChild()?(a.parentNode.insertBefore(k,a),k=UE.uNode.createElement("p")):a.parentNode.insertBefore(f,a):k.appendChild(f);k.firstChild()&&a.parentNode.insertBefore(k,a);a.parentNode.removeChild(a);break;case "dl":a.tagName="ul";break;case "dt":case "dd":a.tagName="li";break;case "li":(f=a.getAttr("class"))&&/list\-/.test(f)||a.setAttr();f=a.getNodesByTagName("ol ul");UE.utils.each(f,function(b){a.parentNode.insertAfter(b,a)});break;case "td":case "th":case "caption":a.children&&a.children.length||
a.appendChild(q.ie?UE.uNode.createText(" "):UE.uNode.createElement("br"));break;case "table":d.options.disabledTableInTable&&e(a)&&(a.parentNode.insertBefore(UE.uNode.createText(a.innerText()),a),a.parentNode.removeChild(a))}else a.firstChild()?"span"!=a.tagName||a.attrs&&!p.isEmptyObject(a.attrs)||a.parentNode.removeChild(a,!0):a.parentNode.removeChild(a)})});d.addOutputRule(function(a){var e;a.traversal(function(a){if("element"==a.type)if(!d.options.autoClearEmptyNode||!v.$inline[a.tagName]||v.$empty[a.tagName]||
a.attrs&&!p.isEmptyObject(a.attrs))switch(a.tagName){case "div":if(e=a.getAttr("cdata_tag"))a.tagName=e,a.appendChild(UE.uNode.createText(a.getAttr("cdata_data"))),a.setAttr({cdata_tag:"",cdata_data:"",_ue_custom_node_:""});break;case "a":(e=a.getAttr("_href"))&&a.setAttr({href:p.html(e),_href:""});break;case "img":(e=a.getAttr("_src"))&&a.setAttr({src:a.getAttr("_src"),_src:""})}else a.firstChild()?"span"!=a.tagName||a.attrs&&!p.isEmptyObject(a.attrs)||a.parentNode.removeChild(a,!0):a.parentNode.removeChild(a)})})};
UE.commands.inserthtml={execCommand:function(h,a,e){var b=this,c;if(a&&!0!==b.fireEvent("beforeinserthtml",a)){c=b.selection.getRange();h=c.document.createElement("div");h.style.display="inline";e||(a=UE.htmlparser(a),b.options.filterRules&&UE.filterNode(a,b.options.filterRules),b.filterInputRule(a),a=a.toHtml());h.innerHTML=p.trim(a);if(!c.collapsed&&(a=c.startContainer,d.isFillChar(a)&&c.setStartBefore(a),a=c.endContainer,d.isFillChar(a)&&c.setEndAfter(a),c.txtToElmBoundary(),c.endContainer&&1==
c.endContainer.nodeType&&(a=c.endContainer.childNodes[c.endOffset])&&d.isBr(a)&&c.setEndAfter(a),0==c.startOffset&&(a=c.startContainer,d.isBoundaryNode(a,"firstChild")&&(a=c.endContainer,c.endOffset==(3==a.nodeType?a.nodeValue.length:a.childNodes.length)&&d.isBoundaryNode(a,"lastChild")&&(b.body.innerHTML="<p>"+(q.ie?"":"<br/>")+"</p>",c.setStart(b.body.firstChild,0).collapse(!0)))),!c.collapsed&&c.deleteContents(),1==c.startContainer.nodeType)){a=c.startContainer.childNodes[c.startOffset];var g;
if(a&&d.isBlockElm(a)&&(g=a.previousSibling)&&d.isBlockElm(g)){for(c.setEnd(g,g.childNodes.length).collapse();a.firstChild;)g.appendChild(a.firstChild);d.remove(a)}}var f,k;e=0;var l;c.inFillChar()&&(a=c.startContainer,d.isFillChar(a)?(c.setStartBefore(a).collapse(!0),d.remove(a)):d.isFillChar(a,!0)&&(a.nodeValue=a.nodeValue.replace(O,""),c.startOffset--,c.collapsed&&c.collapse(!0)));var m=d.findParentByTagName(c.startContainer,"li",!0);if(m){for(var n;a=h.firstChild;){for(;a&&(3==a.nodeType||!d.isBlockElm(a)||
"HR"==a.tagName);)n=a.nextSibling,c.insertNode(a).collapse(),f=a,a=n;if(a)if(/^(ol|ul)$/i.test(a.tagName)){for(;a.firstChild;)f=a.firstChild,d.insertAfter(m,a.firstChild),m=m.nextSibling;d.remove(a)}else n=a.nextSibling,g=b.document.createElement("li"),d.insertAfter(m,g),g.appendChild(a),f=a,a=n,m=g}m=d.findParentByTagName(c.startContainer,"li",!0);d.isEmptyBlock(m)&&d.remove(m);f&&c.setStartAfter(f).collapse(!0).select(!0)}else{for(;a=h.firstChild;){if(e){for(f=b.document.createElement("p");a&&(3==
a.nodeType||!v.$block[a.tagName]);)l=a.nextSibling,f.appendChild(a),a=l;f.firstChild&&(a=f)}c.insertNode(a);l=a.nextSibling;if(!e&&a.nodeType==d.NODE_ELEMENT&&d.isBlockElm(a)&&(f=d.findParent(a,function(a){return d.isBlockElm(a)}))&&"body"!=f.tagName.toLowerCase()&&(!v[f.tagName][a.nodeName]||a.parentNode!==f)){if(v[f.tagName][a.nodeName])for(k=a.parentNode;k!==f;)g=k,k=k.parentNode;else g=f;d.breakParent(a,g||k);g=a.previousSibling;d.trimWhiteTextNode(g);g.childNodes.length||d.remove(g);!q.ie&&((n=
a.nextSibling)&&d.isBlockElm(n)&&n.lastChild&&!d.isBr(n.lastChild))&&n.appendChild(b.document.createElement("br"));e=1}n=a.nextSibling;if(!h.firstChild&&n&&d.isBlockElm(n)){c.setStart(n,0).collapse(!0);break}c.setEndAfter(a).collapse()}a=c.startContainer;l&&d.isBr(l)&&d.remove(l);if(d.isBlockElm(a)&&d.isEmptyNode(a))if(l=a.nextSibling)d.remove(a),1==l.nodeType&&v.$block[l.tagName]&&c.setStart(l,0).collapse(!0).shrinkBoundary();else try{a.innerHTML=q.ie?d.fillChar:"<br/>"}catch(r){c.setStartBefore(a),
d.remove(a)}try{c.select(!0)}catch(t){}}setTimeout(function(){c=b.selection.getRange();c.scrollToView(b.autoHeightEnabled,b.autoHeightEnabled?d.getXY(b.iframe).y:0);b.fireEvent("afterinserthtml")},200)}}};UE.plugins.autotypeset=function(){function h(a,b){if(!a||3==a.nodeType)return 0;if(d.isBr(a))return 1;if(a&&a.parentNode&&k[a.tagName.toLowerCase()])return l&&l.contains(a)||a.getAttribute("pagebreak")?0:b?!d.isEmptyBlock(a):d.isEmptyBlock(a,RegExp("[\\s"+d.fillChar+"]","g"))}function a(a){a.style.cssText||
(d.removeAttributes(a,["style"]),"span"==a.tagName.toLowerCase()&&d.hasNoAttributes(a)&&d.remove(a,!0))}function e(b,e){var k;if(e){if(!c.pasteFilter)return;k=this.document.createElement("div");k.innerHTML=e.html}else k=this.document.body;for(var t=d.getElementsByTagName(k,"*"),x=0,w;w=t[x++];)if(!0!==this.fireEvent("excludeNodeinautotype",w)){c.clearFontSize&&w.style.fontSize&&(d.removeStyle(w,"font-size"),a(w));c.clearFontFamily&&w.style.fontFamily&&(d.removeStyle(w,"font-family"),a(w));if(h(w)){if(c.mergeEmptyline)for(var u=
w.nextSibling,p,F=d.isBr(w);h(u);){p=u;u=p.nextSibling;if(F&&(!u||u&&!d.isBr(u)))break;d.remove(p)}if(c.removeEmptyline&&d.inDoc(w,k)&&!f[w.parentNode.tagName.toLowerCase()]){if(d.isBr(w)&&(u=w.nextSibling)&&!d.isBr(u))continue;d.remove(w);continue}}h(w,!0)&&"SPAN"!=w.tagName&&(c.indent&&(w.style.textIndent=c.indentValue),c.textAlign&&(w.style.textAlign=c.textAlign));if(c.removeClass&&w.className&&!g[w.className.toLowerCase()]){if(l&&l.contains(w))continue;d.removeAttributes(w,["class"])}if(c.imageBlockLine&&
"img"==w.tagName.toLowerCase()&&!w.getAttribute("emotion"))if(e)switch(F=w,c.imageBlockLine){case "left":case "right":case "none":for(var u=F.parentNode,D;v.$inline[u.tagName]||"A"==u.tagName;)u=u.parentNode;p=u;if("P"==p.tagName&&"center"==d.getStyle(p,"text-align")&&!d.isBody(p)&&1==d.getChildCount(p,function(a){return!d.isBr(a)&&!d.isWhitespace(a)}))if(D=p.previousSibling,u=p.nextSibling,D&&u&&1==D.nodeType&&1==u.nodeType&&D.tagName==u.tagName&&d.isBlockElm(D)){for(D.appendChild(p.firstChild);u.firstChild;)D.appendChild(u.firstChild);
d.remove(p);d.remove(u)}else d.setStyle(p,"text-align","");d.setStyle(F,"float",c.imageBlockLine);break;case "center":if("center"!=this.queryCommandValue("imagefloat")){u=F.parentNode;d.setStyle(F,"float","none");for(p=F;u&&1==d.getChildCount(u,function(a){return!d.isBr(a)&&!d.isWhitespace(a)})&&(v.$inline[u.tagName]||"A"==u.tagName);)p=u,u=u.parentNode;u=this.document.createElement("p");d.setAttributes(u,{style:"text-align:center"});p.parentNode.insertBefore(u,p);u.appendChild(p);d.setStyle(p,"float",
"")}}else this.selection.getRange().selectNode(w).select(),this.execCommand("imagefloat",c.imageBlockLine);c.removeEmptyNode&&c.removeTagNames[w.tagName.toLowerCase()]&&(d.hasNoAttributes(w)&&d.isEmptyBlock(w))&&d.remove(w)}e&&(e.html=k.innerHTML)}this.setOpt({autotypeset:{mergeEmptyline:!0,removeClass:!0,removeEmptyline:!1,textAlign:"left",imageBlockLine:"center",pasteFilter:!1,clearFontSize:!1,clearFontFamily:!1,removeEmptyNode:!1,removeTagNames:p.extend({div:1},v.$removeEmpty),indent:!1,indentValue:"2em"}});
var b=this,c=b.options.autotypeset,g={selectTdClass:1,pagebreak:1,anchorclass:1},f={li:1},k={div:1,p:1,blockquote:1,center:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,span:1},l;c&&(c.pasteFilter&&b.addListener("beforepaste",e),b.commands.autotypeset={execCommand:function(){b.removeListener("beforepaste",e);c.pasteFilter&&b.addListener("beforepaste",e);e.call(b)}})};UE.plugin.register("autosubmit",function(){return{shortcutkey:{autosubmit:"ctrl+13"},commands:{autosubmit:{execCommand:function(){var h=d.findParentByTagName(this.iframe,
"form",!1);h&&!1!==this.fireEvent("beforesubmit")&&(this.sync(),h.submit())}}}}});UE.plugin.register("background",function(){function h(a){var b={};a=a.split(";");p.each(a,function(a){var c=a.indexOf(":"),e=p.trim(a.substr(0,c)).toLowerCase();e&&(b[e]=p.trim(a.substr(c+1)||""))});return b}function a(a){if(a){var c=[],d;for(d in a)a.hasOwnProperty(d)&&c.push(d+":"+a[d]+"; ");p.cssRule(b,c.length?"body{"+c.join("")+"}":"",e.document)}else p.cssRule(b,"",e.document)}var e=this,b="editor_background",
c,g=/body[\s]*\{(.+)\}/i,f=e.hasContents;e.hasContents=function(){return e.queryCommandValue("background")?!0:f.apply(e,arguments)};return{bindEvents:{getAllHtml:function(a,b){var c=this.body,f=d.getComputedStyle(c,"background-image"),g="",g=0<f.indexOf(e.options.imagePath)?f.substring(f.indexOf(e.options.imagePath),f.length-1).replace(/"|\(|\)/ig,""):"none"!=f?f.replace(/url\("?|"?\)/ig,""):"",f='<style type="text/css">body{',c={"background-color":d.getComputedStyle(c,"background-color")||"#ffffff",
"background-image":g?"url("+g+")":"","background-repeat":d.getComputedStyle(c,"background-repeat")||"","background-position":q.ie?d.getComputedStyle(c,"background-position-x")+" "+d.getComputedStyle(c,"background-position-y"):d.getComputedStyle(c,"background-position"),height:d.getComputedStyle(c,"height")},h;for(h in c)c.hasOwnProperty(h)&&(f+=h+":"+c[h]+"; ");b.push(f+"}</style> ")},aftersetcontent:function(){!1==c&&a()}},inputRule:function(b){c=!1;p.each(b.getNodesByTagName("p"),function(b){var e=
b.getAttr("data-background");e&&(c=!0,a(h(e)),b.parentNode.removeChild(b))})},outputRule:function(a){var c=(p.cssRule(b,this.document)||"").replace(/[\n\r]+/g,"").match(g);c&&a.appendChild(UE.uNode.createElement('<p style="display:none;" data-background="'+p.trim(c[1].replace(/"/g,"").replace(/[\s]+/g," "))+'"><br/></p>'))},commands:{background:{execCommand:function(b,c){a(c)},queryCommandValue:function(){var a=(p.cssRule(b,this.document)||"").replace(/[\n\r]+/g,"").match(g);return a?h(a[1]):null},
notNeedUndo:!0}}}});UE.commands.imagefloat={execCommand:function(h,a){var e=this.selection.getRange();if(!e.collapsed){var b=e.getClosedNode();if(b&&"IMG"==b.tagName)switch(a){case "left":case "right":case "none":for(var c=b.parentNode,g,f;v.$inline[c.tagName]||"A"==c.tagName;)c=c.parentNode;g=c;if("P"==g.tagName&&"center"==d.getStyle(g,"text-align")){if(!d.isBody(g)&&1==d.getChildCount(g,function(a){return!d.isBr(a)&&!d.isWhitespace(a)}))if(c=g.previousSibling,f=g.nextSibling,c&&f&&1==c.nodeType&&
1==f.nodeType&&c.tagName==f.tagName&&d.isBlockElm(c)){for(c.appendChild(g.firstChild);f.firstChild;)c.appendChild(f.firstChild);d.remove(g);d.remove(f)}else d.setStyle(g,"text-align","");e.selectNode(b).select()}d.setStyle(b,"float","none"==a?"":a);"none"==a&&d.removeAttributes(b,"align");break;case "center":if("center"!=this.queryCommandValue("imagefloat")){c=b.parentNode;d.setStyle(b,"float","");d.removeAttributes(b,"align");for(g=b;c&&1==d.getChildCount(c,function(a){return!d.isBr(a)&&!d.isWhitespace(a)})&&
(v.$inline[c.tagName]||"A"==c.tagName);)g=c,c=c.parentNode;e.setStartBefore(g).setCursor(!1);c=this.document.createElement("div");c.appendChild(g);d.setStyle(g,"float","");this.execCommand("insertHtml",'<p id="_img_parent_tmp" style="text-align:center">'+c.innerHTML+"</p>");g=this.document.getElementById("_img_parent_tmp");g.removeAttribute("id");g=g.firstChild;e.selectNode(g).select();(f=g.parentNode.nextSibling)&&d.isEmptyNode(f)&&d.remove(f)}}}},queryCommandValue:function(){var h=this.selection.getRange(),
a;return h.collapsed?"none":(h=h.getClosedNode())&&1==h.nodeType&&"IMG"==h.tagName?(a=d.getComputedStyle(h,"float")||h.getAttribute("align"),"none"==a&&(a="center"==d.getComputedStyle(h.parentNode,"text-align")?"center":a),{left:1,right:1,center:1}[a]?a:"none"):"none"},queryCommandState:function(){var d=this.selection.getRange();return d.collapsed?-1:(d=d.getClosedNode())&&1==d.nodeType&&"IMG"==d.tagName?0:-1}};UE.commands.insertimage={execCommand:function(h,a){a=p.isArray(a)?a:[a];if(a.length){var e=
this.selection.getRange(),b=e.getClosedNode();if(!b||!/img/i.test(b.tagName)||"edui-faked-video"==b.className&&-1==b.className.indexOf("edui-upload-video")||b.getAttribute("word_img")){var e=[],b="",c;c=a[0];if(1==a.length)b='<img src="'+c.src+'" '+(c._src?' _src="'+c._src+'" ':"")+(c.width?'width="'+c.width+'" ':"")+(c.height?' height="'+c.height+'" ':"")+("left"==c.floatStyle||"right"==c.floatStyle?' style="float:'+c.floatStyle+';"':"")+(c.title&&""!=c.title?' title="'+c.title+'"':"")+(c.border&&
"0"!=c.border?' border="'+c.border+'"':"")+(c.alt&&""!=c.alt?' alt="'+c.alt+'"':"")+(c.hspace&&"0"!=c.hspace?' hspace = "'+c.hspace+'"':"")+(c.vspace&&"0"!=c.vspace?' vspace = "'+c.vspace+'"':"")+"/>","center"==c.floatStyle&&(b='<p style="text-align: center">'+b+"</p>"),e.push(b);else for(var g=0;c=a[g++];)b="<p "+("center"==c.floatStyle?'style="text-align: center" ':"")+'><img src="'+c.src+'" '+(c.width?'width="'+c.width+'" ':"")+(c._src?' _src="'+c._src+'" ':"")+(c.height?' height="'+c.height+'" ':
"")+' style="'+(c.floatStyle&&"center"!=c.floatStyle?"float:"+c.floatStyle+";":"")+(c.border||"")+'" '+(c.title?' title="'+c.title+'"':"")+" /></p>",e.push(b);this.execCommand("insertHtml",e.join(""))}else c=a.shift(),g=c.floatStyle,delete c.floatStyle,d.setAttributes(b,c),this.execCommand("imagefloat",g),0<a.length&&(e.setStartAfter(b).setCursor(!1,!0),this.execCommand("insertimage",a))}}};UE.plugins.justify=function(){var h=d.isBlockElm,a={left:1,right:1,center:1,justify:1},e=function(a,c){var e=
a.createBookmark(),f=function(a){return 1==a.nodeType?"br"!=a.tagName.toLowerCase()&&!d.isBookmarkNode(a):!d.isWhitespace(a)};a.enlarge(!0);for(var k=a.createBookmark(),l=d.getNextDomNode(k.start,!1,f),m=a.cloneRange(),n;l&&!(d.getPosition(l,k.end)&d.POSITION_FOLLOWING);)if(3!=l.nodeType&&h(l))l=d.getNextDomNode(l,!0,f);else{for(m.setStartBefore(l);l&&l!==k.end&&!h(l);)n=l,l=d.getNextDomNode(l,!1,null,function(a){return!h(a)});m.setEndAfter(n);l=m.getCommonAncestor();if(!d.isBody(l)&&h(l))d.setStyles(l,
p.isString(c)?{"text-align":c}:c);else{l=a.document.createElement("p");d.setStyles(l,p.isString(c)?{"text-align":c}:c);var r=m.extractContents();l.appendChild(r);m.insertNode(l)}l=d.getNextDomNode(l,!1,f)}return a.moveToBookmark(k).moveToBookmark(e)};UE.commands.justify={execCommand:function(a,c){var g=this.selection.getRange(),f;g.collapsed&&(f=this.document.createTextNode("p"),g.insertNode(f));e(g,c);f&&(g.setStartBefore(f).collapse(!0),d.remove(f));g.select();return!0},queryCommandValue:function(){var b=
this.selection.getStart(),b=d.getComputedStyle(b,"text-align");return a[b]?b:"left"},queryCommandState:function(){var a=this.selection.getStart();return a&&d.findParentByTagName(a,["td","th","caption"],!0)?-1:0}}};UE.plugins.font=function(){function h(a){for(var b;b=a.parentNode;)if("SPAN"==b.tagName&&1==d.getChildCount(b,function(a){return!d.isBookmarkNode(a)&&!d.isBr(a)}))b.style.cssText+=a.style.cssText,d.remove(a,!0),a=b;else break}function a(a,b,c){if(g[b]&&(a.adjustmentBoundary(),!a.collapsed&&
1==a.startContainer.nodeType)){var e=a.startContainer.childNodes[a.startOffset];if(e&&d.isTagNode(e,"span")){var f=a.createBookmark();p.each(d.getElementsByTagName(e,"span"),function(a){!a.parentNode||d.isBookmarkNode(a)||"backcolor"==b&&d.getComputedStyle(a,"background-color").toLowerCase()===c||(d.removeStyle(a,g[b]),0==a.style.cssText.replace(/^\s+$/,"").length&&d.remove(a,!0))});a.moveToBookmark(f)}}}function e(b,c,e){var f=b.collapsed,g=b.createBookmark();if(f)for(f=g.start.parentNode;v.$inline[f.tagName];)f=
f.parentNode;else f=d.getCommonAncestor(g.start,g.end);p.each(d.getElementsByTagName(f,"span"),function(a){if(a.parentNode&&!d.isBookmarkNode(a))if(/\s*border\s*:\s*none;?\s*/i.test(a.style.cssText))/^\s*border\s*:\s*none;?\s*$/.test(a.style.cssText)?d.remove(a,!0):d.removeStyle(a,"border");else{/border/i.test(a.style.cssText)&&("SPAN"==a.parentNode.tagName&&/border/i.test(a.parentNode.style.cssText))&&(a.style.cssText=a.style.cssText.replace(/border[^:]*:[^;]+;?/gi,""));if("fontborder"!=c||"none"!=
e)for(var b=a.nextSibling;b&&1==b.nodeType&&"SPAN"==b.tagName;){if(d.isBookmarkNode(b)&&"fontborder"==c)a.appendChild(b);else if(b.style.cssText==a.style.cssText&&(d.moveChild(b,a),d.remove(b)),a.nextSibling===b)break;b=a.nextSibling}h(a);q.ie&&8<q.version&&(b=d.findParent(a,function(a){return"SPAN"==a.tagName&&/background-color/.test(a.style.cssText)}))&&!/background-color/.test(a.style.cssText)&&(a.style.backgroundColor=b.style.backgroundColor)}});b.moveToBookmark(g);a(b,c,e)}var b={forecolor:"color",
backcolor:"background-color",fontsize:"font-size",fontfamily:"font-family",underline:"text-decoration",strikethrough:"text-decoration",fontborder:"border"},c={underline:1,strikethrough:1,fontborder:1},g={forecolor:"color",backcolor:"background-color",fontsize:"font-size",fontfamily:"font-family"};this.setOpt({fontfamily:[{name:"songti",val:"\u5b8b\u4f53,SimSun"},{name:"yahei",val:"\u5fae\u8f6f\u96c5\u9ed1,Microsoft YaHei"},{name:"kaiti",val:"\u6977\u4f53,\u6977\u4f53_GB2312, SimKai"},{name:"heiti",
val:"\u9ed1\u4f53, SimHei"},{name:"lishu",val:"\u96b6\u4e66, SimLi"},{name:"andaleMono",val:"andale mono"},{name:"arial",val:"arial, helvetica,sans-serif"},{name:"arialBlack",val:"arial black,avant garde"},{name:"comicSansMs",val:"comic sans ms"},{name:"impact",val:"impact,chicago"},{name:"timesNewRoman",val:"times new roman"}],fontsize:[10,11,12,14,16,18,20,24,36]});this.addInputRule(function(a){p.each(a.getNodesByTagName("u s del font strike"),function(a){if("font"==a.tagName){var b=[],c;for(c in a.attrs)switch(c){case "size":b.push("font-size:"+
({1:"10",2:"12",3:"16",4:"18",5:"24",6:"32",7:"48"}[a.attrs[c]]||a.attrs[c])+"px");break;case "color":b.push("color:"+a.attrs[c]);break;case "face":b.push("font-family:"+a.attrs[c]);break;case "style":b.push(a.attrs[c])}a.attrs={style:b.join(";")}}else b="u"==a.tagName?"underline":"line-through",a.attrs={style:(a.getAttr("style")||"")+"text-decoration:"+b+";"};a.tagName="span"})});for(var f in b)(function(a,b){UE.commands[a]={execCommand:function(f,g){g=g||(this.queryCommandState(f)?"none":"underline"==
f?"underline":"fontborder"==f?"1px solid #000":"line-through");var h=this.selection.getRange(),t;if("default"==g)h.collapsed&&(t=this.document.createTextNode("font"),h.insertNode(t).select()),this.execCommand("removeFormat","span,a",b),t&&(h.setStartBefore(t).collapse(!0),d.remove(t)),e(h,f,g),h.select();else if(h.collapsed){var x=d.findParentByTagName(h.startContainer,"span",!0);t=this.document.createTextNode("font");if(!x||x.children.length||x[q.ie?"innerText":"textContent"].replace(O,"").length){h.insertNode(t);
h.selectNode(t).select();x=h.document.createElement("span");if(c[a]){if(d.findParentByTagName(t,"a",!0)){h.setStartBefore(t).setCursor();d.remove(t);return}this.execCommand("removeFormat","span,a",b)}x.style.cssText=b+":"+g;t.parentNode.insertBefore(x,t);if(!q.ie||q.ie&&9==q.version)for(var w=x.parentNode;!d.isBlockElm(w);)"SPAN"==w.tagName&&(x.style.cssText=w.style.cssText+";"+x.style.cssText),w=w.parentNode;ka?setTimeout(function(){h.setStart(x,0).collapse(!0);e(h,f,g);h.select()}):(h.setStart(x,
0).collapse(!0),e(h,f,g),h.select())}else h.insertNode(t),c[a]&&(h.selectNode(t).select(),this.execCommand("removeFormat","span,a",b,null),x=d.findParentByTagName(t,"span",!0),h.setStartBefore(t)),x&&(x.style.cssText+=";"+b+":"+g),h.collapse(!0).select();d.remove(t)}else c[a]&&this.queryCommandValue(a)&&this.execCommand("removeFormat","span,a",b),h=this.selection.getRange(),h.applyInlineStyle("span",{style:b+":"+g}),e(h,f,g),h.select();return!0},queryCommandValue:function(a){var c=this.selection.getStart();
if("underline"==a||"strikethrough"==a){for(var e=c;e&&!d.isBlockElm(e)&&!d.isBody(e);){if(1==e.nodeType&&(a=d.getComputedStyle(e,b),"none"!=a))return a;e=e.parentNode}return"none"}if("fontborder"==a){for(a=c;a&&v.$inline[a.tagName];){if((e=d.getComputedStyle(a,"border"))&&/1px/.test(e)&&/solid/.test(e))return e;a=a.parentNode}return""}return"FontSize"==a?(e=d.getComputedStyle(c,b),(a=/^([\d\.]+)(\w+)$/.exec(e))?Math.floor(a[1])+a[2]:e):d.getComputedStyle(c,b)},queryCommandState:function(a){if(!c[a])return 0;
var b=this.queryCommandValue(a);return"fontborder"==a?/1px/.test(b)&&/solid/.test(b):"underline"==a?/underline/.test(b):/line\-through/.test(b)}}})(f,b[f])};UE.plugins.link=function(){function h(a){var e=a.startContainer,b=a.endContainer;(e=d.findParentByTagName(e,"a",!0))&&a.setStartBefore(e);(b=d.findParentByTagName(b,"a",!0))&&a.setEndAfter(b)}UE.commands.unlink={execCommand:function(){var a=this.selection.getRange(),e;if(!a.collapsed||d.findParentByTagName(a.startContainer,"a",!0))e=a.createBookmark(),
h(a),a.removeInlineStyle("a").moveToBookmark(e).select()},queryCommandState:function(){return!this.highlight&&this.queryCommandValue("link")?0:-1}};UE.commands.link={execCommand:function(a,e){var b;e._href&&(e._href=p.unhtml(e._href,/[<">]/g));e.href&&(e.href=p.unhtml(e.href,/[<">]/g));e.textValue&&(e.textValue=p.unhtml(e.textValue,/[<">]/g));var c=b=this.selection.getRange(),g=c.cloneRange(),f=this.queryCommandValue("link");h(c=c.adjustmentBoundary());var k=c.startContainer;1==k.nodeType&&f&&(k=
k.childNodes[c.startOffset])&&(1==k.nodeType&&"A"==k.tagName&&/^(?:https?|ftp|file)\s*:\s*\/\//.test(k[q.ie?"innerText":"textContent"]))&&(k[q.ie?"innerText":"textContent"]=p.html(e.textValue||e.href));if(!g.collapsed||f)c.removeInlineStyle("a"),g=c.cloneRange();if(g.collapsed){var f=c.document.createElement("a"),l="";e.textValue?(l=p.html(e.textValue),delete e.textValue):l=p.html(e.href);d.setAttributes(f,e);(k=d.findParentByTagName(g.startContainer,"a",!0))&&d.isInNodeEndBoundary(g,k)&&c.setStartAfter(k).collapse(!0);
f[q.ie?"innerText":"textContent"]=l;c.insertNode(f).selectNode(f)}else c.applyInlineStyle("a",e);b.collapse().select(!0)},queryCommandValue:function(){var a=this.selection.getRange(),e;if(a.collapsed){if(e=a.startContainer,(e=1==e.nodeType?e:e.parentNode)&&(e=d.findParentByTagName(e,"a",!0))&&!d.isInNodeEndBoundary(a,e))return e}else{a.shrinkBoundary();var b=3!=a.startContainer.nodeType&&a.startContainer.childNodes[a.startOffset]?a.startContainer.childNodes[a.startOffset]:a.startContainer,c=3==a.endContainer.nodeType||
0==a.endOffset?a.endContainer:a.endContainer.childNodes[a.endOffset-1],a=a.getCommonAncestor();e=d.findParentByTagName(a,"a",!0);if(!e&&1==a.nodeType)for(var a=a.getElementsByTagName("a"),g,f,k=0,l;l=a[k++];)if(g=d.getPosition(l,b),f=d.getPosition(l,c),(g&d.POSITION_FOLLOWING||g&d.POSITION_CONTAINS)&&(f&d.POSITION_PRECEDING||f&d.POSITION_CONTAINS)){e=l;break}return e}},queryCommandState:function(){var a=this.selection.getRange().getClosedNode();return!a||"edui-faked-video"!=a.className&&-1==a.className.indexOf("edui-upload-video")?
0:-1}}};UE.plugins.insertframe=function(){var d=this;d.addListener("selectionchange",function(){d._iframe&&delete d._iframe})};UE.commands.scrawl={queryCommandState:function(){return q.ie&&8>=q.version?-1:0}};UE.plugins.removeformat=function(){this.setOpt({removeFormatTags:"b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var",removeFormatAttributes:"class,style,lang,width,height,align,hspace,valign"});this.commands.removeformat={execCommand:function(h,a,e,b,c){function g(a){if(3==
a.nodeType||"span"!=a.tagName.toLowerCase())return 0;if(q.ie){var b=a.attributes;if(b.length){a=0;for(var c=b.length;a<c;a++)if(b[a].specified)return 0;return 1}}return!a.attributes.length}var f=RegExp("^(?:"+(a||this.options.removeFormatTags).replace(/,/g,"|")+")$","i"),k=e?[]:(b||this.options.removeFormatAttributes).split(",");h=new I.Range(this.document);var l,m,n=function(a){return 1==a.nodeType};h=this.selection.getRange();(function(a){var b=a.createBookmark();a.collapsed&&a.enlarge(!0);if(!c){var h=
d.findParentByTagName(a.startContainer,"a",!0);h&&a.setStartBefore(h);(h=d.findParentByTagName(a.endContainer,"a",!0))&&a.setEndAfter(h)}l=a.createBookmark();for(h=l.start;(m=h.parentNode)&&!d.isBlockElm(m);)d.breakParent(h,m),d.clearEmptySibling(h);if(l.end){for(h=l.end;(m=h.parentNode)&&!d.isBlockElm(m);)d.breakParent(h,m),d.clearEmptySibling(h);for(var h=d.getNextDomNode(l.start,!1,n),w;h&&h!=l.end;)w=d.getNextDomNode(h,!0,n),v.$empty[h.tagName.toLowerCase()]||d.isBookmarkNode(h)||(f.test(h.tagName)?
e?(d.removeStyle(h,e),g(h)&&"text-decoration"!=e&&d.remove(h,!0)):d.remove(h,!0):v.$tableContent[h.tagName]||v.$list[h.tagName]||(d.removeAttributes(h,k),g(h)&&d.remove(h,!0))),h=w}h=l.start.parentNode;!d.isBlockElm(h)||(v.$tableContent[h.tagName]||v.$list[h.tagName])||d.removeAttributes(h,k);h=l.end.parentNode;l.end&&(d.isBlockElm(h)&&!v.$tableContent[h.tagName]&&!v.$list[h.tagName])&&d.removeAttributes(h,k);a.moveToBookmark(l).moveToBookmark(b);h=a.startContainer;for(w=a.collapsed;1==h.nodeType&&
d.isEmptyNode(h)&&v.$removeEmpty[h.tagName];)b=h.parentNode,a.setStartBefore(h),a.startContainer===a.endContainer&&a.endOffset--,d.remove(h),h=b;if(!w)for(h=a.endContainer;1==h.nodeType&&d.isEmptyNode(h)&&v.$removeEmpty[h.tagName];)b=h.parentNode,a.setEndBefore(h),d.remove(h),h=b})(h);h.select()}}};UE.plugins.blockquote=function(){this.commands.blockquote={execCommand:function(h,a){var e=this.selection.getRange(),b=d.filterNodeList(this.selection.getStartElementPath(),"blockquote"),c=v.blockquote,
g=e.createBookmark();if(b){var c=e.startContainer,c=d.isBlockElm(c)?c:d.findParent(c,function(a){return d.isBlockElm(a)}),f=e.endContainer,f=d.isBlockElm(f)?f:d.findParent(f,function(a){return d.isBlockElm(a)}),c=d.findParentByTagName(c,"li",!0)||c,f=d.findParentByTagName(f,"li",!0)||f;"LI"==c.tagName||"TD"==c.tagName||c===b||d.isBody(c)?d.remove(b,!0):d.breakParent(c,b);c!==f&&(b=d.findParentByTagName(f,"blockquote"))&&("LI"==f.tagName||"TD"==f.tagName||d.isBody(f)?b.parentNode&&d.remove(b,!0):d.breakParent(f,
b));for(var k=d.getElementsByTagName(this.document,"blockquote"),b=0,l;l=k[b++];)l.childNodes.length?d.getPosition(l,c)&d.POSITION_FOLLOWING&&d.getPosition(l,f)&d.POSITION_PRECEDING&&d.remove(l,!0):d.remove(l)}else{b=e.cloneRange();k=f=1==b.startContainer.nodeType?b.startContainer:b.startContainer.parentNode;for(l=1;;){if(d.isBody(f)){k!==f?e.collapsed?(b.selectNode(k),l=0):b.setStartBefore(k):b.setStart(f,0);break}if(!c[f.tagName]){e.collapsed?b.selectNode(k):b.setStartBefore(k);break}k=f;f=f.parentNode}if(l)for(k=
f=f=1==b.endContainer.nodeType?b.endContainer:b.endContainer.parentNode;;){if(d.isBody(f)){k!==f?b.setEndAfter(k):b.setEnd(f,f.childNodes.length);break}if(!c[f.tagName]){b.setEndAfter(k);break}k=f;f=f.parentNode}f=e.document.createElement("blockquote");d.setAttributes(f,a);f.appendChild(b.extractContents());b.insertNode(f);c=d.getElementsByTagName(f,"blockquote");for(b=0;f=c[b++];)f.parentNode&&d.remove(f,!0)}e.moveToBookmark(g).select()},queryCommandState:function(){return d.filterNodeList(this.selection.getStartElementPath(),
"blockquote")?1:0}}};UE.commands.touppercase=UE.commands.tolowercase={execCommand:function(h){var a=this.selection.getRange();if(a.collapsed)return a;for(var e=a.createBookmark(),b=e.end,c=function(a){return!d.isBr(a)&&!d.isWhitespace(a)},g=d.getNextDomNode(e.start,!1,c);g&&d.getPosition(g,b)&d.POSITION_PRECEDING&&(3==g.nodeType&&(g.nodeValue=g.nodeValue["touppercase"==h?"toUpperCase":"toLowerCase"]()),g=d.getNextDomNode(g,!0,c),g!==b););a.moveToBookmark(e).select()}};UE.commands.indent={execCommand:function(){var d=
this.queryCommandState("indent")?"0em":this.options.indentValue||"2em";this.execCommand("Paragraph","p",{style:"text-indent:"+d})},queryCommandState:function(){var h=d.filterNodeList(this.selection.getStartElementPath(),"p h1 h2 h3 h4 h5 h6");return h&&h.style.textIndent&&parseInt(h.style.textIndent)?1:0}};UE.commands.print={execCommand:function(){this.window.print()},notNeedUndo:1};UE.plugins.selectall=function(){this.commands.selectall={execCommand:function(){var h=this.body,a=this.selection.getRange();
a.selectNodeContents(h);d.isEmptyBlock(h)&&(q.opera&&(h.firstChild&&1==h.firstChild.nodeType)&&a.setStartAtFirst(h.firstChild),a.collapse(!0));a.select(!0)},notNeedUndo:1};this.addshortcutkey({selectAll:"ctrl+65"})};UE.plugins.paragraph=function(){var h=d.isBlockElm,a=["TD","LI","PRE"],e=function(b,c,e,f){var k=b.createBookmark(),l=function(a){return 1==a.nodeType?"br"!=a.tagName.toLowerCase()&&!d.isBookmarkNode(a):!d.isWhitespace(a)},m;b.enlarge(!0);var n=b.createBookmark();m=d.getNextDomNode(n.start,
!1,l);for(var r=b.cloneRange(),t;m&&!(d.getPosition(m,n.end)&d.POSITION_FOLLOWING);)if(3!=m.nodeType&&h(m))m=d.getNextDomNode(m,!0,l);else{for(r.setStartBefore(m);m&&m!==n.end&&!h(m);)t=m,m=d.getNextDomNode(m,!1,null,function(a){return!h(a)});r.setEndAfter(t);m=b.document.createElement(c);e&&(d.setAttributes(m,e),f&&("customstyle"==f&&e.style)&&(m.style.cssText=e.style));m.appendChild(r.extractContents());d.isEmptyNode(m)&&d.fillChar(b.document,m);r.insertNode(m);var x=m.parentNode;h(x)&&(!d.isBody(m.parentNode)&&
-1==p.indexOf(a,x.tagName))&&(f&&"customstyle"==f||(x.getAttribute("dir")&&m.setAttribute("dir",x.getAttribute("dir")),x.style.cssText&&(m.style.cssText=x.style.cssText+";"+m.style.cssText),x.style.textAlign&&!m.style.textAlign&&(m.style.textAlign=x.style.textAlign),x.style.textIndent&&!m.style.textIndent&&(m.style.textIndent=x.style.textIndent),x.style.padding&&!m.style.padding&&(m.style.padding=x.style.padding)),e&&/h\d/i.test(x.tagName)&&!/h\d/i.test(m.tagName)?(d.setAttributes(x,e),f&&("customstyle"==
f&&e.style)&&(x.style.cssText=e.style),d.remove(m,!0),m=x):d.remove(m.parentNode,!0));m=-1!=p.indexOf(a,x.tagName)?x:m;m=d.getNextDomNode(m,!1,l)}return b.moveToBookmark(n).moveToBookmark(k)};this.setOpt("paragraph",{p:"",h1:"",h2:"",h3:"",h4:"",h5:"",h6:""});this.commands.paragraph={execCommand:function(a,c,g,f){a=this.selection.getRange();if(a.collapsed){var k=this.document.createTextNode("p");a.insertNode(k);if(q.ie){var l=k.previousSibling;l&&d.isWhitespace(l)&&d.remove(l);(l=k.nextSibling)&&
d.isWhitespace(l)&&d.remove(l)}}a=e(a,c,g,f);k&&(a.setStartBefore(k).collapse(!0),pN=k.parentNode,d.remove(k),d.isBlockElm(pN)&&d.isEmptyNode(pN)&&d.fillNode(this.document,pN));q.gecko&&a.collapsed&&1==a.startContainer.nodeType&&(g=a.startContainer.childNodes[a.startOffset])&&(1==g.nodeType&&g.tagName.toLowerCase()==c)&&a.setStart(g,0).collapse(!0);a.select();return!0},queryCommandValue:function(){var a=d.filterNodeList(this.selection.getStartElementPath(),"p h1 h2 h3 h4 h5 h6");return a?a.tagName.toLowerCase():
""}}};(function(){var h=d.isBlockElm,a=function(a){return d.filterNodeList(a.selection.getStartElementPath(),function(a){return a.getAttribute("dir")})},e=function(b,c,e){var f=function(a){return 1==a.nodeType?!d.isBookmarkNode(a):!d.isWhitespace(a)};if((c=a(c))&&b.collapsed)return c.setAttribute("dir",e),b;c=b.createBookmark();b.enlarge(!0);for(var k=b.createBookmark(),l=d.getNextDomNode(k.start,!1,f),m=b.cloneRange(),n;l&&!(d.getPosition(l,k.end)&d.POSITION_FOLLOWING);)if(3!=l.nodeType&&h(l))l=
d.getNextDomNode(l,!0,f);else{for(m.setStartBefore(l);l&&l!==k.end&&!h(l);)n=l,l=d.getNextDomNode(l,!1,null,function(a){return!h(a)});m.setEndAfter(n);l=m.getCommonAncestor();if(!d.isBody(l)&&h(l))l.setAttribute("dir",e);else{l=b.document.createElement("p");l.setAttribute("dir",e);var r=m.extractContents();l.appendChild(r);m.insertNode(l)}l=d.getNextDomNode(l,!1,f)}return b.moveToBookmark(k).moveToBookmark(c)};UE.commands.directionality={execCommand:function(a,c){var g=this.selection.getRange();if(g.collapsed){var f=
this.document.createTextNode("d");g.insertNode(f)}e(g,this,c);f&&(g.setStartBefore(f).collapse(!0),d.remove(f));g.select();return!0},queryCommandValue:function(){var b=a(this);return b?b.getAttribute("dir"):"ltr"}}})();UE.plugins.horizontal=function(){this.commands.horizontal={execCommand:function(d){if(-1!==this.queryCommandState(d)){this.execCommand("insertHtml","<hr>");d=this.selection.getRange();var a=d.startContainer;if(1==a.nodeType&&!a.childNodes[d.startOffset]){var e;(e=a.childNodes[d.startOffset-
1])&&(1==e.nodeType&&"HR"==e.tagName)&&("p"==this.options.enterTag?(e=this.document.createElement("p"),d.insertNode(e),d.setStart(e,0).setCursor()):(e=this.document.createElement("br"),d.insertNode(e),d.setStartBefore(e).setCursor()))}return!0}},queryCommandState:function(){return d.filterNodeList(this.selection.getStartElementPath(),"table")?-1:0}};this.addListener("delkeydown",function(h,a){var e=this.selection.getRange();e.txtToElmBoundary(!0);if(d.isStartInblock(e)){var b=e.startContainer.previousSibling;
if(b&&d.isTagNode(b,"hr"))return d.remove(b),e.select(),d.preventDefault(a),!0}})};UE.commands.time=UE.commands.date={execCommand:function(d,a){function e(a,b){var c=("0"+a.getHours()).slice(-2),e=("0"+a.getMinutes()).slice(-2),d=("0"+a.getSeconds()).slice(-2);return(b||"hh:ii:ss").replace(/hh/ig,c).replace(/ii/ig,e).replace(/ss/ig,d)}function b(a,b){var c=("000"+a.getFullYear()).slice(-4),e=c.slice(-2),d=("0"+(a.getMonth()+1)).slice(-2),n=("0"+a.getDate()).slice(-2);return(b||"yyyy-mm-dd").replace(/yyyy/ig,
c).replace(/yy/ig,e).replace(/mm/ig,d).replace(/dd/ig,n)}var c=new Date;this.execCommand("insertHtml","time"==d?e(c,a):b(c,a))}};UE.plugins.rowspacing=function(){this.setOpt({rowspacingtop:["5","10","15","20","25"],rowspacingbottom:["5","10","15","20","25"]});this.commands.rowspacing={execCommand:function(d,a,e){this.execCommand("paragraph","p",{style:"margin-"+e+":"+a+"px"});return!0},queryCommandValue:function(h,a){var e=d.filterNodeList(this.selection.getStartElementPath(),function(a){return d.isBlockElm(a)});
return e?(e=d.getComputedStyle(e,"margin-"+a).replace(/[^\d]/g,""))?e:0:0}}};UE.plugins.lineheight=function(){this.setOpt({lineheight:"1 1.5 1.75 2 3 4 5".split(" ")});this.commands.lineheight={execCommand:function(d,a){this.execCommand("paragraph","p",{style:"line-height:"+("1"==a?"normal":a+"em")});return!0},queryCommandValue:function(){var h=d.filterNodeList(this.selection.getStartElementPath(),function(a){return d.isBlockElm(a)});if(h)return h=d.getComputedStyle(h,"line-height"),"normal"==h?1:
h.replace(/[^\d.]*/ig,"")}}};UE.plugins.insertcode=function(){var h=this;h.ready(function(){p.cssRule("pre","pre{margin:.5em 0;padding:.4em .6em;border-radius:8px;background:#f8f8f8;}",h.document)});h.setOpt("insertcode",{as3:"ActionScript3",bash:"Bash/Shell",cpp:"C/C++",css:"Css",cf:"CodeFunction","c#":"C#",delphi:"Delphi",diff:"Diff",erlang:"Erlang",groovy:"Groovy",html:"Html",java:"Java",jfx:"JavaFx",js:"Javascript",pl:"Perl",php:"Php",plain:"Plain Text",ps:"PowerShell",python:"Python",ruby:"Ruby",
scala:"Scala",sql:"Sql",vb:"Vb",xml:"Xml"});h.commands.insertcode={execCommand:function(a,e){var b=this.selection.getRange(),c=d.findParentByTagName(b.startContainer,"pre",!0);if(c)c.className="brush:"+e+";toolbar:false;";else{var g="";b.collapsed?g=q.ie?8<q.version?"":"&nbsp;":"<br/>":(c=b.extractContents(),b=this.document.createElement("div"),b.appendChild(c),p.each(UE.filterNode(UE.htmlparser(b.innerHTML.replace(/[\r\t]/g,"")),this.options.filterTxtRules).children,function(a){q.ie&&8<q.version?
("element"==a.type?"br"==a.tagName?g+="\n":v.$empty[a.tagName]||(p.each(a.children,function(b){"element"==b.type?"br"==b.tagName?g+="\n":v.$empty[a.tagName]||(g+=b.innerText()):g+=b.data}),/\n$/.test(g)||(g+="\n")):g+=a.data+"\n",!a.nextSibling()&&/\n$/.test(g)&&(g=g.replace(/\n$/,""))):q.ie?("element"==a.type?"br"==a.tagName?g+="<br>":v.$empty[a.tagName]||(p.each(a.children,function(b){"element"==b.type?"br"==b.tagName?g+="<br>":v.$empty[a.tagName]||(g+=b.innerText()):g+=b.data}),/br>$/.test(g)||
(g+="<br>")):g+=a.data+"<br>",!a.nextSibling()&&/<br>$/.test(g)&&(g=g.replace(/<br>$/,""))):(g+="element"==a.type?v.$empty[a.tagName]?"":a.innerText():a.data,!/br\/?\s*>$/.test(g)&&a.nextSibling()&&(g+="<br>"))}));this.execCommand("inserthtml",'<pre id="coder"class="brush:'+e+';toolbar:false">'+g+"</pre>",!0);c=this.document.getElementById("coder");d.removeAttributes(c,"id");(b=c.previousSibling)&&(3==b.nodeType&&1==b.nodeValue.length&&q.ie&&6==q.version||d.isEmptyBlock(b))&&d.remove(b);b=this.selection.getRange();
d.isEmptyBlock(c)?b.setStart(c,0).setCursor(!1,!0):b.selectNodeContents(c).select()}},queryCommandValue:function(){var a=this.selection.getStartElementPath(),e="";p.each(a,function(a){if("PRE"==a.nodeName)return e=(a=a.className.match(/brush:([^;]+)/))&&a[1]?a[1]:"",!1});return e}};h.addInputRule(function(a){p.each(a.getNodesByTagName("pre"),function(a){var b=a.getNodesByTagName("br");b.length?q.ie&&8<q.version&&p.each(b,function(a){var b=UE.uNode.createText("\n");a.parentNode.insertBefore(b,a);a.parentNode.removeChild(a)}):
q.ie&&8<q.version||(b=a.innerText().split(/\n/),a.innerHTML(""),p.each(b,function(b){b.length&&a.appendChild(UE.uNode.createText(b));a.appendChild(UE.uNode.createElement("br"))}))})});h.addOutputRule(function(a){p.each(a.getNodesByTagName("pre"),function(a){var b="";p.each(a.children,function(a){b="text"==a.type?b+a.data.replace(/[ ]/g,"&nbsp;").replace(/\n$/,""):"br"==a.tagName?b+"\n":b+(v.$empty[a.tagName]?a.innerText():"")});a.innerText(b.replace(/(&nbsp;|\n)+$/,""))})});h.notNeedCodeQuery={help:1,
undo:1,redo:1,source:1,print:1,searchreplace:1,fullscreen:1,preview:1,insertparagraph:1,elementpath:1,insertcode:1,inserthtml:1,selectall:1};h.queryCommandState=function(a){return!this.notNeedCodeQuery[a.toLowerCase()]&&this.selection&&this.queryCommandValue("insertcode")?-1:UE.Editor.prototype.queryCommandState.apply(this,arguments)};h.addListener("beforeenterkeydown",function(){var a=h.selection.getRange(),e=d.findParentByTagName(a.startContainer,"pre",!0);if(e){h.fireEvent("saveScene");a.collapsed||
a.deleteContents();if(!q.ie||q.ie9above){e=h.document.createElement("br");a.insertNode(e).setStartAfter(e).collapse(!0);e.nextSibling||q.ie&&!(10<q.version)?a.setStartAfter(e):a.insertNode(e.cloneNode(!1));for(var e=e.previousSibling,b;e;)if(b=e,e=e.previousSibling,!e||"BR"==e.nodeName){e=b;break}if(e){for(b="";e&&"BR"!=e.nodeName&&RegExp("^[\\s"+d.fillChar+"]*$").test(e.nodeValue);)b+=e.nodeValue,e=e.nextSibling;"BR"!=e.nodeName&&(e=e.nodeValue.match(RegExp("^([\\s"+d.fillChar+"]+)")))&&e[1]&&(b+=
e[1]);b&&(b=h.document.createTextNode(b),a.insertNode(b).setStartAfter(b))}a.collapse(!0).select(!0)}else if(8<q.version)if(e=h.document.createTextNode("\n"),b=a.startContainer,0==a.startOffset){if(b.previousSibling){a.insertNode(e);var c=h.document.createTextNode(" ");a.setStartAfter(e).insertNode(c).setStart(c,0).collapse(!0).select(!0)}}else a.insertNode(e).setStartAfter(e),c=h.document.createTextNode(" "),(b=a.startContainer.childNodes[a.startOffset])&&!/^\n/.test(b.nodeValue)&&a.setStartBefore(e),
a.insertNode(c).setStart(c,0).collapse(!0).select(!0);else{e=h.document.createElement("br");a.insertNode(e);a.insertNode(h.document.createTextNode(d.fillChar));a.setStartAfter(e);for(e=e.previousSibling;e;)if(b=e,e=e.previousSibling,!e||"BR"==e.nodeName){e=b;break}if(e){for(b="";e&&"BR"!=e.nodeName&&RegExp("^[ "+d.fillChar+"]*$").test(e.nodeValue);)b+=e.nodeValue,e=e.nextSibling;"BR"!=e.nodeName&&(e=e.nodeValue.match(RegExp("^([ "+d.fillChar+"]+)")))&&e[1]&&(b+=e[1]);b=h.document.createTextNode(b);
a.insertNode(b).setStartAfter(b)}a.collapse(!0).select()}h.fireEvent("saveScene");return!0}});h.addListener("tabkeydown",function(a,e){var b=h.selection.getRange(),c=d.findParentByTagName(b.startContainer,"pre",!0);if(c){h.fireEvent("saveScene");if(!e.shiftKey)if(b.collapsed)c=h.document.createTextNode("    "),b.insertNode(c).setStartAfter(c).collapse(!0).select(!0);else{for(var g=b.createBookmark(),f=g.start.previousSibling;f;){if(c.firstChild===f&&!d.isBr(f)){c.insertBefore(h.document.createTextNode("    "),
f);break}if(d.isBr(f)){c.insertBefore(h.document.createTextNode("    "),f.nextSibling);break}f=f.previousSibling}var k=g.end,f=g.start.nextSibling;for(c.firstChild===g.start&&c.insertBefore(h.document.createTextNode("    "),f.nextSibling);f&&f!==k;){if(d.isBr(f)&&f.nextSibling){if(f.nextSibling===k)break;c.insertBefore(h.document.createTextNode("    "),f.nextSibling)}f=f.nextSibling}b.moveToBookmark(g).select()}h.fireEvent("saveScene");return!0}});h.addListener("beforeinserthtml",function(a,e){var b=
this,c=b.selection.getRange();if(d.findParentByTagName(c.startContainer,"pre",!0)){c.collapsed||c.deleteContents();var g="";if(q.ie&&8<q.version){p.each(UE.filterNode(UE.htmlparser(e),b.options.filterTxtRules).children,function(a){"element"==a.type?"br"==a.tagName?g+="\n":v.$empty[a.tagName]||(p.each(a.children,function(b){"element"==b.type?"br"==b.tagName?g+="\n":v.$empty[a.tagName]||(g+=b.innerText()):g+=b.data}),/\n$/.test(g)||(g+="\n")):g+=a.data+"\n";!a.nextSibling()&&/\n$/.test(g)&&(g=g.replace(/\n$/,
""))});var f=b.document.createTextNode(p.html(g.replace(/&nbsp;/g," ")));c.insertNode(f).selectNode(f).select()}else{var k=b.document.createDocumentFragment();p.each(UE.filterNode(UE.htmlparser(e),b.options.filterTxtRules).children,function(a){"element"==a.type?"br"==a.tagName?k.appendChild(b.document.createElement("br")):v.$empty[a.tagName]||(p.each(a.children,function(c){"element"==c.type?"br"==c.tagName?k.appendChild(b.document.createElement("br")):v.$empty[a.tagName]||k.appendChild(b.document.createTextNode(p.html(c.innerText().replace(/&nbsp;/g,
" ")))):k.appendChild(b.document.createTextNode(p.html(c.data.replace(/&nbsp;/g," "))))}),"BR"!=k.lastChild.nodeName&&k.appendChild(b.document.createElement("br"))):k.appendChild(b.document.createTextNode(p.html(a.data.replace(/&nbsp;/g," "))));a.nextSibling()||"BR"!=k.lastChild.nodeName||k.removeChild(k.lastChild)});c.insertNode(k).select()}return!0}});h.addListener("keydown",function(a,e){if(40==(e.keyCode||e.which)){var b=this.selection.getRange(),c,g=b.startContainer;if(b.collapsed&&(c=d.findParentByTagName(b.startContainer,
"pre",!0))&&!c.nextSibling){for(var f=c.lastChild;f&&"BR"==f.nodeName;)f=f.previousSibling;if(f===g||b.startContainer===c&&b.startOffset==c.childNodes.length)this.execCommand("insertparagraph"),d.preventDefault(e)}}});h.addListener("delkeydown",function(a,e){var b=this.selection.getRange();b.txtToElmBoundary(!0);var c=b.startContainer;if(d.isTagNode(c,"pre")&&b.collapsed&&d.isStartInblock(b)){var g=h.document.createElement("p");d.fillNode(h.document,g);c.parentNode.insertBefore(g,c);d.remove(c);b.setStart(g,
0).setCursor(!1,!0);d.preventDefault(e);return!0}})};UE.commands.cleardoc={execCommand:function(d){var a=this;d=a.options.enterTag;var e=a.selection.getRange();"br"==d?(a.body.innerHTML="<br/>",e.setStart(a.body,0).setCursor()):(a.body.innerHTML="<p>"+(H?"":"<br/>")+"</p>",e.setStart(a.body.firstChild,0).setCursor(!1,!0));setTimeout(function(){a.fireEvent("clearDoc")},0)}};UE.plugin.register("anchor",function(){return{bindEvents:{ready:function(){p.cssRule("anchor",".anchorclass{background: url('"+
this.options.themePath+this.options.theme+"/images/anchor.gif') no-repeat scroll left center transparent;border: 1px dotted #0000FF;cursor: auto;display: inline-block;height: 16px;width: 15px;}",this.document)}},outputRule:function(d){p.each(d.getNodesByTagName("img"),function(a){var e;if(e=a.getAttr("anchorname"))a.tagName="a",a.setAttr({anchorname:"",name:e,"class":""})})},inputRule:function(d){p.each(d.getNodesByTagName("a"),function(a){a.getAttr("name")&&!a.getAttr("href")&&(a.tagName="img",a.setAttr({anchorname:a.getAttr("name"),
"class":"anchorclass"}),a.setAttr("name"))})},commands:{anchor:{execCommand:function(h,a){var e=this.selection.getRange(),b=e.getClosedNode();b&&b.getAttribute("anchorname")?a?b.setAttribute("anchorname",a):(e.setStartBefore(b).setCursor(),d.remove(b)):a&&(b=this.document.createElement("img"),e.collapse(!0),d.setAttributes(b,{anchorname:a,"class":"anchorclass"}),e.insertNode(b).setStartAfter(b).setCursor(!1,!0))}}}}});UE.plugins.wordcount=function(){var h=this;h.setOpt("wordCount",!0);h.addListener("contentchange",
function(){h.fireEvent("wordcount")});var a;h.addListener("ready",function(){var e=this;d.on(e.body,"keyup",function(b){(b.keyCode||b.which)in{16:1,18:1,20:1,37:1,38:1,39:1,40:1}||(clearTimeout(a),a=setTimeout(function(){e.fireEvent("wordcount")},200))})})};UE.plugins.pagebreak=function(){function h(a){if(d.isEmptyBlock(a)){for(var b=a.firstChild,f;b&&1==b.nodeType&&d.isEmptyBlock(b);)f=b,b=b.firstChild;!f&&(f=a);d.fillNode(e.document,f)}}function a(a){return a&&1==a.nodeType&&"HR"==a.tagName&&"pagebreak"==
a.className}var e=this,b=["td"];e.setOpt("pageBreakTag","_ueditor_page_break_tag_");e.ready(function(){p.cssRule("pagebreak",".pagebreak{display:block;clear:both !important;cursor:default !important;width: 100% !important;margin:0;}",e.document)});e.addInputRule(function(a){a.traversal(function(a){if("text"==a.type&&a.data==e.options.pageBreakTag){var b=UE.uNode.createElement('<hr class="pagebreak" noshade="noshade" size="5" style="-webkit-user-select: none;">');a.parentNode.insertBefore(b,a);a.parentNode.removeChild(a)}})});
e.addOutputRule(function(a){p.each(a.getNodesByTagName("hr"),function(a){if("pagebreak"==a.getAttr("class")){var b=UE.uNode.createText(e.options.pageBreakTag);a.parentNode.insertBefore(b,a);a.parentNode.removeChild(a)}})});e.commands.pagebreak={execCommand:function(){var c=e.selection.getRange(),g=e.document.createElement("hr");d.setAttributes(g,{"class":"pagebreak",noshade:"noshade",size:"5"});d.unSelectable(g);var f=d.findParentByTagName(c.startContainer,b,!0),k=[];if(f)switch(f.tagName){case "TD":f=
f.parentNode,f.previousSibling?(f.parentNode.insertBefore(g,f),k=d.findParents(g)):(c=d.findParentByTagName(f,"table"),c.parentNode.insertBefore(g,c),k=d.findParents(g,!0)),f=k[1],g!==f&&d.breakParent(g,f),e.fireEvent("afteradjusttable",e.document)}else{if(!c.collapsed)for(c.deleteContents(),f=c.startContainer;!d.isBody(f)&&d.isBlockElm(f)&&d.isEmptyNode(f);)c.setStartBefore(f).collapse(!0),d.remove(f),f=c.startContainer;c.insertNode(g);for(f=g.parentNode;!d.isBody(f);)d.breakParent(g,f),(f=g.nextSibling)&&
d.isEmptyBlock(f)&&d.remove(f),f=g.parentNode;f=g.nextSibling;k=g.previousSibling;a(k)?d.remove(k):k&&h(k);f?(a(f)?d.remove(f):h(f),c.setEndAfter(g).collapse(!1)):(f=e.document.createElement("p"),g.parentNode.appendChild(f),d.fillNode(e.document,f),c.setStart(f,0).collapse(!0));c.select(!0)}}}};UE.plugin.register("wordimage",function(){var h=this,a=[];return{commands:{wordimage:{execCommand:function(){for(var a=d.getElementsByTagName(h.body,"img"),b=[],c=0,g;g=a[c++];)(g=g.getAttribute("word_img"))&&
b.push(g);return b},queryCommandState:function(){a=d.getElementsByTagName(h.body,"img");for(var e=0,b;b=a[e++];)if(b.getAttribute("word_img"))return 1;return-1},notNeedUndo:!0}},inputRule:function(a){p.each(a.getNodesByTagName("img"),function(a){var c=a.attrs,e=128>parseInt(c.width)||43>parseInt(c.height),d=h.options,k=d.UEDITOR_HOME_URL+"themes/default/images/spacer.gif";c.src&&/^(?:(file:\/+))/.test(c.src)&&a.setAttr({width:c.width,height:c.height,alt:c.alt,word_img:c.src,src:k,style:"background:url("+
(e?d.themePath+d.theme+"/images/word.gif":d.langPath+d.lang+"/images/localimage.png")+") no-repeat center center;border:1px solid #ddd"})})}}});UE.plugins.dragdrop=function(){var h=this;h.ready(function(){d.on(this.body,"dragend",function(){var a=h.selection.getRange(),e=a.getClosedNode()||h.selection.getStart();if(e&&"IMG"==e.tagName){for(var b=e.previousSibling,c;(c=e.nextSibling)&&1==c.nodeType&&"SPAN"==c.tagName&&!c.firstChild;)d.remove(c);(!b||1!=b.nodeType||d.isEmptyBlock(b))&&b||c&&(!c||d.isEmptyBlock(c))||
(b&&"P"==b.tagName&&!d.isEmptyBlock(b)?(b.appendChild(e),d.moveChild(c,b),d.remove(c)):c&&("P"==c.tagName&&!d.isEmptyBlock(c))&&c.insertBefore(e,c.firstChild),b&&("P"==b.tagName&&d.isEmptyBlock(b))&&d.remove(b),c&&("P"==c.tagName&&d.isEmptyBlock(c))&&d.remove(c),a.selectNode(e).select(),h.fireEvent("saveScene"))}})});h.addListener("keyup",function(a,e){if(13==(e.keyCode||e.which)){var b=h.selection.getRange(),c;(c=d.findParentByTagName(b.startContainer,"p",!0))&&"center"==d.getComputedStyle(c,"text-align")&&
d.removeStyle(c,"text-align")}})};UE.plugins.undo=function(){function h(a,b){if(a.length!=b.length)return 0;for(var c=0,e=a.length;c<e;c++)if(a[c]!=b[c])return 0;return 1}var a,e=this,b=e.options.maxUndoCount||20,c=e.options.maxInputCount||20,g=RegExp(d.fillChar+"|</hr>","gi"),f={ol:1,ul:1,table:1,tbody:1,tr:1,body:1},k=e.options.autoClearEmptyNode;e.undoManger=new function(){this.list=[];this.index=0;this.hasRedo=this.hasUndo=!1;this.undo=function(){if(this.hasUndo)if(this.list[this.index-1]||1!=
this.list.length){for(;this.list[this.index].content==this.list[this.index-1].content;)if(this.index--,0==this.index)return this.restore(0);this.restore(--this.index)}else this.reset()};this.redo=function(){if(this.hasRedo){for(;this.list[this.index].content==this.list[this.index+1].content;)if(this.index++,this.index==this.list.length-1)return this.restore(this.index);this.restore(++this.index)}};this.restore=function(){var a=this.editor,b=this.list[this.index],c=UE.htmlparser(b.content.replace(g,
""));a.options.autoClearEmptyNode=!1;a.filterInputRule(c);a.options.autoClearEmptyNode=k;a.document.body.innerHTML=c.toHtml();a.fireEvent("afterscencerestore");q.ie&&p.each(d.getElementsByTagName(a.document,"td th caption p"),function(b){d.isEmptyNode(b)&&d.fillNode(a.document,b)});try{var e=(new I.Range(a.document)).moveToAddress(b.address);e.select(f[e.startContainer.nodeName.toLowerCase()])}catch(l){}this.update();this.clearKey();a.fireEvent("reset",!0)};this.getScene=function(){var a=this.editor,
b=a.selection.getRange().createAddress(!1,!0);a.fireEvent("beforegetscene");var c=UE.htmlparser(a.body.innerHTML);a.options.autoClearEmptyNode=!1;a.filterOutputRule(c);a.options.autoClearEmptyNode=k;c=c.toHtml();a.fireEvent("aftergetscene");return{address:b,content:c}};this.save=function(c,e){clearTimeout(a);var d=this.getScene(e),f=this.list[this.index],l;if(l=f)if(l=f.content==d.content)c?f=1:(f=f.address,l=d.address,f=f.collapsed!=l.collapsed?0:h(f.startAddress,l.startAddress)&&h(f.endAddress,
l.endAddress)?1:0),l=f;l||(this.list=this.list.slice(0,this.index+1),this.list.push(d),this.list.length>b&&this.list.shift(),this.index=this.list.length-1,this.clearKey(),this.update())};this.update=function(){this.hasRedo=!!this.list[this.index+1];this.hasUndo=!!this.list[this.index-1]};this.reset=function(){this.list=[];this.index=0;this.hasRedo=this.hasUndo=!1;this.clearKey()};this.clearKey=function(){m=0}};e.undoManger.editor=e;e.addListener("saveScene",function(){var a=Array.prototype.splice.call(arguments,
1);this.undoManger.save.apply(this.undoManger,a)});e.addListener("reset",function(a,b){b||this.undoManger.reset()});e.commands.redo=e.commands.undo={execCommand:function(a){this.undoManger[a]()},queryCommandState:function(a){return this.undoManger["has"+("undo"==a.toLowerCase()?"Undo":"Redo")]?0:-1},notNeedUndo:1};var l={16:1,17:1,18:1,37:1,38:1,39:1,40:1},m=0,n=!1;e.addListener("ready",function(){d.on(this.body,"compositionstart",function(){n=!0});d.on(this.body,"compositionend",function(){n=!1})});
e.addshortcutkey({Undo:"ctrl+90",Redo:"ctrl+89"});var r=!0;e.addListener("keydown",function(b,e){var d=this;if(!(l[e.keyCode||e.which]||(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)||n))if(d.selection.getRange().collapsed){0==d.undoManger.list.length&&d.undoManger.save(!0);clearTimeout(a);var f=function(a){a.selection.getRange().collapsed&&a.fireEvent("contentchange");a.undoManger.save(!1,!0);a.fireEvent("selectionchange")};a=setTimeout(function(){if(n)var a=setInterval(function(){n||(f(d),clearInterval(a))},
300);else f(d)},200);m++;m>=c&&f(d)}else d.undoManger.save(!1,!0),r=!1});e.addListener("keyup",function(a,b){l[b.keyCode||b.which]||(b.ctrlKey||b.metaKey||b.shiftKey||b.altKey)||n||r||(this.undoManger.save(!1,!0),r=!0)});e.stopCmdUndo=function(){e.__hasEnterExecCommand=!0};e.startCmdUndo=function(){e.__hasEnterExecCommand=!1}};UE.plugins.paste=function(){function h(a){var b=this.document;if(!b.getElementById("baidu_pastebin")){var c=this.selection.getRange(),e=c.createBookmark(),g=b.createElement("div");
g.id="baidu_pastebin";q.webkit&&g.appendChild(b.createTextNode(d.fillChar+d.fillChar));b.body.appendChild(g);e.start.style.display="";g.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;left:-1000px;white-space:nowrap;top:"+d.getXY(e.start).y+"px";c.selectNodeContents(g).select(!0);setTimeout(function(){if(q.webkit)for(var h=0,t=b.querySelectorAll("#baidu_pastebin"),x;x=t[h++];)if(d.isEmptyNode(x))d.remove(x);else{g=x;break}try{g.parentNode.removeChild(g)}catch(w){}c.moveToBookmark(e).select(!0);
a(g)},0)}}function a(a){var k;if(a.firstChild){var l=d.getElementsByTagName(a,"span");k=0;for(var m;m=l[k++];)"_baidu_cut_start"!=m.id&&"_baidu_cut_end"!=m.id||d.remove(m);if(q.webkit){m=a.querySelectorAll("div br");for(k=0;l=m[k++];)l=l.parentNode,"DIV"==l.tagName&&1==l.childNodes.length&&(l.innerHTML="<p><br/></p>",d.remove(l));l=a.querySelectorAll("#baidu_pastebin");for(k=0;m=l[k++];){var n=e.document.createElement("p");for(m.parentNode.insertBefore(n,m);m.firstChild;)n.appendChild(m.firstChild);
d.remove(m)}m=a.querySelectorAll("meta");for(k=0;l=m[k++];)d.remove(l);m=a.querySelectorAll("br");for(k=0;l=m[k++];)/^apple-/i.test(l.className)&&d.remove(l)}if(q.gecko)for(m=a.querySelectorAll("[_moz_dirty]"),k=0;l=m[k++];)l.removeAttribute("_moz_dirty");if(!q.ie)for(m=a.querySelectorAll("span.Apple-style-span"),k=0;l=m[k++];)d.remove(l,!0);k=a.innerHTML;k=UE.filterWord(k);a=UE.htmlparser(k);e.options.filterRules&&UE.filterNode(a,e.options.filterRules);e.filterInputRule(a);q.webkit&&((k=a.lastChild())&&
("element"==k.type&&"br"==k.tagName)&&a.removeChild(k),p.each(e.body.querySelectorAll("div"),function(a){d.isEmptyBlock(a)&&d.remove(a,!0)}));k={html:a.toHtml()};e.fireEvent("beforepaste",k,a);k.html&&(a=UE.htmlparser(k.html,!0),1===e.queryCommandState("pasteplain")?e.execCommand("insertHtml",UE.filterNode(a,e.options.filterTxtRules).toHtml(),!0):(UE.filterNode(a,e.options.filterTxtRules),b=a.toHtml(),c=k.html,g=e.selection.getRange().createAddress(!0),e.execCommand("insertHtml",c,!0)),e.fireEvent("afterpaste",
k))}}var e=this,b,c,g;e.addListener("pasteTransfer",function(a,k){if(g&&b&&c&&b!=c){var l=e.selection.getRange();l.moveToAddress(g,!0);if(!l.collapsed){for(;!d.isBody(l.startContainer);){var m=l.startContainer;if(1==m.nodeType){m=m.childNodes[l.startOffset];if(!m){l.setStartBefore(l.startContainer);continue}(m=m.previousSibling)&&(3==m.nodeType&&RegExp("^[\n\r\t "+d.fillChar+"]*$").test(m.nodeValue))&&l.setStartBefore(m)}if(0==l.startOffset)l.setStartBefore(l.startContainer);else break}for(;!d.isBody(l.endContainer);){m=
l.endContainer;if(1==m.nodeType){m=m.childNodes[l.endOffset];if(!m){l.setEndAfter(l.endContainer);continue}(m=m.nextSibling)&&(3==m.nodeType&&RegExp("^[\n\r\t"+d.fillChar+"]*$").test(m.nodeValue))&&l.setEndAfter(m)}if(l.endOffset==l.endContainer[3==l.endContainer.nodeType?"nodeValue":"childNodes"].length)l.setEndAfter(l.endContainer);else break}}l.deleteContents();l.select(!0);e.__hasEnterExecCommand=!0;l=c;2===k?l=l.replace(/<(\/?)([\w\-]+)([^>]*)>/gi,function(a,b,c,e){c=c.toLowerCase();if({img:1}[c])return a;
e=e.replace(/([\w\-]*?)\s*=\s*(("([^"]*)")|('([^']*)')|([^\s>]+))/gi,function(a,b,c){return{src:1,href:1,name:1}[b.toLowerCase()]?b+"="+c+" ":""});return{span:1,div:1}[c]?"":"<"+b+c+" "+p.trim(e)+">"}):k&&(l=b);e.execCommand("inserthtml",l,!0);e.__hasEnterExecCommand=!1;for(l=e.selection.getRange();!d.isBody(l.startContainer)&&!l.startOffset&&l.startContainer[3==l.startContainer.nodeType?"nodeValue":"childNodes"].length;)l.setStartBefore(l.startContainer);l=l.createAddress(!0);g.endAddress=l.startAddress}});
e.addListener("ready",function(){d.on(e.body,"cut",function(){!e.selection.getRange().collapsed&&e.undoManger&&e.undoManger.save()});d.on(e.body,q.ie||q.opera?"keydown":"paste",function(b){(!q.ie&&!q.opera||(b.ctrlKey||b.metaKey)&&"86"==b.keyCode)&&h.call(e,function(b){a(b)})})})};UE.plugins.list=function(){function h(a){var b=[],c;for(c in a)b.push(c);return b}function a(a){var b=a.className;return d.hasClass(a,/custom_/)?b.match(/custom_(\w+)/)[1]:d.getStyle(a,"list-style-type")}function e(e,f){p.each(d.getElementsByTagName(e,
"ol ul"),function(l){if(d.inDoc(l,e)){var g=l.parentNode;if(g.tagName==l.tagName){var k=a(l)||("OL"==l.tagName?"decimal":"disc"),h=a(g)||("OL"==g.tagName?"decimal":"disc");k==h&&(k=p.indexOf(n[l.tagName],k),k=k+1==n[l.tagName].length?0:k+1,c(l,n[l.tagName][k]))}var r=0,k=2;d.hasClass(l,/custom_/)?/[ou]l/i.test(g.tagName)&&d.hasClass(g,/custom_/)||(k=1):/[ou]l/i.test(g.tagName)&&d.hasClass(g,/custom_/)&&(k=3);(g=d.getStyle(l,"list-style-type"))&&(l.style.cssText="list-style-type:"+g);l.className=p.trim(l.className.replace(/list-paddingleft-\w+/,
""))+" list-paddingleft-"+k;p.each(d.getElementsByTagName(l,"li"),function(b){b.style.cssText&&(b.style.cssText="");if(!b.firstChild)d.remove(b);else if(b.parentNode===l){r++;if(d.hasClass(l,/custom_/)){var c=1,e=a(l);if("OL"==l.tagName){if(e)switch(e){case "cn":case "cn1":case "cn2":10<r&&(0==r%10||10<r&&20>r)?c=2:20<r&&(c=3);break;case "num2":9<r&&(c=2)}b.className="list-"+m[e]+r+" list-"+e+"-paddingleft-"+c}else b.className="list-"+m[e]+" list-"+e+"-paddingleft"}else b.className=b.className.replace(/list-[\w\-]+/gi,
"");c=b.getAttribute("class");null===c||c.replace(/\s/g,"")||d.removeAttributes(b,"class")}});!f&&b(l,l.tagName.toLowerCase(),a(l)||d.getStyle(l,"list-style-type"),!0)}})}function b(b,c,f,l){var g=b.nextSibling;g&&(1==g.nodeType&&g.tagName.toLowerCase()==c&&(a(g)||d.getStyle(g,"list-style-type")||("ol"==c?"decimal":"disc"))==f)&&(d.moveChild(g,b),0==g.childNodes.length&&d.remove(g));g&&d.isFillChar(g)&&d.remove(g);(g=b.previousSibling)&&(1==g.nodeType&&g.tagName.toLowerCase()==c&&(a(g)||d.getStyle(g,
"list-style-type")||("ol"==c?"decimal":"disc"))==f)&&d.moveChild(b,g);g&&d.isFillChar(g)&&d.remove(g);!l&&d.isEmptyBlock(b)&&d.remove(b);a(b)&&e(b.ownerDocument,!0)}function c(a,b){m[b]&&(a.className="custom_"+b);try{d.setStyle(a,"list-style-type",b)}catch(c){}}function g(a){var b=a.previousSibling;b&&d.isEmptyBlock(b)&&d.remove(b);(b=a.nextSibling)&&d.isEmptyBlock(b)&&d.remove(b)}function f(a){for(;a&&!d.isBody(a);){if("TABLE"==a.nodeName)return null;if("LI"==a.nodeName)return a;a=a.parentNode}}
var k=this,l={TD:1,PRE:1,BLOCKQUOTE:1},m={cn:"cn-1-",cn1:"cn-2-",cn2:"cn-3-",num:"num-1-",num1:"num-2-",num2:"num-3-",dash:"dash",dot:"dot"};k.setOpt({autoTransWordToList:!1,insertorderedlist:{num:"",num1:"",num2:"",cn:"",cn1:"",cn2:"",decimal:"","lower-alpha":"","lower-roman":"","upper-alpha":"","upper-roman":""},insertunorderedlist:{circle:"",disc:"",square:"",dash:"",dot:""},listDefaultPaddingLeft:"30",listiconpath:"http://bs.baidu.com/listicon/",maxListLevel:-1});var n={OL:h(k.options.insertorderedlist),
UL:h(k.options.insertunorderedlist)},r=k.options.listiconpath,t;for(t in m)k.options.insertorderedlist.hasOwnProperty(t)||k.options.insertunorderedlist.hasOwnProperty(t)||delete m[t];k.ready(function(){var a=[],b;for(b in m){if("dash"==b||"dot"==b)a.push("li.list-"+m[b]+"{background-image:url("+r+m[b]+".gif)}"),a.push("ul.custom_"+b+"{list-style:none;}ul.custom_"+b+" li{background-position:0 3px;background-repeat:no-repeat}");else{for(var c=0;99>c;c++)a.push("li.list-"+m[b]+c+"{background-image:url("+
r+"list-"+m[b]+c+".gif)}");a.push("ol.custom_"+b+"{list-style:none;}ol.custom_"+b+" li{background-position:0 3px;background-repeat:no-repeat}")}switch(b){case "cn":a.push("li.list-"+b+"-paddingleft-1{padding-left:25px}");a.push("li.list-"+b+"-paddingleft-2{padding-left:40px}");a.push("li.list-"+b+"-paddingleft-3{padding-left:55px}");break;case "cn1":a.push("li.list-"+b+"-paddingleft-1{padding-left:30px}");a.push("li.list-"+b+"-paddingleft-2{padding-left:40px}");a.push("li.list-"+b+"-paddingleft-3{padding-left:55px}");
break;case "cn2":a.push("li.list-"+b+"-paddingleft-1{padding-left:40px}");a.push("li.list-"+b+"-paddingleft-2{padding-left:55px}");a.push("li.list-"+b+"-paddingleft-3{padding-left:68px}");break;case "num":case "num1":a.push("li.list-"+b+"-paddingleft-1{padding-left:25px}");break;case "num2":a.push("li.list-"+b+"-paddingleft-1{padding-left:35px}");a.push("li.list-"+b+"-paddingleft-2{padding-left:40px}");break;case "dash":a.push("li.list-"+b+"-paddingleft{padding-left:35px}");break;case "dot":a.push("li.list-"+
b+"-paddingleft{padding-left:20px}")}}a.push(".list-paddingleft-1{padding-left:0}");a.push(".list-paddingleft-2{padding-left:"+k.options.listDefaultPaddingLeft+"px}");a.push(".list-paddingleft-3{padding-left:"+2*k.options.listDefaultPaddingLeft+"px}");p.cssRule("list","ol,ul{margin:0;pading:0;"+(q.ie?"":"width:95%")+"}li{clear:both;}"+a.join("\n"),k.document)});k.ready(function(){d.on(k.body,"cut",function(){setTimeout(function(){var a=k.selection.getRange(),b;if(!a.collapsed&&(b=d.findParentByTagName(a.startContainer,
"li",!0))&&!b.nextSibling&&d.isEmptyBlock(b)){b=b.parentNode;var c;(c=b.previousSibling)?(d.remove(b),a.setStartAtLast(c).collapse(!0)):(c=b.nextSibling)?(d.remove(b),a.setStartAtFirst(c).collapse(!0)):(c=k.document.createElement("p"),d.fillNode(k.document,c),b.parentNode.insertBefore(c,b),d.remove(b),a.setStart(c,0).collapse(!0));a.select(!0)}})})});k.addListener("beforepaste",function(b,c){var e=this.selection.getRange(),f=UE.htmlparser(c.html,!0);if(e=d.findParentByTagName(e.startContainer,"li",
!0)){var g=e.parentNode;p.each(f.getNodesByTagName("OL"==g.tagName?"ul":"ol"),function(c){c.tagName=g.tagName;c.setAttr();if(c.parentNode===f)b=a(g)||("OL"==g.tagName?"decimal":"disc");else{var e=c.parentNode.getAttr("class");(b=e&&/custom_/.test(e)?e.match(/custom_(\w+)/)[1]:c.parentNode.getStyle("list-style-type"))||(b="OL"==g.tagName?"decimal":"disc")}e=p.indexOf(n[g.tagName],b);c.parentNode!==f&&(e=e+1==n[g.tagName].length?0:e+1);e=n[g.tagName][e];m[e]?c.setAttr("class","custom_"+e):c.setStyle("list-style-type",
e)})}c.html=f.toHtml()});k.addInputRule(function(a){p.each(a.getNodesByTagName("li"),function(a){for(var b=UE.uNode.createElement("p"),c=0,e;e=a.children[c];)"text"==e.type||v.p[e.tagName]?b.appendChild(e):b.firstChild()?(a.insertBefore(b,e),b=UE.uNode.createElement("p"),c+=2):c++;(b.firstChild()&&!b.parentNode||!a.firstChild())&&a.appendChild(b);b.firstChild()||b.innerHTML(q.ie?"&nbsp;":"<br/>");a=a.firstChild();(b=a.lastChild())&&("text"==b.type&&/^\s*$/.test(b.data))&&a.removeChild(b)});if(k.options.autoTransWordToList){var b=
{num1:/^\d+\)/,decimal:/^\d+\./,"lower-alpha":/^[a-z]+\)/,"upper-alpha":/^[A-Z]+\./,cn:/^[\u4E00\u4E8C\u4E09\u56DB\u516d\u4e94\u4e03\u516b\u4e5d]+[\u3001]/,cn2:/^\([\u4E00\u4E8C\u4E09\u56DB\u516d\u4e94\u4e03\u516b\u4e5d]+\)/},c={square:"n"},e=function(a,e){var d=e.firstChild();if(d&&"element"==d.type&&"span"==d.tagName&&/Wingdings|Symbol/.test(d.getStyle("font-family"))){for(var f in c)if(c[f]==d.data)return f;return"disc"}for(f in b)if(b[f].test(a))return f};p.each(a.getNodesByTagName("p"),function(a){if("MsoListParagraph"==
a.getAttr("class")){a.setStyle("margin","");a.setStyle("margin-left","");a.setAttr("class","");var c=a,d,f=a;if("li"!=a.parentNode.tagName&&(d=e(a.innerText(),a))){var g=UE.uNode.createElement(k.options.insertorderedlist.hasOwnProperty(d)?"ol":"ul");for(m[d]?g.setAttr("class","custom_"+d):g.setStyle("list-style-type",d);a&&"li"!=a.parentNode.tagName&&e(a.innerText(),a);){(c=a.nextSibling())||a.parentNode.insertBefore(g,a);var l=g,n=d;if("ol"==l.tagName)if(q.ie){var h=a.firstChild();"element"==h.type&&
("span"==h.tagName&&b[n].test(h.innerText()))&&a.removeChild(h)}else a.innerHTML(a.innerHTML().replace(b[n],""));else a.removeChild(a.firstChild());n=UE.uNode.createElement("li");n.appendChild(a);l.appendChild(n);a=c}!g.parentNode&&(a&&a.parentNode)&&a.parentNode.insertBefore(g,a)}(c=f.firstChild())&&("element"==c.type&&"span"==c.tagName&&/^\s*(&nbsp;)+\s*$/.test(c.innerText()))&&c.parentNode.removeChild(c)}})}});k.addListener("contentchange",function(){e(k.document)});k.addListener("keydown",function(a,
b){function c(){b.preventDefault?b.preventDefault():b.returnValue=!1;k.fireEvent("contentchange");k.undoManger&&k.undoManger.save()}function e(a,b){for(;a&&!d.isBody(a)&&!b(a);){if(1==a.nodeType&&/[ou]l/i.test(a.tagName))return a;a=a.parentNode}return null}var f=b.keyCode||b.which;if(13==f&&!b.shiftKey){var l=k.selection.getRange(),n=d.findParent(l.startContainer,function(a){return d.isBlockElm(a)},!0),m=d.findParentByTagName(l.startContainer,"li",!0);n&&("PRE"!=n.tagName&&!m)&&(m=n.innerHTML.replace(RegExp(d.fillChar,
"g"),""),/^\s*1\s*\.[^\d]/.test(m)&&(n.innerHTML=m.replace(/^\s*1\s*\./,""),l.setStartAtLast(n).collapse(!0).select(),k.__hasEnterExecCommand=!0,k.execCommand("insertorderedlist"),k.__hasEnterExecCommand=!1));l=k.selection.getRange();n=e(l.startContainer,function(a){return"TABLE"==a.tagName});m=l.collapsed?n:e(l.endContainer,function(a){return"TABLE"==a.tagName});if(n&&m&&n===m){if(!l.collapsed)if(n=d.findParentByTagName(l.startContainer,"li",!0),m=d.findParentByTagName(l.endContainer,"li",!0),n&&
m&&n===m){if(l.deleteContents(),(m=d.findParentByTagName(l.startContainer,"li",!0))&&d.isEmptyBlock(m)){t=m.previousSibling;next=m.nextSibling;n=k.document.createElement("p");d.fillNode(k.document,n);r=m.parentNode;t&&next?(l.setStart(next,0).collapse(!0).select(!0),d.remove(m)):((t||next)&&t?m.parentNode.parentNode.insertBefore(n,r.nextSibling):r.parentNode.insertBefore(n,r),d.remove(m),r.firstChild||d.remove(r),l.setStart(n,0).setCursor());c();return}}else{var n=l.cloneRange(),h=n.collapse(!1).createBookmark();
l.deleteContents();n.moveToBookmark(h);m=d.findParentByTagName(n.startContainer,"li",!0);g(m);n.select();c();return}if(m=d.findParentByTagName(l.startContainer,"li",!0)){if(d.isEmptyBlock(m)){var h=l.createBookmark(),r=m.parentNode;m!==r.lastChild?(d.breakParent(m,r),g(m)):(r.parentNode.insertBefore(m,r.nextSibling),d.isEmptyNode(r)&&d.remove(r));if(!v.$list[m.parentNode.tagName])if(d.isBlockElm(m.firstChild))d.remove(m,!0);else{n=k.document.createElement("p");for(m.parentNode.insertBefore(n,m);m.firstChild;)n.appendChild(m.firstChild);
d.remove(m)}l.moveToBookmark(h).select()}else{n=m.firstChild;if(!n||!d.isBlockElm(n)){n=k.document.createElement("p");for(!m.firstChild&&d.fillNode(k.document,n);m.firstChild;)n.appendChild(m.firstChild);m.appendChild(n)}h=k.document.createElement("span");l.insertNode(h);d.breakParent(h,m);t=h.nextSibling;n=t.firstChild;n||(n=k.document.createElement("p"),d.fillNode(k.document,n),t.appendChild(n));d.isEmptyNode(n)&&(n.innerHTML="",d.fillNode(k.document,n));l.setStart(n,0).collapse(!0).shrinkBoundary().select();
d.remove(h);var t=t.previousSibling;t&&d.isEmptyBlock(t)&&(t.innerHTML="<p></p>",d.fillNode(k.document,t.firstChild))}c()}}}if(8==f&&(l=k.selection.getRange(),l.collapsed&&d.isStartInblock(l)&&(n=l.cloneRange().trimBoundary(),(m=d.findParentByTagName(l.startContainer,"li",!0))&&d.isStartInblock(n))))if((n=d.findParentByTagName(l.startContainer,"p",!0))&&n!==m.firstChild)r=d.findParentByTagName(n,["ol","ul"]),d.breakParent(n,r),g(n),k.fireEvent("contentchange"),l.setStart(n,0).setCursor(!1,!0),k.fireEvent("saveScene"),
d.preventDefault(b);else if(m&&(t=m.previousSibling)){if(46!=f||!m.childNodes.length){v.$list[t.tagName]&&(t=t.lastChild);k.undoManger&&k.undoManger.save();n=m.firstChild;if(d.isBlockElm(n))if(d.isEmptyNode(n))for(t.appendChild(n),l.setStart(n,0).setCursor(!1,!0);m.firstChild;)t.appendChild(m.firstChild);else h=k.document.createElement("span"),l.insertNode(h),d.isEmptyBlock(t)&&(t.innerHTML=""),d.moveChild(m,t),l.setStartBefore(h).collapse(!0).select(!0),d.remove(h);else if(d.isEmptyNode(m))n=k.document.createElement("p"),
t.appendChild(n),l.setStart(n,0).setCursor();else for(l.setEnd(t,t.childNodes.length).collapse().select(!0);m.firstChild;)t.appendChild(m.firstChild);d.remove(m);k.fireEvent("contentchange");k.fireEvent("saveScene");d.preventDefault(b)}}else if(m&&!m.previousSibling){r=m.parentNode;h=l.createBookmark();if(d.isTagNode(r.parentNode,"ol ul"))r.parentNode.insertBefore(m,r);else{for(;m.firstChild;)r.parentNode.insertBefore(m.firstChild,r);d.remove(m)}d.isEmptyNode(r)&&d.remove(r);l.moveToBookmark(h).setCursor(!1,
!0);k.fireEvent("contentchange");k.fireEvent("saveScene");d.preventDefault(b)}});k.addListener("keyup",function(c,e){if(8==(e.keyCode||e.which)){var f=k.selection.getRange(),l;(l=d.findParentByTagName(f.startContainer,["ol","ul"],!0))&&b(l,l.tagName.toLowerCase(),a(l)||d.getComputedStyle(l,"list-style-type"),!0)}});k.addListener("tabkeydown",function(){function e(a){if(-1!=k.options.maxListLevel){a=a.parentNode;for(var b=0;/[ou]l/i.test(a.tagName);)b++,a=a.parentNode;if(b>=k.options.maxListLevel)return!0}}
var f=k.selection.getRange(),l=d.findParentByTagName(f.startContainer,"li",!0);if(l){var g;if(f.collapsed){if(e(l))return!0;var m=l.parentNode,h=k.document.createElement(m.tagName),r=p.indexOf(n[h.tagName],a(m)||d.getComputedStyle(m,"list-style-type")),r=r+1==n[h.tagName].length?0:r+1,r=n[h.tagName][r];c(h,r);if(d.isStartInblock(f))return k.fireEvent("saveScene"),g=f.createBookmark(),m.insertBefore(h,l),h.appendChild(l),b(h,h.tagName.toLowerCase(),r),k.fireEvent("contentchange"),f.moveToBookmark(g).select(!0),
!0}else{k.fireEvent("saveScene");g=f.createBookmark();for(var m=0,t,h=d.findParents(l),q;q=h[m++];)if(d.isTagNode(q,"ol ul")){t=q;break}q=l;if(g.end)for(;q&&!(d.getPosition(q,g.end)&d.POSITION_FOLLOWING);)if(e(q))q=d.getNextDomNode(q,!1,null,function(a){return a!==t});else{m=q.parentNode;h=k.document.createElement(m.tagName);r=p.indexOf(n[h.tagName],a(m)||d.getComputedStyle(m,"list-style-type"));r=n[h.tagName][r+1==n[h.tagName].length?0:r+1];c(h,r);for(m.insertBefore(h,q);q&&!(d.getPosition(q,g.end)&
d.POSITION_FOLLOWING);){l=q.nextSibling;h.appendChild(q);if(!l||d.isTagNode(l,"ol ul")){if(l)for(;(l=l.firstChild)&&"LI"!=l.tagName;);else l=d.getNextDomNode(q,!1,null,function(a){return a!==t});break}q=l}b(h,h.tagName.toLowerCase(),r);q=l}k.fireEvent("contentchange");f.moveToBookmark(g).select();return!0}}});k.commands.insertorderedlist=k.commands.insertunorderedlist={execCommand:function(e,g){g||(g="insertorderedlist"==e.toLowerCase()?"decimal":"disc");var k=this.selection.getRange(),n=function(a){return 1==
a.nodeType?"br"!=a.tagName.toLowerCase():!d.isWhitespace(a)},m="insertorderedlist"==e.toLowerCase()?"ol":"ul",h=this.document.createDocumentFragment();k.adjustmentBoundary().shrinkBoundary();var r=k.createBookmark(!0),t=f(this.document.getElementById(r.start)),p=0,q=f(this.document.getElementById(r.end)),s=0,z,E,B,A;if(t||q){t&&(z=t.parentNode);r.end||(q=t);q&&(E=q.parentNode);if(z===E){for(;t!==q;){A=t;t=t.nextSibling;if(!d.isBlockElm(A.firstChild)){for(n=this.document.createElement("p");A.firstChild;)n.appendChild(A.firstChild);
A.appendChild(n)}h.appendChild(A)}A=this.document.createElement("span");z.insertBefore(A,q);if(!d.isBlockElm(q.firstChild)){for(n=this.document.createElement("p");q.firstChild;)n.appendChild(q.firstChild);q.appendChild(n)}h.appendChild(q);d.breakParent(A,z);d.isEmptyNode(A.previousSibling)&&d.remove(A.previousSibling);d.isEmptyNode(A.nextSibling)&&d.remove(A.nextSibling);n=a(z)||d.getComputedStyle(z,"list-style-type")||("insertorderedlist"==e.toLowerCase()?"decimal":"disc");if(z.tagName.toLowerCase()==
m&&n==g){q=0;for(q=this.document.createDocumentFragment();n=h.firstChild;)if(d.isTagNode(n,"ol ul"))q.appendChild(n);else for(;n.firstChild;)q.appendChild(n.firstChild),d.remove(n);A.parentNode.insertBefore(q,A)}else B=this.document.createElement(m),c(B,g),B.appendChild(h),A.parentNode.insertBefore(B,A);d.remove(A);B&&b(B,m,g);k.moveToBookmark(r).select();return}if(t){for(;t;){A=t.nextSibling;if(d.isTagNode(t,"ol ul"))h.appendChild(t);else{B=this.document.createDocumentFragment();for(var N=0;t.firstChild;)d.isBlockElm(t.firstChild)&&
(N=1),B.appendChild(t.firstChild);N?h.appendChild(B):(N=this.document.createElement("p"),N.appendChild(B),h.appendChild(N));d.remove(t)}t=A}z.parentNode.insertBefore(h,z.nextSibling);d.isEmptyNode(z)?(k.setStartBefore(z),d.remove(z)):k.setStartAfter(z);p=1}if(q&&d.inDoc(E,this.document)){for(t=E.firstChild;t&&t!==q;){A=t.nextSibling;if(d.isTagNode(t,"ol ul"))h.appendChild(t);else{B=this.document.createDocumentFragment();for(N=0;t.firstChild;)d.isBlockElm(t.firstChild)&&(N=1),B.appendChild(t.firstChild);
N?h.appendChild(B):(N=this.document.createElement("p"),N.appendChild(B),h.appendChild(N));d.remove(t)}t=A}A=d.createElement(this.document,"div",{tmpDiv:1});d.moveChild(q,A);h.appendChild(A);d.remove(q);E.parentNode.insertBefore(h,E);k.setEndBefore(E);d.isEmptyNode(E)&&d.remove(E);s=1}}p||k.setStartBefore(this.document.getElementById(r.start));r.end&&!s&&k.setEndAfter(this.document.getElementById(r.end));k.enlarge(!0,function(a){return l[a.tagName]});h=this.document.createDocumentFragment();q=k.createBookmark();
z=d.getNextDomNode(q.start,!1,n);B=k.cloneRange();for(p=d.isBlockElm;z&&z!==q.end&&d.getPosition(z,q.end)&d.POSITION_PRECEDING;)if(3==z.nodeType||v.li[z.tagName])if(1==z.nodeType&&v.$list[z.tagName]){for(;z.firstChild;)h.appendChild(z.firstChild);t=d.getNextDomNode(z,!1,n);d.remove(z);z=t}else{t=z;for(B.setStartBefore(z);z&&z!==q.end&&(!p(z)||d.isBookmarkNode(z));)t=z,z=d.getNextDomNode(z,!1,null,function(a){return!l[a.tagName]});z&&p(z)&&(A=d.getNextDomNode(t,!1,n))&&d.isBookmarkNode(A)&&(z=d.getNextDomNode(A,
!1,n),t=A);B.setEndAfter(t);z=d.getNextDomNode(t,!1,n);A=k.document.createElement("li");A.appendChild(B.extractContents());if(d.isEmptyNode(A)){for(t=k.document.createElement("p");A.firstChild;)t.appendChild(A.firstChild);A.appendChild(t)}h.appendChild(A)}else z=d.getNextDomNode(z,!0,n);k.moveToBookmark(q).collapse(!0);B=this.document.createElement(m);c(B,g);B.appendChild(h);k.insertNode(B);b(B,m,g);q=0;for(m=d.getElementsByTagName(B,"div");n=m[q++];)n.getAttribute("tmpDiv")&&d.remove(n,!0);k.moveToBookmark(r).select()},
queryCommandState:function(a){a="insertorderedlist"==a.toLowerCase()?"ol":"ul";for(var b=this.selection.getStartElementPath(),c=0,e;(e=b[c++])&&"TABLE"!=e.nodeName;)if(a==e.nodeName.toLowerCase())return 1;return 0},queryCommandValue:function(b){b="insertorderedlist"==b.toLowerCase()?"ol":"ul";for(var c=this.selection.getStartElementPath(),e,f=0,l;l=c[f++];){if("TABLE"==l.nodeName){e=null;break}if(b==l.nodeName.toLowerCase()){e=l;break}}return e?a(e)||d.getComputedStyle(e,"list-style-type"):null}}};
(function(){var h={textarea:function(a,e){var b=e.ownerDocument.createElement("textarea");b.style.cssText="position:absolute;resize:none;width:100%;height:100%;border:0;padding:0;margin:0;overflow-y:auto;";q.ie&&8>q.version&&(b.style.width=e.offsetWidth+"px",b.style.height=e.offsetHeight+"px",e.onresize=function(){b.style.width=e.offsetWidth+"px";b.style.height=e.offsetHeight+"px"});e.appendChild(b);return{setContent:function(a){b.value=a},getContent:function(){return b.value},select:function(){var a;
q.ie?(a=b.createTextRange(),a.collapse(!0),a.select()):(b.setSelectionRange(0,0),b.focus())},dispose:function(){e.removeChild(b);e=b=e.onresize=null}}},codemirror:function(a,e){var b=window.CodeMirror(e,{mode:"text/html",tabMode:"indent",lineNumbers:!0,lineWrapping:!0}),c=b.getWrapperElement();c.style.cssText='position:absolute;left:0;top:0;width:100%;height:100%;font-family:consolas,"Courier new",monospace;font-size:13px;';b.getScrollerElement().style.cssText="position:absolute;left:0;top:0;width:100%;height:100%;";
b.refresh();return{getCodeMirror:function(){return b},setContent:function(a){b.setValue(a)},getContent:function(){return b.getValue()},select:function(){b.focus()},dispose:function(){e.removeChild(c);b=c=null}}}};UE.plugins.source=function(){var a=this,e=this.options,b=!1,c,g;e.sourceEditor=q.ie?"textarea":e.sourceEditor||"codemirror";a.setOpt({sourceEditorFirst:!1});var f,k,l;a.commands.source={execCommand:function(){if(b=!b){l=a.selection.getRange().createAddress(!1,!0);a.undoManger&&a.undoManger.save(!0);
q.gecko&&(a.body.contentEditable=!1);f=a.iframe.style.cssText;a.iframe.style.cssText+="position:absolute;left:-32768px;top:-32768px;";a.fireEvent("beforegetcontent");var n=UE.htmlparser(a.body.innerHTML);a.filterOutputRule(n);n.traversal(function(a){if("element"==a.type)switch(a.tagName){case "td":case "th":case "caption":a.children&&1==a.children.length&&"br"==a.firstChild().tagName&&a.removeChild(a.firstChild());break;case "pre":a.innerText(a.innerText().replace(/&nbsp;/g," "))}});a.fireEvent("aftergetcontent");
n=n.toHtml(!0);c=h["codemirror"==e.sourceEditor&&window.CodeMirror?"codemirror":"textarea"](a,a.iframe.parentNode);c.setContent(n);g=a.setContent;a.setContent=function(b){b=UE.htmlparser(b);a.filterInputRule(b);b=b.toHtml();c.setContent(b)};setTimeout(function(){c.select();a.addListener("fullscreenchanged",function(){try{c.getCodeMirror().refresh()}catch(a){}})});k=a.getContent;a.getContent=function(){return c.getContent()||"<p>"+(q.ie?"":"<br/>")+"</p>"}}else if(a.iframe.style.cssText=f,n=c.getContent()||
"<p>"+(q.ie?"":"<br/>")+"</p>",n=n.replace(RegExp("[\\r\\t\\n ]*</?(\\w+)\\s*(?:[^>]*)>","g"),function(a,b){return b&&!v.$inlineWithA[b.toLowerCase()]?a.replace(/(^[\n\r\t ]*)|([\n\r\t ]*$)/g,""):a.replace(/(^[\n\r\t]*)|([\n\r\t]*$)/g,"")}),a.setContent=g,a.setContent(n),c.dispose(),c=null,a.getContent=k,n=a.body.firstChild,n||(a.body.innerHTML="<p>"+(q.ie?"":"<br/>")+"</p>",n=a.body.firstChild),a.undoManger&&a.undoManger.save(!0),q.gecko){var m=document.createElement("input");m.style.cssText="position:absolute;left:0;top:-32768px";
document.body.appendChild(m);a.body.contentEditable=!1;setTimeout(function(){d.setViewportOffset(m,{left:-32768,top:0});m.focus();setTimeout(function(){a.body.contentEditable=!0;a.selection.getRange().moveToAddress(l).select(!0);d.remove(m)})})}else try{a.selection.getRange().moveToAddress(l).select(!0)}catch(t){}this.fireEvent("sourcemodechanged",b)},queryCommandState:function(){return b|0},notNeedUndo:1};var m=a.queryCommandState;a.queryCommandState=function(a){a=a.toLowerCase();return b?a in{source:1,
fullscreen:1}?1:-1:m.apply(this,arguments)};"codemirror"==e.sourceEditor&&a.addListener("ready",function(){p.loadFile(document,{src:e.codeMirrorJsUrl||e.UEDITOR_HOME_URL+"third-party/codemirror/codemirror.js",tag:"script",type:"text/javascript",defer:"defer"},function(){e.sourceEditorFirst&&setTimeout(function(){a.execCommand("source")},0)});p.loadFile(document,{tag:"link",rel:"stylesheet",type:"text/css",href:e.codeMirrorCssUrl||e.UEDITOR_HOME_URL+"third-party/codemirror/codemirror.css"})})}})();
UE.plugins.enterkey=function(){var h,a=this,e=a.options.enterTag;a.addListener("keyup",function(b,c){if(13==(c.keyCode||c.which)){var e=a.selection.getRange(),f=e.startContainer,k;if(q.ie)a.fireEvent("saveScene",!0,!0);else{if(/h\d/i.test(h)){if(q.gecko)d.findParentByTagName(f,"h1 h2 h3 h4 h5 h6 blockquote caption table".split(" "),!0)||(a.document.execCommand("formatBlock",!1,"<p>"),k=1);else if(1==f.nodeType){var f=a.document.createTextNode(""),l;e.insertNode(f);if(l=d.findParentByTagName(f,"div",
!0)){for(k=a.document.createElement("p");l.firstChild;)k.appendChild(l.firstChild);l.parentNode.insertBefore(k,l);d.remove(l);e.setStartBefore(f).setCursor();k=1}d.remove(f)}a.undoManger&&k&&a.undoManger.save()}q.opera&&e.select()}}});a.addListener("keydown",function(b,c){if(13==(c.keyCode||c.which))if(a.fireEvent("beforeenterkeydown"))d.preventDefault(c);else{a.fireEvent("saveScene",!0,!0);h="";var g=a.selection.getRange();if(!g.collapsed){var f=g.startContainer,k=g.endContainer,f=d.findParentByTagName(f,
"td",!0),k=d.findParentByTagName(k,"td",!0);if(f&&k&&f!==k||!f&&k||f&&!k){c.preventDefault?c.preventDefault():c.returnValue=!1;return}}if("p"==e)q.ie||((f=d.findParentByTagName(g.startContainer,"ol ul p h1 h2 h3 h4 h5 h6 blockquote caption".split(" "),!0))||q.opera?(h=f.tagName,"p"==f.tagName.toLowerCase()&&q.gecko&&d.removeDirtyAttr(f)):(a.document.execCommand("formatBlock",!1,"<p>"),q.gecko&&(g=a.selection.getRange(),(f=d.findParentByTagName(g.startContainer,"p",!0))&&d.removeDirtyAttr(f))));else if(c.preventDefault?
c.preventDefault():c.returnValue=!1,g.collapsed)k=g.document.createElement("br"),g.insertNode(k),k.parentNode.lastChild===k?(k.parentNode.insertBefore(k.cloneNode(!0),k),g.setStartBefore(k)):g.setStartAfter(k),g.setCursor();else if(g.deleteContents(),f=g.startContainer,1==f.nodeType&&(f=f.childNodes[g.startOffset])){for(;1==f.nodeType;){if(v.$empty[f.tagName])return g.setStartBefore(f).setCursor(),a.undoManger&&a.undoManger.save(),!1;if(!f.firstChild)return k=g.document.createElement("br"),f.appendChild(k),
g.setStart(f,0).setCursor(),a.undoManger&&a.undoManger.save(),!1;f=f.firstChild}f===g.startContainer.childNodes[g.startOffset]?(k=g.document.createElement("br"),g.insertNode(k).setCursor()):g.setStart(f,0).setCursor()}else k=g.document.createElement("br"),g.insertNode(k).setStartAfter(k).setCursor()}})};UE.plugins.keystrokes=function(){var h=this,a=!0;h.addListener("keydown",function(e,b){var c=b.keyCode||b.which,g=h.selection.getRange();if(!g.collapsed&&!(b.ctrlKey||b.shiftKey||b.altKey||b.metaKey)&&
(65<=c&&90>=c||48<=c&&57>=c||96<=c&&111>=c||{13:1,8:1,46:1}[c])){var f=g.startContainer;d.isFillChar(f)&&g.setStartBefore(f);f=g.endContainer;d.isFillChar(f)&&g.setEndAfter(f);g.txtToElmBoundary();g.endContainer&&1==g.endContainer.nodeType&&(f=g.endContainer.childNodes[g.endOffset])&&d.isBr(f)&&g.setEndAfter(f);if(0==g.startOffset&&(f=g.startContainer,d.isBoundaryNode(f,"firstChild")&&(f=g.endContainer,g.endOffset==(3==f.nodeType?f.nodeValue.length:f.childNodes.length)&&d.isBoundaryNode(f,"lastChild")))){h.fireEvent("saveScene");
h.body.innerHTML="<p>"+(q.ie?"":"<br/>")+"</p>";g.setStart(h.body.firstChild,0).setCursor(!1,!0);h._selectionChange();return}}if(8==c){g=h.selection.getRange();a=g.collapsed;if(h.fireEvent("delkeydown",b))return;var k,l;g.collapsed&&g.inFillChar()&&(k=g.startContainer,d.isFillChar(k)?(g.setStartBefore(k).shrinkBoundary(!0).collapse(!0),d.remove(k)):(k.nodeValue=k.nodeValue.replace(RegExp("^"+d.fillChar),""),g.startOffset--,g.collapse(!0).select(!0)));if(k=g.getClosedNode()){h.fireEvent("saveScene");
g.setStartBefore(k);d.remove(k);g.setCursor();h.fireEvent("saveScene");d.preventDefault(b);return}if(!q.ie&&(k=d.findParentByTagName(g.startContainer,"table",!0),l=d.findParentByTagName(g.endContainer,"table",!0),k&&!l||!k&&l||k!==l)){b.preventDefault();return}}if(9==c){var m={ol:1,ul:1,table:1};if(h.fireEvent("tabkeydown",b)){d.preventDefault(b);return}g=h.selection.getRange();h.fireEvent("saveScene");var f=0,n="";k=h.options.tabSize||4;for(l=h.options.tabNode||"&nbsp;";f<k;f++)n+=l;f=h.document.createElement("span");
f.innerHTML=n+d.fillChar;if(g.collapsed)g.insertNode(f.cloneNode(!0).firstChild).setCursor(!0);else if(n=function(a){return d.isBlockElm(a)&&!m[a.tagName.toLowerCase()]},k=d.findParent(g.startContainer,n,!0),l=d.findParent(g.endContainer,n,!0),k&&l&&k===l)g.deleteContents(),g.insertNode(f.cloneNode(!0).firstChild).setCursor(!0);else{k=g.createBookmark();g.enlarge(!0);l=g.createBookmark();for(var r=d.getNextDomNode(l.start,!1,n);r&&!(d.getPosition(r,l.end)&d.POSITION_FOLLOWING);)r.insertBefore(f.cloneNode(!0).firstChild,
r.firstChild),r=d.getNextDomNode(r,!1,n);g.moveToBookmark(l).moveToBookmark(k).select()}d.preventDefault(b)}if(q.gecko&&46==c&&(g=h.selection.getRange(),g.collapsed&&(k=g.startContainer,d.isEmptyBlock(k)))){for(c=k.parentNode;1==d.getChildCount(c)&&!d.isBody(c);)k=c,c=c.parentNode;k===c.lastChild&&b.preventDefault()}});h.addListener("keyup",function(e,b){var c;if(8==(b.keyCode||b.which)&&!this.fireEvent("delkeyup")){c=this.selection.getRange();if(c.collapsed){var g;if((g=d.findParentByTagName(c.startContainer,
"h1 h2 h3 h4 h5 h6".split(" "),!0))&&d.isEmptyBlock(g)){var f=g.previousSibling;if(f&&"TABLE"!=f.nodeName){d.remove(g);c.setStartAtLast(f).setCursor(!1,!0);return}if((f=g.nextSibling)&&"TABLE"!=f.nodeName){d.remove(g);c.setStartAtFirst(f).setCursor(!1,!0);return}}d.isBody(c.startContainer)&&(g=d.createElement(this.document,"p",{innerHTML:q.ie?d.fillChar:"<br/>"}),c.insertNode(g).setStart(g,0).setCursor(!1,!0))}!a&&(3==c.startContainer.nodeType||1==c.startContainer.nodeType&&d.isEmptyBlock(c.startContainer))&&
(q.ie?(g=c.document.createElement("span"),c.insertNode(g).setStartBefore(g).collapse(!0),c.select(),d.remove(g)):c.select())}})};UE.plugins.fiximgclick=function(){function h(){this.cover=this.resizer=this.editor=null;this.doc=document;this.prePos={x:0,y:0};this.startPos={x:0,y:0}}(function(){var a=[[0,0,-1,-1],[0,0,0,-1],[0,0,1,-1],[0,0,-1,0],[0,0,1,0],[0,0,-1,1],[0,0,0,1],[0,0,1,1]];h.prototype={init:function(a){var b=this;b.editor=a;b.startPos=this.prePos={x:0,y:0};b.dragId=-1;a=[];var c=b.cover=
document.createElement("div"),g=b.resizer=document.createElement("div");c.id=b.editor.ui.id+"_imagescale_cover";c.style.cssText="position:absolute;display:none;z-index:"+b.editor.options.zIndex+";filter:alpha(opacity=0); opacity:0;background:#CCC;";d.on(c,"mousedown click",function(){b.hide()});for(i=0;8>i;i++)a.push('<span class="edui-editor-scale-hand'+i+'"></span>');g.id=b.editor.ui.id+"_imagescale";g.className="edui-editor-scale";g.innerHTML=a.join("");g.style.cssText+=";display:none;border:1px solid #3b77ff;z-index:"+
b.editor.options.zIndex+";";b.editor.ui.getDom().appendChild(c);b.editor.ui.getDom().appendChild(g);b.initStyle();b.initEvents()},initStyle:function(){p.cssRule("imagescale",".edui-editor-scale{position:absolute;border:1px solid #38B2CE;}.edui-editor-scale span{position:absolute;width:6px;height:6px;overflow:hidden;font-size:0px;display:block;background-color:#3C9DD0;}.edui-editor-scale .edui-editor-scale-hand0{cursor:nw-resize;top:0;margin-top:-4px;left:0;margin-left:-4px;}.edui-editor-scale .edui-editor-scale-hand1{cursor:n-resize;top:0;margin-top:-4px;left:50%;margin-left:-4px;}.edui-editor-scale .edui-editor-scale-hand2{cursor:ne-resize;top:0;margin-top:-4px;left:100%;margin-left:-3px;}.edui-editor-scale .edui-editor-scale-hand3{cursor:w-resize;top:50%;margin-top:-4px;left:0;margin-left:-4px;}.edui-editor-scale .edui-editor-scale-hand4{cursor:e-resize;top:50%;margin-top:-4px;left:100%;margin-left:-3px;}.edui-editor-scale .edui-editor-scale-hand5{cursor:sw-resize;top:100%;margin-top:-3px;left:0;margin-left:-4px;}.edui-editor-scale .edui-editor-scale-hand6{cursor:s-resize;top:100%;margin-top:-3px;left:50%;margin-left:-4px;}.edui-editor-scale .edui-editor-scale-hand7{cursor:se-resize;top:100%;margin-top:-3px;left:100%;margin-left:-3px;}")},
initEvents:function(){this.startPos.x=this.startPos.y=0;this.isDraging=!1},_eventHandler:function(a){switch(a.type){case "mousedown":var b=a.target||a.srcElement;-1!=b.className.indexOf("edui-editor-scale-hand")&&-1==this.dragId&&(this.dragId=b.className.slice(-1),this.startPos.x=this.prePos.x=a.clientX,this.startPos.y=this.prePos.y=a.clientY,d.on(this.doc,"mousemove",this.proxy(this._eventHandler,this)));break;case "mousemove":-1!=this.dragId&&(this.updateContainerStyle(this.dragId,{x:a.clientX-
this.prePos.x,y:a.clientY-this.prePos.y}),this.prePos.x=a.clientX,this.prePos.y=a.clientY,this.updateTargetElement());break;case "mouseup":-1!=this.dragId&&(this.updateContainerStyle(this.dragId,{x:a.clientX-this.prePos.x,y:a.clientY-this.prePos.y}),this.updateTargetElement(),this.target.parentNode&&this.attachTo(this.target),this.dragId=-1),d.un(this.doc,"mousemove",this.proxy(this._eventHandler,this)),this.editor.fireEvent("contentchange")}},updateTargetElement:function(){d.setStyles(this.target,
{width:this.resizer.style.width,height:this.resizer.style.height});this.attachTo(this.target)},updateContainerStyle:function(e,b){var c=this.resizer,d;0!=a[e][0]&&(d=parseInt(c.style.left)+b.x,c.style.left=this._validScaledProp("left",d)+"px");0!=a[e][1]&&(d=parseInt(c.style.top)+b.y,c.style.top=this._validScaledProp("top",d)+"px");0!=a[e][2]&&(d=c.clientWidth+a[e][2]*b.x,c.style.width=this._validScaledProp("width",d)+"px");0!=a[e][3]&&(d=c.clientHeight+a[e][3]*b.y,c.style.height=this._validScaledProp("height",
d)+"px")},_validScaledProp:function(a,b){var c=this.resizer,d=document;b=isNaN(b)?0:b;switch(a){case "left":return 0>b?0:b+c.clientWidth>d.clientWidth?d.clientWidth-c.clientWidth:b;case "top":return 0>b?0:b+c.clientHeight>d.clientHeight?d.clientHeight-c.clientHeight:b;case "width":return 0>=b?1:b+c.offsetLeft>d.clientWidth?d.clientWidth-c.offsetLeft:b;case "height":return 0>=b?1:b+c.offsetTop>d.clientHeight?d.clientHeight-c.offsetTop:b}},hideCover:function(){this.cover.style.display="none"},showCover:function(){var a=
d.getXY(this.editor.ui.getDom()),b=d.getXY(this.editor.iframe);d.setStyles(this.cover,{width:this.editor.iframe.offsetWidth+"px",height:this.editor.iframe.offsetHeight+"px",top:b.y-a.y+"px",left:b.x-a.x+"px",position:"absolute",display:""})},show:function(a){this.resizer.style.display="block";a&&this.attachTo(a);d.on(this.resizer,"mousedown",this.proxy(this._eventHandler,this));d.on(this.doc,"mouseup",this.proxy(this._eventHandler,this));this.showCover();this.editor.fireEvent("afterscaleshow",this);
this.editor.fireEvent("saveScene")},hide:function(){this.hideCover();this.resizer.style.display="none";d.un(this.resizer,"mousedown",this.proxy(this._eventHandler,this));d.un(this.doc,"mouseup",this.proxy(this._eventHandler,this));this.editor.fireEvent("afterscalehide",this)},proxy:function(a,b){return function(c){return a.apply(b||this,arguments)}},attachTo:function(a){a=this.target=a;var b=this.resizer,c=d.getXY(a),g=d.getXY(this.editor.iframe),f=d.getXY(b.parentNode);d.setStyles(b,{width:a.width+
"px",height:a.height+"px",left:g.x+c.x-this.editor.document.body.scrollLeft-f.x-parseInt(b.style.borderLeftWidth)+"px",top:g.y+c.y-this.editor.document.body.scrollTop-f.y-parseInt(b.style.borderTopWidth)+"px"})}}})();return function(){var a=this,e;a.setOpt("imageScaleEnabled",!0);!q.ie&&a.options.imageScaleEnabled&&a.addListener("click",function(b,c){var g=a.selection.getRange().getClosedNode();if(g&&"IMG"==g.tagName&&"false"!=a.body.contentEditable){if(!e){e=new h;e.init(a);a.ui.getDom().appendChild(e.resizer);
var f=function(b){e.hide();e.target&&a.selection.getRange().selectNode(e.target).select()},k=function(a){var b=a.target||a.srcElement;!b||void 0!==b.className&&-1!=b.className.indexOf("edui-editor-scale")||f(a)},l;a.addListener("afterscaleshow",function(b){a.addListener("beforekeydown",f);a.addListener("beforemousedown",k);d.on(document,"keydown",f);d.on(document,"mousedown",k);a.selection.getNative().removeAllRanges()});a.addListener("afterscalehide",function(b){a.removeListener("beforekeydown",
f);a.removeListener("beforemousedown",k);d.un(document,"keydown",f);d.un(document,"mousedown",k);b=e.target;b.parentNode&&a.selection.getRange().selectNode(b).select()});d.on(e.resizer,"mousedown",function(b){a.selection.getNative().removeAllRanges();var c=b.target||b.srcElement;c&&-1==c.className.indexOf("edui-editor-scale-hand")&&(l=setTimeout(function(){e.hide();e.target&&a.selection.getRange().selectNode(c).select()},200))});d.on(e.resizer,"mouseup",function(a){(a=a.target||a.srcElement)&&-1==
a.className.indexOf("edui-editor-scale-hand")&&clearTimeout(l)})}e.show(g)}else e&&"none"!=e.resizer.style.display&&e.hide()});q.webkit&&a.addListener("click",function(b,c){"IMG"==c.target.tagName&&"false"!=a.body.contentEditable&&(new I.Range(a.document)).selectNode(c.target).select()})}}();UE.plugin.register("autolink",function(){return q.ie?{}:{bindEvents:{reset:function(){},keydown:function(h,a){var e=a.keyCode||a.which;if(32==e||13==e){for(var e=this.selection.getNative(),b=e.getRangeAt(0).cloneRange(),
c,g=b.startContainer;1==g.nodeType&&0<b.startOffset;){g=b.startContainer.childNodes[b.startOffset-1];if(!g)break;b.setStart(g,1==g.nodeType?g.childNodes.length:g.nodeValue.length);b.collapse(!0);g=b.startContainer}do{if(0==b.startOffset){for(g=b.startContainer.previousSibling;g&&1==g.nodeType;)g=g.lastChild;if(!g||d.isFillChar(g))break;c=g.nodeValue.length}else g=b.startContainer,c=b.startOffset;b.setStart(g,c-1);c=b.toString().charCodeAt(0)}while(160!=c&&32!=c);if(b.toString().replace(RegExp(d.fillChar,
"g"),"").match(/(?:https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)/i)){for(;b.toString().length&&!/^(?:https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)/i.test(b.toString());)try{b.setStart(b.startContainer,b.startOffset+1)}catch(f){for(g=b.startContainer;!(next=g.nextSibling);){if(d.isBody(g))return;g=g.parentNode}b.setStart(next,0)}if(!d.findParentByTagName(b.startContainer,"a",!0)){c=this.document.createElement("a");var g=this.document.createTextNode(" "),k;this.undoManger&&this.undoManger.save();c.appendChild(b.extractContents());
c.href=c.innerHTML=c.innerHTML.replace(/<[^>]+>/g,"");k=c.getAttribute("href").replace(RegExp(d.fillChar,"g"),"");k=/^(?:https?:\/\/)/ig.test(k)?k:"http://"+k;c.setAttribute("_src",p.html(k));c.href=p.html(k);b.insertNode(c);c.parentNode.insertBefore(g,c.nextSibling);b.setStart(g,0);b.collapse(!0);e.removeAllRanges();e.addRange(b);this.undoManger&&this.undoManger.save()}}}}}}},function(){function h(a){if(3==a.nodeType)return null;if("A"==a.nodeName)return a;for(a=a.lastChild;a;){if("A"==a.nodeName)return a;
if(3==a.nodeType){if(d.isWhitespace(a)){a=a.previousSibling;continue}return null}a=a.lastChild}}var a={37:1,38:1,39:1,40:1,13:1,32:1};q.ie&&this.addListener("keyup",function(e,b){var c=b.keyCode;if(a[c]){var g=this.selection.getRange(),f=g.startContainer;if(13==c){for(;f&&!d.isBody(f)&&!d.isBlockElm(f);)f=f.parentNode;f&&!d.isBody(f)&&"P"==f.nodeName&&(g=f.previousSibling)&&1==g.nodeType&&(g=h(g))&&!g.getAttribute("_href")&&d.remove(g,!0)}else 32==c?3==f.nodeType&&/^\s$/.test(f.nodeValue)&&(f=f.previousSibling)&&
("A"==f.nodeName&&!f.getAttribute("_href"))&&d.remove(f,!0):(f=d.findParentByTagName(f,"a",!0))&&!f.getAttribute("_href")&&(c=g.createBookmark(),d.remove(f,!0),g.moveToBookmark(c).select(!0))}})});UE.plugins.autoheight=function(){function h(){var a=this;clearTimeout(f);k||a.queryCommandState&&(!a.queryCommandState||1==a.queryCommandState("source"))||(f=setTimeout(function(){for(var e=a.body.lastChild;e&&1!=e.nodeType;)e=e.previousSibling;e&&1==e.nodeType&&(e.style.clear="both",g=Math.max(d.getXY(e).y+
e.offsetHeight+25,Math.max(c.minFrameHeight,c.initialFrameHeight)),g!=b&&(a.setHeight(g,!0),b=g),d.removeStyle(e,"clear"))},50))}var a=this;a.autoHeightEnabled=!1!==a.options.autoHeightEnabled;if(a.autoHeightEnabled){var e,b=0,c=a.options,g,f,k;a.addListener("fullscreenchanged",function(a,b){k=b});a.addListener("destroy",function(){a.removeListener("contentchange afterinserthtml keyup mouseup",h)});a.enableAutoHeight=function(){var a=this;if(a.autoHeightEnabled){var b=a.document;a.autoHeightEnabled=
!0;e=b.body.style.overflowY;b.body.style.overflowY="hidden";a.addListener("contentchange afterinserthtml keyup mouseup",h);setTimeout(function(){h.call(a)},q.gecko?100:0);a.fireEvent("autoheightchanged",a.autoHeightEnabled)}};a.disableAutoHeight=function(){a.body.style.overflowY=e||"";a.removeListener("contentchange",h);a.removeListener("keyup",h);a.removeListener("mouseup",h);a.autoHeightEnabled=!1;a.fireEvent("autoheightchanged",a.autoHeightEnabled)};a.addListener("ready",function(){a.enableAutoHeight();
var b;d.on(q.ie?a.body:a.document,q.webkit?"dragover":"drop",function(){clearTimeout(b);b=setTimeout(function(){h.call(a)},100)})})}};UE.plugins.autofloat=function(){function h(){var a=document.body.style;a.backgroundImage='url("about:blank")';a.backgroundAttachment="fixed"}function a(){w=!0;n.parentNode&&n.parentNode.removeChild(n);r.style.cssText=m}function e(){var c=x(b.container),e=b.options.toolbarTopOffset||0;if(0>c.top&&c.bottom-r.offsetHeight>e){var c=d.getXY(r),e=d.getComputedStyle(r,"position"),
f=d.getComputedStyle(r,"left");r.style.width=r.offsetWidth+"px";r.style.zIndex=1*b.options.zIndex+1;r.parentNode.insertBefore(n,r);k||l&&q.ie?("absolute"!=r.style.position&&(r.style.position="absolute"),r.style.top=(document.body.scrollTop||document.documentElement.scrollTop)-t+g+"px"):(q.ie7Compat&&w&&(w=!1,r.style.left=d.getXY(r).x-document.documentElement.getBoundingClientRect().left+2+"px"),"fixed"!=r.style.position&&(r.style.position="fixed",r.style.top=g+"px",("absolute"==e||"relative"==e)&&
parseFloat(f)&&(r.style.left=c.x+"px")))}else a()}var b=this,c=b.getLang();b.setOpt({topOffset:0});var g=b.options.topOffset;if(!1!==b.options.autoFloatEnabled){var f=UE.ui.uiUtils,k=q.ie&&6>=q.version,l=q.quirks,m,n=document.createElement("div"),r,t,x,w=!0,u=p.defer(function(){e()},q.ie?200:100,!0);b.addListener("destroy",function(){d.un(window,["scroll","resize"],e);b.removeListener("keydown",u)});b.addListener("ready",function(){var l;UE.ui?l=1:(alert(c.autofloatMsg),l=0);l&&b.ui&&(x=f.getClientRect,
r=b.ui.getDom("toolbarbox"),t=x(r).top,m=r.style.cssText,n.style.height=r.offsetHeight+"px",k&&h(),d.on(window,["scroll","resize"],e),b.addListener("keydown",u),b.addListener("beforefullscreenchange",function(b,c){c&&a()}),b.addListener("fullscreenchanged",function(a,b){b||e()}),b.addListener("sourcemodechanged",function(a,b){setTimeout(function(){e()},0)}),b.addListener("clearDoc",function(){setTimeout(function(){e()},0)}))})}};UE.plugins.pasteplain=function(){this.setOpt({pasteplain:!1,filterTxtRules:function(){function a(a){a.tagName=
"p";a.setStyle()}function e(a){a.parentNode.removeChild(a,!0)}return{"-":"script style object iframe embed input select",p:{$:{}},br:{$:{}},div:function(a){for(var c,e=UE.uNode.createElement("p");c=a.firstChild();)"text"!=c.type&&UE.dom.dtd.$block[c.tagName]?e.firstChild()?(a.parentNode.insertBefore(e,a),e=UE.uNode.createElement("p")):a.parentNode.insertBefore(c,a):e.appendChild(c);e.firstChild()&&a.parentNode.insertBefore(e,a);a.parentNode.removeChild(a)},ol:e,ul:e,dl:e,dt:e,dd:e,li:e,caption:a,
th:a,tr:a,h1:a,h2:a,h3:a,h4:a,h5:a,h6:a,td:function(a){a.innerText()&&a.parentNode.insertAfter(UE.uNode.createText(" &nbsp; &nbsp;"),a);a.parentNode.removeChild(a,a.innerText())}}}()});var d=this.options.pasteplain;this.commands.pasteplain={queryCommandState:function(){return d?1:0},execCommand:function(){d=!d|0},notNeedUndo:1}};UE.plugins.video=function(){function h(a,c,d,f,k,l,m){var n;switch(m){case "image":n="<img "+(f?'id="'+f+'"':"")+' width="'+c+'" height="'+d+'" _url="'+a+'" class="'+l+'" src="'+
e.options.UEDITOR_HOME_URL+'themes/default/images/spacer.gif" style="background:url('+e.options.UEDITOR_HOME_URL+"themes/default/images/videologo.gif) no-repeat center center; border:1px solid gray;"+(k?"float:"+k+";":"")+'" />';break;case "embed":n='<embed type="application/x-shockwave-flash" class="'+l+'" pluginspage="http://www.macromedia.com/go/getflashplayer" src="'+p.html(a)+'" width="'+c+'" height="'+d+'"'+(k?' style="float:'+k+'"':"")+' wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" >';
break;case "video":m=a.substr(a.lastIndexOf(".")+1),"ogv"==m&&(m="ogg"),n="<video"+(f?' id="'+f+'"':"")+' class="'+l+'" '+(k?' style="float:'+k+'"':"")+' controls preload="none" width="'+c+'" height="'+d+'" src="'+a+'" data-setup="{}"><source src="'+a+'" type="video/'+m+'" /></video>'}return n}function a(a,c){p.each(a.getNodesByTagName(c?"img":"embed video"),function(a){var b=a.getAttr("class");if(b&&-1!=b.indexOf("edui-faked-video")){var e=h(c?a.getAttr("_url"):a.getAttr("src"),a.getAttr("width"),
a.getAttr("height"),null,a.getStyle("float")||"",b,c?"embed":"image");a.parentNode.replaceChild(UE.uNode.createElement(e),a)}b&&-1!=b.indexOf("edui-upload-video")&&(e=h(c?a.getAttr("_url"):a.getAttr("src"),a.getAttr("width"),a.getAttr("height"),null,a.getStyle("float")||"",b,c?"video":"image"),a.parentNode.replaceChild(UE.uNode.createElement(e),a))})}var e=this;e.addOutputRule(function(b){a(b,!0)});e.addInputRule(function(b){a(b)});e.commands.insertvideo={execCommand:function(a,c,g){c=p.isArray(c)?
c:[c];var f=[],k;a=0;for(var l,m=c.length;a<m;a++)l=c[a],k="upload"==g?"edui-upload-video video-js vjs-default-skin":"edui-faked-video",f.push(h(l.url,l.width||420,l.height||280,"tmpVedio"+a,null,k,"image"));e.execCommand("inserthtml",f.join(""),!0);g=this.selection.getRange();a=0;for(m=c.length;a<m;a++)f=this.document.getElementById("tmpVedio"+a),d.removeAttributes(f,"id"),g.selectNode(f).select(),e.execCommand("imagefloat",c[a].align)},queryCommandState:function(){var a=e.selection.getRange().getClosedNode();
return!a||"edui-faked-video"!=a.className&&-1==a.className.indexOf("edui-upload-video")?0:1}}};(function(){var h=UE.UETable=function(a){this.table=a;this.indexTable=[];this.selectedTds=[];this.cellsRange={};this.update(a)};h.removeSelectedClass=function(a){p.each(a,function(a){d.removeClasses(a,"selectTdClass")})};h.addSelectedClass=function(a){p.each(a,function(a){d.addClass(a,"selectTdClass")})};h.isEmptyBlock=function(a){var e=RegExp(d.fillChar,"g");if(0<a[q.ie?"innerText":"textContent"].replace(/^\s*$/,
"").replace(e,"").length)return 0;for(var b in v.$isNotEmpty)if(v.$isNotEmpty.hasOwnProperty(b)&&a.getElementsByTagName(b).length)return 0;return 1};h.getWidth=function(a){return a?parseInt(d.getComputedStyle(a,"width"),10):0};h.getTableCellAlignState=function(a){!p.isArray(a)&&(a=[a]);var e={},b=["align","valign"],c=null,d=!0;p.each(a,function(a){p.each(b,function(b){c=a.getAttribute(b);if(!e[b]&&c)e[b]=c;else if(!e[b]||c!==e[b])return d=!1});return d});return d?e:null};h.getTableItemsByRange=function(a){var e=
a.selection.getStart();e&&(e.id&&0===e.id.indexOf("_baidu_bookmark_start_"))&&(e=e.nextSibling);var b=(a=e&&d.findParentByTagName(e,["td","th"],!0))&&a.parentNode,e=e&&d.findParentByTagName(e,"caption",!0);return{cell:a,tr:b,table:e?e.parentNode:b&&b.parentNode.parentNode,caption:e}};h.getUETableBySelected=function(a){return(a=h.getTableItemsByRange(a).table)&&a.ueTable&&a.ueTable.selectedTds.length?a.ueTable:null};h.getDefaultValue=function(a,e){var b={thin:"0px",medium:"1px",thick:"2px"},c,g,f;
if(e)k=e.getElementsByTagName("td")[0],f=d.getComputedStyle(e,"border-left-width"),c=parseInt(b[f]||f,10),f=d.getComputedStyle(k,"padding-left"),g=parseInt(b[f]||f,10),f=d.getComputedStyle(k,"border-left-width"),b=parseInt(b[f]||f,10);else{e=a.document.createElement("table");e.insertRow(0).insertCell(0).innerHTML="xxx";a.body.appendChild(e);var k=e.getElementsByTagName("td")[0];f=d.getComputedStyle(e,"border-left-width");c=parseInt(b[f]||f,10);f=d.getComputedStyle(k,"padding-left");g=parseInt(b[f]||
f,10);f=d.getComputedStyle(k,"border-left-width");b=parseInt(b[f]||f,10);d.remove(e)}return{tableBorder:c,tdPadding:g,tdBorder:b}};h.getUETable=function(a){var e=a.tagName.toLowerCase();a="td"==e||"th"==e||"caption"==e?d.findParentByTagName(a,"table",!0):a;a.ueTable||(a.ueTable=new h(a));return a.ueTable};h.cloneCell=function(a,e,b){if(!a||p.isString(a))return this.table.ownerDocument.createElement(a||"td");var c=d.hasClass(a,"selectTdClass");c&&d.removeClasses(a,"selectTdClass");var g=a.cloneNode(!0);
e&&(g.rowSpan=g.colSpan=1);!b&&d.removeAttributes(g,"width height");!b&&d.removeAttributes(g,"style");g.style.borderLeftStyle="";g.style.borderTopStyle="";g.style.borderLeftColor=a.style.borderRightColor;g.style.borderLeftWidth=a.style.borderRightWidth;g.style.borderTopColor=a.style.borderBottomColor;g.style.borderTopWidth=a.style.borderBottomWidth;c&&d.addClass(a,"selectTdClass");return g};h.prototype={getMaxRows:function(){for(var a=this.table.rows,e=1,b=0,c;c=a[b];b++){for(var d=1,f=0,k;k=c.cells[f++];)d=
Math.max(k.rowSpan||1,d);e=Math.max(d+b,e)}return e},getMaxCols:function(){for(var a=this.table.rows,e=0,b={},c=0,d;d=a[c];c++){for(var f=0,k=0,l;l=d.cells[k++];)if(f+=l.colSpan||1,l.rowSpan&&1<l.rowSpan)for(var m=1;m<l.rowSpan;m++)b["row_"+(c+m)]?b["row_"+(c+m)]++:b["row_"+(c+m)]=l.colSpan||1;f+=b["row_"+c]||0;e=Math.max(f,e)}return e},getCellColIndex:function(a){},getHSideCell:function(a,e){try{var b=this.getCellInfo(a),c,d,f=this.selectedTds.length,k=this.cellsRange;if(!e&&(f?!k.beginColIndex:
!b.colIndex)||e&&(f?k.endColIndex==this.colsNum-1:b.colIndex==this.colsNum-1))return null;c=f?k.beginRowIndex:b.rowIndex;d=e?f?k.endColIndex+1:b.colIndex+1:f?k.beginColIndex-1:1>b.colIndex?0:b.colIndex-1;return this.getCell(this.indexTable[c][d].rowIndex,this.indexTable[c][d].cellIndex)}catch(l){}},getTabNextCell:function(a,e){var b=this.getCellInfo(a),c=e||b.rowIndex,b=b.colIndex+1+(b.colSpan-1),d;try{d=this.getCell(this.indexTable[c][b].rowIndex,this.indexTable[c][b].cellIndex)}catch(f){try{c=1*
c+1,b=0,d=this.getCell(this.indexTable[c][b].rowIndex,this.indexTable[c][b].cellIndex)}catch(k){}}return d},getVSideCell:function(a,e,b){try{var c=this.getCellInfo(a),d,f,k=this.selectedTds.length&&!b,l=this.cellsRange;if(!e&&0==c.rowIndex||e&&(k?l.endRowIndex==this.rowsNum-1:c.rowIndex+c.rowSpan>this.rowsNum-1))return null;d=e?k?l.endRowIndex+1:c.rowIndex+c.rowSpan:k?l.beginRowIndex-1:c.rowIndex-1;f=k?l.beginColIndex:c.colIndex;return this.getCell(this.indexTable[d][f].rowIndex,this.indexTable[d][f].cellIndex)}catch(m){}},
getSameEndPosCells:function(a,e){try{for(var b="x"===e.toLowerCase(),c=d.getXY(a)[b?"x":"y"]+a["offset"+(b?"Width":"Height")],g=this.table.rows,f=null,k=[],l=0;l<this.rowsNum;l++)for(var f=g[l].cells,m=0,n;n=f[m++];){var h=d.getXY(n)[b?"x":"y"]+n["offset"+(b?"Width":"Height")];if(h>c&&b)break;if(a==n||c==h)if(1==n[b?"colSpan":"rowSpan"]&&k.push(n),b)break}return k}catch(t){}},setCellContent:function(a,e){a.innerHTML=e||(q.ie?d.fillChar:"<br />")},cloneCell:h.cloneCell,getSameStartPosXCells:function(a){try{var e=
d.getXY(a).x+a.offsetWidth,b=this.table.rows,c;a=[];for(var g=0;g<this.rowsNum;g++){c=b[g].cells;for(var f=0,k;k=c[f++];){var l=d.getXY(k).x;if(l>e)break;if(l==e&&1==k.colSpan){a.push(k);break}}}return a}catch(m){}},update:function(a){this.table=a||this.table;this.selectedTds=[];this.cellsRange={};this.indexTable=[];a=this.table.rows;for(var e=this.getMaxRows(),b=e-a.length,c=this.getMaxCols();b--;)this.table.insertRow(a.length);this.rowsNum=e;this.colsNum=c;for(var b=0,g=a.length;b<g;b++)this.indexTable[b]=
Array(c);for(var b=0,f;f=a[b];b++){var g=0,k;for(f=f.cells;k=f[g];g++){k.rowSpan>e&&(k.rowSpan=e);var l=g,m=k.rowSpan||1;for(k=k.colSpan||1;this.indexTable[b][l];)l++;for(var n=0;n<m;n++)for(var h=0;h<k;h++)this.indexTable[b+n][l+h]={rowIndex:b,cellIndex:g,colIndex:l,rowSpan:m,colSpan:k}}}for(n=0;n<e;n++)for(h=0;h<c;h++)void 0===this.indexTable[n][h]&&(f=a[n],k=(k=f.cells[f.cells.length-1])?k.cloneNode(!0):this.table.ownerDocument.createElement("td"),this.setCellContent(k),1!==k.colSpan&&(k.colSpan=
1),1!==k.rowSpan&&(k.rowSpan=1),f.appendChild(k),this.indexTable[n][h]={rowIndex:n,cellIndex:k.cellIndex,colIndex:h,rowSpan:1,colSpan:1});a=d.getElementsByTagName(this.table,"td");var t=[];p.each(a,function(a){d.hasClass(a,"selectTdClass")&&t.push(a)});t.length&&(e=t[t.length-1],a=this.getCellInfo(t[0]),e=this.getCellInfo(e),this.selectedTds=t,this.cellsRange={beginRowIndex:a.rowIndex,beginColIndex:a.colIndex,endRowIndex:e.rowIndex+e.rowSpan-1,endColIndex:e.colIndex+e.colSpan-1});if(!d.hasClass(this.table.rows[0],
"firstRow"))for(d.addClass(this.table.rows[0],"firstRow"),b=1;b<this.table.rows.length;b++)d.removeClasses(this.table.rows[b],"firstRow")},getCellInfo:function(a){if(a){var e=a.cellIndex;a=a.parentNode.rowIndex;for(var b=this.indexTable[a],c=this.colsNum,d=e;d<c;d++){var f=b[d];if(f.rowIndex===a&&f.cellIndex===e)return f}}},getCell:function(a,e){return a<this.rowsNum&&this.table.rows[a].cells[e]||null},deleteCell:function(a,e){e="number"==typeof e?e:a.parentNode.rowIndex;this.table.rows[e].deleteCell(a.cellIndex)},
getCellsRange:function(a,e){function b(a,e,d,f){var l=a,k=e,g=d,n=f,m,h,r;if(0<a)for(h=e;h<f;h++)m=c.indexTable[a][h],r=m.rowIndex,r<a&&(l=Math.min(r,l));if(f<c.colsNum)for(r=a;r<d;r++)m=c.indexTable[r][f],h=m.colIndex+m.colSpan-1,h>f&&(n=Math.max(h,n));if(d<c.rowsNum)for(h=e;h<f;h++)m=c.indexTable[d][h],r=m.rowIndex+m.rowSpan-1,r>d&&(g=Math.max(r,g));if(0<e)for(r=a;r<d;r++)m=c.indexTable[r][e],h=m.colIndex,h<e&&(k=Math.min(m.colIndex,k));return l!=a||k!=e||g!=d||n!=f?b(l,k,g,n):{beginRowIndex:a,
beginColIndex:e,endRowIndex:d,endColIndex:f}}try{var c=this,d=c.getCellInfo(a);if(a===e)return{beginRowIndex:d.rowIndex,beginColIndex:d.colIndex,endRowIndex:d.rowIndex+d.rowSpan-1,endColIndex:d.colIndex+d.colSpan-1};var f=c.getCellInfo(e),k=Math.min(d.rowIndex,f.rowIndex),l=Math.min(d.colIndex,f.colIndex),m=Math.max(d.rowIndex+d.rowSpan-1,f.rowIndex+f.rowSpan-1),n=Math.max(d.colIndex+d.colSpan-1,f.colIndex+f.colSpan-1);return b(k,l,m,n)}catch(h){}},getCells:function(a){this.clearSelected();for(var e=
a.beginColIndex,b=a.endRowIndex,c=a.endColIndex,d,f,k={},l=[],m=a.beginRowIndex;m<=b;m++)for(var n=e;n<=c;n++){a=this.indexTable[m][n];d=a.rowIndex;f=a.colIndex;var h=d+"|"+f;if(!k[h]){k[h]=1;if(d<m||f<n||d+a.rowSpan-1>b||f+a.colSpan-1>c)return null;l.push(this.getCell(d,a.cellIndex))}}return l},clearSelected:function(){h.removeSelectedClass(this.selectedTds);this.selectedTds=[];this.cellsRange={}},setSelected:function(a){var e=this.getCells(a);h.addSelectedClass(e);this.selectedTds=e;this.cellsRange=
a},isFullRow:function(){var a=this.cellsRange;return a.endColIndex-a.beginColIndex+1==this.colsNum},isFullCol:function(){var a=this.cellsRange,e=this.table.getElementsByTagName("th"),a=a.endRowIndex-a.beginRowIndex+1;return e.length?a==this.rowsNum||a==this.rowsNum-1:a==this.rowsNum},getNextCell:function(a,e,b){try{var c=this.getCellInfo(a),d,f,k=this.selectedTds.length&&!b,l=this.cellsRange;if(!e&&0==c.rowIndex||e&&(k?l.endRowIndex==this.rowsNum-1:c.rowIndex+c.rowSpan>this.rowsNum-1))return null;
d=e?k?l.endRowIndex+1:c.rowIndex+c.rowSpan:k?l.beginRowIndex-1:c.rowIndex-1;f=k?l.beginColIndex:c.colIndex;return this.getCell(this.indexTable[d][f].rowIndex,this.indexTable[d][f].cellIndex)}catch(m){}},getPreviewCell:function(a,e){try{var b=this.getCellInfo(a),c,d,f=this.selectedTds.length,k=this.cellsRange;if(!e&&(f?!k.beginColIndex:!b.colIndex)||e&&(f?k.endColIndex==this.colsNum-1:b.rowIndex>this.colsNum-1))return null;c=e?f?k.beginRowIndex:1>b.rowIndex?0:b.rowIndex-1:f?k.beginRowIndex:b.rowIndex;
d=e?f?k.endColIndex+1:b.colIndex:f?k.beginColIndex-1:1>b.colIndex?0:b.colIndex-1;return this.getCell(this.indexTable[c][d].rowIndex,this.indexTable[c][d].cellIndex)}catch(l){}},moveContent:function(a,e){if(!h.isEmptyBlock(e))if(h.isEmptyBlock(a))a.innerHTML=e.innerHTML;else{var b=a.lastChild;for(3!=b.nodeType&&v.$block[b.tagName]||a.appendChild(a.ownerDocument.createElement("br"));b=e.firstChild;)a.appendChild(b)}},mergeRight:function(a){var e=this.getCellInfo(a),b=this.indexTable[e.rowIndex][e.colIndex+
e.colSpan],c=this.getCell(b.rowIndex,b.cellIndex);a.colSpan=e.colSpan+b.colSpan;a.removeAttribute("width");this.moveContent(a,c);this.deleteCell(c,b.rowIndex);this.update()},mergeDown:function(a){var e=this.getCellInfo(a),b=this.indexTable[e.rowIndex+e.rowSpan][e.colIndex],c=this.getCell(b.rowIndex,b.cellIndex);a.rowSpan=e.rowSpan+b.rowSpan;a.removeAttribute("height");this.moveContent(a,c);this.deleteCell(c,b.rowIndex);this.update()},mergeRange:function(){var a=this.cellsRange,e=this.getCell(a.beginRowIndex,
this.indexTable[a.beginRowIndex][a.beginColIndex].cellIndex);if("TH"==e.tagName&&a.endRowIndex!==a.beginRowIndex)var b=this.indexTable,a=this.getCellInfo(e),e=this.getCell(1,b[1][a.colIndex].cellIndex),a=this.getCellsRange(e,this.getCell(b[this.rowsNum-1][a.colIndex].rowIndex,b[this.rowsNum-1][a.colIndex].cellIndex));for(var c=this.getCells(a),b=0,d;d=c[b++];)d!==e&&(this.moveContent(e,d),this.deleteCell(d));e.rowSpan=a.endRowIndex-a.beginRowIndex+1;1<e.rowSpan&&e.removeAttribute("height");e.colSpan=
a.endColIndex-a.beginColIndex+1;1<e.colSpan&&e.removeAttribute("width");e.rowSpan==this.rowsNum&&1!=e.colSpan&&(e.colSpan=1);if(e.colSpan==this.colsNum&&1!=e.rowSpan){c=e.parentNode.rowIndex;if(this.table.deleteRow)for(b=c+1,c+=1,a=e.rowSpan;b<a;b++)this.table.deleteRow(c);else for(b=0,a=e.rowSpan-1;b<a;b++)d=this.table.rows[c+1],d.parentNode.removeChild(d);e.rowSpan=1}this.update()},insertRow:function(a,e){function b(a,b,c){0==a?(a=(c.nextSibling||c.previousSibling).cells[a],"TH"==a.tagName&&(a=
b.ownerDocument.createElement("th"),a.appendChild(b.firstChild),c.insertBefore(a,b),d.remove(b))):"TH"==b.tagName&&(a=b.ownerDocument.createElement("td"),a.appendChild(b.firstChild),c.insertBefore(a,b),d.remove(b))}var c=this.colsNum,g=this.table.insertRow(a),f,k="string"==typeof e&&"TH"==e.toUpperCase();if(0==a||a==this.rowsNum)for(var l=0;l<c;l++)f=this.cloneCell(e,!0),this.setCellContent(f),f.getAttribute("vAlign")&&f.setAttribute("vAlign",f.getAttribute("vAlign")),g.appendChild(f),k||b(l,f,g);
else for(var m=this.indexTable[a],l=0;l<c;l++){var n=m[l];n.rowIndex<a?(f=this.getCell(n.rowIndex,n.cellIndex),f.rowSpan=n.rowSpan+1):(f=this.cloneCell(e,!0),this.setCellContent(f),g.appendChild(f));k||b(l,f,g)}this.update();return g},deleteRow:function(a){for(var e=this.table.rows[a],b=this.indexTable[a],c=this.colsNum,g=0,f=0;f<c;){var k=b[f],l=this.getCell(k.rowIndex,k.cellIndex);if(1<l.rowSpan&&k.rowIndex==a){k=l.cloneNode(!0);k.rowSpan=l.rowSpan-1;k.innerHTML="";l.rowSpan=1;var m=a+1,n=this.table.rows[m],
m=this.getPreviewMergedCellsNum(m,f)-g;m<f?(m=f-m-1,d.insertAfter(n.cells[m],k)):n.cells.length&&n.insertBefore(k,n.cells[0]);g+=1}f+=l.colSpan||1}a=[];g={};for(f=0;f<c;f++)l=b[f].rowIndex,k=b[f].cellIndex,n=l+"_"+k,g[n]||(g[n]=1,l=this.getCell(l,k),a.push(l));var h=[];p.each(a,function(a){1==a.rowSpan?a.parentNode.removeChild(a):h.push(a)});p.each(h,function(a){a.rowSpan--});e.parentNode.removeChild(e);this.update()},insertCol:function(a,e,b){function c(a,b,c){0==a?(a=b.nextSibling||b.previousSibling,
"TH"==a.tagName&&(a=b.ownerDocument.createElement("th"),a.appendChild(b.firstChild),c.insertBefore(a,b),d.remove(b))):"TH"==b.tagName&&(a=b.ownerDocument.createElement("td"),a.appendChild(b.firstChild),c.insertBefore(a,b),d.remove(b))}var g=this.rowsNum,f=0,k,l,m=parseInt((this.table.offsetWidth-20*(this.colsNum+1)-(this.colsNum+1))/(this.colsNum+1),10),n="string"==typeof e&&"TH"==e.toUpperCase(),h;if(0==a||a==this.colsNum)for(;f<g;f++)k=this.table.rows[f],h=k.cells[0==a?a:k.cells.length],l=this.cloneCell(e,
!0),this.setCellContent(l),l.setAttribute("vAlign",l.getAttribute("vAlign")),h&&l.setAttribute("width",h.getAttribute("width")),a?d.insertAfter(k.cells[k.cells.length-1],l):k.insertBefore(l,k.cells[0]),n||c(f,l,k);else for(;f<g;f++)h=this.indexTable[f][a],h.colIndex<a?(l=this.getCell(h.rowIndex,h.cellIndex),l.colSpan=h.colSpan+1):(k=this.table.rows[f],h=k.cells[h.cellIndex],l=this.cloneCell(e,!0),this.setCellContent(l),l.setAttribute("vAlign",l.getAttribute("vAlign")),h&&l.setAttribute("width",h.getAttribute("width")),
h?k.insertBefore(l,h):k.appendChild(l)),n||c(f,l,k);this.update();this.updateWidth(m,b||{tdPadding:10,tdBorder:1})},updateWidth:function(a,e){var b=this.table,c=h.getWidth(b)-2*e.tdPadding-e.tdBorder+a;c<b.ownerDocument.body.offsetWidth?b.setAttribute("width",c):(b=d.getElementsByTagName(this.table,"td th"),p.each(b,function(b){b.setAttribute("width",a)}))},deleteCol:function(a){for(var e=this.indexTable,b=this.table.rows,c=this.table.getAttribute("width"),d=0,f=this.rowsNum,k={},l=0;l<f;){var h=
e[l][a],n=h.rowIndex+"_"+h.colIndex;k[n]||(k[n]=1,n=this.getCell(h.rowIndex,h.cellIndex),d||(d=n&&parseInt(n.offsetWidth/n.colSpan,10).toFixed(0)),1<n.colSpan?n.colSpan--:b[l].deleteCell(h.cellIndex),l+=h.rowSpan||1)}this.table.setAttribute("width",c-d);this.update()},splitToCells:function(a){var d=this;a=this.splitToRows(a);p.each(a,function(a){d.splitToCols(a)})},splitToRows:function(a){var d=this.getCellInfo(a),b=d.rowIndex,c=d.colIndex,g=[];a.rowSpan=1;g.push(a);for(var f=b,k=b+d.rowSpan;f<k;f++)if(f!=
b){var l=this.table.rows[f].insertCell(c-this.getPreviewMergedCellsNum(f,c));l.colSpan=d.colSpan;this.setCellContent(l);l.setAttribute("vAlign",a.getAttribute("vAlign"));l.setAttribute("align",a.getAttribute("align"));a.style.cssText&&(l.style.cssText=a.style.cssText);g.push(l)}this.update();return g},getPreviewMergedCellsNum:function(a,d){for(var b=this.indexTable[a],c=0,g=0;g<d;)var f=b[g].colSpan,c=c+(f-(b[g].rowIndex==a?1:0)),g=g+f;return c},splitToCols:function(a){var e=(a.offsetWidth/a.colSpan-
22).toFixed(0),b=this.getCellInfo(a),c=b.rowIndex,g=b.colIndex,f=[];a.colSpan=1;a.setAttribute("width",e);f.push(a);for(var k=g,l=g+b.colSpan;k<l;k++)if(k!=g){var h=this.table.rows[c],n=h.insertCell(this.indexTable[c][k].cellIndex+1);n.rowSpan=b.rowSpan;this.setCellContent(n);n.setAttribute("vAlign",a.getAttribute("vAlign"));n.setAttribute("align",a.getAttribute("align"));n.setAttribute("width",e);a.style.cssText&&(n.style.cssText=a.style.cssText);if("TH"==a.tagName){var r=a.ownerDocument.createElement("th");
r.appendChild(n.firstChild);r.setAttribute("vAlign",a.getAttribute("vAlign"));r.rowSpan=n.rowSpan;h.insertBefore(r,n);d.remove(n)}f.push(n)}this.update();return f},isLastCell:function(a,d,b){d=d||this.rowsNum;b=b||this.colsNum;a=this.getCellInfo(a);return a.rowIndex+a.rowSpan==d&&a.colIndex+a.colSpan==b},getLastCell:function(a){a=a||this.table.getElementsByTagName("td");this.getCellInfo(a[0]);var d=this,b=a[0],c=b.parentNode,g=0,f=0,k;p.each(a,function(a){a.parentNode==c&&(f+=a.colSpan||1);g+=a.rowSpan*
a.colSpan||1});k=g/f;p.each(a,function(a){if(d.isLastCell(a,k,f))return b=a,!1});return b},selectRow:function(a){var d=this.indexTable[a];a=this.getCell(d[0].rowIndex,d[0].cellIndex);d=this.getCell(d[this.colsNum-1].rowIndex,d[this.colsNum-1].cellIndex);a=this.getCellsRange(a,d);this.setSelected(a)},selectTable:function(){var a=this.table.getElementsByTagName("td"),a=this.getCellsRange(a[0],a[a.length-1]);this.setSelected(a)},setBackground:function(a,d){if("string"===typeof d)p.each(a,function(a){a.style.backgroundColor=
d});else if("object"===typeof d){d=p.extend({repeat:!0,colorList:["#ddd","#fff"]},d);for(var b=this.getCellInfo(a[0]).rowIndex,c=0,g=d.colorList,f=function(a,b,c){return a[b]?a[b]:c?a[b%a.length]:""},k=0,l;l=a[k++];){var h=this.getCellInfo(l);l.style.backgroundColor=f(g,b+c==h.rowIndex?c:++c,d.repeat)}}},removeBackground:function(a){p.each(a,function(a){a.style.backgroundColor=""})}}})();(function(){function h(c,e){var l=d.getElementsByTagName(c,"td th");p.each(l,function(a){a.removeAttribute("width")});
c.setAttribute("width",a(e,!0,b.getDefaultValue(e,c)));var g=[];setTimeout(function(){p.each(l,function(a){1==a.colSpan&&g.push(a.offsetWidth)});p.each(l,function(a,b){1==a.colSpan&&a.setAttribute("width",g[b]+"")})},0)}function a(a,b,c){var e=a.body;return e.offsetWidth-(b?2*parseInt(d.getComputedStyle(e,"margin-left"),10):0)-2*c.tableBorder-(a.options.offsetWidth||0)}function e(a){if(a=c(a).cell){var b=g(a);return b.selectedTds.length?b.selectedTds:[a]}return[]}var b=UE.UETable,c=function(a){return b.getTableItemsByRange(a)},
g=function(a){return b.getUETable(a)};UE.commands.inserttable={queryCommandState:function(){return c(this).table?-1:0},execCommand:function(a,c){c||(c=p.extend({},{numCols:this.options.defaultCols,numRows:this.options.defaultRows,tdvalign:this.options.tdvalign}));var e=this.selection.getRange().startContainer,e=d.findParent(e,function(a){return d.isBlockElm(a)},!0)||this.body,g=b.getDefaultValue(this,void 0),e=Math.floor(e.offsetWidth/c.numCols-2*g.tdPadding-g.tdBorder);!c.tdvalign&&(c.tdvalign=this.options.tdvalign);
this.execCommand("inserthtml",function(a,b){for(var c=[],e=a.numRows,f=a.numCols,l=0;l<e;l++){c.push("<tr>");for(var k=0;k<f;k++)c.push('<td width="'+b+'"  vAlign="'+a.tdvalign+'" >'+(q.ie?d.fillChar:"<br/>")+"</td>");c.push("</tr>")}return"<table><tbody>"+c.join("")+"</tbody></table>"}(c,e))}};UE.commands.insertparagraphbeforetable={queryCommandState:function(){return c(this).cell?0:-1},execCommand:function(){var a=c(this).table;if(a){var b=this.document.createElement("p");b.innerHTML=q.ie?"&nbsp;":
"<br />";a.parentNode.insertBefore(b,a);this.selection.getRange().setStart(b,0).setCursor()}}};UE.commands.deletetable={queryCommandState:function(){var a=this.selection.getRange();return d.findParentByTagName(a.startContainer,"table",!0)?0:-1},execCommand:function(a,b){var c=this.selection.getRange();if(b=b||d.findParentByTagName(c.startContainer,"table",!0)){var e=b.nextSibling;e||(e=d.createElement(this.document,"p",{innerHTML:q.ie?d.fillChar:"<br/>"}),b.parentNode.insertBefore(e,b));d.remove(b);
c=this.selection.getRange();3==e.nodeType?c.setStartBefore(e):c.setStart(e,0);c.setCursor(!1,!0);this.fireEvent("tablehasdeleted")}}};UE.commands.cellalign={queryCommandState:function(){return e(this).length?0:-1},execCommand:function(a,b){var c=e(this);if(c.length)for(var d=0,g;g=c[d++];)g.setAttribute("align",b)}};UE.commands.cellvalign={queryCommandState:function(){return e(this).length?0:-1},execCommand:function(a,b){var c=e(this);if(c.length)for(var d=0,g;g=c[d++];)g.setAttribute("vAlign",b)}};
UE.commands.insertcaption={queryCommandState:function(){var a=c(this).table;return a?0==a.getElementsByTagName("caption").length?1:-1:-1},execCommand:function(){var a=c(this).table;if(a){var b=this.document.createElement("caption");b.innerHTML=q.ie?d.fillChar:"<br/>";a.insertBefore(b,a.firstChild);this.selection.getRange().setStart(b,0).setCursor()}}};UE.commands.deletecaption={queryCommandState:function(){var a=this.selection.getRange();return(a=d.findParentByTagName(a.startContainer,"table"))?0==
a.getElementsByTagName("caption").length?-1:1:-1},execCommand:function(){var a=this.selection.getRange();if(a=d.findParentByTagName(a.startContainer,"table"))d.remove(a.getElementsByTagName("caption")[0]),this.selection.getRange().setStart(a.rows[0].cells[0],0).setCursor()}};UE.commands.inserttitle={queryCommandState:function(){var a=c(this).table;return a?(a=a.rows[0],"th"!=a.cells[a.cells.length-1].tagName.toLowerCase()?0:-1):-1},execCommand:function(){var a=c(this).table;a&&g(a).insertRow(0,"th");
a=a.getElementsByTagName("th")[0];this.selection.getRange().setStart(a,0).setCursor(!1,!0)}};UE.commands.deletetitle={queryCommandState:function(){var a=c(this).table;return a?(a=a.rows[0],"th"==a.cells[a.cells.length-1].tagName.toLowerCase()?0:-1):-1},execCommand:function(){var a=c(this).table;a&&d.remove(a.rows[0]);a=a.getElementsByTagName("td")[0];this.selection.getRange().setStart(a,0).setCursor(!1,!0)}};UE.commands.inserttitlecol={queryCommandState:function(){var a=c(this).table;return a?a.rows[a.rows.length-
1].getElementsByTagName("th").length?-1:0:-1},execCommand:function(a){(a=c(this).table)&&g(a).insertCol(0,"th");h(a,this);a=a.getElementsByTagName("th")[0];this.selection.getRange().setStart(a,0).setCursor(!1,!0)}};UE.commands.deletetitlecol={queryCommandState:function(){var a=c(this).table;return a?a.rows[a.rows.length-1].getElementsByTagName("th").length?0:-1:-1},execCommand:function(){var a=c(this).table;if(a)for(var b=0;b<a.rows.length;b++)d.remove(a.rows[b].children[0]);h(a,this);a=a.getElementsByTagName("td")[0];
this.selection.getRange().setStart(a,0).setCursor(!1,!0)}};UE.commands.mergeright={queryCommandState:function(a){var b=c(this);if(!b.cell)return-1;a=g(b.table);if(a.selectedTds.length)return-1;var b=a.getCellInfo(b.cell),d=b.colIndex+b.colSpan;if(d>=a.colsNum)return-1;a=a.indexTable[b.rowIndex][d];return a.rowIndex==b.rowIndex&&a.rowSpan==b.rowSpan?0:-1},execCommand:function(a){a=this.selection.getRange();var b=a.createBookmark(!0),d=c(this).cell;g(d).mergeRight(d);a.moveToBookmark(b).select()}};
UE.commands.mergedown={queryCommandState:function(a){a=c(this);var b=a.cell;if(!b||"TH"==b.tagName)return-1;var d=g(a.table);if(d.selectedTds.length)return-1;var b=d.getCellInfo(a.cell),e=b.rowIndex+b.rowSpan;if(e>=d.rowsNum)return-1;d=d.indexTable[e][b.colIndex];return d.colIndex==b.colIndex&&d.colSpan==b.colSpan&&"TH"!==a.cell.tagName?0:-1},execCommand:function(){var a=this.selection.getRange(),b=a.createBookmark(!0),d=c(this).cell;g(d).mergeDown(d);a.moveToBookmark(b).select()}};UE.commands.mergecells=
{queryCommandState:function(){return b.getUETableBySelected(this)?0:-1},execCommand:function(){var a=b.getUETableBySelected(this);if(a&&a.selectedTds.length){var c=a.selectedTds[0];a.mergeRange();a=this.selection.getRange();d.isEmptyBlock(c)?a.setStart(c,0).collapse(!0):a.selectNodeContents(c);a.select()}}};UE.commands.insertrow={queryCommandState:function(){var a=c(this),b=a.cell;return b&&("TD"==b.tagName||"TH"==b.tagName&&a.tr!==a.table.rows[0])&&g(a.table).rowsNum<this.options.maxRowNum?0:-1},
execCommand:function(){var a=this.selection.getRange(),b=a.createBookmark(!0),d=c(this),e=d.cell,d=d.table,h=g(d),r=h.getCellInfo(e);if(h.selectedTds.length)for(var r=h.cellsRange,t=0,p=r.endRowIndex-r.beginRowIndex+1;t<p;t++)h.insertRow(r.beginRowIndex,e);else h.insertRow(r.rowIndex,e);a.moveToBookmark(b).select();"enabled"===d.getAttribute("interlaced")&&this.fireEvent("interlacetable",d)}};UE.commands.insertrownext={queryCommandState:function(){var a=c(this),b=a.cell;return b&&"TD"==b.tagName&&
g(a.table).rowsNum<this.options.maxRowNum?0:-1},execCommand:function(){var a=this.selection.getRange(),b=a.createBookmark(!0),d=c(this),e=d.cell,d=d.table,h=g(d),r=h.getCellInfo(e);if(h.selectedTds.length)for(var r=h.cellsRange,t=0,p=r.endRowIndex-r.beginRowIndex+1;t<p;t++)h.insertRow(r.endRowIndex+1,e);else h.insertRow(r.rowIndex+r.rowSpan,e);a.moveToBookmark(b).select();"enabled"===d.getAttribute("interlaced")&&this.fireEvent("interlacetable",d)}};UE.commands.deleterow={queryCommandState:function(){if(!c(this).cell)return-1},
execCommand:function(){var a=c(this).cell,b=g(a),e=b.cellsRange,h=b.getCellInfo(a),n=b.getVSideCell(a),r=b.getVSideCell(a,!0),a=this.selection.getRange();if(p.isEmptyObject(e))b.deleteRow(h.rowIndex);else for(var t=e.beginRowIndex;t<e.endRowIndex+1;t++)b.deleteRow(e.beginRowIndex);t=b.table;t.getElementsByTagName("td").length?1==h.rowSpan||h.rowSpan==e.endRowIndex-e.beginRowIndex+1?(r||n)&&a.selectNodeContents(r||n).setCursor(!1,!0):(b=b.getCell(h.rowIndex,b.indexTable[h.rowIndex][h.colIndex].cellIndex))&&
a.selectNodeContents(b).setCursor(!1,!0):(b=t.nextSibling,d.remove(t),b&&a.setStart(b,0).setCursor(!1,!0));"enabled"===t.getAttribute("interlaced")&&this.fireEvent("interlacetable",t)}};UE.commands.insertcol={queryCommandState:function(a){a=c(this);var b=a.cell;return b&&("TD"==b.tagName||"TH"==b.tagName&&b!==a.tr.cells[0])&&g(a.table).colsNum<this.options.maxColNum?0:-1},execCommand:function(a){var b=this.selection.getRange(),d=b.createBookmark(!0);if(-1!=this.queryCommandState(a)){a=c(this).cell;
var e=g(a),h=e.getCellInfo(a);if(e.selectedTds.length)for(var h=e.cellsRange,r=0,t=h.endColIndex-h.beginColIndex+1;r<t;r++)e.insertCol(h.beginColIndex,a);else e.insertCol(h.colIndex,a);b.moveToBookmark(d).select(!0)}}};UE.commands.insertcolnext={queryCommandState:function(){var a=c(this);return a.cell&&g(a.table).colsNum<this.options.maxColNum?0:-1},execCommand:function(){var a=this.selection.getRange(),b=a.createBookmark(!0),d=c(this).cell,e=g(d),h=e.getCellInfo(d);if(e.selectedTds.length)for(var h=
e.cellsRange,r=0,t=h.endColIndex-h.beginColIndex+1;r<t;r++)e.insertCol(h.endColIndex+1,d);else e.insertCol(h.colIndex+h.colSpan,d);a.moveToBookmark(b).select()}};UE.commands.deletecol={queryCommandState:function(){if(!c(this).cell)return-1},execCommand:function(){var a=c(this).cell,b=g(a),e=b.cellsRange,h=b.getCellInfo(a),n=b.getHSideCell(a),r=b.getHSideCell(a,!0);if(p.isEmptyObject(e))b.deleteCol(h.colIndex);else for(h=e.beginColIndex;h<e.endColIndex+1;h++)b.deleteCol(e.beginColIndex);b=b.table;
e=this.selection.getRange();b.getElementsByTagName("td").length?d.inDoc(a,this.document)?e.setStart(a,0).setCursor(!1,!0):r&&d.inDoc(r,this.document)?e.selectNodeContents(r).setCursor(!1,!0):n&&d.inDoc(n,this.document)&&e.selectNodeContents(n).setCursor(!0,!0):(a=b.nextSibling,d.remove(b),a&&e.setStart(a,0).setCursor(!1,!0))}};UE.commands.splittocells={queryCommandState:function(){var a=c(this),b=a.cell;return!b||0<g(a.table).selectedTds.length?-1:b&&(1<b.colSpan||1<b.rowSpan)?0:-1},execCommand:function(){var a=
this.selection.getRange(),b=a.createBookmark(!0),d=c(this).cell;g(d).splitToCells(d);a.moveToBookmark(b).select()}};UE.commands.splittorows={queryCommandState:function(){var a=c(this),b=a.cell;return!b||0<g(a.table).selectedTds.length?-1:b&&1<b.rowSpan?0:-1},execCommand:function(){var a=this.selection.getRange(),b=a.createBookmark(!0),d=c(this).cell;g(d).splitToRows(d);a.moveToBookmark(b).select()}};UE.commands.splittocols={queryCommandState:function(){var a=c(this),b=a.cell;return!b||0<g(a.table).selectedTds.length?
-1:b&&1<b.colSpan?0:-1},execCommand:function(){var a=this.selection.getRange(),b=a.createBookmark(!0),d=c(this).cell;g(d).splitToCols(d);a.moveToBookmark(b).select()}};UE.commands.adaptbytext=UE.commands.adaptbywindow={queryCommandState:function(){return c(this).table?0:-1},execCommand:function(a){var b=c(this).table;b&&("adaptbywindow"==a?h(b,this):(a=d.getElementsByTagName(b,"td th"),p.each(a,function(a){a.removeAttribute("width")}),b.removeAttribute("width")))}};UE.commands.averagedistributecol=
{queryCommandState:function(){var a=b.getUETableBySelected(this);return a?a.isFullRow()||a.isFullCol()?0:-1:-1},execCommand:function(a){function c(){var a=h.table,d=0,e=0,f=b.getDefaultValue(g,a);if(h.isFullRow())d=a.offsetWidth,e=h.colsNum;else for(var a=h.cellsRange.endColIndex,l,k=h.cellsRange.beginColIndex;k<=a;)l=h.selectedTds[k],d+=l.offsetWidth,k+=l.colSpan,e+=1;return Math.ceil(d/e)-2*f.tdBorder-2*f.tdPadding}function e(a){p.each(d.getElementsByTagName(h.table,"th"),function(a){a.setAttribute("width",
"")});var b=h.isFullRow()?d.getElementsByTagName(h.table,"td"):h.selectedTds;p.each(b,function(b){1==b.colSpan&&b.setAttribute("width",a)})}var g=this,h=b.getUETableBySelected(g);h&&h.selectedTds.length&&e(c())}};UE.commands.averagedistributerow={queryCommandState:function(){var a=b.getUETableBySelected(this);return!a||a.selectedTds&&/th/ig.test(a.selectedTds[0].tagName)?-1:a.isFullRow()||a.isFullCol()?0:-1},execCommand:function(a){function c(){var a,e=0;a=h.table;var f=b.getDefaultValue(g,a),l=parseInt(d.getComputedStyle(a.getElementsByTagName("td")[0],
"padding-top"));if(h.isFullCol()){var e=d.getElementsByTagName(a,"caption"),k=d.getElementsByTagName(a,"th"),p,s;0<e.length&&(p=e[0].offsetHeight);0<k.length&&(s=k[0].offsetHeight);e=a.offsetHeight-(p||0)-(s||0);a=0==k.length?h.rowsNum:h.rowsNum-1}else{s=h.cellsRange.beginRowIndex;k=h.cellsRange.endRowIndex;p=0;for(a=d.getElementsByTagName(a,"tr");s<=k;s++)e+=a[s].offsetHeight,p+=1;a=p}return q.ie&&9>q.version?Math.ceil(e/a):Math.ceil(e/a)-2*f.tdBorder-2*l}function e(a){var b=h.isFullCol()?d.getElementsByTagName(h.table,
"td"):h.selectedTds;p.each(b,function(b){1==b.rowSpan&&b.setAttribute("height",a)})}var g=this,h=b.getUETableBySelected(g);h&&h.selectedTds.length&&e(c())}};UE.commands.cellalignment={queryCommandState:function(){return c(this).table?0:-1},execCommand:function(a,c){var e=b.getUETableBySelected(this);e?p.each(e.selectedTds,function(a){d.setAttributes(a,c)}):(e=(e=this.selection.getStart())&&d.findParentByTagName(e,["td","th","caption"],!0),/caption/ig.test(e.tagName)?(e.style.textAlign=c.align,e.style.verticalAlign=
c.vAlign):d.setAttributes(e,c),this.selection.getRange().setCursor(!0))},queryCommandValue:function(a){(a=c(this).cell)||(a=e(this)[0]);if(a){var b=UE.UETable.getUETable(a).selectedTds;!b.length&&(b=a);return UE.UETable.getTableCellAlignState(b)}return null}};UE.commands.tablealignment={queryCommandState:function(){return q.ie&&8>q.version?-1:c(this).table?0:-1},execCommand:function(a,b){var c=this.selection.getStart();(c=c&&d.findParentByTagName(c,["table"],!0))&&c.setAttribute("align",b)}};UE.commands.edittable=
{queryCommandState:function(){return c(this).table?0:-1},execCommand:function(a,b){var c=this.selection.getRange();if(c=d.findParentByTagName(c.startContainer,"table"))c=d.getElementsByTagName(c,"td").concat(d.getElementsByTagName(c,"th"),d.getElementsByTagName(c,"caption")),p.each(c,function(a){a.style.borderColor=b})}};UE.commands.edittd={queryCommandState:function(){return c(this).table?0:-1},execCommand:function(a,c){var e=b.getUETableBySelected(this);if(e)p.each(e.selectedTds,function(a){a.style.backgroundColor=
c});else if(e=(e=this.selection.getStart())&&d.findParentByTagName(e,["td","th","caption"],!0))e.style.backgroundColor=c}};UE.commands.settablebackground={queryCommandState:function(){return 1<e(this).length?0:-1},execCommand:function(a,b){var c;c=e(this);g(c[0]).setBackground(c,b)}};UE.commands.cleartablebackground={queryCommandState:function(){var a=e(this);if(!a.length)return-1;for(var b=0,c;c=a[b++];)if(""!==c.style.backgroundColor)return 0;return-1},execCommand:function(){var a=e(this);g(a[0]).removeBackground(a)}};
UE.commands.interlacetable=UE.commands.uninterlacetable={queryCommandState:function(a){var b=c(this).table;if(!b)return-1;b=b.getAttribute("interlaced");return"interlacetable"==a?"enabled"===b?-1:0:b&&"disabled"!==b?0:-1},execCommand:function(a,b){var d=c(this).table;"interlacetable"==a?(d.setAttribute("interlaced","enabled"),this.fireEvent("interlacetable",d,b)):(d.setAttribute("interlaced","disabled"),this.fireEvent("uninterlacetable",d))}};UE.commands.setbordervisible={queryCommandState:function(a){return c(this).table?
0:-1},execCommand:function(){var a=c(this).table;p.each(d.getElementsByTagName(a,"td"),function(a){a.style.borderWidth="1px";a.style.borderStyle="solid"})}}})();UE.plugins.table=function(){function h(b,c){a(b,"width",!0);a(b,"height",!0)}function a(a,b,c){a.style[b]&&(c&&a.setAttribute(b,parseInt(a.style[b],10)),a.style[b]="")}function e(a){if("TD"==a.tagName||"TH"==a.tagName)return a;var b;return(b=d.findParentByTagName(a,"td",!0)||d.findParentByTagName(a,"th",!0))?b:null}function b(a){var b=RegExp(d.fillChar,
"g");if(0<a[q.ie?"innerText":"textContent"].replace(/^\s*$/,"").replace(b,"").length)return 0;for(var c in v.$isNotEmpty)if(a.getElementsByTagName(c).length)return 0;return 1}function c(a){return a.pageX||a.pageY?{x:a.pageX,y:a.pageY}:{x:a.clientX+y.document.body.scrollLeft-y.document.body.clientLeft,y:a.clientY+y.document.body.scrollTop-y.document.body.clientTop}}function g(a){if(!J())try{var b=e(a.target||a.srcElement),g;ea&&(y.body.style.webkitUserSelect="none",Math.abs($.x-a.clientX)>da||Math.abs($.y-
a.clientY)>da)&&(s(),ea=!1,Q=0,D(a));if(T&&R)if(Q=0,y.body.style.webkitUserSelect="none",y.selection.getNative()[q.ie9below?"empty":"removeAllRanges"](),g=c(a),m(y,!0,T,g,b),"h"==T){var k=S.style,h;var b=R,r=M(b);if(r){var t=r.getSameEndPosCells(b,"x")[0],p=r.getSameStartPosXCells(b)[0],w=c(a).x,x=(t?d.getXY(t).x:d.getXY(r.table).x)+20,u=p?d.getXY(p).x+p.offsetWidth-20:y.body.offsetWidth+5||parseInt(d.getComputedStyle(y.body,"width"),10),x=x+V,u=u-V;h=w<x?x:w>u?u:w}else h=void 0;k.left=h+"px"}else{if("v"==
T){var F=S.style,v;a:{try{var z=d.getXY(R).y,A=c(a).y;v=A<z?z:A;break a}catch(B){}v=void 0}F.top=v+"px"}}else if(b){if(!0!==y.fireEvent("excludetable",b)){g=c(a);var aa=n(b,g),fa=d.findParentByTagName(b,"table",!0);l(fa,b,a,!0)?!0!==y.fireEvent("excludetable",fa)&&(y.body.style.cursor="url("+y.options.cursorpath+"h.png),pointer"):l(fa,b,a)?!0!==y.fireEvent("excludetable",fa)&&(y.body.style.cursor="url("+y.options.cursorpath+"v.png),pointer"):(y.body.style.cursor="text",/\d/.test(aa)&&(aa=aa.replace(/\d/,
""),b=M(b).getPreviewCell(b,"v"==aa)),m(y,b?!!aa:!1,b?aa:"",g,b))}}else f(!1,fa,y)}catch(L){}}function f(a,b,c){a?k(b,c):ga||setTimeout(function(){!ga&&G&&G.parentNode&&G.parentNode.removeChild(G)},2E3)}function k(a,b){function c(d,e){clearTimeout(g);g=setTimeout(function(){b.fireEvent("tableClicked",a,e)},300)}var e=d.getXY(a),f=a.ownerDocument;if(G&&G.parentNode)return G;G=f.createElement("div");G.contentEditable=!1;G.innerHTML="";G.style.cssText="width:15px;height:15px;background-image:url("+b.options.UEDITOR_HOME_URL+
"dialogs/table/dragicon.png);position: absolute;cursor:move;top:"+(e.y-15)+"px;left:"+e.x+"px;";d.unSelectable(G);G.onmouseover=function(a){ga=!0};G.onmouseout=function(a){ga=!1};d.on(G,"click",function(a,b){c(b,this)});d.on(G,"dblclick",function(c,d){clearTimeout(g);var e=M(a),f=a.rows[0].cells[0],l=e.getLastCell(),l=e.getCellsRange(f,l);b.selection.getRange().setStart(f,0).setCursor(!1,!0);e.setSelected(l)});d.on(G,"dragstart",function(a,b){d.preventDefault(b)});var g;f.body.appendChild(G)}function l(a,
b,e,f){e=c(e);b=n(b,e);return f?(f=(f=a.getElementsByTagName("caption")[0])?f.offsetHeight:0,"v1"==b&&8>e.y-d.getXY(a).y-f):"h1"==b&&8>e.x-d.getXY(a).x}function m(a,b,c,d,e){try{a.body.style.cursor="h"==c?"col-resize":"v"==c?"row-resize":"text",q.ie&&(!c||ba||C.getUETableBySelected(a)?Z(a):(N(a,a.document),ma(c,e))),la=b}catch(f){}}function n(a,b){var c=d.getXY(a);return c?c.x+a.offsetWidth-b.x<ha?"h":b.x-c.x<ha?"h1":c.y+a.offsetHeight-b.y<ha?"v":b.y-c.y<ha?"v1":"":""}function r(a,b){if(!J())if($=
{x:b.clientX,y:b.clientY},2==b.button){var c=C.getUETableBySelected(y),e=!1;if(c){var f=X(y,b);p.each(c.selectedTds,function(a){a===f&&(e=!0)});e?(f=c.selectedTds[0],setTimeout(function(){y.selection.getRange().setStart(f,0).setCursor(!1,!0)},0)):(ia(d.getElementsByTagName(y.body,"th td")),c.clearSelected())}}else x(b)}function t(a){Q=0;a=a||y.window.event;var b=e(a.target||a.srcElement);if(b){var f;if(f=n(b,c(a)))if(Z(y),"h1"==f&&(f="h",l(d.findParentByTagName(b,"table"),b,a)?y.execCommand("adaptbywindow"):
(b=M(b).getPreviewCell(b))&&y.selection.getRange().selectNodeContents(b).setCursor(!0,!0)),"h"==f){a=M(b);var g=z(b,a.table,!0),g=u(g,"left");a.width=a.offsetWidth;var k=[],h=[];p.each(g,function(a){k.push(a.offsetWidth)});p.each(g,function(a){a.removeAttribute("width")});window.setTimeout(function(){var a=!0;p.each(g,function(b,c){var d=b.offsetWidth;if(d>k[c])return a=!1;h.push(d)});var b=a?h:k;p.each(g,function(a,c){a.width=b[c]-A()})},0)}}}function x(a){ia(d.getElementsByTagName(y.body,"td th"));
p.each(y.document.getElementsByTagName("table"),function(a){a.ueTable=null});if(K=X(y,a)){var b=d.findParentByTagName(K,"table",!0);(ut=M(b))&&ut.clearSelected();la?w(a):(y.document.body.style.webkitUserSelect="",ba=!0,y.addListener("mouseover",W))}}function w(a){q.ie&&(a=F(a));s();ea=!0;ja=setTimeout(function(){D(a)},na)}function u(a,b){for(var c=[],d=null,e=0,f=a.length;e<f;e++)(d=a[e][b])&&c.push(d);return c}function s(){ja&&clearTimeout(ja);ja=null}function F(a){var b="pageX pageY clientX clientY srcElement target".split(" "),
c={};if(a)for(var d=0,e,f;e=b[d];d++)(f=a[e])&&(c[e]=f);return c}function D(a){ea=!1;K&&(a=Math.abs($.x-a.clientX)>=Math.abs($.y-a.clientY)?"h":"v",/\d/.test(a)&&(a=a.replace(/\d/,""),K=M(K).getPreviewCell(K,"v"==a)),Z(y),N(y,y.document),y.fireEvent("saveScene"),ma(a,K),ba=!0,T=a,R=K)}function L(a,b){if(!J()){s();ea=!1;if(la&&(Q=++Q%3,$={x:b.clientX,y:b.clientY},setTimeout(function(){0<Q&&Q--},na),2===Q)){Q=0;t(b);return}if(2!=b.button){var c=this.selection.getRange(),e=d.findParentByTagName(c.startContainer,
"table",!0),f=d.findParentByTagName(c.endContainer,"table",!0);if(e||f)e===f?(e=d.findParentByTagName(c.startContainer,["td","th","caption"],!0),f=d.findParentByTagName(c.endContainer,["td","th","caption"],!0),e!==f&&this.selection.clearRange()):this.selection.clearRange();ba=!1;this.document.body.style.webkitUserSelect="";if(T&&R){this.selection.getNative()[q.ie9below?"empty":"removeAllRanges"]();Q=0;S=this.document.getElementById("ue_tableDragLine");c=d.getXY(R);e=d.getXY(S);switch(T){case "h":H(R,
e.x-c.x);break;case "v":ca(R,e.y-c.y-R.offsetHeight)}T="";R=null;Z(this);this.fireEvent("saveScene")}else{if(K)(e=(c=M(K))?c.selectedTds[0]:null)?(c=new I.Range(this.document),d.isEmptyBlock(e)?c.setStart(e,0).setCursor(!1,!0):c.selectNodeContents(e).shrinkBoundary().setCursor(!1,!0)):(c=this.selection.getRange().shrinkBoundary(),c.collapsed||(e=d.findParentByTagName(c.startContainer,["td","th"],!0),f=d.findParentByTagName(c.endContainer,["td","th"],!0),(e&&!f||!e&&f||e&&f&&e!==f)&&c.setCursor(!1,
!0))),K=null,this.removeListener("mouseover",W);else if((e=d.findParentByTagName(b.target||b.srcElement,"td",!0))||(e=d.findParentByTagName(b.target||b.srcElement,"th",!0)),e&&("TD"==e.tagName||"TH"==e.tagName)){if(!0===this.fireEvent("excludetable",e))return;c=new I.Range(this.document);c.setStart(e,0).setCursor(!1,!0)}this._selectionChange(250,b)}}}}function W(a,b){if(!J()){var c=b.target||b.srcElement;U=d.findParentByTagName(c,"td",!0)||d.findParentByTagName(c,"th",!0);if(K&&U&&("TD"==K.tagName&&
"TD"==U.tagName||"TH"==K.tagName&&"TH"==U.tagName)&&d.findParentByTagName(K,"table")==d.findParentByTagName(U,"table"))if(c=M(U),K!=U){this.document.body.style.webkitUserSelect="none";this.selection.getNative()[q.ie9below?"empty":"removeAllRanges"]();var e=c.getCellsRange(K,U);c.setSelected(e)}else this.document.body.style.webkitUserSelect="",c.clearSelected();b.preventDefault?b.preventDefault():b.returnValue=!1}}function H(a,b){var c=M(a);if(c){var c=c.table,e=z(a,c);c.style.width="";c.removeAttribute("width");
b=E(b,a,e);a.nextSibling?p.each(e,function(a){a.left.width=+a.left.width+b;a.right&&(a.right.width=+a.right.width-b)}):p.each(e,function(a){a.left.width-=-b})}}function J(){return"false"===y.body.contentEditable}function ca(a,b){if(!(10>Math.abs(b))){var c=M(a);if(c)for(var c=c.getSameEndPosCells(a,"y"),e=c[0]?c[0].offsetHeight:0,f=0,g;g=c[f++];){var l=b,k=e,h=parseInt(d.getComputedStyle(g,"line-height"),10),l=k+l,l=l<h?h:l;g.style.height&&(g.style.height="");1==g.rowSpan?g.setAttribute("height",
l):g.removeAttribute&&g.removeAttribute("height")}}}function z(a,b,c){b||(b=d.findParentByTagName(a,"table"));if(!b)return null;d.getNodeIndex(a);b=b.rows;for(var e=0;a;)1===a.nodeType&&(e+=a.colSpan||1),a=a.previousSibling;a=null;var f=[];p.each(b,function(a){var b=0;p.each(a.cells,function(a){b+=a.colSpan||1;if(b===e)return f.push({left:a,right:a.nextSibling||null}),!1;if(b>e)return c&&f.push({left:a}),!1})});return f}function E(a,b,c){a-=A();if(0>a)return 0;a-=B(b);var e=0>a?"left":"right";a=Math.abs(a);
p.each(c,function(b){(b=b[e])&&(a=Math.min(a,B(b)-V))});a=0>a?0:a;return"left"===e?-a:a}function B(a){var b=0,b=a.offsetWidth-A();if(!a.nextSibling){tab=d.findParentByTagName(a,"table",!1);if(void 0===tab.offsetVal){var c=a.previousSibling;tab.offsetVal=c?a.offsetWidth-c.offsetWidth===C.borderWidth?C.borderWidth:0:0}b-=tab.offsetVal}b=0>b?0:b;try{a.width=b}catch(e){}return b}function A(){if(void 0===C.tabcellSpace){var a=y.document.createElement("table"),b=y.document.createElement("tbody"),c=y.document.createElement("tr"),
e=y.document.createElement("td"),d=null;e.style.cssText="border: 0;";e.width=1;c.appendChild(e);c.appendChild(d=e.cloneNode(!1));b.appendChild(c);a.appendChild(b);a.style.cssText="visibility: hidden;";y.body.appendChild(a);C.paddingSpace=e.offsetWidth-1;b=a.offsetWidth;e.style.cssText="";d.style.cssText="";C.borderWidth=(a.offsetWidth-b)/3;C.tabcellSpace=C.paddingSpace+C.borderWidth;y.body.removeChild(a)}A=function(){return C.tabcellSpace};return C.tabcellSpace}function N(a,b){ba||(S=a.document.createElement("div"),
d.setAttributes(S,{id:"ue_tableDragLine",unselectable:"on",contenteditable:!1,onresizestart:"return false",ondragstart:"return false",onselectstart:"return false",style:"background-color:blue;position:absolute;padding:0;margin:0;background-image:none;border:0px none;opacity:0;filter:alpha(opacity=0)"}),a.body.appendChild(S))}function Z(a){if(!ba)for(var b;b=a.document.getElementById("ue_tableDragLine");)d.remove(b)}function ma(a,b){if(b){var c=d.findParentByTagName(b,"table"),e=c.getElementsByTagName("caption"),
f=c.offsetWidth,g=c.offsetHeight-(0<e.length?e[0].offsetHeight:0),c=d.getXY(c),l=d.getXY(b);switch(a){case "h":e="height:"+g+"px;top:"+(c.y+(0<e.length?e[0].offsetHeight:0))+"px;left:"+(l.x+b.offsetWidth);S.style.cssText=e+"px;position: absolute;display:block;background-color:blue;width:1px;border:0; color:blue;opacity:.3;filter:alpha(opacity=30)";break;case "v":e="width:"+f+"px;left:"+c.x+"px;top:"+(l.y+b.offsetHeight),S.style.cssText=e+"px;overflow:hidden;position: absolute;display:block;background-color:blue;height:1px;border:0;color:blue;opacity:.2;filter:alpha(opacity=20)"}}}
function O(a,b){for(var c=d.getElementsByTagName(a.body,"table"),e,f=0,g;g=c[f++];)e=d.getElementsByTagName(g,"td"),e[0]&&(b?(e=e[0].style.borderColor.replace(/\s/g,""),/(#ffffff)|(rgb\(255,255,255\))/ig.test(e)&&d.addClass(g,"noBorderTable")):d.removeClasses(g,"noBorderTable"))}function Y(a,b,c){var e=a.body;return e.offsetWidth-(b?2*parseInt(d.getComputedStyle(e,"margin-left"),10):0)-2*c.tableBorder-(a.options.offsetWidth||0)}function X(a,b){var e=d.findParentByTagName(b.target||b.srcElement,["td",
"th"],!0),f=null;if(!e)return null;f=n(e,c(b));if(!e)return null;if("h1"===f&&e.previousSibling){var f=d.getXY(e),g=e.offsetWidth;Math.abs(f.x+g-b.clientX)>g/3&&(e=e.previousSibling)}else"v1"===f&&e.parentNode.previousSibling&&(f=d.getXY(e),g=e.offsetHeight,Math.abs(f.y+g-b.clientY)>g/3&&(e=e.parentNode.previousSibling.firstChild));return e&&!0!==a.fireEvent("excludetable",e)?e:null}var y=this,ja=null,V=5,ea=!1,ha=5,da=10,Q=0,$=null,na=360,C=UE.UETable,M=function(a){return C.getUETable(a)},ia=function(a){return C.removeSelectedClass(a)};
y.ready(function(){var a=this,b=a.selection.getText;a.selection.getText=function(){var c=C.getUETableBySelected(a);if(c){var e="";p.each(c.selectedTds,function(a){e+=a[q.ie?"innerText":"textContent"]});return e}return b.call(a.selection)}});var K=null,U=null,T="",la=!1,G=null,ga=!1,S=null,R=null,ba=!1;y.setOpt({maxColNum:20,maxRowNum:100,defaultCols:5,defaultRows:5,tdvalign:"top",cursorpath:y.options.UEDITOR_HOME_URL+"themes/default/images/cursor_",tableDragable:!1,classList:["ue-table-interlace-color-single",
"ue-table-interlace-color-double"]});y.getUETable=M;var ka={deletetable:1,inserttable:1,cellvalign:1,insertcaption:1,deletecaption:1,inserttitle:1,deletetitle:1,mergeright:1,mergedown:1,mergecells:1,insertrow:1,insertrownext:1,deleterow:1,insertcol:1,insertcolnext:1,deletecol:1,splittocells:1,splittorows:1,splittocols:1,adaptbytext:1,adaptbywindow:1,adaptbycustomer:1,insertparagraph:1,insertparagraphbeforetable:1,averagedistributecol:1,averagedistributerow:1};y.ready(function(){p.cssRule("table",
".selectTdClass{background-color:#edf5fa !important}table.noBorderTable td,table.noBorderTable th,table.noBorderTable caption{border:1px dashed #ddd !important}table{margin-bottom:10px;border-collapse:collapse;display:table;}td,th{padding: 5px 10px;border: 1px solid #DDD;}caption{border:1px dashed #DDD;border-bottom:0;padding:3px;text-align:center;}th{border-top:1px solid #BBB;background-color:#F7F7F7;}table tr.firstRow th{border-top-width:2px;}.ue-table-interlace-color-single{ background-color: #fcfcfc; } .ue-table-interlace-color-double{ background-color: #f7faff; }td p{margin:0;padding:0;}",
y.document);var a,c,k;y.addListener("keydown",function(e,f){var g=f.keyCode||f.which;if(8==g){var l=C.getUETableBySelected(this);l&&l.selectedTds.length&&(l.isFullCol()?this.execCommand("deletecol"):l.isFullRow()?this.execCommand("deleterow"):this.fireEvent("delcells"),d.preventDefault(f));var h=d.findParentByTagName(this.selection.getStart(),"caption",!0),n=this.selection.getRange();n.collapsed&&(h&&b(h))&&(this.fireEvent("saveScene"),l=h.parentNode,d.remove(h),l&&n.setStart(l.rows[0].cells[0],0).setCursor(!1,
!0),this.fireEvent("saveScene"))}if(46==g&&(l=C.getUETableBySelected(this))){this.fireEvent("saveScene");for(h=0;n=l.selectedTds[h++];)d.fillNode(this.document,n);this.fireEvent("saveScene");d.preventDefault(f)}if(13==g){g=this.selection.getRange();if(h=d.findParentByTagName(g.startContainer,"caption",!0)){l=d.findParentByTagName(h,"table");g.collapsed?h&&g.setStart(l.rows[0].cells[0],0).setCursor(!1,!0):(g.deleteContents(),this.fireEvent("saveScene"));d.preventDefault(f);return}g.collapsed&&(l=d.findParentByTagName(g.startContainer,
"table"))&&(n=l.rows[0].cells[0],h=d.findParentByTagName(this.selection.getStart(),["td","th"],!0),l=l.previousSibling,n===h&&(!l||1==l.nodeType&&"TABLE"==l.tagName)&&d.isStartInblock(g)&&(g=d.findParent(this.selection.getStart(),function(a){return d.isBlockElm(a)},!0))&&(/t(h|d)/i.test(g.tagName)||g===h.firstChild)&&(this.execCommand("insertparagraphbeforetable"),d.preventDefault(f)))}if((f.ctrlKey||f.metaKey)&&"67"==f.keyCode&&(a=null,l=C.getUETableBySelected(this)))for(g=l.selectedTds,c=l.isFullCol(),
k=l.isFullRow(),a=[[l.cloneCell(g[0],null,!0)]],h=1;n=g[h];h++)n.parentNode!==g[h-1].parentNode?a.push([l.cloneCell(n,null,!0)]):a[a.length-1].push(l.cloneCell(n,null,!0))});y.addListener("tablehasdeleted",function(){m(this,!1,"",null);G&&d.remove(G)});y.addListener("beforepaste",function(e,f){var g=this,l=g.selection.getRange();if(d.findParentByTagName(l.startContainer,"caption",!0))l=g.document.createElement("div"),l.innerHTML=f.html,f.html=l[q.ie9below?"innerText":"textContent"];else{var n=C.getUETableBySelected(g);
if(a){g.fireEvent("saveScene");var l=g.selection.getRange(),m=d.findParentByTagName(l.startContainer,["td","th"],!0),r,t;if(m){n=M(m);if(k){var w=n.getCellInfo(m).rowIndex;"TH"==m.tagName&&w++;for(var l=0,x;x=a[l++];){t=n.insertRow(w++,"td");for(var u=0,s;s=x[u];u++)(m=t.cells[u])||(m=t.insertCell(u)),m.innerHTML=s.innerHTML,s.getAttribute("width")&&m.setAttribute("width",s.getAttribute("width")),s.getAttribute("vAlign")&&m.setAttribute("vAlign",s.getAttribute("vAlign")),s.getAttribute("align")&&
m.setAttribute("align",s.getAttribute("align")),s.style.cssText&&(m.style.cssText=s.style.cssText);for(u=0;(s=t.cells[u])&&x[u];u++)s.innerHTML=x[u].innerHTML,x[u].getAttribute("width")&&s.setAttribute("width",x[u].getAttribute("width")),x[u].getAttribute("vAlign")&&s.setAttribute("vAlign",x[u].getAttribute("vAlign")),x[u].getAttribute("align")&&s.setAttribute("align",x[u].getAttribute("align")),x[u].style.cssText&&(s.style.cssText=x[u].style.cssText)}}else{if(c){w=n.getCellInfo(m);u=m=0;for(x=a[0];s=
x[u++];)m+=s.colSpan||1;g.__hasEnterExecCommand=!0;for(l=0;l<m;l++)g.execCommand("insertcol");g.__hasEnterExecCommand=!1;m=n.table.rows[0].cells[w.cellIndex];"TH"==m.tagName&&(m=n.table.rows[1].cells[w.cellIndex])}for(l=0;x=a[l++];){r=m;for(u=0;s=x[u++];)m?(m.innerHTML=s.innerHTML,s.getAttribute("width")&&m.setAttribute("width",s.getAttribute("width")),s.getAttribute("vAlign")&&m.setAttribute("vAlign",s.getAttribute("vAlign")),s.getAttribute("align")&&m.setAttribute("align",s.getAttribute("align")),
s.style.cssText&&(m.style.cssText=s.style.cssText),t=m,m=m.nextSibling):(w=s.cloneNode(!0),d.removeAttributes(w,["class","rowSpan","colSpan"]),t.parentNode.appendChild(w));m=n.getNextCell(r,!0,!0);if(!a[l])break;m||(w=n.getCellInfo(r),n.table.insertRow(n.table.rows.length),n.update(),m=n.getVSideCell(r,!0))}}n.update()}else{n=g.document.createElement("table");for(l=0;x=a[l++];){t=n.insertRow(n.rows.length);for(u=0;s=x[u++];)w=C.cloneCell(s,null,!0),d.removeAttributes(w,["class"]),t.appendChild(w);
2==u&&1<w.rowSpan&&(w.rowSpan=1)}l=C.getDefaultValue(g,void 0);l=g.body.offsetWidth-2*parseInt(d.getComputedStyle(g.body,"margin-left"),10)-2*l.tableBorder-(g.options.offsetWidth||0);g.execCommand("insertHTML","<table  "+(c&&k?'width="'+l+'"':"")+">"+n.innerHTML.replace(/>\s*</g,"><").replace(/\bth\b/gi,"td")+"</table>")}g.fireEvent("contentchange");g.fireEvent("saveScene");f.html="";return!0}l=g.document.createElement("div");l.innerHTML=f.html;x=l.getElementsByTagName("table");d.findParentByTagName(g.selection.getStart(),
"table")?(p.each(x,function(a){d.remove(a)}),d.findParentByTagName(g.selection.getStart(),"caption",!0)&&(l.innerHTML=l[q.ie?"innerText":"textContent"])):p.each(x,function(a){h(a,!0);d.removeAttributes(a,["style","border"]);p.each(d.getElementsByTagName(a,"td"),function(a){b(a)&&d.fillNode(g.document,a);h(a,!0)})});f.html=l.innerHTML}});y.addListener("afterpaste",function(){p.each(d.getElementsByTagName(y.body,"table"),function(a){if(a.offsetWidth>y.body.offsetWidth){var b=C.getDefaultValue(y,a);
a.style.width=y.body.offsetWidth-2*parseInt(d.getComputedStyle(y.body,"margin-left"),10)-2*b.tableBorder-(y.options.offsetWidth||0)+"px"}})});y.addListener("blur",function(){a=null});var n;y.addListener("keydown",function(){clearTimeout(n);n=setTimeout(function(){var a=y.selection.getRange();if(a=d.findParentByTagName(a.startContainer,["th","td"],!0)){var b=a.parentNode.parentNode.parentNode;b.offsetWidth>b.getAttribute("width")&&(a.style.wordBreak="break-all")}},100)});y.addListener("selectionchange",
function(){m(y,!1,"",null)});y.addListener("contentchange",function(){var a=this;Z(a);if(!C.getUETableBySelected(a)){var b=a.selection.getRange().startContainer,b=d.findParentByTagName(b,["td","th"],!0);p.each(d.getElementsByTagName(a.document,"table"),function(b){!0!==a.fireEvent("excludetable",b)&&(b.ueTable=new C(b),b.onmouseover=function(){a.fireEvent("tablemouseover",b)},b.onmousemove=function(){a.fireEvent("tablemousemove",b);a.options.tableDragable&&f(!0,this,a);p.defer(function(){a.fireEvent("contentchange",
50)},!0)},b.onmouseout=function(){a.fireEvent("tablemouseout",b);m(a,!1,"",null);Z(a)},b.onclick=function(b){b=a.window.event||b;var c=e(b.target||b.srcElement);if(c){var d=M(c),f=d.table,g=d.getCellInfo(c),k=a.selection.getRange();l(f,c,b,!0)?(f=d.getCell(d.indexTable[d.rowsNum-1][g.colIndex].rowIndex,d.indexTable[d.rowsNum-1][g.colIndex].cellIndex),b.shiftKey&&d.selectedTds.length?d.selectedTds[0]!==f?(b=d.getCellsRange(d.selectedTds[0],f),d.setSelected(b)):k&&k.selectNodeContents(f).select():c!==
f?(b=d.getCellsRange(c,f),d.setSelected(b)):k&&k.selectNodeContents(f).select()):l(f,c,b)&&(f=d.getCell(d.indexTable[g.rowIndex][d.colsNum-1].rowIndex,d.indexTable[g.rowIndex][d.colsNum-1].cellIndex),b.shiftKey&&d.selectedTds.length?d.selectedTds[0]!==f?(b=d.getCellsRange(d.selectedTds[0],f),d.setSelected(b)):k&&k.selectNodeContents(f).select():c!==f?(b=d.getCellsRange(c,f),d.setSelected(b)):k&&k.selectNodeContents(f).select())}})});O(a,!0)}});d.on(y.document,"mousemove",g);d.on(y.document,"mouseout",
function(a){"TABLE"==(a.target||a.srcElement).tagName&&m(y,!1,"",null)});y.addListener("interlacetable",function(a,b,c){if(b){a=b.rows;b=a.length;for(var e=0;e<b;e++)a[e].className=(c||this.options.classList)[e]?(c||this.options.classList)[e]:(c||this.options.classList)[e%(c||this.options.classList).length]}});y.addListener("uninterlacetable",function(a,b){if(b)for(var c=b.rows,e=this.options.classList,f=c.length,g=0;g<f;g++)d.removeClasses(c[g],e)});y.addListener("mousedown",r);y.addListener("mouseup",
L);d.on(y.body,"dragstart",function(a){L.call(y,"dragstart",a)});var t=0;y.addListener("mousedown",function(){t=0});y.addListener("tabkeydown",function(){var a=this.selection.getRange(),c=a.getCommonAncestor(!0,!0),e=d.findParentByTagName(c,"table");if(e){if(d.findParentByTagName(c,"caption",!0))(c=d.getElementsByTagName(e,"th td"))&&c.length&&a.setStart(c[0],0).setCursor(!1,!0);else{var c=d.findParentByTagName(c,["td","th"],!0),f=M(c);t=1<c.rowSpan?t:f.getCellInfo(c).rowIndex;(c=f.getTabNextCell(c,
t))?b(c)?a.setStart(c,0).setCursor(!1,!0):a.selectNodeContents(c).select():(y.fireEvent("saveScene"),y.__hasEnterExecCommand=!0,this.execCommand("insertrownext"),y.__hasEnterExecCommand=!1,a=this.selection.getRange(),a.setStart(e.rows[e.rows.length-1].cells[0],0).setCursor(),y.fireEvent("saveScene"))}return!0}});q.ie&&y.addListener("selectionchange",function(){m(this,!1,"",null)});y.addListener("keydown",function(a,b){var c=b.keyCode||b.which;if(8!=c&&46!=c){(c=!b.ctrlKey&&!b.metaKey&&!b.shiftKey&&
!b.altKey)&&ia(d.getElementsByTagName(this.body,"td"));var e=C.getUETableBySelected(this);e&&c&&e.clearSelected()}});y.addListener("beforegetcontent",function(){O(this,!1);q.ie&&p.each(this.document.getElementsByTagName("caption"),function(a){d.isEmptyNode(a)&&(a.innerHTML="&nbsp;")})});y.addListener("aftergetcontent",function(){O(this,!0)});y.addListener("getAllHtml",function(){ia(y.document.getElementsByTagName("td"))});y.addListener("fullscreenchanged",function(a,b){if(!b){var c=this.body.offsetWidth/
document.body.offsetWidth,e=d.getElementsByTagName(this.body,"table");p.each(e,function(a){if(a.offsetWidth<y.body.offsetWidth)return!1;var b=d.getElementsByTagName(a,"td"),e=[];p.each(b,function(a){e.push(a.offsetWidth)});for(var f=0,g;g=b[f];f++)g.setAttribute("width",Math.floor(e[f]*c));a.setAttribute("width",Math.floor(Y(y,!0,C.getDefaultValue(y,void 0))))})}});var w=y.execCommand;y.execCommand=function(a,c){a=a.toLowerCase();var e=C.getUETableBySelected(this),f=new I.Range(this.document),g=this.commands[a]||
UE.commands[a],l;if(g){if(!e||ka[a]||g.notNeedUndo||this.__hasEnterExecCommand)l=w.apply(this,arguments);else{this.__hasEnterExecCommand=!0;this.fireEvent("beforeexeccommand",a);for(var e=e.selectedTds,k=g=-2,h,n,m=0,r;r=e[m];m++)if(b(r)?f.setStart(r,0).setCursor(!1,!0):f.selectNode(r).select(!0),n=this.queryCommandState(a),h=this.queryCommandValue(a),-1!=n){if(g!==n||k!==h)this._ignoreContentChange=!0,l=w.apply(this,arguments),this._ignoreContentChange=!1;g=this.queryCommandState(a);k=this.queryCommandValue(a);
d.isEmptyBlock(r)&&d.fillNode(this.document,r)}f.setStart(e[0],0).shrinkBoundary(!0).setCursor(!1,!0);this.fireEvent("contentchange");this.fireEvent("afterexeccommand",a);this.__hasEnterExecCommand=!1;this._selectionChange()}return l}}})};UE.UETable.prototype.sortTable=function(d,a){var e=this.table,b=e.rows,c=[],g="TH"===b[0].cells[0].tagName,f=0;if(this.selectedTds.length){for(var k=this.cellsRange,l=k.endRowIndex+1,m=k.beginRowIndex;m<l;m++)c[m]=b[m];c.splice(0,k.beginRowIndex);f=k.endRowIndex+
1===this.rowsNum?0:k.endRowIndex+1}else for(m=0,l=b.length;m<l;m++)c[m]=b[m];var n={reversecurrent:function(a,b){return 1},orderbyasc:function(a,b){return(a.innerText||a.textContent).localeCompare(b.innerText||b.textContent)},reversebyasc:function(a,b){return b.innerHTML.localeCompare(a.innerHTML)},orderbynum:function(a,b){var c=a[q.ie?"innerText":"textContent"].match(/\d+/),e=b[q.ie?"innerText":"textContent"].match(/\d+/);c&&(c=+c[0]);e&&(e=+e[0]);return(c||0)-(e||0)},reversebynum:function(a,b){var c=
a[q.ie?"innerText":"textContent"].match(/\d+/),e=b[q.ie?"innerText":"textContent"].match(/\d+/);c&&(c=+c[0]);e&&(e=+e[0]);return(e||0)-(c||0)}};e.setAttribute("data-sort-type",a&&"string"===typeof a&&n[a]?a:"");g&&c.splice(0,1);c=p.sort(c,function(b,c){return a&&"function"===typeof a?a.call(this,b.cells[d],c.cells[d]):a&&"number"===typeof a?1:a&&"string"===typeof a&&n[a]?n[a].call(this,b.cells[d],c.cells[d]):n.orderbyasc.call(this,b.cells[d],c.cells[d])});g=e.ownerDocument.createDocumentFragment();
m=0;for(l=c.length;m<l;m++)g.appendChild(c[m]);e=e.getElementsByTagName("tbody")[0];f?e.insertBefore(g,b[f-k.endRowIndex+k.beginRowIndex-1]):e.appendChild(g)};UE.plugins.tablesort=function(){var h=this,a=UE.UETable;h.ready(function(){p.cssRule("tablesort","table.sortEnabled tr.firstRow th,table.sortEnabled tr.firstRow td{padding-right:20px;background-repeat: no-repeat;background-position: center right;   background-image:url("+h.options.themePath+h.options.theme+"/images/sortable.png);}",h.document);
h.addListener("afterexeccommand",function(a,b){"mergeright"!=b&&"mergedown"!=b&&"mergecells"!=b||this.execCommand("disablesort")})});UE.commands.sorttable={queryCommandState:function(){var e=a.getTableItemsByRange(this);if(!e.cell)return-1;for(var e=e.table.getElementsByTagName("td"),b=0,c;c=e[b++];)if(1!=c.rowSpan||1!=c.colSpan)return-1;return 0},execCommand:function(e,b){var c=this.selection.getRange(),d=c.createBookmark(!0),f=a.getTableItemsByRange(this),k=f.cell,f=a.getUETable(f.table),k=f.getCellInfo(k);
f.sortTable(k.cellIndex,b);c.moveToBookmark(d);try{c.select()}catch(l){}}};UE.commands.enablesort=UE.commands.disablesort={queryCommandState:function(e){var b=a.getTableItemsByRange(this).table;if(b&&"enablesort"==e)for(var c=d.getElementsByTagName(b,"th td"),g=0;g<c.length;g++)if(1<c[g].getAttribute("colspan")||1<c[g].getAttribute("rowspan"))return-1;return b?"enablesort"==e^"sortEnabled"!=b.getAttribute("data-sort")?-1:0:-1},execCommand:function(e){var b=a.getTableItemsByRange(this).table;b.setAttribute("data-sort",
"enablesort"==e?"sortEnabled":"sortDisabled");"enablesort"==e?d.addClass(b,"sortEnabled"):d.removeClasses(b,"sortEnabled")}}};UE.plugins.contextmenu=function(){var h=this,a=h.getLang("contextMenu"),e,b=h.options.contextMenu||[{label:a.selectall,cmdName:"selectall"},{label:a.cleardoc,cmdName:"cleardoc",exec:function(){confirm(a.confirmclear)&&this.execCommand("cleardoc")}},"-",{label:a.unlink,cmdName:"unlink"},"-",{group:a.paragraph,icon:"justifyjustify",subMenu:[{label:a.justifyleft,cmdName:"justify",
value:"left"},{label:a.justifyright,cmdName:"justify",value:"right"},{label:a.justifycenter,cmdName:"justify",value:"center"},{label:a.justifyjustify,cmdName:"justify",value:"justify"}]},"-",{group:a.table,icon:"table",subMenu:[{label:a.inserttable,cmdName:"inserttable"},{label:a.deletetable,cmdName:"deletetable"},"-",{label:a.deleterow,cmdName:"deleterow"},{label:a.deletecol,cmdName:"deletecol"},{label:a.insertcol,cmdName:"insertcol"},{label:a.insertcolnext,cmdName:"insertcolnext"},{label:a.insertrow,
cmdName:"insertrow"},{label:a.insertrownext,cmdName:"insertrownext"},"-",{label:a.insertcaption,cmdName:"insertcaption"},{label:a.deletecaption,cmdName:"deletecaption"},{label:a.inserttitle,cmdName:"inserttitle"},{label:a.deletetitle,cmdName:"deletetitle"},{label:a.inserttitlecol,cmdName:"inserttitlecol"},{label:a.deletetitlecol,cmdName:"deletetitlecol"},"-",{label:a.mergecells,cmdName:"mergecells"},{label:a.mergeright,cmdName:"mergeright"},{label:a.mergedown,cmdName:"mergedown"},"-",{label:a.splittorows,
cmdName:"splittorows"},{label:a.splittocols,cmdName:"splittocols"},{label:a.splittocells,cmdName:"splittocells"},"-",{label:a.averageDiseRow,cmdName:"averagedistributerow"},{label:a.averageDisCol,cmdName:"averagedistributecol"},"-",{label:a.edittd,cmdName:"edittd",exec:function(){UE.ui.edittd&&new UE.ui.edittd(this);this.getDialog("edittd").open()}},{label:a.edittable,cmdName:"edittable",exec:function(){UE.ui.edittable&&new UE.ui.edittable(this);this.getDialog("edittable").open()}},{label:a.setbordervisible,
cmdName:"setbordervisible"}]},{group:a.tablesort,icon:"tablesort",subMenu:[{label:a.enablesort,cmdName:"enablesort"},{label:a.disablesort,cmdName:"disablesort"},"-",{label:a.reversecurrent,cmdName:"sorttable",value:"reversecurrent"},{label:a.orderbyasc,cmdName:"sorttable",value:"orderbyasc"},{label:a.reversebyasc,cmdName:"sorttable",value:"reversebyasc"},{label:a.orderbynum,cmdName:"sorttable",value:"orderbynum"},{label:a.reversebynum,cmdName:"sorttable",value:"reversebynum"}]},{group:a.borderbk,
icon:"borderBack",subMenu:[{label:a.setcolor,cmdName:"interlacetable",exec:function(){this.execCommand("interlacetable")}},{label:a.unsetcolor,cmdName:"uninterlacetable",exec:function(){this.execCommand("uninterlacetable")}},{label:a.setbackground,cmdName:"settablebackground",exec:function(){this.execCommand("settablebackground",{repeat:!0,colorList:["#bbb","#ccc"]})}},{label:a.unsetbackground,cmdName:"cleartablebackground",exec:function(){this.execCommand("cleartablebackground")}},{label:a.redandblue,
cmdName:"settablebackground",exec:function(){this.execCommand("settablebackground",{repeat:!0,colorList:["red","blue"]})}},{label:a.threecolorgradient,cmdName:"settablebackground",exec:function(){this.execCommand("settablebackground",{repeat:!0,colorList:["#aaa","#bbb","#ccc"]})}}]},{group:a.aligntd,icon:"aligntd",subMenu:[{cmdName:"cellalignment",value:{align:"left",vAlign:"top"}},{cmdName:"cellalignment",value:{align:"center",vAlign:"top"}},{cmdName:"cellalignment",value:{align:"right",vAlign:"top"}},
{cmdName:"cellalignment",value:{align:"left",vAlign:"middle"}},{cmdName:"cellalignment",value:{align:"center",vAlign:"middle"}},{cmdName:"cellalignment",value:{align:"right",vAlign:"middle"}},{cmdName:"cellalignment",value:{align:"left",vAlign:"bottom"}},{cmdName:"cellalignment",value:{align:"center",vAlign:"bottom"}},{cmdName:"cellalignment",value:{align:"right",vAlign:"bottom"}}]},{group:a.aligntable,icon:"aligntable",subMenu:[{cmdName:"tablealignment",className:"left",label:a.tableleft,value:"left"},
{cmdName:"tablealignment",className:"center",label:a.tablecenter,value:"center"},{cmdName:"tablealignment",className:"right",label:a.tableright,value:"right"}]},"-",{label:a.insertparagraphbefore,cmdName:"insertparagraph",value:!0},{label:a.insertparagraphafter,cmdName:"insertparagraph"},{label:a.copy,cmdName:"copy",exec:function(){alert(a.copymsg)},query:function(){return 0}},{label:a.paste,cmdName:"paste",exec:function(){alert(a.pastemsg)},query:function(){return 0}}];if(b.length){var c=UE.ui.uiUtils;
h.addListener("contextmenu",function(g,f){var k=c.getViewportOffsetByEvent(f);h.fireEvent("beforeselectionchange");e&&e.destroy();for(var l=0,m,n=[];m=b[l];l++){var r;(function(b){if("-"==b)(r=n[n.length-1])&&"-"!==r&&n.push("-");else if(b.hasOwnProperty("group")){for(var c=0,e,d=[];e=b.subMenu[c];c++)(function(a){"-"==a?(r=d[d.length-1])&&"-"!==r?d.push("-"):d.splice(d.length-1):(h.commands[a.cmdName]||UE.commands[a.cmdName]||a.query)&&-1<(a.query?a.query():h.queryCommandState(a.cmdName))&&d.push({label:a.label||
h.getLang("contextMenu."+a.cmdName+(a.value||""))||"",className:"edui-for-"+a.cmdName+(a.className?" edui-for-"+a.cmdName+"-"+a.className:""),onclick:a.exec?function(){a.exec.call(h)}:function(){h.execCommand(a.cmdName,a.value)}})})(e);d.length&&n.push({label:function(){switch(b.icon){case "table":return h.getLang("contextMenu.table");case "justifyjustify":return h.getLang("contextMenu.paragraph");case "aligntd":return h.getLang("contextMenu.aligntd");case "aligntable":return h.getLang("contextMenu.aligntable");
case "tablesort":return a.tablesort;case "borderBack":return a.borderbk;default:return""}}(),className:"edui-for-"+b.icon,subMenu:{items:d,editor:h}})}else(h.commands[b.cmdName]||UE.commands[b.cmdName]||b.query)&&-1<(b.query?b.query.call(h):h.queryCommandState(b.cmdName))&&n.push({label:b.label||h.getLang("contextMenu."+b.cmdName),className:"edui-for-"+(b.icon?b.icon:b.cmdName+(b.value||"")),onclick:b.exec?function(){b.exec.call(h)}:function(){h.execCommand(b.cmdName,b.value)}})})(m)}"-"==n[n.length-
1]&&n.pop();e=new UE.ui.Menu({items:n,className:"edui-contextmenu",editor:h});e.render();e.showAt(k);h.fireEvent("aftershowcontextmenu",e);d.preventDefault(f);if(q.ie){var t;try{t=h.selection.getNative().createRange()}catch(p){return}t.item&&(new I.Range(h.document)).selectNode(t.item(0)).select(!0,!0)}})}};UE.plugins.shortcutmenu=function(){var h,a=this.options.shortcutMenu||[];a.length&&(this.addListener("contextmenu mouseup",function(e,b){var c=this,g={type:e,target:b.target||b.srcElement,screenX:b.screenX,
screenY:b.screenY,clientX:b.clientX,clientY:b.clientY};setTimeout(function(){if(!1===c.selection.getRange().collapsed||"contextmenu"==e)h||(h=new s.editor.ui.ShortCutMenu({editor:c,items:a,theme:c.options.theme,className:"edui-shortcutmenu"}),h.render(),c.fireEvent("afterrendershortcutmenu",h)),h.show(g,!!UE.plugins.contextmenu)});if("contextmenu"==e&&(d.preventDefault(b),q.ie9below)){var f;try{f=c.selection.getNative().createRange()}catch(k){return}f.item&&(new I.Range(c.document)).selectNode(f.item(0)).select(!0,
!0)}}),this.addListener("keydown",function(a){"keydown"==a&&h&&!h.isHidden&&h.hide()}))};UE.plugins.basestyle=function(){var h={bold:["strong","b"],italic:["em","i"],subscript:["sub"],superscript:["sup"]},a=this;a.addshortcutkey({Bold:"ctrl+66",Italic:"ctrl+73",Underline:"ctrl+85"});a.addInputRule(function(a){p.each(a.getNodesByTagName("b i"),function(a){switch(a.tagName){case "b":a.tagName="strong";break;case "i":a.tagName="em"}})});for(var e in h)(function(b,c){a.commands[b]={execCommand:function(b){var e=
a.selection.getRange(),k=d.filterNodeList(this.selection.getStartElementPath(),c);if(e.collapsed){if(k)b=a.document.createTextNode(""),e.insertNode(b).removeInlineStyle(c),e.setStartBefore(b),d.remove(b);else{k=e.document.createElement(c[0]);if("superscript"==b||"subscript"==b)b=a.document.createTextNode(""),e.insertNode(b).removeInlineStyle(["sub","sup"]).setStartBefore(b).collapse(!0);e.insertNode(k).setStart(k,0)}e.collapse(!0)}else{if("superscript"==b||"subscript"==b)k&&k.tagName.toLowerCase()==
b||e.removeInlineStyle(["sub","sup"]);k?e.removeInlineStyle(c):e.applyInlineStyle(c[0])}e.select()},queryCommandState:function(){return d.filterNodeList(this.selection.getStartElementPath(),c)?1:0}}})(e,h[e])};UE.plugins.elementpath=function(){var d,a,e=this;e.setOpt("elementPathEnabled",!0);e.options.elementPathEnabled&&(e.commands.elementpath={execCommand:function(b,c){var g=a[c],f=e.selection.getRange();d=1*c;f.selectNode(g).select()},queryCommandValue:function(){var b=[].concat(this.selection.getStartElementPath()).reverse(),
c=[];a=b;for(var e=0,f;f=b[e];e++)if(3!=f.nodeType){var k=f.tagName.toLowerCase();"img"==k&&f.getAttribute("anchorname")&&(k="anchor");c[e]=k;if(d==e){d=-1;break}}return c}})};UE.plugins.formatmatch=function(){function h(g,f){if(q.webkit)var k="IMG"==f.target.tagName?f.target:null;a.undoManger&&a.undoManger.save();var l=a.selection.getRange(),k=k||l.getClosedNode();if(b&&k&&"IMG"==k.tagName)k.style.cssText+=";float:"+(b.style.cssFloat||b.style.styleFloat||"none")+";display:"+(b.style.display||"inline"),
b=null;else if(!b){if(l.collapsed){var m=a.document.createTextNode("match");l.insertNode(m).select()}a.__hasEnterExecCommand=!0;l=a.options.removeFormatAttributes;a.options.removeFormatAttributes="";a.execCommand("removeformat");a.options.removeFormatAttributes=l;a.__hasEnterExecCommand=!1;l=a.selection.getRange();e.length&&(k=l,m&&k.selectNode(m),k.applyInlineStyle(e[e.length-1].tagName,null,e));m&&l.setStartBefore(m).collapse(!0);l.select();m&&d.remove(m)}a.undoManger&&a.undoManger.save();a.removeListener("mouseup",
h);c=0}var a=this,e=[],b,c=0;a.addListener("reset",function(){e=[];c=0});a.commands.formatmatch={execCommand:function(g){if(c)c=0,e=[],a.removeListener("mouseup",h);else{g=a.selection.getRange();b=g.getClosedNode();if(!b||"IMG"!=b.tagName){g.collapse(!0).shrinkBoundary();e=d.findParents(g.startContainer,!0,function(a){return!d.isBlockElm(a)&&1==a.nodeType});g=0;for(var f;f=e[g];g++)if("A"==f.tagName){e.splice(g,1);break}}a.addListener("mouseup",h);c=1}},queryCommandState:function(){return c},notNeedUndo:1}};
UE.plugin.register("searchreplace",function(){function h(a,b,e){var k=0;a=a.firstChild;for(var l=0;a;){if(3==a.nodeType){if(l=a.nodeValue.replace(/(^[\t\r\n]+)|([\t\r\n]+$)/,"").length,k+=l,k>=b)return{node:a,index:l-(k-b)}}else if(!v.$empty[a.tagName]&&(l=a[q.ie?"innerText":"textContent"].replace(/(^[\t\r\n]+)|([\t\r\n]+$)/,"").length,k+=l,k>=b&&(l=h(a,l-(k-b),e))))return l;a=d.getNextDomNode(a)}}function a(a,b){var f=a.selection.getRange(),k,l=b.searchStr,m=a.document.createElement("span");m.innerHTML=
"$$ueditor_searchreplace_key$$";if(!f.collapsed){f.select();var n=a.selection.getText();if(RegExp("^"+b.searchStr+"$",b.casesensitive?"":"i").test(n)){if(void 0!=b.replaceStr)return e(f,b.replaceStr),f.select(),!0;f.collapse(-1==b.dir)}}f.insertNode(m);f.enlargeToBlockElm(!0);k=f.startContainer;n=k[q.ie?"innerText":"textContent"].indexOf("$$ueditor_searchreplace_key$$");f.setStartBefore(m);d.remove(m);a:{var m=k,r;k=b.all||1==b.dir?"getNextDomNode":"getPreDomNode";d.isBody(m)&&(m=m.firstChild);for(;m;){r=
3==m.nodeType?m.nodeValue:m[q.ie?"innerText":"textContent"];b:{var t=b,p=n,w=t.searchStr;-1==t.dir&&(r=r.split("").reverse().join(""),w=w.split("").reverse().join(""),p=r.length-p);for(var w=RegExp(w,"g"+(t.casesensitive?"":"i")),u=void 0;u=w.exec(r);)if(u.index>=p){r=-1==t.dir?r.length-u.index-t.searchStr.length:u.index;break b}r=-1}if(-1!=r){n={node:m,index:r};break a}(m=d[k](m))&&(n=-1==b.dir?(3==m.nodeType?m.nodeValue:m[q.ie?"innerText":"textContent"]).length:0)}n=void 0}if(n)return m=h(n.node,
n.index,l),l=h(n.node,n.index+l.length,l),f.setStart(m.node,m.index).setEnd(l.node,l.index),void 0!==b.replaceStr&&e(f,b.replaceStr),f.select(),!0;f.setCursor()}function e(a,e){b.fireEvent("saveScene");e=b.document.createTextNode(e);a.deleteContents().insertNode(e);b.fireEvent("saveScene")}var b=this;return{commands:{searchreplace:{execCommand:function(c,e){p.extend(e,{all:!1,casesensitive:!1,dir:1},!0);var d=0;if(e.all){var k=b.selection.getRange(),l=b.body.firstChild;l&&1==l.nodeType?k.setStart(l,
0):3==l.nodeType&&k.setStartBefore(l);for(k.collapse(!0).select(!0);a(this,e);)d++}else a(this,e)&&d++;return d},notNeedUndo:1}}}});UE.plugins.customstyle=function(){var h=this;h.setOpt({customstyle:[{tag:"h1",name:"tc",style:"font-size:32px;font-weight:bold;border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:center;margin:0 0 20px 0;"},{tag:"h1",name:"tl",style:"font-size:32px;font-weight:bold;border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:left;margin:0 0 10px 0;"},{tag:"span",name:"im",
style:"font-size:16px;font-style:italic;font-weight:bold;line-height:18px;"},{tag:"span",name:"hi",style:"font-size:16px;font-style:italic;font-weight:bold;color:rgb(51, 153, 204);line-height:18px;"}]});h.commands.customstyle={execCommand:function(a,e){var b=e.tag,c=d.findParent(this.selection.getStart(),function(a){return a.getAttribute("label")},!0),g,f,k={};for(g in e)void 0!==e[g]&&(k[g]=e[g]);delete k.tag;if(c&&c.getAttribute("label")==e.label){g=this.selection.getRange();f=g.createBookmark();
if(g.collapsed)if(v.$block[c.tagName]){var l=this.document.createElement("p");d.moveChild(c,l);c.parentNode.insertBefore(l,c);d.remove(c)}else d.remove(c,!0);else{c=d.getCommonAncestor(f.start,f.end);k=d.getElementsByTagName(c,b);RegExp(b,"i").test(c.tagName)&&k.push(c);for(var h=0,n;n=k[h++];)if(n.getAttribute("label")==e.label){var l=d.getPosition(n,f.start),r=d.getPosition(n,f.end);(l&d.POSITION_FOLLOWING||l&d.POSITION_CONTAINS)&&(r&d.POSITION_PRECEDING||r&d.POSITION_CONTAINS)&&v.$block[b]&&(l=
this.document.createElement("p"),d.moveChild(n,l),n.parentNode.insertBefore(l,n));d.remove(n,!0)}(c=d.findParent(c,function(a){return a.getAttribute("label")==e.label},!0))&&d.remove(c,!0)}g.moveToBookmark(f).select()}else v.$block[b]?(this.execCommand("paragraph",b,k,"customstyle"),g=this.selection.getRange(),g.collapsed||(g.collapse(),c=d.findParent(this.selection.getStart(),function(a){return a.getAttribute("label")==e.label},!0),b=this.document.createElement("p"),d.insertAfter(c,b),d.fillNode(this.document,
b),g.setStart(b,0).setCursor())):(g=this.selection.getRange(),g.collapsed?(c=this.document.createElement(b),d.setAttributes(c,k),g.insertNode(c).setStart(c,0).setCursor()):(f=g.createBookmark(),g.applyInlineStyle(b,k).moveToBookmark(f).select()))},queryCommandValue:function(){var a=d.filterNodeList(this.selection.getStartElementPath(),function(a){return a.getAttribute("label")});return a?a.getAttribute("label"):""}};h.addListener("keyup",function(a,e){var b=e.keyCode||e.which;if(32==b||13==b)if(b=
h.selection.getRange(),b.collapsed){var c=d.findParent(h.selection.getStart(),function(a){return a.getAttribute("label")},!0);if(c&&v.$block[c.tagName]&&d.isEmptyNode(c)){var g=h.document.createElement("p");d.insertAfter(c,g);d.fillNode(h.document,g);d.remove(c);b.setStart(g,0).setCursor()}}})};UE.plugins.catchremoteimage=function(){function h(b,d){var l=b.join(g),h={timeout:6E4,onsuccess:d.success,onerror:d.error};h[a.options.catchFieldName]=l;e.request(c,h)}if(!1!==this.options.catchRemoteImageEnable){var a=
this;this.setOpt({localDomain:["127.0.0.1","localhost","img.baidu.com"],separater:"ue_separate_ue",catchFieldName:"upfile",catchRemoteImageEnable:!0});var e=UE.ajax,b=a.options.localDomain,c=a.options.catcherUrl,g=a.options.separater;a.addListener("afterpaste",function(){a.fireEvent("catchRemoteImage")});a.addListener("catchRemoteImage",function(){for(var c=[],e=d.getElementsByTagName(a.document,"img"),l=function(a,b){for(var c=0,e;e=b[c++];)if(-1!==a.indexOf(e))return!0;return!1},m=0,n;n=e[m++];)n.getAttribute("word_img")||
(n=n.getAttribute("_src")||n.src||"",/^(https?|ftp):/i.test(n)&&!l(n,b)&&c.push(n));c.length&&h(c,{success:function(b){try{var c=eval("("+b.responseText+")")}catch(f){return}b=c.srcUrl.split(g);for(var c=c.url.split(g),l=0,h;h=e[l++];)for(var n=h.getAttribute("_src")||h.src||"",m=0,p;p=b[m++];){var q=c[m-1];if(n==p&&"error"!=q){n=a.options.catcherPath+q;d.setAttributes(h,{src:n,_src:n});break}}a.fireEvent("catchremotesuccess")},error:function(){a.fireEvent("catchremoteerror")}})})}};UE.plugins.snapscreen=
function(){var d,a;this.setOpt({snapscreenServerPort:location.port,snapscreenImgAlign:"",snapscreenHost:location.hostname});this.commands.snapscreen={execCommand:function(){var e=this,b=e.getLang("snapScreen_plugin");if(!a){var c=e.container;d=c.ownerDocument||c.document;a=d.createElement("object");try{a.type="application/x-pluginbaidusnap"}catch(g){return}a.style.cssText="position:absolute;left:-9999px;";a.setAttribute("width","0");a.setAttribute("height","0");c.appendChild(a)}var f=e.options,c=
function(a){try{a=eval("("+a+")")}catch(c){alert(b.callBackErrorMsg);return}"SUCCESS"!=a.state?alert(a.state):e.execCommand("insertimage",{src:f.snapscreenPath+a.url,floatStyle:f.snapscreenImgAlign,_src:f.snapscreenPath+a.url})};try{var k=f.snapscreenServerPort+"";f.snapscreenServerUrl=f.snapscreenServerUrl.split(f.snapscreenHost);f.snapscreenServerUrl=f.snapscreenServerUrl[1]||f.snapscreenServerUrl[0];0===f.snapscreenServerUrl.indexOf(":"+k)&&(f.snapscreenServerUrl=f.snapscreenServerUrl.substring(k.length+
1));var l=a.saveSnapshot(f.snapscreenHost,f.snapscreenServerUrl,k);c(l)}catch(m){e.ui._dialogs.snapscreenDialog.open()}}}};UE.commands.insertparagraph={execCommand:function(h,a){for(var e=this.selection.getRange(),b=e.startContainer,c;b&&!d.isBody(b);)c=b,b=b.parentNode;c&&(b=this.document.createElement("p"),a?c.parentNode.insertBefore(b,c):c.parentNode.insertBefore(b,c.nextSibling),d.fillNode(this.document,b),e.setStart(b,0).setCursor(!1,!0))}};UE.plugin.register("webapp",function(){function d(e,
b){return b?'<iframe class="edui-faked-webapp" title="'+e.title+'" '+(e.align&&!e.cssfloat?'align="'+e.align+'"':"")+(e.cssfloat?'style="float:'+e.cssfloat+'"':"")+'width="'+e.width+'" height="'+e.height+'"  scrolling="no" frameborder="0" src="'+e.url+'" logo_url = "'+e.logo+'"></iframe>':'<img title="'+e.title+'" width="'+e.width+'" height="'+e.height+'" src="'+a.options.UEDITOR_HOME_URL+'themes/default/images/spacer.gif" _logo_url="'+e.logo+'" style="background:url('+e.logo+') no-repeat center center; border:1px solid gray;" class="edui-faked-webapp" _url="'+
e.url+'" '+(e.align&&!e.cssfloat?'align="'+e.align+'"':"")+(e.cssfloat?'style="float:'+e.cssfloat+'"':"")+"/>"}var a=this;return{outputRule:function(a){p.each(a.getNodesByTagName("img"),function(a){var c;"edui-faked-webapp"==a.getAttr("class")&&(c=d({title:a.getAttr("title"),width:a.getAttr("width"),height:a.getAttr("height"),align:a.getAttr("align"),cssfloat:a.getStyle("float"),url:a.getAttr("_url"),logo:a.getAttr("_logo_url")},!0),c=UE.uNode.createElement(c),a.parentNode.replaceChild(c,a))})},inputRule:function(a){p.each(a.getNodesByTagName("iframe"),
function(a){if("edui-faked-webapp"==a.getAttr("class")){var c=UE.uNode.createElement(d({title:a.getAttr("title"),width:a.getAttr("width"),height:a.getAttr("height"),align:a.getAttr("align"),cssfloat:a.getStyle("float"),url:a.getAttr("src"),logo:a.getAttr("logo_url")}));a.parentNode.replaceChild(c,a)}})},commands:{webapp:{execCommand:function(a,b){var c=d(p.extend(b,{align:"none"}),!1);this.execCommand("inserthtml",c)},queryCommandState:function(){var a=this.selection.getRange().getClosedNode();return a&&
"edui-faked-webapp"==a.className?1:0}}}}});UE.plugins.template=function(){UE.commands.template={execCommand:function(d,a){a.html&&this.execCommand("inserthtml",a.html)}};this.addListener("click",function(h,a){var e=a.target||a.srcElement,b=this.selection.getRange();(e=d.findParent(e,function(a){if(a.className&&d.hasClass(a,"ue_t"))return a},!0))&&b.selectNode(e).shrinkBoundary().select()});this.addListener("keydown",function(h,a){var e=this.selection.getRange();e.collapsed||(a.ctrlKey||a.metaKey||
a.shiftKey||a.altKey)||(e=d.findParent(e.startContainer,function(a){if(a.className&&d.hasClass(a,"ue_t"))return a},!0))&&d.removeClasses(e,["ue_t"])})};UE.plugin.register("music",function(){function d(e,b,c,g,f,k){return k?'<embed type="application/x-shockwave-flash" class="edui-faked-music" pluginspage="http://www.macromedia.com/go/getflashplayer" src="'+e+'" width="'+b+'" height="'+c+'" '+(g&&!f?'align="'+g+'"':"")+(f?'style="float:'+f+'"':"")+' wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" >':
"<img "+(g&&!f?'align="'+g+'"':"")+(f?'style="float:'+f+'"':"")+' width="'+b+'" height="'+c+'" _url="'+e+'" class="edui-faked-music" src="'+a.options.langPath+a.options.lang+'/images/music.png" />'}var a=this;return{outputRule:function(a){p.each(a.getNodesByTagName("img"),function(a){var c;if("edui-faked-music"==a.getAttr("class")){c=a.getStyle("float");var e=a.getAttr("align");c=d(a.getAttr("_url"),a.getAttr("width"),a.getAttr("height"),e,c,!0);c=UE.uNode.createElement(c);a.parentNode.replaceChild(c,
a)}})},inputRule:function(a){p.each(a.getNodesByTagName("embed"),function(a){if("edui-faked-music"==a.getAttr("class")){var c=a.getStyle("float"),e=a.getAttr("align");html=d(a.getAttr("src"),a.getAttr("width"),a.getAttr("height"),e,c,!1);c=UE.uNode.createElement(html);a.parentNode.replaceChild(c,a)}})},commands:{music:{execCommand:function(a,b){var c=d(b.url,b.width||400,b.height||95,"none",!1);this.execCommand("inserthtml",c)},queryCommandState:function(){var a=this.selection.getRange().getClosedNode();
return a&&"edui-faked-music"==a.className?1:0}}}}});UE.plugin.register("autoupload",function(){var h=this,a=function(a,b){var c=new FormData;c.append(b.options.imageFieldName||"upfile",a,a.name||"blob."+a.type.substr(6));c.append("type","ajax");var d=new XMLHttpRequest;d.open("post",h.options.imageUrl,!0);d.setRequestHeader("X-Requested-With","XMLHttpRequest");d.addEventListener("load",function(a){try{var c=(new Function("return "+a.target.response))(),e=h.options.imagePath+c.url;b.execCommand("insertimage",
{src:e,_src:e})}catch(d){}});d.send(c)};return{bindEvents:{ready:function(e){window.FormData&&window.FileReader&&(d.on(h.body,"paste drop",function(b){var c=!1,e;if(e="paste"==b.type?b.clipboardData&&b.clipboardData.items&&1==b.clipboardData.items.length&&/^image\//.test(b.clipboardData.items[0].type)?b.clipboardData.items:null:b.dataTransfer&&b.dataTransfer.files?b.dataTransfer.files:null){for(var d=e.length,k;d--;)k=e[d],k.getAsFile&&(k=k.getAsFile()),k&&(0<k.size&&/image\/\w+/i.test(k.type))&&
(a(k,h),c=!0);c&&b.preventDefault()}}),d.on(h.body,"dragover",function(a){"Files"==a.dataTransfer.types[0]&&a.preventDefault()}))}}}});UE.plugin.register("autosave",function(){function d(f){var k=null;new Date-e<b||(f.hasContents()?(e=new Date,f._saveFlag=null,k=a.body.innerHTML,!1!==f.fireEvent("beforeautosave",{content:k})&&(g.saveLocalData(c,k),f.fireEvent("afterautosave",{content:k}))):c&&g.removeItem(c))}var a=this,e=new Date,b=20,c=null,g=UE.LocalStorage=function(){function a(){var b=document.createElement("div");
b.style.display="none";if(!b.addBehavior)return null;b.addBehavior("#default#userdata");return{getItem:function(a){var e=null;try{document.body.appendChild(b),b.load(c),e=b.getAttribute(a),document.body.removeChild(b)}catch(d){}return e},setItem:function(a,e){document.body.appendChild(b);b.setAttribute(a,e);b.save(c);document.body.removeChild(b)},removeItem:function(a){document.body.appendChild(b);b.removeAttribute(a);b.save(c);document.body.removeChild(b)}}}var b=window.localStorage||a()||null,c=
"localStorage";return{saveLocalData:function(a,c){return b&&c?(b.setItem(a,c),!0):!1},getLocalData:function(a){return b?b.getItem(a):null},removeItem:function(a){b&&b.removeItem(a)}}}();return{defaultOptions:{saveInterval:500},bindEvents:{ready:function(){var b=null,b=a.key?a.key+"-drafts-data":(a.container.parentNode.id||"ue-common")+"-drafts-data";c=(location.protocol+location.host+location.pathname).replace(/[.:\/]/g,"_")+b},contentchange:function(){c&&(a._saveFlag&&window.clearTimeout(a._saveFlag),
0<a.options.saveInterval?a._saveFlag=window.setTimeout(function(){d(a)},a.options.saveInterval):d(a))}},commands:{clearlocaldata:{execCommand:function(a,b){c&&g.getLocalData(c)&&g.removeItem(c)},notNeedUndo:!0,ignoreContentChange:!0},getlocaldata:{execCommand:function(a,b){return c?g.getLocalData(c)||"":""},notNeedUndo:!0,ignoreContentChange:!0},drafts:{execCommand:function(b,e){c&&(a.body.innerHTML=g.getLocalData(c)||"<p>"+(q.ie?"&nbsp;":"<br/>")+"</p>",a.focus(!0))},queryCommandState:function(){return c?
null===g.getLocalData(c)?-1:0:-1},notNeedUndo:!0,ignoreContentChange:!0}}}});UE.plugin.register("charts",function(){function h(a){var b=null,c=0;if(2>a.rows.length||2>a.rows[0].cells.length)return!1;for(var b=a.rows[0].cells,c=b.length,d=0,f;f=b[d];d++)if("th"!==f.tagName.toLowerCase())return!1;for(d=1;b=a.rows[d];d++){if(b.cells.length!=c||"th"!==b.cells[0].tagName.toLowerCase())return!1;for(var k=1;f=b.cells[k];k++)if(f=p.trim(f.innerText||f.textContent||""),f=f.replace(RegExp(UE.dom.domUtils.fillChar,
"g"),"").replace(/^\s+|\s+$/g,""),!/^\d*\.?\d+$/.test(f))return!1}return!0}var a=this;return{bindEvents:{chartserror:function(){}},commands:{charts:{execCommand:function(e,b){var c=d.findParentByTagName(this.selection.getRange().startContainer,"table",!0),g=[],f={};if(!c)return!1;if(!h(c))return a.fireEvent("chartserror"),!1;f.title=b.title||"";f.subTitle=b.subTitle||"";f.xTitle=b.xTitle||"";f.yTitle=b.yTitle||"";f.suffix=b.suffix||"";f.tip=b.tip||"";f.dataFormat=b.tableDataFormat||"";f.chartType=
b.chartType||0;for(var k in f)f.hasOwnProperty(k)&&g.push(k+":"+f[k]);c.setAttribute("data-chart",g.join(";"));d.addClass(c,"edui-charts-table")},queryCommandState:function(a,b){var c=d.findParentByTagName(this.selection.getRange().startContainer,"table",!0);return c&&h(c)?0:-1}}},inputRule:function(a){p.each(a.getNodesByTagName("table"),function(a){void 0!==a.getAttr("data-chart")&&a.setAttr("style")})},outputRule:function(a){p.each(a.getNodesByTagName("table"),function(a){void 0!==a.getAttr("data-chart")&&
a.setAttr("style","display: none;")})}}});UE.plugin.register("section",function(){function h(a){this.tag="";this.level=-1;this.parentSection=this.previousSection=this.nextSection=this.dom=null;this.startAddress=[];this.endAddress=[];this.children=[]}function a(a){var b=new h;return p.extend(b,a)}function e(a,b){for(var e=b,d=0;d<a.length;d++){if(!e.childNodes)return null;e=e.childNodes[a[d]]}return e}var b=this;return{bindMultiEvents:{type:"aftersetcontent afterscencerestore",handler:function(){b.fireEvent("updateSections")}},
bindEvents:{ready:function(){b.fireEvent("updateSections");d.on(b.body,"drop paste",function(){b.fireEvent("updateSections")})},afterexeccommand:function(a,e){"paragraph"==e&&b.fireEvent("updateSections")},keyup:function(a,b){if(!0!=this.selection.getRange().collapsed)this.fireEvent("updateSections");else{var e=b.keyCode||b.which;13!=e&&8!=e&&46!=e||this.fireEvent("updateSections")}}},commands:{getsections:{execCommand:function(b,e){function d(b,c){for(var e,l=null,g,q=b.childNodes,s=0,v=q.length;s<
v;s++){g=q[s];a:{e=g;for(var L=0;L<k.length;L++)if(k[L](e)){e=L;break a}e=-1}if(0<=e){l=h.selection.getRange().selectNode(g).createAddress(!0).startAddress;l=a({tag:g.tagName,title:g.innerText||g.textContent||"",level:e,dom:g,startAddress:p.clone(l,[]),endAddress:p.clone(l,[]),children:[]});n.nextSection=l;for(g=l.previousSection=n;e<=g.level;)g=g.parentSection;l.parentSection=g;g.children.push(l);l=n=l}else 1===g.nodeType&&d(g,c),l&&l.endAddress[l.endAddress.length-1]++}}for(var k=e||"h1 h2 h3 h4 h5 h6".split(" "),
l=0;l<k.length;l++)"string"==typeof k[l]?k[l]=function(a){return function(b){return b.tagName==a.toUpperCase()}}(k[l]):"function"!=typeof k[l]&&(k[l]=function(a){return null});var h=this,n=l=a({level:-1,title:"root"});d(h.body,l);return l},notNeedUndo:!0},movesection:{execCommand:function(a,b,f,k){if(b&&f&&-1!=f.level){f=k?f.endAddress:f.startAddress;a=e(f,this.body);var l;if(!(l=!f)&&!(l=!a)){l=b.startAddress;for(var h=!1,n=!1,r=0;r<l.length&&!(r>=f.length);r++)if(f[r]>l[r]){h=!0;break}else if(f[r]<
l[r])break;for(r=0;r<b.endAddress.length&&!(r>=f.length);r++)if(f[r]<l[r]){n=!0;break}else if(f[r]>l[r])break;l=h&&n}if(!l){f=e(b.startAddress,this.body);b=e(b.endAddress,this.body);if(k)for(k=b;k&&!(d.getPosition(f,k)&d.POSITION_FOLLOWING);){l=k.previousSibling;d.insertAfter(a,k);if(k==f)break;k=l}else for(k=f;k&&!(d.getPosition(k,b)&d.POSITION_FOLLOWING);){l=k.nextSibling;a.parentNode.insertBefore(k,a);if(k==b)break;k=l}this.fireEvent("updateSections")}}}},deletesection:{execCommand:function(a,
b,e){function k(a){for(var b=l.body,c=0;c<a.length;c++){if(!b.childNodes)return null;b=b.childNodes[a[c]]}return b}var l=this;if(b){a=k(b.startAddress);b=k(b.endAddress);if(e)d.remove(a);else for(;a&&d.inDoc(b,l.document)&&!(d.getPosition(a,b)&d.POSITION_FOLLOWING);)e=a.nextSibling,d.remove(a),a=e;l.fireEvent("updateSections")}}},selectsection:{execCommand:function(a,b){if(!b&&!b.dom)return!1;var e=this.selection.getRange(),d={startAddress:p.clone(b.startAddress,[]),endAddress:p.clone(b.endAddress,
[])};d.endAddress[d.endAddress.length-1]++;e.moveToAddress(d).select().scrollToView();return!0},notNeedUndo:!0},scrolltosection:{execCommand:function(a,b){if(!b&&!b.dom)return!1;var e=this.selection.getRange(),d={startAddress:b.startAddress,endAddress:b.endAddress};d.endAddress[d.endAddress.length-1]++;e.moveToAddress(d).scrollToView();return!0},notNeedUndo:!0}}}});s=s||{};s.editor=s.editor||{};s.editor.ui={};(function(){function d(){var a=document.getElementById("edui_fixedlayer");g.setViewportOffset(a,
{left:0,top:0})}var a=s.editor.browser,e=s.editor.dom.domUtils,b=window.$EDITORUI={},c=0,g=s.editor.ui.uiUtils={uid:function(a){return a?a.ID$EDITORUI||(a.ID$EDITORUI=++c):++c},hook:function(a,b){var c;a&&a._callbacks?c=a:(c=function(){var b;a&&(b=a.apply(this,arguments));for(var e=c._callbacks,d=e.length;d--;){var g=e[d].apply(this,arguments);void 0===b&&(b=g)}return b},c._callbacks=[]);c._callbacks.push(b);return c},createElementByHtml:function(a){var b=document.createElement("div");b.innerHTML=
a;b=b.firstChild;b.parentNode.removeChild(b);return b},getViewportElement:function(){return a.ie&&a.quirks?document.body:document.documentElement},getClientRect:function(a){var b;try{b=a.getBoundingClientRect()}catch(c){b={left:0,top:0,height:0,width:0}}for(var d={left:Math.round(b.left),top:Math.round(b.top),height:Math.round(b.bottom-b.top),width:Math.round(b.right-b.left)},g;(g=a.ownerDocument)!==document&&(a=e.getWindow(g).frameElement);)b=a.getBoundingClientRect(),d.left+=b.left,d.top+=b.top;
d.bottom=d.top+d.height;d.right=d.left+d.width;return d},getViewportRect:function(){var a=g.getViewportElement(),b=(window.innerWidth||a.clientWidth)|0,a=(window.innerHeight||a.clientHeight)|0;return{left:0,top:0,height:a,width:b,bottom:a,right:b}},setViewportOffset:function(a,b){var c=g.getFixedLayer();a.parentNode===c?(a.style.left=b.left+"px",a.style.top=b.top+"px"):e.setViewportOffset(a,b)},getEventOffset:function(a){var b=g.getClientRect(a.target||a.srcElement);a=g.getViewportOffsetByEvent(a);
return{left:a.left-b.left,top:a.top-b.top}},getViewportOffsetByEvent:function(a){var b=a.target||a.srcElement,c=e.getWindow(b).frameElement;a={left:a.clientX,top:a.clientY};c&&b.ownerDocument!==document&&(b=g.getClientRect(c),a.left+=b.left,a.top+=b.top);return a},setGlobal:function(a,c){b[a]=c;return'$EDITORUI["'+a+'"]'},unsetGlobal:function(a){delete b[a]},copyAttributes:function(b,c){for(var d=c.attributes,g=d.length;g--;){var h=d[g];"style"==h.nodeName||("class"==h.nodeName||a.ie&&!h.specified)||
b.setAttribute(h.nodeName,h.nodeValue)}c.className&&e.addClass(b,c.className);c.style.cssText&&(b.style.cssText+=";"+c.style.cssText)},removeStyle:function(a,b){if(a.style.removeProperty)a.style.removeProperty(b);else if(a.style.removeAttribute)a.style.removeAttribute(b);else throw"";},contains:function(a,b){return a&&b&&(a===b?!1:a.contains?a.contains(b):a.compareDocumentPosition(b)&16)},startDrag:function(a,b,c){function e(a){b.ondragmove(a.clientX-d,a.clientY-g,a);a.stopPropagation?a.stopPropagation():
a.cancelBubble=!0}c=c||document;var d=a.clientX,g=a.clientY;if(c.addEventListener){var h=function(a){c.removeEventListener("mousemove",e,!0);c.removeEventListener("mouseup",h,!0);window.removeEventListener("mouseup",h,!0);b.ondragstop()};c.addEventListener("mousemove",e,!0);c.addEventListener("mouseup",h,!0);window.addEventListener("mouseup",h,!0);a.preventDefault()}else{var p=a.srcElement;p.setCapture();var q=function(){p.releaseCapture();p.detachEvent("onmousemove",e);p.detachEvent("onmouseup",
q);p.detachEvent("onlosecaptrue",q);b.ondragstop()};p.attachEvent("onmousemove",e);p.attachEvent("onmouseup",q);p.attachEvent("onlosecaptrue",q);a.returnValue=!1}b.ondragstart()},getFixedLayer:function(){var b=document.getElementById("edui_fixedlayer");null==b&&(b=document.createElement("div"),b.id="edui_fixedlayer",document.body.appendChild(b),a.ie&&8>=a.version?(b.style.position="absolute",e.on(window,"scroll",d),e.on(window,"resize",s.editor.utils.defer(d,0,!0)),setTimeout(d)):b.style.position=
"fixed",b.style.left="0",b.style.top="0",b.style.width="0",b.style.height="0");return b},makeUnselectable:function(b){if(a.opera||a.ie&&9>a.version){if(b.unselectable="on",b.hasChildNodes())for(var c=0;c<b.childNodes.length;c++)1==b.childNodes[c].nodeType&&g.makeUnselectable(b.childNodes[c])}else void 0!==b.style.MozUserSelect?b.style.MozUserSelect="none":void 0!==b.style.WebkitUserSelect?b.style.WebkitUserSelect="none":void 0!==b.style.KhtmlUserSelect&&(b.style.KhtmlUserSelect="none")}}})();(function(){var h=
s.editor.utils,a=s.editor.ui.uiUtils,e=s.editor.EventBase,b=s.editor.ui.UIBase=function(){};b.prototype={className:"",uiName:"",initOptions:function(b){for(var e in b)this[e]=b[e];this.id=this.id||"edui"+a.uid()},initUIBase:function(){this._globalKey=h.unhtml(a.setGlobal(this.id,this))},render:function(b){for(var e=this.renderHtml(),e=a.createElementByHtml(e),f=d.getElementsByTagName(e,"*"),k="edui-"+(this.theme||this.editor.options.theme),l=document.getElementById("edui_fixedlayer"),h=0,n;n=f[h++];)d.addClass(n,
k);d.addClass(e,k);l&&(l.className="",d.addClass(l,k));f=this.getDom();null!=f?(f.parentNode.replaceChild(e,f),a.copyAttributes(e,f)):("string"==typeof b&&(b=document.getElementById(b)),b=b||a.getFixedLayer(),d.addClass(b,k),b.appendChild(e));this.postRender()},getDom:function(a){return a?document.getElementById(this.id+"_"+a):document.getElementById(this.id)},postRender:function(){this.fireEvent("postrender")},getHtmlTpl:function(){return""},formatHtml:function(a){var b="edui-"+this.uiName;return a.replace(/##/g,
this.id).replace(/%%-/g,this.uiName?b+"-":"").replace(/%%/g,(this.uiName?b:"")+" "+this.className).replace(/\$\$/g,this._globalKey)},renderHtml:function(){return this.formatHtml(this.getHtmlTpl())},dispose:function(){var b=this.getDom();b&&s.editor.dom.domUtils.remove(b);a.unsetGlobal(this.id)}};h.inherits(b,e)})();(function(){var d=s.editor.utils,a=s.editor.ui.UIBase,e=s.editor.ui.Separator=function(a){this.initOptions(a);this.initSeparator()};e.prototype={uiName:"separator",initSeparator:function(){this.initUIBase()},
getHtmlTpl:function(){return'<div id="##" class="edui-box %%"></div>'}};d.inherits(e,a)})();(function(){var d=s.editor.utils,a=s.editor.dom.domUtils,e=s.editor.ui.UIBase,b=s.editor.ui.uiUtils,c=s.editor.ui.Mask=function(a){this.initOptions(a);this.initUIBase()};c.prototype={getHtmlTpl:function(){return'<div id="##" class="edui-mask %%" onmousedown="return $$._onMouseDown(event, this);"></div>'},postRender:function(){var b=this;a.on(window,"resize",function(){setTimeout(function(){b.isHidden()||b._fill()})})},
show:function(a){this._fill();this.getDom().style.display="";this.getDom().style.zIndex=a},hide:function(){this.getDom().style.display="none";this.getDom().style.zIndex=""},isHidden:function(){return"none"==this.getDom().style.display},_onMouseDown:function(){return!1},_fill:function(){var a=this.getDom(),c=b.getViewportRect();a.style.width=c.width+"px";a.style.height=c.height+"px"}};d.inherits(c,e)})();(function(){function d(a,b){for(var c=0;c<f.length;c++){var e=f[c];if(!e.isHidden()&&!1!==e.queryAutoHide(b)){if(a&&
/scroll/ig.test(a.type)&&"edui-wordpastepop"==e.className)return;e.hide()}}f.length&&e.editor.fireEvent("afterhidepop")}var a=s.editor.utils,e=s.editor.ui.uiUtils,b=s.editor.dom.domUtils,c=s.editor.ui.UIBase,g=s.editor.ui.Popup=function(a){this.initOptions(a);this.initPopup()},f=[];g.postHide=d;var k=["edui-anchor-topleft","edui-anchor-topright","edui-anchor-bottomleft","edui-anchor-bottomright"];g.prototype={SHADOW_RADIUS:5,content:null,_hidden:!1,autoRender:!0,canSideLeft:!0,canSideUp:!0,initPopup:function(){this.initUIBase();
f.push(this)},getHtmlTpl:function(){return'<div id="##" class="edui-popup %%" onmousedown="return false;"> <div id="##_body" class="edui-popup-body"> <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="about:blank"></iframe> <div class="edui-shadow"></div> <div id="##_content" class="edui-popup-content">'+this.getContentHtmlTpl()+"  </div> </div></div>"},getContentHtmlTpl:function(){return this.content?"string"==
typeof this.content?this.content:this.content.renderHtml():""},_UIBase_postRender:c.prototype.postRender,postRender:function(){this.content instanceof c&&this.content.postRender();if(this.captureWheel&&!this.captured){this.captured=!0;var a=(document.documentElement.clientHeight||document.body.clientHeight)-80,d=this.getDom().offsetHeight,f=e.getClientRect(this.combox.getDom()).top,g=this.getDom("content"),k=this.getDom("body").getElementsByTagName("iframe"),h=this;for(k.length&&(k=k[0]);f+d>a;)d-=
30,g.style.height=d+"px",k&&(k.style.height=d+"px");if(window.XMLHttpRequest)b.on(g,"onmousewheel"in document.body?"mousewheel":"DOMMouseScroll",function(a){a.preventDefault?a.preventDefault():a.returnValue=!1;g.scrollTop=a.wheelDelta?g.scrollTop-60*(a.wheelDelta/120):g.scrollTop-60*(a.detail/-3)});else b.on(this.getDom(),"mousewheel",function(a){a.returnValue=!1;h.getDom("content").scrollTop-=60*(a.wheelDelta/120)})}this.fireEvent("postRenderAfter");this.hide(!0);this._UIBase_postRender()},_doAutoRender:function(){!this.getDom()&&
this.autoRender&&this.render()},mesureSize:function(){var a=this.getDom("content");return e.getClientRect(a)},fitSize:function(){if(this.captureWheel&&this.sized)return this.__size;this.sized=!0;var a=this.getDom("body");a.style.width="";a.style.height="";var b=this.mesureSize();if(this.captureWheel){a.style.width=-(-20-b.width)+"px";var c=parseInt(this.getDom("content").style.height,10);!window.isNaN(c)&&(b.height=c)}else a.style.width=b.width+"px";a.style.height=b.height+"px";this.__size=b;this.captureWheel&&
(this.getDom("content").style.overflow="auto");return b},showAnchor:function(a,b){this.showAnchorRect(e.getClientRect(a),b)},showAnchorRect:function(a,c,d){this._doAutoRender();var f=e.getViewportRect();this._show();d=this.fitSize();var g;c?(c=this.canSideLeft&&a.right+d.width>f.right&&a.left>d.width,f=this.canSideUp&&a.top+d.height>f.bottom&&a.bottom>d.height,g=c?a.left-d.width:a.right,a=f?a.bottom-d.height:a.top):(c=this.canSideLeft&&a.right+d.width>f.right&&a.left>d.width,f=this.canSideUp&&a.top+
d.height>f.bottom&&a.bottom>d.height,g=c?a.right-d.width:a.left,a=f?a.top-d.height:a.bottom);d=this.getDom();e.setViewportOffset(d,{left:g,top:a});b.removeClasses(d,k);d.className+=" "+k[2*(f?1:0)+(c?1:0)];this.editor&&(d.style.zIndex=1*this.editor.container.style.zIndex+10,s.editor.ui.uiUtils.getFixedLayer().style.zIndex=d.style.zIndex-1)},showAt:function(a){var b=a.left;a=a.top;this.showAnchorRect({left:b,top:a,right:b,bottom:a,height:0,width:0},!1,!0)},_show:function(){this._hidden&&(this.getDom().style.display=
"",this._hidden=!1,this.fireEvent("show"))},isHidden:function(){return this._hidden},show:function(){this._doAutoRender();this._show()},hide:function(a){!this._hidden&&this.getDom()&&(this.getDom().style.display="none",this._hidden=!0,a||this.fireEvent("hide"))},queryAutoHide:function(a){return!a||!e.contains(this.getDom(),a)}};a.inherits(g,c);b.on(document,"mousedown",function(a){d(a,a.target||a.srcElement)});b.on(window,"scroll",function(a,b){d(a,b)})})();(function(){var d=s.editor.utils,a=s.editor.ui.UIBase,
e=s.editor.ui.ColorPicker=function(a){this.initOptions(a);this.noColorText=this.noColorText||this.editor.getLang("clearColor");this.initUIBase()};e.prototype={getHtmlTpl:function(){for(var a=this.editor,e='<div id="##" class="edui-colorpicker %%"><div class="edui-colorpicker-topbar edui-clearfix"><div unselectable="on" id="##_preview" class="edui-colorpicker-preview"></div><div unselectable="on" class="edui-colorpicker-nocolor" onclick="$$._onPickNoColor(event, this);">'+this.noColorText+'</div></div><table  class="edui-box" style="border-collapse: collapse;" onmouseover="$$._onTableOver(event, this);" onmouseout="$$._onTableOut(event, this);" onclick="return $$._onTableClick(event, this);" cellspacing="0" cellpadding="0"><tr style="border-bottom: 1px solid #ddd;font-size: 13px;line-height: 25px;color:#39C;padding-top: 2px"><td colspan="10">'+
a.getLang("themeColor")+'</td> </tr><tr class="edui-colorpicker-tablefirstrow" >',d=0;d<b.length;d++)d&&0===d%10&&(e+="</tr>"+(60==d?'<tr style="border-bottom: 1px solid #ddd;font-size: 13px;line-height: 25px;color:#39C;"><td colspan="10">'+a.getLang("standardColor")+"</td></tr>":"")+"<tr"+(60==d?' class="edui-colorpicker-tablefirstrow"':"")+">"),e+=70>d?'<td style="padding: 0 2px;"><a hidefocus title="'+b[d]+'" onclick="return false;" href="javascript:" unselectable="on" class="edui-box edui-colorpicker-colorcell" data-color="#'+
b[d]+'" style="background-color:#'+b[d]+";border:solid #ccc;"+(10>d||60<=d?"border-width:1px;":10<=d&&20>d?"border-width:1px 1px 0 1px;":"border-width:0 1px 0 1px;")+'"></a></td>':"";return e+"</tr></table></div>"},_onTableClick:function(a){(a=(a.target||a.srcElement).getAttribute("data-color"))&&this.fireEvent("pickcolor",a)},_onTableOver:function(a){if(a=(a.target||a.srcElement).getAttribute("data-color"))this.getDom("preview").style.backgroundColor=a},_onTableOut:function(){this.getDom("preview").style.backgroundColor=
""},_onPickNoColor:function(){this.fireEvent("picknocolor")}};d.inherits(e,a);var b="ffffff 000000 eeece1 1f497d 4f81bd c0504d 9bbb59 8064a2 4bacc6 f79646 f2f2f2 7f7f7f ddd9c3 c6d9f0 dbe5f1 f2dcdb ebf1dd e5e0ec dbeef3 fdeada d8d8d8 595959 c4bd97 8db3e2 b8cce4 e5b9b7 d7e3bc ccc1d9 b7dde8 fbd5b5 bfbfbf 3f3f3f 938953 548dd4 95b3d7 d99694 c3d69b b2a2c7 92cddc fac08f a5a5a5 262626 494429 17365d 366092 953734 76923c 5f497a 31859b e36c09 7f7f7f 0c0c0c 1d1b10 0f243e 244061 632423 4f6128 3f3151 205867 974806 c00000 ff0000 ffc000 ffff00 92d050 00b050 00b0f0 0070c0 002060 7030a0 ".split(" ")})();
(function(){var d=s.editor.utils,a=s.editor.ui.uiUtils,e=s.editor.ui.UIBase,b=s.editor.ui.TablePicker=function(a){this.initOptions(a);this.initTablePicker()};b.prototype={defaultNumRows:10,defaultNumCols:10,maxNumRows:20,maxNumCols:20,numRows:10,numCols:10,lengthOfCellSide:22,initTablePicker:function(){this.initUIBase()},getHtmlTpl:function(){return'<div id="##" class="edui-tablepicker %%"><div class="edui-tablepicker-body"><div class="edui-infoarea"><span id="##_label" class="edui-label"></span></div><div class="edui-pickarea" onmousemove="$$._onMouseMove(event, this);" onmouseover="$$._onMouseOver(event, this);" onmouseout="$$._onMouseOut(event, this);" onclick="$$._onClick(event, this);"><div id="##_overlay" class="edui-overlay"></div></div></div></div>'},
_UIBase_render:e.prototype.render,render:function(a){this._UIBase_render(a);this.getDom("label").innerHTML="0"+this.editor.getLang("t_row")+" x 0"+this.editor.getLang("t_col")},_track:function(a,b){var e=this.getDom("overlay").style,d=this.lengthOfCellSide;e.width=a*d+"px";e.height=b*d+"px";this.getDom("label").innerHTML=a+this.editor.getLang("t_col")+" x "+b+this.editor.getLang("t_row");this.numCols=a;this.numRows=b},_onMouseOver:function(b,e){var d=b.relatedTarget||b.fromElement;a.contains(e,d)||
e===d||(this.getDom("label").innerHTML="0"+this.editor.getLang("t_col")+" x 0"+this.editor.getLang("t_row"),this.getDom("overlay").style.visibility="")},_onMouseOut:function(b,e){var d=b.relatedTarget||b.toElement;a.contains(e,d)||e===d||(this.getDom("label").innerHTML="0"+this.editor.getLang("t_col")+" x 0"+this.editor.getLang("t_row"),this.getDom("overlay").style.visibility="hidden")},_onMouseMove:function(b,e){this.getDom("overlay");var d=a.getEventOffset(b),k=this.lengthOfCellSide,l=Math.ceil(d.left/
k),d=Math.ceil(d.top/k);this._track(l,d)},_onClick:function(){this.fireEvent("picktable",this.numCols,this.numRows)}};d.inherits(b,e)})();(function(){var d=s.editor.dom.domUtils,a=s.editor.ui.uiUtils,e='onmousedown="$$.Stateful_onMouseDown(event, this);" onmouseup="$$.Stateful_onMouseUp(event, this);"'+(s.editor.browser.ie?' onmouseenter="$$.Stateful_onMouseEnter(event, this);" onmouseleave="$$.Stateful_onMouseLeave(event, this);"':' onmouseover="$$.Stateful_onMouseOver(event, this);" onmouseout="$$.Stateful_onMouseOut(event, this);"');
s.editor.ui.Stateful={alwalysHoverable:!1,target:null,Stateful_init:function(){this._Stateful_dGetHtmlTpl=this.getHtmlTpl;this.getHtmlTpl=this.Stateful_getHtmlTpl},Stateful_getHtmlTpl:function(){return this._Stateful_dGetHtmlTpl().replace(/stateful/g,function(){return e})},Stateful_onMouseEnter:function(a,c){this.target=c;if(!this.isDisabled()||this.alwalysHoverable)this.addState("hover"),this.fireEvent("over")},Stateful_onMouseLeave:function(a,c){if(!this.isDisabled()||this.alwalysHoverable)this.removeState("hover"),
this.removeState("active"),this.fireEvent("out")},Stateful_onMouseOver:function(b,c){var e=b.relatedTarget;a.contains(c,e)||c===e||this.Stateful_onMouseEnter(b,c)},Stateful_onMouseOut:function(b,c){var e=b.relatedTarget;a.contains(c,e)||c===e||this.Stateful_onMouseLeave(b,c)},Stateful_onMouseDown:function(a,c){this.isDisabled()||this.addState("active")},Stateful_onMouseUp:function(a,c){this.isDisabled()||this.removeState("active")},Stateful_postRender:function(){this.disabled&&!this.hasState("disabled")&&
this.addState("disabled")},hasState:function(a){return d.hasClass(this.getStateDom(),"edui-state-"+a)},addState:function(a){this.hasState(a)||(this.getStateDom().className+=" edui-state-"+a)},removeState:function(a){this.hasState(a)&&d.removeClasses(this.getStateDom(),["edui-state-"+a])},getStateDom:function(){return this.getDom("state")},isChecked:function(){return this.hasState("checked")},setChecked:function(a){!this.isDisabled()&&a?this.addState("checked"):this.removeState("checked")},isDisabled:function(){return this.hasState("disabled")},
setDisabled:function(a){a?(this.removeState("hover"),this.removeState("checked"),this.removeState("active"),this.addState("disabled")):this.removeState("disabled")}}})();(function(){var d=s.editor.utils,a=s.editor.ui.UIBase,e=s.editor.ui.Stateful,b=s.editor.ui.Button=function(a){this.initOptions(a);this.initButton()};b.prototype={uiName:"button",label:"",title:"",showIcon:!0,showText:!0,initButton:function(){this.initUIBase();this.Stateful_init()},getHtmlTpl:function(){return'<div id="##" class="edui-box %%"><div id="##_state" stateful><div class="%%-wrap"><div id="##_body" unselectable="on" '+
(this.title?'title="'+this.title+'"':"")+' class="%%-body" onmousedown="return false;" onclick="return $$._onClick();">'+(this.showIcon?'<div class="edui-box edui-icon"></div>':"")+(this.showText?'<div class="edui-box edui-label">'+this.label+"</div>":"")+"</div></div></div></div>"},postRender:function(){this.Stateful_postRender();this.setDisabled(this.disabled)},_onClick:function(){this.isDisabled()||this.fireEvent("click")}};d.inherits(b,a);d.extend(b.prototype,e)})();(function(){var d=s.editor.utils,
a=s.editor.ui.uiUtils,e=s.editor.ui.UIBase,b=s.editor.ui.Stateful,c=s.editor.ui.SplitButton=function(a){this.initOptions(a);this.initSplitButton()};c.prototype={popup:null,uiName:"splitbutton",title:"",initSplitButton:function(){this.initUIBase();this.Stateful_init();if(null!=this.popup){var a=this.popup;this.popup=null;this.setPopup(a)}},_UIBase_postRender:e.prototype.postRender,postRender:function(){this.Stateful_postRender();this._UIBase_postRender()},setPopup:function(b){this.popup!==b&&(null!=
this.popup&&this.popup.dispose(),b.addListener("show",d.bind(this._onPopupShow,this)),b.addListener("hide",d.bind(this._onPopupHide,this)),b.addListener("postrender",d.bind(function(){b.getDom("body").appendChild(a.createElementByHtml('<div id="'+this.popup.id+'_bordereraser" class="edui-bordereraser edui-background" style="width:'+(a.getClientRect(this.getDom()).width+20)+'px"></div>'));b.getDom().className+=" "+this.className},this)),this.popup=b)},_onPopupShow:function(){this.addState("opened")},
_onPopupHide:function(){this.removeState("opened")},getHtmlTpl:function(){return'<div id="##" class="edui-box %%"><div '+(this.title?'title="'+this.title+'"':"")+' id="##_state" stateful><div class="%%-body"><div id="##_button_body" class="edui-box edui-button-body" onclick="$$._onButtonClick(event, this);"><div class="edui-box edui-icon"></div></div><div class="edui-box edui-splitborder"></div><div class="edui-box edui-arrow" onclick="$$._onArrowClick();"></div></div></div></div>'},showPopup:function(){var b=
a.getClientRect(this.getDom());b.top-=this.popup.SHADOW_RADIUS;b.height+=this.popup.SHADOW_RADIUS;this.popup.showAnchorRect(b)},_onArrowClick:function(a,b){this.isDisabled()||this.showPopup()},_onButtonClick:function(){this.isDisabled()||this.fireEvent("buttonclick")}};d.inherits(c,e);d.extend(c.prototype,b,!0)})();(function(){var d=s.editor.utils,a=s.editor.ui.uiUtils,e=s.editor.ui.ColorPicker,b=s.editor.ui.Popup,c=s.editor.ui.SplitButton,g=s.editor.ui.ColorButton=function(a){this.initOptions(a);
this.initColorButton()};g.prototype={initColorButton:function(){var a=this;this.popup=new b({content:new e({noColorText:a.editor.getLang("clearColor"),editor:a.editor,onpickcolor:function(b,c){a._onPickColor(c)},onpicknocolor:function(b,c){a._onPickNoColor(c)}}),editor:a.editor});this.initSplitButton()},_SplitButton_postRender:c.prototype.postRender,postRender:function(){this._SplitButton_postRender();this.getDom("button_body").appendChild(a.createElementByHtml('<div id="'+this.id+'_colorlump" class="edui-colorlump"></div>'));
this.getDom().className+=" edui-colorbutton"},setColor:function(a){this.color=this.getDom("colorlump").style.backgroundColor=a},_onPickColor:function(a){!1!==this.fireEvent("pickcolor",a)&&(this.setColor(a),this.popup.hide())},_onPickNoColor:function(a){!1!==this.fireEvent("picknocolor")&&this.popup.hide()}};d.inherits(g,c)})();(function(){var d=s.editor.utils,a=s.editor.ui.Popup,e=s.editor.ui.TablePicker,b=s.editor.ui.SplitButton,c=s.editor.ui.TableButton=function(a){this.initOptions(a);this.initTableButton()};
c.prototype={initTableButton:function(){var b=this;this.popup=new a({content:new e({editor:b.editor,onpicktable:function(a,c,d){b._onPickTable(c,d)}}),editor:b.editor});this.initSplitButton()},_onPickTable:function(a,b){!1!==this.fireEvent("picktable",a,b)&&this.popup.hide()}};d.inherits(c,b)})();(function(){var d=s.editor.utils,a=s.editor.ui.UIBase,e=s.editor.ui.AutoTypeSetPicker=function(a){this.initOptions(a);this.initAutoTypeSetPicker()};e.prototype={initAutoTypeSetPicker:function(){this.initUIBase()},
getHtmlTpl:function(){var a=this.editor,c=a.options.autotypeset,d=a.getLang("autoTypeSet"),e="textAlignValue"+a.uid,k="imageBlockLineValue"+a.uid;return'<div id="##" class="edui-autotypesetpicker %%"><div class="edui-autotypesetpicker-body"><table ><tr><td nowrap colspan="2"><input type="checkbox" name="mergeEmptyline" '+(c.mergeEmptyline?"checked":"")+">"+d.mergeLine+'</td><td colspan="2"><input type="checkbox" name="removeEmptyline" '+(c.removeEmptyline?"checked":"")+">"+d.delLine+'</td></tr><tr><td nowrap colspan="2"><input type="checkbox" name="removeClass" '+
(c.removeClass?"checked":"")+">"+d.removeFormat+'</td><td colspan="2"><input type="checkbox" name="indent" '+(c.indent?"checked":"")+">"+d.indent+'</td></tr><tr><td nowrap colspan="2"><input type="checkbox" name="textAlign" '+(c.textAlign?"checked":"")+">"+d.alignment+'</td><td colspan="2" id="'+e+'"><input type="radio" name="'+e+'" value="left" '+(c.textAlign&&"left"==c.textAlign?"checked":"")+">"+a.getLang("justifyleft")+'<input type="radio" name="'+e+'" value="center" '+(c.textAlign&&"center"==
c.textAlign?"checked":"")+">"+a.getLang("justifycenter")+'<input type="radio" name="'+e+'" value="right" '+(c.textAlign&&"right"==c.textAlign?"checked":"")+">"+a.getLang("justifyright")+' </tr><tr><td nowrap colspan="2"><input type="checkbox" name="imageBlockLine" '+(c.imageBlockLine?"checked":"")+">"+d.imageFloat+'</td><td nowrap colspan="2" id="'+k+'"><input type="radio" name="'+k+'" value="none" '+(c.imageBlockLine&&"none"==c.imageBlockLine?"checked":"")+">"+a.getLang("default")+'<input type="radio" name="'+
k+'" value="left" '+(c.imageBlockLine&&"left"==c.imageBlockLine?"checked":"")+">"+a.getLang("justifyleft")+'<input type="radio" name="'+k+'" value="center" '+(c.imageBlockLine&&"center"==c.imageBlockLine?"checked":"")+">"+a.getLang("justifycenter")+'<input type="radio" name="'+k+'" value="right" '+(c.imageBlockLine&&"right"==c.imageBlockLine?"checked":"")+">"+a.getLang("justifyright")+'</tr><tr><td nowrap colspan="2"><input type="checkbox" name="clearFontSize" '+(c.clearFontSize?"checked":"")+">"+
d.removeFontsize+'</td><td colspan="2"><input type="checkbox" name="clearFontFamily" '+(c.clearFontFamily?"checked":"")+">"+d.removeFontFamily+'</td></tr><tr><td nowrap colspan="4"><input type="checkbox" name="removeEmptyNode" '+(c.removeEmptyNode?"checked":"")+">"+d.removeHtml+'</td></tr><tr><td nowrap colspan="4"><input type="checkbox" name="pasteFilter" '+(c.pasteFilter?"checked":"")+">"+d.pasteFilter+'</td></tr><tr><td nowrap colspan="4" align="right"><button >'+d.run+"</button></td></tr></table></div></div>"},
_UIBase_render:a.prototype.render};d.inherits(e,a)})();(function(){function h(a){for(var b=a.editor.options.autotypeset,c=a.getDom(),e=a.editor.uid,g=null,g=null,h=d.getElementsByTagName(c,"input"),t=h.length-1,p;p=h[t--];)if(g=p.getAttribute("type"),"checkbox"==g&&(g=p.getAttribute("name"),b[g]&&delete b[g],p.checked))if(p=document.getElementById(g+"Value"+e))if(/input/ig.test(p.tagName))b[g]=p.value;else{p=p.getElementsByTagName("input");for(var q=p.length-1,u;u=p[q--];)if(u.checked){b[g]=u.value;
break}}else b[g]=!0;c=d.getElementsByTagName(c,"select");for(t=0;e=c[t++];)h=e.getAttribute("name"),b[h]=b[h]?e.value:"";a.editor.options.autotypeset=b}var a=s.editor.utils,e=s.editor.ui.Popup,b=s.editor.ui.AutoTypeSetPicker,c=s.editor.ui.SplitButton,g=s.editor.ui.AutoTypeSetButton=function(a){this.initOptions(a);this.initAutoTypeSetButton()};g.prototype={initAutoTypeSetButton:function(){var a=this;this.popup=new e({content:new b({editor:a.editor}),editor:a.editor,hide:function(){!this._hidden&&this.getDom()&&
(h(this),this.getDom().style.display="none",this._hidden=!0,this.fireEvent("hide"))}});var c=0;this.popup.addListener("postRenderAfter",function(){var b=this;c||(this.getDom().getElementsByTagName("button")[0].onclick=function(){h(b);a.editor.execCommand("autotypeset");b.hide()},c=1)});this.initSplitButton()}};a.inherits(g,c)})();(function(){var d=s.editor.utils,a=s.editor.ui.Popup,e=s.editor.ui.Stateful,b=s.editor.ui.UIBase,c=s.editor.ui.CellAlignPicker=function(a){this.initOptions(a);this.initSelected();
this.initCellAlignPicker()};c.prototype={initSelected:function(){var a={top:0,middle:1,bottom:2},b={left:0,center:1,right:2};this.selected&&(this.selectedIndex=3*a[this.selected.valign]+b[this.selected.align])},initCellAlignPicker:function(){this.initUIBase();this.Stateful_init()},getHtmlTpl:function(){for(var a=["left","center","right"],b=null,c=-1,d=[],e=0;9>e;e++)b=this.selectedIndex===e?' class="edui-cellalign-selected" ':"",c=e%3,0===c&&d.push("<tr>"),d.push('<td index="'+e+'" '+b+' stateful><div class="edui-icon edui-'+
a[c]+'"></div></td>'),2===c&&d.push("</tr>");return'<div id="##" class="edui-cellalignpicker %%"><div class="edui-cellalignpicker-body"><table onclick="$$._onClick(event);">'+d.join("")+"</table></div></div>"},getStateDom:function(){return this.target},_onClick:function(b){var c=b.target||b.srcElement;/icon/.test(c.className)&&(this.items[c.parentNode.getAttribute("index")].onclick(),a.postHide(b))},_UIBase_render:b.prototype.render};d.inherits(c,b);d.extend(c.prototype,e,!0)})();(function(){var h=
s.editor.utils,a=s.editor.ui.Stateful,e=s.editor.ui.uiUtils,b=s.editor.ui.UIBase,c=s.editor.ui.PastePicker=function(a){this.initOptions(a);this.initPastePicker()};c.prototype={initPastePicker:function(){this.initUIBase();this.Stateful_init()},getHtmlTpl:function(){return'<div class="edui-pasteicon" onclick="$$._onClick(this)"></div><div class="edui-pastecontainer"><div class="edui-title">'+this.editor.getLang("pasteOpt")+'</div><div class="edui-button"><div title="'+this.editor.getLang("pasteSourceFormat")+
'" onclick="$$.format(false)" stateful><div class="edui-richtxticon"></div></div><div title="'+this.editor.getLang("tagFormat")+'" onclick="$$.format(2)" stateful><div class="edui-tagicon"></div></div><div title="'+this.editor.getLang("pasteTextFormat")+'" onclick="$$.format(true)" stateful><div class="edui-plaintxticon"></div></div></div></div></div>'},getStateDom:function(){return this.target},format:function(a){this.editor.ui._isTransfer=!0;this.editor.fireEvent("pasteTransfer",a)},_onClick:function(a){var b=
d.getNextDomNode(a),c=e.getViewportRect().height,l=e.getClientRect(b);b.style.top=l.top+l.height>c?-l.height-a.offsetHeight+"px":"";/hidden/ig.test(d.getComputedStyle(b,"visibility"))?(b.style.visibility="visible",d.addClass(a,"edui-state-opened")):(b.style.visibility="hidden",d.removeClasses(a,"edui-state-opened"))},_UIBase_render:b.prototype.render};h.inherits(c,b);h.extend(c.prototype,a,!0)})();(function(){var d=s.editor.utils,a=s.editor.ui.uiUtils,e=s.editor.ui.UIBase,b=s.editor.ui.Toolbar=function(a){this.initOptions(a);
this.initToolbar()};b.prototype={items:null,initToolbar:function(){this.items=this.items||[];this.initUIBase()},add:function(a){this.items.push(a)},getHtmlTpl:function(){for(var a=[],b=0;b<this.items.length;b++)a[b]=this.items[b].renderHtml();return'<div id="##" class="edui-toolbar %%" onselectstart="return false;" onmousedown="return $$._onMouseDown(event, this);">'+a.join("")+"</div>"},postRender:function(){for(var b=this.getDom(),d=0;d<this.items.length;d++)this.items[d].postRender();a.makeUnselectable(b)},
_onMouseDown:function(){return!1}};d.inherits(b,e)})();(function(){var d=s.editor.utils,a=s.editor.dom.domUtils,e=s.editor.ui.uiUtils,b=s.editor.ui.UIBase,c=s.editor.ui.Popup,g=s.editor.ui.Stateful,f=s.editor.ui.CellAlignPicker,k=s.editor.ui.Menu=function(a){this.initOptions(a);this.initMenu()},l={renderHtml:function(){return'<div class="edui-menuitem edui-menuseparator"><div class="edui-menuseparator-inner"></div></div>'},postRender:function(){},queryAutoHide:function(){return!0}};k.prototype={items:null,
uiName:"menu",initMenu:function(){this.items=this.items||[];this.initPopup();this.initItems()},initItems:function(){for(var a=0;a<this.items.length;a++){var b=this.items[a];"-"==b?this.items[a]=this.getSeparator():b instanceof m||(b.editor=this.editor,b.theme=this.editor.options.theme,this.items[a]=this.createItem(b))}},getSeparator:function(){return l},createItem:function(a){a.menu=this;return new m(a)},_Popup_getContentHtmlTpl:c.prototype.getContentHtmlTpl,getContentHtmlTpl:function(){if(0==this.items.length)return this._Popup_getContentHtmlTpl();
for(var a=[],b=0;b<this.items.length;b++)a[b]=this.items[b].renderHtml();return'<div class="%%-body">'+a.join("")+"</div>"},_Popup_postRender:c.prototype.postRender,postRender:function(){for(var b=this,c=0;c<this.items.length;c++){var d=this.items[c];d.ownerMenu=this;d.postRender()}a.on(this.getDom(),"mouseover",function(a){a=a||event;a=a.relatedTarget||a.fromElement;var c=b.getDom();e.contains(c,a)||c===a||b.fireEvent("over")});this._Popup_postRender()},queryAutoHide:function(a){if(a){if(e.contains(this.getDom(),
a))return!1;for(var b=0;b<this.items.length;b++)if(!1===this.items[b].queryAutoHide(a))return!1}},clearItems:function(){for(var a=0;a<this.items.length;a++){var b=this.items[a];clearTimeout(b._showingTimer);clearTimeout(b._closingTimer);b.subMenu&&b.subMenu.destroy()}this.items=[]},destroy:function(){this.getDom()&&a.remove(this.getDom());this.clearItems()},dispose:function(){this.destroy()}};d.inherits(k,c);var m=s.editor.ui.MenuItem=function(b){this.initOptions(b);this.initUIBase();this.Stateful_init();
if(this.subMenu&&!(this.subMenu instanceof k))if(b.className&&-1!=b.className.indexOf("aligntd")){var d=this;this.subMenu.selected=this.editor.queryCommandValue("cellalignment");this.subMenu=new c({content:new f(this.subMenu),parentMenu:d,editor:d.editor,destroy:function(){this.getDom()&&a.remove(this.getDom())}});this.subMenu.addListener("postRenderAfter",function(){a.on(this.getDom(),"mouseover",function(){d.addState("opened")})})}else this.subMenu=new k(this.subMenu)};m.prototype={label:"",subMenu:null,
ownerMenu:null,uiName:"menuitem",alwalysHoverable:!0,getHtmlTpl:function(){return'<div id="##" class="%%" stateful onclick="$$._onClick(event, this);"><div class="%%-body">'+this.renderLabelHtml()+"</div></div>"},postRender:function(){var a=this;this.addListener("over",function(){a.ownerMenu.fireEvent("submenuover",a);a.subMenu&&a.delayShowSubMenu()});this.subMenu&&(this.getDom().className+=" edui-hassubmenu",this.subMenu.render(),this.addListener("out",function(){a.delayHideSubMenu()}),this.subMenu.addListener("over",
function(){clearTimeout(a._closingTimer);a._closingTimer=null;a.addState("opened")}),this.ownerMenu.addListener("hide",function(){a.hideSubMenu()}),this.ownerMenu.addListener("submenuover",function(b,c){c!==a&&a.delayHideSubMenu()}),this.subMenu._bakQueryAutoHide=this.subMenu.queryAutoHide,this.subMenu.queryAutoHide=function(b){return b&&e.contains(a.getDom(),b)?!1:this._bakQueryAutoHide(b)});this.getDom().style.tabIndex="-1";e.makeUnselectable(this.getDom());this.Stateful_postRender()},delayShowSubMenu:function(){var a=
this;a.isDisabled()||(a.addState("opened"),clearTimeout(a._showingTimer),clearTimeout(a._closingTimer),a._closingTimer=null,a._showingTimer=setTimeout(function(){a.showSubMenu()},250))},delayHideSubMenu:function(){var a=this;a.isDisabled()||(a.removeState("opened"),clearTimeout(a._showingTimer),a._closingTimer||(a._closingTimer=setTimeout(function(){a.hasState("opened")||a.hideSubMenu();a._closingTimer=null},400)))},renderLabelHtml:function(){return'<div class="edui-arrow"></div><div class="edui-box edui-icon"></div><div class="edui-box edui-label %%-label">'+
(this.label||"")+"</div>"},getStateDom:function(){return this.getDom()},queryAutoHide:function(a){if(this.subMenu&&this.hasState("opened"))return this.subMenu.queryAutoHide(a)},_onClick:function(a,b){this.hasState("disabled")||!1!==this.fireEvent("click",a,b)&&(this.subMenu?this.showSubMenu():c.postHide(a))},showSubMenu:function(){var a=e.getClientRect(this.getDom());a.right-=5;a.left+=2;a.width-=7;a.top-=4;a.bottom+=4;a.height+=8;this.subMenu.showAnchorRect(a,!0,!0)},hideSubMenu:function(){this.subMenu.hide()}};
d.inherits(m,b);d.extend(m.prototype,g,!0)})();(function(){var d=s.editor.utils,a=s.editor.ui.uiUtils,e=s.editor.ui.Menu,b=s.editor.ui.SplitButton,c=s.editor.ui.Combox=function(a){this.initOptions(a);this.initCombox()};c.prototype={uiName:"combox",initCombox:function(){var a=this;this.items=this.items||[];for(var b=0;b<this.items.length;b++){var c=this.items[b];c.uiName="listitem";c.index=b;c.onclick=function(){a.selectByIndex(this.index)}}this.popup=new e({items:this.items,uiName:"list",editor:this.editor,
captureWheel:!0,combox:this});this.initSplitButton()},_SplitButton_postRender:b.prototype.postRender,postRender:function(){this._SplitButton_postRender();this.setLabel(this.label||"");this.setValue(this.initValue||"")},showPopup:function(){var b=a.getClientRect(this.getDom());b.top+=1;b.bottom-=1;b.height-=2;this.popup.showAnchorRect(b)},getValue:function(){return this.value},setValue:function(a){var b=this.indexByValue(a);-1!=b?(this.selectedIndex=b,this.setLabel(this.items[b].label),this.value=
this.items[b].value):(this.selectedIndex=-1,this.setLabel(this.getLabelForUnknowValue(a)),this.value=a)},setLabel:function(a){this.label=this.getDom("button_body").innerHTML=a},getLabelForUnknowValue:function(a){return a},indexByValue:function(a){for(var b=0;b<this.items.length;b++)if(a==this.items[b].value)return b;return-1},getItem:function(a){return this.items[a]},selectByIndex:function(a){a<this.items.length&&!1!==this.fireEvent("select",a)&&(this.selectedIndex=a,this.value=this.items[a].value,
this.setLabel(this.items[a].label))}};d.inherits(c,b)})();(function(){var d=s.editor.utils,a=s.editor.dom.domUtils,e=s.editor.ui.uiUtils,b=s.editor.ui.Mask,c=s.editor.ui.UIBase,g=s.editor.ui.Button,f=s.editor.ui.Dialog=function(a){this.initOptions(d.extend({autoReset:!0,draggable:!0,onok:function(){},oncancel:function(){},onclose:function(a,b){return b?this.onok():this.oncancel()},holdScroll:!1},a));this.initDialog()},k,l;f.prototype={draggable:!1,uiName:"dialog",initDialog:function(){var a=this,
c=this.editor.options.theme;this.initUIBase();this.modalMask=k||(k=new b({className:"edui-dialog-modalmask",theme:c}));this.dragMask=l||(l=new b({className:"edui-dialog-dragmask",theme:c}));this.closeButton=new g({className:"edui-dialog-closebutton",title:a.closeDialog,theme:c,onclick:function(){a.close(!1)}});this.fullscreen&&this.initResizeEvent();if(this.buttons)for(c=0;c<this.buttons.length;c++)this.buttons[c]instanceof g||(this.buttons[c]=new g(this.buttons[c]))},initResizeEvent:function(){var b=
this;a.on(window,"resize",function(){b._hidden||void 0===b._hidden||(b.__resizeTimer&&window.clearTimeout(b.__resizeTimer),b.__resizeTimer=window.setTimeout(function(){b.__resizeTimer=null;var a=b.getDom(),c=b.getDom("content"),d=UE.ui.uiUtils.getClientRect(a),f=UE.ui.uiUtils.getClientRect(c),l=e.getViewportRect();c.style.width=l.width-d.width+f.width+"px";c.style.height=l.height-d.height+f.height+"px";a.style.width=l.width+"px";a.style.height=l.height+"px";b.fireEvent("resize")},100))})},fitSize:function(){var a=
this.getDom("body"),b=this.mesureSize();a.style.width=b.width+"px";a.style.height=b.height+"px";return b},safeSetOffset:function(a){var b=this.getDom(),c=e.getViewportRect(),d=e.getClientRect(b),f=a.left;f+d.width>c.right&&(f=c.right-d.width);a=a.top;a+d.height>c.bottom&&(a=c.bottom-d.height);b.style.left=Math.max(f,0)+"px";b.style.top=Math.max(a,0)+"px"},showAtCenter:function(){var b=e.getViewportRect();if(this.fullscreen){var c=this.getDom(),d=this.getDom("content");c.style.display="block";var f=
UE.ui.uiUtils.getClientRect(c),l=UE.ui.uiUtils.getClientRect(d);c.style.left="-100000px";d.style.width=b.width-f.width+l.width+"px";d.style.height=b.height-f.height+l.height+"px";c.style.width=b.width+"px";c.style.height=b.height+"px";c.style.left=0;this._originalContext={html:{overflowX:document.documentElement.style.overflowX,overflowY:document.documentElement.style.overflowY},body:{overflowX:document.body.style.overflowX,overflowY:document.body.style.overflowY}};document.documentElement.style.overflowX=
"hidden";document.documentElement.style.overflowY="hidden";document.body.style.overflowX="hidden";document.body.style.overflowY="hidden"}else this.getDom().style.display="",d=this.fitSize(),f=this.getDom("titlebar").offsetHeight|0,c=b.width/2-d.width/2,b=b.height/2-(d.height-f)/2-f,d=this.getDom(),this.safeSetOffset({left:Math.max(c|0,0),top:Math.max(b|0,0)}),a.hasClass(d,"edui-state-centered")||(d.className+=" edui-state-centered");this._show()},getContentHtml:function(){var a="";"string"==typeof this.content?
a=this.content:this.iframeUrl&&(a='<span id="'+this.id+'_contmask" class="dialogcontmask"></span><iframe id="'+this.id+'_iframe" class="%%-iframe" height="100%" width="100%" frameborder="0" src="'+this.iframeUrl+'"></iframe>');return a},getHtmlTpl:function(){var a="";if(this.buttons){for(var a=[],b=0;b<this.buttons.length;b++)a[b]=this.buttons[b].renderHtml();a='<div class="%%-foot"><div id="##_buttons" class="%%-buttons">'+a.join("")+"</div></div>"}return'<div id="##" class="%%"><div '+(this.fullscreen?
'class="%%-wrap edui-dialog-fullscreen-flag"':'class="%%"')+'><div id="##_body" class="%%-body"><div class="%%-shadow"></div><div id="##_titlebar" class="%%-titlebar"><div class="%%-draghandle" onmousedown="$$._onTitlebarMouseDown(event, this);"><span class="%%-caption">'+(this.title||"")+"</span></div>"+this.closeButton.renderHtml()+'</div><div id="##_content" class="%%-content">'+(this.autoReset?"":this.getContentHtml())+"</div>"+a+"</div></div></div>"},postRender:function(){this.modalMask.getDom()||
(this.modalMask.render(),this.modalMask.hide());this.dragMask.getDom()||(this.dragMask.render(),this.dragMask.hide());var b=this;this.addListener("show",function(){b.modalMask.show(this.getDom().style.zIndex-2)});this.addListener("hide",function(){b.modalMask.hide()});if(this.buttons)for(var c=0;c<this.buttons.length;c++)this.buttons[c].postRender();a.on(window,"resize",function(){setTimeout(function(){b.isHidden()||b.safeSetOffset(e.getClientRect(b.getDom()))})});if(this.holdScroll)if(b.iframeUrl)b.addListener("dialogafterreset",
function(){window.setTimeout(function(){var c=document.getElementById(b.id+"_iframe").contentWindow;if(q.ie)var d=window.setInterval(function(){c.document&&c.document.body&&(window.clearInterval(d),d=null,a.on(c.document.body,q.gecko?"DOMMouseScroll":"mousewheel",function(b){a.preventDefault(b)}))},100);else a.on(c,q.gecko?"DOMMouseScroll":"mousewheel",function(b){a.preventDefault(b)})},1)});else a.on(document.getElementById(b.id+"_iframe"),q.gecko?"DOMMouseScroll":"mousewheel",function(b){a.preventDefault(b)});
this._hide()},mesureSize:function(){var a=this.getDom("body"),b=e.getClientRect(this.getDom("content")).width;a.style.width=b;return e.getClientRect(a)},_onTitlebarMouseDown:function(b,c){if(this.draggable){var d;e.getViewportRect();var f=this;e.startDrag(b,{ondragstart:function(){d=e.getClientRect(f.getDom());f.getDom("contmask").style.visibility="visible";f.dragMask.show(f.getDom().style.zIndex-1)},ondragmove:function(a,b){f.safeSetOffset({left:d.left+a,top:d.top+b})},ondragstop:function(){f.getDom("contmask").style.visibility=
"hidden";a.removeClasses(f.getDom(),["edui-state-centered"]);f.dragMask.hide()}})}},reset:function(){this.getDom("content").innerHTML=this.getContentHtml();this.fireEvent("dialogafterreset")},_show:function(){this._hidden&&(this.getDom().style.display="",this.editor.container.style.zIndex&&(this.getDom().style.zIndex=1*this.editor.container.style.zIndex+10),this._hidden=!1,this.fireEvent("show"),s.editor.ui.uiUtils.getFixedLayer().style.zIndex=this.getDom().style.zIndex-4)},isHidden:function(){return this._hidden},
_hide:function(){if(!this._hidden){var a=this.getDom();a.style.display="none";a.style.zIndex="";a.style.width="";a.style.height="";this._hidden=!0;this.fireEvent("hide")}},open:function(){if(this.autoReset)try{this.reset()}catch(a){this.render(),this.open()}this.showAtCenter();if(this.iframeUrl)try{this.getDom("iframe").focus()}catch(b){}},_onCloseButtonClick:function(a,b){this.close(!1)},close:function(a){!1!==this.fireEvent("close",a)&&(this.fullscreen&&(document.documentElement.style.overflowX=
this._originalContext.html.overflowX,document.documentElement.style.overflowY=this._originalContext.html.overflowY,document.body.style.overflowX=this._originalContext.body.overflowX,document.body.style.overflowY=this._originalContext.body.overflowY,delete this._originalContext),this._hide())}};d.inherits(f,c)})();(function(){var d=s.editor.utils,a=s.editor.ui.Menu,e=s.editor.ui.SplitButton,b=s.editor.ui.MenuButton=function(a){this.initOptions(a);this.initMenuButton()};b.prototype={initMenuButton:function(){var b=
this;this.uiName="menubutton";this.popup=new a({items:b.items,className:b.className,editor:b.editor});this.popup.addListener("show",function(){for(var a=0;a<this.items.length;a++)this.items[a].removeState("checked"),this.items[a].value==b._value&&(this.items[a].addState("checked"),this.value=b._value)});this.initSplitButton()},setValue:function(a){this._value=a}};d.inherits(b,e)})();(function(){var d=s.editor.utils,a=s.editor.ui,e=a.Dialog;a.buttons={};a.Dialog=function(a){var b=new e(a);b.addListener("hide",
function(){if(b.editor){var a=b.editor;try{if(q.gecko){var c=a.window.scrollY,d=a.window.scrollX;a.body.focus();a.window.scrollTo(d,c)}else a.focus()}catch(e){}}});return b};for(var b={anchor:"~/dialogs/anchor/anchor.html",insertimage:"~/dialogs/image/image.html",link:"~/dialogs/link/link.html",spechars:"~/dialogs/spechars/spechars.html",searchreplace:"~/dialogs/searchreplace/searchreplace.html",map:"~/dialogs/map/map.html",gmap:"~/dialogs/gmap/gmap.html",insertvideo:"~/dialogs/video/video.html",
help:"~/dialogs/help/help.html",preview:"~/dialogs/preview/preview.html",emotion:"~/dialogs/emotion/emotion.html",wordimage:"~/dialogs/wordimage/wordimage.html",attachment:"~/dialogs/attachment/attachment.html",insertframe:"~/dialogs/insertframe/insertframe.html",edittip:"~/dialogs/table/edittip.html",edittable:"~/dialogs/table/edittable.html",edittd:"~/dialogs/table/edittd.html",webapp:"~/dialogs/webapp/webapp.html",snapscreen:"~/dialogs/snapscreen/snapscreen.html",scrawl:"~/dialogs/scrawl/scrawl.html",
music:"~/dialogs/music/music.html",template:"~/dialogs/template/template.html",background:"~/dialogs/background/background.html",charts:"~/dialogs/charts/charts.html"},c="undo redo formatmatch bold italic underline fontborder touppercase tolowercase strikethrough subscript superscript source indent outdent blockquote pasteplain pagebreak selectall print horizontal removeformat time date unlink insertparagraphbeforetable insertrow insertcol mergeright mergedown deleterow deletecol splittorows splittocols splittocells mergecells deletetable drafts".split(" "),
g=0,f;f=c[g++];)f=f.toLowerCase(),a[f]=function(b){return function(c){var d=new a.Button({className:"edui-for-"+b,title:c.options.labelMap[b]||c.getLang("labelMap."+b)||"",onclick:function(){c.execCommand(b)},theme:c.options.theme,showText:!1});a.buttons[b]=d;c.addListener("selectionchange",function(a,e,f){a=c.queryCommandState(b);-1==a?(d.setDisabled(!0),d.setChecked(!1)):f||(d.setDisabled(!1),d.setChecked(a))});return d}}(f);a.cleardoc=function(b){var c=new a.Button({className:"edui-for-cleardoc",
title:b.options.labelMap.cleardoc||b.getLang("labelMap.cleardoc")||"",theme:b.options.theme,onclick:function(){confirm(b.getLang("confirmClear"))&&b.execCommand("cleardoc")}});a.buttons.cleardoc=c;b.addListener("selectionchange",function(){c.setDisabled(-1==b.queryCommandState("cleardoc"))});return c};var c={justify:["left","right","center","justify"],imagefloat:["none","left","center","right"],directionality:["ltr","rtl"]},k;for(k in c)(function(b,c){for(var d=0,e;e=c[d++];)(function(c){a[b.replace("float",
"")+c]=function(d){var e=new a.Button({className:"edui-for-"+b.replace("float","")+c,title:d.options.labelMap[b.replace("float","")+c]||d.getLang("labelMap."+b.replace("float","")+c)||"",theme:d.options.theme,onclick:function(){d.execCommand(b,c)}});a.buttons[b]=e;d.addListener("selectionchange",function(a,f,g){e.setDisabled(-1==d.queryCommandState(b));e.setChecked(d.queryCommandValue(b)==c&&!g)});return e}})(e)})(k,c[k]);for(g=0;f=["backcolor","forecolor"][g++];)a[f]=function(b){return function(c){var d=
new a.ColorButton({className:"edui-for-"+b,color:"default",title:c.options.labelMap[b]||c.getLang("labelMap."+b)||"",editor:c,onpickcolor:function(a,d){c.execCommand(b,d)},onpicknocolor:function(){c.execCommand(b,"default");this.setColor("transparent");this.color="default"},onbuttonclick:function(){c.execCommand(b,this.color)}});a.buttons[b]=d;c.addListener("selectionchange",function(){d.setDisabled(-1==c.queryCommandState(b))});return d}}(f);c={noOk:["searchreplace","help","spechars","webapp","preview"],
ok:"attachment anchor link insertimage map gmap insertframe wordimage insertvideo insertframe edittip edittable edittd scrawl template music background charts".split(" ")};for(k in c)(function(c,e){for(var f=0,g;g=e[f++];)q.opera&&"searchreplace"===g||function(e){a[e]=function(f,g,k){g=g||(f.options.iframeUrlMap||{})[e]||b[e];k=f.options.labelMap[e]||f.getLang("labelMap."+e)||"";var n;g&&(n=new a.Dialog(d.extend({iframeUrl:f.ui.mapUrl(g),editor:f,className:"edui-for-"+e,title:k,holdScroll:"insertimage"===
e,fullscreen:/charts|preview/.test(e),closeDialog:f.getLang("closeDialog")},"ok"==c?{buttons:[{className:"edui-okbutton",label:f.getLang("ok"),editor:f,onclick:function(){n.close(!0)}},{className:"edui-cancelbutton",label:f.getLang("cancel"),editor:f,onclick:function(){n.close(!1)}}]}:{})),f.ui._dialogs[e+"Dialog"]=n);var m=new a.Button({className:"edui-for-"+e,title:k,onclick:function(){if(n)switch(e){case "wordimage":var a=f.execCommand("wordimage");a&&a.length&&(n.render(),n.open());break;case "scrawl":-1!=
f.queryCommandState("scrawl")&&(n.render(),n.open());break;default:n.render(),n.open()}},theme:f.options.theme,disabled:"scrawl"==e&&-1==f.queryCommandState("scrawl")||"charts"==e});a.buttons[e]=m;f.addListener("selectionchange",function(){if(!(e in{edittable:1})){var a=f.queryCommandState(e);m.getDom()&&(m.setDisabled(-1==a),m.setChecked(a))}});return m}}(g.toLowerCase())})(k,c[k]);a.snapscreen=function(c,d,e){e=c.options.labelMap.snapscreen||c.getLang("labelMap.snapscreen")||"";var f=new a.Button({className:"edui-for-snapscreen",
title:e,onclick:function(){c.execCommand("snapscreen")},theme:c.options.theme});a.buttons.snapscreen=f;if(d=d||(c.options.iframeUrlMap||{}).snapscreen||b.snapscreen){var g=new a.Dialog({iframeUrl:c.ui.mapUrl(d),editor:c,className:"edui-for-snapscreen",title:e,buttons:[{className:"edui-okbutton",label:c.getLang("ok"),editor:c,onclick:function(){g.close(!0)}},{className:"edui-cancelbutton",label:c.getLang("cancel"),editor:c,onclick:function(){g.close(!1)}}]});g.render();c.ui._dialogs.snapscreenDialog=
g}c.addListener("selectionchange",function(){f.setDisabled(-1==c.queryCommandState("snapscreen"))});return f};a.insertcode=function(b,c,e){c=b.options.insertcode||[];e=b.options.labelMap.insertcode||b.getLang("labelMap.insertcode")||"";var f=[];d.each(c,function(a,c){f.push({label:a,value:c,theme:b.options.theme,renderLabelHtml:function(){return'<div class="edui-label %%-label" >'+(this.label||"")+"</div>"}})});var g=new a.Combox({editor:b,items:f,onselect:function(a,c){b.execCommand("insertcode",
this.items[c].value)},onbuttonclick:function(){this.showPopup()},title:e,initValue:e,className:"edui-for-insertcode",indexByValue:function(a){if(a)for(var b=0,c;c=this.items[b];b++)if(-1!=c.value.indexOf(a))return b;return-1}});a.buttons.insertcode=g;b.addListener("selectionchange",function(a,c,d){d||(-1==b.queryCommandState("insertcode")?g.setDisabled(!0):(g.setDisabled(!1),(a=b.queryCommandValue("insertcode"))?(a&&(a=a.replace(/['"]/g,"").split(",")[0]),g.setValue(a)):g.setValue(e)))});return g};
a.fontfamily=function(b,c,e){c=b.options.fontfamily||[];e=b.options.labelMap.fontfamily||b.getLang("labelMap.fontfamily")||"";if(c.length){for(var f=0,g,k=[];g=c[f];f++){var p=b.getLang("fontfamily")[g.name]||"";(function(a,c){k.push({label:a,value:c,theme:b.options.theme,renderLabelHtml:function(){return'<div class="edui-label %%-label" style="font-family:'+d.unhtml(this.value)+'">'+(this.label||"")+"</div>"}})})(g.label||p,g.val)}var q=new a.Combox({editor:b,items:k,onselect:function(a,c){b.execCommand("FontFamily",
this.items[c].value)},onbuttonclick:function(){this.showPopup()},title:e,initValue:e,className:"edui-for-fontfamily",indexByValue:function(a){if(a)for(var b=0,c;c=this.items[b];b++)if(-1!=c.value.indexOf(a))return b;return-1}});a.buttons.fontfamily=q;b.addListener("selectionchange",function(a,c,d){d||(-1==b.queryCommandState("FontFamily")?q.setDisabled(!0):(q.setDisabled(!1),(a=b.queryCommandValue("FontFamily"))&&(a=a.replace(/['"]/g,"").split(",")[0]),q.setValue(a)))});return q}};a.fontsize=function(b,
c,d){d=b.options.labelMap.fontsize||b.getLang("labelMap.fontsize")||"";c=c||b.options.fontsize||[];if(c.length){for(var e=[],f=0;f<c.length;f++){var g=c[f]+"px";e.push({label:g,value:g,theme:b.options.theme,renderLabelHtml:function(){return'<div class="edui-label %%-label" style="line-height:1;font-size:'+this.value+'">'+(this.label||"")+"</div>"}})}var k=new a.Combox({editor:b,items:e,title:d,initValue:d,onselect:function(a,c){b.execCommand("FontSize",this.items[c].value)},onbuttonclick:function(){this.showPopup()},
className:"edui-for-fontsize"});a.buttons.fontsize=k;b.addListener("selectionchange",function(a,c,d){d||(-1==b.queryCommandState("FontSize")?k.setDisabled(!0):(k.setDisabled(!1),k.setValue(b.queryCommandValue("FontSize"))))});return k}};a.paragraph=function(b,c,e){e=b.options.labelMap.paragraph||b.getLang("labelMap.paragraph")||"";c=b.options.paragraph||[];if(!d.isEmptyObject(c)){var f=[],g;for(g in c)f.push({value:g,label:c[g]||b.getLang("paragraph")[g],theme:b.options.theme,renderLabelHtml:function(){return'<div class="edui-label %%-label"><span class="edui-for-'+
this.value+'">'+(this.label||"")+"</span></div>"}});var k=new a.Combox({editor:b,items:f,title:e,initValue:e,className:"edui-for-paragraph",onselect:function(a,c){b.execCommand("Paragraph",this.items[c].value)},onbuttonclick:function(){this.showPopup()}});a.buttons.paragraph=k;b.addListener("selectionchange",function(a,c,d){d||(-1==b.queryCommandState("Paragraph")?k.setDisabled(!0):(k.setDisabled(!1),a=b.queryCommandValue("Paragraph"),-1!=k.indexByValue(a)?k.setValue(a):k.setValue(k.initValue)))});
return k}};a.customstyle=function(b){var c=b.options.customstyle||[],d=b.options.labelMap.customstyle||b.getLang("labelMap.customstyle")||"";if(c.length){for(var e=b.getLang("customstyle"),f=0,g=[],k;k=c[f++];)(function(a){var c={};c.label=a.label?a.label:e[a.name];c.style=a.style;c.className=a.className;c.tag=a.tag;g.push({label:c.label,value:c,theme:b.options.theme,renderLabelHtml:function(){return'<div class="edui-label %%-label"><'+c.tag+" "+(c.className?' class="'+c.className+'"':"")+(c.style?
' style="'+c.style+'"':"")+">"+c.label+"</"+c.tag+"></div>"}})})(k);var h=new a.Combox({editor:b,items:g,title:d,initValue:d,className:"edui-for-customstyle",onselect:function(a,c){b.execCommand("customstyle",this.items[c].value)},onbuttonclick:function(){this.showPopup()},indexByValue:function(a){for(var b=0,c;c=this.items[b++];)if(c.label==a)return b-1;return-1}});a.buttons.customstyle=h;b.addListener("selectionchange",function(a,c,d){d||(-1==b.queryCommandState("customstyle")?h.setDisabled(!0):
(h.setDisabled(!1),a=b.queryCommandValue("customstyle"),-1!=h.indexByValue(a)?h.setValue(a):h.setValue(h.initValue)))});return h}};a.inserttable=function(b,c,d){d=b.options.labelMap.inserttable||b.getLang("labelMap.inserttable")||"";var e=new a.TableButton({editor:b,title:d,className:"edui-for-inserttable",onpicktable:function(a,c,d){b.execCommand("InsertTable",{numRows:d,numCols:c,border:1})},onbuttonclick:function(){this.showPopup()}});a.buttons.inserttable=e;b.addListener("selectionchange",function(){e.setDisabled(-1==
b.queryCommandState("inserttable"))});return e};a.lineheight=function(b){var c=b.options.lineheight||[];if(c.length){for(var d=0,e,f=[];e=c[d++];)f.push({label:e,value:e,theme:b.options.theme,onclick:function(){b.execCommand("lineheight",this.value)}});var g=new a.MenuButton({editor:b,className:"edui-for-lineheight",title:b.options.labelMap.lineheight||b.getLang("labelMap.lineheight")||"",items:f,onbuttonclick:function(){var a=b.queryCommandValue("LineHeight")||this.value;b.execCommand("LineHeight",
a)}});a.buttons.lineheight=g;b.addListener("selectionchange",function(){var a=b.queryCommandState("LineHeight");if(-1==a)g.setDisabled(!0);else{g.setDisabled(!1);var c=b.queryCommandValue("LineHeight");c&&g.setValue((c+"").replace(/cm/,""));g.setChecked(a)}});return g}};k=["top","bottom"];for(c=0;g=k[c++];)(function(b){a["rowspacing"+b]=function(c){var d=c.options["rowspacing"+b]||[];if(!d.length)return null;for(var e=0,f,g=[];f=d[e++];)g.push({label:f,value:f,theme:c.options.theme,onclick:function(){c.execCommand("rowspacing",
this.value,b)}});var k=new a.MenuButton({editor:c,className:"edui-for-rowspacing"+b,title:c.options.labelMap["rowspacing"+b]||c.getLang("labelMap.rowspacing"+b)||"",items:g,onbuttonclick:function(){var a=c.queryCommandValue("rowspacing",b)||this.value;c.execCommand("rowspacing",a,b)}});a.buttons[b]=k;c.addListener("selectionchange",function(){var a=c.queryCommandState("rowspacing",b);if(-1==a)k.setDisabled(!0);else{k.setDisabled(!1);var d=c.queryCommandValue("rowspacing",b);d&&k.setValue((d+"").replace(/%/,
""));k.setChecked(a)}});return k}})(g);k=["insertorderedlist","insertunorderedlist"];for(c=0;g=k[c++];)(function(b){a[b]=function(c){var d=c.options[b],e=function(){c.execCommand(b,this.value)},f=[],g;for(g in d)f.push({label:d[g]||c.getLang()[b][g]||"",value:g,theme:c.options.theme,onclick:e});var k=new a.MenuButton({editor:c,className:"edui-for-"+b,title:c.getLang("labelMap."+b)||"",items:f,onbuttonclick:function(){var a=c.queryCommandValue(b)||this.value;c.execCommand(b,a)}});a.buttons[b]=k;c.addListener("selectionchange",
function(){var a=c.queryCommandState(b);if(-1==a)k.setDisabled(!0);else{k.setDisabled(!1);var d=c.queryCommandValue(b);k.setValue(d);k.setChecked(a)}});return k}})(g);a.fullscreen=function(b,c){c=b.options.labelMap.fullscreen||b.getLang("labelMap.fullscreen")||"";var d=new a.Button({className:"edui-for-fullscreen",title:c,theme:b.options.theme,onclick:function(){b.ui&&b.ui.setFullScreen(!b.ui.isFullScreen());this.setChecked(b.ui.isFullScreen())}});a.buttons.fullscreen=d;b.addListener("selectionchange",
function(){var a=b.queryCommandState("fullscreen");d.setDisabled(-1==a);d.setChecked(b.ui.isFullScreen())});return d};a.emotion=function(c,d){var e=new a.MultiMenuPop({title:c.options.labelMap.emotion||c.getLang("labelMap.emotion")||"",editor:c,className:"edui-for-emotion",iframeUrl:c.ui.mapUrl(d||(c.options.iframeUrlMap||{}).emotion||b.emotion)});a.buttons.emotion=e;c.addListener("selectionchange",function(){e.setDisabled(-1==c.queryCommandState("emotion"))});return e};a.autotypeset=function(b){var c=
new a.AutoTypeSetButton({editor:b,title:b.options.labelMap.autotypeset||b.getLang("labelMap.autotypeset")||"",className:"edui-for-autotypeset",onbuttonclick:function(){b.execCommand("autotypeset")}});a.buttons.autotypeset=c;b.addListener("selectionchange",function(){c.setDisabled(-1==b.queryCommandState("autotypeset"))});return c}})();(function(){function d(a){this.initOptions(a);this.initEditorUI()}var a=s.editor.utils,e=s.editor.ui.uiUtils,b=s.editor.ui.UIBase,c=s.editor.dom.domUtils,g=[];d.prototype=
{uiName:"editor",initEditorUI:function(){function a(b,c){b.setOpt({wordCount:!0,maximumWords:1E4,wordCountMsg:b.options.wordCountMsg||b.getLang("wordCountMsg"),wordOverFlowMsg:b.options.wordOverFlowMsg||b.getLang("wordOverFlowMsg")});var d=b.options,e=d.maximumWords,f=d.wordCountMsg,g=d.wordOverFlowMsg,k=c.getDom("wordcount");d.wordCount&&(d=b.getContentLength(!0),d>e?(k.innerHTML=g,b.fireEvent("wordcountoverflow")):k.innerHTML=f.replace("{#leave}",e-d).replace("{#count}",d))}this.editor.ui=this;
this._dialogs={};this.initUIBase();this._initToolbars();var b=this.editor,d=this;b.addListener("ready",function(){b.getDialog=function(a){return b.ui._dialogs[a+"Dialog"]};c.on(b.window,"scroll",function(a){s.editor.ui.Popup.postHide(a)});b.ui._actualFrameWidth=b.options.initialFrameWidth;UE.browser.ie&&6===UE.browser.version&&b.container.ownerDocument.execCommand("BackgroundImageCache",!1,!0);b.options.elementPathEnabled&&(b.ui.getDom("elementpath").innerHTML='<div class="edui-editor-breadcrumb">'+
b.getLang("elementPathTip")+":</div>");b.options.wordCount&&(c.on(b.document,"click",function(){a(b,d);c.un(b.document,"click",arguments.callee)}),b.ui.getDom("wordcount").innerHTML=b.getLang("wordCountTip"));b.ui._scale();b.options.scaleEnabled?(b.autoHeightEnabled&&b.disableAutoHeight(),d.enableScale()):d.disableScale();b.options.elementPathEnabled||(b.options.wordCount||b.options.scaleEnabled)||(b.ui.getDom("elementpath").style.display="none",b.ui.getDom("wordcount").style.display="none",b.ui.getDom("scale").style.display=
"none");b.selection.isFocus()&&b.fireEvent("selectionchange",!1,!0)});b.addListener("mousedown",function(a,b){s.editor.ui.Popup.postHide(b,b.target||b.srcElement);s.editor.ui.ShortCutMenu.postHide(b)});b.addListener("delcells",function(){UE.ui.edittip&&new UE.ui.edittip(b);b.getDialog("edittip").open()});var e,f=!1,g;b.addListener("afterpaste",function(){b.queryCommandState("pasteplain")||(s.editor.ui.PastePicker&&(e=new s.editor.ui.Popup({content:new s.editor.ui.PastePicker({editor:b}),editor:b,
className:"edui-wordpastepop"}),e.render()),f=!0)});b.addListener("afterinserthtml",function(){clearTimeout(g);g=setTimeout(function(){if(e&&(f||b.ui._isTransfer)){if(e.isHidden()){var a=c.createElement(b.document,"span",{style:"line-height:0px;",innerHTML:"\ufeff"});b.selection.getRange().insertNode(a);var d=Y(a,"firstChild","previousSibling");e.showAnchor(3==d.nodeType?d.parentNode:d);c.remove(a)}else e.show();delete b.ui._isTransfer;f=!1}},200)});b.addListener("contextmenu",function(a,b){s.editor.ui.Popup.postHide(b)});
b.addListener("keydown",function(a,b){e&&e.dispose(b);var c=b.keyCode||b.which;if(b.altKey&&90==c)UE.ui.buttons.fullscreen.onclick()});b.addListener("wordcount",function(b){a(this,d)});b.addListener("selectionchange",function(){if(b.options.elementPathEnabled)d[(-1==b.queryCommandState("elementpath")?"dis":"en")+"ableElementPath"]();if(b.options.scaleEnabled)d[(-1==b.queryCommandState("scale")?"dis":"en")+"ableScale"]()});var h=new s.editor.ui.Popup({editor:b,content:"",className:"edui-bubble",_onEditButtonClick:function(){this.hide();
b.ui._dialogs.linkDialog.open()},_onImgEditButtonClick:function(a){this.hide();b.ui._dialogs[a]&&b.ui._dialogs[a].open()},_onImgSetFloat:function(a){this.hide();b.execCommand("imagefloat",a)},_setIframeAlign:function(a){var b=h.anchorEl,d=b.cloneNode(!0);switch(a){case -2:d.setAttribute("align","");break;case -1:d.setAttribute("align","left");break;case 1:d.setAttribute("align","right")}b.parentNode.insertBefore(d,b);c.remove(b);h.anchorEl=d;h.showAnchor(h.anchorEl)},_updateIframe:function(){var a=
b._iframe=h.anchorEl;c.hasClass(a,"ueditor_baidumap")?(b.selection.getRange().selectNode(a).select(),b.ui._dialogs.mapDialog.open()):b.ui._dialogs.insertframeDialog.open();h.hide()},_onRemoveButtonClick:function(a){b.execCommand(a);this.hide()},queryAutoHide:function(a){return a&&a.ownerDocument==b.document&&("img"==a.tagName.toLowerCase()||c.findParentByTagName(a,"a",!0))?a!==h.anchorEl:s.editor.ui.Popup.prototype.queryAutoHide.call(this,a)}});h.render();b.options.imagePopup&&(b.addListener("mouseover",
function(a,c){c=c||window.event;var d=c.target||c.srcElement;if(b.ui._dialogs.insertframeDialog&&/iframe/ig.test(d.tagName)){var e=h.formatHtml("<nobr>"+b.getLang("property")+': <span onclick=$$._setIframeAlign(-2) class="edui-clickable">'+b.getLang("default")+'</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(-1) class="edui-clickable">'+b.getLang("justifyleft")+'</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(1) class="edui-clickable">'+b.getLang("justifyright")+'</span>&nbsp;&nbsp; <span onclick="$$._updateIframe( this);" class="edui-clickable">'+
b.getLang("modify")+"</span></nobr>");e?(h.getDom("content").innerHTML=e,h.anchorEl=d,h.showAnchor(h.anchorEl)):h.hide()}}),b.addListener("selectionchange",function(a,c){if(c){var d="",e="",f=b.selection.getRange().getClosedNode(),e=b.ui._dialogs;if(f&&"IMG"==f.tagName){var g="insertimageDialog";if(-1!=f.className.indexOf("edui-faked-video")||-1!=f.className.indexOf("edui-upload-video"))g="insertvideoDialog";-1!=f.className.indexOf("edui-faked-webapp")&&(g="webappDialog");-1!=f.src.indexOf("http://api.map.baidu.com")&&
(g="mapDialog");-1!=f.className.indexOf("edui-faked-music")&&(g="musicDialog");-1!=f.src.indexOf("http://maps.google.com/maps/api/staticmap")&&(g="gmapDialog");f.getAttribute("anchorname")&&(g="anchorDialog",d=h.formatHtml("<nobr>"+b.getLang("property")+': <span onclick=$$._onImgEditButtonClick("anchorDialog") class="edui-clickable">'+b.getLang("modify")+"</span>&nbsp;&nbsp;<span onclick=$$._onRemoveButtonClick('anchor') class=\"edui-clickable\">"+b.getLang("delete")+"</span></nobr>"));f.getAttribute("word_img")&&
(b.word_img=[f.getAttribute("word_img")],g="wordimageDialog");if(!e[g])return;e="<nobr>"+b.getLang("property")+': <span onclick=$$._onImgSetFloat("none") class="edui-clickable">'+b.getLang("default")+'</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat("left") class="edui-clickable">'+b.getLang("justifyleft")+'</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat("right") class="edui-clickable">'+b.getLang("justifyright")+'</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat("center") class="edui-clickable">'+
b.getLang("justifycenter")+"</span>&nbsp;&nbsp;<span onclick=\"$$._onImgEditButtonClick('"+g+'\');" class="edui-clickable">'+b.getLang("modify")+"</span></nobr>";!d&&(d=h.formatHtml(e))}if(b.ui._dialogs.linkDialog){var k=b.queryCommandValue("link"),n;k&&(n=k.getAttribute("_href")||k.getAttribute("href",2))&&(e=n,30<n.length&&(e=n.substring(0,20)+"..."),d&&(d+='<div style="height:5px;"></div>'),d+=h.formatHtml("<nobr>"+b.getLang("anthorMsg")+': <a target="_blank" href="'+n+'" title="'+n+'" >'+e+'</a> <span class="edui-clickable" onclick="$$._onEditButtonClick();">'+
b.getLang("modify")+'</span> <span class="edui-clickable" onclick="$$._onRemoveButtonClick(\'unlink\');"> '+b.getLang("clear")+"</span></nobr>"),h.showAnchor(k))}d?(h.getDom("content").innerHTML=d,h.anchorEl=f||k,h.showAnchor(h.anchorEl)):h.hide()}}))},_initToolbars:function(){for(var a=this.editor,b=this.toolbars||[],c=[],d=0;d<b.length;d++){for(var e=b[d],f=new s.editor.ui.Toolbar({theme:a.options.theme}),g=0;g<e.length;g++){var h=e[g],p=null;if("string"==typeof h){if(h=h.toLowerCase(),"|"==h&&
(h="Separator"),"||"==h&&(h="Breakline"),s.editor.ui[h]&&(p=new s.editor.ui[h](a)),"fullscreen"==h){c&&c[0]?c[0].items.splice(0,0,p):p&&f.items.splice(0,0,p);continue}}else p=h;p&&p.id&&f.add(p)}c[d]=f}this.toolbars=c},getHtmlTpl:function(){return'<div id="##" class="%%"><div id="##_toolbarbox" class="%%-toolbarbox">'+(this.toolbars.length?'<div id="##_toolbarboxouter" class="%%-toolbarboxouter"><div class="%%-toolbarboxinner">'+this.renderToolbarBoxHtml()+"</div></div>":"")+'<div id="##_toolbarmsg" class="%%-toolbarmsg" style="display:none;"><div id = "##_upload_dialog" class="%%-toolbarmsg-upload" onclick="$$.showWordImageDialog();">'+
this.editor.getLang("clickToUpload")+'</div><div class="%%-toolbarmsg-close" onclick="$$.hideToolbarMsg();">x</div><div id="##_toolbarmsg_label" class="%%-toolbarmsg-label"></div><div style="height:0;overflow:hidden;clear:both;"></div></div></div><div id="##_iframeholder" class="%%-iframeholder"></div><div id="##_bottombar" class="%%-bottomContainer"><table><tr><td id="##_elementpath" class="%%-bottombar"></td><td id="##_wordcount" class="%%-wordcount"></td><td id="##_scale" class="%%-scale"><div class="%%-icon"></div></td></tr></table></div><div id="##_scalelayer"></div></div>'},
showWordImageDialog:function(){this._dialogs.wordimageDialog.open()},renderToolbarBoxHtml:function(){for(var a=[],b=0;b<this.toolbars.length;b++)a.push(this.toolbars[b].renderHtml());return a.join("")},setFullScreen:function(a){var b=this.editor,c=b.container.parentNode.parentNode;if(this._fullscreen!=a){this._fullscreen=a;this.editor.fireEvent("beforefullscreenchange",a);if(s.editor.browser.gecko)var d=b.selection.getRange().createBookmark();if(a){for(;"BODY"!=c.tagName;){var e=s.editor.dom.domUtils.getComputedStyle(c,
"position");g.push(e);c.style.position="static";c=c.parentNode}this._bakHtmlOverflow=document.documentElement.style.overflow;this._bakBodyOverflow=document.body.style.overflow;this._bakAutoHeight=this.editor.autoHeightEnabled;this._bakScrollTop=Math.max(document.documentElement.scrollTop,document.body.scrollTop);this._bakEditorContaninerWidth=b.iframe.parentNode.offsetWidth;this._bakAutoHeight&&(b.autoHeightEnabled=!1,this.editor.disableAutoHeight());document.documentElement.style.overflow="hidden";
window.scrollTo(0,window.scrollY);this._bakCssText=this.getDom().style.cssText;this._bakCssText1=this.getDom("iframeholder").style.cssText;b.iframe.parentNode.style.width="";this._updateFullScreen()}else{for(;"BODY"!=c.tagName;)c.style.position=g.shift(),c=c.parentNode;this.getDom().style.cssText=this._bakCssText;this.getDom("iframeholder").style.cssText=this._bakCssText1;this._bakAutoHeight&&(b.autoHeightEnabled=!0,this.editor.enableAutoHeight());document.documentElement.style.overflow=this._bakHtmlOverflow;
document.body.style.overflow=this._bakBodyOverflow;b.iframe.parentNode.style.width=this._bakEditorContaninerWidth+"px";window.scrollTo(0,this._bakScrollTop)}if(q.gecko&&"true"===b.body.contentEditable){var f=document.createElement("input");document.body.appendChild(f);b.body.contentEditable=!1;setTimeout(function(){f.focus();setTimeout(function(){b.body.contentEditable=!0;b.fireEvent("fullscreenchanged",a);b.selection.getRange().moveToBookmark(d).select(!0);s.editor.dom.domUtils.remove(f);a&&window.scroll(0,
0)},0)},0)}"true"===b.body.contentEditable&&(this.editor.fireEvent("fullscreenchanged",a),this.triggerLayout())}},_updateFullScreen:function(){if(this._fullscreen){var a=e.getViewportRect();this.getDom().style.cssText="border:0;position:absolute;left:0;top:"+(this.editor.options.topOffset||0)+"px;width:"+a.width+"px;height:"+a.height+"px;z-index:"+(1*this.getDom().style.zIndex+100);e.setViewportOffset(this.getDom(),{left:0,top:this.editor.options.topOffset||0});this.editor.setHeight(a.height-this.getDom("toolbarbox").offsetHeight-
this.getDom("bottombar").offsetHeight-(this.editor.options.topOffset||0));if(q.gecko)try{window.onresize()}catch(b){}}},_updateElementPath:function(){var a=this.getDom("elementpath"),b;if(this.elementPathEnabled&&(b=this.editor.queryCommandValue("elementpath"))){for(var c=[],d=0,e;e=b[d];d++)c[d]=this.formatHtml('<span unselectable="on" onclick="$$.editor.execCommand(&quot;elementpath&quot;, &quot;'+d+'&quot;);">'+e+"</span>");a.innerHTML='<div class="edui-editor-breadcrumb" onmousedown="return false;">'+
this.editor.getLang("elementPathTip")+": "+c.join(" &gt; ")+"</div>"}else a.style.display="none"},disableElementPath:function(){var a=this.getDom("elementpath");a.innerHTML="";a.style.display="none";this.elementPathEnabled=!1},enableElementPath:function(){this.getDom("elementpath").style.display="";this.elementPathEnabled=!0;this._updateElementPath()},_scale:function(){function a(){H=c.getXY(h);I||(I=g.options.minFrameHeight+s.offsetHeight+v.offsetHeight);D.style.cssText="position:absolute;left:0;display:;top:0;background-color:#41ABFF;opacity:0.4;filter: Alpha(opacity=40);width:"+
h.offsetWidth+"px;height:"+h.offsetHeight+"px;z-index:"+(g.options.zIndex+1);c.on(f,"mousemove",b);c.on(p,"mouseup",d);c.on(f,"mouseup",d)}function b(a){e();a=a||window.event;O=a.pageX||f.documentElement.scrollLeft+a.clientX;z=a.pageY||f.documentElement.scrollTop+a.clientY;E=O-H.x;B=z-H.y;E>=J&&(L=!0,D.style.width=E+"px");B>=I&&(L=!0,D.style.height=B+"px")}function d(){L&&(L=!1,g.ui._actualFrameWidth=D.offsetWidth-2,h.style.width=g.ui._actualFrameWidth+"px",g.setHeight(D.offsetHeight-v.offsetHeight-
s.offsetHeight-2));D&&(D.style.display="none");e();c.un(f,"mousemove",b);c.un(p,"mouseup",d);c.un(f,"mouseup",d)}function e(){q.ie?f.selection.clear():window.getSelection().removeAllRanges()}var f=document,g=this.editor,h=g.container,p=g.document,s=this.getDom("toolbarbox"),v=this.getDom("bottombar"),F=this.getDom("scale"),D=this.getDom("scalelayer"),L=!1,H=null,I=0,J=g.options.minFrameWidth,O=0,z=0,E=0,B=0,A=this;this.editor.addListener("fullscreenchanged",function(a,b){if(b)A.disableScale();else if(A.editor.options.scaleEnabled){A.enableScale();
var d=A.editor.document.createElement("span");A.editor.body.appendChild(d);A.editor.body.style.height=Math.max(c.getXY(d).y,A.editor.iframe.offsetHeight-20)+"px";c.remove(d)}});this.enableScale=function(){1!=g.queryCommandState("source")&&(F.style.display="",this.scaleEnabled=!0,c.on(F,"mousedown",a))};this.disableScale=function(){F.style.display="none";this.scaleEnabled=!1;c.un(F,"mousedown",a)}},isFullScreen:function(){return this._fullscreen},postRender:function(){b.prototype.postRender.call(this);
for(var a=0;a<this.toolbars.length;a++)this.toolbars[a].postRender();var c=this,d,e=s.editor.dom.domUtils,f=function(){clearTimeout(d);d=setTimeout(function(){c._updateFullScreen()})};e.on(window,"resize",f);c.addListener("destroy",function(){e.un(window,"resize",f);clearTimeout(d)})},showToolbarMsg:function(a,b){this.getDom("toolbarmsg_label").innerHTML=a;this.getDom("toolbarmsg").style.display="";b||(this.getDom("upload_dialog").style.display="none")},hideToolbarMsg:function(){this.getDom("toolbarmsg").style.display=
"none"},mapUrl:function(a){return a?a.replace("~/",this.editor.options.UEDITOR_HOME_URL||""):""},triggerLayout:function(){var a=this.getDom();a.style.zoom="1"==a.style.zoom?"100%":"1"}};a.inherits(d,s.editor.ui.UIBase);var f={};UE.ui.Editor=function(b){var e=new UE.Editor(b);e.options.editor=e;a.loadFile(document,{href:e.options.themePath+e.options.theme+"/css/ueditor.css",tag:"link",type:"text/css",rel:"stylesheet"});var g=e.render;e.render=function(b){b.constructor===String&&(e.key=b,f[b]=e);a.domReady(function(){function a(){e.setOpt({labelMap:e.options.labelMap||
e.getLang("labelMap")});new d(e.options);if(b&&(b.constructor===String&&(b=document.getElementById(b)),b&&b.getAttribute("name")&&(e.options.textarea=b.getAttribute("name")),b&&/script|textarea/ig.test(b.tagName))){var f=document.createElement("div");b.parentNode.insertBefore(f,b);var k=b.value||b.innerHTML;e.options.initialContent=/^[\t\r\n ]*$/.test(k)?e.options.initialContent:k.replace(/>[\n\r\t]+([ ]{4})+/g,">").replace(/[\n\r\t]+([ ]{4})+</g,"<").replace(/>[\n\r\t]+</g,"><");b.className&&(f.className=
b.className);b.style.cssText&&(f.style.cssText=b.style.cssText);/textarea/i.test(b.tagName)?(e.textarea=b,e.textarea.style.display="none"):(b.parentNode.removeChild(b),b.id&&(f.id=b.id));b=f;b.innerHTML=""}c.addClass(b,"edui-"+e.options.theme);e.ui.render(b);f=e.options;e.container=e.ui.getDom();for(var k=c.findParents(b,!0),p=[],r=0,q;q=k[r];r++)p[r]=q.style.display,q.style.display="block";f.minFrameWidth=f.initialFrameWidth?f.initialFrameWidth:f.initialFrameWidth=b.offsetWidth;f.initialFrameHeight?
f.minFrameHeight=f.initialFrameHeight:f.initialFrameHeight=f.minFrameHeight=b.offsetHeight;for(r=0;q=k[r];r++)q.style.display=p[r];b.style.height&&(b.style.height="");e.container.style.width=f.initialFrameWidth+(/%$/.test(f.initialFrameWidth)?"":"px");e.container.style.zIndex=f.zIndex;g.call(e,e.ui.getDom("iframeholder"));e.fireEvent("afteruiready")}e.langIsReady?a():e.addListener("langReady",a)})};return e};UE.getEditor=function(a,b){var c=f[a];c||(c=f[a]=new UE.ui.Editor(b),c.render(a));return c};
UE.delEditor=function(a){var b;if(b=f[a])b.key&&b.destroy(),delete f[a]}})();(function(){var d=s.editor.utils,a=s.editor.ui.Popup,e=s.editor.ui.SplitButton,b=s.editor.ui.MultiMenuPop=function(a){this.initOptions(a);this.initMultiMenu()};b.prototype={initMultiMenu:function(){var b=this;this.popup=new a({content:"",editor:b.editor,iframe_rendered:!1,onshow:function(){this.iframe_rendered||(this.iframe_rendered=!0,this.getDom("content").innerHTML='<iframe id="'+b.id+'_iframe" src="'+b.iframeUrl+'" frameborder="0"></iframe>',
b.editor.container.style.zIndex&&(this.getDom().style.zIndex=1*b.editor.container.style.zIndex+1))}});this.onbuttonclick=function(){this.showPopup()};this.initSplitButton()}};d.inherits(b,e)})();(function(){function d(a){if(!g.findParent(a.target||a.srcElement,function(a){return g.hasClass(a,"edui-shortcutmenu")||g.hasClass(a,"edui-popup")},!0)){a=0;for(var b;b=f[a++];)b.hide()}}var a=s.editor.ui,e=a.UIBase,b=a.uiUtils,c=s.editor.utils,g=s.editor.dom.domUtils,f=[],k,l=!1,m=a.ShortCutMenu=function(a){this.initOptions(a);
this.initShortCutMenu()};m.postHide=d;m.prototype={isHidden:!0,SPACE:5,initShortCutMenu:function(){this.items=this.items||[];this.initUIBase();this.initItems();this.initEvent();f.push(this)},initEvent:function(){var a=this,b=a.editor.document;g.on(b,"mousemove",function(b){if(!1===a.isHidden&&!a.getSubMenuMark()&&"contextmenu"!=a.eventType){var c=!0,d=a.getDom(),e=d.offsetWidth/2+a.SPACE,f=d.offsetHeight/2,g=Math.abs(b.screenX-a.left),h=Math.abs(b.screenY-a.top);clearTimeout(k);k=setTimeout(function(){0<
h&&h<f?a.setOpacity(d,"1"):h>f&&h<f+70?(a.setOpacity(d,"0.5"),c=!1):h>f+70&&h<f+140&&a.hide();c&&0<g&&g<e?a.setOpacity(d,"1"):g>e&&g<e+70?a.setOpacity(d,"0.5"):g>e+70&&g<e+140&&a.hide()})}});if(q.chrome)g.on(b,"mouseout",function(b){b=b.relatedTarget||b.toElement;null!=b&&"HTML"!=b.tagName||a.hide()});a.editor.addListener("afterhidepop",function(){a.isHidden||(l=!0)})},initItems:function(){if(c.isArray(this.items))for(var b=0,d=this.items.length;b<d;b++){var e=this.items[b].toLowerCase();a[e]&&(this.items[b]=
new a[e](this.editor),this.items[b].className+=" edui-shortcutsubmenu ")}},setOpacity:function(a,b){q.ie&&9>q.version?a.style.filter="alpha(opacity = "+100*parseFloat(b)+");":a.style.opacity=b},getSubMenuMark:function(){l=!1;for(var a=b.getFixedLayer(),a=g.getElementsByTagName(a,"div",function(a){return g.hasClass(a,"edui-shortcutsubmenu edui-popup")}),c=0,d;d=a[c++];)"none"!=d.style.display&&(l=!0);return l},show:function(a,c){function d(a){0>a.left&&(a.left=0);0>a.top&&(a.top=0);h.style.cssText=
"position:absolute;left:"+a.left+"px;top:"+a.top+"px;"}function e(a){a.tagName||(a=a.getDom());f.left=parseInt(a.style.left);f.top=parseInt(a.style.top);f.top-=h.offsetHeight+15;d(f)}var f={},h=this.getDom(),k=b.getFixedLayer();this.eventType=a.type;h.style.cssText="display:block;left:-9999px";if("contextmenu"==a.type&&c){var l=g.getElementsByTagName(k,"div","edui-contextmenu")[0];l?e(l):this.editor.addListener("aftershowcontextmenu",function(a,b){e(b)})}else f=b.getViewportOffsetByEvent(a),f.top-=
h.offsetHeight+this.SPACE,f.left+=this.SPACE+20,d(f),this.setOpacity(h,0.2);this.isHidden=!1;this.left=a.screenX+h.offsetWidth/2-this.SPACE;this.top=a.screenY-h.offsetHeight/2-this.SPACE;this.editor&&(h.style.zIndex=1*this.editor.container.style.zIndex+10,k.style.zIndex=h.style.zIndex-1)},hide:function(){this.getDom()&&(this.getDom().style.display="none");this.isHidden=!0},postRender:function(){if(c.isArray(this.items))for(var a=0,b;b=this.items[a++];)b.postRender()},getHtmlTpl:function(){var a;if(c.isArray(this.items)){a=
[];for(var b=0;b<this.items.length;b++)a[b]=this.items[b].renderHtml();a=a.join("")}else a=this.items;return'<div id="##" class="%% edui-toolbar" data-src="shortcutmenu" onmousedown="return false;" onselectstart="return false;" >'+a+"</div>"}};c.inherits(m,e);g.on(document,"mousedown",function(a){d(a)});g.on(window,"scroll",function(a){d(a)})})();(function(){var d=s.editor.utils,a=s.editor.ui.UIBase,e=s.editor.ui.Breakline=function(a){this.initOptions(a);this.initSeparator()};e.prototype={uiName:"Breakline",
initSeparator:function(){this.initUIBase()},getHtmlTpl:function(){return"<br/>"}};d.inherits(e,a)})()})();
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//




;
//ueditor custom config
(function () {
    window.CUSTOM_CONFIG = {
      // Insert your config code
      // toolbars: [
      //      ['Source','Undo','Redo','Cleardoc','SearchReplace','InsertImage','WordImage','Bold','ForeColor','JustifyLeft',
      //      'JustifyCenter','JustifyRight','JustifyJustify','RemoveFormat','FormatMatch','AutoTypeSet','PastePlain',
      //      'FontSize','Preview','Link','FullScreen', 'PageBreak', 'InsertTable','Attachment','InsertVideo']
      // ]
    };
    jQuery.extend(window.UEDITOR_CONFIG, window.CUSTOM_CONFIG);
})();
(function() {


}).call(this);
(function() {


}).call(this);
// Analog Clock - Head Script
// copyright Stephen Chapman, 19th November 2005, 28th September 2008
// you may copy this clock provided that you retain the copyright notice
//var dayname = new Array ('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'); var am = 'AM'; var pm = 'PM';

// you should not need to alter the below code
//var pi = Math.PI; var d = document; var pi2 = pi/2; var rad = (+clocksize) / 2; var ctrX = (+xpos) + rad; var ctrY = (+ypos) + rad; var hourln = 1; var minln = secln = 2; for(var i = 0; i < (rad / 2) + (rad / 16); i++) {hourln += 1;} for(var i = 0; i < (rad / 2) - (rad / 8); i++) {minln += 2;secln += 2;} var font_size = rad / 4; var offset = 16;  var clocknum = [[,1,2,3,4,5,6,7,8,9,10,11,12],[,'I','II','III','IIII','V','VI','VII','VIII','IX','X','XI','XII'],[,'·','·','-','·','·','<span style="font-size:60%">|</span>','·','·','-','·','·','<span style="font-size:60%">||</span>']]; if (numstyle < 0 || numstyle > 2) numstyle = 0; function timeZone(now,loc,mtz,dst) {if (loc) {var dow = now.getDay(); var second = now.getSeconds(); var minute = now.getMinutes(); var hour = now.getHours();} else {now.setUTCMinutes(now.getUTCMinutes() + (mtz + dst)*60); var dow = now.getUTCDay(); var second = now.getUTCSeconds(); var minute = now.getUTCMinutes(); var hour = now.getUTCHours();} if (hour > 11) {moa = pm; hour -= 12;} else moa = am; return [dow,moa,hour,minute,second];} function commonClock(n) {n.style.position = 'absolute'; n.style.top = '0'; n.style.left = '0'; n.style.visibility = 'hidden';} function displayClock() {if (!d.getElementById) return; var ctx = document.createElement('div'); if ( fix) {ctx.style.position = 'relative'; ctx.style.margin = 'auto'; ctx.style.width = (clocksize + offset * 2) + 'px'; ctx.style.height = (clocksize + offset * 2) + 'px'; ctx.style.overflow = 'visible';} var cn = []; for (var i = 12; i > 0; i--) {cn[i] = document.createElement('div'); cn[i].id = 'cnum' + i; commonClock(cn[i]); cn[i].style.width = (offset * 2) + 'px'; cn[i].style.height = (offset * 2) + 'px'; cn[i].style.fontFamily = font_family; cn[i].style.fontSize = font_size + 'px'; cn[i].style.color = '#' + colnumbers; cn[i].style.textAlign = 'center'; cn[i].style.paddingTop = '10px'; cn[i].style.zIndex = 1000; cn[i].innerHTML = clocknum[numstyle][i]; ctx.appendChild(cn[i]);} var mn = []; for (i = minln; i > 0; i--) {mn[i] = document.createElement('div'); mn[i].id = 'cmin' + i; commonClock(mn[i]); mn[i].style.width = '1px'; mn[i].style.height = '1px'; mn[i].style.fontSize = '1px'; mn[i].style.backgroundColor = '#' + colminutes; mn[i].style.zIndex = 997; ctx.appendChild(mn[i]);} var hr = []; for (i = hourln; i > 0; i--) {hr[i] = document.createElement('div'); hr[i].id = 'chour' + i; commonClock(hr[i]); hr[i].style.width = '2px'; hr[i].style.height = '2px'; hr[i].style.fontSize ='2px'; hr[i].style.backgroundColor = '#' + colhours; hr[i].style.zIndex = 998; ctx.appendChild(hr[i]);} var sc = []; for (i = secln; i > 0; i--) {sc[i] = document.createElement('div'); sc[i].id = 'csec' + i; commonClock(sc[i]); sc[i].style.width = '1px'; sc[i].style.height = '1px'; sc[i].style.fontSize ='1px'; sc[i].style.backgroundColor = '#' + colseconds; sc[i].style.zIndex = 999; ctx.appendChild(sc[i]);} var am = document.createElement('div'); am.id = 'ampm'; commonClock(am); am.style.width = ((xpos + rad) * 2) + 'px'; am.style.fontFamily = font_family; am.style.fontSize = (font_size * 2 / 3) + 'px'; am.style.color = '#' + colnumbers; am.style.textAlign = 'center'; am.style.paddingTop = '10px'; am.style.zIndex = 990; ctx.appendChild(am); var zn = document.createElement('div'); zn.id = 'zone'; commonClock(zn); zn.style.width = ((xpos + rad) * 2) + 'px'; zn.style.fontFamily = font_family; zn.style.fontSize = (font_size * 2 / 3) + 'px'; zn.style.color = '#' + colnumbers; zn.style.textAlign = 'center'; zn.style.paddingTop = '10px'; zn.style.zIndex = 990; ctx.appendChild(zn); d.getElementById('clock_a').appendChild(ctx); for (var i = 12; i > 0; i--) {d.getElementById('cnum' + i).style.top = (ctrY - offset + rad * Math.sin(i * pi / 6 - pi2))+'px'; d.getElementById('cnum' + i).style.left = (ctrX - offset + rad * Math.cos(i * pi / 6 - pi2))+'px'; d.getElementById('cnum' + i).style.visibility = 'visible';} updateClock();} function moveClock(l, e, f) {for (var i = l; i > 0; i--) {d.getElementById(e + i).style.top = (ctrY + i * Math.sin(f))+'px';d.getElementById(e + i).style.left = (ctrX + i * Math.cos(f))+'px';d.getElementById(e + i).style.visibility = 'visible';}} function updateClock() {var now = new Date(); var theTime = timeZone(now,localZone,mytimezone,dst); d.getElementById('ampm').style.top = (ypos + rad/3)+'px'; /*d.getElementById('ampm').innerHTML = theTime[1] + '<br />' + dayname[theTime[0]];*/ d.getElementById('ampm').style.visibility = 'visible'; if (!localZone) {d.getElementById('zone').style.top = (ctrY + (rad/10))+'px'; d.getElementById('zone').innerHTML = city + '<br />' + country; d.getElementById('zone').style.visibility = 'visible';} moveClock(secln, 'csec', pi * theTime[4] / 30 - pi2); moveClock(minln, 'cmin', pi * theTime[3] / 30 - pi2); moveClock(hourln, 'chour', pi * theTime[2] / 6 + pi * (+now.getMinutes())/360 - pi2); setTimeout('updateClock()', 100);}
//window.onload = displayClock;
// Analog Clock - Parameters Head Script
// You may change the parameters here to set up your clock
// refer to  http://javascript.about.com/library/blclock1.htm
// for a description of the parameters
var clocksize=50;
var colnumbers='ffffff';
var colseconds='fff';
var colminutes='fff';
var colhours='fff';
var numstyle = 2;
var font_family = 'helvetica,arial,sans-serif';
var localZone = 1;
var mytimezone = 0;
var dst = 0;
var city = '';
var country = '';
var fix = 1;
var xpos=0;
var ypos=0;

// code to adjust for daylight saving time if applicable (localzone = 0)

// code to handle clock positioning (fix = 0)
                  
;
(function() {


}).call(this);
//** Accordion Content script: By Dynamic Drive, at http://www.dynamicdrive.com
//** Created: Jan 7th, 08'

//Version 1.3: April 3rd, 08':
//**1) Script now no longer conflicts with other JS frameworks
//**2) Adds custom oninit() and onopenclose() event handlers that fire when Accordion Content instance has initialized, plus whenever a header is opened/closed
//**3) Adds support for expanding header(s) using the URL parameter (ie: http://mysite.com/accordion.htm?headerclass=0,1)

//April 9th, 08': Fixed "defaultexpanded" setting not working when page first loads

//Version 1.4: June 4th, 08':
//**1) Added option to activate a header "mouseover" instead of the default "click"
//**2) Bug persistence not working when used with jquery 1.2.6

//Version 1.5: June 20th, 08':
//**1) Adds new "onemustopen:true/false" parameter, which lets you set whether at least one header should be open at all times (so never all closed).
//**2) Changed cookie path to site wide for persistence feature
//**3) Fixed bug so "expandedindices" parameter in oninit(headers, expandedindices) returns empty array [] instead of [-1] when no expanded headers found

//**1) Version 1.5.1: June 27th, 08': Fixed "defaultexpanded" setting not working properly when used with jquery 1.2.6

//Version 1.6: Oct 3rd, 08':
//**1) Adds new "mouseoverdelay" param that sets delay before headers are activated when "revealtype" param is set to "mouseover"
//**2) Fixed bug with "onemustopen" param not working properly when "revealtype" is set to "click"

//Version 1.7: March 24th, 09': Adds a 3rd revealtype setting "clickgo", which causes browser to navigate to URL specified inside the header after expanding its contents.

//Version 1.7.1: May 28th, 09': Fixed issue that causes margins/paddings in accordion DIVs to be lost in IE8


var ddaccordion={
	
	contentclassname:{}, //object to store corresponding contentclass name based on headerclass

	expandone:function(headerclass, selected){ //PUBLIC function to expand a particular header
		this.toggleone(headerclass, selected, "expand")
	},

	collapseone:function(headerclass, selected){ //PUBLIC function to collapse a particular header
		this.toggleone(headerclass, selected, "collapse")
	},

	expandall:function(headerclass){ //PUBLIC function to expand all headers based on their shared CSS classname
		var $=jQuery
		var $headers=$('.'+headerclass)
		$('.'+this.contentclassname[headerclass]+':hidden').each(function(){
			$headers.eq(parseInt($(this).attr('contentindex'))).trigger("evt_accordion")
		})
	},

	collapseall:function(headerclass){ //PUBLIC function to collapse all headers based on their shared CSS classname
		var $=jQuery
		var $headers=$('.'+headerclass)
		$('.'+this.contentclassname[headerclass]+':visible').each(function(){
			$headers.eq(parseInt($(this).attr('contentindex'))).trigger("evt_accordion")
		})
	},

	toggleone:function(headerclass, selected, optstate){ //PUBLIC function to expand/ collapse a particular header
		var $=jQuery
		var $targetHeader=$('.'+headerclass).eq(selected)
		var $subcontent=$('.'+this.contentclassname[headerclass]).eq(selected)
		if (typeof optstate=="undefined" || optstate=="expand" && $subcontent.is(":hidden") || optstate=="collapse" && $subcontent.is(":visible"))
			$targetHeader.trigger("evt_accordion")
	},

	expandit:function($targetHeader, $targetContent, config, useractivated, directclick){
		this.transformHeader($targetHeader, config, "expand")
		$targetContent.slideDown(config.animatespeed, function(){
			config.onopenclose($targetHeader.get(0), parseInt($targetHeader.attr('headerindex')), $targetContent.css('display'), useractivated)
			if (config.postreveal=="gotourl" && directclick){ //if revealtype is "Go to Header URL upon click", and this is a direct click on the header
				var targetLink=($targetHeader.is("a"))? $targetHeader.get(0) : $targetHeader.find('a:eq(0)').get(0)
				if (targetLink) //if this header is a link
					setTimeout(function(){location=targetLink.href}, 200) //ignore link target, as window.open(targetLink, targetLink.target) doesn't work in FF if popup blocker enabled
			}
		})
	},

	collapseit:function($targetHeader, $targetContent, config, isuseractivated){
		this.transformHeader($targetHeader, config, "collapse")
		$targetContent.slideUp(config.animatespeed, function(){config.onopenclose($targetHeader.get(0), parseInt($targetHeader.attr('headerindex')), $targetContent.css('display'), isuseractivated)})
	},

	transformHeader:function($targetHeader, config, state){
		$targetHeader.addClass((state=="expand")? config.cssclass.expand : config.cssclass.collapse) //alternate btw "expand" and "collapse" CSS classes
		.removeClass((state=="expand")? config.cssclass.collapse : config.cssclass.expand)
		if (config.htmlsetting.location=='src'){ //Change header image (assuming header is an image)?
			$targetHeader=($targetHeader.is("img"))? $targetHeader : $targetHeader.find('img').eq(0) //Set target to either header itself, or first image within header
			$targetHeader.attr('src', (state=="expand")? config.htmlsetting.expand : config.htmlsetting.collapse) //change header image
		}
		else if (config.htmlsetting.location=="prefix") //if change "prefix" HTML, locate dynamically added ".accordprefix" span tag and change it
			$targetHeader.find('.accordprefix').html((state=="expand")? config.htmlsetting.expand : config.htmlsetting.collapse)
		else if (config.htmlsetting.location=="suffix")
			$targetHeader.find('.accordsuffix').html((state=="expand")? config.htmlsetting.expand : config.htmlsetting.collapse)
	},

	urlparamselect:function(headerclass){
		var result=window.location.search.match(new RegExp(headerclass+"=((\\d+)(,(\\d+))*)", "i")) //check for "?headerclass=2,3,4" in URL
		if (result!=null)
			result=RegExp.$1.split(',')
		return result //returns null, [index], or [index1,index2,etc], where index are the desired selected header indices
	},

	getCookie:function(Name){ 
		var re=new RegExp(Name+"=[^;]+", "i") //construct RE to search for target name/value pair
		if (document.cookie.match(re)) //if cookie found
			return document.cookie.match(re)[0].split("=")[1] //return its value
		return null
	},

	setCookie:function(name, value){
		document.cookie = name + "=" + value + "; path=/"
	},

	init:function(config){
	document.write('<style type="text/css">\n')
	document.write('.'+config.contentclass+'{display: none}\n') //generate CSS to hide contents
	document.write('<\/style>')
	jQuery(document).ready(function($){
		ddaccordion.urlparamselect(config.headerclass)
		var persistedheaders=ddaccordion.getCookie(config.headerclass)
		ddaccordion.contentclassname[config.headerclass]=config.contentclass //remember contentclass name based on headerclass
		config.cssclass={collapse: config.toggleclass[0], expand: config.toggleclass[1]} //store expand and contract CSS classes as object properties
		config.revealtype=config.revealtype || "click"
		config.revealtype=config.revealtype.replace(/mouseover/i, "mouseenter")
		if (config.revealtype=="clickgo"){
			config.postreveal="gotourl" //remember added action
			config.revealtype="click" //overwrite revealtype to "click" keyword
		}
		if (typeof config.togglehtml=="undefined")
			config.htmlsetting={location: "none"}
		else
			config.htmlsetting={location: config.togglehtml[0], collapse: config.togglehtml[1], expand: config.togglehtml[2]} //store HTML settings as object properties
		config.oninit=(typeof config.oninit=="undefined")? function(){} : config.oninit //attach custom "oninit" event handler
		config.onopenclose=(typeof config.onopenclose=="undefined")? function(){} : config.onopenclose //attach custom "onopenclose" event handler
		var lastexpanded={} //object to hold reference to last expanded header and content (jquery objects)
		var expandedindices=ddaccordion.urlparamselect(config.headerclass) || ((config.persiststate && persistedheaders!=null)? persistedheaders : config.defaultexpanded)
		if (typeof expandedindices=='string') //test for string value (exception is config.defaultexpanded, which is an array)
			expandedindices=expandedindices.replace(/c/ig, '').split(',') //transform string value to an array (ie: "c1,c2,c3" becomes [1,2,3]
		var $subcontents=$('.'+config["contentclass"])
		if (expandedindices.length==1 && expandedindices[0]=="-1") //check for expandedindices value of [-1], indicating persistence is on and no content expanded
			expandedindices=[]
		if (config["collapseprev"] && expandedindices.length>1) //only allow one content open?
			expandedindices=[expandedindices.pop()] //return last array element as an array (for sake of jQuery.inArray())
		if (config["onemustopen"] && expandedindices.length==0) //if at least one content should be open at all times and none are, open 1st header
			expandedindices=[0]
		$('.'+config["headerclass"]).each(function(index){ //loop through all headers
			if (/(prefix)|(suffix)/i.test(config.htmlsetting.location) && $(this).html()!=""){ //add a SPAN element to header depending on user setting and if header is a container tag
				$('<span class="accordprefix"></span>').prependTo(this)
				$('<span class="accordsuffix"></span>').appendTo(this)
			}
			$(this).attr('headerindex', index+'h') //store position of this header relative to its peers
			$subcontents.eq(index).attr('contentindex', index+'c') //store position of this content relative to its peers
			var $subcontent=$subcontents.eq(index)
			var needle=(typeof expandedindices[0]=="number")? index : index+'' //check for data type within expandedindices array- index should match that type
			if (jQuery.inArray(needle, expandedindices)!=-1){ //check for headers that should be expanded automatically (convert index to string first)
				if (config.animatedefault==false)
					$subcontent.show()
				ddaccordion.expandit($(this), $subcontent, config, false) //Last param sets 'isuseractivated' parameter
				lastexpanded={$header:$(this), $content:$subcontent}
			}  //end check
			else{
				$subcontent.hide()
				config.onopenclose($(this).get(0), parseInt($(this).attr('headerindex')), $subcontent.css('display'), false) //Last Boolean value sets 'isuseractivated' parameter
				ddaccordion.transformHeader($(this), config, "collapse")
			}
		})
		$('.'+config["headerclass"]).bind("evt_accordion", function(e, isdirectclick){ //assign custom event handler that expands/ contacts a header
				var $subcontent=$subcontents.eq(parseInt($(this).attr('headerindex'))) //get subcontent that should be expanded/collapsed
				if ($subcontent.css('display')=="none"){
					ddaccordion.expandit($(this), $subcontent, config, true, isdirectclick) //2nd last param sets 'isuseractivated' parameter
					if (config["collapseprev"] && lastexpanded.$header && $(this).get(0)!=lastexpanded.$header.get(0)){ //collapse previous content?
						ddaccordion.collapseit(lastexpanded.$header, lastexpanded.$content, config, true) //Last Boolean value sets 'isuseractivated' parameter
					}
					lastexpanded={$header:$(this), $content:$subcontent}
				}
				else if (!config["onemustopen"] || config["onemustopen"] && lastexpanded.$header && $(this).get(0)!=lastexpanded.$header.get(0)){
					ddaccordion.collapseit($(this), $subcontent, config, true) //Last Boolean value sets 'isuseractivated' parameter
				}
 		})
		$('.'+config["headerclass"]).bind(config.revealtype, function(){
			if (config.revealtype=="mouseenter"){
				clearTimeout(config.revealdelay)
				var headerindex=parseInt($(this).attr("headerindex"))
				config.revealdelay=setTimeout(function(){ddaccordion.expandone(config["headerclass"], headerindex)}, config.mouseoverdelay || 0)
			}
			else{
				$(this).trigger("evt_accordion", [true])
				return false //cancel default click behavior
			}
		})
		$('.'+config["headerclass"]).bind("mouseleave", function(){
			clearTimeout(config.revealdelay)
		})
		config.oninit($('.'+config["headerclass"]).get(), expandedindices)
		$(window).bind('unload', function(){ //clean up and persist on page unload
			$('.'+config["headerclass"]).unbind()
			var expandedindices=[]
			$('.'+config["contentclass"]+":visible").each(function(index){ //get indices of expanded headers
				expandedindices.push($(this).attr('contentindex'))
			})
			if (config.persiststate==true && $('.'+config["headerclass"]).length>0){ //persist state?
				expandedindices=(expandedindices.length==0)? '-1c' : expandedindices //No contents expanded, indicate that with dummy '-1c' value?
				ddaccordion.setCookie(config.headerclass, expandedindices)
			}
		})
	})
	}
}
;
(function() {


}).call(this);
/*
 * jQuery Plugin : jConfirmAction
 * 
 * by Hidayat Sagita
 * http://www.webstuffshare.com
 * Licensed Under GPL version 2 license.
 *
 */

(function($){

	jQuery.fn.jConfirmAction = function (options) {
		
		// Some jConfirmAction options (limited to customize language) :
		// question : a text for your question.
		// yesAnswer : a text for Yes answer.
		// cancelAnswer : a text for Cancel/No answer.
		var theOptions = jQuery.extend ({
			question: "Are You Sure ?",
			yesAnswer: "Yes",
			cancelAnswer: "Cancel"
		}, options);
		
		return this.each (function () {
			
			$(this).bind('click', function(e) {

				e.preventDefault();
				thisHref	= $(this).attr('href');
				
				if($(this).next('.question').length <= 0)
					$(this).after('<div class="question">'+theOptions.question+'<br/> <span class="yes">'+theOptions.yesAnswer+'</span><span class="cancel">'+theOptions.cancelAnswer+'</span></div>');
				
				$(this).next('.question').animate({opacity: 1}, 300);
				
				$('.yes').bind('click', function(){
					window.location = thisHref;
				});
		
				$('.cancel').bind('click', function(){
					$(this).parents('.question').fadeOut(300, function() {
						$(this).remove();
					});
				});
				
			});
			
		});
	}
	
})(jQuery);
/*!
 * jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Sat Feb 13 22:33:48 2010 -0500
 */

(function(A,w){function ma(){if(!c.isReady){try{s.documentElement.doScroll("left")}catch(a){setTimeout(ma,1);return}c.ready()}}function Qa(a,b){b.src?c.ajax({url:b.src,async:false,dataType:"script"}):c.globalEval(b.text||b.textContent||b.innerHTML||"");b.parentNode&&b.parentNode.removeChild(b)}function X(a,b,d,f,e,j){var i=a.length;if(typeof b==="object"){for(var o in b)X(a,o,b[o],f,e,d);return a}if(d!==w){f=!j&&f&&c.isFunction(d);for(o=0;o<i;o++)e(a[o],b,f?d.call(a[o],o,e(a[o],b)):d,j);return a}return i?
e(a[0],b):w}function J(){return(new Date).getTime()}function Y(){return false}function Z(){return true}function na(a,b,d){d[0].type=a;return c.event.handle.apply(b,d)}function oa(a){var b,d=[],f=[],e=arguments,j,i,o,k,n,r;i=c.data(this,"events");if(!(a.liveFired===this||!i||!i.live||a.button&&a.type==="click")){a.liveFired=this;var u=i.live.slice(0);for(k=0;k<u.length;k++){i=u[k];i.origType.replace(O,"")===a.type?f.push(i.selector):u.splice(k--,1)}j=c(a.target).closest(f,a.currentTarget);n=0;for(r=
j.length;n<r;n++)for(k=0;k<u.length;k++){i=u[k];if(j[n].selector===i.selector){o=j[n].elem;f=null;if(i.preType==="mouseenter"||i.preType==="mouseleave")f=c(a.relatedTarget).closest(i.selector)[0];if(!f||f!==o)d.push({elem:o,handleObj:i})}}n=0;for(r=d.length;n<r;n++){j=d[n];a.currentTarget=j.elem;a.data=j.handleObj.data;a.handleObj=j.handleObj;if(j.handleObj.origHandler.apply(j.elem,e)===false){b=false;break}}return b}}function pa(a,b){return"live."+(a&&a!=="*"?a+".":"")+b.replace(/\./g,"`").replace(/ /g,
"&")}function qa(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function ra(a,b){var d=0;b.each(function(){if(this.nodeName===(a[d]&&a[d].nodeName)){var f=c.data(a[d++]),e=c.data(this,f);if(f=f&&f.events){delete e.handle;e.events={};for(var j in f)for(var i in f[j])c.event.add(this,j,f[j][i],f[j][i].data)}}})}function sa(a,b,d){var f,e,j;b=b&&b[0]?b[0].ownerDocument||b[0]:s;if(a.length===1&&typeof a[0]==="string"&&a[0].length<512&&b===s&&!ta.test(a[0])&&(c.support.checkClone||!ua.test(a[0]))){e=
true;if(j=c.fragments[a[0]])if(j!==1)f=j}if(!f){f=b.createDocumentFragment();c.clean(a,b,f,d)}if(e)c.fragments[a[0]]=j?f:1;return{fragment:f,cacheable:e}}function K(a,b){var d={};c.each(va.concat.apply([],va.slice(0,b)),function(){d[this]=a});return d}function wa(a){return"scrollTo"in a&&a.document?a:a.nodeType===9?a.defaultView||a.parentWindow:false}var c=function(a,b){return new c.fn.init(a,b)},Ra=A.jQuery,Sa=A.$,s=A.document,T,Ta=/^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,Ua=/^.[^:#\[\.,]*$/,Va=/\S/,
Wa=/^(\s|\u00A0)+|(\s|\u00A0)+$/g,Xa=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,P=navigator.userAgent,xa=false,Q=[],L,$=Object.prototype.toString,aa=Object.prototype.hasOwnProperty,ba=Array.prototype.push,R=Array.prototype.slice,ya=Array.prototype.indexOf;c.fn=c.prototype={init:function(a,b){var d,f;if(!a)return this;if(a.nodeType){this.context=this[0]=a;this.length=1;return this}if(a==="body"&&!b){this.context=s;this[0]=s.body;this.selector="body";this.length=1;return this}if(typeof a==="string")if((d=Ta.exec(a))&&
(d[1]||!b))if(d[1]){f=b?b.ownerDocument||b:s;if(a=Xa.exec(a))if(c.isPlainObject(b)){a=[s.createElement(a[1])];c.fn.attr.call(a,b,true)}else a=[f.createElement(a[1])];else{a=sa([d[1]],[f]);a=(a.cacheable?a.fragment.cloneNode(true):a.fragment).childNodes}return c.merge(this,a)}else{if(b=s.getElementById(d[2])){if(b.id!==d[2])return T.find(a);this.length=1;this[0]=b}this.context=s;this.selector=a;return this}else if(!b&&/^\w+$/.test(a)){this.selector=a;this.context=s;a=s.getElementsByTagName(a);return c.merge(this,
a)}else return!b||b.jquery?(b||T).find(a):c(b).find(a);else if(c.isFunction(a))return T.ready(a);if(a.selector!==w){this.selector=a.selector;this.context=a.context}return c.makeArray(a,this)},selector:"",jquery:"1.4.2",length:0,size:function(){return this.length},toArray:function(){return R.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this.slice(a)[0]:this[a]},pushStack:function(a,b,d){var f=c();c.isArray(a)?ba.apply(f,a):c.merge(f,a);f.prevObject=this;f.context=this.context;if(b===
"find")f.selector=this.selector+(this.selector?" ":"")+d;else if(b)f.selector=this.selector+"."+b+"("+d+")";return f},each:function(a,b){return c.each(this,a,b)},ready:function(a){c.bindReady();if(c.isReady)a.call(s,c);else Q&&Q.push(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(R.apply(this,arguments),"slice",R.call(arguments).join(","))},map:function(a){return this.pushStack(c.map(this,
function(b,d){return a.call(b,d,b)}))},end:function(){return this.prevObject||c(null)},push:ba,sort:[].sort,splice:[].splice};c.fn.init.prototype=c.fn;c.extend=c.fn.extend=function(){var a=arguments[0]||{},b=1,d=arguments.length,f=false,e,j,i,o;if(typeof a==="boolean"){f=a;a=arguments[1]||{};b=2}if(typeof a!=="object"&&!c.isFunction(a))a={};if(d===b){a=this;--b}for(;b<d;b++)if((e=arguments[b])!=null)for(j in e){i=a[j];o=e[j];if(a!==o)if(f&&o&&(c.isPlainObject(o)||c.isArray(o))){i=i&&(c.isPlainObject(i)||
c.isArray(i))?i:c.isArray(o)?[]:{};a[j]=c.extend(f,i,o)}else if(o!==w)a[j]=o}return a};c.extend({noConflict:function(a){A.$=Sa;if(a)A.jQuery=Ra;return c},isReady:false,ready:function(){if(!c.isReady){if(!s.body)return setTimeout(c.ready,13);c.isReady=true;if(Q){for(var a,b=0;a=Q[b++];)a.call(s,c);Q=null}c.fn.triggerHandler&&c(s).triggerHandler("ready")}},bindReady:function(){if(!xa){xa=true;if(s.readyState==="complete")return c.ready();if(s.addEventListener){s.addEventListener("DOMContentLoaded",
L,false);A.addEventListener("load",c.ready,false)}else if(s.attachEvent){s.attachEvent("onreadystatechange",L);A.attachEvent("onload",c.ready);var a=false;try{a=A.frameElement==null}catch(b){}s.documentElement.doScroll&&a&&ma()}}},isFunction:function(a){return $.call(a)==="[object Function]"},isArray:function(a){return $.call(a)==="[object Array]"},isPlainObject:function(a){if(!a||$.call(a)!=="[object Object]"||a.nodeType||a.setInterval)return false;if(a.constructor&&!aa.call(a,"constructor")&&!aa.call(a.constructor.prototype,
"isPrototypeOf"))return false;var b;for(b in a);return b===w||aa.call(a,b)},isEmptyObject:function(a){for(var b in a)return false;return true},error:function(a){throw a;},parseJSON:function(a){if(typeof a!=="string"||!a)return null;a=c.trim(a);if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return A.JSON&&A.JSON.parse?A.JSON.parse(a):(new Function("return "+
a))();else c.error("Invalid JSON: "+a)},noop:function(){},globalEval:function(a){if(a&&Va.test(a)){var b=s.getElementsByTagName("head")[0]||s.documentElement,d=s.createElement("script");d.type="text/javascript";if(c.support.scriptEval)d.appendChild(s.createTextNode(a));else d.text=a;b.insertBefore(d,b.firstChild);b.removeChild(d)}},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,b,d){var f,e=0,j=a.length,i=j===w||c.isFunction(a);if(d)if(i)for(f in a){if(b.apply(a[f],
d)===false)break}else for(;e<j;){if(b.apply(a[e++],d)===false)break}else if(i)for(f in a){if(b.call(a[f],f,a[f])===false)break}else for(d=a[0];e<j&&b.call(d,e,d)!==false;d=a[++e]);return a},trim:function(a){return(a||"").replace(Wa,"")},makeArray:function(a,b){b=b||[];if(a!=null)a.length==null||typeof a==="string"||c.isFunction(a)||typeof a!=="function"&&a.setInterval?ba.call(b,a):c.merge(b,a);return b},inArray:function(a,b){if(b.indexOf)return b.indexOf(a);for(var d=0,f=b.length;d<f;d++)if(b[d]===
a)return d;return-1},merge:function(a,b){var d=a.length,f=0;if(typeof b.length==="number")for(var e=b.length;f<e;f++)a[d++]=b[f];else for(;b[f]!==w;)a[d++]=b[f++];a.length=d;return a},grep:function(a,b,d){for(var f=[],e=0,j=a.length;e<j;e++)!d!==!b(a[e],e)&&f.push(a[e]);return f},map:function(a,b,d){for(var f=[],e,j=0,i=a.length;j<i;j++){e=b(a[j],j,d);if(e!=null)f[f.length]=e}return f.concat.apply([],f)},guid:1,proxy:function(a,b,d){if(arguments.length===2)if(typeof b==="string"){d=a;a=d[b];b=w}else if(b&&
!c.isFunction(b)){d=b;b=w}if(!b&&a)b=function(){return a.apply(d||this,arguments)};if(a)b.guid=a.guid=a.guid||b.guid||c.guid++;return b},uaMatch:function(a){a=a.toLowerCase();a=/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version)?[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||!/compatible/.test(a)&&/(mozilla)(?:.*? rv:([\w.]+))?/.exec(a)||[];return{browser:a[1]||"",version:a[2]||"0"}},browser:{}});P=c.uaMatch(P);if(P.browser){c.browser[P.browser]=true;c.browser.version=P.version}if(c.browser.webkit)c.browser.safari=
true;if(ya)c.inArray=function(a,b){return ya.call(b,a)};T=c(s);if(s.addEventListener)L=function(){s.removeEventListener("DOMContentLoaded",L,false);c.ready()};else if(s.attachEvent)L=function(){if(s.readyState==="complete"){s.detachEvent("onreadystatechange",L);c.ready()}};(function(){c.support={};var a=s.documentElement,b=s.createElement("script"),d=s.createElement("div"),f="script"+J();d.style.display="none";d.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
var e=d.getElementsByTagName("*"),j=d.getElementsByTagName("a")[0];if(!(!e||!e.length||!j)){c.support={leadingWhitespace:d.firstChild.nodeType===3,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/red/.test(j.getAttribute("style")),hrefNormalized:j.getAttribute("href")==="/a",opacity:/^0.55$/.test(j.style.opacity),cssFloat:!!j.style.cssFloat,checkOn:d.getElementsByTagName("input")[0].value==="on",optSelected:s.createElement("select").appendChild(s.createElement("option")).selected,
parentNode:d.removeChild(d.appendChild(s.createElement("div"))).parentNode===null,deleteExpando:true,checkClone:false,scriptEval:false,noCloneEvent:true,boxModel:null};b.type="text/javascript";try{b.appendChild(s.createTextNode("window."+f+"=1;"))}catch(i){}a.insertBefore(b,a.firstChild);if(A[f]){c.support.scriptEval=true;delete A[f]}try{delete b.test}catch(o){c.support.deleteExpando=false}a.removeChild(b);if(d.attachEvent&&d.fireEvent){d.attachEvent("onclick",function k(){c.support.noCloneEvent=
false;d.detachEvent("onclick",k)});d.cloneNode(true).fireEvent("onclick")}d=s.createElement("div");d.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";a=s.createDocumentFragment();a.appendChild(d.firstChild);c.support.checkClone=a.cloneNode(true).cloneNode(true).lastChild.checked;c(function(){var k=s.createElement("div");k.style.width=k.style.paddingLeft="1px";s.body.appendChild(k);c.boxModel=c.support.boxModel=k.offsetWidth===2;s.body.removeChild(k).style.display="none"});a=function(k){var n=
s.createElement("div");k="on"+k;var r=k in n;if(!r){n.setAttribute(k,"return;");r=typeof n[k]==="function"}return r};c.support.submitBubbles=a("submit");c.support.changeBubbles=a("change");a=b=d=e=j=null}})();c.props={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"};var G="jQuery"+J(),Ya=0,za={};c.extend({cache:{},expando:G,noData:{embed:true,object:true,
applet:true},data:function(a,b,d){if(!(a.nodeName&&c.noData[a.nodeName.toLowerCase()])){a=a==A?za:a;var f=a[G],e=c.cache;if(!f&&typeof b==="string"&&d===w)return null;f||(f=++Ya);if(typeof b==="object"){a[G]=f;e[f]=c.extend(true,{},b)}else if(!e[f]){a[G]=f;e[f]={}}a=e[f];if(d!==w)a[b]=d;return typeof b==="string"?a[b]:a}},removeData:function(a,b){if(!(a.nodeName&&c.noData[a.nodeName.toLowerCase()])){a=a==A?za:a;var d=a[G],f=c.cache,e=f[d];if(b){if(e){delete e[b];c.isEmptyObject(e)&&c.removeData(a)}}else{if(c.support.deleteExpando)delete a[c.expando];
else a.removeAttribute&&a.removeAttribute(c.expando);delete f[d]}}}});c.fn.extend({data:function(a,b){if(typeof a==="undefined"&&this.length)return c.data(this[0]);else if(typeof a==="object")return this.each(function(){c.data(this,a)});var d=a.split(".");d[1]=d[1]?"."+d[1]:"";if(b===w){var f=this.triggerHandler("getData"+d[1]+"!",[d[0]]);if(f===w&&this.length)f=c.data(this[0],a);return f===w&&d[1]?this.data(d[0]):f}else return this.trigger("setData"+d[1]+"!",[d[0],b]).each(function(){c.data(this,
a,b)})},removeData:function(a){return this.each(function(){c.removeData(this,a)})}});c.extend({queue:function(a,b,d){if(a){b=(b||"fx")+"queue";var f=c.data(a,b);if(!d)return f||[];if(!f||c.isArray(d))f=c.data(a,b,c.makeArray(d));else f.push(d);return f}},dequeue:function(a,b){b=b||"fx";var d=c.queue(a,b),f=d.shift();if(f==="inprogress")f=d.shift();if(f){b==="fx"&&d.unshift("inprogress");f.call(a,function(){c.dequeue(a,b)})}}});c.fn.extend({queue:function(a,b){if(typeof a!=="string"){b=a;a="fx"}if(b===
w)return c.queue(this[0],a);return this.each(function(){var d=c.queue(this,a,b);a==="fx"&&d[0]!=="inprogress"&&c.dequeue(this,a)})},dequeue:function(a){return this.each(function(){c.dequeue(this,a)})},delay:function(a,b){a=c.fx?c.fx.speeds[a]||a:a;b=b||"fx";return this.queue(b,function(){var d=this;setTimeout(function(){c.dequeue(d,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])}});var Aa=/[\n\t]/g,ca=/\s+/,Za=/\r/g,$a=/href|src|style/,ab=/(button|input)/i,bb=/(button|input|object|select|textarea)/i,
cb=/^(a|area)$/i,Ba=/radio|checkbox/;c.fn.extend({attr:function(a,b){return X(this,a,b,true,c.attr)},removeAttr:function(a){return this.each(function(){c.attr(this,a,"");this.nodeType===1&&this.removeAttribute(a)})},addClass:function(a){if(c.isFunction(a))return this.each(function(n){var r=c(this);r.addClass(a.call(this,n,r.attr("class")))});if(a&&typeof a==="string")for(var b=(a||"").split(ca),d=0,f=this.length;d<f;d++){var e=this[d];if(e.nodeType===1)if(e.className){for(var j=" "+e.className+" ",
i=e.className,o=0,k=b.length;o<k;o++)if(j.indexOf(" "+b[o]+" ")<0)i+=" "+b[o];e.className=c.trim(i)}else e.className=a}return this},removeClass:function(a){if(c.isFunction(a))return this.each(function(k){var n=c(this);n.removeClass(a.call(this,k,n.attr("class")))});if(a&&typeof a==="string"||a===w)for(var b=(a||"").split(ca),d=0,f=this.length;d<f;d++){var e=this[d];if(e.nodeType===1&&e.className)if(a){for(var j=(" "+e.className+" ").replace(Aa," "),i=0,o=b.length;i<o;i++)j=j.replace(" "+b[i]+" ",
" ");e.className=c.trim(j)}else e.className=""}return this},toggleClass:function(a,b){var d=typeof a,f=typeof b==="boolean";if(c.isFunction(a))return this.each(function(e){var j=c(this);j.toggleClass(a.call(this,e,j.attr("class"),b),b)});return this.each(function(){if(d==="string")for(var e,j=0,i=c(this),o=b,k=a.split(ca);e=k[j++];){o=f?o:!i.hasClass(e);i[o?"addClass":"removeClass"](e)}else if(d==="undefined"||d==="boolean"){this.className&&c.data(this,"__className__",this.className);this.className=
this.className||a===false?"":c.data(this,"__className__")||""}})},hasClass:function(a){a=" "+a+" ";for(var b=0,d=this.length;b<d;b++)if((" "+this[b].className+" ").replace(Aa," ").indexOf(a)>-1)return true;return false},val:function(a){if(a===w){var b=this[0];if(b){if(c.nodeName(b,"option"))return(b.attributes.value||{}).specified?b.value:b.text;if(c.nodeName(b,"select")){var d=b.selectedIndex,f=[],e=b.options;b=b.type==="select-one";if(d<0)return null;var j=b?d:0;for(d=b?d+1:e.length;j<d;j++){var i=
e[j];if(i.selected){a=c(i).val();if(b)return a;f.push(a)}}return f}if(Ba.test(b.type)&&!c.support.checkOn)return b.getAttribute("value")===null?"on":b.value;return(b.value||"").replace(Za,"")}return w}var o=c.isFunction(a);return this.each(function(k){var n=c(this),r=a;if(this.nodeType===1){if(o)r=a.call(this,k,n.val());if(typeof r==="number")r+="";if(c.isArray(r)&&Ba.test(this.type))this.checked=c.inArray(n.val(),r)>=0;else if(c.nodeName(this,"select")){var u=c.makeArray(r);c("option",this).each(function(){this.selected=
c.inArray(c(this).val(),u)>=0});if(!u.length)this.selectedIndex=-1}else this.value=r}})}});c.extend({attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},attr:function(a,b,d,f){if(!a||a.nodeType===3||a.nodeType===8)return w;if(f&&b in c.attrFn)return c(a)[b](d);f=a.nodeType!==1||!c.isXMLDoc(a);var e=d!==w;b=f&&c.props[b]||b;if(a.nodeType===1){var j=$a.test(b);if(b in a&&f&&!j){if(e){b==="type"&&ab.test(a.nodeName)&&a.parentNode&&c.error("type property can't be changed");
a[b]=d}if(c.nodeName(a,"form")&&a.getAttributeNode(b))return a.getAttributeNode(b).nodeValue;if(b==="tabIndex")return(b=a.getAttributeNode("tabIndex"))&&b.specified?b.value:bb.test(a.nodeName)||cb.test(a.nodeName)&&a.href?0:w;return a[b]}if(!c.support.style&&f&&b==="style"){if(e)a.style.cssText=""+d;return a.style.cssText}e&&a.setAttribute(b,""+d);a=!c.support.hrefNormalized&&f&&j?a.getAttribute(b,2):a.getAttribute(b);return a===null?w:a}return c.style(a,b,d)}});var O=/\.(.*)$/,db=function(a){return a.replace(/[^\w\s\.\|`]/g,
function(b){return"\\"+b})};c.event={add:function(a,b,d,f){if(!(a.nodeType===3||a.nodeType===8)){if(a.setInterval&&a!==A&&!a.frameElement)a=A;var e,j;if(d.handler){e=d;d=e.handler}if(!d.guid)d.guid=c.guid++;if(j=c.data(a)){var i=j.events=j.events||{},o=j.handle;if(!o)j.handle=o=function(){return typeof c!=="undefined"&&!c.event.triggered?c.event.handle.apply(o.elem,arguments):w};o.elem=a;b=b.split(" ");for(var k,n=0,r;k=b[n++];){j=e?c.extend({},e):{handler:d,data:f};if(k.indexOf(".")>-1){r=k.split(".");
k=r.shift();j.namespace=r.slice(0).sort().join(".")}else{r=[];j.namespace=""}j.type=k;j.guid=d.guid;var u=i[k],z=c.event.special[k]||{};if(!u){u=i[k]=[];if(!z.setup||z.setup.call(a,f,r,o)===false)if(a.addEventListener)a.addEventListener(k,o,false);else a.attachEvent&&a.attachEvent("on"+k,o)}if(z.add){z.add.call(a,j);if(!j.handler.guid)j.handler.guid=d.guid}u.push(j);c.event.global[k]=true}a=null}}},global:{},remove:function(a,b,d,f){if(!(a.nodeType===3||a.nodeType===8)){var e,j=0,i,o,k,n,r,u,z=c.data(a),
C=z&&z.events;if(z&&C){if(b&&b.type){d=b.handler;b=b.type}if(!b||typeof b==="string"&&b.charAt(0)==="."){b=b||"";for(e in C)c.event.remove(a,e+b)}else{for(b=b.split(" ");e=b[j++];){n=e;i=e.indexOf(".")<0;o=[];if(!i){o=e.split(".");e=o.shift();k=new RegExp("(^|\\.)"+c.map(o.slice(0).sort(),db).join("\\.(?:.*\\.)?")+"(\\.|$)")}if(r=C[e])if(d){n=c.event.special[e]||{};for(B=f||0;B<r.length;B++){u=r[B];if(d.guid===u.guid){if(i||k.test(u.namespace)){f==null&&r.splice(B--,1);n.remove&&n.remove.call(a,u)}if(f!=
null)break}}if(r.length===0||f!=null&&r.length===1){if(!n.teardown||n.teardown.call(a,o)===false)Ca(a,e,z.handle);delete C[e]}}else for(var B=0;B<r.length;B++){u=r[B];if(i||k.test(u.namespace)){c.event.remove(a,n,u.handler,B);r.splice(B--,1)}}}if(c.isEmptyObject(C)){if(b=z.handle)b.elem=null;delete z.events;delete z.handle;c.isEmptyObject(z)&&c.removeData(a)}}}}},trigger:function(a,b,d,f){var e=a.type||a;if(!f){a=typeof a==="object"?a[G]?a:c.extend(c.Event(e),a):c.Event(e);if(e.indexOf("!")>=0){a.type=
e=e.slice(0,-1);a.exclusive=true}if(!d){a.stopPropagation();c.event.global[e]&&c.each(c.cache,function(){this.events&&this.events[e]&&c.event.trigger(a,b,this.handle.elem)})}if(!d||d.nodeType===3||d.nodeType===8)return w;a.result=w;a.target=d;b=c.makeArray(b);b.unshift(a)}a.currentTarget=d;(f=c.data(d,"handle"))&&f.apply(d,b);f=d.parentNode||d.ownerDocument;try{if(!(d&&d.nodeName&&c.noData[d.nodeName.toLowerCase()]))if(d["on"+e]&&d["on"+e].apply(d,b)===false)a.result=false}catch(j){}if(!a.isPropagationStopped()&&
f)c.event.trigger(a,b,f,true);else if(!a.isDefaultPrevented()){f=a.target;var i,o=c.nodeName(f,"a")&&e==="click",k=c.event.special[e]||{};if((!k._default||k._default.call(d,a)===false)&&!o&&!(f&&f.nodeName&&c.noData[f.nodeName.toLowerCase()])){try{if(f[e]){if(i=f["on"+e])f["on"+e]=null;c.event.triggered=true;f[e]()}}catch(n){}if(i)f["on"+e]=i;c.event.triggered=false}}},handle:function(a){var b,d,f,e;a=arguments[0]=c.event.fix(a||A.event);a.currentTarget=this;b=a.type.indexOf(".")<0&&!a.exclusive;
if(!b){d=a.type.split(".");a.type=d.shift();f=new RegExp("(^|\\.)"+d.slice(0).sort().join("\\.(?:.*\\.)?")+"(\\.|$)")}e=c.data(this,"events");d=e[a.type];if(e&&d){d=d.slice(0);e=0;for(var j=d.length;e<j;e++){var i=d[e];if(b||f.test(i.namespace)){a.handler=i.handler;a.data=i.data;a.handleObj=i;i=i.handler.apply(this,arguments);if(i!==w){a.result=i;if(i===false){a.preventDefault();a.stopPropagation()}}if(a.isImmediatePropagationStopped())break}}}return a.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
fix:function(a){if(a[G])return a;var b=a;a=c.Event(b);for(var d=this.props.length,f;d;){f=this.props[--d];a[f]=b[f]}if(!a.target)a.target=a.srcElement||s;if(a.target.nodeType===3)a.target=a.target.parentNode;if(!a.relatedTarget&&a.fromElement)a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement;if(a.pageX==null&&a.clientX!=null){b=s.documentElement;d=s.body;a.pageX=a.clientX+(b&&b.scrollLeft||d&&d.scrollLeft||0)-(b&&b.clientLeft||d&&d.clientLeft||0);a.pageY=a.clientY+(b&&b.scrollTop||
d&&d.scrollTop||0)-(b&&b.clientTop||d&&d.clientTop||0)}if(!a.which&&(a.charCode||a.charCode===0?a.charCode:a.keyCode))a.which=a.charCode||a.keyCode;if(!a.metaKey&&a.ctrlKey)a.metaKey=a.ctrlKey;if(!a.which&&a.button!==w)a.which=a.button&1?1:a.button&2?3:a.button&4?2:0;return a},guid:1E8,proxy:c.proxy,special:{ready:{setup:c.bindReady,teardown:c.noop},live:{add:function(a){c.event.add(this,a.origType,c.extend({},a,{handler:oa}))},remove:function(a){var b=true,d=a.origType.replace(O,"");c.each(c.data(this,
"events").live||[],function(){if(d===this.origType.replace(O,""))return b=false});b&&c.event.remove(this,a.origType,oa)}},beforeunload:{setup:function(a,b,d){if(this.setInterval)this.onbeforeunload=d;return false},teardown:function(a,b){if(this.onbeforeunload===b)this.onbeforeunload=null}}}};var Ca=s.removeEventListener?function(a,b,d){a.removeEventListener(b,d,false)}:function(a,b,d){a.detachEvent("on"+b,d)};c.Event=function(a){if(!this.preventDefault)return new c.Event(a);if(a&&a.type){this.originalEvent=
a;this.type=a.type}else this.type=a;this.timeStamp=J();this[G]=true};c.Event.prototype={preventDefault:function(){this.isDefaultPrevented=Z;var a=this.originalEvent;if(a){a.preventDefault&&a.preventDefault();a.returnValue=false}},stopPropagation:function(){this.isPropagationStopped=Z;var a=this.originalEvent;if(a){a.stopPropagation&&a.stopPropagation();a.cancelBubble=true}},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=Z;this.stopPropagation()},isDefaultPrevented:Y,isPropagationStopped:Y,
isImmediatePropagationStopped:Y};var Da=function(a){var b=a.relatedTarget;try{for(;b&&b!==this;)b=b.parentNode;if(b!==this){a.type=a.data;c.event.handle.apply(this,arguments)}}catch(d){}},Ea=function(a){a.type=a.data;c.event.handle.apply(this,arguments)};c.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){c.event.special[a]={setup:function(d){c.event.add(this,b,d&&d.selector?Ea:Da,a)},teardown:function(d){c.event.remove(this,b,d&&d.selector?Ea:Da)}}});if(!c.support.submitBubbles)c.event.special.submit=
{setup:function(){if(this.nodeName.toLowerCase()!=="form"){c.event.add(this,"click.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="submit"||d==="image")&&c(b).closest("form").length)return na("submit",this,arguments)});c.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="text"||d==="password")&&c(b).closest("form").length&&a.keyCode===13)return na("submit",this,arguments)})}else return false},teardown:function(){c.event.remove(this,".specialSubmit")}};
if(!c.support.changeBubbles){var da=/textarea|input|select/i,ea,Fa=function(a){var b=a.type,d=a.value;if(b==="radio"||b==="checkbox")d=a.checked;else if(b==="select-multiple")d=a.selectedIndex>-1?c.map(a.options,function(f){return f.selected}).join("-"):"";else if(a.nodeName.toLowerCase()==="select")d=a.selectedIndex;return d},fa=function(a,b){var d=a.target,f,e;if(!(!da.test(d.nodeName)||d.readOnly)){f=c.data(d,"_change_data");e=Fa(d);if(a.type!=="focusout"||d.type!=="radio")c.data(d,"_change_data",
e);if(!(f===w||e===f))if(f!=null||e){a.type="change";return c.event.trigger(a,b,d)}}};c.event.special.change={filters:{focusout:fa,click:function(a){var b=a.target,d=b.type;if(d==="radio"||d==="checkbox"||b.nodeName.toLowerCase()==="select")return fa.call(this,a)},keydown:function(a){var b=a.target,d=b.type;if(a.keyCode===13&&b.nodeName.toLowerCase()!=="textarea"||a.keyCode===32&&(d==="checkbox"||d==="radio")||d==="select-multiple")return fa.call(this,a)},beforeactivate:function(a){a=a.target;c.data(a,
"_change_data",Fa(a))}},setup:function(){if(this.type==="file")return false;for(var a in ea)c.event.add(this,a+".specialChange",ea[a]);return da.test(this.nodeName)},teardown:function(){c.event.remove(this,".specialChange");return da.test(this.nodeName)}};ea=c.event.special.change.filters}s.addEventListener&&c.each({focus:"focusin",blur:"focusout"},function(a,b){function d(f){f=c.event.fix(f);f.type=b;return c.event.handle.call(this,f)}c.event.special[b]={setup:function(){this.addEventListener(a,
d,true)},teardown:function(){this.removeEventListener(a,d,true)}}});c.each(["bind","one"],function(a,b){c.fn[b]=function(d,f,e){if(typeof d==="object"){for(var j in d)this[b](j,f,d[j],e);return this}if(c.isFunction(f)){e=f;f=w}var i=b==="one"?c.proxy(e,function(k){c(this).unbind(k,i);return e.apply(this,arguments)}):e;if(d==="unload"&&b!=="one")this.one(d,f,e);else{j=0;for(var o=this.length;j<o;j++)c.event.add(this[j],d,i,f)}return this}});c.fn.extend({unbind:function(a,b){if(typeof a==="object"&&
!a.preventDefault)for(var d in a)this.unbind(d,a[d]);else{d=0;for(var f=this.length;d<f;d++)c.event.remove(this[d],a,b)}return this},delegate:function(a,b,d,f){return this.live(b,d,f,a)},undelegate:function(a,b,d){return arguments.length===0?this.unbind("live"):this.die(b,null,d,a)},trigger:function(a,b){return this.each(function(){c.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0]){a=c.Event(a);a.preventDefault();a.stopPropagation();c.event.trigger(a,b,this[0]);return a.result}},
toggle:function(a){for(var b=arguments,d=1;d<b.length;)c.proxy(a,b[d++]);return this.click(c.proxy(a,function(f){var e=(c.data(this,"lastToggle"+a.guid)||0)%d;c.data(this,"lastToggle"+a.guid,e+1);f.preventDefault();return b[e].apply(this,arguments)||false}))},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var Ga={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};c.each(["live","die"],function(a,b){c.fn[b]=function(d,f,e,j){var i,o=0,k,n,r=j||this.selector,
u=j?this:c(this.context);if(c.isFunction(f)){e=f;f=w}for(d=(d||"").split(" ");(i=d[o++])!=null;){j=O.exec(i);k="";if(j){k=j[0];i=i.replace(O,"")}if(i==="hover")d.push("mouseenter"+k,"mouseleave"+k);else{n=i;if(i==="focus"||i==="blur"){d.push(Ga[i]+k);i+=k}else i=(Ga[i]||i)+k;b==="live"?u.each(function(){c.event.add(this,pa(i,r),{data:f,selector:r,handler:e,origType:i,origHandler:e,preType:n})}):u.unbind(pa(i,r),e)}}return this}});c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),
function(a,b){c.fn[b]=function(d){return d?this.bind(b,d):this.trigger(b)};if(c.attrFn)c.attrFn[b]=true});A.attachEvent&&!A.addEventListener&&A.attachEvent("onunload",function(){for(var a in c.cache)if(c.cache[a].handle)try{c.event.remove(c.cache[a].handle.elem)}catch(b){}});(function(){function a(g){for(var h="",l,m=0;g[m];m++){l=g[m];if(l.nodeType===3||l.nodeType===4)h+=l.nodeValue;else if(l.nodeType!==8)h+=a(l.childNodes)}return h}function b(g,h,l,m,q,p){q=0;for(var v=m.length;q<v;q++){var t=m[q];
if(t){t=t[g];for(var y=false;t;){if(t.sizcache===l){y=m[t.sizset];break}if(t.nodeType===1&&!p){t.sizcache=l;t.sizset=q}if(t.nodeName.toLowerCase()===h){y=t;break}t=t[g]}m[q]=y}}}function d(g,h,l,m,q,p){q=0;for(var v=m.length;q<v;q++){var t=m[q];if(t){t=t[g];for(var y=false;t;){if(t.sizcache===l){y=m[t.sizset];break}if(t.nodeType===1){if(!p){t.sizcache=l;t.sizset=q}if(typeof h!=="string"){if(t===h){y=true;break}}else if(k.filter(h,[t]).length>0){y=t;break}}t=t[g]}m[q]=y}}}var f=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
e=0,j=Object.prototype.toString,i=false,o=true;[0,0].sort(function(){o=false;return 0});var k=function(g,h,l,m){l=l||[];var q=h=h||s;if(h.nodeType!==1&&h.nodeType!==9)return[];if(!g||typeof g!=="string")return l;for(var p=[],v,t,y,S,H=true,M=x(h),I=g;(f.exec(""),v=f.exec(I))!==null;){I=v[3];p.push(v[1]);if(v[2]){S=v[3];break}}if(p.length>1&&r.exec(g))if(p.length===2&&n.relative[p[0]])t=ga(p[0]+p[1],h);else for(t=n.relative[p[0]]?[h]:k(p.shift(),h);p.length;){g=p.shift();if(n.relative[g])g+=p.shift();
t=ga(g,t)}else{if(!m&&p.length>1&&h.nodeType===9&&!M&&n.match.ID.test(p[0])&&!n.match.ID.test(p[p.length-1])){v=k.find(p.shift(),h,M);h=v.expr?k.filter(v.expr,v.set)[0]:v.set[0]}if(h){v=m?{expr:p.pop(),set:z(m)}:k.find(p.pop(),p.length===1&&(p[0]==="~"||p[0]==="+")&&h.parentNode?h.parentNode:h,M);t=v.expr?k.filter(v.expr,v.set):v.set;if(p.length>0)y=z(t);else H=false;for(;p.length;){var D=p.pop();v=D;if(n.relative[D])v=p.pop();else D="";if(v==null)v=h;n.relative[D](y,v,M)}}else y=[]}y||(y=t);y||k.error(D||
g);if(j.call(y)==="[object Array]")if(H)if(h&&h.nodeType===1)for(g=0;y[g]!=null;g++){if(y[g]&&(y[g]===true||y[g].nodeType===1&&E(h,y[g])))l.push(t[g])}else for(g=0;y[g]!=null;g++)y[g]&&y[g].nodeType===1&&l.push(t[g]);else l.push.apply(l,y);else z(y,l);if(S){k(S,q,l,m);k.uniqueSort(l)}return l};k.uniqueSort=function(g){if(B){i=o;g.sort(B);if(i)for(var h=1;h<g.length;h++)g[h]===g[h-1]&&g.splice(h--,1)}return g};k.matches=function(g,h){return k(g,null,null,h)};k.find=function(g,h,l){var m,q;if(!g)return[];
for(var p=0,v=n.order.length;p<v;p++){var t=n.order[p];if(q=n.leftMatch[t].exec(g)){var y=q[1];q.splice(1,1);if(y.substr(y.length-1)!=="\\"){q[1]=(q[1]||"").replace(/\\/g,"");m=n.find[t](q,h,l);if(m!=null){g=g.replace(n.match[t],"");break}}}}m||(m=h.getElementsByTagName("*"));return{set:m,expr:g}};k.filter=function(g,h,l,m){for(var q=g,p=[],v=h,t,y,S=h&&h[0]&&x(h[0]);g&&h.length;){for(var H in n.filter)if((t=n.leftMatch[H].exec(g))!=null&&t[2]){var M=n.filter[H],I,D;D=t[1];y=false;t.splice(1,1);if(D.substr(D.length-
1)!=="\\"){if(v===p)p=[];if(n.preFilter[H])if(t=n.preFilter[H](t,v,l,p,m,S)){if(t===true)continue}else y=I=true;if(t)for(var U=0;(D=v[U])!=null;U++)if(D){I=M(D,t,U,v);var Ha=m^!!I;if(l&&I!=null)if(Ha)y=true;else v[U]=false;else if(Ha){p.push(D);y=true}}if(I!==w){l||(v=p);g=g.replace(n.match[H],"");if(!y)return[];break}}}if(g===q)if(y==null)k.error(g);else break;q=g}return v};k.error=function(g){throw"Syntax error, unrecognized expression: "+g;};var n=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(g){return g.getAttribute("href")}},
relative:{"+":function(g,h){var l=typeof h==="string",m=l&&!/\W/.test(h);l=l&&!m;if(m)h=h.toLowerCase();m=0;for(var q=g.length,p;m<q;m++)if(p=g[m]){for(;(p=p.previousSibling)&&p.nodeType!==1;);g[m]=l||p&&p.nodeName.toLowerCase()===h?p||false:p===h}l&&k.filter(h,g,true)},">":function(g,h){var l=typeof h==="string";if(l&&!/\W/.test(h)){h=h.toLowerCase();for(var m=0,q=g.length;m<q;m++){var p=g[m];if(p){l=p.parentNode;g[m]=l.nodeName.toLowerCase()===h?l:false}}}else{m=0;for(q=g.length;m<q;m++)if(p=g[m])g[m]=
l?p.parentNode:p.parentNode===h;l&&k.filter(h,g,true)}},"":function(g,h,l){var m=e++,q=d;if(typeof h==="string"&&!/\W/.test(h)){var p=h=h.toLowerCase();q=b}q("parentNode",h,m,g,p,l)},"~":function(g,h,l){var m=e++,q=d;if(typeof h==="string"&&!/\W/.test(h)){var p=h=h.toLowerCase();q=b}q("previousSibling",h,m,g,p,l)}},find:{ID:function(g,h,l){if(typeof h.getElementById!=="undefined"&&!l)return(g=h.getElementById(g[1]))?[g]:[]},NAME:function(g,h){if(typeof h.getElementsByName!=="undefined"){var l=[];
h=h.getElementsByName(g[1]);for(var m=0,q=h.length;m<q;m++)h[m].getAttribute("name")===g[1]&&l.push(h[m]);return l.length===0?null:l}},TAG:function(g,h){return h.getElementsByTagName(g[1])}},preFilter:{CLASS:function(g,h,l,m,q,p){g=" "+g[1].replace(/\\/g,"")+" ";if(p)return g;p=0;for(var v;(v=h[p])!=null;p++)if(v)if(q^(v.className&&(" "+v.className+" ").replace(/[\t\n]/g," ").indexOf(g)>=0))l||m.push(v);else if(l)h[p]=false;return false},ID:function(g){return g[1].replace(/\\/g,"")},TAG:function(g){return g[1].toLowerCase()},
CHILD:function(g){if(g[1]==="nth"){var h=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(g[2]==="even"&&"2n"||g[2]==="odd"&&"2n+1"||!/\D/.test(g[2])&&"0n+"+g[2]||g[2]);g[2]=h[1]+(h[2]||1)-0;g[3]=h[3]-0}g[0]=e++;return g},ATTR:function(g,h,l,m,q,p){h=g[1].replace(/\\/g,"");if(!p&&n.attrMap[h])g[1]=n.attrMap[h];if(g[2]==="~=")g[4]=" "+g[4]+" ";return g},PSEUDO:function(g,h,l,m,q){if(g[1]==="not")if((f.exec(g[3])||"").length>1||/^\w/.test(g[3]))g[3]=k(g[3],null,null,h);else{g=k.filter(g[3],h,l,true^q);l||m.push.apply(m,
g);return false}else if(n.match.POS.test(g[0])||n.match.CHILD.test(g[0]))return true;return g},POS:function(g){g.unshift(true);return g}},filters:{enabled:function(g){return g.disabled===false&&g.type!=="hidden"},disabled:function(g){return g.disabled===true},checked:function(g){return g.checked===true},selected:function(g){return g.selected===true},parent:function(g){return!!g.firstChild},empty:function(g){return!g.firstChild},has:function(g,h,l){return!!k(l[3],g).length},header:function(g){return/h\d/i.test(g.nodeName)},
text:function(g){return"text"===g.type},radio:function(g){return"radio"===g.type},checkbox:function(g){return"checkbox"===g.type},file:function(g){return"file"===g.type},password:function(g){return"password"===g.type},submit:function(g){return"submit"===g.type},image:function(g){return"image"===g.type},reset:function(g){return"reset"===g.type},button:function(g){return"button"===g.type||g.nodeName.toLowerCase()==="button"},input:function(g){return/input|select|textarea|button/i.test(g.nodeName)}},
setFilters:{first:function(g,h){return h===0},last:function(g,h,l,m){return h===m.length-1},even:function(g,h){return h%2===0},odd:function(g,h){return h%2===1},lt:function(g,h,l){return h<l[3]-0},gt:function(g,h,l){return h>l[3]-0},nth:function(g,h,l){return l[3]-0===h},eq:function(g,h,l){return l[3]-0===h}},filter:{PSEUDO:function(g,h,l,m){var q=h[1],p=n.filters[q];if(p)return p(g,l,h,m);else if(q==="contains")return(g.textContent||g.innerText||a([g])||"").indexOf(h[3])>=0;else if(q==="not"){h=
h[3];l=0;for(m=h.length;l<m;l++)if(h[l]===g)return false;return true}else k.error("Syntax error, unrecognized expression: "+q)},CHILD:function(g,h){var l=h[1],m=g;switch(l){case "only":case "first":for(;m=m.previousSibling;)if(m.nodeType===1)return false;if(l==="first")return true;m=g;case "last":for(;m=m.nextSibling;)if(m.nodeType===1)return false;return true;case "nth":l=h[2];var q=h[3];if(l===1&&q===0)return true;h=h[0];var p=g.parentNode;if(p&&(p.sizcache!==h||!g.nodeIndex)){var v=0;for(m=p.firstChild;m;m=
m.nextSibling)if(m.nodeType===1)m.nodeIndex=++v;p.sizcache=h}g=g.nodeIndex-q;return l===0?g===0:g%l===0&&g/l>=0}},ID:function(g,h){return g.nodeType===1&&g.getAttribute("id")===h},TAG:function(g,h){return h==="*"&&g.nodeType===1||g.nodeName.toLowerCase()===h},CLASS:function(g,h){return(" "+(g.className||g.getAttribute("class"))+" ").indexOf(h)>-1},ATTR:function(g,h){var l=h[1];g=n.attrHandle[l]?n.attrHandle[l](g):g[l]!=null?g[l]:g.getAttribute(l);l=g+"";var m=h[2];h=h[4];return g==null?m==="!=":m===
"="?l===h:m==="*="?l.indexOf(h)>=0:m==="~="?(" "+l+" ").indexOf(h)>=0:!h?l&&g!==false:m==="!="?l!==h:m==="^="?l.indexOf(h)===0:m==="$="?l.substr(l.length-h.length)===h:m==="|="?l===h||l.substr(0,h.length+1)===h+"-":false},POS:function(g,h,l,m){var q=n.setFilters[h[2]];if(q)return q(g,l,h,m)}}},r=n.match.POS;for(var u in n.match){n.match[u]=new RegExp(n.match[u].source+/(?![^\[]*\])(?![^\(]*\))/.source);n.leftMatch[u]=new RegExp(/(^(?:.|\r|\n)*?)/.source+n.match[u].source.replace(/\\(\d+)/g,function(g,
h){return"\\"+(h-0+1)}))}var z=function(g,h){g=Array.prototype.slice.call(g,0);if(h){h.push.apply(h,g);return h}return g};try{Array.prototype.slice.call(s.documentElement.childNodes,0)}catch(C){z=function(g,h){h=h||[];if(j.call(g)==="[object Array]")Array.prototype.push.apply(h,g);else if(typeof g.length==="number")for(var l=0,m=g.length;l<m;l++)h.push(g[l]);else for(l=0;g[l];l++)h.push(g[l]);return h}}var B;if(s.documentElement.compareDocumentPosition)B=function(g,h){if(!g.compareDocumentPosition||
!h.compareDocumentPosition){if(g==h)i=true;return g.compareDocumentPosition?-1:1}g=g.compareDocumentPosition(h)&4?-1:g===h?0:1;if(g===0)i=true;return g};else if("sourceIndex"in s.documentElement)B=function(g,h){if(!g.sourceIndex||!h.sourceIndex){if(g==h)i=true;return g.sourceIndex?-1:1}g=g.sourceIndex-h.sourceIndex;if(g===0)i=true;return g};else if(s.createRange)B=function(g,h){if(!g.ownerDocument||!h.ownerDocument){if(g==h)i=true;return g.ownerDocument?-1:1}var l=g.ownerDocument.createRange(),m=
h.ownerDocument.createRange();l.setStart(g,0);l.setEnd(g,0);m.setStart(h,0);m.setEnd(h,0);g=l.compareBoundaryPoints(Range.START_TO_END,m);if(g===0)i=true;return g};(function(){var g=s.createElement("div"),h="script"+(new Date).getTime();g.innerHTML="<a name='"+h+"'/>";var l=s.documentElement;l.insertBefore(g,l.firstChild);if(s.getElementById(h)){n.find.ID=function(m,q,p){if(typeof q.getElementById!=="undefined"&&!p)return(q=q.getElementById(m[1]))?q.id===m[1]||typeof q.getAttributeNode!=="undefined"&&
q.getAttributeNode("id").nodeValue===m[1]?[q]:w:[]};n.filter.ID=function(m,q){var p=typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id");return m.nodeType===1&&p&&p.nodeValue===q}}l.removeChild(g);l=g=null})();(function(){var g=s.createElement("div");g.appendChild(s.createComment(""));if(g.getElementsByTagName("*").length>0)n.find.TAG=function(h,l){l=l.getElementsByTagName(h[1]);if(h[1]==="*"){h=[];for(var m=0;l[m];m++)l[m].nodeType===1&&h.push(l[m]);l=h}return l};g.innerHTML="<a href='#'></a>";
if(g.firstChild&&typeof g.firstChild.getAttribute!=="undefined"&&g.firstChild.getAttribute("href")!=="#")n.attrHandle.href=function(h){return h.getAttribute("href",2)};g=null})();s.querySelectorAll&&function(){var g=k,h=s.createElement("div");h.innerHTML="<p class='TEST'></p>";if(!(h.querySelectorAll&&h.querySelectorAll(".TEST").length===0)){k=function(m,q,p,v){q=q||s;if(!v&&q.nodeType===9&&!x(q))try{return z(q.querySelectorAll(m),p)}catch(t){}return g(m,q,p,v)};for(var l in g)k[l]=g[l];h=null}}();
(function(){var g=s.createElement("div");g.innerHTML="<div class='test e'></div><div class='test'></div>";if(!(!g.getElementsByClassName||g.getElementsByClassName("e").length===0)){g.lastChild.className="e";if(g.getElementsByClassName("e").length!==1){n.order.splice(1,0,"CLASS");n.find.CLASS=function(h,l,m){if(typeof l.getElementsByClassName!=="undefined"&&!m)return l.getElementsByClassName(h[1])};g=null}}})();var E=s.compareDocumentPosition?function(g,h){return!!(g.compareDocumentPosition(h)&16)}:
function(g,h){return g!==h&&(g.contains?g.contains(h):true)},x=function(g){return(g=(g?g.ownerDocument||g:0).documentElement)?g.nodeName!=="HTML":false},ga=function(g,h){var l=[],m="",q;for(h=h.nodeType?[h]:h;q=n.match.PSEUDO.exec(g);){m+=q[0];g=g.replace(n.match.PSEUDO,"")}g=n.relative[g]?g+"*":g;q=0;for(var p=h.length;q<p;q++)k(g,h[q],l);return k.filter(m,l)};c.find=k;c.expr=k.selectors;c.expr[":"]=c.expr.filters;c.unique=k.uniqueSort;c.text=a;c.isXMLDoc=x;c.contains=E})();var eb=/Until$/,fb=/^(?:parents|prevUntil|prevAll)/,
gb=/,/;R=Array.prototype.slice;var Ia=function(a,b,d){if(c.isFunction(b))return c.grep(a,function(e,j){return!!b.call(e,j,e)===d});else if(b.nodeType)return c.grep(a,function(e){return e===b===d});else if(typeof b==="string"){var f=c.grep(a,function(e){return e.nodeType===1});if(Ua.test(b))return c.filter(b,f,!d);else b=c.filter(b,f)}return c.grep(a,function(e){return c.inArray(e,b)>=0===d})};c.fn.extend({find:function(a){for(var b=this.pushStack("","find",a),d=0,f=0,e=this.length;f<e;f++){d=b.length;
c.find(a,this[f],b);if(f>0)for(var j=d;j<b.length;j++)for(var i=0;i<d;i++)if(b[i]===b[j]){b.splice(j--,1);break}}return b},has:function(a){var b=c(a);return this.filter(function(){for(var d=0,f=b.length;d<f;d++)if(c.contains(this,b[d]))return true})},not:function(a){return this.pushStack(Ia(this,a,false),"not",a)},filter:function(a){return this.pushStack(Ia(this,a,true),"filter",a)},is:function(a){return!!a&&c.filter(a,this).length>0},closest:function(a,b){if(c.isArray(a)){var d=[],f=this[0],e,j=
{},i;if(f&&a.length){e=0;for(var o=a.length;e<o;e++){i=a[e];j[i]||(j[i]=c.expr.match.POS.test(i)?c(i,b||this.context):i)}for(;f&&f.ownerDocument&&f!==b;){for(i in j){e=j[i];if(e.jquery?e.index(f)>-1:c(f).is(e)){d.push({selector:i,elem:f});delete j[i]}}f=f.parentNode}}return d}var k=c.expr.match.POS.test(a)?c(a,b||this.context):null;return this.map(function(n,r){for(;r&&r.ownerDocument&&r!==b;){if(k?k.index(r)>-1:c(r).is(a))return r;r=r.parentNode}return null})},index:function(a){if(!a||typeof a===
"string")return c.inArray(this[0],a?c(a):this.parent().children());return c.inArray(a.jquery?a[0]:a,this)},add:function(a,b){a=typeof a==="string"?c(a,b||this.context):c.makeArray(a);b=c.merge(this.get(),a);return this.pushStack(qa(a[0])||qa(b[0])?b:c.unique(b))},andSelf:function(){return this.add(this.prevObject)}});c.each({parent:function(a){return(a=a.parentNode)&&a.nodeType!==11?a:null},parents:function(a){return c.dir(a,"parentNode")},parentsUntil:function(a,b,d){return c.dir(a,"parentNode",
d)},next:function(a){return c.nth(a,2,"nextSibling")},prev:function(a){return c.nth(a,2,"previousSibling")},nextAll:function(a){return c.dir(a,"nextSibling")},prevAll:function(a){return c.dir(a,"previousSibling")},nextUntil:function(a,b,d){return c.dir(a,"nextSibling",d)},prevUntil:function(a,b,d){return c.dir(a,"previousSibling",d)},siblings:function(a){return c.sibling(a.parentNode.firstChild,a)},children:function(a){return c.sibling(a.firstChild)},contents:function(a){return c.nodeName(a,"iframe")?
a.contentDocument||a.contentWindow.document:c.makeArray(a.childNodes)}},function(a,b){c.fn[a]=function(d,f){var e=c.map(this,b,d);eb.test(a)||(f=d);if(f&&typeof f==="string")e=c.filter(f,e);e=this.length>1?c.unique(e):e;if((this.length>1||gb.test(f))&&fb.test(a))e=e.reverse();return this.pushStack(e,a,R.call(arguments).join(","))}});c.extend({filter:function(a,b,d){if(d)a=":not("+a+")";return c.find.matches(a,b)},dir:function(a,b,d){var f=[];for(a=a[b];a&&a.nodeType!==9&&(d===w||a.nodeType!==1||!c(a).is(d));){a.nodeType===
1&&f.push(a);a=a[b]}return f},nth:function(a,b,d){b=b||1;for(var f=0;a;a=a[d])if(a.nodeType===1&&++f===b)break;return a},sibling:function(a,b){for(var d=[];a;a=a.nextSibling)a.nodeType===1&&a!==b&&d.push(a);return d}});var Ja=/ jQuery\d+="(?:\d+|null)"/g,V=/^\s+/,Ka=/(<([\w:]+)[^>]*?)\/>/g,hb=/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,La=/<([\w:]+)/,ib=/<tbody/i,jb=/<|&#?\w+;/,ta=/<script|<object|<embed|<option|<style/i,ua=/checked\s*(?:[^=]|=\s*.checked.)/i,Ma=function(a,b,d){return hb.test(d)?
a:b+"></"+d+">"},F={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};F.optgroup=F.option;F.tbody=F.tfoot=F.colgroup=F.caption=F.thead;F.th=F.td;if(!c.support.htmlSerialize)F._default=[1,"div<div>","</div>"];c.fn.extend({text:function(a){if(c.isFunction(a))return this.each(function(b){var d=
c(this);d.text(a.call(this,b,d.text()))});if(typeof a!=="object"&&a!==w)return this.empty().append((this[0]&&this[0].ownerDocument||s).createTextNode(a));return c.text(this)},wrapAll:function(a){if(c.isFunction(a))return this.each(function(d){c(this).wrapAll(a.call(this,d))});if(this[0]){var b=c(a,this[0].ownerDocument).eq(0).clone(true);this[0].parentNode&&b.insertBefore(this[0]);b.map(function(){for(var d=this;d.firstChild&&d.firstChild.nodeType===1;)d=d.firstChild;return d}).append(this)}return this},
wrapInner:function(a){if(c.isFunction(a))return this.each(function(b){c(this).wrapInner(a.call(this,b))});return this.each(function(){var b=c(this),d=b.contents();d.length?d.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){c(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){c.nodeName(this,"body")||c(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.appendChild(a)})},
prepend:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,this)});else if(arguments.length){var a=c(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,
this.nextSibling)});else if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,c(arguments[0]).toArray());return a}},remove:function(a,b){for(var d=0,f;(f=this[d])!=null;d++)if(!a||c.filter(a,[f]).length){if(!b&&f.nodeType===1){c.cleanData(f.getElementsByTagName("*"));c.cleanData([f])}f.parentNode&&f.parentNode.removeChild(f)}return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++)for(b.nodeType===1&&c.cleanData(b.getElementsByTagName("*"));b.firstChild;)b.removeChild(b.firstChild);
return this},clone:function(a){var b=this.map(function(){if(!c.support.noCloneEvent&&!c.isXMLDoc(this)){var d=this.outerHTML,f=this.ownerDocument;if(!d){d=f.createElement("div");d.appendChild(this.cloneNode(true));d=d.innerHTML}return c.clean([d.replace(Ja,"").replace(/=([^="'>\s]+\/)>/g,'="$1">').replace(V,"")],f)[0]}else return this.cloneNode(true)});if(a===true){ra(this,b);ra(this.find("*"),b.find("*"))}return b},html:function(a){if(a===w)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(Ja,
""):null;else if(typeof a==="string"&&!ta.test(a)&&(c.support.leadingWhitespace||!V.test(a))&&!F[(La.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Ka,Ma);try{for(var b=0,d=this.length;b<d;b++)if(this[b].nodeType===1){c.cleanData(this[b].getElementsByTagName("*"));this[b].innerHTML=a}}catch(f){this.empty().append(a)}}else c.isFunction(a)?this.each(function(e){var j=c(this),i=j.html();j.empty().append(function(){return a.call(this,e,i)})}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&
this[0].parentNode){if(c.isFunction(a))return this.each(function(b){var d=c(this),f=d.html();d.replaceWith(a.call(this,b,f))});if(typeof a!=="string")a=c(a).detach();return this.each(function(){var b=this.nextSibling,d=this.parentNode;c(this).remove();b?c(b).before(a):c(d).append(a)})}else return this.pushStack(c(c.isFunction(a)?a():a),"replaceWith",a)},detach:function(a){return this.remove(a,true)},domManip:function(a,b,d){function f(u){return c.nodeName(u,"table")?u.getElementsByTagName("tbody")[0]||
u.appendChild(u.ownerDocument.createElement("tbody")):u}var e,j,i=a[0],o=[],k;if(!c.support.checkClone&&arguments.length===3&&typeof i==="string"&&ua.test(i))return this.each(function(){c(this).domManip(a,b,d,true)});if(c.isFunction(i))return this.each(function(u){var z=c(this);a[0]=i.call(this,u,b?z.html():w);z.domManip(a,b,d)});if(this[0]){e=i&&i.parentNode;e=c.support.parentNode&&e&&e.nodeType===11&&e.childNodes.length===this.length?{fragment:e}:sa(a,this,o);k=e.fragment;if(j=k.childNodes.length===
1?(k=k.firstChild):k.firstChild){b=b&&c.nodeName(j,"tr");for(var n=0,r=this.length;n<r;n++)d.call(b?f(this[n],j):this[n],n>0||e.cacheable||this.length>1?k.cloneNode(true):k)}o.length&&c.each(o,Qa)}return this}});c.fragments={};c.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){c.fn[a]=function(d){var f=[];d=c(d);var e=this.length===1&&this[0].parentNode;if(e&&e.nodeType===11&&e.childNodes.length===1&&d.length===1){d[b](this[0]);
return this}else{e=0;for(var j=d.length;e<j;e++){var i=(e>0?this.clone(true):this).get();c.fn[b].apply(c(d[e]),i);f=f.concat(i)}return this.pushStack(f,a,d.selector)}}});c.extend({clean:function(a,b,d,f){b=b||s;if(typeof b.createElement==="undefined")b=b.ownerDocument||b[0]&&b[0].ownerDocument||s;for(var e=[],j=0,i;(i=a[j])!=null;j++){if(typeof i==="number")i+="";if(i){if(typeof i==="string"&&!jb.test(i))i=b.createTextNode(i);else if(typeof i==="string"){i=i.replace(Ka,Ma);var o=(La.exec(i)||["",
""])[1].toLowerCase(),k=F[o]||F._default,n=k[0],r=b.createElement("div");for(r.innerHTML=k[1]+i+k[2];n--;)r=r.lastChild;if(!c.support.tbody){n=ib.test(i);o=o==="table"&&!n?r.firstChild&&r.firstChild.childNodes:k[1]==="<table>"&&!n?r.childNodes:[];for(k=o.length-1;k>=0;--k)c.nodeName(o[k],"tbody")&&!o[k].childNodes.length&&o[k].parentNode.removeChild(o[k])}!c.support.leadingWhitespace&&V.test(i)&&r.insertBefore(b.createTextNode(V.exec(i)[0]),r.firstChild);i=r.childNodes}if(i.nodeType)e.push(i);else e=
c.merge(e,i)}}if(d)for(j=0;e[j];j++)if(f&&c.nodeName(e[j],"script")&&(!e[j].type||e[j].type.toLowerCase()==="text/javascript"))f.push(e[j].parentNode?e[j].parentNode.removeChild(e[j]):e[j]);else{e[j].nodeType===1&&e.splice.apply(e,[j+1,0].concat(c.makeArray(e[j].getElementsByTagName("script"))));d.appendChild(e[j])}return e},cleanData:function(a){for(var b,d,f=c.cache,e=c.event.special,j=c.support.deleteExpando,i=0,o;(o=a[i])!=null;i++)if(d=o[c.expando]){b=f[d];if(b.events)for(var k in b.events)e[k]?
c.event.remove(o,k):Ca(o,k,b.handle);if(j)delete o[c.expando];else o.removeAttribute&&o.removeAttribute(c.expando);delete f[d]}}});var kb=/z-?index|font-?weight|opacity|zoom|line-?height/i,Na=/alpha\([^)]*\)/,Oa=/opacity=([^)]*)/,ha=/float/i,ia=/-([a-z])/ig,lb=/([A-Z])/g,mb=/^-?\d+(?:px)?$/i,nb=/^-?\d/,ob={position:"absolute",visibility:"hidden",display:"block"},pb=["Left","Right"],qb=["Top","Bottom"],rb=s.defaultView&&s.defaultView.getComputedStyle,Pa=c.support.cssFloat?"cssFloat":"styleFloat",ja=
function(a,b){return b.toUpperCase()};c.fn.css=function(a,b){return X(this,a,b,true,function(d,f,e){if(e===w)return c.curCSS(d,f);if(typeof e==="number"&&!kb.test(f))e+="px";c.style(d,f,e)})};c.extend({style:function(a,b,d){if(!a||a.nodeType===3||a.nodeType===8)return w;if((b==="width"||b==="height")&&parseFloat(d)<0)d=w;var f=a.style||a,e=d!==w;if(!c.support.opacity&&b==="opacity"){if(e){f.zoom=1;b=parseInt(d,10)+""==="NaN"?"":"alpha(opacity="+d*100+")";a=f.filter||c.curCSS(a,"filter")||"";f.filter=
Na.test(a)?a.replace(Na,b):b}return f.filter&&f.filter.indexOf("opacity=")>=0?parseFloat(Oa.exec(f.filter)[1])/100+"":""}if(ha.test(b))b=Pa;b=b.replace(ia,ja);if(e)f[b]=d;return f[b]},css:function(a,b,d,f){if(b==="width"||b==="height"){var e,j=b==="width"?pb:qb;function i(){e=b==="width"?a.offsetWidth:a.offsetHeight;f!=="border"&&c.each(j,function(){f||(e-=parseFloat(c.curCSS(a,"padding"+this,true))||0);if(f==="margin")e+=parseFloat(c.curCSS(a,"margin"+this,true))||0;else e-=parseFloat(c.curCSS(a,
"border"+this+"Width",true))||0})}a.offsetWidth!==0?i():c.swap(a,ob,i);return Math.max(0,Math.round(e))}return c.curCSS(a,b,d)},curCSS:function(a,b,d){var f,e=a.style;if(!c.support.opacity&&b==="opacity"&&a.currentStyle){f=Oa.test(a.currentStyle.filter||"")?parseFloat(RegExp.$1)/100+"":"";return f===""?"1":f}if(ha.test(b))b=Pa;if(!d&&e&&e[b])f=e[b];else if(rb){if(ha.test(b))b="float";b=b.replace(lb,"-$1").toLowerCase();e=a.ownerDocument.defaultView;if(!e)return null;if(a=e.getComputedStyle(a,null))f=
a.getPropertyValue(b);if(b==="opacity"&&f==="")f="1"}else if(a.currentStyle){d=b.replace(ia,ja);f=a.currentStyle[b]||a.currentStyle[d];if(!mb.test(f)&&nb.test(f)){b=e.left;var j=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;e.left=d==="fontSize"?"1em":f||0;f=e.pixelLeft+"px";e.left=b;a.runtimeStyle.left=j}}return f},swap:function(a,b,d){var f={};for(var e in b){f[e]=a.style[e];a.style[e]=b[e]}d.call(a);for(e in b)a.style[e]=f[e]}});if(c.expr&&c.expr.filters){c.expr.filters.hidden=function(a){var b=
a.offsetWidth,d=a.offsetHeight,f=a.nodeName.toLowerCase()==="tr";return b===0&&d===0&&!f?true:b>0&&d>0&&!f?false:c.curCSS(a,"display")==="none"};c.expr.filters.visible=function(a){return!c.expr.filters.hidden(a)}}var sb=J(),tb=/<script(.|\s)*?\/script>/gi,ub=/select|textarea/i,vb=/color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,N=/=\?(&|$)/,ka=/\?/,wb=/(\?|&)_=.*?(&|$)/,xb=/^(\w+:)?\/\/([^\/?#]+)/,yb=/%20/g,zb=c.fn.load;c.fn.extend({load:function(a,b,d){if(typeof a!==
"string")return zb.call(this,a);else if(!this.length)return this;var f=a.indexOf(" ");if(f>=0){var e=a.slice(f,a.length);a=a.slice(0,f)}f="GET";if(b)if(c.isFunction(b)){d=b;b=null}else if(typeof b==="object"){b=c.param(b,c.ajaxSettings.traditional);f="POST"}var j=this;c.ajax({url:a,type:f,dataType:"html",data:b,complete:function(i,o){if(o==="success"||o==="notmodified")j.html(e?c("<div />").append(i.responseText.replace(tb,"")).find(e):i.responseText);d&&j.each(d,[i.responseText,o,i])}});return this},
serialize:function(){return c.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?c.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||ub.test(this.nodeName)||vb.test(this.type))}).map(function(a,b){a=c(this).val();return a==null?null:c.isArray(a)?c.map(a,function(d){return{name:b.name,value:d}}):{name:b.name,value:a}}).get()}});c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),
function(a,b){c.fn[b]=function(d){return this.bind(b,d)}});c.extend({get:function(a,b,d,f){if(c.isFunction(b)){f=f||d;d=b;b=null}return c.ajax({type:"GET",url:a,data:b,success:d,dataType:f})},getScript:function(a,b){return c.get(a,null,b,"script")},getJSON:function(a,b,d){return c.get(a,b,d,"json")},post:function(a,b,d,f){if(c.isFunction(b)){f=f||d;d=b;b={}}return c.ajax({type:"POST",url:a,data:b,success:d,dataType:f})},ajaxSetup:function(a){c.extend(c.ajaxSettings,a)},ajaxSettings:{url:location.href,
global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:A.XMLHttpRequest&&(A.location.protocol!=="file:"||!A.ActiveXObject)?function(){return new A.XMLHttpRequest}:function(){try{return new A.ActiveXObject("Microsoft.XMLHTTP")}catch(a){}},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},etag:{},ajax:function(a){function b(){e.success&&
e.success.call(k,o,i,x);e.global&&f("ajaxSuccess",[x,e])}function d(){e.complete&&e.complete.call(k,x,i);e.global&&f("ajaxComplete",[x,e]);e.global&&!--c.active&&c.event.trigger("ajaxStop")}function f(q,p){(e.context?c(e.context):c.event).trigger(q,p)}var e=c.extend(true,{},c.ajaxSettings,a),j,i,o,k=a&&a.context||e,n=e.type.toUpperCase();if(e.data&&e.processData&&typeof e.data!=="string")e.data=c.param(e.data,e.traditional);if(e.dataType==="jsonp"){if(n==="GET")N.test(e.url)||(e.url+=(ka.test(e.url)?
"&":"?")+(e.jsonp||"callback")+"=?");else if(!e.data||!N.test(e.data))e.data=(e.data?e.data+"&":"")+(e.jsonp||"callback")+"=?";e.dataType="json"}if(e.dataType==="json"&&(e.data&&N.test(e.data)||N.test(e.url))){j=e.jsonpCallback||"jsonp"+sb++;if(e.data)e.data=(e.data+"").replace(N,"="+j+"$1");e.url=e.url.replace(N,"="+j+"$1");e.dataType="script";A[j]=A[j]||function(q){o=q;b();d();A[j]=w;try{delete A[j]}catch(p){}z&&z.removeChild(C)}}if(e.dataType==="script"&&e.cache===null)e.cache=false;if(e.cache===
false&&n==="GET"){var r=J(),u=e.url.replace(wb,"$1_="+r+"$2");e.url=u+(u===e.url?(ka.test(e.url)?"&":"?")+"_="+r:"")}if(e.data&&n==="GET")e.url+=(ka.test(e.url)?"&":"?")+e.data;e.global&&!c.active++&&c.event.trigger("ajaxStart");r=(r=xb.exec(e.url))&&(r[1]&&r[1]!==location.protocol||r[2]!==location.host);if(e.dataType==="script"&&n==="GET"&&r){var z=s.getElementsByTagName("head")[0]||s.documentElement,C=s.createElement("script");C.src=e.url;if(e.scriptCharset)C.charset=e.scriptCharset;if(!j){var B=
false;C.onload=C.onreadystatechange=function(){if(!B&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){B=true;b();d();C.onload=C.onreadystatechange=null;z&&C.parentNode&&z.removeChild(C)}}}z.insertBefore(C,z.firstChild);return w}var E=false,x=e.xhr();if(x){e.username?x.open(n,e.url,e.async,e.username,e.password):x.open(n,e.url,e.async);try{if(e.data||a&&a.contentType)x.setRequestHeader("Content-Type",e.contentType);if(e.ifModified){c.lastModified[e.url]&&x.setRequestHeader("If-Modified-Since",
c.lastModified[e.url]);c.etag[e.url]&&x.setRequestHeader("If-None-Match",c.etag[e.url])}r||x.setRequestHeader("X-Requested-With","XMLHttpRequest");x.setRequestHeader("Accept",e.dataType&&e.accepts[e.dataType]?e.accepts[e.dataType]+", */*":e.accepts._default)}catch(ga){}if(e.beforeSend&&e.beforeSend.call(k,x,e)===false){e.global&&!--c.active&&c.event.trigger("ajaxStop");x.abort();return false}e.global&&f("ajaxSend",[x,e]);var g=x.onreadystatechange=function(q){if(!x||x.readyState===0||q==="abort"){E||
d();E=true;if(x)x.onreadystatechange=c.noop}else if(!E&&x&&(x.readyState===4||q==="timeout")){E=true;x.onreadystatechange=c.noop;i=q==="timeout"?"timeout":!c.httpSuccess(x)?"error":e.ifModified&&c.httpNotModified(x,e.url)?"notmodified":"success";var p;if(i==="success")try{o=c.httpData(x,e.dataType,e)}catch(v){i="parsererror";p=v}if(i==="success"||i==="notmodified")j||b();else c.handleError(e,x,i,p);d();q==="timeout"&&x.abort();if(e.async)x=null}};try{var h=x.abort;x.abort=function(){x&&h.call(x);
g("abort")}}catch(l){}e.async&&e.timeout>0&&setTimeout(function(){x&&!E&&g("timeout")},e.timeout);try{x.send(n==="POST"||n==="PUT"||n==="DELETE"?e.data:null)}catch(m){c.handleError(e,x,null,m);d()}e.async||g();return x}},handleError:function(a,b,d,f){if(a.error)a.error.call(a.context||a,b,d,f);if(a.global)(a.context?c(a.context):c.event).trigger("ajaxError",[b,a,f])},active:0,httpSuccess:function(a){try{return!a.status&&location.protocol==="file:"||a.status>=200&&a.status<300||a.status===304||a.status===
1223||a.status===0}catch(b){}return false},httpNotModified:function(a,b){var d=a.getResponseHeader("Last-Modified"),f=a.getResponseHeader("Etag");if(d)c.lastModified[b]=d;if(f)c.etag[b]=f;return a.status===304||a.status===0},httpData:function(a,b,d){var f=a.getResponseHeader("content-type")||"",e=b==="xml"||!b&&f.indexOf("xml")>=0;a=e?a.responseXML:a.responseText;e&&a.documentElement.nodeName==="parsererror"&&c.error("parsererror");if(d&&d.dataFilter)a=d.dataFilter(a,b);if(typeof a==="string")if(b===
"json"||!b&&f.indexOf("json")>=0)a=c.parseJSON(a);else if(b==="script"||!b&&f.indexOf("javascript")>=0)c.globalEval(a);return a},param:function(a,b){function d(i,o){if(c.isArray(o))c.each(o,function(k,n){b||/\[\]$/.test(i)?f(i,n):d(i+"["+(typeof n==="object"||c.isArray(n)?k:"")+"]",n)});else!b&&o!=null&&typeof o==="object"?c.each(o,function(k,n){d(i+"["+k+"]",n)}):f(i,o)}function f(i,o){o=c.isFunction(o)?o():o;e[e.length]=encodeURIComponent(i)+"="+encodeURIComponent(o)}var e=[];if(b===w)b=c.ajaxSettings.traditional;
if(c.isArray(a)||a.jquery)c.each(a,function(){f(this.name,this.value)});else for(var j in a)d(j,a[j]);return e.join("&").replace(yb,"+")}});var la={},Ab=/toggle|show|hide/,Bb=/^([+-]=)?([\d+-.]+)(.*)$/,W,va=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];c.fn.extend({show:function(a,b){if(a||a===0)return this.animate(K("show",3),a,b);else{a=0;for(b=this.length;a<b;a++){var d=c.data(this[a],"olddisplay");
this[a].style.display=d||"";if(c.css(this[a],"display")==="none"){d=this[a].nodeName;var f;if(la[d])f=la[d];else{var e=c("<"+d+" />").appendTo("body");f=e.css("display");if(f==="none")f="block";e.remove();la[d]=f}c.data(this[a],"olddisplay",f)}}a=0;for(b=this.length;a<b;a++)this[a].style.display=c.data(this[a],"olddisplay")||"";return this}},hide:function(a,b){if(a||a===0)return this.animate(K("hide",3),a,b);else{a=0;for(b=this.length;a<b;a++){var d=c.data(this[a],"olddisplay");!d&&d!=="none"&&c.data(this[a],
"olddisplay",c.css(this[a],"display"))}a=0;for(b=this.length;a<b;a++)this[a].style.display="none";return this}},_toggle:c.fn.toggle,toggle:function(a,b){var d=typeof a==="boolean";if(c.isFunction(a)&&c.isFunction(b))this._toggle.apply(this,arguments);else a==null||d?this.each(function(){var f=d?a:c(this).is(":hidden");c(this)[f?"show":"hide"]()}):this.animate(K("toggle",3),a,b);return this},fadeTo:function(a,b,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,d)},
animate:function(a,b,d,f){var e=c.speed(b,d,f);if(c.isEmptyObject(a))return this.each(e.complete);return this[e.queue===false?"each":"queue"](function(){var j=c.extend({},e),i,o=this.nodeType===1&&c(this).is(":hidden"),k=this;for(i in a){var n=i.replace(ia,ja);if(i!==n){a[n]=a[i];delete a[i];i=n}if(a[i]==="hide"&&o||a[i]==="show"&&!o)return j.complete.call(this);if((i==="height"||i==="width")&&this.style){j.display=c.css(this,"display");j.overflow=this.style.overflow}if(c.isArray(a[i])){(j.specialEasing=
j.specialEasing||{})[i]=a[i][1];a[i]=a[i][0]}}if(j.overflow!=null)this.style.overflow="hidden";j.curAnim=c.extend({},a);c.each(a,function(r,u){var z=new c.fx(k,j,r);if(Ab.test(u))z[u==="toggle"?o?"show":"hide":u](a);else{var C=Bb.exec(u),B=z.cur(true)||0;if(C){u=parseFloat(C[2]);var E=C[3]||"px";if(E!=="px"){k.style[r]=(u||1)+E;B=(u||1)/z.cur(true)*B;k.style[r]=B+E}if(C[1])u=(C[1]==="-="?-1:1)*u+B;z.custom(B,u,E)}else z.custom(B,u,"")}});return true})},stop:function(a,b){var d=c.timers;a&&this.queue([]);
this.each(function(){for(var f=d.length-1;f>=0;f--)if(d[f].elem===this){b&&d[f](true);d.splice(f,1)}});b||this.dequeue();return this}});c.each({slideDown:K("show",1),slideUp:K("hide",1),slideToggle:K("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(a,b){c.fn[a]=function(d,f){return this.animate(b,d,f)}});c.extend({speed:function(a,b,d){var f=a&&typeof a==="object"?a:{complete:d||!d&&b||c.isFunction(a)&&a,duration:a,easing:d&&b||b&&!c.isFunction(b)&&b};f.duration=c.fx.off?0:typeof f.duration===
"number"?f.duration:c.fx.speeds[f.duration]||c.fx.speeds._default;f.old=f.complete;f.complete=function(){f.queue!==false&&c(this).dequeue();c.isFunction(f.old)&&f.old.call(this)};return f},easing:{linear:function(a,b,d,f){return d+f*a},swing:function(a,b,d,f){return(-Math.cos(a*Math.PI)/2+0.5)*f+d}},timers:[],fx:function(a,b,d){this.options=b;this.elem=a;this.prop=d;if(!b.orig)b.orig={}}});c.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this);(c.fx.step[this.prop]||
c.fx.step._default)(this);if((this.prop==="height"||this.prop==="width")&&this.elem.style)this.elem.style.display="block"},cur:function(a){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];return(a=parseFloat(c.css(this.elem,this.prop,a)))&&a>-10000?a:parseFloat(c.curCSS(this.elem,this.prop))||0},custom:function(a,b,d){function f(j){return e.step(j)}this.startTime=J();this.start=a;this.end=b;this.unit=d||this.unit||"px";this.now=this.start;
this.pos=this.state=0;var e=this;f.elem=this.elem;if(f()&&c.timers.push(f)&&!W)W=setInterval(c.fx.tick,13)},show:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.show=true;this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());c(this.elem).show()},hide:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(a){var b=J(),d=true;if(a||b>=this.options.duration+this.startTime){this.now=
this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;for(var f in this.options.curAnim)if(this.options.curAnim[f]!==true)d=false;if(d){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;a=c.data(this.elem,"olddisplay");this.elem.style.display=a?a:this.options.display;if(c.css(this.elem,"display")==="none")this.elem.style.display="block"}this.options.hide&&c(this.elem).hide();if(this.options.hide||this.options.show)for(var e in this.options.curAnim)c.style(this.elem,
e,this.options.orig[e]);this.options.complete.call(this.elem)}return false}else{e=b-this.startTime;this.state=e/this.options.duration;a=this.options.easing||(c.easing.swing?"swing":"linear");this.pos=c.easing[this.options.specialEasing&&this.options.specialEasing[this.prop]||a](this.state,e,0,1,this.options.duration);this.now=this.start+(this.end-this.start)*this.pos;this.update()}return true}};c.extend(c.fx,{tick:function(){for(var a=c.timers,b=0;b<a.length;b++)a[b]()||a.splice(b--,1);a.length||
c.fx.stop()},stop:function(){clearInterval(W);W=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){c.style(a.elem,"opacity",a.now)},_default:function(a){if(a.elem.style&&a.elem.style[a.prop]!=null)a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit;else a.elem[a.prop]=a.now}}});if(c.expr&&c.expr.filters)c.expr.filters.animated=function(a){return c.grep(c.timers,function(b){return a===b.elem}).length};c.fn.offset="getBoundingClientRect"in s.documentElement?
function(a){var b=this[0];if(a)return this.each(function(e){c.offset.setOffset(this,a,e)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);var d=b.getBoundingClientRect(),f=b.ownerDocument;b=f.body;f=f.documentElement;return{top:d.top+(self.pageYOffset||c.support.boxModel&&f.scrollTop||b.scrollTop)-(f.clientTop||b.clientTop||0),left:d.left+(self.pageXOffset||c.support.boxModel&&f.scrollLeft||b.scrollLeft)-(f.clientLeft||b.clientLeft||0)}}:function(a){var b=
this[0];if(a)return this.each(function(r){c.offset.setOffset(this,a,r)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);c.offset.initialize();var d=b.offsetParent,f=b,e=b.ownerDocument,j,i=e.documentElement,o=e.body;f=(e=e.defaultView)?e.getComputedStyle(b,null):b.currentStyle;for(var k=b.offsetTop,n=b.offsetLeft;(b=b.parentNode)&&b!==o&&b!==i;){if(c.offset.supportsFixedPosition&&f.position==="fixed")break;j=e?e.getComputedStyle(b,null):b.currentStyle;
k-=b.scrollTop;n-=b.scrollLeft;if(b===d){k+=b.offsetTop;n+=b.offsetLeft;if(c.offset.doesNotAddBorder&&!(c.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(b.nodeName))){k+=parseFloat(j.borderTopWidth)||0;n+=parseFloat(j.borderLeftWidth)||0}f=d;d=b.offsetParent}if(c.offset.subtractsBorderForOverflowNotVisible&&j.overflow!=="visible"){k+=parseFloat(j.borderTopWidth)||0;n+=parseFloat(j.borderLeftWidth)||0}f=j}if(f.position==="relative"||f.position==="static"){k+=o.offsetTop;n+=o.offsetLeft}if(c.offset.supportsFixedPosition&&
f.position==="fixed"){k+=Math.max(i.scrollTop,o.scrollTop);n+=Math.max(i.scrollLeft,o.scrollLeft)}return{top:k,left:n}};c.offset={initialize:function(){var a=s.body,b=s.createElement("div"),d,f,e,j=parseFloat(c.curCSS(a,"marginTop",true))||0;c.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"});b.innerHTML="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
a.insertBefore(b,a.firstChild);d=b.firstChild;f=d.firstChild;e=d.nextSibling.firstChild.firstChild;this.doesNotAddBorder=f.offsetTop!==5;this.doesAddBorderForTableAndCells=e.offsetTop===5;f.style.position="fixed";f.style.top="20px";this.supportsFixedPosition=f.offsetTop===20||f.offsetTop===15;f.style.position=f.style.top="";d.style.overflow="hidden";d.style.position="relative";this.subtractsBorderForOverflowNotVisible=f.offsetTop===-5;this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==j;a.removeChild(b);
c.offset.initialize=c.noop},bodyOffset:function(a){var b=a.offsetTop,d=a.offsetLeft;c.offset.initialize();if(c.offset.doesNotIncludeMarginInBodyOffset){b+=parseFloat(c.curCSS(a,"marginTop",true))||0;d+=parseFloat(c.curCSS(a,"marginLeft",true))||0}return{top:b,left:d}},setOffset:function(a,b,d){if(/static/.test(c.curCSS(a,"position")))a.style.position="relative";var f=c(a),e=f.offset(),j=parseInt(c.curCSS(a,"top",true),10)||0,i=parseInt(c.curCSS(a,"left",true),10)||0;if(c.isFunction(b))b=b.call(a,
d,e);d={top:b.top-e.top+j,left:b.left-e.left+i};"using"in b?b.using.call(a,d):f.css(d)}};c.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),d=this.offset(),f=/^body|html$/i.test(b[0].nodeName)?{top:0,left:0}:b.offset();d.top-=parseFloat(c.curCSS(a,"marginTop",true))||0;d.left-=parseFloat(c.curCSS(a,"marginLeft",true))||0;f.top+=parseFloat(c.curCSS(b[0],"borderTopWidth",true))||0;f.left+=parseFloat(c.curCSS(b[0],"borderLeftWidth",true))||0;return{top:d.top-
f.top,left:d.left-f.left}},offsetParent:function(){return this.map(function(){for(var a=this.offsetParent||s.body;a&&!/^body|html$/i.test(a.nodeName)&&c.css(a,"position")==="static";)a=a.offsetParent;return a})}});c.each(["Left","Top"],function(a,b){var d="scroll"+b;c.fn[d]=function(f){var e=this[0],j;if(!e)return null;if(f!==w)return this.each(function(){if(j=wa(this))j.scrollTo(!a?f:c(j).scrollLeft(),a?f:c(j).scrollTop());else this[d]=f});else return(j=wa(e))?"pageXOffset"in j?j[a?"pageYOffset":
"pageXOffset"]:c.support.boxModel&&j.document.documentElement[d]||j.document.body[d]:e[d]}});c.each(["Height","Width"],function(a,b){var d=b.toLowerCase();c.fn["inner"+b]=function(){return this[0]?c.css(this[0],d,false,"padding"):null};c.fn["outer"+b]=function(f){return this[0]?c.css(this[0],d,false,f?"margin":"border"):null};c.fn[d]=function(f){var e=this[0];if(!e)return f==null?null:this;if(c.isFunction(f))return this.each(function(j){var i=c(this);i[d](f.call(this,j,i[d]()))});return"scrollTo"in
e&&e.document?e.document.compatMode==="CSS1Compat"&&e.document.documentElement["client"+b]||e.document.body["client"+b]:e.nodeType===9?Math.max(e.documentElement["client"+b],e.body["scroll"+b],e.documentElement["scroll"+b],e.body["offset"+b],e.documentElement["offset"+b]):f===w?c.css(e,d):this.css(d,typeof f==="string"?f:f+"px")}});A.jQuery=A.$=c})(window);
/*
 * jQuery JavaScript Library v1.3.2
 * http://jquery.com/
 *
 * Copyright (c) 2009 John Resig
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)
 * Revision: 6246
 */

(function(){var l=this,g,y=l.jQuery,p=l.$,o=l.jQuery=l.$=function(E,F){return new o.fn.init(E,F)},D=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;o.fn=o.prototype={init:function(E,H){E=E||document;if(E.nodeType){this[0]=E;this.length=1;this.context=E;return this}if(typeof E==="string"){var G=D.exec(E);if(G&&(G[1]||!H)){if(G[1]){E=o.clean([G[1]],H)}else{var I=document.getElementById(G[3]);if(I&&I.id!=G[3]){return o().find(E)}var F=o(I||[]);F.context=document;F.selector=E;return F}}else{return o(H).find(E)}}else{if(o.isFunction(E)){return o(document).ready(E)}}if(E.selector&&E.context){this.selector=E.selector;this.context=E.context}return this.setArray(o.isArray(E)?E:o.makeArray(E))},selector:"",jquery:"1.3.2",size:function(){return this.length},get:function(E){return E===g?Array.prototype.slice.call(this):this[E]},pushStack:function(F,H,E){var G=o(F);G.prevObject=this;G.context=this.context;if(H==="find"){G.selector=this.selector+(this.selector?" ":"")+E}else{if(H){G.selector=this.selector+"."+H+"("+E+")"}}return G},setArray:function(E){this.length=0;Array.prototype.push.apply(this,E);return this},each:function(F,E){return o.each(this,F,E)},index:function(E){return o.inArray(E&&E.jquery?E[0]:E,this)},attr:function(F,H,G){var E=F;if(typeof F==="string"){if(H===g){return this[0]&&o[G||"attr"](this[0],F)}else{E={};E[F]=H}}return this.each(function(I){for(F in E){o.attr(G?this.style:this,F,o.prop(this,E[F],G,I,F))}})},css:function(E,F){if((E=="width"||E=="height")&&parseFloat(F)<0){F=g}return this.attr(E,F,"curCSS")},text:function(F){if(typeof F!=="object"&&F!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(F))}var E="";o.each(F||this,function(){o.each(this.childNodes,function(){if(this.nodeType!=8){E+=this.nodeType!=1?this.nodeValue:o.fn.text([this])}})});return E},wrapAll:function(E){if(this[0]){var F=o(E,this[0].ownerDocument).clone();if(this[0].parentNode){F.insertBefore(this[0])}F.map(function(){var G=this;while(G.firstChild){G=G.firstChild}return G}).append(this)}return this},wrapInner:function(E){return this.each(function(){o(this).contents().wrapAll(E)})},wrap:function(E){return this.each(function(){o(this).wrapAll(E)})},append:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.appendChild(E)}})},prepend:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.insertBefore(E,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this)})},after:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this.nextSibling)})},end:function(){return this.prevObject||o([])},push:[].push,sort:[].sort,splice:[].splice,find:function(E){if(this.length===1){var F=this.pushStack([],"find",E);F.length=0;o.find(E,this[0],F);return F}else{return this.pushStack(o.unique(o.map(this,function(G){return o.find(E,G)})),"find",E)}},clone:function(G){var E=this.map(function(){if(!o.support.noCloneEvent&&!o.isXMLDoc(this)){var I=this.outerHTML;if(!I){var J=this.ownerDocument.createElement("div");J.appendChild(this.cloneNode(true));I=J.innerHTML}return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]}else{return this.cloneNode(true)}});if(G===true){var H=this.find("*").andSelf(),F=0;E.find("*").andSelf().each(function(){if(this.nodeName!==H[F].nodeName){return}var I=o.data(H[F],"events");for(var K in I){for(var J in I[K]){o.event.add(this,K,I[K][J],I[K][J].data)}}F++})}return E},filter:function(E){return this.pushStack(o.isFunction(E)&&o.grep(this,function(G,F){return E.call(G,F)})||o.multiFilter(E,o.grep(this,function(F){return F.nodeType===1})),"filter",E)},closest:function(E){var G=o.expr.match.POS.test(E)?o(E):null,F=0;return this.map(function(){var H=this;while(H&&H.ownerDocument){if(G?G.index(H)>-1:o(H).is(E)){o.data(H,"closest",F);return H}H=H.parentNode;F++}})},not:function(E){if(typeof E==="string"){if(f.test(E)){return this.pushStack(o.multiFilter(E,this,true),"not",E)}else{E=o.multiFilter(E,this)}}var F=E.length&&E[E.length-1]!==g&&!E.nodeType;return this.filter(function(){return F?o.inArray(this,E)<0:this!=E})},add:function(E){return this.pushStack(o.unique(o.merge(this.get(),typeof E==="string"?o(E):o.makeArray(E))))},is:function(E){return !!E&&o.multiFilter(E,this).length>0},hasClass:function(E){return !!E&&this.is("."+E)},val:function(K){if(K===g){var E=this[0];if(E){if(o.nodeName(E,"option")){return(E.attributes.value||{}).specified?E.value:E.text}if(o.nodeName(E,"select")){var I=E.selectedIndex,L=[],M=E.options,H=E.type=="select-one";if(I<0){return null}for(var F=H?I:0,J=H?I+1:M.length;F<J;F++){var G=M[F];if(G.selected){K=o(G).val();if(H){return K}L.push(K)}}return L}return(E.value||"").replace(/\r/g,"")}return g}if(typeof K==="number"){K+=""}return this.each(function(){if(this.nodeType!=1){return}if(o.isArray(K)&&/radio|checkbox/.test(this.type)){this.checked=(o.inArray(this.value,K)>=0||o.inArray(this.name,K)>=0)}else{if(o.nodeName(this,"select")){var N=o.makeArray(K);o("option",this).each(function(){this.selected=(o.inArray(this.value,N)>=0||o.inArray(this.text,N)>=0)});if(!N.length){this.selectedIndex=-1}}else{this.value=K}}})},html:function(E){return E===g?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(E)},replaceWith:function(E){return this.after(E).remove()},eq:function(E){return this.slice(E,+E+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))},map:function(E){return this.pushStack(o.map(this,function(G,F){return E.call(G,F,G)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(J,M,L){if(this[0]){var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=o.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild;if(H){for(var G=0,E=this.length;G<E;G++){L.call(K(this[G],H),this.length>1||G>0?I.cloneNode(true):I)}}if(F){o.each(F,z)}}return this;function K(N,O){return M&&o.nodeName(N,"table")&&o.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N}}};o.fn.init.prototype=o.fn;function z(E,F){if(F.src){o.ajax({url:F.src,async:false,dataType:"script"})}else{o.globalEval(F.text||F.textContent||F.innerHTML||"")}if(F.parentNode){F.parentNode.removeChild(F)}}function e(){return +new Date}o.extend=o.fn.extend=function(){var J=arguments[0]||{},H=1,I=arguments.length,E=false,G;if(typeof J==="boolean"){E=J;J=arguments[1]||{};H=2}if(typeof J!=="object"&&!o.isFunction(J)){J={}}if(I==H){J=this;--H}for(;H<I;H++){if((G=arguments[H])!=null){for(var F in G){var K=J[F],L=G[F];if(J===L){continue}if(E&&L&&typeof L==="object"&&!L.nodeType){J[F]=o.extend(E,K||(L.length!=null?[]:{}),L)}else{if(L!==g){J[F]=L}}}}}return J};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,q=document.defaultView||{},s=Object.prototype.toString;o.extend({noConflict:function(E){l.$=p;if(E){l.jQuery=y}return o},isFunction:function(E){return s.call(E)==="[object Function]"},isArray:function(E){return s.call(E)==="[object Array]"},isXMLDoc:function(E){return E.nodeType===9&&E.documentElement.nodeName!=="HTML"||!!E.ownerDocument&&o.isXMLDoc(E.ownerDocument)},globalEval:function(G){if(G&&/\S/.test(G)){var F=document.getElementsByTagName("head")[0]||document.documentElement,E=document.createElement("script");E.type="text/javascript";if(o.support.scriptEval){E.appendChild(document.createTextNode(G))}else{E.text=G}F.insertBefore(E,F.firstChild);F.removeChild(E)}},nodeName:function(F,E){return F.nodeName&&F.nodeName.toUpperCase()==E.toUpperCase()},each:function(G,K,F){var E,H=0,I=G.length;if(F){if(I===g){for(E in G){if(K.apply(G[E],F)===false){break}}}else{for(;H<I;){if(K.apply(G[H++],F)===false){break}}}}else{if(I===g){for(E in G){if(K.call(G[E],E,G[E])===false){break}}}else{for(var J=G[0];H<I&&K.call(J,H,J)!==false;J=G[++H]){}}}return G},prop:function(H,I,G,F,E){if(o.isFunction(I)){I=I.call(H,F)}return typeof I==="number"&&G=="curCSS"&&!b.test(E)?I+"px":I},className:{add:function(E,F){o.each((F||"").split(/\s+/),function(G,H){if(E.nodeType==1&&!o.className.has(E.className,H)){E.className+=(E.className?" ":"")+H}})},remove:function(E,F){if(E.nodeType==1){E.className=F!==g?o.grep(E.className.split(/\s+/),function(G){return !o.className.has(F,G)}).join(" "):""}},has:function(F,E){return F&&o.inArray(E,(F.className||F).toString().split(/\s+/))>-1}},swap:function(H,G,I){var E={};for(var F in G){E[F]=H.style[F];H.style[F]=G[F]}I.call(H);for(var F in G){H.style[F]=E[F]}},css:function(H,F,J,E){if(F=="width"||F=="height"){var L,G={position:"absolute",visibility:"hidden",display:"block"},K=F=="width"?["Left","Right"]:["Top","Bottom"];function I(){L=F=="width"?H.offsetWidth:H.offsetHeight;if(E==="border"){return}o.each(K,function(){if(!E){L-=parseFloat(o.curCSS(H,"padding"+this,true))||0}if(E==="margin"){L+=parseFloat(o.curCSS(H,"margin"+this,true))||0}else{L-=parseFloat(o.curCSS(H,"border"+this+"Width",true))||0}})}if(H.offsetWidth!==0){I()}else{o.swap(H,G,I)}return Math.max(0,Math.round(L))}return o.curCSS(H,F,J)},curCSS:function(I,F,G){var L,E=I.style;if(F=="opacity"&&!o.support.opacity){L=o.attr(E,"opacity");return L==""?"1":L}if(F.match(/float/i)){F=w}if(!G&&E&&E[F]){L=E[F]}else{if(q.getComputedStyle){if(F.match(/float/i)){F="float"}F=F.replace(/([A-Z])/g,"-$1").toLowerCase();var M=q.getComputedStyle(I,null);if(M){L=M.getPropertyValue(F)}if(F=="opacity"&&L==""){L="1"}}else{if(I.currentStyle){var J=F.replace(/\-(\w)/g,function(N,O){return O.toUpperCase()});L=I.currentStyle[F]||I.currentStyle[J];if(!/^\d+(px)?$/i.test(L)&&/^\d/.test(L)){var H=E.left,K=I.runtimeStyle.left;I.runtimeStyle.left=I.currentStyle.left;E.left=L||0;L=E.pixelLeft+"px";E.left=H;I.runtimeStyle.left=K}}}}return L},clean:function(F,K,I){K=K||document;if(typeof K.createElement==="undefined"){K=K.ownerDocument||K[0]&&K[0].ownerDocument||document}if(!I&&F.length===1&&typeof F[0]==="string"){var H=/^<(\w+)\s*\/?>$/.exec(F[0]);if(H){return[K.createElement(H[1])]}}var G=[],E=[],L=K.createElement("div");o.each(F,function(P,S){if(typeof S==="number"){S+=""}if(!S){return}if(typeof S==="string"){S=S.replace(/(<(\w+)[^>]*?)\/>/g,function(U,V,T){return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?U:V+"></"+T+">"});var O=S.replace(/^\s+/,"").substring(0,10).toLowerCase();var Q=!O.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!O.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||O.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!O.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!O.indexOf("<td")||!O.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!O.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!o.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];L.innerHTML=Q[1]+S+Q[2];while(Q[0]--){L=L.lastChild}if(!o.support.tbody){var R=/<tbody/i.test(S),N=!O.indexOf("<table")&&!R?L.firstChild&&L.firstChild.childNodes:Q[1]=="<table>"&&!R?L.childNodes:[];for(var M=N.length-1;M>=0;--M){if(o.nodeName(N[M],"tbody")&&!N[M].childNodes.length){N[M].parentNode.removeChild(N[M])}}}if(!o.support.leadingWhitespace&&/^\s/.test(S)){L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]),L.firstChild)}S=o.makeArray(L.childNodes)}if(S.nodeType){G.push(S)}else{G=o.merge(G,S)}});if(I){for(var J=0;G[J];J++){if(o.nodeName(G[J],"script")&&(!G[J].type||G[J].type.toLowerCase()==="text/javascript")){E.push(G[J].parentNode?G[J].parentNode.removeChild(G[J]):G[J])}else{if(G[J].nodeType===1){G.splice.apply(G,[J+1,0].concat(o.makeArray(G[J].getElementsByTagName("script"))))}I.appendChild(G[J])}}return E}return G},attr:function(J,G,K){if(!J||J.nodeType==3||J.nodeType==8){return g}var H=!o.isXMLDoc(J),L=K!==g;G=H&&o.props[G]||G;if(J.tagName){var F=/href|src|style/.test(G);if(G=="selected"&&J.parentNode){J.parentNode.selectedIndex}if(G in J&&H&&!F){if(L){if(G=="type"&&o.nodeName(J,"input")&&J.parentNode){throw"type property can't be changed"}J[G]=K}if(o.nodeName(J,"form")&&J.getAttributeNode(G)){return J.getAttributeNode(G).nodeValue}if(G=="tabIndex"){var I=J.getAttributeNode("tabIndex");return I&&I.specified?I.value:J.nodeName.match(/(button|input|object|select|textarea)/i)?0:J.nodeName.match(/^(a|area)$/i)&&J.href?0:g}return J[G]}if(!o.support.style&&H&&G=="style"){return o.attr(J.style,"cssText",K)}if(L){J.setAttribute(G,""+K)}var E=!o.support.hrefNormalized&&H&&F?J.getAttribute(G,2):J.getAttribute(G);return E===null?g:E}if(!o.support.opacity&&G=="opacity"){if(L){J.zoom=1;J.filter=(J.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(K)+""=="NaN"?"":"alpha(opacity="+K*100+")")}return J.filter&&J.filter.indexOf("opacity=")>=0?(parseFloat(J.filter.match(/opacity=([^)]*)/)[1])/100)+"":""}G=G.replace(/-([a-z])/ig,function(M,N){return N.toUpperCase()});if(L){J[G]=K}return J[G]},trim:function(E){return(E||"").replace(/^\s+|\s+$/g,"")},makeArray:function(G){var E=[];if(G!=null){var F=G.length;if(F==null||typeof G==="string"||o.isFunction(G)||G.setInterval){E[0]=G}else{while(F){E[--F]=G[F]}}}return E},inArray:function(G,H){for(var E=0,F=H.length;E<F;E++){if(H[E]===G){return E}}return -1},merge:function(H,E){var F=0,G,I=H.length;if(!o.support.getAll){while((G=E[F++])!=null){if(G.nodeType!=8){H[I++]=G}}}else{while((G=E[F++])!=null){H[I++]=G}}return H},unique:function(K){var F=[],E={};try{for(var G=0,H=K.length;G<H;G++){var J=o.data(K[G]);if(!E[J]){E[J]=true;F.push(K[G])}}}catch(I){F=K}return F},grep:function(F,J,E){var G=[];for(var H=0,I=F.length;H<I;H++){if(!E!=!J(F[H],H)){G.push(F[H])}}return G},map:function(E,J){var F=[];for(var G=0,H=E.length;G<H;G++){var I=J(E[G],G);if(I!=null){F[F.length]=I}}return F.concat.apply([],F)}});var C=navigator.userAgent.toLowerCase();o.browser={version:(C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(C),opera:/opera/.test(C),msie:/msie/.test(C)&&!/opera/.test(C),mozilla:/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)};o.each({parent:function(E){return E.parentNode},parents:function(E){return o.dir(E,"parentNode")},next:function(E){return o.nth(E,2,"nextSibling")},prev:function(E){return o.nth(E,2,"previousSibling")},nextAll:function(E){return o.dir(E,"nextSibling")},prevAll:function(E){return o.dir(E,"previousSibling")},siblings:function(E){return o.sibling(E.parentNode.firstChild,E)},children:function(E){return o.sibling(E.firstChild)},contents:function(E){return o.nodeName(E,"iframe")?E.contentDocument||E.contentWindow.document:o.makeArray(E.childNodes)}},function(E,F){o.fn[E]=function(G){var H=o.map(this,F);if(G&&typeof G=="string"){H=o.multiFilter(G,H)}return this.pushStack(o.unique(H),E,G)}});o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(E,F){o.fn[E]=function(G){var J=[],L=o(G);for(var K=0,H=L.length;K<H;K++){var I=(K>0?this.clone(true):this).get();o.fn[F].apply(o(L[K]),I);J=J.concat(I)}return this.pushStack(J,E,G)}});o.each({removeAttr:function(E){o.attr(this,E,"");if(this.nodeType==1){this.removeAttribute(E)}},addClass:function(E){o.className.add(this,E)},removeClass:function(E){o.className.remove(this,E)},toggleClass:function(F,E){if(typeof E!=="boolean"){E=!o.className.has(this,F)}o.className[E?"add":"remove"](this,F)},remove:function(E){if(!E||o.filter(E,[this]).length){o("*",this).add([this]).each(function(){o.event.remove(this);o.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){o(this).children().remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(E,F){o.fn[E]=function(){return this.each(F,arguments)}});function j(E,F){return E[0]&&parseInt(o.curCSS(E[0],F,true),10)||0}var h="jQuery"+e(),v=0,A={};o.extend({cache:{},data:function(F,E,G){F=F==l?A:F;var H=F[h];if(!H){H=F[h]=++v}if(E&&!o.cache[H]){o.cache[H]={}}if(G!==g){o.cache[H][E]=G}return E?o.cache[H][E]:H},removeData:function(F,E){F=F==l?A:F;var H=F[h];if(E){if(o.cache[H]){delete o.cache[H][E];E="";for(E in o.cache[H]){break}if(!E){o.removeData(F)}}}else{try{delete F[h]}catch(G){if(F.removeAttribute){F.removeAttribute(h)}}delete o.cache[H]}},queue:function(F,E,H){if(F){E=(E||"fx")+"queue";var G=o.data(F,E);if(!G||o.isArray(H)){G=o.data(F,E,o.makeArray(H))}else{if(H){G.push(H)}}}return G},dequeue:function(H,G){var E=o.queue(H,G),F=E.shift();if(!G||G==="fx"){F=E[0]}if(F!==g){F.call(H)}}});o.fn.extend({data:function(E,G){var H=E.split(".");H[1]=H[1]?"."+H[1]:"";if(G===g){var F=this.triggerHandler("getData"+H[1]+"!",[H[0]]);if(F===g&&this.length){F=o.data(this[0],E)}return F===g&&H[1]?this.data(H[0]):F}else{return this.trigger("setData"+H[1]+"!",[H[0],G]).each(function(){o.data(this,E,G)})}},removeData:function(E){return this.each(function(){o.removeData(this,E)})},queue:function(E,F){if(typeof E!=="string"){F=E;E="fx"}if(F===g){return o.queue(this[0],E)}return this.each(function(){var G=o.queue(this,E,F);if(E=="fx"&&G.length==1){G[0].call(this)}})},dequeue:function(E){return this.each(function(){o.dequeue(this,E)})}});
/*
 * Sizzle CSS Selector Engine - v0.9.3
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){var R=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,L=0,H=Object.prototype.toString;var F=function(Y,U,ab,ac){ab=ab||[];U=U||document;if(U.nodeType!==1&&U.nodeType!==9){return[]}if(!Y||typeof Y!=="string"){return ab}var Z=[],W,af,ai,T,ad,V,X=true;R.lastIndex=0;while((W=R.exec(Y))!==null){Z.push(W[1]);if(W[2]){V=RegExp.rightContext;break}}if(Z.length>1&&M.exec(Y)){if(Z.length===2&&I.relative[Z[0]]){af=J(Z[0]+Z[1],U)}else{af=I.relative[Z[0]]?[U]:F(Z.shift(),U);while(Z.length){Y=Z.shift();if(I.relative[Y]){Y+=Z.shift()}af=J(Y,af)}}}else{var ae=ac?{expr:Z.pop(),set:E(ac)}:F.find(Z.pop(),Z.length===1&&U.parentNode?U.parentNode:U,Q(U));af=F.filter(ae.expr,ae.set);if(Z.length>0){ai=E(af)}else{X=false}while(Z.length){var ah=Z.pop(),ag=ah;if(!I.relative[ah]){ah=""}else{ag=Z.pop()}if(ag==null){ag=U}I.relative[ah](ai,ag,Q(U))}}if(!ai){ai=af}if(!ai){throw"Syntax error, unrecognized expression: "+(ah||Y)}if(H.call(ai)==="[object Array]"){if(!X){ab.push.apply(ab,ai)}else{if(U.nodeType===1){for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&(ai[aa]===true||ai[aa].nodeType===1&&K(U,ai[aa]))){ab.push(af[aa])}}}else{for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&ai[aa].nodeType===1){ab.push(af[aa])}}}}}else{E(ai,ab)}if(V){F(V,U,ab,ac);if(G){hasDuplicate=false;ab.sort(G);if(hasDuplicate){for(var aa=1;aa<ab.length;aa++){if(ab[aa]===ab[aa-1]){ab.splice(aa--,1)}}}}}return ab};F.matches=function(T,U){return F(T,null,null,U)};F.find=function(aa,T,ab){var Z,X;if(!aa){return[]}for(var W=0,V=I.order.length;W<V;W++){var Y=I.order[W],X;if((X=I.match[Y].exec(aa))){var U=RegExp.leftContext;if(U.substr(U.length-1)!=="\\"){X[1]=(X[1]||"").replace(/\\/g,"");Z=I.find[Y](X,T,ab);if(Z!=null){aa=aa.replace(I.match[Y],"");break}}}}if(!Z){Z=T.getElementsByTagName("*")}return{set:Z,expr:aa}};F.filter=function(ad,ac,ag,W){var V=ad,ai=[],aa=ac,Y,T,Z=ac&&ac[0]&&Q(ac[0]);while(ad&&ac.length){for(var ab in I.filter){if((Y=I.match[ab].exec(ad))!=null){var U=I.filter[ab],ah,af;T=false;if(aa==ai){ai=[]}if(I.preFilter[ab]){Y=I.preFilter[ab](Y,aa,ag,ai,W,Z);if(!Y){T=ah=true}else{if(Y===true){continue}}}if(Y){for(var X=0;(af=aa[X])!=null;X++){if(af){ah=U(af,Y,X,aa);var ae=W^!!ah;if(ag&&ah!=null){if(ae){T=true}else{aa[X]=false}}else{if(ae){ai.push(af);T=true}}}}}if(ah!==g){if(!ag){aa=ai}ad=ad.replace(I.match[ab],"");if(!T){return[]}break}}}if(ad==V){if(T==null){throw"Syntax error, unrecognized expression: "+ad}else{break}}V=ad}return aa};var I=F.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(T){return T.getAttribute("href")}},relative:{"+":function(aa,T,Z){var X=typeof T==="string",ab=X&&!/\W/.test(T),Y=X&&!ab;if(ab&&!Z){T=T.toUpperCase()}for(var W=0,V=aa.length,U;W<V;W++){if((U=aa[W])){while((U=U.previousSibling)&&U.nodeType!==1){}aa[W]=Y||U&&U.nodeName===T?U||false:U===T}}if(Y){F.filter(T,aa,true)}},">":function(Z,U,aa){var X=typeof U==="string";if(X&&!/\W/.test(U)){U=aa?U:U.toUpperCase();for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){var W=Y.parentNode;Z[V]=W.nodeName===U?W:false}}}else{for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){Z[V]=X?Y.parentNode:Y.parentNode===U}}if(X){F.filter(U,Z,true)}}},"":function(W,U,Y){var V=L++,T=S;if(!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("parentNode",U,V,W,X,Y)},"~":function(W,U,Y){var V=L++,T=S;if(typeof U==="string"&&!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("previousSibling",U,V,W,X,Y)}},find:{ID:function(U,V,W){if(typeof V.getElementById!=="undefined"&&!W){var T=V.getElementById(U[1]);return T?[T]:[]}},NAME:function(V,Y,Z){if(typeof Y.getElementsByName!=="undefined"){var U=[],X=Y.getElementsByName(V[1]);for(var W=0,T=X.length;W<T;W++){if(X[W].getAttribute("name")===V[1]){U.push(X[W])}}return U.length===0?null:U}},TAG:function(T,U){return U.getElementsByTagName(T[1])}},preFilter:{CLASS:function(W,U,V,T,Z,aa){W=" "+W[1].replace(/\\/g,"")+" ";if(aa){return W}for(var X=0,Y;(Y=U[X])!=null;X++){if(Y){if(Z^(Y.className&&(" "+Y.className+" ").indexOf(W)>=0)){if(!V){T.push(Y)}}else{if(V){U[X]=false}}}}return false},ID:function(T){return T[1].replace(/\\/g,"")},TAG:function(U,T){for(var V=0;T[V]===false;V++){}return T[V]&&Q(T[V])?U[1]:U[1].toUpperCase()},CHILD:function(T){if(T[1]=="nth"){var U=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2]=="even"&&"2n"||T[2]=="odd"&&"2n+1"||!/\D/.test(T[2])&&"0n+"+T[2]||T[2]);T[2]=(U[1]+(U[2]||1))-0;T[3]=U[3]-0}T[0]=L++;return T},ATTR:function(X,U,V,T,Y,Z){var W=X[1].replace(/\\/g,"");if(!Z&&I.attrMap[W]){X[1]=I.attrMap[W]}if(X[2]==="~="){X[4]=" "+X[4]+" "}return X},PSEUDO:function(X,U,V,T,Y){if(X[1]==="not"){if(X[3].match(R).length>1||/^\w/.test(X[3])){X[3]=F(X[3],null,null,U)}else{var W=F.filter(X[3],U,V,true^Y);if(!V){T.push.apply(T,W)}return false}}else{if(I.match.POS.test(X[0])||I.match.CHILD.test(X[0])){return true}}return X},POS:function(T){T.unshift(true);return T}},filters:{enabled:function(T){return T.disabled===false&&T.type!=="hidden"},disabled:function(T){return T.disabled===true},checked:function(T){return T.checked===true},selected:function(T){T.parentNode.selectedIndex;return T.selected===true},parent:function(T){return !!T.firstChild},empty:function(T){return !T.firstChild},has:function(V,U,T){return !!F(T[3],V).length},header:function(T){return/h\d/i.test(T.nodeName)},text:function(T){return"text"===T.type},radio:function(T){return"radio"===T.type},checkbox:function(T){return"checkbox"===T.type},file:function(T){return"file"===T.type},password:function(T){return"password"===T.type},submit:function(T){return"submit"===T.type},image:function(T){return"image"===T.type},reset:function(T){return"reset"===T.type},button:function(T){return"button"===T.type||T.nodeName.toUpperCase()==="BUTTON"},input:function(T){return/input|select|textarea|button/i.test(T.nodeName)}},setFilters:{first:function(U,T){return T===0},last:function(V,U,T,W){return U===W.length-1},even:function(U,T){return T%2===0},odd:function(U,T){return T%2===1},lt:function(V,U,T){return U<T[3]-0},gt:function(V,U,T){return U>T[3]-0},nth:function(V,U,T){return T[3]-0==U},eq:function(V,U,T){return T[3]-0==U}},filter:{PSEUDO:function(Z,V,W,aa){var U=V[1],X=I.filters[U];if(X){return X(Z,W,V,aa)}else{if(U==="contains"){return(Z.textContent||Z.innerText||"").indexOf(V[3])>=0}else{if(U==="not"){var Y=V[3];for(var W=0,T=Y.length;W<T;W++){if(Y[W]===Z){return false}}return true}}}},CHILD:function(T,W){var Z=W[1],U=T;switch(Z){case"only":case"first":while(U=U.previousSibling){if(U.nodeType===1){return false}}if(Z=="first"){return true}U=T;case"last":while(U=U.nextSibling){if(U.nodeType===1){return false}}return true;case"nth":var V=W[2],ac=W[3];if(V==1&&ac==0){return true}var Y=W[0],ab=T.parentNode;if(ab&&(ab.sizcache!==Y||!T.nodeIndex)){var X=0;for(U=ab.firstChild;U;U=U.nextSibling){if(U.nodeType===1){U.nodeIndex=++X}}ab.sizcache=Y}var aa=T.nodeIndex-ac;if(V==0){return aa==0}else{return(aa%V==0&&aa/V>=0)}}},ID:function(U,T){return U.nodeType===1&&U.getAttribute("id")===T},TAG:function(U,T){return(T==="*"&&U.nodeType===1)||U.nodeName===T},CLASS:function(U,T){return(" "+(U.className||U.getAttribute("class"))+" ").indexOf(T)>-1},ATTR:function(Y,W){var V=W[1],T=I.attrHandle[V]?I.attrHandle[V](Y):Y[V]!=null?Y[V]:Y.getAttribute(V),Z=T+"",X=W[2],U=W[4];return T==null?X==="!=":X==="="?Z===U:X==="*="?Z.indexOf(U)>=0:X==="~="?(" "+Z+" ").indexOf(U)>=0:!U?Z&&T!==false:X==="!="?Z!=U:X==="^="?Z.indexOf(U)===0:X==="$="?Z.substr(Z.length-U.length)===U:X==="|="?Z===U||Z.substr(0,U.length+1)===U+"-":false},POS:function(X,U,V,Y){var T=U[2],W=I.setFilters[T];if(W){return W(X,V,U,Y)}}}};var M=I.match.POS;for(var O in I.match){I.match[O]=RegExp(I.match[O].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var E=function(U,T){U=Array.prototype.slice.call(U);if(T){T.push.apply(T,U);return T}return U};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(N){E=function(X,W){var U=W||[];if(H.call(X)==="[object Array]"){Array.prototype.push.apply(U,X)}else{if(typeof X.length==="number"){for(var V=0,T=X.length;V<T;V++){U.push(X[V])}}else{for(var V=0;X[V];V++){U.push(X[V])}}}return U}}var G;if(document.documentElement.compareDocumentPosition){G=function(U,T){var V=U.compareDocumentPosition(T)&4?-1:U===T?0:1;if(V===0){hasDuplicate=true}return V}}else{if("sourceIndex" in document.documentElement){G=function(U,T){var V=U.sourceIndex-T.sourceIndex;if(V===0){hasDuplicate=true}return V}}else{if(document.createRange){G=function(W,U){var V=W.ownerDocument.createRange(),T=U.ownerDocument.createRange();V.selectNode(W);V.collapse(true);T.selectNode(U);T.collapse(true);var X=V.compareBoundaryPoints(Range.START_TO_END,T);if(X===0){hasDuplicate=true}return X}}}}(function(){var U=document.createElement("form"),V="script"+(new Date).getTime();U.innerHTML="<input name='"+V+"'/>";var T=document.documentElement;T.insertBefore(U,T.firstChild);if(!!document.getElementById(V)){I.find.ID=function(X,Y,Z){if(typeof Y.getElementById!=="undefined"&&!Z){var W=Y.getElementById(X[1]);return W?W.id===X[1]||typeof W.getAttributeNode!=="undefined"&&W.getAttributeNode("id").nodeValue===X[1]?[W]:g:[]}};I.filter.ID=function(Y,W){var X=typeof Y.getAttributeNode!=="undefined"&&Y.getAttributeNode("id");return Y.nodeType===1&&X&&X.nodeValue===W}}T.removeChild(U)})();(function(){var T=document.createElement("div");T.appendChild(document.createComment(""));if(T.getElementsByTagName("*").length>0){I.find.TAG=function(U,Y){var X=Y.getElementsByTagName(U[1]);if(U[1]==="*"){var W=[];for(var V=0;X[V];V++){if(X[V].nodeType===1){W.push(X[V])}}X=W}return X}}T.innerHTML="<a href='#'></a>";if(T.firstChild&&typeof T.firstChild.getAttribute!=="undefined"&&T.firstChild.getAttribute("href")!=="#"){I.attrHandle.href=function(U){return U.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var T=F,U=document.createElement("div");U.innerHTML="<p class='TEST'></p>";if(U.querySelectorAll&&U.querySelectorAll(".TEST").length===0){return}F=function(Y,X,V,W){X=X||document;if(!W&&X.nodeType===9&&!Q(X)){try{return E(X.querySelectorAll(Y),V)}catch(Z){}}return T(Y,X,V,W)};F.find=T.find;F.filter=T.filter;F.selectors=T.selectors;F.matches=T.matches})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var T=document.createElement("div");T.innerHTML="<div class='test e'></div><div class='test'></div>";if(T.getElementsByClassName("e").length===0){return}T.lastChild.className="e";if(T.getElementsByClassName("e").length===1){return}I.order.splice(1,0,"CLASS");I.find.CLASS=function(U,V,W){if(typeof V.getElementsByClassName!=="undefined"&&!W){return V.getElementsByClassName(U[1])}}})()}function P(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1&&!ac){T.sizcache=Y;T.sizset=W}if(T.nodeName===Z){X=T;break}T=T[U]}ad[W]=X}}}function S(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1){if(!ac){T.sizcache=Y;T.sizset=W}if(typeof Z!=="string"){if(T===Z){X=true;break}}else{if(F.filter(Z,[T]).length>0){X=T;break}}}T=T[U]}ad[W]=X}}}var K=document.compareDocumentPosition?function(U,T){return U.compareDocumentPosition(T)&16}:function(U,T){return U!==T&&(U.contains?U.contains(T):true)};var Q=function(T){return T.nodeType===9&&T.documentElement.nodeName!=="HTML"||!!T.ownerDocument&&Q(T.ownerDocument)};var J=function(T,aa){var W=[],X="",Y,V=aa.nodeType?[aa]:aa;while((Y=I.match.PSEUDO.exec(T))){X+=Y[0];T=T.replace(I.match.PSEUDO,"")}T=I.relative[T]?T+"*":T;for(var Z=0,U=V.length;Z<U;Z++){F(T,V[Z],W)}return F.filter(X,W)};o.find=F;o.filter=F.filter;o.expr=F.selectors;o.expr[":"]=o.expr.filters;F.selectors.filters.hidden=function(T){return T.offsetWidth===0||T.offsetHeight===0};F.selectors.filters.visible=function(T){return T.offsetWidth>0||T.offsetHeight>0};F.selectors.filters.animated=function(T){return o.grep(o.timers,function(U){return T===U.elem}).length};o.multiFilter=function(V,T,U){if(U){V=":not("+V+")"}return F.matches(V,T)};o.dir=function(V,U){var T=[],W=V[U];while(W&&W!=document){if(W.nodeType==1){T.push(W)}W=W[U]}return T};o.nth=function(X,T,V,W){T=T||1;var U=0;for(;X;X=X[V]){if(X.nodeType==1&&++U==T){break}}return X};o.sibling=function(V,U){var T=[];for(;V;V=V.nextSibling){if(V.nodeType==1&&V!=U){T.push(V)}}return T};return;l.Sizzle=F})();o.event={add:function(I,F,H,K){if(I.nodeType==3||I.nodeType==8){return}if(I.setInterval&&I!=l){I=l}if(!H.guid){H.guid=this.guid++}if(K!==g){var G=H;H=this.proxy(G);H.data=K}var E=o.data(I,"events")||o.data(I,"events",{}),J=o.data(I,"handle")||o.data(I,"handle",function(){return typeof o!=="undefined"&&!o.event.triggered?o.event.handle.apply(arguments.callee.elem,arguments):g});J.elem=I;o.each(F.split(/\s+/),function(M,N){var O=N.split(".");N=O.shift();H.type=O.slice().sort().join(".");var L=E[N];if(o.event.specialAll[N]){o.event.specialAll[N].setup.call(I,K,O)}if(!L){L=E[N]={};if(!o.event.special[N]||o.event.special[N].setup.call(I,K,O)===false){if(I.addEventListener){I.addEventListener(N,J,false)}else{if(I.attachEvent){I.attachEvent("on"+N,J)}}}}L[H.guid]=H;o.event.global[N]=true});I=null},guid:1,global:{},remove:function(K,H,J){if(K.nodeType==3||K.nodeType==8){return}var G=o.data(K,"events"),F,E;if(G){if(H===g||(typeof H==="string"&&H.charAt(0)==".")){for(var I in G){this.remove(K,I+(H||""))}}else{if(H.type){J=H.handler;H=H.type}o.each(H.split(/\s+/),function(M,O){var Q=O.split(".");O=Q.shift();var N=RegExp("(^|\\.)"+Q.slice().sort().join(".*\\.")+"(\\.|$)");if(G[O]){if(J){delete G[O][J.guid]}else{for(var P in G[O]){if(N.test(G[O][P].type)){delete G[O][P]}}}if(o.event.specialAll[O]){o.event.specialAll[O].teardown.call(K,Q)}for(F in G[O]){break}if(!F){if(!o.event.special[O]||o.event.special[O].teardown.call(K,Q)===false){if(K.removeEventListener){K.removeEventListener(O,o.data(K,"handle"),false)}else{if(K.detachEvent){K.detachEvent("on"+O,o.data(K,"handle"))}}}F=null;delete G[O]}}})}for(F in G){break}if(!F){var L=o.data(K,"handle");if(L){L.elem=null}o.removeData(K,"events");o.removeData(K,"handle")}}},trigger:function(I,K,H,E){var G=I.type||I;if(!E){I=typeof I==="object"?I[h]?I:o.extend(o.Event(G),I):o.Event(G);if(G.indexOf("!")>=0){I.type=G=G.slice(0,-1);I.exclusive=true}if(!H){I.stopPropagation();if(this.global[G]){o.each(o.cache,function(){if(this.events&&this.events[G]){o.event.trigger(I,K,this.handle.elem)}})}}if(!H||H.nodeType==3||H.nodeType==8){return g}I.result=g;I.target=H;K=o.makeArray(K);K.unshift(I)}I.currentTarget=H;var J=o.data(H,"handle");if(J){J.apply(H,K)}if((!H[G]||(o.nodeName(H,"a")&&G=="click"))&&H["on"+G]&&H["on"+G].apply(H,K)===false){I.result=false}if(!E&&H[G]&&!I.isDefaultPrevented()&&!(o.nodeName(H,"a")&&G=="click")){this.triggered=true;try{H[G]()}catch(L){}}this.triggered=false;if(!I.isPropagationStopped()){var F=H.parentNode||H.ownerDocument;if(F){o.event.trigger(I,K,F,true)}}},handle:function(K){var J,E;K=arguments[0]=o.event.fix(K||l.event);K.currentTarget=this;var L=K.type.split(".");K.type=L.shift();J=!L.length&&!K.exclusive;var I=RegExp("(^|\\.)"+L.slice().sort().join(".*\\.")+"(\\.|$)");E=(o.data(this,"events")||{})[K.type];for(var G in E){var H=E[G];if(J||I.test(H.type)){K.handler=H;K.data=H.data;var F=H.apply(this,arguments);if(F!==g){K.result=F;if(F===false){K.preventDefault();K.stopPropagation()}}if(K.isImmediatePropagationStopped()){break}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(H){if(H[h]){return H}var F=H;H=o.Event(F);for(var G=this.props.length,J;G;){J=this.props[--G];H[J]=F[J]}if(!H.target){H.target=H.srcElement||document}if(H.target.nodeType==3){H.target=H.target.parentNode}if(!H.relatedTarget&&H.fromElement){H.relatedTarget=H.fromElement==H.target?H.toElement:H.fromElement}if(H.pageX==null&&H.clientX!=null){var I=document.documentElement,E=document.body;H.pageX=H.clientX+(I&&I.scrollLeft||E&&E.scrollLeft||0)-(I.clientLeft||0);H.pageY=H.clientY+(I&&I.scrollTop||E&&E.scrollTop||0)-(I.clientTop||0)}if(!H.which&&((H.charCode||H.charCode===0)?H.charCode:H.keyCode)){H.which=H.charCode||H.keyCode}if(!H.metaKey&&H.ctrlKey){H.metaKey=H.ctrlKey}if(!H.which&&H.button){H.which=(H.button&1?1:(H.button&2?3:(H.button&4?2:0)))}return H},proxy:function(F,E){E=E||function(){return F.apply(this,arguments)};E.guid=F.guid=F.guid||E.guid||this.guid++;return E},special:{ready:{setup:B,teardown:function(){}}},specialAll:{live:{setup:function(E,F){o.event.add(this,F[0],c)},teardown:function(G){if(G.length){var E=0,F=RegExp("(^|\\.)"+G[0]+"(\\.|$)");o.each((o.data(this,"events").live||{}),function(){if(F.test(this.type)){E++}});if(E<1){o.event.remove(this,G[0],c)}}}}}};o.Event=function(E){if(!this.preventDefault){return new o.Event(E)}if(E&&E.type){this.originalEvent=E;this.type=E.type}else{this.type=E}this.timeStamp=e();this[h]=true};function k(){return false}function u(){return true}o.Event.prototype={preventDefault:function(){this.isDefaultPrevented=u;var E=this.originalEvent;if(!E){return}if(E.preventDefault){E.preventDefault()}E.returnValue=false},stopPropagation:function(){this.isPropagationStopped=u;var E=this.originalEvent;if(!E){return}if(E.stopPropagation){E.stopPropagation()}E.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u;this.stopPropagation()},isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k};var a=function(F){var E=F.relatedTarget;while(E&&E!=this){try{E=E.parentNode}catch(G){E=this}}if(E!=this){F.type=F.data;o.event.handle.apply(this,arguments)}};o.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(F,E){o.event.special[E]={setup:function(){o.event.add(this,F,a,E)},teardown:function(){o.event.remove(this,F,a)}}});o.fn.extend({bind:function(F,G,E){return F=="unload"?this.one(F,G,E):this.each(function(){o.event.add(this,F,E||G,E&&G)})},one:function(G,H,F){var E=o.event.proxy(F||H,function(I){o(this).unbind(I,E);return(F||H).apply(this,arguments)});return this.each(function(){o.event.add(this,G,E,F&&H)})},unbind:function(F,E){return this.each(function(){o.event.remove(this,F,E)})},trigger:function(E,F){return this.each(function(){o.event.trigger(E,F,this)})},triggerHandler:function(E,G){if(this[0]){var F=o.Event(E);F.preventDefault();F.stopPropagation();o.event.trigger(F,G,this[0]);return F.result}},toggle:function(G){var E=arguments,F=1;while(F<E.length){o.event.proxy(G,E[F++])}return this.click(o.event.proxy(G,function(H){this.lastToggle=(this.lastToggle||0)%F;H.preventDefault();return E[this.lastToggle++].apply(this,arguments)||false}))},hover:function(E,F){return this.mouseenter(E).mouseleave(F)},ready:function(E){B();if(o.isReady){E.call(document,o)}else{o.readyList.push(E)}return this},live:function(G,F){var E=o.event.proxy(F);E.guid+=this.selector+G;o(document).bind(i(G,this.selector),this.selector,E);return this},die:function(F,E){o(document).unbind(i(F,this.selector),E?{guid:E.guid+this.selector+F}:null);return this}});function c(H){var E=RegExp("(^|\\.)"+H.type+"(\\.|$)"),G=true,F=[];o.each(o.data(this,"events").live||[],function(I,J){if(E.test(J.type)){var K=o(H.target).closest(J.data)[0];if(K){F.push({elem:K,fn:J})}}});F.sort(function(J,I){return o.data(J.elem,"closest")-o.data(I.elem,"closest")});o.each(F,function(){if(this.fn.call(this.elem,H,this.fn.data)===false){return(G=false)}});return G}function i(F,E){return["live",F,E.replace(/\./g,"`").replace(/ /g,"|")].join(".")}o.extend({isReady:false,readyList:[],ready:function(){if(!o.isReady){o.isReady=true;if(o.readyList){o.each(o.readyList,function(){this.call(document,o)});o.readyList=null}o(document).triggerHandler("ready")}}});var x=false;function B(){if(x){return}x=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);o.ready()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);o.ready()}});if(document.documentElement.doScroll&&l==l.top){(function(){if(o.isReady){return}try{document.documentElement.doScroll("left")}catch(E){setTimeout(arguments.callee,0);return}o.ready()})()}}}o.event.add(l,"load",o.ready)}o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(F,E){o.fn[E]=function(G){return G?this.bind(E,G):this.trigger(E)}});o(l).bind("unload",function(){for(var E in o.cache){if(E!=1&&o.cache[E].handle){o.event.remove(o.cache[E].handle.elem)}}});(function(){o.support={};var F=document.documentElement,G=document.createElement("script"),K=document.createElement("div"),J="script"+(new Date).getTime();K.style.display="none";K.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';var H=K.getElementsByTagName("*"),E=K.getElementsByTagName("a")[0];if(!H||!H.length||!E){return}o.support={leadingWhitespace:K.firstChild.nodeType==3,tbody:!K.getElementsByTagName("tbody").length,objectAll:!!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!K.getElementsByTagName("link").length,style:/red/.test(E.getAttribute("style")),hrefNormalized:E.getAttribute("href")==="/a",opacity:E.style.opacity==="0.5",cssFloat:!!E.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};G.type="text/javascript";try{G.appendChild(document.createTextNode("window."+J+"=1;"))}catch(I){}F.insertBefore(G,F.firstChild);if(l[J]){o.support.scriptEval=true;delete l[J]}F.removeChild(G);if(K.attachEvent&&K.fireEvent){K.attachEvent("onclick",function(){o.support.noCloneEvent=false;K.detachEvent("onclick",arguments.callee)});K.cloneNode(true).fireEvent("onclick")}o(function(){var L=document.createElement("div");L.style.width=L.style.paddingLeft="1px";document.body.appendChild(L);o.boxModel=o.support.boxModel=L.offsetWidth===2;document.body.removeChild(L).style.display="none"})})();var w=o.support.cssFloat?"cssFloat":"styleFloat";o.props={"for":"htmlFor","class":"className","float":w,cssFloat:w,styleFloat:w,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};o.fn.extend({_load:o.fn.load,load:function(G,J,K){if(typeof G!=="string"){return this._load(G)}var I=G.indexOf(" ");if(I>=0){var E=G.slice(I,G.length);G=G.slice(0,I)}var H="GET";if(J){if(o.isFunction(J)){K=J;J=null}else{if(typeof J==="object"){J=o.param(J);H="POST"}}}var F=this;o.ajax({url:G,type:H,dataType:"html",data:J,complete:function(M,L){if(L=="success"||L=="notmodified"){F.html(E?o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(E):M.responseText)}if(K){F.each(K,[M.responseText,L,M])}}});return this},serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?o.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))}).map(function(E,F){var G=o(this).val();return G==null?null:o.isArray(G)?o.map(G,function(I,H){return{name:F.name,value:I}}):{name:F.name,value:G}}).get()}});o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(E,F){o.fn[F]=function(G){return this.bind(F,G)}});var r=e();o.extend({get:function(E,G,H,F){if(o.isFunction(G)){H=G;G=null}return o.ajax({type:"GET",url:E,data:G,success:H,dataType:F})},getScript:function(E,F){return o.get(E,null,F,"script")},getJSON:function(E,F,G){return o.get(E,F,G,"json")},post:function(E,G,H,F){if(o.isFunction(G)){H=G;G={}}return o.ajax({type:"POST",url:E,data:G,success:H,dataType:F})},ajaxSetup:function(E){o.extend(o.ajaxSettings,E)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return l.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(M){M=o.extend(true,M,o.extend(true,{},o.ajaxSettings,M));var W,F=/=\?(&|$)/g,R,V,G=M.type.toUpperCase();if(M.data&&M.processData&&typeof M.data!=="string"){M.data=o.param(M.data)}if(M.dataType=="jsonp"){if(G=="GET"){if(!M.url.match(F)){M.url+=(M.url.match(/\?/)?"&":"?")+(M.jsonp||"callback")+"=?"}}else{if(!M.data||!M.data.match(F)){M.data=(M.data?M.data+"&":"")+(M.jsonp||"callback")+"=?"}}M.dataType="json"}if(M.dataType=="json"&&(M.data&&M.data.match(F)||M.url.match(F))){W="jsonp"+r++;if(M.data){M.data=(M.data+"").replace(F,"="+W+"$1")}M.url=M.url.replace(F,"="+W+"$1");M.dataType="script";l[W]=function(X){V=X;I();L();l[W]=g;try{delete l[W]}catch(Y){}if(H){H.removeChild(T)}}}if(M.dataType=="script"&&M.cache==null){M.cache=false}if(M.cache===false&&G=="GET"){var E=e();var U=M.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+E+"$2");M.url=U+((U==M.url)?(M.url.match(/\?/)?"&":"?")+"_="+E:"")}if(M.data&&G=="GET"){M.url+=(M.url.match(/\?/)?"&":"?")+M.data;M.data=null}if(M.global&&!o.active++){o.event.trigger("ajaxStart")}var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);if(M.dataType=="script"&&G=="GET"&&Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)){var H=document.getElementsByTagName("head")[0];var T=document.createElement("script");T.src=M.url;if(M.scriptCharset){T.charset=M.scriptCharset}if(!W){var O=false;T.onload=T.onreadystatechange=function(){if(!O&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){O=true;I();L();T.onload=T.onreadystatechange=null;H.removeChild(T)}}}H.appendChild(T);return g}var K=false;var J=M.xhr();if(M.username){J.open(G,M.url,M.async,M.username,M.password)}else{J.open(G,M.url,M.async)}try{if(M.data){J.setRequestHeader("Content-Type",M.contentType)}if(M.ifModified){J.setRequestHeader("If-Modified-Since",o.lastModified[M.url]||"Thu, 01 Jan 1970 00:00:00 GMT")}J.setRequestHeader("X-Requested-With","XMLHttpRequest");J.setRequestHeader("Accept",M.dataType&&M.accepts[M.dataType]?M.accepts[M.dataType]+", */*":M.accepts._default)}catch(S){}if(M.beforeSend&&M.beforeSend(J,M)===false){if(M.global&&!--o.active){o.event.trigger("ajaxStop")}J.abort();return false}if(M.global){o.event.trigger("ajaxSend",[J,M])}var N=function(X){if(J.readyState==0){if(P){clearInterval(P);P=null;if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}}else{if(!K&&J&&(J.readyState==4||X=="timeout")){K=true;if(P){clearInterval(P);P=null}R=X=="timeout"?"timeout":!o.httpSuccess(J)?"error":M.ifModified&&o.httpNotModified(J,M.url)?"notmodified":"success";if(R=="success"){try{V=o.httpData(J,M.dataType,M)}catch(Z){R="parsererror"}}if(R=="success"){var Y;try{Y=J.getResponseHeader("Last-Modified")}catch(Z){}if(M.ifModified&&Y){o.lastModified[M.url]=Y}if(!W){I()}}else{o.handleError(M,J,R)}L();if(X){J.abort()}if(M.async){J=null}}}};if(M.async){var P=setInterval(N,13);if(M.timeout>0){setTimeout(function(){if(J&&!K){N("timeout")}},M.timeout)}}try{J.send(M.data)}catch(S){o.handleError(M,J,null,S)}if(!M.async){N()}function I(){if(M.success){M.success(V,R)}if(M.global){o.event.trigger("ajaxSuccess",[J,M])}}function L(){if(M.complete){M.complete(J,R)}if(M.global){o.event.trigger("ajaxComplete",[J,M])}if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}return J},handleError:function(F,H,E,G){if(F.error){F.error(H,E,G)}if(F.global){o.event.trigger("ajaxError",[H,F,G])}},active:0,httpSuccess:function(F){try{return !F.status&&location.protocol=="file:"||(F.status>=200&&F.status<300)||F.status==304||F.status==1223}catch(E){}return false},httpNotModified:function(G,E){try{var H=G.getResponseHeader("Last-Modified");return G.status==304||H==o.lastModified[E]}catch(F){}return false},httpData:function(J,H,G){var F=J.getResponseHeader("content-type"),E=H=="xml"||!H&&F&&F.indexOf("xml")>=0,I=E?J.responseXML:J.responseText;if(E&&I.documentElement.tagName=="parsererror"){throw"parsererror"}if(G&&G.dataFilter){I=G.dataFilter(I,H)}if(typeof I==="string"){if(H=="script"){o.globalEval(I)}if(H=="json"){I=l["eval"]("("+I+")")}}return I},param:function(E){var G=[];function H(I,J){G[G.length]=encodeURIComponent(I)+"="+encodeURIComponent(J)}if(o.isArray(E)||E.jquery){o.each(E,function(){H(this.name,this.value)})}else{for(var F in E){if(o.isArray(E[F])){o.each(E[F],function(){H(F,this)})}else{H(F,o.isFunction(E[F])?E[F]():E[F])}}}return G.join("&").replace(/%20/g,"+")}});var m={},n,d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];function t(F,E){var G={};o.each(d.concat.apply([],d.slice(0,E)),function(){G[this]=F});return G}o.fn.extend({show:function(J,L){if(J){return this.animate(t("show",3),J,L)}else{for(var H=0,F=this.length;H<F;H++){var E=o.data(this[H],"olddisplay");this[H].style.display=E||"";if(o.css(this[H],"display")==="none"){var G=this[H].tagName,K;if(m[G]){K=m[G]}else{var I=o("<"+G+" />").appendTo("body");K=I.css("display");if(K==="none"){K="block"}I.remove();m[G]=K}o.data(this[H],"olddisplay",K)}}for(var H=0,F=this.length;H<F;H++){this[H].style.display=o.data(this[H],"olddisplay")||""}return this}},hide:function(H,I){if(H){return this.animate(t("hide",3),H,I)}else{for(var G=0,F=this.length;G<F;G++){var E=o.data(this[G],"olddisplay");if(!E&&E!=="none"){o.data(this[G],"olddisplay",o.css(this[G],"display"))}}for(var G=0,F=this.length;G<F;G++){this[G].style.display="none"}return this}},_toggle:o.fn.toggle,toggle:function(G,F){var E=typeof G==="boolean";return o.isFunction(G)&&o.isFunction(F)?this._toggle.apply(this,arguments):G==null||E?this.each(function(){var H=E?G:o(this).is(":hidden");o(this)[H?"show":"hide"]()}):this.animate(t("toggle",3),G,F)},fadeTo:function(E,G,F){return this.animate({opacity:G},E,F)},animate:function(I,F,H,G){var E=o.speed(F,H,G);return this[E.queue===false?"each":"queue"](function(){var K=o.extend({},E),M,L=this.nodeType==1&&o(this).is(":hidden"),J=this;for(M in I){if(I[M]=="hide"&&L||I[M]=="show"&&!L){return K.complete.call(this)}if((M=="height"||M=="width")&&this.style){K.display=o.css(this,"display");K.overflow=this.style.overflow}}if(K.overflow!=null){this.style.overflow="hidden"}K.curAnim=o.extend({},I);o.each(I,function(O,S){var R=new o.fx(J,K,O);if(/toggle|show|hide/.test(S)){R[S=="toggle"?L?"show":"hide":S](I)}else{var Q=S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),T=R.cur(true)||0;if(Q){var N=parseFloat(Q[2]),P=Q[3]||"px";if(P!="px"){J.style[O]=(N||1)+P;T=((N||1)/R.cur(true))*T;J.style[O]=T+P}if(Q[1]){N=((Q[1]=="-="?-1:1)*N)+T}R.custom(T,N,P)}else{R.custom(T,S,"")}}});return true})},stop:function(F,E){var G=o.timers;if(F){this.queue([])}this.each(function(){for(var H=G.length-1;H>=0;H--){if(G[H].elem==this){if(E){G[H](true)}G.splice(H,1)}}});if(!E){this.dequeue()}return this}});o.each({slideDown:t("show",1),slideUp:t("hide",1),slideToggle:t("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(E,F){o.fn[E]=function(G,H){return this.animate(F,G,H)}});o.extend({speed:function(G,H,F){var E=typeof G==="object"?G:{complete:F||!F&&H||o.isFunction(G)&&G,duration:G,easing:F&&H||H&&!o.isFunction(H)&&H};E.duration=o.fx.off?0:typeof E.duration==="number"?E.duration:o.fx.speeds[E.duration]||o.fx.speeds._default;E.old=E.complete;E.complete=function(){if(E.queue!==false){o(this).dequeue()}if(o.isFunction(E.old)){E.old.call(this)}};return E},easing:{linear:function(G,H,E,F){return E+F*G},swing:function(G,H,E,F){return((-Math.cos(G*Math.PI)/2)+0.5)*F+E}},timers:[],fx:function(F,E,G){this.options=E;this.elem=F;this.prop=G;if(!E.orig){E.orig={}}}});o.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(o.fx.step[this.prop]||o.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(F){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var E=parseFloat(o.css(this.elem,this.prop,F));return E&&E>-10000?E:parseFloat(o.curCSS(this.elem,this.prop))||0},custom:function(I,H,G){this.startTime=e();this.start=I;this.end=H;this.unit=G||this.unit||"px";this.now=this.start;this.pos=this.state=0;var E=this;function F(J){return E.step(J)}F.elem=this.elem;if(F()&&o.timers.push(F)&&!n){n=setInterval(function(){var K=o.timers;for(var J=0;J<K.length;J++){if(!K[J]()){K.splice(J--,1)}}if(!K.length){clearInterval(n);n=g}},13)}},show:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());o(this.elem).show()},hide:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(H){var G=e();if(H||G>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var E=true;for(var F in this.options.curAnim){if(this.options.curAnim[F]!==true){E=false}}if(E){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(o.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){o(this.elem).hide()}if(this.options.hide||this.options.show){for(var I in this.options.curAnim){o.attr(this.elem.style,I,this.options.orig[I])}}this.options.complete.call(this.elem)}return false}else{var J=G-this.startTime;this.state=J/this.options.duration;this.pos=o.easing[this.options.easing||(o.easing.swing?"swing":"linear")](this.state,J,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};o.extend(o.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(E){o.attr(E.elem.style,"opacity",E.now)},_default:function(E){if(E.elem.style&&E.elem.style[E.prop]!=null){E.elem.style[E.prop]=E.now+E.unit}else{E.elem[E.prop]=E.now}}}});if(document.documentElement.getBoundingClientRect){o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}var G=this[0].getBoundingClientRect(),J=this[0].ownerDocument,F=J.body,E=J.documentElement,L=E.clientTop||F.clientTop||0,K=E.clientLeft||F.clientLeft||0,I=G.top+(self.pageYOffset||o.boxModel&&E.scrollTop||F.scrollTop)-L,H=G.left+(self.pageXOffset||o.boxModel&&E.scrollLeft||F.scrollLeft)-K;return{top:I,left:H}}}else{o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}o.offset.initialized||o.offset.initialize();var J=this[0],G=J.offsetParent,F=J,O=J.ownerDocument,M,H=O.documentElement,K=O.body,L=O.defaultView,E=L.getComputedStyle(J,null),N=J.offsetTop,I=J.offsetLeft;while((J=J.parentNode)&&J!==K&&J!==H){M=L.getComputedStyle(J,null);N-=J.scrollTop,I-=J.scrollLeft;if(J===G){N+=J.offsetTop,I+=J.offsetLeft;if(o.offset.doesNotAddBorder&&!(o.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(J.tagName))){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}F=G,G=J.offsetParent}if(o.offset.subtractsBorderForOverflowNotVisible&&M.overflow!=="visible"){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}E=M}if(E.position==="relative"||E.position==="static"){N+=K.offsetTop,I+=K.offsetLeft}if(E.position==="fixed"){N+=Math.max(H.scrollTop,K.scrollTop),I+=Math.max(H.scrollLeft,K.scrollLeft)}return{top:N,left:I}}}o.offset={initialize:function(){if(this.initialized){return}var L=document.body,F=document.createElement("div"),H,G,N,I,M,E,J=L.style.marginTop,K='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';M={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};for(E in M){F.style[E]=M[E]}F.innerHTML=K;L.insertBefore(F,L.firstChild);H=F.firstChild,G=H.firstChild,I=H.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(G.offsetTop!==5);this.doesAddBorderForTableAndCells=(I.offsetTop===5);H.style.overflow="hidden",H.style.position="relative";this.subtractsBorderForOverflowNotVisible=(G.offsetTop===-5);L.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(L.offsetTop===0);L.style.marginTop=J;L.removeChild(F);this.initialized=true},bodyOffset:function(E){o.offset.initialized||o.offset.initialize();var G=E.offsetTop,F=E.offsetLeft;if(o.offset.doesNotIncludeMarginInBodyOffset){G+=parseInt(o.curCSS(E,"marginTop",true),10)||0,F+=parseInt(o.curCSS(E,"marginLeft",true),10)||0}return{top:G,left:F}}};o.fn.extend({position:function(){var I=0,H=0,F;if(this[0]){var G=this.offsetParent(),J=this.offset(),E=/^body|html$/i.test(G[0].tagName)?{top:0,left:0}:G.offset();J.top-=j(this,"marginTop");J.left-=j(this,"marginLeft");E.top+=j(G,"borderTopWidth");E.left+=j(G,"borderLeftWidth");F={top:J.top-E.top,left:J.left-E.left}}return F},offsetParent:function(){var E=this[0].offsetParent||document.body;while(E&&(!/^body|html$/i.test(E.tagName)&&o.css(E,"position")=="static")){E=E.offsetParent}return o(E)}});o.each(["Left","Top"],function(F,E){var G="scroll"+E;o.fn[G]=function(H){if(!this[0]){return null}return H!==g?this.each(function(){this==l||this==document?l.scrollTo(!F?H:o(l).scrollLeft(),F?H:o(l).scrollTop()):this[G]=H}):this[0]==l||this[0]==document?self[F?"pageYOffset":"pageXOffset"]||o.boxModel&&document.documentElement[G]||document.body[G]:this[0][G]}});o.each(["Height","Width"],function(I,G){var E=I?"Left":"Top",H=I?"Right":"Bottom",F=G.toLowerCase();o.fn["inner"+G]=function(){return this[0]?o.css(this[0],F,false,"padding"):null};o.fn["outer"+G]=function(K){return this[0]?o.css(this[0],F,false,K?"margin":"border"):null};var J=G.toLowerCase();o.fn[J]=function(K){return this[0]==l?document.compatMode=="CSS1Compat"&&document.documentElement["client"+G]||document.body["client"+G]:this[0]==document?Math.max(document.documentElement["client"+G],document.body["scroll"+G],document.documentElement["scroll"+G],document.body["offset"+G],document.documentElement["offset"+G]):K===g?(this.length?o.css(this[0],J):null):this.css(J,typeof K==="string"?K:K+"px")}})})();
/*#############################################################
Name: Niceforms
Version: 2.0
Author: Lucian Slatineanu
URL: http://www.emblematiq.com/projects/niceforms/

Feel free to use and modify but please keep this copyright intact.
#################################################################*/

//Theme Variables - edit these to match your theme
var imagesPath = "/images/";
var selectRightWidthSimple = 19;
var selectRightWidthScroll = 2;
var selectMaxHeight = 200;
var textareaTopPadding = 10;
var textareaSidePadding = 10;

//Global Variables
var NF = new Array();
var isIE = false;
var resizeTest = 1;

//Initialization function
function NFInit() {
	try {
		document.execCommand('BackgroundImageCache', false, true);
	} catch(e) {}
	if(!document.getElementById) {return false;}
	//alert("click me first");
	NFDo('start');
}
function NFDo(what) {
	var niceforms = document.getElementsByTagName('form');
	var identifier = new RegExp('(^| )'+'niceform'+'( |$)');
	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
		var ieversion=new Number(RegExp.$1);
		if(ieversion < 7) {return false;} //exit script if IE6
		isIE = true;
	}
	for(var q = 0; q < niceforms.length; q++) {if(identifier.test(niceforms[q].className)) {
		if(what == "start") { //Load Niceforms
			NF[q] = new niceform(niceforms[q]);
			niceforms[q].start();
		}
		else { //Unload Niceforms
			niceforms[q].unload();
			NF[q] = "";
		}
	}}
}
function NFFix() {
	NFDo('stop');
	NFDo('start');
}
function niceform(nf) {
	nf._inputText = new Array(); nf._inputRadio = new Array(); nf._inputCheck = new Array(); nf._inputSubmit = new Array(); nf._inputFile = new Array(); nf._textarea = new Array(); nf._select = new Array(); nf._multiselect = new Array();
	nf.add_inputText = function(obj) {this._inputText[this._inputText.length] = obj; inputText(obj);}
	nf.add_inputRadio = function(obj) {this._inputRadio[this._inputRadio.length] = obj; inputRadio(obj);}
	nf.add_inputCheck = function(obj) {this._inputCheck[this._inputCheck.length] = obj; inputCheck(obj);}
	nf.add_inputSubmit = function(obj) {this._inputSubmit[this._inputSubmit.length] = obj; inputSubmit(obj);}
	nf.add_inputFile = function(obj) {this._inputFile[this._inputFile.length] = obj; inputFile(obj);}
	nf.add_textarea = function(obj) {this._textarea[this._textarea.length] = obj; textarea(obj);}
	nf.add_select = function(obj) {this._select[this._select.length] = obj; selects(obj);}
	nf.add_multiselect = function(obj) {this._multiselect[this._multiselect.length] = obj; multiSelects(obj);}
	nf.start = function() {
		//Separate and assign elements
		var allInputs = this.getElementsByTagName('input');
		for(var w = 0; w < allInputs.length; w++) {
			switch(allInputs[w].type) {
				case "text": case "password": {this.add_inputText(allInputs[w]); break;}
				case "radio": {this.add_inputRadio(allInputs[w]); break;}
				case "checkbox": {this.add_inputCheck(allInputs[w]); break;}
				case "submit": case "reset": case "button": {this.add_inputSubmit(allInputs[w]); break;}
				case "file": {this.add_inputFile(allInputs[w]); break;}
			}
		}
		var allButtons = this.getElementsByTagName('button');
		for(var w = 0; w < allButtons.length; w++) {
			this.add_inputSubmit(allButtons[w]);
		}
		var allTextareas = this.getElementsByTagName('textarea');
		for(var w = 0; w < allTextareas.length; w++) {
			this.add_textarea(allTextareas[w]);
		}
		var allSelects = this.getElementsByTagName('select');
		for(var w = 0; w < allSelects.length; w++) {
			if(allSelects[w].size == "1") {this.add_select(allSelects[w]);}
			else {this.add_multiselect(allSelects[w]);}
		}
		//Start
		for(w = 0; w < this._inputText.length; w++) {this._inputText[w].init();}
		for(w = 0; w < this._inputRadio.length; w++) {this._inputRadio[w].init();}
		for(w = 0; w < this._inputCheck.length; w++) {this._inputCheck[w].init();}
		for(w = 0; w < this._inputSubmit.length; w++) {this._inputSubmit[w].init();}
		for(w = 0; w < this._inputFile.length; w++) {this._inputFile[w].init();}
		for(w = 0; w < this._textarea.length; w++) {this._textarea[w].init();}
		for(w = 0; w < this._select.length; w++) {this._select[w].init(w);}
		for(w = 0; w < this._multiselect.length; w++) {this._multiselect[w].init(w);}
	}
	nf.unload = function() {
		//Stop
		for(w = 0; w < this._inputText.length; w++) {this._inputText[w].unload();}
		for(w = 0; w < this._inputRadio.length; w++) {this._inputRadio[w].unload();}
		for(w = 0; w < this._inputCheck.length; w++) {this._inputCheck[w].unload();}
		for(w = 0; w < this._inputSubmit.length; w++) {this._inputSubmit[w].unload();}
		for(w = 0; w < this._inputFile.length; w++) {this._inputFile[w].unload();}
		for(w = 0; w < this._textarea.length; w++) {this._textarea[w].unload();}
		for(w = 0; w < this._select.length; w++) {this._select[w].unload();}
		for(w = 0; w < this._multiselect.length; w++) {this._multiselect[w].unload();}
	}
}
function inputText(el) { //extent Text inputs
	el.oldClassName = el.className;
	el.left = document.createElement('img');
	el.left.src = imagesPath + "0.png";
	el.left.className = "NFTextLeft";
	el.right = document.createElement('img');
	el.right.src = imagesPath + "0.png";
	el.right.className = "NFTextRight";
	el.dummy = document.createElement('div');
	el.dummy.className = "NFTextCenter";
	el.onfocus = function() {
		this.dummy.className = "NFTextCenter NFh";
		this.left.className = "NFTextLeft NFh";
		this.right.className = "NFTextRight NFh";
	}
	el.onblur = function() {
		this.dummy.className = "NFTextCenter";
		this.left.className = "NFTextLeft";
		this.right.className = "NFTextRight";
	}
	el.init = function() {
		this.parentNode.insertBefore(this.left, this);
		this.parentNode.insertBefore(this.right, this.nextSibling);
		this.dummy.appendChild(this);
		this.right.parentNode.insertBefore(this.dummy, this.right);
		this.className = "NFText";
	}
	el.unload = function() {
		this.parentNode.parentNode.appendChild(this);
		this.parentNode.removeChild(this.left);
		this.parentNode.removeChild(this.right);
		this.parentNode.removeChild(this.dummy);
		this.className = this.oldClassName;
	}
}
function inputRadio(el) { //extent Radio buttons
	el.oldClassName = el.className;
	el.dummy = document.createElement('div');
	if(el.checked) {el.dummy.className = "NFRadio NFh";}
	else {el.dummy.className = "NFRadio";}
	el.dummy.ref = el;
	if(isIE == false) {el.dummy.style.left = findPosX(el) + 'px'; el.dummy.style.top = findPosY(el) + 'px';}
	else {el.dummy.style.left = findPosX(el) + 4 + 'px'; el.dummy.style.top = findPosY(el) + 4 + 'px';}
	el.dummy.onclick = function() {
		if(!this.ref.checked) {
			var siblings = getInputsByName(this.ref.name);
			for(var q = 0; q < siblings.length; q++) {
				siblings[q].checked = false;
				siblings[q].dummy.className = "NFRadio";
			}
			this.ref.checked = true;
			this.className = "NFRadio NFh";
		}
	}
	el.onclick = function() {
		if(this.checked) {
			var siblings = getInputsByName(this.name);
			for(var q = 0; q < siblings.length; q++) {
				siblings[q].dummy.className = "NFRadio";
			}
			this.dummy.className = "NFRadio NFh";
		}
	}
	el.onfocus = function() {this.dummy.className += " NFfocused";}
	el.onblur = function() {this.dummy.className = this.dummy.className.replace(/ NFfocused/g, "");}
	el.init = function() {
		this.parentNode.insertBefore(this.dummy, this);
		el.className = "NFhidden";
	}
	el.unload = function() {
		this.parentNode.removeChild(this.dummy);
		this.className = this.oldClassName;
	}
}
function inputCheck(el) { //extend Checkboxes
	el.oldClassName = el.className;
	el.dummy = document.createElement('img');
	el.dummy.src = imagesPath + "0.png";
	if(el.checked) {el.dummy.className = "NFCheck NFh";}
	else {el.dummy.className = "NFCheck";}
	el.dummy.ref = el;
	if(isIE == false) {el.dummy.style.left = findPosX(el) + 'px'; el.dummy.style.top = findPosY(el) + 'px';}
	else {el.dummy.style.left = findPosX(el) + 4 + 'px'; el.dummy.style.top = findPosY(el) + 4 + 'px';}
	el.dummy.onclick = function() {
		if(!this.ref.checked) {
			this.ref.checked = true;
			this.className = "NFCheck NFh";
		}
		else {
			this.ref.checked = false;
			this.className = "NFCheck";
		}
	}
	el.onclick = function() {
		if(this.checked) {this.dummy.className = "NFCheck NFh";}
		else {this.dummy.className = "NFCheck";}
	}
	el.onfocus = function() {this.dummy.className += " NFfocused";}
	el.onblur = function() {this.dummy.className = this.dummy.className.replace(/ NFfocused/g, "");}
	el.init = function() {
		this.parentNode.insertBefore(this.dummy, this);
		el.className = "NFhidden";
	}
	el.unload = function() {
		this.parentNode.removeChild(this.dummy);
		this.className = this.oldClassName;
	}
}
function inputSubmit(el) { //extend Buttons
	el.oldClassName = el.className;
	el.left = document.createElement('img');
	el.left.className = "NFButtonLeft";
	el.left.src = imagesPath + "0.png";
	el.right = document.createElement('img');
	el.right.src = imagesPath + "0.png";
	el.right.className = "NFButtonRight";
	el.onmouseover = function() {
		this.className = "NFButton NFh";
		this.left.className = "NFButtonLeft NFh";
		this.right.className = "NFButtonRight NFh";
	}
	el.onmouseout = function() {
		this.className = "NFButton";
		this.left.className = "NFButtonLeft";
		this.right.className = "NFButtonRight";
	}
	el.init = function() {
		this.parentNode.insertBefore(this.left, this);
		this.parentNode.insertBefore(this.right, this.nextSibling);
		this.className = "NFButton";
	}
	el.unload = function() {
		this.parentNode.removeChild(this.left);
		this.parentNode.removeChild(this.right);
		this.className = this.oldClassName;
	}
}
function inputFile(el) { //extend File inputs
	el.oldClassName = el.className;
	el.dummy = document.createElement('div');
	el.dummy.className = "NFFile";
	el.file = document.createElement('div');
	el.file.className = "NFFileNew";
	el.center = document.createElement('div');
	el.center.className = "NFTextCenter";
	el.clone = document.createElement('input');
	el.clone.type = "text";
	el.clone.className = "NFText";
	el.clone.ref = el;
	el.left = document.createElement('img');
	el.left.src = imagesPath + "0.png";
	el.left.className = "NFTextLeft";
	el.button = document.createElement('img');
	el.button.src = imagesPath + "0.png";
	el.button.className = "NFFileButton";
	el.button.ref = el;
	el.button.onclick = function() {this.ref.click();}
	el.init = function() {
		var top = this.parentNode;
		if(this.previousSibling) {var where = this.previousSibling;}
		else {var where = top.childNodes[0];}
		top.insertBefore(this.dummy, where);
		this.dummy.appendChild(this);
		this.center.appendChild(this.clone);
		this.file.appendChild(this.center);
		this.file.insertBefore(this.left, this.center);
		this.file.appendChild(this.button);
		this.dummy.appendChild(this.file);
		this.className = "NFhidden";
		this.relatedElement = this.clone;
	}
	el.unload = function() {
		this.parentNode.parentNode.appendChild(this);
		this.parentNode.removeChild(this.dummy);
		this.className = this.oldClassName;
	}
	el.onchange = el.onmouseout = function() {this.relatedElement.value = this.value;}
	el.onfocus = function() {
		this.left.className = "NFTextLeft NFh";
		this.center.className = "NFTextCenter NFh";
		this.button.className = "NFFileButton NFh";
	}
	el.onblur = function() {
		this.left.className = "NFTextLeft";
		this.center.className = "NFTextCenter";
		this.button.className = "NFFileButton";
	}
	el.onselect = function() {
		this.relatedElement.select();
		this.value = '';
	}
}
function textarea(el) { //extend Textareas
	el.oldClassName = el.className;
	el.height = el.offsetHeight - textareaTopPadding;
	el.width = el.offsetWidth - textareaSidePadding;
	el.topLeft = document.createElement('img');
	el.topLeft.src = imagesPath + "0.png";
	el.topLeft.className = "NFTextareaTopLeft";
	el.topRight = document.createElement('div');
	el.topRight.className = "NFTextareaTop";
	el.bottomLeft = document.createElement('img');
	el.bottomLeft.src = imagesPath + "0.png";
	el.bottomLeft.className = "NFTextareaBottomLeft";
	el.bottomRight = document.createElement('div');
	el.bottomRight.className = "NFTextareaBottom";
	el.left = document.createElement('div');
	el.left.className = "NFTextareaLeft";
	el.right = document.createElement('div');
	el.right.className = "NFTextareaRight";
	el.init = function() {
		var top = this.parentNode;
		if(this.previousSibling) {var where = this.previousSibling;}
		else {var where = top.childNodes[0];}
		top.insertBefore(el.topRight, where);
		top.insertBefore(el.right, where);
		top.insertBefore(el.bottomRight, where);
		this.topRight.appendChild(this.topLeft);
		this.right.appendChild(this.left);
		this.right.appendChild(this);
		this.bottomRight.appendChild(this.bottomLeft);
		el.style.width = el.topRight.style.width = el.bottomRight.style.width = el.width + 'px';
		el.style.height = el.left.style.height = el.right.style.height = el.height + 'px';
		this.className = "NFTextarea";
	}
	el.unload = function() {
		this.parentNode.parentNode.appendChild(this);
		this.parentNode.removeChild(this.topRight);
		this.parentNode.removeChild(this.bottomRight);
		this.parentNode.removeChild(this.right);
		this.className = this.oldClassName;
		this.style.width = this.style.height = "";
	}
	el.onfocus = function() {
		this.topLeft.className = "NFTextareaTopLeft NFh";
		this.topRight.className = "NFTextareaTop NFhr";
		this.left.className = "NFTextareaLeftH";
		this.right.className = "NFTextareaRightH";
		this.bottomLeft.className = "NFTextareaBottomLeft NFh";
		this.bottomRight.className = "NFTextareaBottom NFhr";
	}
	el.onblur = function() {
		this.topLeft.className = "NFTextareaTopLeft";
		this.topRight.className = "NFTextareaTop";
		this.left.className = "NFTextareaLeft";
		this.right.className = "NFTextareaRight";
		this.bottomLeft.className = "NFTextareaBottomLeft";
		this.bottomRight.className = "NFTextareaBottom";
	}
}
function selects(el) { //extend Selects
	el.oldClassName = el.className;
	el.dummy = document.createElement('div');
	el.dummy.className = "NFSelect";
	el.dummy.style.width = el.offsetWidth + 'px';
	el.dummy.ref = el;
	el.left = document.createElement('img');
	el.left.src = imagesPath + "0.png";
	el.left.className = "NFSelectLeft";
	el.right = document.createElement('div');
	el.right.className = "NFSelectRight";
	el.txt = document.createTextNode(el.options[0].text);
	el.bg = document.createElement('div');
	el.bg.className = "NFSelectTarget";
	el.bg.style.display = "none";
	el.opt = document.createElement('ul');
	el.opt.className = "NFSelectOptions";
	el.dummy.style.left = findPosX(el) + 'px';
	el.dummy.style.top = findPosY(el) + 'px';
	el.opts = new Array(el.options.length);
	el.init = function(pos) {
		this.dummy.appendChild(this.left);
		this.right.appendChild(this.txt);
		this.dummy.appendChild(this.right);
		this.bg.appendChild(this.opt);
		this.dummy.appendChild(this.bg);
		for(var q = 0; q < this.options.length; q++) {
			this.opts[q] = new option(this.options[q], q);
			this.opt.appendChild(this.options[q].li);
			this.options[q].lnk.onclick = function() {
				this._onclick();
				this.ref.dummy.getElementsByTagName('div')[0].innerHTML = this.ref.options[this.pos].text;
				this.ref.options[this.pos].selected = "selected";
				for(var w = 0; w < this.ref.options.length; w++) {this.ref.options[w].lnk.className = "";}
				this.ref.options[this.pos].lnk.className = "NFOptionActive";
			}
		}
		if(this.options.selectedIndex) {
			this.dummy.getElementsByTagName('div')[0].innerHTML = this.options[this.options.selectedIndex].text;
			this.options[this.options.selectedIndex].lnk.className = "NFOptionActive";
		}
		this.dummy.style.zIndex = 999 - pos;
		this.parentNode.insertBefore(this.dummy, this);
		this.className = "NFhidden";
	}
	el.unload = function() {
		this.parentNode.removeChild(this.dummy);
		this.className = this.oldClassName;
	}
	el.dummy.onclick = function() {
		var allDivs = document.getElementsByTagName('div'); for(var q = 0; q < allDivs.length; q++) {if((allDivs[q].className == "NFSelectTarget") && (allDivs[q] != this.ref.bg)) {allDivs[q].style.display = "none";}}
		if(this.ref.bg.style.display == "none") {this.ref.bg.style.display = "block";}
		else {this.ref.bg.style.display = "none";}
		if(this.ref.opt.offsetHeight > selectMaxHeight) {
			this.ref.bg.style.width = this.ref.offsetWidth - selectRightWidthScroll + 33 + 'px';
			this.ref.opt.style.width = this.ref.offsetWidth - selectRightWidthScroll + 'px';
		}
		else {
			this.ref.bg.style.width = this.ref.offsetWidth - selectRightWidthSimple + 33 + 'px';
			this.ref.opt.style.width = this.ref.offsetWidth - selectRightWidthSimple + 'px';
		}
	}
	el.bg.onmouseout = function(e) {
		if (!e) var e = window.event;
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
		var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;
		if((reltg.nodeName == 'A') || (reltg.nodeName == 'LI') || (reltg.nodeName == 'UL')) return;
		if((reltg.nodeName == 'DIV') || (reltg.className == 'NFSelectTarget')) return;
		else{this.style.display = "none";}
	}
	el.dummy.onmouseout = function(e) {
		if (!e) var e = window.event;
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
		var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;
		if((reltg.nodeName == 'A') || (reltg.nodeName == 'LI') || (reltg.nodeName == 'UL')) return;
		if((reltg.nodeName == 'DIV') || (reltg.className == 'NFSelectTarget')) return;
		else{this.ref.bg.style.display = "none";}
	}
	el.onfocus = function() {this.dummy.className += " NFfocused";}
	el.onblur = function() {this.dummy.className = this.dummy.className.replace(/ NFfocused/g, "");}
	el.onkeydown = function(e) {
		if (!e) var e = window.event;
		var thecode = e.keyCode;
		var active = this.selectedIndex;
		switch(thecode){
			case 40: //down
				if(active < this.options.length - 1) {
					for(var w = 0; w < this.options.length; w++) {this.options[w].lnk.className = "";}
					var newOne = active + 1;
					this.options[newOne].selected = "selected";
					this.options[newOne].lnk.className = "NFOptionActive";
					this.dummy.getElementsByTagName('div')[0].innerHTML = this.options[newOne].text;
				}
				return false;
				break;
			case 38: //up
				if(active > 0) {
					for(var w = 0; w < this.options.length; w++) {this.options[w].lnk.className = "";}
					var newOne = active - 1;
					this.options[newOne].selected = "selected";
					this.options[newOne].lnk.className = "NFOptionActive";
					this.dummy.getElementsByTagName('div')[0].innerHTML = this.options[newOne].text;
				}
				return false;
				break;
			default:
				break;
		}
	}
}
function multiSelects(el) { //extend Multiple Selects
	el.oldClassName = el.className;
	el.height = el.offsetHeight;
	el.width = el.offsetWidth;
	el.topLeft = document.createElement('img');
	el.topLeft.src = imagesPath + "0.png";
	el.topLeft.className = "NFMultiSelectTopLeft";
	el.topRight = document.createElement('div');
	el.topRight.className = "NFMultiSelectTop";
	el.bottomLeft = document.createElement('img');
	el.bottomLeft.src = imagesPath + "0.png";
	el.bottomLeft.className = "NFMultiSelectBottomLeft";
	el.bottomRight = document.createElement('div');
	el.bottomRight.className = "NFMultiSelectBottom";
	el.left = document.createElement('div');
	el.left.className = "NFMultiSelectLeft";
	el.right = document.createElement('div');
	el.right.className = "NFMultiSelectRight";
	el.init = function() {
		var top = this.parentNode;
		if(this.previousSibling) {var where = this.previousSibling;}
		else {var where = top.childNodes[0];}
		top.insertBefore(el.topRight, where);
		top.insertBefore(el.right, where);
		top.insertBefore(el.bottomRight, where);
		this.topRight.appendChild(this.topLeft);
		this.right.appendChild(this.left);
		this.right.appendChild(this);
		this.bottomRight.appendChild(this.bottomLeft);
		el.style.width = el.topRight.style.width = el.bottomRight.style.width = el.width + 'px';
		el.style.height = el.left.style.height = el.right.style.height = el.height + 'px';
		el.className = "NFMultiSelect";
	}
	el.unload = function() {
		this.parentNode.parentNode.appendChild(this);
		this.parentNode.removeChild(this.topRight);
		this.parentNode.removeChild(this.bottomRight);
		this.parentNode.removeChild(this.right);
		this.className = this.oldClassName;
		this.style.width = this.style.height = "";
	}
	el.onfocus = function() {
		this.topLeft.className = "NFMultiSelectTopLeft NFh";
		this.topRight.className = "NFMultiSelectTop NFhr";
		this.left.className = "NFMultiSelectLeftH";
		this.right.className = "NFMultiSelectRightH";
		this.bottomLeft.className = "NFMultiSelectBottomLeft NFh";
		this.bottomRight.className = "NFMultiSelectBottom NFhr";
	}
	el.onblur = function() {
		this.topLeft.className = "NFMultiSelectTopLeft";
		this.topRight.className = "NFMultiSelectTop";
		this.left.className = "NFMultiSelectLeft";
		this.right.className = "NFMultiSelectRight";
		this.bottomLeft.className = "NFMultiSelectBottomLeft";
		this.bottomRight.className = "NFMultiSelectBottom";
	}
}
function option(el, no) { //extend Options
	el.li = document.createElement('li');
	el.lnk = document.createElement('a');
	el.lnk.href = "javascript:;";
	el.lnk.ref = el.parentNode;
	el.lnk.pos = no;
	el.lnk._onclick = el.onclick || function () {};
	el.txt = document.createTextNode(el.text);
	el.lnk.appendChild(el.txt);
	el.li.appendChild(el.lnk);
}

//Get Position
function findPosY(obj) {
	var posTop = 0;
	do {posTop += obj.offsetTop;} while (obj = obj.offsetParent);
	return posTop;
}
function findPosX(obj) {
	var posLeft = 0;
	do {posLeft += obj.offsetLeft;} while (obj = obj.offsetParent);
	return posLeft;
}
//Get Siblings
function getInputsByName(name) {
	var inputs = document.getElementsByTagName("input");
	var w = 0; var results = new Array();
	for(var q = 0; q < inputs.length; q++) {if(inputs[q].name == name) {results[w] = inputs[q]; ++w;}}
	return results;
}

//Add events
var existingLoadEvent = window.onload || function () {};
var existingResizeEvent = window.onresize || function() {};
window.onload = function () {
    existingLoadEvent();
    NFInit();
}
window.onresize = function() {
	if(resizeTest != document.documentElement.clientHeight) {
		existingResizeEvent();
		NFFix();
	}
	resizeTest = document.documentElement.clientHeight;
}
;
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//






function change_navbar(number){
  $("div.menu ul li a").removeClass("current");
      $($("div.menu ul li a")[number]).addClass("current");
}
