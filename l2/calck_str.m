function [XXX] = calck_str(YYY)
j = length(YYY);
mass = zeros(1, j);
for i = 1:j
    mass(i) = YYY(i);
end
p = [];
for k = 1:j
    sn = de2bi(mass(k), 4);
    p = cat(2, p, sn);
end

ass = 0;
for k = 1:length(p)
    if p(k) == 1
        p(k) = 1;
        ass = ass + 1;
    else
        p(k) = -1;
        ass = ass - 1;
    end
end

pvalue = erfc((abs(ass)/sqrt(length(p)))/sqrt(2));
XXX = pvalue;

return;
end