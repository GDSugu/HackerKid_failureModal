// maps
const valueToLanguageDisplayNameMap = {
  bash: 'BASH',
  basic: 'BASIC',
  c: 'C',
  clojure: 'CLOJURE',
  crystal: 'CRYSTAL',
  cpp: 'C++',
  csharp: 'C#',
  elixir: 'ELIXIR',
  erlang: 'ERLANG',
  go: 'GO',
  haskell: 'HASKELL',
  python2: 'PYTHON 2',
  python3: 'PYTHON 3',
  insect: 'INSECT',
  java: 'JAVA',
  java8: 'JAVA 8',
  javascript: 'JAVASCRIPT',
  ocaml: 'OCAML',
  octave: 'OCTAVE',
  pascal: 'PASCAL',
  ruby: 'RUBY',
  rust: 'RUST',
  objectivec: 'OBJECTIVE C',
  php: 'PHP',
  scala: 'SCALA',
  nasm: 'NASM',
  clangc: 'CLANG C',
  clangcpp: 'CLANG CPP',
  cobol: 'COBOL',
  sbcl: 'SBCL',
  d: 'D',
  fsharp: 'F#',
  fortran: 'FORTRAN',
  groovy: 'GROOVY',
  kotlin: 'KOTLIN',
  lua: 'LUA',
  prolog: 'PROLOG',
  r: 'R',
  sqlite: 'SQLITE',
  swift: 'SWIFT',
  typescript: 'TYPESCRIPT',
  vbnc: 'VBNC',
};

const valueToModeMap = {
  bash: 'sh',
  basic: 'basic',
  c: 'c_cpp',
  clojure: 'clojure',
  crystal: 'crystal',
  cpp: 'c_cpp',
  csharp: 'csharp',
  elixir: 'elixir',
  erlang: 'erlang',
  go: 'golang',
  haskell: 'haskell',
  java: 'java',
  java8: 'java',
  javascript: 'javascript',
  ocaml: 'ocaml',
  octave: 'objectivec',
  pascal: 'pascal',
  python2: 'python',
  python3: 'python',
  ruby: 'ruby',
  rust: 'rust',
  objectivec: 'objectivec',
  php: 'php',
  scala: 'scala',
  nasm: 'nasm',
  clangc: 'c_cpp',
  clangcpp: 'c_cpp',
  cobol: 'cobol',
  sbcl: 'lisp',
  d: 'd',
  fsharp: 'fsharp',
  fortran: 'fortran',
  groovy: 'groovy',
  kotlin: 'kotlin',
  lua: 'lua',
  prolog: 'prolog',
  r: 'r',
  sqlite: 'sql',
  swift: 'swift',
  typescript: 'typescript',
  vbnc: 'vbscript',
};

const valueToCompilerIdMap = {
  bash: 'BASH',
  basic: 3,
  c: 'C',
  clojure: 18,
  crystal: 19,
  cpp: 'CPP14',
  csharp: 'CS',
  elixir: 57,
  erlang: 58,
  go: 'GO',
  haskell: 23,
  java: 'JAVA',
  java8: 'JAVA8',
  javascript: 'JAVASCRIPT',
  ocaml: 31,
  octave: 32,
  pascal: 33,
  python2: 'PY2',
  python3: 71,
  ruby: 'RUBY',
  rust: 42,
  objectivec: 79,
  php: 68,
  scala: 81,
  nasm: 45,
  clangc: 75,
  clangcpp: 76,
  cobol: 77,
  sbcl: 55,
  d: 56,
  fsharp: 87,
  fortran: 59,
  groovy: 88,
  kotlin: 78,
  lua: 64,
  prolog: 69,
  r: 80,
  sqlite: 82,
  swift: 83,
  typescript: 74,
  vbnc: 84,
};

const valueToBoilerPlateCodeMap = {
  bash: '#A Simple Hello World Program\necho "Hello World"\n\n#Getting input via STDIN\nread userInput\necho "Input provided is: $userInput"',
  c: '#include <stdio.h>\nint main(void) {\n    //A Simple Hello World\n    printf("hello, world\\n");\n    \n    //Getting input via STDIN\n    int userIntInput = 0;\n    char userStringInput[100] = "";\n    scanf("%d%s", &userIntInput, &userStringInput);\n    printf("The Integer and String Input provided is: %d, %s\\n", userIntInput, userStringInput);\n    return 0;\n}',
  cpp: '#include <iostream>\nusing namespace std;\nint main() {\n    //A Simple Hello World Program\n    cout << "Hello World" << endl;\n    \n    //Getting input via STDIN\n    int userIntInput = 0;\n    char userStringInput[100] = "";\n    cin >> userIntInput >> userStringInput;\n    cout << "The Integer and String Input is: " << userIntInput << ", " << userStringInput << endl;\n    return 0;\n}',
  csharp: 'public class Hello {\n    public static void Main() {\n        //A Simple Hello World Program\n        System.Console.WriteLine("hello, world");\n        \n        //Getting input via STDIN\n        string userInput = System.Console.ReadLine();\n        System.Console.WriteLine("The Input Provided is: " + userInput);\n    }\n}',
  go: 'package main\n\nimport "fmt"\n\nfunc main() {\n    //A Simple Hello World Program\n    fmt.Println("hello, world")\n    \n    //Getting input via STDIN\n    var userInput string\n    fmt.Scanln(&userInput)\n    fmt.Println("The Input Provided is: " + userInput)\n}',
  java: 'import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        //A Simple Hello World\n        System.out.println("hello, world");\n        \n        //Getting input via STDIN\n        Scanner obj = new Scanner(System.in);\n        String userInput = obj.next();\n        System.out.println("The Input Provided is: " + userInput);\n    }\n}',
  java8: 'import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        //A Simple Hello World\n        System.out.println("hello, world");\n        \n        //Getting input via STDIN\n        Scanner obj = new Scanner(System.in);\n        String userInput = obj.next();\n        System.out.println("The Input Provided is: " + userInput);\n    }\n}',
  javascript: '// Getting input via STDIN\nconst readline = require("readline");\n\nconst inp = readline.createInterface({\n  input: process.stdin\n});\n\nconst userInput = [];\n\ninp.on("line", (data) => {\n  userInput.push(data);\n});\n\ninp.on("close", () => {\n  //start-here\n  //Your code goes here … replace the below line with your code logic \n\n  console.log(userInput);\n\n  //end-here\n});',
  objectivec: '#import <Foundation/Foundation.h>\n\nint main() {\n    @autoreleasepool {\n        //A Simple hello world\n        printf("Hello World\\n");\n\n        //Getting input via STDIN \n        char name[10];\n        scanf("%s", name);\n        NSString *message = [NSString stringWithFormat:@"%s\\n", name];\n        printf("%s", message.UTF8String);\n    }\n    return 0;\n}\n',
  perl: '#!/usr/bin/perl \n\n# Modules used \nuse strict; \nuse warnings; \n\n# Print function \nprint("Hello World"); \n',
  php: '<?php\n// A Simple Hello World\necho "Hello World!\\n";\n\n//Getting input via STDIN\n$input = fopen("php://stdin", "r");\n$inputs = [];\nwhile ($line = fgets($input)) {\n  $inputs[] = $line;\n}\nfclose($input);\n\necho json_encode($inputs);\n?>',
  python2: '#A Simple Hello World\nprint "Hello World"\n\n#Getting input via STDIN\nuserInput = raw_input()\nprint "The Input Provided is: " + userInput',
  python3: '#A Simple Hello World\nprint("Hello World")\n\n#Getting input via STDIN\nuserInput = input()\nprint("The Input Provided is: " + userInput)',
  ruby: '#A Simple Hello World\nputs "hello, world"\n\n#Getting input via STDIN\nuserInput = gets\nputs "The Input Provided is: " + userInput',
  scala: 'object Main {\n    def main(args: Array[String]) = {\n        // A simple hello world\n        println("Hello World")\n\n        // Getting input via STDIN \n        val name = scala.io.StdIn.readLine()\n        println(name)\n    }\n}\n',
  basic: '\'A Simple Hello World Program\nPRINT "hello, world"\n\n\'Getting input via STDIN\nDim userInput As String\nINPUT userInput\nPRINT "Input Provided is "; userInput',
  clojure: ';A Simple Hello World Program\n(println "hello, world")\n\n;Getting input via STDIN\n(def userInput (read-line))\n(println "The Input Provided is: "userInput)',
  crystal: '#A Simple Hello World\nputs "hello, world"\n\n#Getting input via STDIN\nuserInput = gets\nputs "The Input Provided is: #{userInput}"',
  elixir: '#A Simple Hello World\nIO.puts "hello, world"\n\n#Getting input via STDIN\nuserInput = IO.read(:stdio, :line)\nIO.puts "The Input provided is: " <> userInput\n',
  erlang: 'main(_) ->\n    %% A Simple Hello World\n    io:fwrite("hello, world\\n").\n    \n    %% Getting input via STDIN. Uncomment the below code to use it.\n    %% {ok, [UserInput]} = io:fread("", "~s"),\n    %% io:fwrite("The Input Provided is: ~s", [UserInput]).',
  haskell: 'main = do\n    -- A Simple Hello World\n    putStrLn "Hello World"\n    \n    -- Getting input from STDIN\n    userInput <- getLine\n    putStrLn ("The Input provided is: " ++ userInput)  ',
  insect: '2 min + 30 s',
  ocaml: '(* A Simple Hello World *)\nprint_endline "hello, world";\n\n(* Getting input via STDIN *)\nlet n = read_line () in\nprint_string "The Input Provided is: ";\nprint_string n;',
  octave: '%A Simple Hello World\nprintf("hello, world\\n");\n\n%Getting input via STDIN\nx = scanf(\'%s\', [1]);\nprintf("The Input Provided is: %s", x);',
  pascal: "program Hello;\nvar userInput: string;\nbegin\n    // A Simple Hello World\n    writeln ('hello, world');\n    \n    //Getting Input Via STDIN\n    readln(userInput);\n    writeln('The Input Provide is: ', userInput)\nend.",
  rust: 'fn main() {\n    //A Simple Hello World\n    println!("hello, world");\n    \n    //Getting input via STDIN\n    let mut userInput = String::new();\n    std::io::stdin().read_line(&mut userInput).unwrap();\n    println!("The Input Provided is: {}", userInput);\n}',
  nasm: '; A Simple Hello World\nsection  .text\n    global _start\n\n_start:\n\n    xor  eax, eax\n    lea edx, [rax+len]\n    mov al, 1\n    mov  esi, msg\n    mov edi, eax\n    syscall\n\n    xor  edi, edi\n    lea eax, [rdi+60]\n    syscall\n\nsection .rodata\n\nmsg  db \'hello, world\', 0xa\nlen equ $ - msg\n\n; Getting input via STDIN - uncomment below before executing\n;    global _start\n;    section .text\n;_start:\n;print_prompt: \n;    mov rax, 1                  ; syscall write\n;    mov rdi, 1                  ; stdout\n;    mov rsi, prompt             ; prompt string\n;    mov rdx, 2                  ; 2 bytes\n;    syscall\n;    mov r8, 0                   ; length of buffer\n;    mov rsi, buffer             ; initialize buffer location\n;    mov r10, 0                  ; reset EOF flag\n;read_char:\n;    mov rax, 0                  ; syscall read\n;    mov rdi, 0                  ; stdin\n;    mov rdx, 1                  ; 1 byte\n;    syscall\n;    cmp rax, 0                  ; is EOF?\n;    jne non_eof                 ; jump to process char if not EOF (read=0)\n;    mov r10, 1                  ; flag EOF\n;    jmp print_word              ; print_word\n;non_eof:    \n;    inc r8                      ; increment buffer length\n;    inc rsi                     ; increment buffer location\n;    mov r9, 0                   ; clear r9\n;    mov r9b, byte [rsi-1]       ; move previous char into r9\n;    cmp r9, 10                  ; is it NEWLINE?\n;    je print_word               ; print the word if it is (including the NEWLINE)\n;    cmp r8, buffer_size         ; compare current length with buffer_size\n;    je print_word               ; print the word if it\'s equal to buffer_size\n;    jmp read_char               ; read next character\n;print_word:\n;    mov rax, 1                  ; syscall write\n;    mov rdi, 1                  ; stdout\n;    mov rsi, buffer             ; buffer\n;    mov rdx, r8                 ; length of word\n;    syscall\n;    cmp r10, 1                  ; is EOF?\n;    je exit\n;    jmp print_prompt\n;exit:   \n;    mov rax, 60                 ; system call for exit\n;    xor rdi, rdi                ; exit code 0\n;    syscall                     ; invoke operating system to exit\n;\n;    section .bss\n;buffer_size equ 64    \n;buffer:\n;    resb buffer_size            ; reserve a 64-byte buffer\n; \n;    section .data\n;prompt:\n;    dw "> "\n',
  clangc: '#include <stdio.h>\nint main(void) {\n    //A Simple Hello World\n    printf("hello, world\\n");\n    \n    //Getting input via STDIN\n    int userIntInput = 0;\n    char userStringInput[100] = "";\n    scanf("%d%s", &userIntInput, &userStringInput);\n    printf("The Integer and String Input provided is: %d, %s\\n", userIntInput, userStringInput);\n    return 0;\n}',
  clangcpp: '#include <iostream>\nusing namespace std;\nint main() {\n    //A Simple Hello World Program\n    cout << "Hello World" << endl;\n    \n    //Getting input via STDIN\n    int userIntInput = 0;\n    char userStringInput[100] = "";\n    cin >> userIntInput >> userStringInput;\n    cout << "The Integer and String Input is: " << userIntInput << ", " << userStringInput << endl;\n    return 0;\n}',
  cobol: 'IDENTIFICATION DIVISION.\nPROGRAM-ID. MAIN.\nDATA DIVISION.\n   WORKING-STORAGE SECTION.\n   01 INPUT_STRING PIC X(15).\nPROCEDURE DIVISION.\n# A Simple Hello World\nDISPLAY "hello, world".\n# Getting input via STDIN\nACCEPT INPUT_STRING.\nDISPLAY INPUT_STRING.\nSTOP RUN.\n',
  sbcl: '; A Simple Hello World\n(print "Hello world!")\n\n; Getting input via STDIN\n(print (read))\n',
  d: 'import std.stdio;\n\nvoid main()\n{\n    // A Simple Hello World\n    writeln("Hello, World!");\n    \n    // Getting input via STDIN\n    string input;\n    input = readln;\n    writeln(input);\n}',
  fsharp: '// A Simple Hello World\nprintfn "Hello World"\n\n// Getting input via STDIN\nlet input = System.Console.ReadLine()\nprintfn "%s" input',
  fortran: 'program main\n    ! A Simple Hello World\n    character(100) :: userInput\n    \n    print *, "Hello World"\n    \n    ! Getting input via STDIN\n    read (*,*) userInput\n    write (*,*) userInput\nend',
  groovy: '// A Simple Hello World\nprintln "Hello World"\n\n// Getting input via STDIN\nfor (line in System.in.readLines()) {\n   println(line);\n}',
  lua: '-- A Simple Hello World\nprint("Hello World")\n\n-- Getting input via STDIN\nlocal a = io.read()\nprint(a)',
  prolog: '% A Simple Hello World\n:- initialization(main).\nmain :- write(\'Hello World!\').',
  r: '# A Simple Hello World\ncat(\'Hello World\\n\')\n\n# Getting input via STDIN\nuserInput = readLines(file("stdin"))\ncat(userInput)',
  sqlite: '-- A Simple Hello World\nCREATE TABLE hello(str varchar(20));\nINSERT INTO hello VALUES(\'Hello world!\');\nSELECT * FROM hello;',
  swift: '// A Simple Hello World\nimport Foundation\nprint("Hello World")\n\n// Getting input via STDIN - uncomment after providing input\n// let userInput = readLine()\n// print("(userInput!)")',
  typescript: '// A Simple Hello World\nconsole.log("Hello World");',
  vbnc: 'Public Module Program\n   Public Sub Main()\n      \' A Simple Hello World\n      Console.WriteLine("Hello World")\n      \n      \' Getting input via STDIN\n      Dim userInput As String\n      userInput = Console.ReadLine()\n      Console.WriteLine(userInput)\n   End Sub\nEnd Module\n',
  kotlin: 'import java.util.*\nfun main() {\n    // A Simple Hello World Program\n    println("hello, world")\n    \n    // Getting input via STDIN\n    val sc = Scanner(System.`in`)\n    val input: String = sc.next()\n    println(input);\n}\n',
};

// getters
const getLanguageDisplayNameFromValue = (value) => {
  if (!value) {
    return valueToLanguageDisplayNameMap.python3;
  }
  return valueToLanguageDisplayNameMap[value]
    ? valueToLanguageDisplayNameMap[value]
    : valueToLanguageDisplayNameMap.python3;
};

const getModeFromValue = (value) => {
  if (!value) {
    return valueToModeMap.python3;
  }

  return valueToModeMap[value]
    ? valueToModeMap[value]
    : valueToModeMap.python3;
};

const getCompilerIdFromValue = (value) => {
  if (!value) {
    return valueToCompilerIdMap.python3;
  }

  return valueToCompilerIdMap[value]
    ? valueToCompilerIdMap[value]
    : valueToCompilerIdMap.python3;
};

const getBoilerPlateCodeFromValue = (value) => {
  if (!value) {
    return valueToBoilerPlateCodeMap.python3;
  }

  return valueToBoilerPlateCodeMap[value]
    ? valueToBoilerPlateCodeMap[value]
    : valueToBoilerPlateCodeMap.python3;
};

const getValueToLanguageDisplayNameMap = () => ({ ...valueToLanguageDisplayNameMap });

export default null;

export {
  getBoilerPlateCodeFromValue,
  getValueToLanguageDisplayNameMap,
  getLanguageDisplayNameFromValue,
  getModeFromValue,
  getCompilerIdFromValue,
};
