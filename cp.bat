setloal ENABLEDELAYEDEXPANSION
echo "copy from %1 to %2"
set source=%1
set dist=%2
set source=%source:/=\%
set dist=%dist:/=\%
copy %source% %dist%