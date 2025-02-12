#!/bin/sh
find ./src -type f -name "*.ts" -exec sed -i '/console.log(/d' {} +

find ./src -type f -name "*.ts" -exec sed -i '/console.log(/d' {} +