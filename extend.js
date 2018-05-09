'use strict';

const extExtend = ExtendAnother;

const Type = require('./type');

module.exports  = extExtend;


/**
* @description
* 一个方便的对象继承方法(非类继承)
* 写得比较臃肿,不过实用.
*
* @param source{Object} 子对象
* @param target{Object} 父对象
* @param options{Object} 操作选项
*/
function ExtendAnother(source={}, target={}, options={}) {

    let { 
         proto = true, // 继承prototype上的属性
            no = [],   // 不继承的属性
           yes = [],   // 要继承的属性
           map = {},   // 继承的对应关系图 {source: target}
        exists = [],   // 存在则继承(覆盖)
      noExists = [],   // 不存在则继承(新增)
      existsNo = [],   // 存在则不继承
    noExistsNo = [],   // 不存在则不继承
           any = true, // 不属于上面任何条件的都继承
           fun = null, // (!deprecate)不属于上面任何条件且any=false, 自定义选择继承与否function(key, source[key], target[key]) { }
             } = options;

    let sourceKeys = Object.keys(source);

    let mapKeys    = Object.keys(map);

    let doExtend   = function (key) {

        let targetValue = target[key];

        let keyInMap = mapKeys.indexOf(key) > -1;

        if (keyInMap) {

            let mapKey = map[key];

            let mapKeyIsArray = Type.array ( mapKey );

            if (mapKeyIsArray) {

                for (let i = 0; i < mapKey.length; i++) {

                    let sourceKey = mapKey [ i ];

                    source [ sourceKey ] = targetValue;
                }
            } else {

                source[mapKey] = targetValue;
            }
        } else {

            source[key] = targetValue;
        }
    }

    for (let i in target) {

        if ( target.hasOwnProperty ( i ) ) { } else if ( proto ) {

            doExtend ( i );
            continue
        } else { continue }

        if (no.indexOf(i) > -1) { continue }

        if (yes.indexOf(i) > -1) {

            doExtend(i);
            continue
        }

        let _exists = sourceKeys.indexOf(i) > -1;

        if (exists.indexOf(i) > -1 && _exists) {

            doExtend(i);
            continue
        }

        if ((existsNo === true || existsNo.indexOf(i) > -1) && _exists) {

            continue
        }

        if ((noExists === true || noExists.indexOf(i) > -1) && !_exists) {

            doExtend(i);
            continue
        }

        if ((noExistsNo === true || noExistsNo.indexOf(i) > -1) && !_exists) {

            continue
        }

        if (any) {

            doExtend(i);
            continue
        }

        if (Type.function(fun)) {

            fun(i, source, target) && doExtend(i);
        }
    }

    return source;

}
