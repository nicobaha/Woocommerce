function copyColumnWithCodigo() {
    // IDs y nombres de hojas de cálculo
    var sourceSpreadsheetId = '?????????????????????????????'; // ID de la hoja origen
    var sourceSheetName = '???????????'; // Nombre de la hoja origen
    var targetSpreadsheetId = '?????????????'; // ID de la hoja destino
    var targetSheetName = '??????????'; // Nombre de la hoja destino
  
    // Número máximo de filas a copiar
    var maxRows = 20;
  
    // Encuentra el índice de la columna con la cabecera "código" en la fila 2
    var sourceSheet = SpreadsheetApp.openById(sourceSpreadsheetId).getSheetByName(sourceSheetName);
    var columnIndex = sourceSheet
      .getRange(2, 1, 1, sourceSheet.getLastColumn())
      .getValues()[0]
      .findIndex(header => header.toLowerCase() === 'código') + 1;
  
    // Si se encuentra la columna "código", copiar sus valores
    if (columnIndex > 0) {
      var sourceValues = sourceSheet
        .getRange(3, columnIndex, maxRows, 1) // Limitar a maxRows filas
        .getValues();
  
      var targetSheet = SpreadsheetApp.openById(targetSpreadsheetId).getSheetByName(targetSheetName);
      targetSheet.getRange('A2').offset(0, 0, sourceValues.length, 1).setValues(sourceValues); // Pegar en la columna A
  
      // Crear un arreglo con los datos de SKU, Producto, Categoría, Inventario, Marca y Color
      var skuData = [];
      var productValues = sourceSheet.getRange(3, 2, maxRows, 1).getValues(); // Columna B
      var categoryValues = sourceSheet.getRange(3, 7, maxRows, 1).getValues(); // Columna G
      var inventoryValues = sourceSheet.getRange(3, 18, maxRows, 1).getValues(); // Columna R
      var brandValues = sourceSheet.getRange(3, 22, maxRows, 1).getValues(); // Columna V
      var colorValues = sourceSheet.getRange(3, 8, maxRows, 1).getValues(); // Columna H
  
      for (var i = 0; i < sourceValues.length; i++) {
        skuData.push([sourceValues[i][0], productValues[i][0], categoryValues[i][0], inventoryValues[i][0], brandValues[i][0], colorValues[i][0]]);
      }
  
      // Guardar los datos en las columnas correspondientes en la hoja de destino
      targetSheet.getRange('B2').offset(0, 0, skuData.length, 1).setValues(skuData.map(row => [row[1]])); // Producto en columna B
      targetSheet.getRange('D2').offset(0, 0, skuData.length, 1).setValues(skuData.map(row => [row[2]])); // Categoría en columna D
      targetSheet.getRange('I2').offset(0, 0, skuData.length, 1).setValues(skuData.map(row => [row[3]])); // Inventario en columna I
      targetSheet.getRange('P2').offset(0, 0, skuData.length, 1).setValues(skuData.map(row => [row[4]])); // Marca en columna P
      targetSheet.getRange('T2').offset(0, 0, skuData.length, 1).setValues(skuData.map(row => [row[5]])); // Color en columna T
  
      // Pegar valores constantes en las columnas O y S
      targetSheet.getRange('O2').offset(0, 0, skuData.length, 1).setValue("MARCA"); // Constante "MARCA" en columna O
      targetSheet.getRange('S2').offset(0, 0, skuData.length, 1).setValue("Color"); // Constante "Color" en columna S
  
      // Agregar URL de imagen en la columna N y valores "1" en las columnas E, H, Q, R, T, U
      var imageUrl = "??????????????????????????????";
      for (var j = 0; j < sourceValues.length; j++) {
        if (sourceValues[j][0]) {
          targetSheet.getRange('N' + (j + 2)).setValue(imageUrl); // Pegar URL de la imagen en columna N
          targetSheet.getRange('E' + (j + 2)).setValue(1); // Pegar "1" en la columna E
          targetSheet.getRange('H' + (j + 2)).setValue(1); // Pegar "1" en la columna H
          targetSheet.getRange('Q' + (j + 2)).setValue(1); // Pegar "1" en la columna Q
          targetSheet.getRange('R' + (j + 2)).setValue(1); // Pegar "1" en la columna R
          targetSheet.getRange('T' + (j + 2)).setValue(1); // Pegar "1" en la columna T
          targetSheet.getRange('U' + (j + 2)).setValue(1); // Pegar "1" en la columna U
        }
      }
  
      Logger.log('La columna con la cabecera "código" ha sido copiada a la hoja de destino como "SKU".');
      Logger.log('Los datos de SKU, Producto, Categoría, Inventario, Marca y Color han sido pegados en las columnas correspondientes.');
    } else {
      Logger.log('No se encontró una columna con la cabecera "código".');
    }
  }
  