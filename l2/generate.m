function [rand_mass] = generate(command)
switch command
    case 1
        rand_mass = randi([0, 9],1, 1000);
        return;
    case 2
        rand_mass = randi([10, 99], 1, 1000);
        return;
    case 3
        rand_mass = randi([100, 999], 1, 1000);
        return;        
end

