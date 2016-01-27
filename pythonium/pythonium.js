object = {__bases__:[],__name__:"object"};
object.__mro__ = [object];
type = {__bases__:[object],__mro__:[object],__name__:"type"};
object.__metaclass__ = type;

__ARGUMENTS_PADDING__ = {ARGUMENTS_PADDING:"YES IT IS!"};
var __is__ = function(me, other) {
    return (me === other);
};
__is__.is_method = true;
object.__is__ = __is__;
var __isnot__ = function(me, other) {
    return !(me === other);
};
__isnot__.is_method = true;
object.__isnot__ = __isnot__;
var mro = function(me) {
    var l,raw;
    if((me === object)) {
        raw = me.__mro__;
    }
    else {
        if(me.__class__) {
            raw = me.__class__.__mro__;
        }
        else {
            raw = me.__mro__;
        }
    }
    l = pythonium_call(tuple);
    l.jsobject = raw.slice();
    return l;
};
mro.is_method = true;
object.mro = mro;
var __hash__ = function(me) {
    var uid;
    uid = lookup(me, "uid");
    if(!uid) {
        uid = object._uid;
        object._uid = object._uid + 1;
        me.__uid__ = uid;
    }
    return pythonium_call(str, ("{" + uid));
};
__hash__.is_method = true;
object._uid = 1;
object.__hash__ = __hash__;
var __rcontains__ = function(me, other) {
    var contains;
    contains = lookup(other, "__contains__");
    return contains(me);
};
__rcontains__.is_method = true;
object.__rcontains__ = __rcontains__;
var issubclass = function(klass, other) {
    if((klass === other)) {
        return __TRUE;
    }
    if(!klass.__bases__) {
        return __FALSE;
    }
    var iterator_base = klass.__bases__;
    for (var base_iterator_index=0; base_iterator_index < iterator_base.length; base_iterator_index++) {
        var base = iterator_base[base_iterator_index];
        if((issubclass(base, other) === __TRUE)) {
            return __TRUE;
        }
    }
    return __FALSE;
};
var pythonium_is_true = function(v) {
    var length;
    if((v === false)) {
        return false;
    }
    if((v === true)) {
        return true;
    }
    if((v === undefined)) {
        return false;
    }
    if((v === __NONE)) {
        return false;
    }
    if((v === __FALSE)) {
        return false;
    }
    if((isinstance(v, int)||isinstance(v, float))) {
        if((v.jsobject == 0)) {
            return false;
        }
    }
    length = lookup(v, "__len__");
    if((length&&(length().jsobject == 0))) {
        return false;
    }
    return true;
};
var isinstance = function(obj, klass) {
    if(obj.__class__) {
        return issubclass(obj.__class__, klass);
    }
    return __FALSE;
};
var pythonium_obj_to_js_exception = function(obj) {
    var exception = function() {
        this.exception = obj;
    };
    return exception;
};
var pythonium_is_exception = function(obj, exc) {
    if((obj === exc)) {
        return true;
    }
    return isinstance(obj, exc);
};
var pythonium_call = function(obj) {
    var args,init,instance;
    args = Array.prototype.slice.call(arguments, 1);
    if(obj.__metaclass__) {
        instance = {__class__:obj};
        init = lookup(instance, "__init__");
        if(init) {
            init.apply(instance, args);
        }
        return instance;
    }
    else {
        return obj.apply(undefined, args);
    }
};
var pythonium_create_empty_dict = function() {
    var instance;
    instance = {__class__:dict};
    instance._keys = pythonium_call(list);
    instance.jsobject = Object();
    return instance;
};
var pythonium_mro = function(bases) {
    var out,candidate,not_head,seqs,res,non_empty;
    "Calculate the Method Resolution Order of bases using the C3 algorithm.\n\n    Suppose you intended creating a class K with the given base classes. This\n    function returns the MRO which K would have, *excluding* K itself (since\n    it doesn't yet exist), as if you had actually created the class.\n\n    Another way of looking at this, if you pass a single class K, this will\n    return the linearization of K (the MRO of K, *including* itself).\n    ";
    var __comp18__ = [];
    var __iterator19__ = bases;
    for (var __index20__ = 0; __index20__<__iterator19__.length; __index20__++) {
        var C = __iterator19__[__index20__];
        __comp18__.push(C.__mro__.slice());
    }
    seqs = __comp18__;
    seqs.push(bases.slice());
    var cdr = function(l) {
        l = l.slice();
        l = l.splice(1);
        return l;
    };
    var contains = function(l, c) {
        var iterator_i = l;
        for (var i_iterator_index=0; i_iterator_index < iterator_i.length; i_iterator_index++) {
            var i = iterator_i[i_iterator_index];
            if((i === c)) {
                return true;
            }
        }
        return false;
    };
    res = [];
    while(true) {
        non_empty = [];
        var iterator_seq = seqs;
        for (var seq_iterator_index=0; seq_iterator_index < iterator_seq.length; seq_iterator_index++) {
            var seq = iterator_seq[seq_iterator_index];
            out = [];
            var iterator_item = seq;
            for (var item_iterator_index=0; item_iterator_index < iterator_item.length; item_iterator_index++) {
                var item = iterator_item[item_iterator_index];
                if(item) {
                    out.push(item);
                }
            }
            if((out.length != 0)) {
                non_empty.push(out);
            }
        }
        if((non_empty.length == 0)) {
            return res;
        }
        var iterator_seq = non_empty;
        for (var seq_iterator_index=0; seq_iterator_index < iterator_seq.length; seq_iterator_index++) {
            var seq = iterator_seq[seq_iterator_index];
            candidate = seq[0];
            not_head = [];
            var iterator_s = non_empty;
            for (var s_iterator_index=0; s_iterator_index < iterator_s.length; s_iterator_index++) {
                var s = iterator_s[s_iterator_index];
                if(contains(cdr(s), candidate)) {
                    not_head.push(s);
                }
            }
            if((not_head.length != 0)) {
                candidate = undefined;
            }
            else {
                break;
            }
        }
        if(!candidate) {
            throw TypeError("Inconsistent hierarchy, no C3 MRO is possible");
        }
        res.push(candidate);
        var iterator_seq = non_empty;
        for (var seq_iterator_index=0; seq_iterator_index < iterator_seq.length; seq_iterator_index++) {
            var seq = iterator_seq[seq_iterator_index];
            if((seq[0] === candidate)) {
                seq[0] = undefined;
            }
        }
        seqs = non_empty;
    }
};
var pythonium_create_class = function(name, bases, attrs) {
    var mro;
    attrs.__name__ = name;
    attrs.__metaclass__ = type;
    attrs.__bases__ = bases;
    mro = pythonium_mro(bases);
    mro.splice(0, 0, attrs);
    attrs.__mro__ = mro;
    return attrs;
};
var lookup = function(obj, attr) {
    var class_attr,__mro__,obj_attr;
    obj_attr = obj[attr];
    if((obj_attr != undefined)) {
        if((obj_attr&&({}.toString.call(obj_attr) == "[object Function]")&&obj_attr.is_method&&!obj_attr.bound)) {
            var method_wrapper = function() {
                var args;
                args = Array.prototype.slice.call(arguments);
                args.splice(0, 0, obj);
                return obj_attr.apply(undefined, args);
            };
            method_wrapper.bound = true;
            return method_wrapper;
        }
        return obj_attr;
    }
    else {
        if(obj.__class__) {
            __mro__ = obj.__class__.__mro__;
        }
        else {
            if(obj.__metaclass__) {
                __mro__ = obj.__metaclass__.__mro__;
            }
            else {
                return undefined;
            }
        }
        var iterator_base = __mro__;
        for (var base_iterator_index=0; base_iterator_index < iterator_base.length; base_iterator_index++) {
            var base = iterator_base[base_iterator_index];
            class_attr = base[attr];
            if((class_attr != undefined)) {
                if((({}.toString.call(class_attr) == "[object Function]")&&class_attr.is_method&&!class_attr.bound)) {
                    var method_wrapper = function() {
                        var args;
                        args = Array.prototype.slice.call(arguments);
                        args.splice(0, 0, obj);
                        return class_attr.apply(undefined, args);
                    };
                    method_wrapper.bound = true;
                    return method_wrapper;
                }
                return class_attr;
            }
        }
    }
};
var pythonium_object_get_attribute = function(obj, attr) {
    var getattr,r;
    r = lookup(obj, attr);
    if((r != undefined)) {
        return r;
    }
    else {
        getattr = lookup(obj, "__getattr__");
        if(getattr) {
            return getattr(attr);
        }
        else {
            console.trace("AttributeError", attr, obj);
            throw AttributeError;
        }
    }
};
pythonium_object_get_attribute.is_method = true;
object.__getattribute__ = pythonium_object_get_attribute;
var pythonium_get_attribute = function(obj, attr) {
    var r,getattribute;
    if((obj.__class__||obj.__metaclass__)) {
        getattribute = lookup(obj, "__getattribute__");
        r = getattribute(attr);
        return r;
    }
    attr = obj[attr];
    if(attr) {
        if(({}.toString.call(attr) == "[object Function]")) {
            var method_wrapper = function() {
                return attr.apply(obj, arguments);
            };
            return method_wrapper;
        }
        else {
            return attr;
        }
    }
};
var pythonium_set_attribute = function(obj, attr, value) {
    obj[attr] = value;
};
var ASSERT = function(condition, message) {
    if(!condition) {
        throw (message||pythonium_call(str, "Assertion failed"));
    }
};
