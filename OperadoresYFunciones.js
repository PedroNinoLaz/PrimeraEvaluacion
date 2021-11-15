/**
  Primeros Pasos con MONGO:
 *
 *
    show databases
        
        ||Muestra las Bases de Datos, INSTALADAS||
        ||De NO haber ninguna mostrará:||
            ||admin  0.000GB.||
            ||config 0.000GB.||
 *
 *
    use got
       
        || Creará una nueva BD.||
 *
 *
    show collection
        
        ||Muestra lo que contiene la BD.||
 * 
 * 
  .createCollection("NombreColeccion") --> Método para CREAR una COLECCIÓN
        
    db.createCollection("NombreColeccion")
 
 *
 *     
  .insert() --> Método que Sirve para insertar datos en la BD.
        
    db._(NomColecc)_.insert();

        ||Se puede utilizar en cualquier momento para insertar un nuevo dato||
        
    db._(NomColecc)_.insert({Campo: "Valor", Campo: "Valor"});

 *   
 * 
  .find()--> Método que DEVUELVE TODOS los contenidos (datos) de la BD.

    db._(NomColecc)_.find();
        
            ||Para que muestre un dato con un Valor determinado||
            ||de algún campo||
        
    db._(NomColecc)_.find({Campo: "Valor"});
*
*
  .pretty() --> Método que TABULA los contenidos devueltos, para que sea visualmente
            más bonito.

    db._(NomColecc)_.find().pretty()
 *
 *            
  $all


 *
 *  
  $gt -->  Mayor que (Greater Than).
        
     db._(NomColecc)_.find({Campo: {$gt: Valor}});
            
            ||$gt si el "Valor" es > "C"||
            ||mostrará alfabeticamente de C en adelante (D, F, G...)||
            
 *
 *        
  $lt -->  Menor que (Less Than).

    db._(NomColecc)_.find({Campo: {$lt: Valor}});
 
            ||$lt si el "Valor" es < "C"||
            ||mostrará alfabeticamente de C Hacia atras (A, B)||
 
            ||$gt y $lt, También se pueden usar con String mostrando||
            ||los datos lexicológicamente en UTF-8, ||
            * 
  $elemMatch
 

 *
 *  
 *
 * 
  $and --> Operador Lógico que realiza consultas donde las condiciones que se introduzcan
        se tienen que cumplir todas. (Explicito e Implicito).

    db._(NombreColeccion).find( {$and: [{Campo : {$regex: "a"}}, { alias: {$exists: true}}]});

            ||En la instrucción anteriors  se realiza una consulta||
            ||Para todo aquello que contengan una "a" en el Campo ||
            ||y que tengan el atributo (CAMPO) "alias".|| 
            (Es un ejemplo basado en una BD, para poder darle sentido)
            ||Mongo provee una operación $and EXPLICITA cuando se añaden,|| 
            ||expresiones separadas por comas.||
 *
 *            
  $or --> Operador Lógico que realiza consultas donde las condiciones que se introduzcan
        se tienen que cumplir SÓLO una de ellas.

    db._(NomColecc)_.find({$or: [{name: {$regex: "a "}},{alias: {$exist: true}}]});

            ||Usando los mismos parámetros utilizados en $and,||
            ||Obtenemos más resultados,||
            ||YA QUE SÓLO DEBE CUMPLIRSE UNA DE LAS 2 CONDICIONES||
            ||Ahora nos mostraría TODOS los campos "nombre", que ||
            ||contengan una "a"(una de las condiciones), además de||+
            ||aquellos que contengan el CAMPO "ALIAS"||  
 *
 *                     
  $sort --> ($sort(agregation) Ordena los datos/(documentos) de  entrada y los devuelve ordenados.
        Sus valores son el -1 para un orden descendente y 1 para orden ascendente.

    db._(NomColecc)_.aggregate([{$sort: {age: -1}}]);
    
            ||Ordenaria de forma descendente las entradas de la BD||
            ||del Campo "age", ahora bien, si el campo es un String||
            ||lo ordenaría alfabéticamente, y por tanto las edades irán ||
            ||según UTF-8||
    
    También se puede realizar con el "Metodo Cursor" ||.sort()|| LÍMITE de 32MG, al exceder
    produce un error. PUEDEN CREAR ÍNDICES, que apoyen la operación de ordenación.

        db._(NomColecc)_.find().sort({CAMPO: -1});
    Usando el "Operador" ||$sort|| Tiene un LÍMITE de 100MG de RAM, si se pasa, produce
    un error, además de que no Utiliza ÍNDICES.
    
        db._(NomColecc)_.aggregate([{$sort:{CAMPO: -1}}])
    
  
 * 
 * 
  
  $not
 
 *
 *  
  $nin
 
 *
 *
  $regex --> Regular Expression Permite buscar Coincidencias de Patrones,
             Opciones y Caracteres especiales 
           
        db._(NomColecc)_.find({Campo: {$regex: "Valor"}})

            ||Proporciona capacidades de expresión regular para ||
            || cadenas de coincidencia de patrones              ||
            || Como buscar "J" en cualquier posición del String.||
            ||OPERADOR tipo CASE SENSITIVE (Como TODO en Mongo) ||
            ||"Case Sensitive, implica que distingue Mayusculas,||
            ||Minusculas, acentos, y otros tipos de caracteres."||
 *
 *            
  $exists --> Permite buscar los datos que tengan el campo seleccionado.
           
        db._(NomColecc)_.find({Campo: {$exists: true}})

            ||Buscar valores que se encuentren en un Campo determinado.||
            ||Operador Booleano||
 *
 *           
  $type --> Permite buscar por tipos de datos (String, int, boolean, etc).
            
        db._(NomColecc)_.find({Campo: {$type:Nº}}) 

            ||¡¡¡"Nº"!!! --> Número por el cuál se define el tipo de dato.||
            ||En un Campo, puede haber MÁS DE un dato DE DIFERENTE TIPO.  ||
            ||HAY 19 TIPOS de DATOS (+2**), que Mongo maneja.||

    ||NUMERACIÓN DE LOS DATOS:||        *||TIPO -- NÚMERO -- ALIAS||*
            
    ||Double ------- 1 ------------ "double" ||                  ||String ------- 2 ----------- "string" ||               
            
    ||Object ------- 3 ----------- "object"  ||                  ||Array ------- 4 ---- "array"   ||
            
    ||Binary data -- 5 ------------ "binData"||                  ||Undefined --- 6 --- "undefined"|| 

    ||Objectld ----- 7 ---------- "objectld" ||                  ||Boolean ------ 8 ------------- "bool" ||    
    
    ||Date --------- 9 ----------------"date"||                  ||Null ------- 10 -------  "null"||
            
    ||Regular Expression -- 11 ----- "regex" ||                  ||DBPointer -- 12 -- "dbPointer" || 
            
    ||JavaScrip ----------- 13 - "javascript"||                  ||Symbol -------------- 14 --- "symbol" ||  
    
    ||JavaScript code whit scope -- 15 -- "javascriptWithScope|| ||32-bit integer  -- 16 -- "int" || 
            
    ||Timestamp ----------- 17 - "timestamp"||                   ||64-bit integer -- 18 --- "long"||      
            
    ||Decimal128  -- 19  -- "decimal"||  
    
    (LOS DOS TIPOS DE DATOS (TIPOS DE DATOS INTERNOS (internal types)) EXTRAS** )
    
    ||Min key ---------1 ---------- "minKey"||                    ||Max key --- 127 ------ "maxKey"||          
__________________________________________________________________________________________

  CONSULTAR DENTRO DE ARRAYS:
    
        db._(NomColecc)_.find({CampoArray: "ValorArray"});

            ||Nos proporcionará los valores que coincidan con los datos que contengan||
            ||el "CampoArray" con el valor deseado "ValorArray"||
            ||Mongo buscará dentro de TODOS los ARRAYS de la BD||
            ||Hasta encontrar la IGUALDAD DESEADA. Hay que tener en cuenta que:||
            ||Esto NO ES recursividad|| 
 
    CONSULTAR DENTRO DE ARRAYS con NOTACIÓN "." :

        db._(NomColecc)_.find({"CampoArray01.CampoArray02": "CAMPO/ValorArray02"});
 
            ||NOTA:|| Dentro del campo Array que tengamos en el documento, se puden
                CREAR otros CAMPOS ANIDADOSy definir su propio VALOR, los campos
                puestos en el ejemplo "CampoArray01" es el principal,
                y "CampoArray02" es el CAMPO ANIDADO de la Array del cual generamos
                la consulta de su valor "ValorArray02".  

            ||En éste caso es MUY IMPORTANTE la SINTAXIS, ya que daría error||
            ||ES NECESARIO poner las COMILLAS en los CAMPOS a FILTRAR "CAMPO/ValorArray"||
 *
 *
    COMANDOS PARA OPERAR DENTRO DE UNA ARRAY:
 *
 *
   $set --> Comando para ACTUALIZAR y MODIFICAR los VALORES del ARRAY

        db._(NomColecc)_.update({ CampoIdentificativo: "VALOR"}, {$set: {CampoArray: ElementoAModificar}});

            ||Se pueden actualizar y modificar los VALORES de un ARRAY con $set||
            ||Pero para ello debemos MANTENER el esquema de LA SINTAXIS anterior||

 *
 *
   $push --> Comando que AÑADE un ELEMENTO a la ARRAY en la parte derecha
    
        db._(NomColecc)_.update({ CampoIdentificativo: "VALOR"}, {$push: {CampoArray: ElementoAñadido}});

 *
 *
   $pop --> Comando que ELIMINA UN ELEMENTO, dependiendo del ARGUMENTO (1 ó -1)
        puede ELIMINAR de izquierda a derecha

        db._(NomColecc)_.update({ CampoIdentificativo: "VALOR"}, {$pop: {ARGUMENTO: -1(izq)/1(dcha)}});

 *
 *       
   $pull --> Comando que ELIMINA un ELEMENTO por su VALOR, independientemente de su posición. 
 
        db._(NomColecc)_.update({ CampoIdentificativo: "VALOR"}, {$pull: {CampoArray: ElementoAEliminar}});
  

 *
 *       
   $pullAll --> Elimina N-Elementos por SU VALOR, independientemente de su POSICIÓN.     
 
        db._(NomColecc)_.update({ CampoIdentificativo: "VALOR"}, {$pullAll: {CampoArray: ElementosAEliminar}});    

 * 
 *       
   $addToSet --> Comando que AÑADE el ELEMENTO si aún NO EXISTE. Si existe NO HARÁ NADA.
            Ya que trata el array no como una secuencia de elementos, sino como un
            conjunto de elementos que NO DEBERÍAN CONTENER MÁS de una instancia de 
            cualquier valor particular.
        
        db._(NomColecc)_.update({ CampoIdentificativo: "VALOR"}, {$addToSet: {CampoArray: ElementoAAñadir}});


 *               
 *    
   $in y $all --> Operadores que permite acceder a los documentos que cumplan 
              las condiciones que se añadan como VALOR EN EL ARRAY ESPECIFICADO
  
 *
 *            
    $in --> Nos devolverá los documentos que CUMPLAN ALGUNO de los VAlORES 
            introducidos en la consulta.
           
        db._(NomColecc)_.find({CampoArray: { $in: ["ValorArray01", "ValorArray02"] }});
        
            || Nos mostrará TODOS los documento que cumplan UNO o VARIOS de los VALORES.||
            ||que se hayan ESPECIFICADO para la consulta.||

 *
 *           
    $all --> Nos devolverá SÓLO los documentos que cumplan TODOS LOS VALORES
            introducidos en la consulta
         
        db._(NomColecc)_.find({CampoArray: { $all: ["ValorArray01", "ValorArray02"] }});

            ||Nos mostrará SÓLO los documentos que HAYAN CUMPLIDO TODAS las condiciones||
            ||de los VALORES que se han introducido para la consulta||
 * 
 * 
    $inc --> incrementa el valor en 1 el campo a actualizar.
    
        db._(NomColecc)_.update({"_id": ObjectId("xx")}, {$inc: {CAMPO: NºIncremento}});

            ||".update" Sirve para actualizar el documento||
            ||Mientras el CAMPO EXISTA se INCREMENTARÁ el VALOR como MÍNIMO en 1||
            ||Ó la cantidad que hayamos INDICADO EN "NºIncremento"||
            ||SI el CAMPO aún NO EXISTIA, se CREARÁ|| 
            ||con el VALOR indicado en "NºIncremento"||
 * 
 *
    $set --> ACTUALIZA el CAMPO seleccionado pero si aún NO EXISTE, SE CREARÁ.
 
        db._(NomColecc)_.update({"_id": ObjectId("xx")}, {$set: {CAMPO: ValorActualizado}});

            ||Sintaxis para modificar un campo||

        db._(NomColecc)_.update({"_id": ObjectId("xx")}, {$set: {NewCAMPO: NuevoValor}});    
 
            ||Sintaxis para CREAR un NUEVO CAMPO con su VALOR correspondiente||

 * 
 * 
    $unset --> ELIMINA un CAMPO existente de un documento.
  
        db._(NomColecc)_.update({ CampoIdentificativo: "VALOR"}, {$unset: {CAMPOaEliminar: 1}});
 * 
 * 
  upsert --> Comando de TIPO UPDATE, que si un REGISTRO EXISTE lo ACTULIZARÁ
         mientras que si aún NO EXISTE se CREARÁ el REGISTRO.

         db._(NomColecc)_.update({ Campo: "Valor", Campo: "Valor", {$set: {CampoAActualizar}}, {upsert: true}});
 * 
 * 
  Multi Update:

  multi --> Sirve para ACTUALIZAR MÁS de un documento a la vez.
        Dejando el PRIMER ELEMENTO VACÍO, Mongo interpreta que COINCIDE con TODOS los ELEMENTOS
        de la COLECCIÓN y los ACTUALIZARÁ TODOS.

        db._(NomColecc)_.update( { }, {$set: {CAMPOaActualizar: "ValorActualizar"}}, {multi: true} );

            ||Si NO se ESPECIFICA "multi" con el valor "true".||
            ||SÓLO ACTUALIZARÍA un documento y no todos.||
            ||MongoDB NO hace esos MULTI UPDATE de forma AISLADA||
            ||Es decir, si entre medias de los update, se realiza otra ejecución||
            ||que afecta a esos registros, mongoDB:|| 
            ||PRIMERO, Actualizará antes de seguir con los update.||
            || 
 * 
 * 
  Borrar Datos:

  .remove() --> Método para BORRAR datos de los documentos
  
            db._(NomColecc)_.remove({CAMPOaEliminar});

            ||Esté MÉTODO puede mezclarse con operadores||
            ||para hacer una limpieza más concreta o mejor dicho||
            ||con mayor exactitud y específica||

            db._(NomColecc)_.remove({CAMPOaEliminar: {$gt: "ValorConcreto"}});

            ||Sintaxis para eliminar los valores MAYORES QUE del Valor a concretar||
            
            db._(NomColecc)_.remove( { })

            ||ELIMINA TODOS los documentos de una colección|| 

  .drop() --> Borra TODOS los documentos de una colección de forma más rápida y eficiente.

            db._(NomColecc)_.drop()
 * 
 //****************************Autor: Pedro Antonio Niño Lazpiur**********************************/